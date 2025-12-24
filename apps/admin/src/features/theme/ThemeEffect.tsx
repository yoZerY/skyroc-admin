/* eslint-disable react-hooks/exhaustive-deps */
import { localStg } from '@/utils/storage';

import { addThemeVarsToGlobal, createThemeToken, toggleAuxiliaryColorModes, toggleCssDarkMode } from './shared';
import { useSettingsTheme } from './useSettingsTheme';

const ThemeEffect = () => {
  /** Theme settings */
  const { colourWeaknessMode, darkMode, grayscaleMode, settings, themeColors, updateWatermarkTimer, watermark } =
    useSettingsTheme();

  /** Cache theme settings */
  const cacheThemeSettings = () => {
    const isProd = import.meta.env.PROD;

    if (!isProd) return;

    localStg.set('themeSettings', settings);
  };

  /** Setup theme vars to global */
  function setupThemeVarsToGlobal() {
    const { darkThemeTokens, themeTokens } = createThemeToken(themeColors, settings.tokens, settings.recommendColor);
    addThemeVarsToGlobal(themeTokens, darkThemeTokens);
  }

  // Cache theme settings when page is closed or refreshed
  useEffect(() => {
    const handleBeforeUnload = () => {
      cacheThemeSettings();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  // Watch dark mode
  useEffect(() => {
    toggleCssDarkMode(darkMode);
    localStg.set('darkMode', darkMode);
  }, [darkMode]);

  // Watch grayscale and colour weakness modes
  useEffect(() => {
    toggleAuxiliaryColorModes(grayscaleMode, colourWeaknessMode);
  }, [grayscaleMode, colourWeaknessMode]);

  // Watch theme colors change, update css vars and storage theme color
  useEffect(() => {
    setupThemeVarsToGlobal();
    localStg.set('themeColor', themeColors.primary);
  }, [themeColors]);

  // Watch watermark settings to control timer
  useEffect(() => {
    updateWatermarkTimer();
  }, [watermark.visible, watermark.enableTime]);

  return null;
};

export default ThemeEffect;
