# @skyroc/core-auth

> 认证核心逻辑包 - 跨平台支持 (Web + React Native)

## 📦 包信息

- **包名**: `@skyroc/core-auth`
- **版本**: `1.0.0`
- **平台**: Universal (Web + React Native)
- **依赖**:
  - `jotai` - 状态管理
  - `@skyroc/core-storage` - 存储抽象
  - `@skyroc/core-types` - 类型定义

## 🎯 职责定位

**核心职责**:
- Token 生命周期管理（获取、存储、清除）
- 用户认证状态管理
- 用户信息状态管理
- 认证相关工具函数

**不负责**:
- ❌ HTTP 请求（由 `@sa/axios` 处理）
- ❌ 路由守卫（由 `@skyroc/web-router` 处理）
- ❌ UI 组件（由各应用自行实现）

## 📐 目录结构

```
@skyroc/core-auth/
├── src/
│   ├── atoms/
│   │   └── auth.ts              # Jotai atom 定义
│   ├── hooks/
│   │   └── use-auth.ts          # 认证 hook
│   ├── actions/
│   │   ├── set-auth.ts          # 设置认证信息
│   │   ├── clear-auth.ts        # 清除认证信息
│   │   └── init-auth.ts         # 初始化认证
│   ├── utils/
│   │   ├── token.ts             # Token 工具函数
│   │   └── validation.ts        # 验证逻辑
│   ├── types/
│   │   └── index.ts             # 类型定义
│   └── index.ts
├── package.json
├── tsconfig.json
└── README.md
```

## 🔌 API 设计

### 主要导出

```ts
// Hooks
export { useAuth } from './hooks/use-auth'

// Actions
export { setAuth, clearAuth, initAuth } from './actions'

// Utils
export { getToken, isTokenValid, isTokenExpired } from './utils/token'

// Types
export type {
  AuthState,
  LoginToken,
  UserInfo,
  AuthConfig
} from './types'
```

### 类型定义

```ts
// src/types/index.ts
export interface AuthState {
  token: string
  initialized: boolean
}

export interface LoginToken {
  token: string
  refreshToken: string
}

export interface UserInfo {
  userId: string
  userName: string
  roles: string[]
  // ... 其他用户信息
}

export interface AuthConfig {
  tokenKey?: string
  refreshTokenKey?: string
  storagePrefix?: string
}
```

## 🔨 核心实现

### 1. Atom 定义

```ts
// src/atoms/auth.ts
import { atom } from 'jotai'
import { getToken } from '../utils/token'

const initToken = getToken()

const initState: AuthState = {
  token: initToken,
  initialized: false
}

export const authAtom = atom(
  initState,
  (get, set, update: Partial<AuthState>) => {
    set(authAtom, { ...get(authAtom), ...update })
  }
)
```

### 2. useAuth Hook

```ts
// src/hooks/use-auth.ts
import { useAtom } from 'jotai'
import { authAtom } from '../atoms/auth'
import { setAuth as setAuthAction } from '../actions/set-auth'
import { clearAuth as clearAuthAction } from '../actions/clear-auth'

export function useAuth() {
  const [state, setState] = useAtom(authAtom)

  const isLoggedIn = Boolean(state.token)

  return {
    // 状态
    token: state.token,
    isLoggedIn,
    isAuthInitialized: state.initialized,

    // 操作
    setAuth: setAuthAction,
    clearAuth: clearAuthAction,

    // 工具方法
    updateToken: (token: string) => {
      setState({ token })
    }
  }
}
```

### 3. setAuth Action

```ts
// src/actions/set-auth.ts
import { globalStore } from '@skyroc/core-state'
import { storage } from '@skyroc/core-storage'
import { authAtom } from '../atoms/auth'
import type { LoginToken } from '../types'

export function setAuth(data: LoginToken) {
  // 1. 更新状态
  globalStore.set(authAtom, { token: data.token })

  // 2. 持久化存储
  storage.set('token', data.token)
  storage.set('refreshToken', data.refreshToken)
}
```

### 4. clearAuth Action

```ts
// src/actions/clear-auth.ts
import { globalStore } from '@skyroc/core-state'
import { storage } from '@skyroc/core-storage'
import { authAtom } from '../atoms/auth'

export function clearAuth() {
  // 1. 清除状态
  globalStore.set(authAtom, { token: '', initialized: false })

  // 2. 清除存储
  storage.remove('token')
  storage.remove('refreshToken')
}
```

### 5. Token 工具函数

```ts
// src/utils/token.ts
import { storage } from '@skyroc/core-storage'

export function getToken(): string {
  return storage.get('token') || ''
}

export function getRefreshToken(): string {
  return storage.get('refreshToken') || ''
}

export function isTokenExpired(token: string): boolean {
  // TODO: 实现 JWT 解析和过期检查
  // 可以使用 jwt-decode 或自己解析
  return false
}

export function isTokenValid(token: string): boolean {
  return Boolean(token) && !isTokenExpired(token)
}
```

## 🌐 平台适配

### Web 平台

```ts
// apps/web-admin/src/main.tsx
import { JotaiProvider } from '@skyroc/core-state'
import { useAuth } from '@skyroc/core-auth'

function App() {
  const { isLoggedIn, setAuth, clearAuth } = useAuth()

  // 正常使用
  return <div>{isLoggedIn ? 'Logged In' : 'Logged Out'}</div>
}
```

### React Native 平台

```tsx
// apps/mobile-app/src/App.tsx
import { JotaiProvider } from '@skyroc/core-state'
import { useAuth } from '@skyroc/core-auth'
// Storage adapter 已通过 @skyroc/core-storage/react-native 配置

function App() {
  const { isLoggedIn } = useAuth()

  return (
    <View>
      <Text>{isLoggedIn ? 'Logged In' : 'Logged Out'}</Text>
    </View>
  )
}
```

## 💡 使用示例

### 示例 1: 登录流程

```ts
import { useAuth } from '@skyroc/core-auth'
import { login } from '@/service/api/auth'

function LoginPage() {
  const { setAuth } = useAuth()

  async function handleLogin(username: string, password: string) {
    const res = await login({ username, password })

    // 设置认证信息
    setAuth({
      token: res.data.token,
      refreshToken: res.data.refreshToken
    })

    // 跳转到首页
    navigate('/dashboard')
  }

  return <LoginForm onSubmit={handleLogin} />
}
```

### 示例 2: 退出登录

```ts
import { useAuth } from '@skyroc/core-auth'

function UserMenu() {
  const { clearAuth } = useAuth()

  function handleLogout() {
    clearAuth()
    navigate('/login')
  }

  return <Button onClick={handleLogout}>退出登录</Button>
}
```

### 示例 3: 路由守卫（配合 Router）

```ts
import { useAuth } from '@skyroc/core-auth'
import { Navigate } from '@skyroc/web-router'

function ProtectedRoute({ children }) {
  const { isLoggedIn, isAuthInitialized } = useAuth()

  if (!isAuthInitialized) {
    return <Loading />
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />
  }

  return children
}
```

## 🔄 从现有代码迁移

### 当前代码位置

```
apps/admin/src/features/auth/
├── use-auth.ts       → @skyroc/core-auth/hooks/use-auth.ts
├── shared.ts         → @skyroc/core-auth/utils/token.ts
└── use-login.ts      → 保留在应用层（依赖 API）
```

### 迁移步骤

1. **创建包结构**
```bash
mkdir -p packages/core-auth/src/{atoms,hooks,actions,utils,types}
```

2. **迁移 atom 定义**
```bash
# 提取 authAtom
# 从 apps/admin/src/features/auth/use-auth.ts
# 迁移到 packages/core-auth/src/atoms/auth.ts
```

3. **迁移 hooks**
```bash
# 提取纯状态管理逻辑
# 移除与 API、菜单等的耦合
```

4. **迁移工具函数**
```bash
cp apps/admin/src/features/auth/shared.ts \
   packages/core-auth/src/utils/token.ts
```

5. **更新依赖**
```bash
cd apps/admin
pnpm add @skyroc/core-auth@workspace:*
```

6. **更新导入**
```ts
// 旧代码
import { useAuth } from '@/features/auth/use-auth'

// 新代码
import { useAuth } from '@skyroc/core-auth'
```

## 🧪 测试策略

### 单元测试

```ts
// packages/core-auth/src/__tests__/use-auth.test.ts
import { renderHook, act } from '@testing-library/react'
import { useAuth } from '../hooks/use-auth'

describe('useAuth', () => {
  it('should initialize with empty token', () => {
    const { result } = renderHook(() => useAuth())
    expect(result.current.isLoggedIn).toBe(false)
  })

  it('should set auth correctly', () => {
    const { result } = renderHook(() => useAuth())

    act(() => {
      result.current.setAuth({
        token: 'test-token',
        refreshToken: 'test-refresh-token'
      })
    })

    expect(result.current.isLoggedIn).toBe(true)
    expect(result.current.token).toBe('test-token')
  })

  // ... 更多测试
})
```

## 📝 待补充内容

- [ ] JWT Token 解析和验证逻辑
- [ ] Token 自动刷新机制
- [ ] 多账号切换支持
- [ ] 生物识别认证集成（RN）
- [ ] SSO 单点登录支持
- [ ] 完整的错误处理
- [ ] 性能优化（Token 缓存策略）
- [ ] 安全加固（Token 加密存储）

## 🔗 相关文档

- [core-storage.md](./storage.md) - 存储抽象层
- [core-state.md](./state.md) - 状态管理
- [web-router.md](../web/router.md) - 路由守卫实现

---

**最后更新**: 2026-01-25
**维护者**: 待补充
