import type { AnyRoute } from '@tanstack/react-router';
import { useMatches, useNavigate } from '@tanstack/react-router';
import { atom, useAtom } from 'jotai';

import { globalStore } from '@/features/jotai/store';
import { menuGenerator } from '@/features/menus/menu-generator';
import { useUserRoutesQuery } from '@/service/api';

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

  const { data: allMenus } = useUserRoutesQuery();

  const menus = allMenus?.get('/(admin)') || [];

  // 精准匹配当前菜单项（考虑 path、params、query）
  const currentMenu = menuGenerator.findMenu(route.routeId as Router.RouteId, {
    path: route.fullPath as Router.RoutePath,
    params: route.params as Api.Route.BackendRoute['params'],
    query: route.search as Api.Route.BackendRoute['query']
  });

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
    const [routeId, id] = key.split(',');

    const newRoute = menuGenerator.quickReferenceMap.get(routeId as Router.RouteId);

    if (newRoute) {
      const newRouteItem = newRoute.find(item => item.id === id);
      if (newRouteItem) {
        navigate({
          to: newRouteItem.path as Router.RoutePath,
          params: newRouteItem.params as Api.Route.BackendRoute['params'],
          search: newRouteItem.query as AnyRoute['options']['search']
        });
      }
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
      routerPushByKey(key);
    }
  }

  /** 选择二级菜单 */
  function handleSelectSecondLevelMenu(key: string) {
    changeActiveSecondLevelMenuKey(key);

    // 如果没有子菜单，直接跳转
    const hasChildren = secondLevelMenus.find(item => item.key === key)?.children?.length;
    if (!hasChildren) {
      routerPushByKey(key);
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
