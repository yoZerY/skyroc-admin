import type { DeepPartial } from '@unocss/core';

export type HslColorString = `${number} ${number}% ${number}%`;

export interface ThemeCSSVars {
  accent: HslColorString;
  'accent-foreground': HslColorString;
  background: HslColorString;
  border: HslColorString;
  card: HslColorString;
  'card-foreground': HslColorString;
  destructive: HslColorString;
  'destructive-foreground': HslColorString;
  foreground: HslColorString;
  input: HslColorString;
  muted: HslColorString;
  'muted-foreground': HslColorString;
  popover: HslColorString;
  'popover-foreground': HslColorString;
  primary: HslColorString;
  'primary-foreground': HslColorString;
  ring: HslColorString;
  secondary: HslColorString;
  'secondary-foreground': HslColorString;
}

export type ThemeCSSVarKey = keyof ThemeCSSVars;

export interface FeedbackColorOfThemeCssVars {
  carbon: HslColorString;
  'carbon-foreground': HslColorString;
  info: HslColorString;
  'info-foreground': HslColorString;
  success: HslColorString;
  'success-foreground': HslColorString;
  warning: HslColorString;
  'warning-foreground': HslColorString;
}

export type FeedbackColorOfThemeCssVarKey = keyof FeedbackColorOfThemeCssVars;

export interface SidebarColorOfThemeCssVars {
  'sidebar-accent': HslColorString;
  'sidebar-accent-foreground': HslColorString;
  'sidebar-background': HslColorString;
  'sidebar-border': HslColorString;
  'sidebar-foreground': HslColorString;
  'sidebar-primary': HslColorString;
  'sidebar-primary-foreground': HslColorString;
  'sidebar-ring': HslColorString;
}

export type SidebarColorOfThemeCssVarKey = keyof SidebarColorOfThemeCssVars;

export interface ThemeCSSVarsVariant {
  dark: ThemeCSSVars;
  light: ThemeCSSVars;
  name: string;
}

export interface FeedbackColorOfThemeCssVarsVariant {
  dark: FeedbackColorOfThemeCssVars;
  light: FeedbackColorOfThemeCssVars;
}

export interface SidebarColorOfThemeCssVarsVariant {
  dark: SidebarColorOfThemeCssVars;
  light: SidebarColorOfThemeCssVars;
}

export type ThemeConfigColor =
  | 'blue'
  | 'default'
  | 'gray'
  | 'green'
  | 'neutral'
  | 'orange'
  | 'red'
  | 'rose'
  | 'slate'
  | 'stone'
  | 'violet'
  | 'yellow'
  | 'zinc';

export interface ThemeConfig<T = ThemeConfigColor> {
  cssVars: {
    dark: ThemeCSSVars;
    light: ThemeCSSVars;
  };
  label: string;
  name: T;
}

export type ColorOptions =
  | ThemeConfigColor
  | ThemeCSSVarsVariant
  | ({ base: ThemeConfigColor } & DeepPartial<ThemeCSSVarsVariant>);

export interface ThemeOptions {
  /**
   * theme color options
   *
   * @default 'default'
   */
  color?: ColorOptions | false;
  /**
   * dark theme selector
   *
   * @default '.dark'
   */
  darkSelector?: string;
  /** feedback color */
  feedbackColor?: FeedbackColorOfThemeCssVarsVariant;
  /**
   * theme radius
   *
   * @default 0.5
   */
  radius?: number | false;
  /**
   * custom root selector for CSS variables
   *
   * @default ':root'
   * @example '.root' - generates CSS vars under .root class instead of :root
   */
  rootSelector?: string;
  /** sidebar color */
  sidebar?: SidebarColorOfThemeCssVarsVariant;
}

export type ThemeColorKey =
  | Extract<ThemeCSSVarKey, 'destructive' | 'primary' | 'secondary'>
  | Extract<FeedbackColorOfThemeCssVarKey, 'carbon' | 'info' | 'success' | 'warning'>;

export interface PresetShadcnOptions extends ThemeOptions {
  globals?: boolean;
}
