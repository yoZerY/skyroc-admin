import { mixColor } from '@skyroc/color';
import type { MapToken, PresetColorType, SeedToken } from 'antd/lib/theme/interface';

import { defaultPresetColors } from '../../seed';
import genColorMapToken, {
  FUNCTIONAL_SEMANTIC_CONFIG,
  genPaletteVars,
  genSemanticColors
} from '../../shared/genColorMapToken';
import genCommonMapToken from '../../shared/genCommonMapToken';
import genControlHeight from '../../shared/genControlHeight';
import { genFontMapToken } from '../../shared/genFontMapToken';
import genSizeMapToken from '../../shared/genSizeMapToken';

import { generateColorPalettes, generateNeutralColorPalettes } from './colors';

// Export generator functions for external use
export { generateColorPalettes, generateNeutralColorPalettes };

/**
 * Light mode theme algorithm
 *
 * Uses generateOklchPaletteEx algorithm to replace antd's default @ant-design/colors
 * Generates more modern design-compliant palettes
 *
 * Generated content:
 * - antd format palettes: blue-1, blue1, ... blue-10, blue10
 * - Tailwind format palettes: blue-50, blue-100, ... blue-950
 * - Semantic colors: colorBlueBg, colorBlueHover, colorBlue, colorBlueActive, ...
 */
export default function derivative(token: SeedToken): MapToken {
  // Generate palettes and semantic colors for all preset colors
  const colorPalettes = Object.keys(defaultPresetColors)
    .map(colorKey => {
      const baseColor = token[colorKey as keyof PresetColorType];

      if (!baseColor) return {};

      const colors = generateColorPalettes(baseColor);
      const result = genPaletteVars(colorKey, colors);

      // Generate semantic colors: colorBlueBg, colorBlueHover, colorBlue, ...
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
    // Neutral color mapping (background, text, border, etc.)
    ...genColorMapToken(token, {
      generateNeutralColorPalettes
    })
  };
}
