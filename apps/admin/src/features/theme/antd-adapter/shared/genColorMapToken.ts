import type { ColorMapToken, SeedToken } from 'antd/lib/theme/interface';

import type { ColorMap, PaletteGenerators } from '../types';

/** antd 1-10 索引 */
export const ANTD_INDEXES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

/** Tailwind 风格 50-950 索引 */
export const TAILWIND_INDEXES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

/**
 * 语义化颜色映射配置
 *
 * 设计原则：
 * - 1-2 (50-100): 背景
 * - 3-4 (200-300): 边框
 * - 5 (400): 悬停
 * - 6 (500): 主色
 * - 7 (600): 激活
 * - 5-7 (400-600): 文字相关
 */
export interface SemanticColorConfig {
  /** 激活色 */
  active: number;
  /** 背景色 */
  bg: number;
  /** 背景悬停色 */
  bgHover: number;
  /** 边框色 */
  border: number;
  /** 边框悬停色 */
  borderHover: number;
  /** 悬停色 */
  hover: number;
  /** 主色 */
  main: number;
  /** 文字色 */
  text: number;
  /** 文字激活色 */
  textActive: number;
  /** 文字悬停色 */
  textHover: number;
}

/** 主色系的语义化颜色配置 */
export const PRIMARY_SEMANTIC_CONFIG: SemanticColorConfig = {
  active: 7,
  bg: 1,
  bgHover: 2,
  border: 3,
  borderHover: 4,
  hover: 5,
  main: 6,
  text: 6,
  textActive: 7,
  textHover: 5
};

/** 功能色系的语义化颜色配置（success, warning, error, info） */
export const FUNCTIONAL_SEMANTIC_CONFIG: SemanticColorConfig = {
  active: 7,
  bg: 1,
  bgHover: 2,
  border: 3,
  borderHover: 4,
  hover: 4, // 功能色悬停使用 4
  main: 6,
  text: 9,
  textActive: 10,
  textHover: 8
};

interface GenSemanticColorsOptions {
  colors: ColorMap;
  config: SemanticColorConfig;
  /** 颜色名称，支持 'colorPrimary' 或 'Primary' 格式 */
  name: string;
}

/**
 * 规范化颜色名称
 * - 'colorPrimary' → 'Primary'
 * - 'Primary' → 'Primary'
 * - 'primary' → 'Primary'
 */
function normalizeColorName(name: string): string {
  // 移除 'color' 前缀
  let normalized = name.startsWith('color') ? name.slice(5) : name;
  // 首字母大写
  normalized = normalized.charAt(0).toLocaleLowerCase() + normalized.slice(1);
  return normalized;
}

/**
 * 生成单个颜色的语义化变量
 *
 * @example
 * // 以下三种调用方式等价：
 * genSemanticColors({ name: 'colorPrimary', ... })
 * genSemanticColors({ name: 'Primary', ... })
 * genSemanticColors({ name: 'primary', ... })
 * // 都会生成: colorPrimary, colorPrimaryActive, colorPrimaryBg, ...
 */
export function genSemanticColors({ colors, config, name }: GenSemanticColorsOptions): Record<string, string> {
  let colorName = name;
  const isMainColor = name.startsWith('Color');
  if (isMainColor) {
    colorName = name.slice(5);
  }

  const extra = isMainColor
    ? { [colorName.charAt(0).toLocaleLowerCase() + colorName.slice(1)]: colors[config.main] }
    : {};
  return {
    ...extra,
    [`color${colorName}`]: colors[config.main],
    [`color${colorName}Active`]: colors[config.active],
    [`color${colorName}Bg`]: colors[config.bg],
    [`color${colorName}BgHover`]: colors[config.bgHover],
    [`color${colorName}Border`]: colors[config.border],
    [`color${colorName}BorderHover`]: colors[config.borderHover],
    [`color${colorName}Hover`]: colors[config.hover],
    [`color${colorName}Text`]: colors[config.text],
    [`color${colorName}TextActive`]: colors[config.textActive],
    [`color${colorName}TextHover`]: colors[config.textHover]
  } as Record<string, string>;
}

/**
 * 生成调色板变量（1-10 和 50-950）
 */
export function genPaletteVars(name: string, colors: ColorMap): Record<string, string> {
  const colorName = normalizeColorName(name);

  const result: Record<string, string> = {};

  // antd 格式: name-1 到 name-10 和 name1 到 name10
  for (const i of ANTD_INDEXES) {
    result[`${colorName}-${i}`] = colors[i] || '';
    result[`${colorName}${i}`] = colors[i] || '';
  }

  // Tailwind 格式: colorName-50 到 colorName-950
  for (const i of TAILWIND_INDEXES) {
    result[`${colorName}-${i}`] = colors[i] || '';
  }

  return result;
}

/**
 * 生成中性色映射 Token
 *
 * 只生成中性色（背景、文字、边框等）
 * 主题色在 derivative 函数中通过遍历 defaultPresetColors 生成
 */
export default function genColorMapToken(
  seed: SeedToken,
  { generateNeutralColorPalettes }: PaletteGenerators
): ColorMapToken {
  const { colorBgBase, colorTextBase } = seed;

  // 生成中性色
  const neutralColors = generateNeutralColorPalettes(colorBgBase, colorTextBase);

  return {
    ...neutralColors,
    // 遮罩和白色
    colorBgMask: 'rgba(0, 0, 0, 0.45)',
    colorWhite: '#fff'
  } as ColorMapToken;
}
