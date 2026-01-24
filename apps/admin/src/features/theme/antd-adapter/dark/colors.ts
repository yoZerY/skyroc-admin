import { adjustLightness, generateOklchPaletteEx, mixColor } from '@sa/color';

import type { ColorMap, GenerateColorMap, GenerateNeutralColorMap } from '../types';

/** 暗色模式默认基础色 */
export const DARK_BG_BASE = '#0A0A0A';
export const DARK_TEXT_BASE = '#F5F5F5';

/**
 * 生成颜色调色板（暗色模式）
 *
 * 暗色模式下调色板的映射略有不同：
 * - 浅色（1-4）保持正常映射，用于背景和边框
 * - 交互色（5-7）使用更亮的颜色，因为暗色背景需要更高对比度
 * - 文字色（8-10）使用中等深度的颜色，避免太刺眼
 */
export const generateColorPalettes: GenerateColorMap = (baseColor: string): ColorMap => {
  const { palettes } = generateOklchPaletteEx(baseColor);

  return {
    // antd 1-10 格式（暗色模式特殊映射）
    1: palettes[0].hex, // 50 - 最浅背景
    2: palettes[1].hex, // 100 - 背景悬停
    3: palettes[2].hex, // 200 - 边框
    4: palettes[3].hex, // 300 - 边框悬停
    5: palettes[6].hex, // 600 - 悬停色（暗色模式使用更亮的）
    6: palettes[5].hex, // 500 - 主色 ★
    7: palettes[4].hex, // 400 - 激活色（暗色模式使用更亮的）
    8: palettes[6].hex, // 600 - 文字悬停
    9: palettes[5].hex, // 500 - 文字色
    10: palettes[4].hex, // 400 - 文字激活
    // Tailwind 50-950 格式（保持原始映射）
    50: palettes[0].hex,
    100: palettes[1].hex,
    200: palettes[2].hex,
    300: palettes[3].hex,
    400: palettes[4].hex,
    500: palettes[5].hex,
    600: palettes[6].hex,
    700: palettes[7].hex,
    800: palettes[8].hex,
    900: palettes[9].hex,
    950: palettes[10].hex
  };
};

/**
 * 生成中性色调色板（暗色模式）
 *
 * 使用实色混合算法替代透明度方案
 * 暗色模式的层级方向与亮色模式相反：
 * - Layout(亮) → Container → Elevated(暗)
 *
 * 基础色：
 * - colorBgBase: #0A0A0A (深黑)
 * - colorTextBase: #F5F5F5 (柔和白)
 */
export const generateNeutralColorPalettes: GenerateNeutralColorMap = (bgBaseColor: string, textBaseColor: string) => {
  const colorBgBase = bgBaseColor || DARK_BG_BASE;
  const colorTextBase = textBaseColor || DARK_TEXT_BASE;

  return {
    colorBgBase,
    colorTextBase,

    /**
     * 文字颜色层级
     * 暗色模式下，文字需要稍微降低亮度避免刺眼
     */
    colorText: mixColor(colorBgBase, colorTextBase, 0.85), // 主要文字
    colorTextSecondary: mixColor(colorBgBase, colorTextBase, 0.65), // 次要文字
    colorTextTertiary: mixColor(colorBgBase, colorTextBase, 0.45), // 占位符、禁用
    colorTextQuaternary: mixColor(colorBgBase, colorTextBase, 0.25), // 极弱文字

    /**
     * 填充颜色层级
     * 暗色模式下填充需要更高的对比度
     */
    colorFill: mixColor(colorBgBase, colorTextBase, 0.15), // 主要填充
    colorFillSecondary: mixColor(colorBgBase, colorTextBase, 0.1), // 次要填充
    colorFillTertiary: mixColor(colorBgBase, colorTextBase, 0.06), // 分割线背景
    colorFillQuaternary: mixColor(colorBgBase, colorTextBase, 0.03), // 微弱填充

    /**
     * 实色背景
     * 用于浅色按钮、徽章等
     */
    colorBgSolid: colorTextBase, // 实色背景（白色）
    colorBgSolidHover: mixColor(colorTextBase, colorBgBase, 0.1), // 实色悬停（稍暗）
    colorBgSolidActive: mixColor(colorTextBase, colorBgBase, 0.2), // 实色激活（更暗）

    /**
     * 背景层级
     * 暗色模式：Elevated(暗) → Container → Layout(亮)
     * 与亮色模式相反，浮层更暗，底层更亮
     */
    colorBgLayout: adjustLightness(colorBgBase, 2), // 页面底层背景（稍亮）
    colorBgContainer: adjustLightness(colorBgBase, 5), // 卡片、容器背景（更亮）
    colorBgElevated: adjustLightness(colorBgBase, 8), // 弹窗、下拉框（最亮）
    colorBgSpotlight: mixColor(colorBgBase, colorTextBase, 0.2), // 高亮聚焦
    colorBgBlur: mixColor(colorBgBase, colorTextBase, 0.04), // 模糊背景

    /**
     * 边框颜色
     * 暗色模式下边框需要更明显
     */
    colorBorder: mixColor(colorBgBase, colorTextBase, 0.2), // 主边框
    colorBorderDisabled: mixColor(colorBgBase, colorTextBase, 0.12), // 禁用边框
    colorBorderSecondary: mixColor(colorBgBase, colorTextBase, 0.1) // 次要边框、分割线
  };
};
