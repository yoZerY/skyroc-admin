import { defaultThemeSettings, initThemeSettings, themeSettingsAtom, useTheme } from '@skyroc/web-admin-theme';

import { useUserInfoQuery } from '@/service/api';
import { localStg } from '@/utils/storage';

/**
 * Initialize theme settings atom from localStorage
 *
 * This runs at module level before any component renders,
 * ensuring the atom starts with cached settings in production.
 */
function initializeThemeAtom(): Theme.ThemeSetting {
  const isProd = import.meta.env.PROD;

  if (!isProd) return defaultThemeSettings;

  const cachedSettings = localStg.get('themeSettings');

  const overrideFlag = localStg.get('overrideThemeFlag');

  const currentBuildTime = BUILD_TIME;

  const { newOverrideFlag, settings } = initThemeSettings(cachedSettings, overrideFlag, currentBuildTime);

  if (newOverrideFlag) {
    localStg.set('overrideThemeFlag', newOverrideFlag);
  }

  return settings;
}

// Set atom initial value before any component reads it
themeSettingsAtom.init = initializeThemeAtom();

/**
 * App-specific theme hook
 *
 * Wraps the package's `useTheme` with app-specific logic:
 * - Injects user name from `useUserInfoQuery()` for watermark display
 *
 * Uses the same `themeSettingsAtom` as the package's components,
 * ensuring shared state between app code and package components.
 */
export const useSettingsTheme = () => {
  const { data: userInfo } = useUserInfoQuery();

  return useTheme({ userName: userInfo?.userName });
};
