import type { RouteMatch } from '@tanstack/react-router';
import { useMatch } from '@tanstack/react-router';
import { atom, useAtom } from 'jotai';

import { useLang } from '@/features/lang/use-lang';
import { ROUTE_QUERY_KEYS } from '@/service/api';
import { queryClient } from '@/service/queryClient';

interface MenusAtom {
  activeFirstLevelMenuKey: string;
}

/**
 * Get active first level menu key
 *
 * @param route
 */
export function getActiveFirstLevelMenuKey(route: RouteMatch<any, any, any, any, any, any, any>) {
  const { activeMenu, hideInMenu } = route.staticData;

  const name = route.pathname;

  const routeName = (hideInMenu ? activeMenu : name) || name;

  const [_, firstLevelRouteName] = routeName.split('/');

  return `/${firstLevelRouteName}`;
}

const menusAtom = atom<MenusAtom>({
  activeFirstLevelMenuKey: ''
});

export const useAdminMenus = () => {
  const [menuState, setMenuState] = useAtom(menusAtom);

  const { activeFirstLevelMenuKey } = menuState;

  const route = useMatch({ strict: false });

  const allMenus = queryClient.getQueryData<Api.Route.Menus>(ROUTE_QUERY_KEYS.USER_ROUTES);

  const menus = allMenus?.get('/(admin)') || [];

  const { activeMenu, hideInMenu } = route.staticData;

  const name = route.pathname;

  const routeName = (hideInMenu ? activeMenu : name) || name;

  const selectedKey = [routeName];

  const firstLevelMenus = menus.map(menu => {
    const { children: _, ...rest } = menu;

    return rest;
  });

  const secondLevelMenus = menus.find(item => item.key === activeFirstLevelMenuKey)?.children || [];

  const isActiveFirstLevelMenuHasChildren = activeFirstLevelMenuKey ? Boolean(secondLevelMenus.length) : false;

  const childLevelMenus = secondLevelMenus.find(menu => menu.key === activeFirstLevelMenuKey)?.children || [];

  /** - 可以手动指定菜单或者是默认当前路由的一级菜单 */
  function changeActiveFirstLevelMenuKey(key?: string) {
    const routeKey = key || getActiveFirstLevelMenuKey(route);

    setMenuState(prev => ({
      ...prev,
      activeFirstLevelMenuKey: routeKey
    }));
  }

  return {
    menus,
    selectedKey,
    route,
    firstLevelMenus,
    childLevelMenus,
    activeFirstLevelMenuKey,
    isActiveFirstLevelMenuHasChildren,
    secondLevelMenus,
    changeActiveFirstLevelMenuKey
  };
};
