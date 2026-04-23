/**
 * Semantic color tokens shared across web / native / miniapp.
 *
 * Names align with the Web `tailwind-plugin` CSS-var keys and the Native `theme/tokens/colors` palette.
 */
export type SemanticColorName =
  | 'accent'
  | 'carbon'
  | 'destructive'
  | 'info'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning';

/** Surface / structural color names (independent of brand palette). */
export type SurfaceColorName = 'background' | 'border' | 'card' | 'foreground' | 'input' | 'muted' | 'popover' | 'ring';

export type ColorTokenName = SemanticColorName | SurfaceColorName;

/** Default brand-color hex values for light theme; consumers may override. */
export const defaultLightColors: Record<SemanticColorName, string> = {
  accent: '#8b5cf6',
  carbon: '#71717a',
  destructive: '#ef4444',
  info: '#3b82f6',
  primary: '#6366f1',
  secondary: '#64748b',
  success: '#22c55e',
  warning: '#f59e0b'
};

/** Default brand-color hex values for dark theme. */
export const defaultDarkColors: Record<SemanticColorName, string> = {
  accent: '#a78bfa',
  carbon: '#a1a1aa',
  destructive: '#f87171',
  info: '#60a5fa',
  primary: '#818cf8',
  secondary: '#94a3b8',
  success: '#4ade80',
  warning: '#fbbf24'
};

/**
 * Default feedback color values in HSL string form (compatible with the Web `tailwind-plugin`).
 *
 * These mirror the hex values above and are mainly for keeping web's CSS-var generation in sync.
 */
export const defaultFeedbackColorsHsl = {
  dark: {
    carbon: '220 14.3% 95.9%',
    'carbon-foreground': '220.9 39.3% 11%',
    info: '215 100% 54%',
    'info-foreground': '0 0% 100%',
    success: '140 79% 45%',
    'success-foreground': '0 0% 100%',
    warning: '37 91% 55%',
    'warning-foreground': '0 0% 100%'
  },
  light: {
    carbon: '240 4% 16%',
    'carbon-foreground': '0 0% 98%',
    info: '215 100% 54%',
    'info-foreground': '0 0% 100%',
    success: '140 79% 45%',
    'success-foreground': '0 0% 100%',
    warning: '37 91% 55%',
    'warning-foreground': '0 0% 100%'
  }
} as const;
