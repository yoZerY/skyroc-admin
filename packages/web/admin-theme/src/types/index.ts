import type { ThemePreset, ThemePresetMeta } from '../presets';

/** Theme mode */
export type ThemeMode = 'auto' | 'dark' | 'light';

/** Theme layout mode */
export type ThemeLayoutMode =
  | 'horizontal'
  | 'horizontal-mix'
  | 'reversed-horizontal-mix'
  | 'top-hybrid-header-first'
  | 'top-hybrid-sidebar-first'
  | 'vertical'
  | 'vertical-mix';

/** Theme scroll mode */
export type ThemeScrollMode = 'content' | 'wrapper';

/** Theme page animate mode */
export type ThemePageAnimateMode =
  | 'fade'
  | 'fade-bottom'
  | 'fade-scale'
  | 'fade-slide'
  | 'none'
  | 'zoom-fade'
  | 'zoom-out';

/** Theme tab mode */
export type ThemeTabMode = 'button' | 'chrome';

/** Theme color key */
export type ThemeColorKey = 'error' | 'info' | 'primary' | 'success' | 'warning';

/** Other color (without primary) */
export interface OtherColor {
  error: string;
  info: string;
  success: string;
  warning: string;
}

/** Theme color (includes primary) */
export interface ThemeColor extends OtherColor {
  primary: string;
}

/** Theme icons mapping */
export interface ThemeIcons {
  auto: string;
  dark: string;
  light: string;
}

/** Base watermark settings - platform agnostic */
export interface BaseWatermarkSettings {
  /** Font settings */
  font?: {
    fontSize?: number;
  };
  /** Height */
  height?: number;
  /** Offset */
  offset?: [number, number];
  /** Rotate angle */
  rotate?: number;
  /** Width */
  width?: number;
  /** Z-index */
  zIndex?: number;
}

/** Theme setting token color */
export interface ThemeSettingTokenColor {
  'base-text': string;
  container: string;
  inverted: string;
  layout: string;
  /** the progress bar color, if not set, will use the primary color */
  nprogress?: string;
}

/** Theme setting token box shadow */
export interface ThemeSettingTokenBoxShadow {
  header: string;
  sider: string;
  tab: string;
}

/** Theme setting token */
export interface ThemeSettingToken {
  boxShadow: ThemeSettingTokenBoxShadow;
  colors: ThemeSettingTokenColor;
}

/** Base token type */
export type BaseToken = Record<string, Record<string, string>>;

/** Color palette number */
export type ColorPaletteNumber = 100 | 200 | 300 | 400 | 50 | 500 | 600 | 700 | 800 | 900 | 950;

/** Theme palette color - all color shades */
export type ThemePaletteColor = {
  [key in ThemeColorKey | `${ThemeColorKey}-${ColorPaletteNumber}`]: string;
};

/** Theme token color - palette + setting token color */
export type ThemeTokenColor = ThemePaletteColor & ThemeSettingTokenColor;

/** Theme token CSS variables */
export interface ThemeTokenCSSVars {
  boxShadow: ThemeSettingTokenBoxShadow & { [key: string]: string };
  colors: ThemeTokenColor & { [key: string]: string };
}

// Re-export preset types
export type { ThemePreset, ThemePresetMeta };
