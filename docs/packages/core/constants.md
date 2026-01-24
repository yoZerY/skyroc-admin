# @skyroc/core-constants

> 常量和枚举定义 - 跨平台支持

## 📦 包信息

- **包名**: `@skyroc/core-constants`
- **版本**: `1.0.0`
- **平台**: Universal (Web + React Native)
- **依赖**:
  - `@skyroc/core-types` - 类型定义

## 🎯 职责定位

**核心职责**:
- 应用常量定义
- 业务枚举值
- 正则表达式
- 配置选项

**设计原则**:
- 不可变值
- 语义化命名
- 分类组织

## 📐 目录结构

```
@skyroc/core-constants/
├── src/
│   ├── app.ts              # 应用常量
│   ├── business.ts         # 业务常量
│   ├── regex.ts            # 正则表达式
│   ├── enums/
│   │   ├── common.ts       # 通用枚举
│   │   └── system.ts       # 系统枚举
│   └── index.ts
└── package.json
```

## 🔌 API 设计

### 主要导出

```ts
// 应用常量
export * from './app'

// 业务常量
export * from './business'

// 正则表达式
export * from './regex'

// 枚举
export * from './enums/common'
export * from './enums/system'
```

## 🔨 核心实现

### 1. 应用常量

```ts
// src/app.ts
/** 全局Header菜单ID */
export const GLOBAL_HEADER_MENU_ID = '#__GLOBAL_HEADER_MENU__'

/** 全局Sider菜单ID */
export const GLOBAL_SIDER_MENU_ID = '#__GLOBAL_SIDER_MENU__'

/** 暗色模式类名 */
export const DARK_CLASS = 'dark'

/** 默认动画时长 (ms) */
export const DEFAULT_ANIMATION_DURATION = 300

/** 默认防抖延迟 (ms) */
export const DEFAULT_DEBOUNCE_DELAY = 300

/** 默认节流间隔 (ms) */
export const DEFAULT_THROTTLE_INTERVAL = 1000

/** 应用 Logo ASCII */
export const APP_LOGO = `
██████╗ ███████╗ █████╗  ██████╗████████╗███████╗ ██████╗ ██╗   ██╗██████╗ ███████╗ █████╗ ███╗   ██╗
██╔══██╗██╔════╝██╔══██╗██╔════╝╚══██╔══╝██╔════╝██╔═══██╗╚██╗ ██╔╝██╔══██╗██╔════╝██╔══██╗████╗  ██║
██████╔╝█████╗  ███████║██║        ██║   ███████╗██║   ██║ ╚████╔╝ ██████╔╝█████╗  ███████║██╔██╗ ██║
██╔══██╗██╔══╝  ██╔══██║██║        ██║   ╚════██║██║   ██║  ╚██╔╝  ██╔══██╗██╔══╝  ██╔══██║██║╚██╗██║
██║  ██║███████╗██║  ██║╚██████╗   ██║   ███████║╚██████╔╝   ██║   ██████╔╝███████╗██║  ██║██║ ╚████║
╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝ ╚═════╝   ╚═╝   ╚══════╝ ╚═════╝    ╚═╝   ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝
`
```

### 2. 业务常量

```ts
// src/business.ts
import type { UnionKey, I18n } from '@skyroc/core-types'

/** 登录模块记录 */
export const loginModuleRecord: Record<UnionKey.LoginModule, I18n.I18nKey> = {
  'pwd-login': 'page.login.pwdLogin.title',
  'code-login': 'page.login.codeLogin.title',
  'register': 'page.login.register.title',
  'reset-pwd': 'page.login.resetPwd.title',
  'bind-wechat': 'page.login.bindWeChat.title'
}

/** 是/否记录 */
export const yesOrNoRecord: Record<CommonType.YesOrNo, I18n.I18nKey> = {
  'Y': 'common.yesOrNo.yes',
  'N': 'common.yesOrNo.no'
}

/** 主题布局模式记录 */
export const themeLayoutModeRecord: Record<UnionKey.ThemeLayoutMode, I18n.I18nKey> = {
  'vertical': 'theme.layout.layoutMode.vertical',
  'horizontal': 'theme.layout.layoutMode.horizontal',
  'vertical-mix': 'theme.layout.layoutMode.vertical-mix',
  'vertical-hybrid-header-first': 'theme.layout.layoutMode.vertical-hybrid-header-first',
  'top-hybrid-sidebar-first': 'theme.layout.layoutMode.top-hybrid-sidebar-first',
  'top-hybrid-header-first': 'theme.layout.layoutMode.top-hybrid-header-first'
}

/** 主题滚动模式记录 */
export const themeScrollModeRecord: Record<UnionKey.ThemeScrollMode, I18n.I18nKey> = {
  'content': 'theme.layout.content.scrollMode.content',
  'wrapper': 'theme.layout.content.scrollMode.wrapper'
}

/** 主题Tab模式记录 */
export const themeTabModeRecord: Record<UnionKey.ThemeTabMode, I18n.I18nKey> = {
  'chrome': 'theme.layout.tab.mode.chrome',
  'button': 'theme.layout.tab.mode.button',
  'slider': 'theme.layout.tab.mode.slider'
}

/** 主题页面动画模式记录 */
export const themePageAnimationModeRecord: Record<UnionKey.ThemePageAnimateMode, I18n.I18nKey> = {
  'fade-slide': 'theme.layout.content.page.mode.fade-slide',
  'fade': 'theme.layout.content.page.mode.fade',
  'fade-bottom': 'theme.layout.content.page.mode.fade-bottom',
  'fade-scale': 'theme.layout.content.page.mode.fade-scale',
  'zoom-fade': 'theme.layout.content.page.mode.zoom-fade',
  'zoom-out': 'theme.layout.content.page.mode.zoom-out',
  'none': 'theme.layout.content.page.mode.none'
}

/** 水印时间格式选项 */
export const watermarkTimeFormatOptions = [
  { label: 'YYYY-MM-DD HH:mm', value: 'YYYY-MM-DD HH:mm' },
  { label: 'YYYY-MM-DD HH:mm:ss', value: 'YYYY-MM-DD HH:mm:ss' },
  { label: 'YYYY/MM/DD HH:mm', value: 'YYYY/MM/DD HH:mm' },
  { label: 'YYYY/MM/DD HH:mm:ss', value: 'YYYY/MM/DD HH:mm:ss' },
  { label: 'HH:mm', value: 'HH:mm' },
  { label: 'HH:mm:ss', value: 'HH:mm:ss' },
  { label: 'MM-DD HH:mm', value: 'MM-DD HH:mm' }
] as const
```

### 3. 正则表达式

```ts
// src/regex.ts
/** 手机号正则 */
export const REG_PHONE = /^1[3-9]\d{9}$/

/** 邮箱正则 */
export const REG_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

/** 6位验证码正则 */
export const REG_CODE_SIX = /^\d{6}$/

/** 4位验证码正则 */
export const REG_CODE_FOUR = /^\d{4}$/

/** 密码正则 (6-18位，至少包含字母和数字) */
export const REG_PWD = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/

/** 用户名正则 (4-16位，字母、数字、下划线) */
export const REG_USER_NAME = /^[a-zA-Z0-9_]{4,16}$/

/** URL正则 */
export const REG_URL = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/

/** IP地址正则 */
export const REG_IP = /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/

/** 身份证号正则 */
export const REG_ID_CARD = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/

/** 银行卡号正则 */
export const REG_BANK_CARD = /^[1-9]\d{9,29}$/

/** 中文正则 */
export const REG_CHINESE = /^[\u4e00-\u9fa5]+$/

/** 整数正则 */
export const REG_INTEGER = /^-?\d+$/

/** 正整数正则 */
export const REG_POSITIVE_INTEGER = /^\d+$/

/** 浮点数正则 */
export const REG_FLOAT = /^-?\d+(\.\d+)?$/

/** 正浮点数正则 */
export const REG_POSITIVE_FLOAT = /^\d+(\.\d+)?$/
```

### 4. 通用枚举

```ts
// src/enums/common.ts
/** 请求状态码 */
export enum ResponseCode {
  /** 成功 */
  SUCCESS = 200,
  /** 未授权 */
  UNAUTHORIZED = 401,
  /** 禁止访问 */
  FORBIDDEN = 403,
  /** 未找到 */
  NOT_FOUND = 404,
  /** 服务器错误 */
  SERVER_ERROR = 500
}

/** HTTP 方法 */
export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH'
}

/** 存储类型 */
export enum StorageType {
  LOCAL = 'local',
  SESSION = 'session',
  COOKIE = 'cookie'
}

/** 环境类型 */
export enum EnvType {
  DEVELOPMENT = 'development',
  TEST = 'test',
  PRODUCTION = 'production'
}
```

### 5. 系统枚举

```ts
// src/enums/system.ts
/** 用户状态 */
export enum UserStatus {
  /** 启用 */
  ENABLED = 1,
  /** 禁用 */
  DISABLED = 0
}

/** 用户性别 */
export enum UserGender {
  /** 男 */
  MALE = 1,
  /** 女 */
  FEMALE = 2,
  /** 未知 */
  UNKNOWN = 0
}

/** 菜单类型 */
export enum MenuType {
  /** 目录 */
  DIRECTORY = 1,
  /** 菜单 */
  MENU = 2,
  /** 按钮 */
  BUTTON = 3
}

/** 数据权限 */
export enum DataScope {
  /** 全部数据权限 */
  ALL = 1,
  /** 自定义数据权限 */
  CUSTOM = 2,
  /** 本部门数据权限 */
  DEPT = 3,
  /** 本部门及以下数据权限 */
  DEPT_AND_CHILD = 4,
  /** 仅本人数据权限 */
  SELF = 5
}
```

## 💡 使用示例

### 示例 1: 使用正则验证

```ts
import { REG_PHONE, REG_EMAIL } from '@skyroc/core-constants'

function validatePhone(phone: string): boolean {
  return REG_PHONE.test(phone)
}

function validateEmail(email: string): boolean {
  return REG_EMAIL.test(email)
}
```

### 示例 2: 使用枚举

```ts
import { ResponseCode, UserStatus } from '@skyroc/core-constants'

// 判断响应状态
if (response.code === ResponseCode.SUCCESS) {
  console.log('请求成功')
}

// 用户状态判断
const isEnabled = user.status === UserStatus.ENABLED
```

### 示例 3: 使用业务常量

```ts
import { loginModuleRecord } from '@skyroc/core-constants'

// 获取登录模块的i18n key
const i18nKey = loginModuleRecord['pwd-login']
// 'page.login.pwdLogin.title'
```

### 示例 4: 配合工具函数

```ts
import { themeLayoutModeRecord } from '@skyroc/core-constants'

// 转换为选项列表
function transformRecordToOption<T extends Record<string, string>>(
  record: T
): Array<{ label: string; value: keyof T }> {
  return Object.entries(record).map(([value, label]) => ({
    label,
    value
  }))
}

const layoutModeOptions = transformRecordToOption(themeLayoutModeRecord)
```

## 🔄 从现有代码迁移

### 当前代码位置

```
apps/admin/src/constants/
├── app.ts        → core-constants/src/app.ts
├── business.ts   → core-constants/src/business.ts
└── reg.ts        → core-constants/src/regex.ts

apps/admin/src/enums/
├── common.ts     → core-constants/src/enums/common.ts
└── system.ts     → core-constants/src/enums/system.ts
```

### 迁移步骤

1. **创建包**
```bash
mkdir -p packages/core-constants/src/enums
```

2. **迁移文件**
```bash
cp apps/admin/src/constants/* packages/core-constants/src/
cp apps/admin/src/enums/* packages/core-constants/src/enums/
```

3. **更新导入**
```ts
// 旧代码
import { REG_PHONE } from '@/constants/reg'
import { ResponseCode } from '@/enums/common'

// 新代码
import { REG_PHONE, ResponseCode } from '@skyroc/core-constants'
```

## 🧪 测试策略

```ts
// packages/core-constants/src/__tests__/regex.test.ts
import { REG_PHONE, REG_EMAIL, REG_PWD } from '../regex'

describe('正则表达式', () => {
  describe('REG_PHONE', () => {
    it('应该匹配有效手机号', () => {
      expect(REG_PHONE.test('13800138000')).toBe(true)
      expect(REG_PHONE.test('18612345678')).toBe(true)
    })

    it('不应该匹配无效手机号', () => {
      expect(REG_PHONE.test('12345678901')).toBe(false)
      expect(REG_PHONE.test('1234567890')).toBe(false)
    })
  })

  // ... 更多测试
})
```

## 📝 待补充内容

- [ ] 更多业务常量
- [ ] API 错误码枚举
- [ ] 更完善的正则表达式库
- [ ] 常量分组优化
- [ ] 环境变量常量
- [ ] 配置常量

## 🔗 相关文档

- [core-types.md](./types.md) - 配合使用的类型定义

---

**最后更新**: 2026-01-25
**维护者**: 待补充
