// Config
export { defaultThemeSettings, overrideThemeSettings, themeSchemeIcons } from './config';

// Hooks
export { themeSettingsAtom, useTheme } from './hooks';
export type { UseThemeReturn } from './hooks';

// Presets
export { azir, compact, dark, defaultPreset, getAllPresets, getPreset, presets, shadcn } from './presets';
export type { PresetName, ThemePreset, ThemePresetMeta } from './presets';

// Types
export type {
  BaseToken,
  BaseWatermarkSettings,
  ColorPaletteNumber,
  OtherColor,
  ThemeColor,
  ThemeColorKey,
  ThemeIcons,
  ThemeLayoutMode,
  ThemeMode,
  ThemePageAnimateMode,
  ThemePaletteColor,
  ThemeScrollMode,
  ThemeSettingToken,
  ThemeSettingTokenBoxShadow,
  ThemeSettingTokenColor,
  ThemeTabMode,
  ThemeTokenColor,
  ThemeTokenCSSVars
} from './types';

// Utils
export {
  clearAuxiliaryColorModes,
  getDefaultThemeSettings,
  getThemeColors,
  initThemeSettings,
  isDarkModeClass,
  mergeThemeSettings,
  toggleAuxiliaryColorModes,
  toggleCssDarkMode
} from './utils';
