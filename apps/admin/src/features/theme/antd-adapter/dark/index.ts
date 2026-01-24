import type { MapToken, PresetColorType, SeedToken } from 'antd/lib/theme/interface';

import { defaultPresetColors } from '../seed';
import genColorMapToken, {
  ANTD_INDEXES,
  FUNCTIONAL_SEMANTIC_CONFIG,
  TAILWIND_INDEXES,
  genSemanticColors
} from '../shared/genColorMapToken';

import { generateColorPalettes, generateNeutralColorPalettes } from './colors';

// 导出生成器函数，方便外部使用
export { generateColorPalettes, generateNeutralColorPalettes };

/**
 * 暗色模式主题算法
 *
 * 使用 generateOklchPaletteEx 算法生成暗色模式的调色板
 *
 * 生成内容：
 * - antd 格式调色板: blue-1, blue1, ... blue-10, blue10
 * - Tailwind 格式调色板: blue-50, blue-100, ... blue-950
 * - 语义化颜色: colorBlueBg, colorBlueHover, colorBlue, colorBlueActive, ...
 */
export default function derivativeDark(token: SeedToken): MapToken {
  // 为所有预设颜色生成调色板和语义化颜色
  const colorPalettes = Object.keys(defaultPresetColors)
    .map(colorKey => {
      const baseColor = token[colorKey as keyof PresetColorType];
      if (!baseColor) return {};

      const colors = generateColorPalettes(baseColor);
      const result: Record<string, string> = {};

      // 生成 antd 格式: colorKey-1 到 colorKey-10 和 colorKey1 到 colorKey10
      for (const i of ANTD_INDEXES) {
        const color = colors[i];
        result[`${colorKey}-${i}`] = color;
        result[`${colorKey}${i}`] = color;
      }

      // 生成 Tailwind 格式: colorKey-50 到 colorKey-950
      for (const i of TAILWIND_INDEXES) {
        const color = colors[i];
        result[`${colorKey}-${i}`] = color;
      }

      // 生成语义化颜色: colorBlueBg, colorBlueHover, colorBlue, ...
      const capitalizedKey = colorKey.charAt(0).toUpperCase() + colorKey.slice(1);
      const semanticColors = genSemanticColors({
        colors,
        config: FUNCTIONAL_SEMANTIC_CONFIG,
        name: capitalizedKey
      });
      Object.assign(result, semanticColors);

      return result;
    })
    .reduce<MapToken>((prev, cur) => {
      return { ...prev, ...cur };
    }, {} as MapToken);

  return {
    ...token,
    ...colorPalettes,
    // 颜色映射（primary, success, warning, error, info）
    ...genColorMapToken(token, {
      generateColorPalettes,
      generateNeutralColorPalettes
    })
  };
}
