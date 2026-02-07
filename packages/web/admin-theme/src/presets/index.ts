import azir from './azir.json';
import compact from './compact.json';
import dark from './dark.json';
import defaultPreset from './default.json';
import shadcn from './shadcn.json';

/** Theme preset metadata */
export interface ThemePresetMeta {
  /** Preset description */
  desc: string;
  /** i18n key for the preset name */
  i18nkey: string;
  /** Preset name */
  name: string;
  /** Display order */
  order: number;
  /** Preset version */
  version: string;
}

/** Theme preset type */
export type ThemePreset = ThemePresetMeta & Partial<Theme.ThemeSetting>;

/** All available presets */
export const presets = {
  azir,
  compact,
  dark,
  default: defaultPreset,
  shadcn
} as const;

/** Preset names */
export type PresetName = keyof typeof presets;

/** Get preset by name */
export function getPreset(name: PresetName): ThemePreset {
  return presets[name] as ThemePreset;
}

/** Get all presets sorted by order */
export function getAllPresets(): ThemePreset[] {
  return Object.values(presets).sort((a, b) => (a.order ?? 0) - (b.order ?? 0)) as ThemePreset[];
}

export { azir, compact, dark, defaultPreset, shadcn };
