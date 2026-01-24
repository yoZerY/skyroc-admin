# @skyroc/web-router

> TanStack Router 路由封装 - Web 专用

## 📦 包信息

- **包名**: `@skyroc/web-router`
- **版本**: `1.0.0`
- **平台**: Web Only
- **依赖**:
  - `@tanstack/react-router` - 路由核心
  - `@skyroc/core-auth` - 认证集成

## 🎯 职责定位

**核心职责**:
- Router 实例配置
- 路由守卫（认证检查）
- Query 参数序列化/解析
- 路由 hooks 封装

## 📐 目录结构

```
@skyroc/web-router/
├── src/
│   ├── config/
│   │   └── router.ts          # Router 配置
│   ├── hooks/
│   │   ├── use-route.ts       # 路由 hook
│   │   └── use-navigate.ts    # 导航 hook
│   ├── guards/
│   │   └── auth-guard.ts      # 认证守卫
│   ├── utils/
│   │   ├── query.ts           # Query 工具
│   │   └── loader.ts          # Loader 工具
│   ├── types/
│   │   └── index.ts
│   └── index.ts
└── package.json
```

## 🔌 API 设计

```ts
// Router 实例
export { router } from './config/router'

// Hooks
export { useRoute, useNavigate, useRouteParams } from './hooks'

// Utils
export { parseQuery, stringifyQuery } from './utils/query'

// Guards
export { createAuthGuard } from './guards/auth-guard'

// Types
export type { RouterConfig, RouteContext } from './types'
```

## 🔨 核心实现

### 1. Router 配置

```ts
// src/config/router.ts
import { createRouter } from '@tanstack/react-router'
import { parseQuery, stringifyQuery } from '../utils/query'
import { routeTree } from './routeTree.gen' // 自动生成

export const router = createRouter({
  routeTree,

  // Query 序列化
  parseSearch: parseQuery,
  stringifySearch: stringifyQuery,

  // 默认配置
  defaultPreload: 'intent',
  defaultPendingMs: 10,

  // Context（供路由守卫使用）
  context: {
    // 在应用层注入认证信息
  }
})

export type RouterConfig = typeof router
```

### 2. Query 工具

```ts
// src/utils/query.ts
import qs from 'qs'

export function parseQuery(searchStr: string) {
  if (!searchStr) return {}

  return qs.parse(searchStr, {
    ignoreQueryPrefix: true,
    comma: true
  })
}

export function stringifyQuery(obj: Record<string, any>) {
  return qs.stringify(obj, {
    addQueryPrefix: true,
    skipNulls: true,
    arrayFormat: 'comma'
  })
}
```

### 3. 认证守卫

```ts
// src/guards/auth-guard.ts
import { redirect } from '@tanstack/react-router'
import type { LoaderContext } from '../types'

export function createAuthGuard() {
  return async ({ context, location }: LoaderContext) => {
    const { isLoggedIn } = context

    if (!isLoggedIn && location.pathname !== '/login') {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href
        }
      })
    }
  }
}
```

### 4. useRoute Hook

```ts
// src/hooks/use-route.ts
import { useLocation, useSearch, useParams } from '@tanstack/react-router'

export function useRoute() {
  const location = useLocation()
  const search = useSearch({ from: '__root__' })
  const params = useParams({ from: '__root__' })

  return {
    pathname: location.pathname,
    search,
    params,
    searchStr: location.search,
    hash: location.hash
  }
}
```

## 💡 使用示例

### 示例 1: 路由配置

```tsx
// apps/web-admin/src/main.tsx
import { RouterProvider } from '@tanstack/react-router'
import { router } from '@skyroc/web-router'
import { useAuth } from '@skyroc/core-auth'

function App() {
  const auth = useAuth()

  // 注入认证 context
  return (
    <RouterProvider
      router={router}
      context={{ ...auth }}
    />
  )
}
```

### 示例 2: 路由守卫

```tsx
// apps/web-admin/src/pages/__root.tsx
import { createRootRoute } from '@tanstack/react-router'
import { createAuthGuard } from '@skyroc/web-router'

const authGuard = createAuthGuard()

export const Route = createRootRoute({
  beforeLoad: authGuard
})
```

### 示例 3: 使用 Query

```tsx
import { useRoute } from '@skyroc/web-router'

function SearchPage() {
  const { search } = useRoute()

  console.log(search.keyword) // 类型安全的 query 参数

  return <div>Search: {search.keyword}</div>
}
```

## 🔄 从现有代码迁移

### 当前代码位置

```
apps/admin/src/features/router/
├── index.ts       → web-router/config/router.ts
├── query.ts       → web-router/utils/query.ts
└── use-route.ts   → web-router/hooks/use-route.ts
```

## 📝 待补充内容

- [ ] 路由懒加载优化
- [ ] 路由切换动画
- [ ] 面包屑生成
- [ ] 路由权限检查
- [ ] 404 处理
- [ ] 预加载策略

---

**最后更新**: 2026-01-25
