# @skyroc/web-components

> Web 通用组件库 - Web 专用

## 📦 包信息

- **包名**: `@skyroc/web-components`
- **版本**: `1.0.0`
- **平台**: Web Only
- **依赖**:
  - `@better-scroll/core` - 滚动组件
  - `@skyroc/core-theme` - 主题

## 🎯 职责定位

**核心职责**:
- 提供 Web 通用组件
- Portal、FullScreen、BetterScroll 等
- 与业务无关的基础组件

## 📐 目录结构

```
@skyroc/web-components/
├── src/
│   ├── portal/
│   │   └── Portal.tsx           # 传送门组件
│   ├── full-screen/
│   │   └── FullScreen.tsx       # 全屏组件
│   ├── better-scroll/
│   │   └── BetterScroll.tsx     # 滚动组件
│   ├── dark-mode-container/
│   │   └── DarkModeContainer.tsx # 暗色模式容器
│   └── index.ts
└── package.json
```

## 🔌 API 设计

```ts
export { Portal } from './portal/Portal'
export { FullScreen } from './full-screen/FullScreen'
export { BetterScroll } from './better-scroll/BetterScroll'
export { DarkModeContainer } from './dark-mode-container/DarkModeContainer'
```

## 🔨 核心实现

### Portal 组件

```tsx
// src/portal/Portal.tsx
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface PortalProps {
  /** 容器选择器或元素 */
  container: string | HTMLElement
  /** 传送内容 */
  children: React.ReactNode
  /** 是否自动创建容器 */
  autoCreate?: boolean
}

export function Portal({ container, children, autoCreate = false }: PortalProps) {
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null)

  useEffect(() => {
    const element = typeof container === 'string'
      ? document.querySelector<HTMLElement>(container)
      : container

    if (!element && autoCreate && typeof container === 'string') {
      const newElement = document.createElement('div')
      newElement.id = container.replace('#', '')
      document.body.appendChild(newElement)
      setTargetElement(newElement)
    } else {
      setTargetElement(element)
    }
  }, [container, autoCreate])

  if (!targetElement) return null

  return createPortal(children, targetElement)
}
```

## 💡 使用示例

```tsx
import { Portal, FullScreen } from '@skyroc/web-components'

function MyComponent() {
  return (
    <>
      <Portal container="#modal-root">
        <div>Modal Content</div>
      </Portal>

      <FullScreen>
        <div>Fullscreen Content</div>
      </FullScreen>
    </>
  )
}
```

## 📝 待补充内容

- [ ] 更多通用组件
- [ ] 虚拟滚动
- [ ] 水印组件
- [ ] 骨架屏

---

**最后更新**: 2026-01-25
