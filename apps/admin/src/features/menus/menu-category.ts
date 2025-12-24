export const menuCategory = {
  admin: {
    key: 'admin',
    layout: '/(admin)'
  }
} as const;

// 通过key找到layout
export const getMenuCategoryLayout = (key: MenuCategoryKey) => {
  return menuCategory[key].layout;
};

// 通过layout找到key
export const getMenuCategoryKey = (layout: Router.RouteId) => {
  return Object.values(menuCategory).find(category => category.layout === layout)?.key;
};

type MenuCategory = typeof menuCategory;

export type MenuCategoryKey = keyof MenuCategory;
