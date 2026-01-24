import type { FontMapToken } from 'antd/lib/theme/interface';

/**
 * 字体大小配置
 *
 * 基于 UnoCSS 的 text 规则，使用 rem 单位
 * 对应关系：1rem = 16px（浏览器默认）
 *
 * | 名称    | rem      | px   | lineHeight rem | lineHeight px |
 * |---------|----------|------|----------------|---------------|
 * | xs      | 0.75     | 12   | 1.125          | 18            |
 * | sm      | 0.875    | 14   | 1.375          | 22            |
 * | base    | 1        | 16   | 1.5            | 24            |
 * | lg      | 1.125    | 18   | 1.625          | 26            |
 * | xl      | 1.25     | 20   | 1.75           | 28            |
 * | 2xl     | 1.5      | 24   | 2              | 32            |
 * | 3xl     | 1.875    | 30   | 2.375          | 38            |
 * | 4xl     | 2.25     | 36   | 2.75           | 44            |
 * | 5xl     | 3        | 48   | 3.5            | 56            |
 * | 6xl     | 3.75     | 60   | 4.25           | 68            |
 * | 7xl     | 4.5      | 72   | 5              | 80            |
 * | 8xl     | 6        | 96   | 6.5            | 104           |
 * | 9xl     | 8        | 128  | 8.5            | 136           |
 */

/** 字体大小表（rem） */
export const FONT_SIZES = {
  xs: 0.75, // 12px
  sm: 0.875, // 14px
  base: 1, // 16px
  lg: 1.125, // 18px
  xl: 1.25, // 20px
  '2xl': 1.5, // 24px
  '3xl': 1.875, // 30px
  '4xl': 2.25, // 36px
  '5xl': 3, // 48px
  '6xl': 3.75, // 60px
  '7xl': 4.5, // 72px
  '8xl': 6, // 96px
  '9xl': 8 // 128px
} as const;

/** 行高表（rem） */
export const LINE_HEIGHTS = {
  xs: 1.125, // 18px
  sm: 1.375, // 22px
  base: 1.5, // 24px
  lg: 1.625, // 26px
  xl: 1.75, // 28px
  '2xl': 2, // 32px
  '3xl': 2.375, // 38px
  '4xl': 2.75, // 44px
  '5xl': 3.5, // 56px
  '6xl': 4.25, // 68px
  '7xl': 5, // 80px
  '8xl': 6.5, // 104px
  '9xl': 8.5 // 136px
} as const;

export type FontSizeKey = keyof typeof FONT_SIZES;

/**
 * rem 转 px
 * @param rem rem 值
 * @param baseFontSize 基础字体大小（默认 16）
 */
export function remToPx(rem: number, baseFontSize = 16): number {
  return Math.round(rem * baseFontSize);
}

/**
 * 计算行高比例
 * @param fontSize 字体大小（rem）
 * @param lineHeight 行高（rem）
 */
export function getLineHeightRatio(fontSize: number, lineHeight: number): number {
  return Number((lineHeight / fontSize).toFixed(3));
}

interface FontSizePair {
  lineHeight: number;
  lineHeightRatio: number;
  size: number;
}

/**
 * 生成字体大小对
 * @param baseFontSize 基础字体大小（px），默认 16
 */
export function genFontSizes(baseFontSize = 16): FontSizePair[] {
  const keys: FontSizeKey[] = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl'];

  return keys.map(key => {
    const fontSizeRem = FONT_SIZES[key];
    const lineHeightRem = LINE_HEIGHTS[key];
    const size = remToPx(fontSizeRem, baseFontSize);
    const lineHeight = remToPx(lineHeightRem, baseFontSize);

    return {
      lineHeight,
      lineHeightRatio: getLineHeightRatio(fontSizeRem, lineHeightRem),
      size
    };
  });
}

/**
 * 生成字体映射 Token
 *
 * 基于 UnoCSS 的字体规则生成 Ant Design 风格的字体 token
 *
 * 映射关系：
 * - fontSizeSM: sm (14px)
 * - fontSize: base (16px)
 * - fontSizeLG: lg (18px)
 * - fontSizeXL: xl (20px)
 * - fontSizeHeading5: xl (20px)
 * - fontSizeHeading4: 2xl (24px)
 * - fontSizeHeading3: 3xl (30px)
 * - fontSizeHeading2: 4xl (36px)
 * - fontSizeHeading1: 5xl (48px)
 *
 * @param baseFontSize 基础字体大小（px），默认 16
 */
export function genFontMapToken(
  baseFontSize = 16
): FontMapToken & { fontHeight: number; fontHeightLG: number; fontHeightSM: number } {
  const fontSizePairs = genFontSizes(baseFontSize);

  // 索引映射：xs=0, sm=1, base=2, lg=3, xl=4, 2xl=5, 3xl=6, 4xl=7, 5xl=8
  const fontSizes = fontSizePairs.map(pair => pair.size);
  const lineHeights = fontSizePairs.map(pair => pair.lineHeightRatio);

  // SM = sm (index 1)
  const fontSizeSM = fontSizes[1];
  const lineHeightSM = lineHeights[1];

  // MD = base (index 2)
  const fontSizeMD = fontSizes[2];
  const lineHeightMD = lineHeights[2];

  // LG = lg (index 3)
  const fontSizeLG = fontSizes[3];
  const lineHeightLG = lineHeights[3];

  return {
    // 基础字体大小
    fontSize: fontSizeMD,
    fontSizeLG,
    fontSizeSM,
    fontSizeXL: fontSizes[4], // xl (20px)
    TextXs: fontSizes[0],
    TextSm: fontSizes[1],
    TextBase: fontSizes[2],
    TextLg: fontSizes[3],
    TextXl: fontSizes[4],
    Text2xl: fontSizes[5],
    Text3xl: fontSizes[6],
    Text4xl: fontSizes[7],
    Text5xl: fontSizes[8],
    Text6xl: fontSizes[9],
    Text7xl: fontSizes[10],
    Text8xl: fontSizes[11],
    Text9xl: fontSizes[12],

    // 标题字体大小（从大到小）
    fontSizeHeading1: fontSizes[8], // 5xl (48px)
    fontSizeHeading2: fontSizes[7], // 4xl (36px)
    fontSizeHeading3: fontSizes[6], // 3xl (30px)
    fontSizeHeading4: fontSizes[5], // 2xl (24px)
    fontSizeHeading5: fontSizes[4], // xl (20px)

    // 行高比例
    lineHeight: lineHeightMD,
    lineHeightLG,
    lineHeightSM,

    // 行高（px）
    fontHeight: Math.round(lineHeightMD * fontSizeMD),
    fontHeightLG: Math.round(lineHeightLG * fontSizeLG),
    fontHeightSM: Math.round(lineHeightSM * fontSizeSM),

    // 标题行高
    lineHeightHeading1: lineHeights[8], // 5xl
    lineHeightHeading2: lineHeights[7], // 4xl
    lineHeightHeading3: lineHeights[6], // 3xl
    lineHeightHeading4: lineHeights[5], // 2xl
    lineHeightHeading5: lineHeights[4] // xl
  };
}

export default genFontMapToken;
