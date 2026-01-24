# @skyroc/core-storage

> 存储抽象层 - 跨平台支持 (Web + React Native)

## 📦 包信息

- **包名**: `@skyroc/core-storage`
- **版本**: `1.0.0`
- **平台**: Universal (Web + React Native)
- **依赖**:
  - `localforage` (Web, 可选)
  - 无强制依赖

## 🎯 职责定位

**核心职责**:
- 提供统一的存储接口抽象
- 类型安全的 key-value 存储
- 平台适配器模式（Adapter Pattern）
- 支持同步和异步存储

**设计原则**:
- 接口优先，实现分离
- 零依赖核心（适配器独立）
- 类型安全（TypeScript 泛型）

## 📐 目录结构

```
@skyroc/core-storage/
├── src/
│   ├── adapters/
│   │   ├── web-storage.ts       # Web localStorage/sessionStorage 适配器
│   │   ├── localforage.ts       # IndexedDB 适配器
│   │   └── async-storage.ts     # React Native AsyncStorage 适配器
│   ├── factory.ts               # 工厂函数
│   ├── types.ts                 # 类型定义
│   └── index.ts
├── web/
│   └── index.ts                 # Web 平台导出
├── react-native/
│   └── index.ts                 # RN 平台导出
├── package.json
└── README.md
```

## 🔌 API 设计

### 主要导出

```ts
// 工厂函数
export { createStorage, createAsyncStorage } from './factory'

// 适配器
export { webStorageAdapter } from './adapters/web-storage'
export { localforageAdapter } from './adapters/localforage'

// 类型
export type {
  Storage,
  AsyncStorage,
  StorageAdapter,
  AsyncStorageAdapter,
  StorageSchema
} from './types'
```

### 类型定义

```ts
// src/types.ts

// 同步存储接口
export interface StorageAdapter {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
  removeItem(key: string): void
  clear(): void
}

// 异步存储接口
export interface AsyncStorageAdapter {
  getItem(key: string): Promise<string | null>
  setItem(key: string, value: string): Promise<void>
  removeItem(key: string): Promise<void>
  clear(): Promise<void>
}

// 类型安全的存储接口
export interface Storage<T extends Record<string, any>> {
  get<K extends keyof T>(key: K): T[K] | null
  set<K extends keyof T>(key: K, value: T[K]): void
  remove(key: keyof T): void
  clear(): void
}

export interface AsyncStorage<T extends Record<string, any>> {
  get<K extends keyof T>(key: K): Promise<T[K] | null>
  set<K extends keyof T>(key: K, value: T[K]): Promise<void>
  remove(key: keyof T): Promise<void>
  clear(): Promise<void>
}

// 存储模式（用于类型扩展）
export interface StorageSchema {
  // 应用可以扩展这个接口
  // 例如:
  // token: string
  // userInfo: UserInfo
}
```

## 🔨 核心实现

### 1. 工厂函数

```ts
// src/factory.ts
import type { Storage, StorageAdapter, AsyncStorage, AsyncStorageAdapter } from './types'

export function createStorage<T extends Record<string, any>>(
  adapter: StorageAdapter,
  prefix: string = ''
): Storage<T> {
  return {
    get(key) {
      const fullKey = `${prefix}${String(key)}`
      const json = adapter.getItem(fullKey)

      if (!json) return null

      try {
        return JSON.parse(json) as T[typeof key]
      } catch {
        adapter.removeItem(fullKey)
        return null
      }
    },

    set(key, value) {
      const fullKey = `${prefix}${String(key)}`
      const json = JSON.stringify(value)
      adapter.setItem(fullKey, json)
    },

    remove(key) {
      const fullKey = `${prefix}${String(key)}`
      adapter.removeItem(fullKey)
    },

    clear() {
      adapter.clear()
    }
  }
}

export function createAsyncStorage<T extends Record<string, any>>(
  adapter: AsyncStorageAdapter,
  prefix: string = ''
): AsyncStorage<T> {
  return {
    async get(key) {
      const fullKey = `${prefix}${String(key)}`
      const json = await adapter.getItem(fullKey)

      if (!json) return null

      try {
        return JSON.parse(json) as T[typeof key]
      } catch {
        await adapter.removeItem(fullKey)
        return null
      }
    },

    async set(key, value) {
      const fullKey = `${prefix}${String(key)}`
      const json = JSON.stringify(value)
      await adapter.setItem(fullKey, json)
    },

    async remove(key) {
      const fullKey = `${prefix}${String(key)}`
      await adapter.removeItem(fullKey)
    },

    async clear() {
      await adapter.clear()
    }
  }
}
```

### 2. Web Storage 适配器

```ts
// src/adapters/web-storage.ts
import type { StorageAdapter } from '../types'

export function webStorageAdapter(
  storage: globalThis.Storage
): StorageAdapter {
  return {
    getItem: (key) => storage.getItem(key),
    setItem: (key, value) => storage.setItem(key, value),
    removeItem: (key) => storage.removeItem(key),
    clear: () => storage.clear()
  }
}

// 便捷导出
export const localStorageAdapter = webStorageAdapter(localStorage)
export const sessionStorageAdapter = webStorageAdapter(sessionStorage)
```

### 3. Localforage 适配器

```ts
// src/adapters/localforage.ts
import localforage from 'localforage'
import type { AsyncStorageAdapter } from '../types'

export function localforageAdapter(
  instance: typeof localforage = localforage
): AsyncStorageAdapter {
  return {
    getItem: async (key) => {
      const value = await instance.getItem<string>(key)
      return value ?? null
    },
    setItem: async (key, value) => {
      await instance.setItem(key, value)
    },
    removeItem: async (key) => {
      await instance.removeItem(key)
    },
    clear: async () => {
      await instance.clear()
    }
  }
}
```

### 4. AsyncStorage 适配器 (React Native)

```ts
// src/adapters/async-storage.ts
import type { AsyncStorageAdapter } from '../types'

export function asyncStorageAdapter(
  storage: any // @react-native-async-storage/async-storage
): AsyncStorageAdapter {
  return {
    getItem: async (key) => {
      return await storage.getItem(key)
    },
    setItem: async (key, value) => {
      await storage.setItem(key, value)
    },
    removeItem: async (key) => {
      await storage.removeItem(key)
    },
    clear: async () => {
      await storage.clear()
    }
  }
}
```

## 🌐 平台导出

### Web 平台

```ts
// web/index.ts
export * from '../src'
export { webStorageAdapter, localStorageAdapter, sessionStorageAdapter } from '../src/adapters/web-storage'
export { localforageAdapter } from '../src/adapters/localforage'
```

### React Native 平台

```ts
// react-native/index.ts
export * from '../src'
export { asyncStorageAdapter } from '../src/adapters/async-storage'
```

## 💡 使用示例

### 示例 1: Web 项目使用

```ts
// apps/web-admin/src/utils/storage.ts
import { createStorage } from '@skyroc/core-storage'
import { localStorageAdapter } from '@skyroc/core-storage/web'

// 1. 定义存储模式
declare module '@skyroc/core-storage' {
  interface StorageSchema {
    token: string
    refreshToken: string
    userInfo: {
      id: string
      name: string
    }
    theme: 'light' | 'dark'
    lang: 'zh-CN' | 'en-US'
  }
}

// 2. 创建存储实例
const prefix = import.meta.env.VITE_STORAGE_PREFIX || ''

export const storage = createStorage<StorageSchema>(
  localStorageAdapter,
  prefix
)

// 3. 使用（完全类型安全）
storage.set('token', 'abc123')           // ✅
storage.set('theme', 'light')            // ✅
storage.set('theme', 'blue')             // ❌ TypeScript 错误

const token = storage.get('token')       // string | null
const theme = storage.get('theme')       // 'light' | 'dark' | null
```

### 示例 2: React Native 项目使用

```ts
// apps/mobile-app/src/utils/storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createAsyncStorage } from '@skyroc/core-storage'
import { asyncStorageAdapter } from '@skyroc/core-storage/react-native'

// 1. 定义存储模式（同上）
declare module '@skyroc/core-storage' {
  interface StorageSchema {
    token: string
    // ...
  }
}

// 2. 创建异步存储实例
export const storage = createAsyncStorage<StorageSchema>(
  asyncStorageAdapter(AsyncStorage),
  '@my-app:'
)

// 3. 使用（异步）
await storage.set('token', 'abc123')
const token = await storage.get('token')
```

### 示例 3: 使用 Localforage (IndexedDB)

```ts
// apps/web-admin/src/utils/storage.ts
import localforage from 'localforage'
import { createAsyncStorage } from '@skyroc/core-storage'
import { localforageAdapter } from '@skyroc/core-storage/web'

// 配置 localforage
localforage.config({
  driver: localforage.INDEXEDDB,
  name: 'my-app',
  version: 1.0,
  storeName: 'app_storage'
})

export const asyncStorage = createAsyncStorage(
  localforageAdapter(localforage),
  ''
)

// 使用
await asyncStorage.set('largeData', { /* 大数据对象 */ })
```

## 🔄 从现有代码迁移

### 当前代码位置

```
packages/utils/src/storage.ts  → @skyroc/core-storage
```

### 迁移步骤

1. **创建新包**
```bash
mkdir -p packages/core-storage/src/{adapters}
mkdir -p packages/core-storage/{web,react-native}
```

2. **提取核心逻辑**
```bash
# 将 packages/utils/src/storage.ts 的接口定义和工厂函数
# 迁移到 packages/core-storage/src/
```

3. **创建平台适配器**
```bash
# 为不同平台创建对应的适配器
```

4. **更新应用代码**
```ts
// 旧代码
import { createStorage } from '@skyroc/utils'

// 新代码
import { createStorage } from '@skyroc/core-storage'
import { localStorageAdapter } from '@skyroc/core-storage/web'

const storage = createStorage(localStorageAdapter, prefix)
```

## 🧪 测试策略

```ts
// packages/core-storage/src/__tests__/factory.test.ts
describe('createStorage', () => {
  let mockAdapter: StorageAdapter
  let storage: Storage<any>

  beforeEach(() => {
    const store = new Map<string, string>()

    mockAdapter = {
      getItem: (key) => store.get(key) ?? null,
      setItem: (key, value) => store.set(key, value),
      removeItem: (key) => store.delete(key),
      clear: () => store.clear()
    }

    storage = createStorage(mockAdapter, 'test:')
  })

  it('should store and retrieve values', () => {
    storage.set('token', 'abc123')
    expect(storage.get('token')).toBe('abc123')
  })

  it('should handle JSON serialization', () => {
    const obj = { id: 1, name: 'test' }
    storage.set('user', obj)
    expect(storage.get('user')).toEqual(obj)
  })

  // ... 更多测试
})
```

## 📝 待补充内容

- [ ] 存储容量检测和警告
- [ ] 存储加密支持
- [ ] 数据过期机制
- [ ] 存储迁移工具
- [ ] 性能监控
- [ ] 离线数据同步策略
- [ ] 多 Tab 同步（Web）

## 🔗 相关文档

- [core-auth.md](./auth.md) - 使用存储的认证包
- [core-theme.md](./theme.md) - 使用存储的主题包

---

**最后更新**: 2026-01-25
