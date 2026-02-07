# @skyroc/adapter-antd-theme

> Ant Design theme adapter - custom theme algorithm using OKLCH color space

## Features

- Custom OKLCH-based color palette generation
- Light and dark mode theme algorithms
- Compatible with Ant Design's theme system
- Generates both antd (1-10) and Tailwind (50-950) color indexes
- Semantic color generation (bg, hover, active, text variants)

## Installation

```bash
pnpm add @skyroc/adapter-antd-theme
```

## Usage

### Basic Usage with ConfigProvider

```tsx
import { ConfigProvider } from 'antd';
import { derivative, derivativeDark } from '@skyroc/adapter-antd-theme';

function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? derivativeDark : derivative,
        token: {
          colorPrimary: '#6366f1',
        },
      }}
    >
      <YourApp />
    </ConfigProvider>
  );
}
```

### Using Preset Colors

```tsx
import { defaultPresetColors, seedToken } from '@skyroc/adapter-antd-theme';

// defaultPresetColors includes all preset colors (blue, red, green, etc.)
// seedToken includes default seed values for font size, border radius, etc.
```

### Using Token Generators

```tsx
import {
  genColorMapToken,
  genFontMapToken,
  genRadiusMapToken,
  genSizeMapToken,
} from '@skyroc/adapter-antd-theme';

// Generate individual token maps
const fontTokens = genFontMapToken(16);
const radiusTokens = genRadiusMapToken(6);
const sizeTokens = genSizeMapToken(4);
```

## Color Algorithm

This package replaces Ant Design's default `@ant-design/colors` with an OKLCH-based algorithm:

- **OKLCH color space** - Perceptually uniform color manipulation
- **Solid color mixing** - Replaces transparency-based approach
- **Hue-aware compensation** - Different curves for different color families
- **Apple-style hue rotation** - Natural temperature shifts

## Related Packages

- `@skyroc/color` - Core color palette generation
- `@skyroc/web-theme` - Web theme (config, presets, hooks, CSS variables)
