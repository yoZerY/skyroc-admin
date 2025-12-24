import { getPaletteColorByNumber } from '@sa/color';
import dayjs from 'dayjs';
import { atom, useAtom } from 'jotai';
import { useMemo } from 'react';

import { useUserInfoQuery } from '@/service/api';

import { initThemeSettingsFn } from './shared';

export const initThemeSettings = initThemeSettingsFn();

const themeAtom = atom(initThemeSettings, (get, set, update: Partial<Theme.ThemeSetting>) => {
  set(themeAtom, { ...get(themeAtom), ...update });
});

/**
 *  -  reset function not completed
 */
export const useSettingsTheme = () => {
  /** Theme settings */
  const [settings, setSettings] = useAtom(themeAtom);

  /** Preferred color scheme */
  const osTheme = usePreferredColorScheme();

  const { now: watermarkTime, pause: pauseWatermarkTime, resume: resumeWatermarkTime } = useNow(1000);

  const { data: userInfo } = useUserInfoQuery();

  /** Dark mode */
  const darkMode = useMemo(() => {
    if (settings.themeScheme === 'auto') {
      return osTheme.isDarkMode;
    }
    return settings.themeScheme === 'dark';
  }, [settings.themeScheme, osTheme]);

  /** grayscale mode */
  const grayscaleMode = settings.grayscale;

  /** colourWeakness mode */
  const colourWeaknessMode = settings.colourWeakness;

  /** Theme colors */
  const themeColors = useMemo(() => {
    const { isInfoFollowPrimary, otherColor, themeColor } = settings;
    const colors: Theme.ThemeColor = {
      primary: themeColor,
      ...otherColor,
      info: isInfoFollowPrimary ? themeColor : otherColor.info
    };
    return colors;
  }, [settings.themeColor, settings.otherColor, settings.isInfoFollowPrimary]);

  /** Settings json */
  const settingsJson = useMemo(() => JSON.stringify(settings), [settings]);

  /** Watermark time date formatter */
  const formattedWatermarkTime = useMemo(() => {
    const { watermark } = settings;
    return dayjs(watermarkTime).format(watermark.timeFormat);
  }, [watermarkTime, settings.watermark.timeFormat]);

  /** Watermark content */
  const watermarkContent = useMemo(() => {
    const { watermark } = settings;

    if (!watermark.visible) return '';

    let content = watermark.text;

    // Note: In React version, we might need to get userInfo from auth context
    // For now, we'll just use the watermark settings
    if (watermark.enableUserName && userInfo?.userName) {
      content = `${content} - ${userInfo.userName}`;
    }

    if (watermark.enableTime) {
      content = `${content} - ${formattedWatermarkTime}`;
    }

    return content;
  }, [settings.watermark, formattedWatermarkTime]);

  /**
   * Set theme scheme
   *
   * @param themeScheme
   */
  const setThemeScheme = (themeScheme: UnionKey.ThemeScheme) => {
    setSettings({ themeScheme });
  };

  /**
   * Set grayscale value
   *
   * @param isGrayscale
   */
  const setGrayscale = (isGrayscale: boolean) => {
    setSettings({ grayscale: isGrayscale });
  };

  /**
   * Set colourWeakness value
   *
   * @param isColourWeakness
   */
  const setColourWeakness = (isColourWeakness: boolean) => {
    setSettings({ colourWeakness: isColourWeakness });
  };

  /** Toggle theme scheme */
  const toggleThemeScheme = () => {
    const themeSchemes: UnionKey.ThemeScheme[] = ['light', 'dark', 'auto'];

    const index = themeSchemes.findIndex(item => item === settings.themeScheme);

    const nextIndex = index === themeSchemes.length - 1 ? 0 : index + 1;

    const nextThemeScheme = themeSchemes[nextIndex];

    setThemeScheme(nextThemeScheme);
  };

  /**
   * Update theme colors
   *
   * @param key Theme color key
   * @param color Theme color
   */
  const updateThemeColors = (key: Theme.ThemeColorKey, color: string) => {
    let colorValue = color;

    if (settings.recommendColor) {
      // get a color palette by provided color and color name, and use the suitable color
      colorValue = getPaletteColorByNumber(color, 500, true);
    }

    if (key === 'primary') {
      setSettings({ themeColor: colorValue });
    } else {
      setSettings({ otherColor: { ...settings.otherColor, [key]: colorValue } });
    }
  };

  /**
   * Set theme layout
   *
   * @param mode Theme layout mode
   */
  const setThemeLayout = (mode: UnionKey.ThemeLayoutMode) => {
    setSettings({
      layout: {
        ...settings.layout,
        mode
      }
    });
  };

  /**
   * Set watermark enable user name
   *
   * @param enable Whether to enable user name watermark
   */
  const setWatermarkEnableUserName = (enable: boolean) => {
    const update = {
      watermark: {
        ...settings.watermark,
        enableUserName: enable
      }
    };

    setSettings(update);
  };

  /**
   * Set watermark enable time
   *
   * @param enable Whether to enable time watermark
   */
  const setWatermarkEnableTime = (enable: boolean) => {
    const update = {
      watermark: {
        ...settings.watermark,
        enableTime: enable
      }
    };

    setSettings(update);
  };

  /** Only run timer when watermark is visible and time display is enabled */
  const updateWatermarkTimer = () => {
    const { watermark } = settings;

    const shouldRunTimer = watermark.visible && watermark.enableTime;

    if (shouldRunTimer) {
      resumeWatermarkTime();
    } else {
      pauseWatermarkTime();
    }
  };

  function reset() {
    setSettings(initThemeSettings);
  }

  return {
    settings,
    // Settings properties
    ...settings,
    // Computed values
    darkMode,
    themeColors,
    settingsJson,
    watermarkContent,
    grayscaleMode,
    colourWeaknessMode,
    // Methods
    setGrayscale,
    setColourWeakness,
    setThemeScheme,
    toggleThemeScheme,
    updateThemeColors,
    updateWatermarkTimer,
    setThemeLayout,
    setWatermarkEnableUserName,
    setWatermarkEnableTime,
    setSettings,
    reset
  };
};
