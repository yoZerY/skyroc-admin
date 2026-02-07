import defu from 'defu';
import { defaultThemeSettings, overrideThemeSettings } from '../config/default';
import type { ThemeColor } from '../types';

/**
 * Get default theme settings
 *
 * @returns Default theme settings
 */
export function getDefaultThemeSettings(): Theme.ThemeSetting {
  return defaultThemeSettings;
}

/**
 * Merge theme settings with defaults
 *
 * @param settings Partial theme settings to merge
 * @param defaults Base theme settings (defaults to defaultThemeSettings)
 * @returns Merged theme settings
 */
export function mergeThemeSettings(
  settings?: Partial<Theme.ThemeSetting>,
  defaults: Theme.ThemeSetting = defaultThemeSettings
): Theme.ThemeSetting {
  if (!settings) return defaults;
  return defu(settings, defaults) as Theme.ThemeSetting;
}

/**
 * Initialize theme settings with override support
 *
 * Used in production to merge cached settings with override settings
 *
 * @param cachedSettings Cached settings from storage
 * @param overrideFlag Override flag to check if override has been applied
 * @param currentBuildTime Current build time for comparison
 * @returns Initialized theme settings and new override flag
 */
export function initThemeSettings(
  cachedSettings?: Partial<Theme.ThemeSetting> | null,
  overrideFlag?: string,
  currentBuildTime?: string
): { newOverrideFlag?: string; settings: Theme.ThemeSetting } {
  let settings = mergeThemeSettings(cachedSettings ?? undefined);

  const isOverride = overrideFlag === currentBuildTime;

  if (!isOverride && currentBuildTime) {
    settings = defu(overrideThemeSettings, settings) as Theme.ThemeSetting;

    return {
      settings,
      newOverrideFlag: currentBuildTime
    };
  }

  return { settings };
}

/**
 * Get theme colors from settings
 *
 * @param settings Theme settings
 * @returns Complete theme colors including primary
 */
export function getThemeColors(settings: Theme.ThemeSetting): ThemeColor {
  const { isInfoFollowPrimary, otherColor, themeColor } = settings;

  return {
    primary: themeColor,
    ...otherColor,
    info: isInfoFollowPrimary ? themeColor : otherColor.info
  };
}
