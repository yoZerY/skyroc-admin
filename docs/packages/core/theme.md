# @skyroc/core-theme

> 主题核心逻辑 - 跨平台支持 (Web + React Native)

## 📦 包信息

- **包名**: `@skyroc/core-theme`
- **版本**: `1.0.0`
- **平台**: Universal
- **依赖**:
  - `@sa/color` - 颜色计算
  - `jotai` - 状态管理
  - `@skyroc/core-storage` - 主题持久化
  - `defu` - 配置合并

## 🎯 职责定位

**核心职责**:
- 主题配置管理（颜色、字体、圆角等）
- 颜色模式切换（light/dark/auto）
- 主题色调色板生成
- 主题 Token 计算

**不负责**:
- ❌ UI 库主题应用（由 adapter 处理）
- ❌ CSS 变量注入（Web 专用逻辑）
- ❌ 系统主题检测（平台相关）

## 📐 目录结构

```
@skyroc/core-theme/
├── src/
│   ├── atoms/
│   │   └── theme.ts             # Theme atom
│   ├── hooks/
│   │   └── use-theme.ts         # Theme hook
│   ├── utils/
│   │   ├── token.ts             # Token 生成
│   │   ├── palette.ts           # 调色板生成
│   │   └── settings.ts          # 配置工具
│   ├── config/
│   │   └── default.ts           # 默认配置
│   ├── types/
│   │   └── index.ts
│   └── index.ts
├── package.json
└── README.md
```

## 🔌 API 设计

### 主要导出

```ts
// Hooks
export { useTheme } from './hooks/use-theme'

// Utils
export { createThemeToken, createColorPalette } from './utils'
export { getThemeSettings, mergeThemeSettings } from './utils/settings'

// Config
export { defaultThemeSettings } from './config/default'

// Types
export type {
  ThemeConfig,
  ThemeColors,
  ThemeMode,
  ThemeToken,
  ColorPalette
} from './types'
```

### 类型定义

```ts
// src/types/index.ts
export type ThemeMode = 'light' | 'dark' | 'auto'

export interface ThemeColors {
  primary: string
  info: string
  success: string
  warning: string
  error: string
}

export interface ThemeConfig {
  mode: ThemeMode
  colors: ThemeColors
  radius: number
  fontSize: number
  // ... 更多配置
}

export interface ThemeToken {
  colors: Record<string, string>
  spacing: Record<string, string>
  fontSize: Record<string, number>
  // ...
}

export interface ColorPalette {
  50: string
  100: string
  // ... 到 900
}
```

## 🔨 核心实现

### 1. Theme Atom

```ts
// src/atoms/theme.ts
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { defaultThemeSettings } from '../config/default'
import type { ThemeConfig } from '../types'

// 使用 atomWithStorage 自动持久化
export const themeConfigAtom = atomWithStorage<ThemeConfig>(
  'theme-config',
  defaultThemeSettings
)

// 派生 atom: 当前是否为暗色模式
export const isDarkModeAtom = atom((get) => {
  const config = get(themeConfigAtom)

  if (config.mode === 'auto') {
    // 平台相关逻辑，需要在应用层注入
    return false
  }

  return config.mode === 'dark'
})
```

### 2. useTheme Hook

```ts
// src/hooks/use-theme.ts
import { useAtom, useAtomValue } from 'jotai'
import { themeConfigAtom, isDarkModeAtom } from '../atoms/theme'
import { createThemeToken } from '../utils/token'

export function useTheme() {
  const [config, setConfig] = useAtom(themeConfigAtom)
  const isDarkMode = useAtomValue(isDarkModeAtom)

  // 生成主题 token
  const tokens = createThemeToken(config.colors, isDarkMode)

  return {
    // 配置
    config,

    // 状态
    mode: config.mode,
    isDarkMode,
    colors: config.colors,

    // Tokens
    tokens,

    // 操作
    setMode: (mode: ThemeMode) => {
      setConfig({ ...config, mode })
    },

    setColors: (colors: Partial<ThemeColors>) => {
      setConfig({
        ...config,
        colors: { ...config.colors, ...colors }
      })
    },

    setPrimaryColor: (color: string) => {
      setConfig({
        ...config,
        colors: { ...config.colors, primary: color }
      })
    },

    reset: () => {
      setConfig(defaultThemeSettings)
    }
  }
}
```

### 3. 调色板生成

```ts
// src/utils/palette.ts
import { getColorPalette } from '@sa/color'
import type { ColorPalette } from '../types'

export function createColorPalette(baseColor: string): ColorPalette {
  const palette = getColorPalette(baseColor)

  return {
    50: palette.get(50)!,
    100: palette.get(100)!,
    200: palette.get(200)!,
    300: palette.get(300)!,
    400: palette.get(400)!,
    500: palette.get(500)!,
    600: palette.get(600)!,
    700: palette.get(700)!,
    800: palette.get(800)!,
    900: palette.get(900)!,
  }
}

export function createThemePaletteColors(colors: ThemeColors) {
  const result: Record<string, string> = {}

  Object.entries(colors).forEach(([key, color]) => {
    const palette = createColorPalette(color)

    // 主色
    result[key] = palette[500]

    // 色阶
    Object.entries(palette).forEach(([shade, hex]) => {
      result[`${key}-${shade}`] = hex
    })
  })

  return result
}
```

### 4. Token 生成

```ts
// src/utils/token.ts
import { createThemePaletteColors } from './palette'
import type { ThemeColors, ThemeToken } from '../types'

export function createThemeToken(
  colors: ThemeColors,
  isDarkMode: boolean
): ThemeToken {
  const paletteColors = createThemePaletteColors(colors)

  return {
    colors: {
      ...paletteColors,

      // 语义化颜色
      background: isDarkMode ? '#1a1a1a' : '#ffffff',
      foreground: isDarkMode ? '#e5e5e5' : '#1a1a1a',
      muted: isDarkMode ? '#2a2a2a' : '#f5f5f5',

      // ... 更多 token
    },

    spacing: {
      xs: '4px',
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '32px',
    },

    fontSize: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
    },

    // ... 更多 token
  }
}
```

## 🌐 平台适配

### Web 平台

```tsx
// apps/web-admin/src/App.tsx
import { useTheme } from '@skyroc/core-theme'
import { useEffect } from 'react'

function ThemeEffect() {
  const { isDarkMode, tokens } = useTheme()

  useEffect(() => {
    // 应用 CSS 变量
    document.documentElement.classList.toggle('dark', isDarkMode)

    // 注入 CSS 变量
    Object.entries(tokens.colors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--color-${key}`, value)
    })
  }, [isDarkMode, tokens])

  return null
}
```

### React Native 平台

```tsx
// apps/mobile-app/src/App.tsx
import { useTheme } from '@skyroc/core-theme'
import { ThemeProvider } from './theme/ThemeProvider'

function App() {
  const { tokens } = useTheme()

  return (
    <ThemeProvider theme={tokens}>
      {/* 子组件通过 context 访问主题 */}
    </ThemeProvider>
  )
}
```

## 💡 使用示例

### 示例 1: 切换主题模式

```tsx
import { useTheme } from '@skyroc/core-theme'

function ThemeToggle() {
  const { mode, setMode, isDarkMode } = useTheme()

  return (
    <Button onClick={() => setMode(isDarkMode ? 'light' : 'dark')}>
      {isDarkMode ? '🌙 Dark' : '☀️ Light'}
    </Button>
  )
}
```

### 示例 2: 修改主题色

```tsx
import { useTheme } from '@skyroc/core-theme'

function ColorPicker() {
  const { colors, setPrimaryColor } = useTheme()

  return (
    <input
      type="color"
      value={colors.primary}
      onChange={(e) => setPrimaryColor(e.target.value)}
    />
  )
}
```

### 示例 3: 使用主题 Token

```tsx
import { useTheme } from '@skyroc/core-theme'

function ThemedComponent() {
  const { tokens } = useTheme()

  return (
    <div style={{
      backgroundColor: tokens.colors.background,
      color: tokens.colors.foreground,
      padding: tokens.spacing.md,
      fontSize: tokens.fontSize.md,
    }}>
      Themed Content
    </div>
  )
}
```

## 🔄 从现有代码迁移

### 当前代码位置

```
apps/admin/src/features/theme/
├── shared.ts                  → 部分迁移到 core-theme
├── settings.ts                → core-theme/config/default.ts
├── useSettingsTheme.ts        → core-theme/hooks/use-theme.ts
└── components/ThemeEffect.tsx → 保留在应用层（Web 专用）
```

### 迁移步骤

1. **提取纯逻辑**
```bash
# 将不依赖 DOM 的主题计算逻辑迁移到 core-theme
# DOM 操作保留在应用层
```

2. **拆分配置**
```bash
# 默认配置 → core-theme/config/default.ts
# 覆盖配置 → 应用层
```

3. **重构 hooks**
```bash
# 核心状态管理 → core-theme/hooks/use-theme.ts
# CSS 变量注入 → 应用层 ThemeEffect 组件
```

## 📝 待补充内容

- [ ] 自动检测系统主题（auto 模式）
- [ ] 主题切换动画
- [ ] 多主题预设
- [ ] 主题导入/导出
- [ ] 暗色模式优化算法
- [ ] 无障碍对比度检查
- [ ] 性能优化（Token 缓存）

## 🔗 相关文档

- [adapter-antd.md](../adapter/antd.md) - Ant Design 主题适配
- [core-storage.md](./storage.md) - 主题持久化

---

**最后更新**: 2026-01-25
