# @skyroc/adapter-antd

> Ant Design 主题适配器 - Web 专用

## 📦 包信息

- **包名**: `@skyroc/adapter-antd`
- **版本**: `1.0.0`
- **平台**: Web Only
- **依赖**:
  - `antd` - Ant Design 组件库
  - `@skyroc/core-theme` - 主题核心
  - `@skyroc/core-i18n` - 国际化

## 🎯 职责定位

**核心职责**:
- 将 `@skyroc/core-theme` 的主题配置转换为 Ant Design 主题
- 提供 AntdProvider 组件
- 集成 Ant Design 的 App/ConfigProvider

## 📐 目录结构

```
@skyroc/adapter-antd/
├── src/
│   ├── provider/
│   │   └── AntdProvider.tsx    # Provider 组件
│   ├── theme/
│   │   ├── index.ts            # 主题转换
│   │   ├── algorithm.ts        # 算法适配
│   │   └── tokens.ts           # Token 映射
│   ├── types/
│   │   └── index.ts
│   └── index.ts
└── package.json
```

## 🔌 API 设计

```ts
// Provider
export { AntdProvider } from './provider/AntdProvider'

// Theme
export { getAntdTheme } from './theme'
export { antdColorAlgorithm } from './theme/algorithm'

// Types
export type { AntdThemeConfig } from './types'
```

## 🔨 核心实现

### 1. 主题转换

```ts
// src/theme/index.ts
import { theme as antdTheme } from 'antd'
import type { ThemeConfig } from '@skyroc/core-theme'
import type { ThemeConfig as AntdThemeConfig } from 'antd'

export function getAntdTheme(
  themeColors: ThemeColors,
  isDarkMode: boolean,
  settings: ThemeSettings
): AntdThemeConfig {
  return {
    algorithm: isDarkMode
      ? antdTheme.darkAlgorithm
      : antdTheme.defaultAlgorithm,

    token: {
      colorPrimary: themeColors.primary,
      colorInfo: themeColors.info,
      colorSuccess: themeColors.success,
      colorWarning: themeColors.warning,
      colorError: themeColors.error,

      borderRadius: settings.radius,
      fontSize: settings.fontSize,

      // ... 更多 token 映射
    },

    components: {
      Button: {
        // 按钮组件配置
      },
      // ... 其他组件
    }
  }
}
```

### 2. AntdProvider 组件

```tsx
// src/provider/AntdProvider.tsx
import { ConfigProvider, App as AntdApp } from 'antd'
import { useTheme } from '@skyroc/core-theme'
import { useLang } from '@skyroc/core-i18n'
import { getAntdTheme } from '../theme'
import { antdLocales } from './locales'

export function AntdProvider({ children }) {
  const { colors, isDarkMode, config } = useTheme()
  const { locale } = useLang()

  const antdTheme = getAntdTheme(colors, isDarkMode, config)

  return (
    <ConfigProvider
      theme={antdTheme}
      locale={antdLocales[locale]}
    >
      <AntdApp>
        {children}
      </AntdApp>
    </ConfigProvider>
  )
}
```

## 💡 使用示例

```tsx
// apps/web-admin/src/App.tsx
import { AntdProvider } from '@skyroc/adapter-antd'
import { JotaiProvider } from '@skyroc/core-state'

function App() {
  return (
    <JotaiProvider>
      <AntdProvider>
        <YourApp />
      </AntdProvider>
    </JotaiProvider>
  )
}
```

## 🔄 从现有代码迁移

### 当前代码位置

```
apps/admin/src/features/antd/
├── AntdProvider.tsx  → adapter-antd/provider/AntdProvider.tsx
└── shared.ts         → adapter-antd/theme/index.ts
```

## 📝 待补充内容

- [ ] 组件级主题定制
- [ ] 自定义算法
- [ ] 主题预设
- [ ] Design Token 导出

---

**最后更新**: 2026-01-25
