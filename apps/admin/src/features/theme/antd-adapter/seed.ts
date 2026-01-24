import type { SeedToken } from 'antd/lib/theme/interface';

export const defaultPresetColors: Partial<SeedToken> = {
  // 蓝色系
  blue: '#3B82F6', // ✓ 保持（Tailwind blue-500）
  geekblue: '#6366F1', // 改：用 Indigo 而非暗蓝，与 blue 区分更大
  cyan: '#06B6D4', // ✓ 保持

  // 紫/粉色系
  purple: '#8B5CF6', // ✓ 保持（Tailwind violet-500）
  magenta: '#D946EF', // ✓ 保持（Tailwind fuchsia-500）
  pink: '#EC4899', // 改：用 pink-500，比 pink-400 更正

  // 红/橙色系
  red: '#EF4444', // ✓ 保持
  orange: '#F97316', // ✓ 保持
  volcano: '#DC2626', // 改：用 red-600，与 orange 区分开（火山 = 深红而非深橙）

  // 黄/金色系
  yellow: '#EAB308', // ✓ 保持（比 Ant 的刺眼黄好太多）
  gold: '#D97706', // ✓ 保持

  // 绿色系
  green: '#10B981', // ✓ 保持（Emerald，高级）
  lime: '#84CC16', // ✓ 保持
  // Main Colors
  colorPrimary: '#6366F1',
  colorInfo: '#0EA5E9',
  colorSuccess: '#10B981',
  colorWarning: '#F59E0B',
  colorError: '#F43F5E'
};

export const seedToken: Partial<SeedToken> = {
  ...defaultPresetColors,

  fontSize: 14,

  borderRadius: 6
};
