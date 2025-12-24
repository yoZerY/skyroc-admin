/* eslint-disable complexity */
import { useMatches, useNavigate } from '@tanstack/react-router';
import { atom, useAtom } from 'jotai';

import { globalStore } from '@/features/jotai/store';
import { menuCategory } from '@/features/menus/menu-category';
import { useMenus } from '@/features/menus/use-menus';

interface MenusAtom {
  activeFirstLevelMenuKey: string;
  activeSecondLevelMenuKey: string;
  drawerVisible: boolean;
  selectedKey: string[];
}

const initialState: MenusAtom = {
  activeFirstLevelMenuKey: '',
  activeSecondLevelMenuKey: '',
  selectedKey: [],
  drawerVisible: false
};

const menusAtom = atom(initialState, (get, set, update: Partial<MenusAtom>) => {
  set(menusAtom, { ...get(menusAtom), ...update } as MenusAtom);
});

export const useAdminMenus = () => {
  const [menuState, setMenuState] = useAtom(menusAtom, { store: globalStore });

  const { activeFirstLevelMenuKey, activeSecondLevelMenuKey, drawerVisible } = menuState;

  const routes = useMatches();

  const navigate = useNavigate();

  const route = routes[routes.length - 1];

  const { menus: allMenus, quickReferenceMenus: allQuickReferenceMenus } = useMenus();

  const menus = allMenus?.get(menuCategory.admin.key) || [];

  const quickReferenceMenus = allQuickReferenceMenus?.get(menuCategory.admin.key);

  const currentMenu = quickReferenceMenus?.get(route.fullPath as Router.RoutePath);

  const { activeMenu, hide } = currentMenu?.menu || {};

  const openKeys = currentMenu?.parentKeys || [];

  const routeName = (hide ? activeMenu : currentMenu?.key) || currentMenu?.key || '';

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

  /** 选择一级菜单 */
  function handleSelectFirstLevelMenu(key: string) {
    changeActiveFirstLevelMenuKey(key);

    // 如果没有子菜单，直接跳转
    const hasChildren = menus.find(item => item.key === key)?.children?.length;
    if (!hasChildren) {
      routerPushByKey(key as Router.RoutePath);
    }
  }

  /** 选择二级菜单 */
  function handleSelectSecondLevelMenu(key: string) {
    changeActiveSecondLevelMenuKey(key);

    // 如果没有子菜单，直接跳转
    const hasChildren = secondLevelMenus.find(item => item.key === key)?.children?.length;
    if (!hasChildren) {
      routerPushByKey(key as Router.RoutePath);
    }
  }

  function setDrawerVisible(visible: boolean) {
    setMenuState({ drawerVisible: visible });
  }

  return {
    menus,
    firstLevelMenus,
    secondLevelMenus,
    childLevelMenus,
    activeFirstLevelMenuKey,
    activeSecondLevelMenuKey,
    isActiveFirstLevelMenuHasChildren,
    isActiveSecondLevelMenuHasChildren,
    route,
    openKeys,
    selectedKey,
    drawerVisible,
    setDrawerVisible,
    routerPushByKey,
    changeActiveFirstLevelMenuKey,
    changeActiveSecondLevelMenuKey,
    handleSelectFirstLevelMenu,
    handleSelectSecondLevelMenu
  };
};
