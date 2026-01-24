/**
 * 颜色算法工具函数
 *
 * 注意：大部分颜色操作已经移到 @sa/color 包中
 * - mixColor: 混合两个颜色
 * - adjustLightness: 调整亮度
 * - lightenColor / darkenColor: 变亮/变暗
 *
 * 这里只保留 antd-adapter 特有的函数
 */

// Re-export from @sa/color for convenience
export { adjustLightness, darkenColor, lightenColor, mixColor } from '@sa/color';
