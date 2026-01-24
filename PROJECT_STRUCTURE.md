# 项目目录结构

## 项目概述

这是一个基于 pnpm + turbo 的 monorepo 项目，使用 React 19 + TypeScript + Vite 构建的后台管理系统。

- **包管理器**: pnpm@10.4.1
- **Node 版本**: >=20
- **构建工具**: Turbo
- **前端框架**: React 19.2.1
- **状态管理**: Jotai + TanStack Query
- **路由**: TanStack Router
- **UI 框架**: Ant Design 6.1.0
- **样式方案**: UnoCSS + Sass

## 根目录结构

```
soybean-admin-react/
├── .vscode/                 # VS Code 配置
├── apps/                    # 应用目录
├── packages/                # 公共包目录
├── ui-kit/                  # UI 组件库
├── internal/                # 内部工具包
├── .editorconfig           # 编辑器配置
├── .gitattributes          # Git 属性配置
├── .gitignore              # Git 忽略配置
├── .npmrc                  # npm 配置
├── eslint.config.js        # ESLint 配置
├── package.json            # 根 package.json
├── pnpm-lock.yaml          # pnpm 锁文件
├── pnpm-workspace.yaml     # pnpm workspace 配置
├── turbo.json              # Turbo 配置
└── README.md               # 项目说明
```

## 详细目录结构

### 📱 apps/ - 应用目录

```
apps/
└── admin/                   # 管理后台应用
    ├── .tanstack/           # TanStack 缓存目录
    │   └── tmp/
    ├── build/               # 构建配置
    │   ├── config/          # Vite 配置
    │   └── plugins/         # Vite 插件
    ├── public/              # 静态资源
    ├── src/                 # 源代码
    │   ├── assets/          # 资源文件（图片、字体等）
    │   ├── components/      # 公共组件
    │   ├── constants/       # 常量定义
    │   ├── enums/           # 枚举定义
    │   ├── features/        # 功能模块
    │   │   ├── animate/     # 动画功能
    │   │   │   ├── animateFeature.ts    # Motion 动画特性配置
    │   │   │   ├── LazyMotion.tsx       # Motion 懒加载组件
    │   │   │   └── index.ts
    │   │   ├── antd/        # Ant Design 配置
    │   │   │   ├── AntdProvider.tsx     # Ant Design 提供者组件
    │   │   │   └── shared.ts            # Ant Design 共享配置
    │   │   ├── auth/        # 认证功能
    │   │   │   ├── use-auth.ts          # 认证 Hook
    │   │   │   ├── use-login.ts         # 登录 Hook
    │   │   │   └── shared.ts            # 认证共享工具
    │   │   ├── chat/        # 聊天/通知功能
    │   │   │   ├── NotificationPanel.tsx      # 通知面板组件
    │   │   │   ├── NotificationButton.tsx     # 通知按钮组件
    │   │   │   ├── NotificationProvider.tsx   # 通知提供者
    │   │   │   ├── use-notification.ts        # 通知 Hook
    │   │   │   ├── use-mock-notifications.ts  # Mock 通知数据
    │   │   │   ├── types.ts                   # 类型定义
    │   │   │   ├── notification.css           # 通知样式
    │   │   │   └── index.ts
    │   │   ├── effects/     # 全局副作用
    │   │   │   ├── Devtools.tsx        # 开发者工具
    │   │   │   └── GlobalEffect.tsx    # 全局副作用组件
    │   │   ├── form/        # 表单功能
    │   │   │   └── use-rules.ts        # 表单验证规则 Hook
    │   │   ├── jotai/       # Jotai 状态管理
    │   │   │   ├── JotaiProvider.tsx   # Jotai 提供者
    │   │   │   └── store.ts            # Jotai Store 配置
    │   │   ├── lang/        # 国际化功能
    │   │   │   ├── LangEffect.tsx      # 语言副作用组件
    │   │   │   ├── LangSwitch.tsx      # 语言切换组件
    │   │   │   └── use-lang.ts         # 语言 Hook
    │   │   ├── menus/       # 菜单功能
    │   │   │   ├── use-menus.ts        # 菜单 Hook
    │   │   │   ├── menu-config.ts      # 菜单配置
    │   │   │   ├── menu-category.ts    # 菜单分类
    │   │   │   ├── menu-generator.tsx  # 菜单生成器
    │   │   │   └── extras.tsx          # 额外菜单项
    │   │   ├── router/      # 路由功能
    │   │   │   ├── RouterProvider.tsx  # 路由提供者
    │   │   │   ├── use-route.ts        # 路由 Hook
    │   │   │   ├── routeTree.gen.ts    # 路由树（自动生成）
    │   │   │   ├── query.ts            # 查询参数配置
    │   │   │   └── index.ts
    │   │   ├── table/       # 表格功能
    │   │   │   ├── use-table.ts              # 表格 Hook
    │   │   │   ├── use-table-scroll.ts       # 表格滚动 Hook
    │   │   │   ├── use-table-operate.ts      # 表格操作 Hook
    │   │   │   ├── DragContent.tsx           # 拖拽内容组件
    │   │   │   ├── TableHeaderOperation.tsx  # 表格头部操作
    │   │   │   ├── hooks.ts                  # 表格通用 Hooks
    │   │   │   ├── types.ts                  # 类型定义
    │   │   │   └── index.ts
    │   │   └── theme/       # 主题系统
    │   │       ├── antd-adapter/             # Ant Design 主题适配器
    │   │       │   ├── default/              # 默认主题配置
    │   │       │   │   └── color.ts          # 颜色配置
    │   │       │   ├── types/                # 类型定义
    │   │       │   ├── seed.ts               # 主题种子配置
    │   │       │   └── shared/               # 共享工具
    │   │       ├── components/               # 主题组件
    │   │       │   ├── ThemeEffect.tsx       # 主题副作用组件
    │   │       │   ├── ThemeSchemaSwitch.tsx # 主题模式切换开关
    │   │       │   └── ThemeSchemaSegmented.tsx  # 主题模式分段控制器
    │   │       ├── preset/                   # 主题预设
    │   │       │   ├── default.json          # 默认主题
    │   │       │   ├── dark.json             # 暗色主题
    │   │       │   ├── shadcn.json           # Shadcn 主题
    │   │       │   ├── azir.json             # Azir 主题
    │   │       │   └── compact.json          # 紧凑主题
    │   │       ├── settings.ts               # 主题设置
    │   │       ├── shared.ts                 # 主题共享工具
    │   │       └── useSettingsTheme.ts       # 主题设置 Hook
    │   ├── hooks/           # 自定义 Hooks
    │   ├── layouts/         # 布局组件
    │   ├── locales/         # 国际化文件
    │   ├── pages/           # 页面组件
    │   │   ├── (admin)/     # 管理后台页面
    │   │   │   ├── about/   # 关于页面
    │   │   │   ├── manage/  # 管理页面
    │   │   │   │   ├── menu/    # 菜单管理
    │   │   │   │   ├── role/    # 角色管理
    │   │   │   │   └── user/    # 用户管理
    │   │   │   └── ...
    │   │   ├── (auth)/      # 认证相关页面
    │   │   │   └── login/   # 登录页面
    │   │   └── loading.tsx  # 加载页面
    │   ├── plugins/         # 插件
    │   ├── service/         # API 服务
    │   ├── styles/          # 样式文件
    │   │   └── css/
    │   ├── types/           # 类型定义
    │   └── utils/           # 工具函数
    ├── package.json         # 应用配置
    └── uno.config.ts        # UnoCSS 配置
```

### 📦 packages/ - 公共包目录

```
packages/
├── axios/                   # Axios 封装
│   ├── src/
│   └── package.json
├── color/                   # 颜色工具库
│   ├── src/
│   │   ├── constant/        # 颜色常量
│   │   ├── palette/         # 调色板算法
│   │   │   └── oklch.ts     # OKLCH 色彩空间实现
│   │   ├── shared/          # 共享工具
│   │   └── types/           # 类型定义
│   └── package.json
├── materials/               # 物料库
│   ├── src/
│   │   ├── libs/            # 第三方库封装
│   │   └── types/           # 类型定义
│   └── package.json
├── scripts/                 # 脚本工具
│   ├── src/
│   │   ├── commands/        # CLI 命令
│   │   ├── config/          # 配置
│   │   ├── locales/         # 国际化
│   │   ├── shared/          # 共享工具
│   │   └── types/           # 类型定义
│   └── package.json
└── utils/                   # 通用工具库
    ├── src/
    └── package.json
```

### 🎨 ui-kit/ - UI 组件库

```
ui-kit/
└── ui/                      # UI 组件包
    ├── src/
    │   ├── components/      # 组件实现
    │   ├── hooks/           # UI 相关 Hooks
    │   ├── types/           # 类型定义
    │   └── utils/           # UI 工具函数
    └── package.json
```

### 🔧 internal/ - 内部工具

```
internal/
└── uno-config/              # UnoCSS 配置包
    ├── src/
    │   ├── generate.ts      # 配置生成器
    │   ├── index.ts         # 入口文件
    │   ├── shortcuts.ts     # 快捷方式定义
    │   └── types.ts         # 类型定义
    └── package.json
```

## 主要技术栈

### 核心框架
- React 19.2.1
- TypeScript 5.9.3
- Vite 7.2.7

### 状态管理
- Jotai 2.16.0
- TanStack Query 5.90.12

### 路由
- TanStack Router 1.140.0

### UI 组件
- Ant Design 6.1.0
- Radix UI
- Motion (动画库)

### 样式方案
- UnoCSS 66.5.10
- Sass 1.96.0
- Tailwind Merge
- Tailwind Variants

### 工具库
- Axios (网络请求)
- dayjs / date-fns (日期处理)
- i18next (国际化)
- zod (数据验证)
- nanoid (ID 生成)
- crypto-js (加密)
- localforage (本地存储)

### 开发工具
- ESLint 9.39.2
- Turbo 2.7.1
- pnpm 10.4.1

## 工作区说明

项目使用 pnpm workspace 管理，包含四个主要工作区：

1. **apps/***: 应用程序，包含完整的前端应用
2. **packages/***: 可复用的公共包
3. **ui-kit/***: UI 组件库
4. **internal/***: 内部工具和配置包

## 可用脚本

```bash
pnpm dev        # 启动开发服务器
pnpm build      # 构建所有包
pnpm lint       # 代码检查
pnpm typecheck  # 类型检查
pnpm test       # 运行测试
pnpm clean      # 清理构建产物
```
