import type { SizeMapToken } from 'antd/lib/theme/interface';

/**
 * 间距配置
 *
 * 基于 UnoCSS 的 spacing 规则，使用 sizeUnit 作为基础单位
 * 默认 sizeUnit = 4px
 *
 * | 名称    | 倍数     | px (sizeUnit=4) |
 * |---------|----------|-----------------|
 * | 3xs     | 1        | 4               |
 * | 2xs     | 2        | 8               |
 * | xs      | 3        | 12              |
 * | md      | 4        | 16              |
 * | lg      | 5        | 20              |
 * | xl      | 6        | 24              |
 * | 2xl     | 8        | 32              |
 * | 3xl     | 10       | 40              |
 * | 4xl     | 12       | 48              |
 * | 5xl     | 16       | 64              |
 * | 6xl     | 20       | 80              |
 * | 7xl     | 24       | 96              |
 * | 8xl     | 32       | 128             |
 * | 9xl     | 36       | 144             |
 */

/** 间距倍数表（基于 sizeUnit） */
export const SPACING_MULTIPLIERS = {
  '3xs': 1, // 4px (sizeUnit * 1)
  '2xs': 2, // 8px (sizeUnit * 2)
  xs: 3, // 12px (sizeUnit * 3)
  md: 4, // 16px (sizeUnit * 4)
  lg: 5, // 20px (sizeUnit * 5)
  xl: 6, // 24px (sizeUnit * 6)
  '2xl': 8, // 32px (sizeUnit * 8)
  '3xl': 10, // 40px (sizeUnit * 10)
  '4xl': 12, // 48px (sizeUnit * 12)
  '5xl': 16, // 64px (sizeUnit * 16)
  '6xl': 20, // 80px (sizeUnit * 20)
  '7xl': 24, // 96px (sizeUnit * 24)
  '8xl': 32, // 128px (sizeUnit * 32)
  '9xl': 36 // 144px (sizeUnit * 36)
} as const;

export type SpacingSizeKey = keyof typeof SPACING_MULTIPLIERS;

/**
 * 计算间距大小
 * @param multiplier 倍数
 * @param sizeUnit 基础单位（默认 4）
 */
export function calcSpacing(multiplier: number, sizeUnit = 4): number {
  return sizeUnit * multiplier;
}

/**
 * 生成间距映射 Token
 *
 * 基于 sizeUnit 生成 Ant Design 风格的 size token
 *
 * 映射关系（sizeUnit = 4）：
 * - sizeXXS: 3xs (4px)  = sizeUnit * 1
 * - sizeXS: 2xs (8px)   = sizeUnit * 2
 * - sizeSM: xs (12px)   = sizeUnit * 3
 * - size/sizeMS: md (16px) = sizeUnit * 4
 * - sizeMD: lg (20px)   = sizeUnit * 5
 * - sizeLG: xl (24px)   = sizeUnit * 6
 * - sizeXL: 2xl (32px)  = sizeUnit * 8
 * - sizeXXL: 4xl (48px) = sizeUnit * 12
 *
 * @param sizeUnit 基础单位（px），默认 4
 */
export function genSizeMapToken(sizeUnit = 4): SizeMapToken {
  return {
    // Ant Design 标准 size token
    sizeXXS: sizeUnit * SPACING_MULTIPLIERS['3xs'], // 4px
    sizeXS: sizeUnit * SPACING_MULTIPLIERS['2xs'], // 8px
    sizeSM: sizeUnit * SPACING_MULTIPLIERS.xs, // 12px
    sizeMS: sizeUnit * SPACING_MULTIPLIERS.md, // 16px
    size: sizeUnit * SPACING_MULTIPLIERS.md, // 16px
    sizeMD: sizeUnit * SPACING_MULTIPLIERS.lg, // 20px
    sizeLG: sizeUnit * SPACING_MULTIPLIERS.xl, // 24px
    sizeXL: sizeUnit * SPACING_MULTIPLIERS['2xl'], // 32px
    sizeXXL: sizeUnit * SPACING_MULTIPLIERS['4xl'] // 48px
  };
}

/**
 * 生成完整的间距表
 * @param sizeUnit 基础单位（px），默认 4
 */
export function genSpacingSizes(sizeUnit = 4): Record<SpacingSizeKey, number> {
  return Object.entries(SPACING_MULTIPLIERS).reduce(
    (acc, [key, multiplier]) => {
      acc[key as SpacingSizeKey] = sizeUnit * multiplier;
      return acc;
    },
    {} as Record<SpacingSizeKey, number>
  );
}

/**
 * 生成间距相关的 CSS 变量
 * @param sizeUnit 基础单位（px），默认 4
 */
export function genSpacingVars(sizeUnit = 4): Record<string, string> {
  const result: Record<string, string> = {};

  for (const [key, multiplier] of Object.entries(SPACING_MULTIPLIERS)) {
    const px = sizeUnit * multiplier;
    result[`spacing-${key}`] = `${px}px`;
    result[`spacing${key.replace(/^(\d)/, '_$1')}`] = `${px}px`; // spacing_3xs, spacing_2xs 等
  }

  return result;
}

export default genSizeMapToken;
