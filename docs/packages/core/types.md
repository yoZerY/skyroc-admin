# @skyroc/core-types

> 全局类型定义 - 跨平台支持

## 📦 包信息

- **包名**: `@skyroc/core-types`
- **版本**: `1.0.0`
- **平台**: Universal (Web)
- **依赖**: 无

## 🎯 职责定位

**核心职责**:
- 提供全局类型定义
- API 响应类型
- 业务实体类型
- 通用工具类型

**设计原则**:
- 零依赖
- 类型优先
- 模块化组织

## 📐 目录结构

```
@skyroc/core-types/
├── src/
│   ├── api/
│   │   ├── auth.d.ts           # 认证相关类型
│   │   ├── route.d.ts          # 路由相关类型
│   │   └── common.d.ts         # API 通用类型
│   ├── app/
│   │   ├── global.d.ts         # 全局类型
│   │   ├── theme.d.ts          # 主题类型
│   │   └── union-key.d.ts      # 联合类型key
│   ├── common.d.ts             # 通用类型
│   ├── menu.d.ts               # 菜单类型
│   ├── storage.d.ts            # 存储类型
│   └── index.ts                # 统一导出
└── package.json
```

## 🔌 API 设计

### 主要导出

```ts
// API 类型
export * from './api/auth'
export * from './api/route'
export * from './api/common'

// App 类型
export * from './app/global'
export * from './app/theme'
export * from './app/union-key'

// 其他类型
export * from './common'
export * from './menu'
export * from './storage'
```

## 🔨 核心实现

### 1. API 通用类型

```ts
// src/api/common.d.ts
declare namespace Api {
  /** 通用的请求响应 */
  interface Response<T = any> {
    /** 状态码 */
    code: number
    /** 消息 */
    message: string
    /** 数据 */
    data: T
  }

  /** 分页请求参数 */
  interface PaginationParams {
    /** 当前页码 */
    current: number
    /** 每页条数 */
    size: number
  }

  /** 分页响应数据 */
  interface PaginationResult<T = any> {
    /** 当前页码 */
    current: number
    /** 每页条数 */
    size: number
    /** 总条数 */
    total: number
    /** 数据列表 */
    records: T[]
  }

  /** 通用列表查询参数 */
  interface CommonSearchParams extends PaginationParams {
    /** 关键词 */
    keyword?: string
    /** 开始时间 */
    startTime?: string
    /** 结束时间 */
    endTime?: string
  }
}
```

### 2. 认证类型

```ts
// src/api/auth.d.ts
declare namespace Api {
  namespace Auth {
    /** 登录token */
    interface LoginToken {
      token: string
      refreshToken: string
    }

    /** 用户信息 */
    interface UserInfo {
      /** 用户ID */
      userId: string
      /** 用户名 */
      userName: string
      /** 角色列表 */
      roles: string[]
      /** 按钮权限列表 */
      buttons: string[]
    }

    /** 登录请求 */
    interface LoginRequest {
      userName: string
      password: string
    }

    /** 登录响应 */
    interface LoginResponse extends LoginToken {
      user: UserInfo
    }
  }
}
```

### 3. 主题类型

```ts
// src/app/theme.d.ts
declare namespace Theme {
  /** 主题模式 */
  type ThemeMode = 'light' | 'dark' | 'auto'

  /** 主题颜色key */
  type ThemeColorKey = 'primary' | 'info' | 'success' | 'warning' | 'error'

  /** 主题颜色 */
  interface ThemeColor {
    primary: string
    info: string
    success: string
    warning: string
    error: string
  }

  /** 主题调色板颜色 */
  type ThemePaletteColor = {
    [K in ThemeColorKey | `${ThemeColorKey}-${50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900}`]: string
  }

  /** 主题设置 */
  interface ThemeSetting {
    /** 主题模式 */
    themeScheme: ThemeMode
    /** 是否灰度 */
    grayscale: boolean
    /** 是否色弱模式 */
    colourWeakness: boolean
    /** 推荐颜色 */
    recommendColor: boolean
    /** 主题颜色 */
    themeColor: string
    /** 其他颜色 */
    otherColor: ThemeColor
    /** 是否跟随主色 */
    isInfoFollowPrimary: boolean
    /** 圆角 */
    themeRadius: number
    /** 字体大小 */
    themeTextSize: number
    /** 布局配置 */
    layout: LayoutSetting
    /** 页面配置 */
    page: PageSetting
    /** ... 更多配置 */
  }

  /** 布局设置 */
  interface LayoutSetting {
    /** 布局模式 */
    mode: 'vertical' | 'horizontal' | 'vertical-mix'
    /** 滚动模式 */
    scrollMode: 'content' | 'wrapper'
  }

  /** 页面设置 */
  interface PageSetting {
    /** 是否开启动画 */
    animate: boolean
    /** 动画模式 */
    animateMode: 'fade' | 'fade-slide' | 'fade-bottom' | 'fade-scale' | 'zoom-fade' | 'zoom-out' | 'none'
  }

  /** 主题Token CSS变量 */
  interface ThemeTokenCSSVars {
    colors: Record<string, string>
    boxShadow: Record<string, string>
  }
}
```

### 4. 菜单类型

```ts
// src/menu.d.ts
declare namespace Menu {
  /** 菜单项 */
  interface MenuItem {
    /** 菜单key */
    key: string
    /** 菜单名称 */
    label: string
    /** 路由路径 */
    routePath?: string
    /** 图标 */
    icon?: string
    /** 子菜单 */
    children?: MenuItem[]
    /** 是否隐藏 */
    hide?: boolean
  }

  /** 菜单映射: layoutId -> 菜单列表 */
  type Menus = Map<string, MenuItem[]>

  /** 快速引用菜单: menuKey -> 菜单项 */
  type QuickReferenceMenus = Map<string, MenuItem>
}
```

### 5. 存储类型

```ts
// src/storage.d.ts
declare namespace StorageType {
  /** 本地存储 */
  interface Local {
    /** Token */
    token: string
    /** 刷新Token */
    refreshToken: string
    /** 用户信息 */
    userInfo: Api.Auth.UserInfo
    /** 主题设置 */
    themeSettings: Theme.ThemeSetting
    /** 语言 */
    lang: I18n.LangType
    /** 最后登录的用户ID */
    lastLoginUserId: string
  }

  /** 会话存储 */
  interface Session {
    /** Tab缓存 */
    tabs: any[]
  }
}
```

### 6. 国际化类型

```ts
// src/locales/i18n.d.ts
declare namespace I18n {
  /** 支持的语言类型 */
  type LangType = 'zh-CN' | 'en-US' | 'ja-JP' | 'ko-KR'

  /** 翻译key (可通过脚本生成) */
  type I18nKey =
    | 'common.confirm'
    | 'common.cancel'
    | 'page.login.title'
    // ... 更多key
}
```

### 7. 联合类型key

```ts
// src/app/union-key.d.ts
declare namespace UnionKey {
  /** 登录模块 */
  type LoginModule = 'pwd-login' | 'code-login' | 'register' | 'reset-pwd' | 'bind-wechat'

  /** 主题布局模式 */
  type ThemeLayoutMode =
    | 'vertical'
    | 'horizontal'
    | 'vertical-mix'
    | 'vertical-hybrid-header-first'
    | 'top-hybrid-sidebar-first'
    | 'top-hybrid-header-first'

  /** 主题滚动模式 */
  type ThemeScrollMode = 'content' | 'wrapper'

  /** 主题Tab模式 */
  type ThemeTabMode = 'chrome' | 'button' | 'slider'

  /** 主题页面动画模式 */
  type ThemePageAnimateMode =
    | 'fade-slide'
    | 'fade'
    | 'fade-bottom'
    | 'fade-scale'
    | 'zoom-fade'
    | 'zoom-out'
    | 'none'

  /** 主题模式 */
  type ThemeScheme = 'light' | 'dark' | 'auto'
}
```

### 8. 通用工具类型

```ts
// src/common.d.ts
declare namespace CommonType {
  /** 是/否 */
  type YesOrNo = 'Y' | 'N'

  /** 可选项 */
  interface Option<T = string> {
    label: string
    value: T
  }

  /** 记录到选项 */
  type RecordToOption<T extends Record<string, string>> = {
    label: string
    value: keyof T
  }[]

  /** 策略 */
  interface StrategyAction {
    condition: boolean
    callback: () => void
  }
}
```

## 💡 使用示例

### 示例 1: API 类型使用

```ts
// 在 service 中使用
import type { Api } from '@skyroc/core-types'

async function login(params: Api.Auth.LoginRequest): Promise<Api.Response<Api.Auth.LoginResponse>> {
  return axios.post('/auth/login', params)
}
```

### 示例 2: 主题类型使用

```ts
// 在主题包中使用
import type { Theme } from '@skyroc/core-types'

const themeSettings: Theme.ThemeSetting = {
  themeScheme: 'light',
  themeColor: '#1890ff',
  // ...
}
```

### 示例 3: 存储类型使用

```ts
// 在存储包中使用
import type { StorageType } from '@skyroc/core-types'

// 扩展存储schema
declare module '@skyroc/core-storage' {
  interface StorageSchema extends StorageType.Local {}
}
```

### 示例 4: 类型推导

```ts
// 使用联合类型
import type { UnionKey } from '@skyroc/core-types'

const loginModule: UnionKey.LoginModule = 'pwd-login' // 类型安全

// 使用记录类型
const record: Record<UnionKey.LoginModule, string> = {
  'pwd-login': 'Password Login',
  'code-login': 'Code Login',
  // TypeScript 会提示缺失的 key
}
```

## 🔄 从现有代码迁移

### 当前代码位置

```
apps/admin/src/types/
├── api/              → core-types/src/api/
├── app/              → core-types/src/app/
├── locales/          → core-types/src/locales/
├── common.d.ts       → core-types/src/common.d.ts
└── menu.d.ts         → core-types/src/menu.d.ts
```

### 迁移步骤

1. **创建包结构**
```bash
mkdir -p packages/core-types/src/{api,app,locales}
```

2. **复制类型文件**
```bash
cp -r apps/admin/src/types/* packages/core-types/src/
```

3. **创建统一导出**
```ts
// packages/core-types/src/index.ts
export * from './api/auth'
export * from './api/common'
export * from './app/global'
// ...
```

4. **更新应用引用**
```ts
// 旧代码
import type { Api } from '@/types/api'

// 新代码
import type { Api } from '@skyroc/core-types'
```

5. **配置 TypeScript**
```json
// tsconfig.json
{
  "compilerOptions": {
    "types": ["@skyroc/core-types"]
  }
}
```

## 🧪 测试策略

类型包主要通过 TypeScript 编译检查，但可以添加类型测试：

```ts
// packages/core-types/src/__tests__/types.test.ts
import type { Api, Theme, Menu } from '../index'

// 类型断言测试
type AssertEqual<T, U> = [T] extends [U] ? ([U] extends [T] ? true : false) : false

// 测试 API 响应类型
type TestApiResponse = AssertEqual<
  Api.Response<string>,
  { code: number; message: string; data: string }
>

const _testApiResponse: TestApiResponse = true

// 测试主题颜色类型
type TestThemeColor = AssertEqual<
  keyof Theme.ThemeColor,
  'primary' | 'info' | 'success' | 'warning' | 'error'
>

const _testThemeColor: TestThemeColor = true
```

## 📝 待补充内容

- [ ] 自动生成 I18nKey 类型（从翻译文件）
- [ ] API 类型自动生成（从 OpenAPI/Swagger）
- [ ] 类型文档生成
- [ ] 类型版本管理
- [ ] 严格模式类型检查
- [ ] 工具类型库扩展

## 🔗 相关文档

- [TypeScript 官方文档](https://www.typescriptlang.org)
- 所有包都依赖此类型包

---

**最后更新**: 2026-01-25
**维护者**: 待补充
