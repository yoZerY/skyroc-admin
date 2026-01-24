import type { ColorNeutralMapToken } from 'antd/lib/theme/interface';

// Re-export antd types for convenience
export type { ColorMapToken, ColorNeutralMapToken, MapToken, SeedToken } from 'antd/lib/theme/interface';

/**
 * 调色板映射 (1-10 和 50-950 索引)
 * antd 使用 1-10 索引，Tailwind 使用 50-950 索引
 */
export interface ColorMap {
  [key: number]: string;
}

/** 颜色调色板生成函数类型 */
export type GenerateColorMap = (baseColor: string) => ColorMap;

/** 中性色生成函数类型 */
export type GenerateNeutralColorMap = (bgBaseColor: string, textBaseColor: string) => ColorNeutralMapToken;

/** 调色板生成器配置 */
export interface PaletteGenerators {
  generateNeutralColorPalettes: GenerateNeutralColorMap;
}
