# Skyroc Admin 包拆分架构方案

> **目标**: 将 `apps/admin` 拆分为细粒度、可复用的子包，支持快速启动新项目，并为未来的 React Native 项目提供跨平台支持。

## 📋 目录

- [1. 架构概览](#1-架构概览)
- [2. 包分类体系](#2-包分类体系)
- [3. 详细包设计](#3-详细包设计)
- [4. 依赖关系图](#4-依赖关系图)
- [5. 迁移路径](#5-迁移路径)
- [6. 使用指南](#6-使用指南)

---

## 1. 架构概览

### 1.1 当前项目分析

**技术栈**:
- React 19 + Vite 7
- TanStack Router (路由)
- Jotai (状态管理)
- TanStack Query (数据获取)
- Ant Design 6 (UI组件)
- UnoCSS (样式)
- i18next (国际化)

**现有包结构**:
```
packages/
├── axios/          # HTTP 请求封装
├── color/          # 颜色工具
├── materials/      # 材料组件
├── scripts/        # 脚本工具
└── utils/          # 通用工具

internal/
└── uno-config/     # UnoCSS 配置

apps/
└── admin/          # 后台管理系统（需拆分）
```

### 1.2 拆分原则

1. **平台分离**: 严格区分跨平台代码和 Web 专用代码
2. **单一职责**: 每个包只负责一个明确的功能域
3. **细粒度**: 宁可多拆，不要大而全
4. **零耦合**: 避免包之间的循环依赖
5. **渐进式**: 支持按需引入，不强制全量使用

---

## 2. 包分类体系

### 2.1 分类标准

| 分类 | 命名前缀 | 适用场景 | 依赖约束 |
|-----|---------|---------|---------|
| **Universal** | `@skyroc/core-*` | React + React Native | 禁止依赖 DOM/Web API |
| **Web** | `@skyroc/web-*` | 仅 Web 应用 | 可依赖 DOM/Web API |
| **Adapter** | `@skyroc/adapter-*` | UI库适配层 | 依赖特定 UI 库 |
| **Feature** | `@skyroc/feature-*` | 业务功能模块 | 可依赖多个包 |
| **Internal** | `@skyroc/internal-*` | 内部工具 | 开发时依赖 |

### 2.2 包架构分层

```
┌─────────────────────────────────────────────┐
│         应用层 (apps/*)                      │
│  快速启动模板，组合各功能包                    │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│      功能层 (feature-*)                      │
│  完整的业务功能：认证流程、主题系统等           │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│      适配层 (adapter-*)                      │
│  UI库适配：Ant Design、TailwindCSS等         │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│      核心层 (core-*)                         │
│  跨平台核心逻辑：状态、工具、类型              │
└─────────────────────────────────────────────┘
```

---

## 3. 详细包设计

### 3.1 跨平台核心包 (Universal)

#### 📦 `@skyroc/core-auth`
**定位**: 认证核心逻辑（跨平台）

**功能**:
- Token 管理 (get/set/clear)
- 认证状态管理 (Jotai atom)
- 用户信息类型定义
- Storage 抽象接口

**导出**:
```ts
// 状态管理
export { authAtom, useAuth } from './hooks/use-auth'
export { setAuth, clearAuth } from './actions'

// 工具函数
export { getToken, isTokenExpired } from './utils'

// 类型
export type { AuthState, UserInfo, LoginToken } from './types'
```

**依赖**:
- `jotai` (状态)
- `@skyroc/core-storage` (存储)
- `@skyroc/core-types` (类型)

**文件结构**:
```
@skyroc/core-auth/
├── src/
│   ├── atoms/
│   │   └── auth.ts           # Jotai atom定义
│   ├── hooks/
│   │   └── use-auth.ts       # 认证hook
│   ├── actions/
│   │   ├── set-auth.ts       # 设置认证
│   │   └── clear-auth.ts     # 清除认证
│   ├── utils/
│   │   ├── token.ts          # Token工具
│   │   └── validation.ts     # 验证逻辑
│   ├── types/
│   │   └── index.ts          # 类型定义
│   └── index.ts
└── package.json
```

**平台适配**:
- Web: 使用 `localStorage`
- React Native: 使用 `AsyncStorage`
- 通过 `@skyroc/core-storage` 抽象层实现

---

#### 📦 `@skyroc/core-i18n`
**定位**: 国际化核心（跨平台）

**功能**:
- 语言切换逻辑
- 语言状态管理
- i18next 配置抽象
- 翻译key类型安全

**导出**:
```ts
export { useLang, langAtom } from './hooks/use-lang'
export { setLng, initI18n } from './config'
export type { LangType, I18nKey } from './types'
```

**依赖**:
- `i18next`
- `jotai`
- `@skyroc/core-storage`
- `@skyroc/core-types`

**文件结构**:
```
@skyroc/core-i18n/
├── src/
│   ├── config/
│   │   └── i18n.ts           # i18next配置
│   ├── hooks/
│   │   └── use-lang.ts       # 语言hook
│   ├── types/
│   │   └── index.ts
│   └── index.ts
└── package.json
```

---

#### 📦 `@skyroc/core-theme`
**定位**: 主题核心逻辑（跨平台）

**功能**:
- 主题色计算（基于 `@sa/color`）
- 主题状态管理
- 颜色模式切换（light/dark/auto）
- 主题配置类型

**导出**:
```ts
export { useTheme, themeAtom } from './hooks/use-theme'
export { createThemeToken, getColorPalette } from './utils'
export type { ThemeConfig, ThemeColors, ThemeMode } from './types'
```

**依赖**:
- `@sa/color`
- `jotai`
- `@skyroc/core-storage`
- `@skyroc/core-types`

**关键实现**:
```ts
// src/utils/theme-token.ts
export function createThemeToken(
  colors: ThemeColors,
  mode: 'light' | 'dark'
) {
  const palette = getColorPalette(colors.primary)

  return {
    primary: palette[500],
    'primary-50': palette[50],
    // ... 生成完整色阶
  }
}
```

**平台差异**:
- Web: 通过 CSS Variables 应用
- React Native: 通过 Context/主题对象传递

---

#### 📦 `@skyroc/core-storage`
**定位**: 存储抽象层（跨平台）

**功能**:
- 统一的存储接口
- 支持类型安全的 key-value 存储
- 平台适配（localStorage / AsyncStorage）

**导出**:
```ts
export { createStorage, createLocalforage } from './factory'
export type { Storage, StorageType, StorageAdapter } from './types'
```

**依赖**:
- `localforage` (Web IndexedDB)
- 无其他依赖（纯接口）

**核心设计**:
```ts
// src/types.ts
export interface StorageAdapter {
  getItem<T>(key: string): Promise<T | null>
  setItem<T>(key: string, value: T): Promise<void>
  removeItem(key: string): Promise<void>
  clear(): Promise<void>
}

// src/factory.ts
export function createStorage<T extends Record<string, any>>(
  adapter: StorageAdapter,
  prefix: string = ''
): Storage<T> {
  return {
    get: async (key) => adapter.getItem(`${prefix}${key}`),
    set: async (key, value) => adapter.setItem(`${prefix}${key}`, value),
    // ...
  }
}
```

**平台实现**:
```ts
// Web adapter
import { webStorageAdapter } from '@skyroc/core-storage/web'

// React Native adapter
import { asyncStorageAdapter } from '@skyroc/core-storage/react-native'
```

---

#### 📦 `@skyroc/core-state`
**定位**: Jotai 状态管理封装

**功能**:
- 全局 store 配置
- 常用 atoms 工具
- Devtools 集成

**导出**:
```ts
export { globalStore, JotaiProvider } from './provider'
export { createAtomWithStorage } from './utils'
```

**依赖**:
- `jotai`
- `jotai-devtools` (dev)

---

#### 📦 `@skyroc/core-types`
**定位**: 全局类型定义

**功能**:
- 通用类型定义
- API 响应类型
- 业务枚举

**导出**:
```ts
export type * from './api'
export type * from './common'
export type * from './theme'
export type * from './i18n'
```

**无依赖**

---

#### 📦 `@skyroc/core-constants`
**定位**: 常量和枚举

**功能**:
- 应用常量
- 业务枚举
- 正则表达式

**导出**:
```ts
export * from './app'
export * from './business'
export * from './regex'
export * from './enums'
```

**无依赖**

---

### 3.2 Web 专用包

#### 📦 `@skyroc/web-router`
**定位**: TanStack Router 路由封装（Web专用）

**功能**:
- Router 实例配置
- 路由守卫
- Query 参数解析/序列化
- 路由 hooks

**导出**:
```ts
export { router } from './config'
export { useRoute, useNavigate } from './hooks'
export { parseQuery, stringifyQuery } from './utils'
export type { RouterConfig } from './types'
```

**依赖**:
- `@tanstack/react-router`
- `@skyroc/core-auth` (路由守卫)

---

#### 📦 `@skyroc/web-table`
**定位**: Ant Design 表格功能（Web专用）

**功能**:
- `useTable` hook
- 分页、排序、筛选
- URL 参数同步
- 移动端适配

**导出**:
```ts
export { useTable, useTableScroll, useTableOperate } from './hooks'
export { TableHeaderOperation, DragContent } from './components'
export type { TableConfig, TableColumn } from './types'
```

**依赖**:
- `antd`
- `@skyroc/web-router` (URL同步)
- `@dnd-kit/core` (拖拽)

---

#### 📦 `@skyroc/web-form`
**定位**: Ant Design 表单功能（Web专用）

**功能**:
- 表单验证规则
- 常用表单hooks

**导出**:
```ts
export { useRules } from './hooks/use-rules'
```

**依赖**:
- `antd`
- `@skyroc/core-i18n`

---

#### 📦 `@skyroc/web-animate`
**定位**: 动画功能（Web专用）

**功能**:
- Motion 动画特性
- 页面切换动画

**导出**:
```ts
export { LazyMotion } from './components'
export { animateFeature } from './config'
```

**依赖**:
- `motion`

---

#### 📦 `@skyroc/web-layouts`
**定位**: 布局组件（Web专用）

**功能**:
- 管理后台布局
- Header/Sider/Footer
- Tab 标签页
- 面包屑

**导出**:
```ts
export { AdminLayout } from './admin-layout'
export { useAdminState } from './hooks'
```

**依赖**:
- `antd`
- `@skyroc/web-router`
- `@skyroc/adapter-antd`

---

#### 📦 `@skyroc/web-components`
**定位**: Web 通用组件

**功能**:
- Portal (传送门)
- FullScreen (全屏)
- BetterScroll (滚动)
- DarkModeContainer
- 等基础组件

**导出**:
```ts
export { Portal } from './portal'
export { FullScreen } from './full-screen'
// ...
```

**依赖**:
- `@better-scroll/core`
- `@skyroc/core-theme`

---

### 3.3 适配器包 (Adapter)

#### 📦 `@skyroc/adapter-antd`
**定位**: Ant Design 主题适配器

**功能**:
- 将 `@skyroc/core-theme` 的主题配置转换为 Ant Design 主题
- 提供 AntdProvider

**导出**:
```ts
export { AntdProvider } from './provider'
export { getAntdTheme } from './theme'
export { antdColorAlgorithm } from './algorithm'
```

**依赖**:
- `antd`
- `@skyroc/core-theme`
- `@skyroc/core-i18n`

**核心实现**:
```ts
// src/theme.ts
export function getAntdTheme(
  themeColors: ThemeColors,
  darkMode: boolean,
  settings: ThemeSettings
): ThemeConfig {
  return {
    algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      colorPrimary: themeColors.primary,
      borderRadius: settings.radius,
      fontSize: settings.fontSize,
      // ... 映射配置
    },
    components: {
      // ... 组件级配置
    }
  }
}
```

---

#### 📦 `@skyroc/adapter-react-i18next`
**定位**: react-i18next 适配器

**功能**:
- 连接 `@skyroc/core-i18n` 和 `react-i18next`
- 提供 Provider 和 hooks

**导出**:
```ts
export { I18nProvider } from './provider'
export { useTranslation } from './hooks'
```

**依赖**:
- `react-i18next`
- `@skyroc/core-i18n`

---

### 3.4 功能包 (Feature)

#### 📦 `@skyroc/feature-notification`
**定位**: 通知系统

**功能**:
- 通知状态管理
- 通知组件
- Mock 数据

**导出**:
```ts
export { NotificationProvider } from './provider'
export { NotificationPanel, NotificationButton } from './components'
export { useNotification } from './hooks'
```

**依赖**:
- `@skyroc/core-state`
- `antd` (可选，用于 Web)

---

#### 📦 `@skyroc/feature-menu`
**定位**: 菜单系统

**功能**:
- 菜单配置生成
- 菜单状态管理
- 图标映射

**导出**:
```ts
export { useMenus } from './hooks/use-menus'
export { generateMenus, transformMenuToRoute } from './utils'
export type { MenuConfig, MenuItem } from './types'
```

**依赖**:
- `@skyroc/core-state`
- `@skyroc/core-types`

---

### 3.5 已有包优化

#### 📦 `@skyroc/utils` (保持)
**当前功能**: storage, crypto, nanoid, cn, klona

**优化建议**:
- 移除 `storage.ts`（迁移到 `@skyroc/core-storage`）
- 保留纯工具函数

---

#### 📦 `@sa/axios` (保持)
**当前功能**: HTTP 请求封装

**依赖调整**:
- 依赖 `@skyroc/core-storage` (token获取)

---

#### 📦 `@sa/color` (保持)
**当前功能**: 颜色工具

**无需调整**

---

## 4. 依赖关系图

### 4.1 核心依赖图

```
                    ┌─────────────────┐
                    │   apps/admin    │
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
      ┌───────▼──────┐ ┌────▼─────┐ ┌─────▼──────┐
      │ feature-*    │ │ web-*    │ │ adapter-*  │
      └───────┬──────┘ └────┬─────┘ └─────┬──────┘
              │              │              │
              └──────────────┼──────────────┘
                             │
                      ┌──────▼──────┐
                      │   core-*    │
                      └──────┬──────┘
                             │
                    ┌────────▼────────┐
                    │ @skyroc/utils   │
                    │ @sa/axios       │
                    │ @sa/color       │
                    └─────────────────┘
```

### 4.2 详细依赖矩阵

| 包名 | 依赖包 | 平台 |
|-----|--------|------|
| `@skyroc/core-auth` | `core-storage`, `core-types` | Universal |
| `@skyroc/core-i18n` | `core-storage`, `core-types` | Universal |
| `@skyroc/core-theme` | `@sa/color`, `core-storage` | Universal |
| `@skyroc/core-storage` | - | Universal |
| `@skyroc/core-state` | `jotai` | Universal |
| `@skyroc/core-types` | - | Universal |
| `@skyroc/core-constants` | - | Universal |
| `@skyroc/web-router` | `@tanstack/react-router`, `core-auth` | Web |
| `@skyroc/web-table` | `antd`, `web-router` | Web |
| `@skyroc/web-form` | `antd`, `core-i18n` | Web |
| `@skyroc/web-animate` | `motion` | Web |
| `@skyroc/web-layouts` | `antd`, `web-router`, `adapter-antd` | Web |
| `@skyroc/web-components` | `@better-scroll/core`, `core-theme` | Web |
| `@skyroc/adapter-antd` | `antd`, `core-theme`, `core-i18n` | Web |
| `@skyroc/adapter-react-i18next` | `react-i18next`, `core-i18n` | Universal |
| `@skyroc/feature-notification` | `core-state` | Universal |
| `@skyroc/feature-menu` | `core-state`, `core-types` | Universal |

---

## 5. 迁移路径

### 5.1 迁移阶段

#### 阶段 1: 基础包拆分 (1-2周)

**目标**: 创建核心跨平台包

**任务清单**:
- [ ] 创建 `@skyroc/core-types`
- [ ] 创建 `@skyroc/core-constants`
- [ ] 创建 `@skyroc/core-storage`
  - [ ] 实现 Web adapter
  - [ ] 设计 RN adapter 接口
- [ ] 创建 `@skyroc/core-state`
- [ ] 创建 `@skyroc/core-i18n`
- [ ] 创建 `@skyroc/core-theme`
- [ ] 创建 `@skyroc/core-auth`

**迁移脚本**:
```bash
# 1. 创建包结构
pnpm dlx create-workspace-package @skyroc/core-types
pnpm dlx create-workspace-package @skyroc/core-constants
# ...

# 2. 迁移代码
# 将 apps/admin/src/types -> packages/core-types/src
# 将 apps/admin/src/constants -> packages/core-constants/src
# ...

# 3. 更新依赖
cd apps/admin
pnpm add @skyroc/core-types@workspace:*
pnpm add @skyroc/core-constants@workspace:*
# ...
```

#### 阶段 2: Web 专用包拆分 (2-3周)

**任务清单**:
- [ ] 创建 `@skyroc/web-router`
- [ ] 创建 `@skyroc/web-table`
- [ ] 创建 `@skyroc/web-form`
- [ ] 创建 `@skyroc/web-animate`
- [ ] 创建 `@skyroc/web-components`
- [ ] 创建 `@skyroc/web-layouts`

#### 阶段 3: 适配器包拆分 (1周)

**任务清单**:
- [ ] 创建 `@skyroc/adapter-antd`
- [ ] 创建 `@skyroc/adapter-react-i18next`

#### 阶段 4: 功能包拆分 (1周)

**任务清单**:
- [ ] 创建 `@skyroc/feature-notification`
- [ ] 创建 `@skyroc/feature-menu`

#### 阶段 5: 优化和测试 (1周)

**任务清单**:
- [ ] 重构 `apps/admin` 使用新包
- [ ] 集成测试
- [ ] 性能测试
- [ ] 文档完善

### 5.2 迁移工具脚本

创建 `scripts/migrate-package.ts`:

```ts
import fs from 'fs-extra'
import path from 'path'

interface MigrateConfig {
  source: string          // apps/admin/src/features/auth
  target: string          // packages/core-auth
  packageName: string     // @skyroc/core-auth
  dependencies: string[]  // ['jotai', '@skyroc/core-storage']
}

async function migratePackage(config: MigrateConfig) {
  const { source, target, packageName, dependencies } = config

  // 1. 创建包目录结构
  await fs.ensureDir(path.join(target, 'src'))

  // 2. 复制源文件
  await fs.copy(source, path.join(target, 'src'))

  // 3. 生成 package.json
  const pkgJson = {
    name: packageName,
    version: '1.0.0',
    exports: { '.': './src/index.ts' },
    dependencies: dependencies.reduce((acc, dep) => {
      acc[dep] = dep.startsWith('@skyroc/') ? 'workspace:*' : 'catalog:*'
      return acc
    }, {} as Record<string, string>)
  }

  await fs.writeJSON(
    path.join(target, 'package.json'),
    pkgJson,
    { spaces: 2 }
  )

  // 4. 更新导入路径
  // TODO: 使用 AST 工具自动更新 import 语句
}

// 使用示例
migratePackage({
  source: 'apps/admin/src/features/auth',
  target: 'packages/core-auth',
  packageName: '@skyroc/core-auth',
  dependencies: ['jotai', '@skyroc/core-storage', '@skyroc/core-types']
})
```

---

## 6. 使用指南

### 6.1 快速启动新项目

#### 方案 A: 完整模板 (推荐)

创建 `templates/admin-starter`:

```json
{
  "name": "my-admin",
  "dependencies": {
    // 核心包（必选）
    "@skyroc/core-auth": "workspace:*",
    "@skyroc/core-i18n": "workspace:*",
    "@skyroc/core-theme": "workspace:*",
    "@skyroc/core-storage": "workspace:*",
    "@skyroc/core-state": "workspace:*",
    "@skyroc/core-types": "workspace:*",
    "@skyroc/core-constants": "workspace:*",

    // Web 包（Web 应用必选）
    "@skyroc/web-router": "workspace:*",
    "@skyroc/web-layouts": "workspace:*",
    "@skyroc/web-components": "workspace:*",

    // 适配器（必选）
    "@skyroc/adapter-antd": "workspace:*",
    "@skyroc/adapter-react-i18next": "workspace:*",

    // 功能包（可选）
    "@skyroc/feature-notification": "workspace:*",
    "@skyroc/feature-menu": "workspace:*",
    "@skyroc/web-table": "workspace:*",
    "@skyroc/web-form": "workspace:*",

    // 工具包
    "@sa/axios": "workspace:*",
    "@skyroc/utils": "workspace:*",
    "@sa/color": "workspace:*"
  }
}
```

使用方式:
```bash
# 1. 复制模板
cp -r templates/admin-starter apps/my-admin

# 2. 安装依赖
cd apps/my-admin
pnpm install

# 3. 启动开发
pnpm dev
```

#### 方案 B: 按需组合

最小化启动:
```ts
// apps/minimal-admin/src/main.tsx
import { JotaiProvider } from '@skyroc/core-state'
import { I18nProvider } from '@skyroc/adapter-react-i18next'
import { AntdProvider } from '@skyroc/adapter-antd'
import { RouterProvider } from '@skyroc/web-router'

function App() {
  return (
    <JotaiProvider>
      <I18nProvider>
        <AntdProvider>
          <RouterProvider />
        </AntdProvider>
      </I18nProvider>
    </JotaiProvider>
  )
}
```

### 6.2 React Native 项目使用

```ts
// apps/mobile-app/src/App.tsx
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createStorage } from '@skyroc/core-storage'
import { asyncStorageAdapter } from '@skyroc/core-storage/react-native'

// 1. 配置存储
const storage = createStorage(
  asyncStorageAdapter(AsyncStorage),
  'my-app-'
)

// 2. 使用核心包
import { useAuth } from '@skyroc/core-auth'
import { useLang } from '@skyroc/core-i18n'
import { useTheme } from '@skyroc/core-theme'

function App() {
  const { isLoggedIn } = useAuth()
  const { locale } = useLang()
  const { colors } = useTheme()

  return (
    <View style={{ backgroundColor: colors.background }}>
      {/* ... */}
    </View>
  )
}
```

### 6.3 包依赖示例

#### 示例 1: 只使用认证
```json
{
  "dependencies": {
    "@skyroc/core-auth": "workspace:*",
    "@skyroc/core-storage": "workspace:*",
    "@skyroc/core-types": "workspace:*",
    "@sa/axios": "workspace:*"
  }
}
```

#### 示例 2: 完整后台管理
```json
{
  "dependencies": {
    // 所有 core-* 包
    // 所有 web-* 包
    // 所有 adapter-* 包
    // 所有 feature-* 包
  }
}
```

### 6.4 版本管理

使用 pnpm catalog 统一管理版本:

```yaml
# pnpm-workspace.yaml
catalogs:
  skyroc:
    # 核心包
    '@skyroc/core-auth': workspace:*
    '@skyroc/core-i18n': workspace:*
    # ...

  dependencies:
    jotai: ^2.16.0
    antd: ^6.1.0
    # ...
```

---

## 7. 进阶主题

### 7.1 包开发规范

#### 目录结构规范
```
@skyroc/[package-name]/
├── src/
│   ├── components/      # 组件 (如有)
│   ├── hooks/           # Hooks
│   ├── utils/           # 工具函数
│   ├── types/           # 类型定义
│   ├── constants/       # 常量
│   └── index.ts         # 入口文件
├── package.json
├── tsconfig.json
└── README.md
```

#### 导出规范
```ts
// ❌ 避免默认导出
export default function useAuth() {}

// ✅ 使用命名导出
export function useAuth() {}

// ✅ 类型单独导出
export type { AuthState, UserInfo }
```

#### 依赖规范
- **核心包**: 只能依赖其他核心包和第三方库
- **Web包**: 可依赖核心包和Web相关库
- **适配器包**: 可依赖核心包和对应UI库
- **功能包**: 可依赖任意包

### 7.2 类型安全

#### 全局类型扩展
```ts
// packages/core-types/src/global.d.ts
declare global {
  namespace App {
    interface User {
      id: string
      name: string
    }
  }
}

export {}
```

#### 模块增强
```ts
// packages/core-auth/src/types.ts
declare module '@skyroc/core-storage' {
  interface StorageSchema {
    token: string
    refreshToken: string
    userInfo: App.User
  }
}
```

### 7.3 Tree-shaking 优化

确保所有包支持 Tree-shaking:

```json
// package.json
{
  "sideEffects": false,
  "exports": {
    ".": {
      "types": "./src/index.ts",
      "import": "./src/index.ts"
    },
    "./hooks": {
      "types": "./src/hooks/index.ts",
      "import": "./src/hooks/index.ts"
    }
  }
}
```

### 7.4 性能监控

为每个包添加性能指标:

```ts
// packages/core-auth/src/metrics.ts
export const AUTH_METRICS = {
  LOGIN_TIME: 'auth.login.time',
  LOGOUT_TIME: 'auth.logout.time',
  TOKEN_REFRESH_TIME: 'auth.token-refresh.time'
}
```

---

## 8. FAQ

### Q1: 为什么要拆这么细？
**A**:
1. **按需加载**: 只引入需要的功能，减小bundle大小
2. **职责清晰**: 每个包只做一件事，易于维护
3. **复用性**: 可在不同项目间复用
4. **团队协作**: 不同团队可并行开发不同包

### Q2: React Native 如何使用这些包？
**A**:
- 所有 `core-*` 包都支持 RN
- 通过平台适配器（如 `@skyroc/core-storage/react-native`）处理平台差异
- UI 部分需要替换为 RN 组件库（如使用 React Native Paper 替代 Ant Design）

### Q3: 如何处理包之间的循环依赖？
**A**:
- 严格遵循分层架构：core -> adapter -> feature -> app
- 使用依赖注入模式
- 通过事件总线解耦

### Q4: 包的版本如何管理？
**A**:
- 使用 pnpm catalog 统一版本
- workspace 包使用 `workspace:*`
- 第三方包使用 `catalog:*`

### Q5: 如何快速创建新包？
**A**:
```bash
# 使用脚手架工具
pnpm create-package @skyroc/feature-xxx --template=feature

# 手动创建
mkdir -p packages/feature-xxx/src
cd packages/feature-xxx
pnpm init
```

---

## 9. 总结

### 9.1 拆分收益

| 维度 | 拆分前 | 拆分后 |
|-----|--------|--------|
| **启动新项目** | 复制整个 apps/admin（~5GB） | 组合需要的包（~500MB） |
| **跨平台复用** | 无法复用 | 60% 代码可复用到 RN |
| **Bundle 大小** | 全量打包（~2MB） | 按需引入（~800KB） |
| **维护性** | 代码耦合，难以定位 | 职责清晰，易于维护 |
| **团队协作** | 单一仓库冲突多 | 多包并行开发 |

### 9.2 最佳实践

1. **渐进式迁移**: 不要一次性重构，按阶段迁移
2. **保持向后兼容**: 使用 `@deprecated` 标记废弃代码
3. **文档先行**: 每个包都要有完整的 README
4. **测试覆盖**: 核心包测试覆盖率 > 80%
5. **性能监控**: 监控包的加载时间和体积

### 9.3 下一步行动

- [ ] Review 本文档，确认拆分方案
- [ ] 创建 GitHub Project 管理迁移任务
- [ ] 启动阶段 1: 基础包拆分
- [ ] 编写迁移工具脚本
- [ ] 建立包开发规范文档

---

**文档版本**: v1.0.0
**最后更新**: 2026-01-25
**作者**: Claude + 项目团队
