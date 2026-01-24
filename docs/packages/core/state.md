# @skyroc/core-state

> Jotai 状态管理封装 - 跨平台支持

## 📦 包信息

- **包名**: `@skyroc/core-state`
- **版本**: `1.0.0`
- **平台**: Universal (Web + React Native)
- **依赖**:
  - `jotai` - 原子化状态管理
  - `jotai-devtools` (可选) - 开发者工具

## 🎯 职责定位

**核心职责**:
- 提供全局 Jotai store
- 封装 JotaiProvider
- 提供常用 atom 工具函数
- Devtools 集成

**设计理念**:
- 原子化状态（Atomic State）
- 无需 Context 嵌套
- 支持非 Hook 环境使用

## 📐 目录结构

```
@skyroc/core-state/
├── src/
│   ├── provider/
│   │   └── JotaiProvider.tsx    # Provider 组件
│   ├── store/
│   │   └── global.ts            # 全局 store
│   ├── utils/
│   │   ├── atom-with-storage.ts # 持久化 atom
│   │   └── atom-with-reset.ts   # 可重置 atom
│   ├── types/
│   │   └── index.ts
│   └── index.ts
└── package.json
```

## 🔌 API 设计

### 主要导出

```ts
// Provider
export { JotaiProvider } from './provider/JotaiProvider'

// Store
export { globalStore } from './store/global'

// Utils
export { createAtomWithStorage } from './utils/atom-with-storage'
export { createAtomWithReset } from './utils/atom-with-reset'

// Re-export from jotai
export { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'
export type { Atom, WritableAtom, PrimitiveAtom } from 'jotai'
```

### 类型定义

```ts
// src/types/index.ts
import type { Atom } from 'jotai'

export interface AtomWithStorageOptions {
  key: string
  defaultValue: any
  storage?: Storage
}

export interface AtomWithResetOptions<T> {
  defaultValue: T
}

export type { Atom, WritableAtom, PrimitiveAtom } from 'jotai'
```

## 🔨 核心实现

### 1. 全局 Store

```ts
// src/store/global.ts
import { createStore } from 'jotai'

/**
 * 全局 Jotai store
 *
 * 用途:
 * 1. 在非 Hook 环境中访问/修改 atom (如 axios 拦截器)
 * 2. 服务器端渲染 (SSR)
 * 3. 测试环境
 *
 * @see https://jotai.org/docs/core/store
 */
export const globalStore = createStore()

/**
 * 在非 Hook 环境中获取 atom 值
 */
export function getAtomValue<T>(atom: Atom<T>): T {
  return globalStore.get(atom)
}

/**
 * 在非 Hook 环境中设置 atom 值
 */
export function setAtomValue<T>(atom: WritableAtom<T, any, any>, value: T) {
  globalStore.set(atom, value)
}
```

### 2. JotaiProvider 组件

```tsx
// src/provider/JotaiProvider.tsx
import { Provider } from 'jotai'
import { DevTools } from 'jotai-devtools'
import type { PropsWithChildren } from 'react'
import { globalStore } from '../store/global'

interface JotaiProviderProps extends PropsWithChildren {
  /**
   * 是否启用 DevTools
   * @default process.env.NODE_ENV === 'development'
   */
  enableDevTools?: boolean
}

export function JotaiProvider({
  children,
  enableDevTools = process.env.NODE_ENV === 'development'
}: JotaiProviderProps) {
  return (
    <Provider store={globalStore}>
      {enableDevTools && <DevTools />}
      {children}
    </Provider>
  )
}
```

### 3. 持久化 Atom

```ts
// src/utils/atom-with-storage.ts
import { atomWithStorage as jotaiAtomWithStorage } from 'jotai/utils'
import { storage } from '@skyroc/core-storage'

/**
 * 创建持久化的 atom
 *
 * 自动将状态同步到 storage
 */
export function createAtomWithStorage<T>(
  key: string,
  initialValue: T,
  options?: {
    // 自定义序列化
    serialize?: (value: T) => string
    deserialize?: (str: string) => T
  }
) {
  return jotaiAtomWithStorage<T>(
    key,
    initialValue,
    {
      getItem: (key) => {
        const value = storage.get(key)
        if (options?.deserialize && value !== null) {
          return options.deserialize(String(value))
        }
        return value
      },

      setItem: (key, value) => {
        if (options?.serialize) {
          storage.set(key, options.serialize(value) as any)
        } else {
          storage.set(key, value as any)
        }
      },

      removeItem: (key) => {
        storage.remove(key)
      }
    },
    { getOnInit: true }
  )
}
```

### 4. 可重置 Atom

```ts
// src/utils/atom-with-reset.ts
import { atomWithReset } from 'jotai/utils'

/**
 * 创建可重置的 atom
 *
 * 提供 reset 方法恢复到初始值
 */
export function createAtomWithReset<T>(defaultValue: T) {
  return atomWithReset(defaultValue)
}

/**
 * 重置 atom 到初始值
 */
export const RESET = Symbol('RESET')
```

## 🌐 平台适配

### Web 平台

```tsx
// apps/web-admin/src/App.tsx
import { JotaiProvider } from '@skyroc/core-state'

function App() {
  return (
    <JotaiProvider enableDevTools>
      <YourApp />
    </JotaiProvider>
  )
}
```

### React Native 平台

```tsx
// apps/mobile-app/src/App.tsx
import { JotaiProvider } from '@skyroc/core-state'

function App() {
  return (
    <JotaiProvider enableDevTools={__DEV__}>
      <YourApp />
    </JotaiProvider>
  )
}
```

## 💡 使用示例

### 示例 1: 基本 Atom

```ts
// packages/core-auth/src/atoms/auth.ts
import { atom } from '@skyroc/core-state'

const authAtom = atom({
  token: '',
  user: null
})
```

### 示例 2: 持久化 Atom

```ts
// packages/core-theme/src/atoms/theme.ts
import { createAtomWithStorage } from '@skyroc/core-state'

const themeAtom = createAtomWithStorage('theme', {
  mode: 'light',
  primaryColor: '#1890ff'
})
```

### 示例 3: 在非 Hook 环境使用

```ts
// packages/axios/src/interceptors.ts
import { globalStore } from '@skyroc/core-state'
import { authAtom } from '@skyroc/core-auth'

axios.interceptors.request.use((config) => {
  // 在拦截器中获取 token
  const authState = globalStore.get(authAtom)

  if (authState.token) {
    config.headers.Authorization = `Bearer ${authState.token}`
  }

  return config
})
```

### 示例 4: 可重置 Atom

```ts
import { createAtomWithReset, RESET, useAtom } from '@skyroc/core-state'

const counterAtom = createAtomWithReset(0)

function Counter() {
  const [count, setCount] = useAtom(counterAtom)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>+1</button>
      <button onClick={() => setCount(RESET)}>Reset</button>
    </div>
  )
}
```

### 示例 5: 派生 Atom

```ts
import { atom, useAtomValue } from '@skyroc/core-state'

const priceAtom = atom(100)
const quantityAtom = atom(2)

// 派生 atom: 自动计算总价
const totalAtom = atom((get) => {
  const price = get(priceAtom)
  const quantity = get(quantityAtom)
  return price * quantity
})

function Cart() {
  const total = useAtomValue(totalAtom)

  return <div>Total: ${total}</div>
}
```

## 🔄 从现有代码迁移

### 当前代码位置

```
apps/admin/src/features/jotai/
├── store.ts            → core-state/store/global.ts
└── JotaiProvider.tsx   → core-state/provider/JotaiProvider.tsx
```

### 迁移步骤

1. **创建包**
```bash
mkdir -p packages/core-state/src/{provider,store,utils,types}
```

2. **迁移 store**
```bash
cp apps/admin/src/features/jotai/store.ts \
   packages/core-state/src/store/global.ts
```

3. **迁移 Provider**
```bash
cp apps/admin/src/features/jotai/JotaiProvider.tsx \
   packages/core-state/src/provider/JotaiProvider.tsx
```

4. **更新导入**
```ts
// 旧代码
import { globalStore } from '@/features/jotai/store'

// 新代码
import { globalStore } from '@skyroc/core-state'
```

## 🧪 测试策略

```ts
// packages/core-state/src/__tests__/atom.test.ts
import { renderHook, act } from '@testing-library/react'
import { atom, useAtom } from '../index'

describe('atom', () => {
  it('should update atom value', () => {
    const countAtom = atom(0)

    const { result } = renderHook(() => useAtom(countAtom))

    expect(result.current[0]).toBe(0)

    act(() => {
      result.current[1](1)
    })

    expect(result.current[0]).toBe(1)
  })
})
```

## 📝 待补充内容

- [ ] Atom 调试工具
- [ ] 时间旅行调试
- [ ] Atom 持久化策略配置
- [ ] 异步 Atom 工具
- [ ] Atom 家族（atomFamily）封装
- [ ] 性能监控
- [ ] SSR 支持增强

## 🔗 相关文档

- [Jotai 官方文档](https://jotai.org)
- [core-auth.md](./auth.md) - 使用 Jotai 的认证包
- [core-theme.md](./theme.md) - 使用 Jotai 的主题包

---

**最后更新**: 2026-01-25
**维护者**: 待补充
