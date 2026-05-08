/* eslint-disable complexity */
import { globalStore } from '@skyroc/core-state';
import { useNavigate } from '@tanstack/react-router';
import { atom, useAtom } from 'jotai';

import { menuCategory } from '@/features/menus/menu-category';
import { normalizePath } from '@/features/menus/menu-generator';
import { useMenus } from '@/features/menus/use-menus';
import { useRoute } from '@/features/router/use-route';

interface MenusAtom {
  activeFirstLevelMenuKey: string;
  activeSecondLevelMenuKey: string;
  drawerVisible: boolean;
}

const initialState: MenusAtom = {
  activeFirstLevelMenuKey: '',
  activeSecondLevelMenuKey: '',
  drawerVisible: false
};

const menusAtom = atom(initialState, (get, set, update: Partial<MenusAtom>) => {
  set(menusAtom, { ...get(menusAtom), ...update } as MenusAtom);
});

export const useAdminMenus = () => {
  const [menuState, setMenuState] = useAtom(menusAtom, { store: globalStore });
  const { activeFirstLevelMenuKey, activeSecondLevelMenuKey, drawerVisible } = menuState;

  const route = useRoute();

  const navigate = useNavigate();

  const { menus: allMenus, quickReferenceMenus: allQuickReferenceMenus } = useMenus();
  const adminKey = menuCategory.admin.key;

  const menus = allMenus?.get(adminKey) || [];
  const quickReferenceMenus = allQuickReferenceMenus?.get(adminKey);

  const fullPath = normalizePath(route.originPath) as Router.RoutePath;
  const currentMenu = quickReferenceMenus?.get(fullPath);

  const { activeMenu, hide } = currentMenu?.menu || {};

  const routeName = (hide ? activeMenu : currentMenu?.key) || currentMenu?.key || '';
  const openKeys = activeMenu ? getMenuInfoByPath(activeMenu)?.parentKeys || [] : currentMenu?.parentKeys || [];

  const selectedKey = [routeName];

  const firstLevelMenus = menus.map(menu => {
    const { children: _, ...rest } = menu;

    return rest;
  });

  const secondLevelMenus = menus.find(item => item?.key === activeFirstLevelMenuKey)?.children || [];

  const isActiveFirstLevelMenuHasChildren = activeFirstLevelMenuKey ? Boolean(secondLevelMenus.length) : false;

  const isActiveSecondLevelMenuHasChildren = activeSecondLevelMenuKey ? Boolean(secondLevelMenus?.length) : false;

  const childLevelMenus = secondLevelMenus.find(menu => menu.key === activeSecondLevelMenuKey)?.children || [];

  function routerPushByKey(key: string) {
    const newRoute = quickReferenceMenus?.get(key as Router.RoutePath);

    if (newRoute) {
      navigate({
        to: newRoute.path
      });
    }
  }

  /** 可以手动指定菜单或者是默认当前路由的一级菜单 */
  function changeActiveFirstLevelMenuKey(key?: string) {
    const routeKey = key || currentMenu?.parentKeys?.[0] || currentMenu?.key || '';

    setMenuState({ activeFirstLevelMenuKey: routeKey });
  }

  /** 可以手动指定菜单或者是默认当前路由的二级菜单 */
  function changeActiveSecondLevelMenuKey(key?: string) {
    const routeKey = key || currentMenu?.parentKeys?.[1] || currentMenu?.key || '';

    setMenuState({ activeSecondLevelMenuKey: routeKey });
  }

  function setDrawerVisible(visible: boolean) {
    setMenuState({ drawerVisible: visible });
  }

  function getMenuInfoByPath(path: Router.RoutePath) {
    return quickReferenceMenus?.get(path);
  }

  return {
    menus,
    quickReferenceMenus,
    firstLevelMenus,
    secondLevelMenus,
    childLevelMenus,
    activeFirstLevelMenuKey,
    activeSecondLevelMenuKey,
    isActiveFirstLevelMenuHasChildren,
    isActiveSecondLevelMenuHasChildren,
    route,
    openKeys,
    currentMenu,
    activeMenu,
    selectedKey,
    drawerVisible,
    setDrawerVisible,
    routerPushByKey,
    changeActiveFirstLevelMenuKey,
    changeActiveSecondLevelMenuKey,
    getMenuInfoByPath
  };
};
