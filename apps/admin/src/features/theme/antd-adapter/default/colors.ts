import { adjustLightness, generateOklchPaletteEx, mixColor } from '@skyroc/color';

import type { ColorMap, GenerateColorMap, GenerateNeutralColorMap } from '../types';

/** 亮色模式默认基础色 */
export const LIGHT_BG_BASE = '#FFFFFF';
export const LIGHT_TEXT_BASE = '#1F1F1F';

/**
 * 生成颜色调色板（亮色模式）
 *
 * 使用 generateOklchPaletteEx 算法替代 antd 的 @ant-design/colors
 * 调色板输出 11 个颜色（50-950），映射到 antd 的 1-10 索引
 */
export const generateColorPalettes: GenerateColorMap = (baseColor: string): ColorMap => {
  const { palettes } = generateOklchPaletteEx(baseColor);
  const [p50, p100, p200, p300, p400, p500, p600, p700, p800, p900, p950] = palettes;

  return {
    1: p50.hex, // 50 - 最浅背景
    2: p100.hex, // 100 - 背景悬停
    3: p200.hex, // 200 - 边框
    4: p300.hex, // 300 - 边框悬停
    5: p400.hex, // 400 - 悬停色
    6: p500.hex, // 500 - 主色 ★
    7: p600.hex, // 600 - 激活色
    8: p700.hex, // 700 - 文字悬停
    9: p800.hex, // 800 - 文字色
    10: p900.hex, // 900 - 文字激活
    50: p50.hex,
    100: p100.hex,
    200: p200.hex,
    300: p300.hex,
    400: p400.hex,
    500: p500.hex,
    600: p600.hex,
    700: p700.hex,
    800: p800.hex,
    900: p900.hex,
    950: p950.hex
  };
};

/**
 * 生成中性色调色板（亮色模式）
 *
 * 使用实色混合算法替代透明度方案
 * 优点：
 * - 颜色稳定可预测，不受背景影响
 * - 对比度可精确控制
 * - 与主题调色板算法一致
 *
 * 基础色：
 * - colorBgBase: #FAFAFA (柔和白)
 * - colorTextBase: #1F1F1F (深灰)
 */
export const generateNeutralColorPalettes: GenerateNeutralColorMap = (bgBaseColor: string, textBaseColor: string) => {
  const colorBgBase = bgBaseColor || LIGHT_BG_BASE;
  const colorTextBase = textBaseColor || LIGHT_TEXT_BASE;

  return {
    colorBgBase,
    colorTextBase,

    /**
     * 文字颜色层级
     * 使用 bgBase 和 textBase 混合生成实色
     * 比例越高，颜色越接近 textBase（越深）
     */
    colorText: mixColor(colorBgBase, colorTextBase, 0.88), // 主要文字
    colorTextSecondary: mixColor(colorBgBase, colorTextBase, 0.65), // 次要文字
    colorTextTertiary: mixColor(colorBgBase, colorTextBase, 0.45), // 占位符、禁用
    colorTextQuaternary: mixColor(colorBgBase, colorTextBase, 0.25), // 极弱文字

    /**
     * 填充颜色层级
     * 用于按钮悬停、选中背景等
     */
    colorFill: mixColor(colorBgBase, colorTextBase, 0.12), // 主要填充
    colorFillSecondary: mixColor(colorBgBase, colorTextBase, 0.06), // 次要填充
    colorFillTertiary: mixColor(colorBgBase, colorTextBase, 0.04), // 分割线背景
    colorFillQuaternary: mixColor(colorBgBase, colorTextBase, 0.02), // 微弱填充

    /**
     * 实色背景
     * 用于深色按钮、徽章等
     */
    colorBgSolid: colorTextBase, // 实色背景
    colorBgSolidHover: mixColor(colorTextBase, colorBgBase, 0.15), // 实色悬停（稍亮）
    colorBgSolidActive: mixColor(colorTextBase, '#000000', 0.1), // 实色激活（稍暗）

    /**
     * 背景层级
     * Layout(暗) → Container → Elevated(亮)
     */
    colorBgLayout: adjustLightness(colorBgBase, -3), // 页面底层背景（稍暗）
    colorBgContainer: colorBgBase, // 卡片、容器背景
    colorBgElevated: adjustLightness(colorBgBase, 2), // 弹窗、下拉框（稍亮）
    colorBgSpotlight: mixColor(colorBgBase, colorTextBase, 0.85), // 高亮聚焦
    colorBgBlur: 'transparent', // 模糊背景

    /**
     * 边框颜色
     */
    colorBorder: mixColor(colorBgBase, colorTextBase, 0.15), // 主边框
    colorBorderDisabled: mixColor(colorBgBase, colorTextBase, 0.1), // 禁用边框
    colorBorderSecondary: mixColor(colorBgBase, colorTextBase, 0.06) // 次要边框、分割线
  };
};
