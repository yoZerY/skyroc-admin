import type { MapToken } from 'antd/lib/theme/interface';

/**
 * 圆角配置
 *
 * 基于 UnoCSS 的 radius 规则，使用基础圆角值生成
 * 默认 borderRadius = 6px
 *
 * | 名称    | 计算方式              | px (radius=6) |
 * |---------|----------------------|---------------|
 * | none    | 0                    | 0             |
 * | xs      | radius / 3           | 2             |
 * | sm      | radius * 2/3         | 4             |
 * | md      | radius               | 6 (默认)       |
 * | lg      | radius * 4/3         | 8             |
 * | xl      | radius * 2           | 12            |
 * | 2xl     | radius * 8/3         | 16            |
 * | 3xl     | radius * 4           | 24            |
 * | 4xl     | radius * 16/3        | 32            |
 * | full    | 9999                 | 9999          |
 */

/** 圆角倍数表（基于 borderRadius） */
export const RADIUS_MULTIPLIERS = {
  none: 0,
  xs: 1 / 3, // 2px (radius / 3)
  sm: 2 / 3, // 4px (radius * 2/3)
  md: 1, // 6px (radius) - 默认
  lg: 4 / 3, // 8px (radius * 4/3)
  xl: 2, // 12px (radius * 2)
  '2xl': 8 / 3, // 16px (radius * 8/3)
  '3xl': 4, // 24px (radius * 4)
  '4xl': 16 / 3, // 32px (radius * 16/3)
  full: -1 // 特殊值，表示 9999px
} as const;

export type RadiusSizeKey = keyof typeof RADIUS_MULTIPLIERS;

/**
 * 计算圆角大小
 * @param multiplier 倍数
 * @param borderRadius 基础圆角（默认 6）
 */
export function calcRadius(multiplier: number, borderRadius = 6): number {
  if (multiplier < 0) return 9999; // full
  return Math.round(borderRadius * multiplier);
}

/** 圆角 Token 类型 */
export type RadiusMapToken = Pick<
  MapToken,
  'borderRadius' | 'borderRadiusLG' | 'borderRadiusOuter' | 'borderRadiusSM' | 'borderRadiusXS'
>;

/**
 * 生成圆角映射 Token
 *
 * 基于基础圆角值生成 Ant Design 风格的圆角 token
 *
 * 映射关系（borderRadius = 6）：
 * - borderRadiusXS: xs (2px) = radius / 3
 * - borderRadiusSM: sm (4px) = radius * 2/3
 * - borderRadius: md (6px) = radius
 * - borderRadiusLG: lg (8px) = radius * 4/3
 * - borderRadiusOuter: sm (4px) = radius * 2/3
 *
 * @param borderRadius 基础圆角值（px），默认 6
 */
export function genRadiusMapToken(borderRadius = 6): RadiusMapToken {
  return {
    borderRadiusXS: calcRadius(RADIUS_MULTIPLIERS.xs, borderRadius), // 2px
    borderRadiusSM: calcRadius(RADIUS_MULTIPLIERS.sm, borderRadius), // 4px
    borderRadius, // 6px
    borderRadiusLG: calcRadius(RADIUS_MULTIPLIERS.lg, borderRadius), // 8px
    borderRadiusOuter: calcRadius(RADIUS_MULTIPLIERS.sm, borderRadius) // 4px
  };
}

/** 扩展圆角 Token（包含更多尺寸） */
export interface ExtendedRadiusToken extends RadiusMapToken {
  /** 2xl - 16px */
  borderRadius2XL: number;
  /** 3xl - 24px */
  borderRadius3XL: number;
  /** 4xl - 32px */
  borderRadius4XL: number;
  /** full - 9999px */
  borderRadiusFull: number;
  /** xl - 12px */
  borderRadiusXL: number;
}

/**
 * 生成扩展圆角 Token
 *
 * 包含完整的 UnoCSS 圆角系列
 *
 * @param borderRadius 基础圆角值（px），默认 6
 */
export function genExtendedRadiusToken(borderRadius = 6): ExtendedRadiusToken {
  return {
    ...genRadiusMapToken(borderRadius),
    borderRadiusXL: calcRadius(RADIUS_MULTIPLIERS.xl, borderRadius), // 12px
    borderRadius2XL: calcRadius(RADIUS_MULTIPLIERS['2xl'], borderRadius), // 16px
    borderRadius3XL: calcRadius(RADIUS_MULTIPLIERS['3xl'], borderRadius), // 24px
    borderRadius4XL: calcRadius(RADIUS_MULTIPLIERS['4xl'], borderRadius), // 32px
    borderRadiusFull: 9999 // 9999px
  };
}

/**
 * 生成完整的圆角表
 * @param borderRadius 基础圆角值（px），默认 6
 */
export function genRadiusSizes(borderRadius = 6): Record<RadiusSizeKey, number> {
  return Object.entries(RADIUS_MULTIPLIERS).reduce(
    (acc, [key, multiplier]) => {
      acc[key as RadiusSizeKey] = calcRadius(multiplier, borderRadius);
      return acc;
    },
    {} as Record<RadiusSizeKey, number>
  );
}

/**
 * 生成圆角 CSS 变量
 * @param borderRadius 基础圆角值（px），默认 6
 */
export function genRadiusVars(borderRadius = 6): Record<string, string> {
  const result: Record<string, string> = {};

  for (const [key, multiplier] of Object.entries(RADIUS_MULTIPLIERS)) {
    const px = calcRadius(multiplier, borderRadius);
    result[`radius-${key}`] = `${px}px`;
  }

  return result;
}

export default genRadiusMapToken;
