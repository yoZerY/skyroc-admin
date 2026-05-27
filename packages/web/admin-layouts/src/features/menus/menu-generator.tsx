import type { AnyRoute } from '@tanstack/react-router';

import { getAdminLayoutsOptions, getConfiguredCategoryKeys, getMenuCategoryKey } from '../../setup';
import { hasRoutePermission } from './permissions';

export interface GeneratedMenu {
  badge?: Router.MenuBadge | null;
  children?: GeneratedMenu[];
  extra?: Router.Extra | null;
  i18nKey?: I18n.I18nKey | null;
  icon?: string;
  key: string;
  localIcon?: string;
  order?: number;
  path?: Router.RoutePath;
  title?: string;
  type?: string;
}

export type GeneratedMenus = Map<string, GeneratedMenu[]>;

export interface GenerateMenuOptions {
  backendRoutes?: Api.Route.BackendRoute[];
  home?: Router.RoutePath;
  userInfo?: Api.Auth.UserInfo | null;
}

export interface GenerateMenuResult {
  allMenus: GeneratedMenus;
  home: Router.RoutePath;
  quickReferenceMenus: Menu.QuickReferenceMenus;
}

interface ExtraMenuOptions {
  config: Partial<Api.Route.BackendRoute>;
  depth?: number;
  parentKeys?: string[];
  quickReferenceMenuMap: Menu.QuickReferenceMenuMap;
}

interface StaticChildMenusOptions {
  depth: number;
  normalizedPath: Router.RoutePath;
  parentKeys: string[];
  quickReferenceMenuMap: Menu.QuickReferenceMenuMap;
  route: AnyRoute;
  userInfo?: Api.Auth.UserInfo | null;
}

export function normalizePath(path: string): string {
  return path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path;
}

function findLayoutRoute(layoutIds: Router.RouteId[]): AnyRoute[] {
  const menuRoutes: AnyRoute[] = [];
  const { routeTree } = getAdminLayoutsOptions();
  const firstLevelRoutes = routeTree.children as AnyRoute[] | undefined;

  firstLevelRoutes?.forEach(firstLevelRoute => {
    if (layoutIds.includes(firstLevelRoute.id)) {
      menuRoutes.push(firstLevelRoute);
    }
  });

  return menuRoutes;
}

function sortMenus(menus: GeneratedMenu[]) {
  return menus.toSorted((a, b) => {
    const orderA = a.order ?? 0;
    const orderB = b.order ?? 0;
    return orderA - orderB;
  });
}

function isGeneratedMenu(menu: GeneratedMenu | null): menu is GeneratedMenu {
  return Boolean(menu);
}

function createEmptyCategoryMaps() {
  const allMenus = new Map<string, GeneratedMenu[]>();
  const quickReferenceMenus = new Map<string, Menu.QuickReferenceMenuMap>();

  getConfiguredCategoryKeys().forEach(categoryKey => {
    allMenus.set(categoryKey, []);
    quickReferenceMenus.set(categoryKey, new Map());
  });

  return {
    allMenus,
    quickReferenceMenus
  };
}

/** 菜单生成器 */
class MenuGenerator {
  generate(options: GenerateMenuOptions = {}): GenerateMenuResult {
    const { routeMode } = getAdminLayoutsOptions();

    if (routeMode === 'dynamic') {
      return this.generateDynamicMenus(options);
    }

    return this.generateStaticMenus(options);
  }

  private generateStaticMenus(options: GenerateMenuOptions): GenerateMenuResult {
    const { defaultHome, menuCategories } = getAdminLayoutsOptions();
    const { allMenus, quickReferenceMenus } = createEmptyCategoryMaps();
    const menuCategoryLayouts = getConfiguredCategoryKeys().map(layout => menuCategories[layout].layout);
    const layoutRoutes = findLayoutRoute(menuCategoryLayouts);

    layoutRoutes.forEach(layoutRoute => {
      const menuCategoryKey = getMenuCategoryKey(layoutRoute.id);

      if (!menuCategoryKey) return;

      const quickReferenceMenuMap = quickReferenceMenus.get(menuCategoryKey) ?? new Map();
      const menus = this.generateStaticLayoutMenus(layoutRoute, quickReferenceMenuMap, options.userInfo);

      quickReferenceMenus.set(menuCategoryKey, quickReferenceMenuMap);
      allMenus.set(menuCategoryKey, menus);
    });

    return {
      allMenus,
      home: defaultHome,
      quickReferenceMenus
    };
  }

  private generateDynamicMenus(options: GenerateMenuOptions): GenerateMenuResult {
    const { defaultHome } = getAdminLayoutsOptions();
    const { allMenus, quickReferenceMenus } = createEmptyCategoryMaps();
    const defaultCategoryKey = getConfiguredCategoryKeys()[0];

    options.backendRoutes?.forEach(route => {
      const categoryKey = route.layout ?? defaultCategoryKey;

      if (!categoryKey) return;

      const quickReferenceMenuMap = quickReferenceMenus.get(categoryKey) ?? new Map();
      const menu = this.transformBackendRouteToMenu(route, quickReferenceMenuMap);

      if (menu) {
        allMenus.set(categoryKey, [...(allMenus.get(categoryKey) ?? []), menu]);
      }

      quickReferenceMenus.set(categoryKey, quickReferenceMenuMap);
    });

    allMenus.forEach((menus, categoryKey) => {
      allMenus.set(categoryKey, sortMenus(menus));
    });

    return {
      allMenus,
      home: options.home ?? defaultHome,
      quickReferenceMenus
    };
  }

  private generateStaticLayoutMenus(
    layoutRoute: AnyRoute,
    quickReferenceMenuMap: Menu.QuickReferenceMenuMap,
    userInfo?: Api.Auth.UserInfo | null
  ) {
    const { menuNodeCallback } = getAdminLayoutsOptions();
    const children = layoutRoute.children as AnyRoute[] | undefined;
    const menuList = children
      ? children
          .map(route => this.transformStaticRouteToMenu(route, quickReferenceMenuMap, userInfo))
          .filter(isGeneratedMenu)
      : [];

    const extraMenus = menuNodeCallback?.(layoutRoute.id as Router.RouteId);

    if (extraMenus?.length) {
      menuList.push(
        ...extraMenus
          .map(menuConfig => this.createExtraMenu({ config: menuConfig, quickReferenceMenuMap }))
          .filter(isGeneratedMenu)
      );
    }

    return sortMenus(menuList as GeneratedMenu[]);
  }

  // eslint-disable-next-line complexity, max-params
  private transformStaticRouteToMenu(
    route: AnyRoute,
    quickReferenceMenuMap: Menu.QuickReferenceMenuMap,
    userInfo?: Api.Auth.UserInfo | null,
    parentKeys: string[] = [],
    depth: number = 0
  ): GeneratedMenu | null {
    const { staticData } = route.options;

    if (!staticData || !hasRoutePermission(staticData, userInfo)) {
      return null;
    }

    const normalizedPath = normalizePath(route.fullPath) as Router.RoutePath;
    const data: Menu.QuickReferenceMenu = {
      id: route.id,
      i18nKey: staticData.i18nKey,
      key: normalizedPath,
      menu: staticData.menu,
      parentKeys,
      path: normalizedPath,
      tab: staticData.tab,
      title: staticData.title,
      depth
    };

    quickReferenceMenuMap.set(normalizedPath, data);

    if (staticData.menu?.hide) {
      return null;
    }

    const { defaultIcon } = getAdminLayoutsOptions();
    const { badge, extra, icon = defaultIcon, localIcon, order = 0, type = 'item' } = staticData.menu ?? {};
    const menuType = type ?? 'item';
    const menu: GeneratedMenu = {
      badge,
      extra,
      i18nKey: staticData.i18nKey,
      icon,
      key: normalizedPath,
      localIcon,
      order: order ?? undefined,
      path: normalizedPath,
      title: staticData.title,
      type: menuType
    };

    const childMenus = this.generateStaticChildMenus({
      depth,
      normalizedPath,
      parentKeys,
      quickReferenceMenuMap,
      route,
      userInfo
    });

    if (childMenus.length) {
      menu.children = childMenus;
    }

    return menu;
  }

  private generateStaticChildMenus(options: StaticChildMenusOptions) {
    const { menuNodeCallback } = getAdminLayoutsOptions();
    const { depth, normalizedPath, parentKeys, quickReferenceMenuMap, route, userInfo } = options;
    const childMenus: GeneratedMenu[] = [];

    if (route.children && Object.keys(route.children).length > 0) {
      Object.values(route.children).forEach(childRoute => {
        const childMenu = this.transformStaticRouteToMenu(
          childRoute as AnyRoute,
          quickReferenceMenuMap,
          userInfo,
          [...parentKeys, normalizedPath],
          depth + 1
        );

        if (childMenu) {
          childMenus.push(childMenu);
        }
      });
    }

    const extraMenus = menuNodeCallback?.(route.id as Router.RouteId);

    if (extraMenus?.length) {
      childMenus.push(
        ...extraMenus
          .map(menuConfig =>
            this.createExtraMenu({
              config: menuConfig,
              depth: depth + 1,
              parentKeys: [...parentKeys, normalizedPath],
              quickReferenceMenuMap
            })
          )
          .filter(isGeneratedMenu)
      );
    }

    return sortMenus(childMenus);
  }

  // eslint-disable-next-line complexity, max-params
  private transformBackendRouteToMenu(
    route: Api.Route.BackendRoute,
    quickReferenceMenuMap: Menu.QuickReferenceMenuMap,
    parentKeys: string[] = [],
    depth: number = 0
  ): GeneratedMenu | null {
    const { defaultIcon, menuNodeCallback } = getAdminLayoutsOptions();
    const path = normalizePath(route.path) as Router.RoutePath;
    const data: Menu.QuickReferenceMenu = {
      ...route,
      key: path,
      parentKeys,
      path,
      depth
    };

    quickReferenceMenuMap.set(path, data);

    if (route.menu?.hide) {
      return null;
    }

    const { badge, extra, icon = defaultIcon, localIcon, order = 0, type = 'item' } = route.menu ?? {};
    const menuType = type ?? 'item';
    const menu: GeneratedMenu = {
      badge,
      extra,
      i18nKey: route.i18nKey,
      icon,
      key: path,
      localIcon,
      order: order ?? undefined,
      path,
      title: route.title,
      type: menuType
    };

    const children = route.children
      ?.map(child => this.transformBackendRouteToMenu(child, quickReferenceMenuMap, [...parentKeys, path], depth + 1))
      .filter(isGeneratedMenu);
    const childMenus = children ?? [];

    const extraMenus = menuNodeCallback?.(route.id as Router.RouteId);

    if (extraMenus?.length) {
      childMenus.push(
        ...extraMenus
          .map(menuConfig =>
            this.createExtraMenu({
              config: menuConfig,
              depth: depth + 1,
              parentKeys: [...parentKeys, path],
              quickReferenceMenuMap
            })
          )
          .filter(isGeneratedMenu)
      );
    }

    if (childMenus.length) {
      menu.children = sortMenus(childMenus);
    }

    return menu;
  }

  private createExtraMenu(options: ExtraMenuOptions): GeneratedMenu | null {
    const { defaultIcon } = getAdminLayoutsOptions();
    const { config, depth = 0, parentKeys = [], quickReferenceMenuMap } = options;
    const { badge, icon = defaultIcon, localIcon, order = 0, type = 'item' } = config.menu ?? {};
    const menuType = type ?? 'item';

    if (menuType === 'divider') {
      return {
        key: config.id ?? `divider-${parentKeys.join('-')}-${order ?? 0}`,
        order: order ?? undefined,
        type: 'divider'
      };
    }

    if (!config.path) return null;

    const path = normalizePath(config.path) as Router.RoutePath;
    const data: Menu.QuickReferenceMenu = {
      ...(config as Api.Route.BackendRoute),
      key: path,
      parentKeys,
      path,
      depth
    };

    quickReferenceMenuMap.set(path, data);

    const menu: GeneratedMenu = {
      badge,
      extra: config.menu?.extra,
      i18nKey: config.i18nKey,
      icon,
      key: path,
      localIcon,
      order: order ?? undefined,
      path,
      title: config.title,
      type: menuType
    };

    const children = config.children
      ?.map(child =>
        this.createExtraMenu({
          config: child,
          depth: depth + 1,
          parentKeys: [...parentKeys, path],
          quickReferenceMenuMap
        })
      )
      .filter(isGeneratedMenu);

    if (children?.length) {
      menu.children = sortMenus(children);
    }

    return menu;
  }
}

export const menuGenerator = new MenuGenerator();
