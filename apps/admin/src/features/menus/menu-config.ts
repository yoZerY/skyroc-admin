import type { MenuNodeCallback, MenuNodeConfig } from '@skyroc/web-admin-layouts';

import { menuCategories } from './menu-category';

const adminTopLevelMenuNodes = [
  {
    id: 'admin-feature-divider',
    menu: {
      order: 6,
      type: 'divider'
    }
  },
  {
    id: 'admin-about-divider',
    menu: {
      order: 20,
      type: 'divider'
    }
  }
] satisfies MenuNodeConfig[];

export const menuNodeCallback: MenuNodeCallback = routeId => {
  if (routeId !== menuCategories.admin.layout) return [];

  return adminTopLevelMenuNodes;
};
