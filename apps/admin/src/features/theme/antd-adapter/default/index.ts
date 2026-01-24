import { mixColor } from '@sa/color';
import type { MapToken, PresetColorType, SeedToken } from 'antd/lib/theme/interface';

import { defaultPresetColors } from '../seed';
import genColorMapToken, {
  ANTD_INDEXES,
  FUNCTIONAL_SEMANTIC_CONFIG,
  TAILWIND_INDEXES,
  genPaletteVars,
  genSemanticColors
} from '../shared/genColorMapToken';
import genCommonMapToken from '../shared/genCommonMapToken';
import genControlHeight from '../shared/genControlHeight';
import { genFontMapToken } from '../shared/genFontMapToken';
import genSizeMapToken from '../shared/genSizeMapToken';

import { generateColorPalettes, generateNeutralColorPalettes } from './colors';
// 导出生成器函数，方便外部使用
export { generateColorPalettes, generateNeutralColorPalettes };

/**
 * 亮色模式主题算法
 *
 * 使用 generateOklchPaletteEx 算法替代 antd 默认的 @ant-design/colors
 * 生成更符合现代设计的调色板
 *
 * 生成内容：
 * - antd 格式调色板: blue-1, blue1, ... blue-10, blue10
 * - Tailwind 格式调色板: blue-50, blue-100, ... blue-950
 * - 语义化颜色: colorBlueBg, colorBlueHover, colorBlue, colorBlueActive, ...
 */
export default function derivative(token: SeedToken): MapToken {
  // 为所有预设颜色生成调色板和语义化颜色
  const colorPalettes = Object.keys(defaultPresetColors)
    .map(colorKey => {
      const baseColor = token[colorKey as keyof PresetColorType];

      if (!baseColor) return {};

      const colors = generateColorPalettes(baseColor);
      const result = genPaletteVars(colorKey, colors);
      // 生成语义化颜色: colorBlueBg, colorBlueHover, colorBlue, ...
      const capitalizedKey = colorKey.charAt(0).toUpperCase() + colorKey.slice(1);
      const semanticColors = genSemanticColors({
        colors,
        config: FUNCTIONAL_SEMANTIC_CONFIG,
        name: capitalizedKey
      });

      if (colorKey === 'colorError') {
        result.colorErrorBgActive = colors[3];
        result.colorErrorBgFilledHover = mixColor(colors[1], colors[3], 0.5);
      }
      Object.assign(result, semanticColors);

      return result;
    })
    .reduce<MapToken>((prev, cur) => {
      return { ...prev, ...cur };
    }, {} as MapToken);

  return {
    ...token,
    ...colorPalettes,
    ...genFontMapToken(token.fontSize),
    ...genSizeMapToken(token.sizeUnit),
    ...genControlHeight(token),
    ...genCommonMapToken(token),
    // 中性色映射（背景、文字、边框等）
    ...genColorMapToken(token, {
      generateNeutralColorPalettes
    })
  };
}
