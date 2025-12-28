import { getColorPalette, getHsl } from '@sa/color';
import defu from 'defu';

import { toggleHtmlClass } from '@/utils/common';
import { localStg } from '@/utils/storage';

import { overrideThemeSettings, themeSettings } from './settings';

export const icons: Record<UnionKey.ThemeScheme, string> = {
  dark: 'material-symbols:nightlight-rounded',
  light: 'material-symbols:sunny',
  auto: 'material-symbols:hdr-auto'
};

/** Dark mode class name */
const DARK_CLASS = 'dark';

/** Init theme settings */
export function initThemeSettingsFn() {
  const isProd = import.meta.env.PROD;

  // if it is development mode, the theme settings will not be cached, by update `themeSettings` in `src/theme/settings.ts` to update theme settings
  if (!isProd) return themeSettings;

  // if it is production mode, the theme settings will be cached in localStorage
  // if want to update theme settings when publish new version, please update `overrideThemeSettings` in `src/theme/settings.ts`

  const localSettings = localStg.get('themeSettings');

  let settings = defu(localSettings, themeSettings);

  const isOverride = localStg.get('overrideThemeFlag') === BUILD_TIME;

  if (!isOverride) {
    settings = defu(overrideThemeSettings, settings);

    localStg.set('overrideThemeFlag', BUILD_TIME);
  }

  return settings;
}

/**
 * create theme token css vars value by theme settings
 *
 * @param colors Theme colors
 * @param tokens Theme setting tokens
 * @param [recommended=false] Use recommended color. Default is `false`
 */
export function createThemeToken(colors: Theme.ThemeColor, tokens?: Theme.ThemeSetting['tokens'], recommended = false) {
  const paletteColors = createThemePaletteColors(colors, recommended);

  const { dark, light } = tokens || themeSettings.tokens;

  const themeTokens: Theme.ThemeTokenCSSVars = {
    colors: {
      ...paletteColors,
      nprogress: paletteColors.primary,
      ...light.colors
    },
    boxShadow: {
      ...light.boxShadow
    }
  };

  const darkThemeTokens: Theme.ThemeTokenCSSVars = {
    colors: {
      ...themeTokens.colors,
      ...dark?.colors
    },
    boxShadow: {
      ...themeTokens.boxShadow,
      ...dark?.boxShadow
    }
  };

  return {
    themeTokens,
    darkThemeTokens
  };
}

/**
 * Create theme palette colors
 *
 * @param colors Theme colors
 * @param [recommended=false] Use recommended color. Default is `false`
 */
function createThemePaletteColors(colors: Theme.ThemeColor, recommended = false) {
  const colorKeys = Object.keys(colors) as Theme.ThemeColorKey[];
  const colorPaletteVar = {} as Theme.ThemePaletteColor;

  colorKeys.forEach(key => {
    const colorMap = getColorPalette(colors[key], recommended);

    colorPaletteVar[key] = colorMap.get(500)!;

    colorMap.forEach((hex, number) => {
      colorPaletteVar[`${key}-${number}`] = hex;
    });
  });

  return colorPaletteVar;
}

/**
 * Get css var by tokens
 *
 * @param tokens Theme base tokens
 */
function getCssVarByTokens(tokens: Theme.BaseToken) {
  const styles: string[] = [];

  for (const [key, tokenValues] of Object.entries(tokens)) {
    for (const [tokenKey, tokenValue] of Object.entries(tokenValues)) {
      const cssVarsKey = tokenKey;
      let cssValue = tokenValue;

      if (key === 'colors') {
        const { h, l, s } = getHsl(cssValue);
        cssValue = `${h} ${s}% ${l}%`;
      }

      styles.push(`--${cssVarsKey}: ${cssValue}`);
    }
  }

  const styleStr = styles.join(';');

  return styleStr;
}

/**
 * Add theme vars to global
 *
 * @param tokens
 */
export function addThemeVarsToGlobal(tokens: Theme.BaseToken, darkTokens: Theme.BaseToken) {
  const cssVarStr = getCssVarByTokens(tokens);
  const darkCssVarStr = getCssVarByTokens(darkTokens);

  const css = `
    :root {
      ${cssVarStr};
      --card: 0 0% 100%;
      --card-foreground: 224 71.4% 4.1%;
      --input: 220 13% 91%;
      --bg-opacity: 100%;
      --text-opacity: 100%;
      --border-opacity: 100%;
    }
  `;

  const darkCss = `
    html.${DARK_CLASS} {
      ${darkCssVarStr};
    }
  `;

  const styleId = 'theme-vars';

  const style = document.querySelector(`#${styleId}`) || document.createElement('style');

  style.id = styleId;

  style.textContent = css + darkCss;

  document.head.appendChild(style);
}

/**
 * Toggle css dark mode
 *
 * @param darkMode Is dark mode
 */
export function toggleCssDarkMode(darkMode = false) {
  const { add, remove } = toggleHtmlClass(DARK_CLASS);

  if (darkMode) {
    add();
  } else {
    remove();
  }
}

/**
 * Toggle auxiliary color modes
 *
 * @param grayscaleMode
 * @param colourWeakness
 */
export function toggleAuxiliaryColorModes(grayscaleMode = false, colourWeakness = false) {
  const htmlElement = document.documentElement;
  htmlElement.style.filter = [grayscaleMode ? 'grayscale(100%)' : '', colourWeakness ? 'invert(80%)' : '']
    .filter(Boolean)
    .join(' ');
}
