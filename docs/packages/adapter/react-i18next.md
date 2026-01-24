# @skyroc/adapter-react-i18next

> react-i18next 适配器 - 跨平台支持

## 📦 包信息

- **包名**: `@skyroc/adapter-react-i18next`
- **版本**: `1.0.0`
- **平台**: Universal (Web + React Native)
- **依赖**:
  - `react-i18next` - React 国际化hooks
  - `@skyroc/core-i18n` - 国际化核心

## 🎯 职责定位

**核心职责**:
- 连接 `@skyroc/core-i18n` 和 `react-i18next`
- 提供 I18nProvider
- 封装 useTranslation hook

## 📐 目录结构

```
@skyroc/adapter-react-i18next/
├── src/
│   ├── provider/
│   │   └── I18nProvider.tsx    # Provider 组件
│   ├── hooks/
│   │   └── use-translation.ts  # 翻译 hook
│   └── index.ts
└── package.json
```

## 🔌 API 设计

```ts
export { I18nProvider } from './provider/I18nProvider'
export { useTranslation } from './hooks/use-translation'
```

## 🔨 核心实现

### I18nProvider

```tsx
// src/provider/I18nProvider.tsx
import { I18nextProvider } from 'react-i18next'
import { useEffect } from 'react'
import { useLang } from '@skyroc/core-i18n'
import i18n from 'i18next'

export function I18nProvider({ children }) {
  const { locale } = useLang()

  useEffect(() => {
    i18n.changeLanguage(locale)
  }, [locale])

  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  )
}
```

### useTranslation Hook

```ts
// src/hooks/use-translation.ts
import { useTranslation as useI18nextTranslation } from 'react-i18next'

export function useTranslation() {
  return useI18nextTranslation()
}
```

## 💡 使用示例

```tsx
import { I18nProvider } from '@skyroc/adapter-react-i18next'
import { useTranslation } from '@skyroc/adapter-react-i18next'

function App() {
  return (
    <I18nProvider>
      <MyComponent />
    </I18nProvider>
  )
}

function MyComponent() {
  const { t } = useTranslation()

  return <div>{t('common.welcome')}</div>
}
```

## 📝 待补充内容

- [ ] 命名空间支持
- [ ] 翻译缺失处理
- [ ] 复数形式
- [ ] 插值增强

---

**最后更新**: 2026-01-25
