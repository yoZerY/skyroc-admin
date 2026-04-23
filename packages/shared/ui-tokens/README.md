# @skyroc/ui-tokens

Cross-platform design tokens for SoybeanAdmin: colors, spacing, radius, typography.

- **Zero runtime dependencies** — pure TypeScript constants
- **Single source of truth** consumed by `web/tailwind-plugin`, `native/theme`, and the future `miniapp/theme`

## Install

This is an internal workspace package. Add it via:

```jsonc
{
  "dependencies": {
    "@skyroc/ui-tokens": "workspace:*"
  }
}
```

## Usage

```ts
import { spacing, borderRadius, fontSize, fontWeight, defaultLightColors, defaultDarkColors } from '@skyroc/ui-tokens';

// Tailwind config
export default {
  theme: {
    extend: {
      spacing,
      borderRadius,
      fontSize,
      fontWeight
    }
  }
};
```

Sub-path imports are also supported:

```ts
import { spacing } from '@skyroc/ui-tokens/spacing';
import { defaultLightColors } from '@skyroc/ui-tokens/colors';
```

## What goes here / what doesn't

Goes here:

- Plain TS objects for design variables (numbers, strings)
- Type definitions for token names

Does NOT go here:

- Any React component or hook
- Any platform API (DOM / React Native / Taro)
- Any non-trivial runtime dependency
