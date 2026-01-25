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
│   │   ├── common.d.ts         # API 通用类型
│   │   └── service.d.ts        # 服务配置类型
│   ├── app/
│   │   ├── global.d.ts         # 全局类型
│   │   ├── theme.d.ts          # 主题类型
│   │   └── union-key.d.ts      # 联合类型key
│   ├── locales/
│   │   └── i18n.d.ts           # 国际化类型
│   ├── common.d.ts             # 通用类型
│   ├── menu.d.ts               # 菜单类型
│   ├── router.d.ts             # 路由类型
│   ├── storage.d.ts            # 存储类型
│   └── index.ts                # 统一导出
├── package.json
├── tsconfig.json
└── README.md
```

## 💡 使用示例

### 示例 1: API 类型使用

```ts
// 在 service 中使用
import type { Api } from '@skyroc/core-types'

async function login(params: Api.Auth.LoginParams): Promise<Api.Service.Response<Api.Auth.LoginResponse>> {
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

## 🔌 主要导出

### API 类型
- `Api.Auth` - 认证相关类型
- `Api.Route` - 路由相关类型
- `Api.Common` - 通用 API 类型
- `Api.Service` - 服务配置类型

### App 类型
- `App.Global` - 全局应用类型
- `Theme` - 主题配置类型
- `UnionKey` - 联合类型键

### 其他类型
- `CommonType` - 通用工具类型
- `Menu` - 菜单类型
- `Router` - 路由类型
- `StorageType` - 存储类型
- `I18n` - 国际化类型

---

**最后更新**: 2026-01-25
