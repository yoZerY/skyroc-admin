import type { ThemeColor } from '@skyroc/ui-types';

/**
 * Default brand-color hex values are shared cross-platform via `@skyroc/ui-tokens`.
 * Platform-specific bindings (CSS-var driven `semanticColors` / `surfaceColors`) stay here.
 */
export { defaultDarkColors, defaultLightColors } from '@skyroc/ui-tokens';

/**
 * Semantic color definitions aligned with ThemeColor.
 *
 * Each color maps to a CSS variable that gets resolved at runtime. The palette numbers follow the same 50–950 scale as
 * the Web theme.
 */
export const semanticColors: Record<ThemeColor, { DEFAULT: string; foreground: string }> = {
  accent: {
    DEFAULT: 'hsl(var(--color-accent) / <alpha-value>)',
    foreground: 'hsl(var(--color-accent-foreground) / <alpha-value>)'
  },
  carbon: {
    DEFAULT: 'hsl(var(--color-carbon) / <alpha-value>)',
    foreground: 'hsl(var(--color-carbon-foreground) / <alpha-value>)'
  },
  destructive: {
    DEFAULT: 'hsl(var(--color-destructive) / <alpha-value>)',
    foreground: 'hsl(var(--color-destructive-foreground) / <alpha-value>)'
  },
  info: {
    DEFAULT: 'hsl(var(--color-info) / <alpha-value>)',
    foreground: 'hsl(var(--color-info-foreground) / <alpha-value>)'
  },
  primary: {
    DEFAULT: 'hsl(var(--color-primary) / <alpha-value>)',
    foreground: 'hsl(var(--color-primary-foreground) / <alpha-value>)'
  },
  secondary: {
    DEFAULT: 'hsl(var(--color-secondary) / <alpha-value>)',
    foreground: 'hsl(var(--color-secondary-foreground) / <alpha-value>)'
  },
  success: {
    DEFAULT: 'hsl(var(--color-success) / <alpha-value>)',
    foreground: 'hsl(var(--color-success-foreground) / <alpha-value>)'
  },
  warning: {
    DEFAULT: 'hsl(var(--color-warning) / <alpha-value>)',
    foreground: 'hsl(var(--color-warning-foreground) / <alpha-value>)'
  }
};

/** Neutral / surface colors for layout. */
export const surfaceColors = {
  background: {
    DEFAULT: 'hsl(var(--color-background) / <alpha-value>)',
    muted: 'hsl(var(--color-background-muted) / <alpha-value>)'
  },
  border: {
    DEFAULT: 'hsl(var(--color-border) / <alpha-value>)'
  },
  foreground: {
    DEFAULT: 'hsl(var(--color-foreground) / <alpha-value>)',
    muted: 'hsl(var(--color-foreground-muted) / <alpha-value>)'
  },
  input: {
    DEFAULT: 'hsl(var(--color-input) / <alpha-value>)'
  }
};
