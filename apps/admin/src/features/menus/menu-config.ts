/**
 * 菜单配置文件
 *
 * 此文件专门用于管理额外菜单配置，包括：
 * 1. menuNodeCallback - 在菜单节点添加额外菜单
 * 2. 各种菜单配置逻辑
 *
 * 优势：
 * - 将菜单逻辑从 config.ts 分离，保持配置文件简洁
 * - 便于维护和扩展菜单配置
 * - 支持模块化组织菜单
 */

import type { MenuNodeCallback } from './menu-generator';

/**
 * 主菜单节点回调函数
 *
 * 用于在特定路由节点动态添加额外菜单
 */
export const menuNodeCallback: MenuNodeCallback = routeId => {
  // 在顶层（admin layout）添加分割线
  if (routeId === '/(admin)') {
    return [
      {
        id: 'divider-1',
        menu: {
          type: 'divider',
          order: 9
        }
      },
      {
        id: 'divider-2',
        menu: {
          type: 'divider',
          order: 6
        }
      }
    ];
  }

  return undefined;
};

/**
 * 导出默认配置
 * 根据项目需要选择使用哪种方案
 */
export default menuNodeCallback;
