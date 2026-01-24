# @skyroc/web-animate

> 动画功能 - Web 专用

## 📦 包信息

- **包名**: `@skyroc/web-animate`
- **版本**: `1.0.0`
- **平台**: Web Only
- **依赖**:
  - `motion` - 动画库

## 🎯 职责定位

**核心职责**:
- Motion 动画特性配置
- 页面切换动画
- 路由过渡动画

## 📐 目录结构

```
@skyroc/web-animate/
├── src/
│   ├── components/
│   │   └── LazyMotion.tsx      # 懒加载Motion
│   ├── config/
│   │   └── features.ts         # 动画特性
│   └── index.ts
└── package.json
```

## 🔌 API 设计

```ts
export { LazyMotion } from './components/LazyMotion'
export { animateFeature } from './config/features'
```

## 🔨 核心实现

```tsx
// src/components/LazyMotion.tsx
import { LazyMotion as MotionLazy } from 'motion/react'
import { animateFeature } from '../config/features'

export function LazyMotion({ children }) {
  return (
    <MotionLazy features={animateFeature}>
      {children}
    </MotionLazy>
  )
}
```

```ts
// src/config/features.ts
import { domAnimation } from 'motion/react'

export const animateFeature = domAnimation
```

## 💡 使用示例

```tsx
import { LazyMotion } from '@skyroc/web-animate'
import { motion } from 'motion/react'

function App() {
  return (
    <LazyMotion>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Content
      </motion.div>
    </LazyMotion>
  )
}
```

## 📝 待补充内容

- [ ] 预设动画
- [ ] 页面切换动画
- [ ] 列表动画
- [ ] 加载动画

---

**最后更新**: 2026-01-25
