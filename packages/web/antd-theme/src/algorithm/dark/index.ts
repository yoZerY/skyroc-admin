import { mixColor } from '@skyroc/color';
import type { MapToken, PresetColorType, SeedToken } from 'antd/lib/theme/interface';

import defaultAlgorithm from '../default';
import { defaultPresetColors } from '../../seed';
import genColorMapToken, {
  FUNCTIONAL_SEMANTIC_CONFIG,
  genPaletteVars,
  genSemanticColors
} from '../../shared/genColorMapToken';

import { generateColorPalettes, generateNeutralColorPalettes } from './colors';

// Export generator functions for external use
export { generateColorPalettes, generateNeutralColorPalettes };

/**
 * Dark mode theme algorithm
 *
 * Reference Ant Design official dark theme implementation:
 * 1. Uses generateOklchPaletteEx algorithm to generate palettes (replaces @ant-design/colors)
 * 2. Special color mapping strategy (5→600, 6→500, 7→400)
 * 3. Custom colorPrimaryBg to optimize selected item background
 *
 * Generated content:
 * - antd format palettes: blue-1, blue1, ... blue-10, blue10
 * - Tailwind format palettes: blue-50, blue-100, ... blue-950
 * - Semantic colors: colorBlueBg, colorBlueHover, colorBlue, colorBlueActive, ...
 * - Neutral color system: colorText, colorBgContainer, colorBorder, etc.
 */
export default function derivativeDark(token: SeedToken, mapToken?: MapToken): MapToken {
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

      // Error color special handling
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

  // Generate neutral color mapping (background, text, border, etc.)
  const colorMapToken = genColorMapToken(token, {
    generateNeutralColorPalettes
  });

  const mergedMapToken = mapToken ?? defaultAlgorithm(token);

  return {
    ...mergedMapToken,
    ...colorPalettes,

    // Neutral color mapping
    ...colorMapToken,

    /**
     * Dark mode special customization
     * Reference Ant Design official implementation:
     * https://github.com/ant-design/ant-design/issues/30524#issuecomment-871961867
     *
     * Uses colorPrimaryBorder as selected item background for better visual feedback
     */
    colorPrimaryBg: colorMapToken.colorPrimaryBorder,
    colorPrimaryBgHover: colorMapToken.colorPrimaryBorderHover
  };
}
