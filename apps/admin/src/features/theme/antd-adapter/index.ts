export { default as derivativeDark } from './dark';
export {
  DARK_BG_BASE,
  DARK_TEXT_BASE,
  generateColorPalettes as generateDarkColorPalettes,
  generateNeutralColorPalettes as generateDarkNeutralColorPalettes
} from './dark/colors';

/**
 * Antd 主题适配器
 *
 * 使用 generateOklchPaletteEx 算法重写 antd 的颜色算法
 * 生成更符合现代设计的调色板
 *
 * 特点：
 * - 使用 OKLCH 色彩空间生成调色板
 * - 实色混合算法替代透明度方案
 * - 支持 antd 1-10 和 Tailwind 50-950 两套格式
 */

// 主题算法
export { default as derivative } from './default';
// 颜色生成器
export { generateColorPalettes, generateNeutralColorPalettes, LIGHT_BG_BASE, LIGHT_TEXT_BASE } from './default/colors';

// 预设颜色
export { defaultPresetColors, seedToken } from './seed';

// 工具函数（从 @sa/color 重新导出）
export { adjustLightness, darkenColor, lightenColor, mixColor } from './shared/colorAlgorithm';

// 颜色映射
export {
  ANTD_INDEXES,
  default as genColorMapToken,
  FUNCTIONAL_SEMANTIC_CONFIG,
  genPaletteVars,
  genSemanticColors,
  PRIMARY_SEMANTIC_CONFIG,
  TAILWIND_INDEXES
} from './shared/genColorMapToken';

export type { SemanticColorConfig } from './shared/genColorMapToken';
// 字体映射
export {
  default as genFontMapToken,
  FONT_SIZES,
  genFontSizes,
  getLineHeightRatio,
  LINE_HEIGHTS,
  remToPx
} from './shared/genFontMapToken';

export type { FontSizeKey } from './shared/genFontMapToken';
// 圆角映射
export { default as genRadiusMapToken, genExtendedRadiusToken, genRadiusVars } from './shared/genRadiusMapToken';

export type { ExtendedRadiusToken, RadiusMapToken, RadiusSizeKey } from './shared/genRadiusMapToken';
// 间距映射
export {
  calcSpacing,
  default as genSizeMapToken,
  genSpacingSizes,
  genSpacingVars,
  SPACING_MULTIPLIERS
} from './shared/genSizeMapToken';

export type { SpacingSizeKey } from './shared/genSizeMapToken';
// 类型
export type * from './types';
