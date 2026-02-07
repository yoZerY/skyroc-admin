import { transformColorWithOpacity } from '@skyroc/color';
import type { ConfigProviderProps } from 'antd';

import { derivative, derivativeDark } from '../theme/antd-adapter';
import { defaultPresetColors } from '../theme/antd-adapter/seed';

/**
 * Get antd theme
 *
 * @param colors Theme colors
 * @param darkMode Is dark mode
 */
export function getAntdTheme(colors: Theme.ThemeColor, darkMode: boolean, settings: Theme.ThemeSetting) {
  const { themeRadius, themeTextSize, tokens } = settings;

  const { error, info, primary, success, warning } = colors;

  const bgColor = transformColorWithOpacity(primary, darkMode ? 0.3 : 0.1, darkMode ? '#000000' : '#fff');
  const containerBgColor = darkMode ? '#1C1C1E' : tokens.light?.colors.container;

  const borderColor = darkMode ? '#2E3138' : '#C6C6C8';

  const theme: ConfigProviderProps['theme'] = {
    algorithm: [
      darkMode
        ? derivativeDark
        : a => {
            const result = derivative(a);
            console.log(result, 'result');
            return result;
          }
    ],
    cssVar: {
      key: 'root',
      prefix: ''
    },
    hashed: false,
    components: {
      Button: {
        controlHeightSM: 28
      },
      Collapse: {
        contentPadding: '16px 16px 24px 16px',
        headerBg: containerBgColor
      },
      Menu: {
        darkItemBg: 'transparent',
        darkSubMenuItemBg: 'transparent',
        itemMarginInline: 8,
        itemSelectedBg: bgColor,
        subMenuItemBg: 'transparent'
      }
    },
    token: {
      colorBgContainer: containerBgColor,
      colorError: error,
      colorInfo: info,
      fontSize: themeTextSize,
      colorBorder: borderColor,
      colorPrimary: primary,
      borderRadius: themeRadius,
      colorSuccess: success,
      colorWarning: warning,
      // 使用预设的颜色
      ...defaultPresetColors
    }
  };

  return theme;
}
