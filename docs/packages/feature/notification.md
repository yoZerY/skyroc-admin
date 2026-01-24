# @skyroc/feature-notification

> 通知系统 - 跨平台支持

## 📦 包信息

- **包名**: `@skyroc/feature-notification`
- **版本**: `1.0.0`
- **平台**: Universal (Web + React Native)
- **依赖**:
  - `@skyroc/core-state` - 状态管理
  - `antd` (可选) - Web 端 UI

## 🎯 职责定位

**核心职责**:
- 通知状态管理
- 通知列表
- 未读计数

## 📐 目录结构

```
@skyroc/feature-notification/
├── src/
│   ├── atoms/
│   │   └── notification.ts     # 通知 atom
│   ├── hooks/
│   │   └── use-notification.ts # 通知 hook
│   ├── components/
│   │   ├── NotificationPanel.tsx   # 通知面板
│   │   └── NotificationButton.tsx  # 通知按钮
│   ├── types/
│   │   └── index.ts
│   └── index.ts
└── package.json
```

## 🔌 API 设计

```ts
export { useNotification } from './hooks/use-notification'
export { NotificationPanel } from './components/NotificationPanel'
export { NotificationButton } from './components/NotificationButton'
export type { Notification } from './types'
```

## 🔨 核心实现

### Notification Atom

```ts
// src/atoms/notification.ts
import { atom } from '@skyroc/core-state'

export const notificationAtom = atom<Notification[]>([])

export const unreadCountAtom = atom((get) => {
  const notifications = get(notificationAtom)
  return notifications.filter(n => !n.read).length
})
```

### useNotification Hook

```ts
// src/hooks/use-notification.ts
import { useAtom, useAtomValue } from '@skyroc/core-state'
import { notificationAtom, unreadCountAtom } from '../atoms/notification'

export function useNotification() {
  const [notifications, setNotifications] = useAtom(notificationAtom)
  const unreadCount = useAtomValue(unreadCountAtom)

  function markAsRead(id: string) {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ))
  }

  function markAllAsRead() {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  function deleteNotification(id: string) {
    setNotifications(notifications.filter(n => n.id !== id))
  }

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification
  }
}
```

## 💡 使用示例

```tsx
import { useNotification, NotificationButton } from '@skyroc/feature-notification'

function Header() {
  const { unreadCount } = useNotification()

  return (
    <div>
      <NotificationButton count={unreadCount} />
    </div>
  )
}
```

## 📝 待补充内容

- [ ] 实时通知推送
- [ ] 通知分类
- [ ] 通知筛选
- [ ] 通知搜索

---

**最后更新**: 2026-01-25
