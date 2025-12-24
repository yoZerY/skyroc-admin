import type { AnyRoute } from '@tanstack/react-router';
import { createElement } from 'react';

import { globalConfig } from '@/config';
import { routeTree } from '@/features/router/routeTree.gen';

import { extras } from './extras';
import type { MenuCategoryKey } from './menu-category';
import { getMenuCategoryKey, menuCategory } from './menu-category';
import menuNodeCallback from './menu-config';
/**
 * 菜单节点回调函数类型
 * 用于在特定路由节点添加额外菜单
 *
 * @param routeId - 当前路由 ID
 * @param routePath - 当前路由路径
 * @returns 额外菜单数组，如果不需要添加则返回 undefined
 */
export type MenuNodeCallback = (
  routeId: Router.RouteId
) => Partial<Omit<Api.Route.BackendRoute, 'layout' | 'parentId'>>[] | undefined;

function findLayoutRoute(layoutIds: Router.RouteId[]): AnyRoute[] {
  const menuRoutes: AnyRoute[] = [];

  // 遍历路由树查找
  const search = (route: AnyRoute) => {
    const firstLevelRoutes = route.children as AnyRoute[];

    firstLevelRoutes?.forEach(firstLevelRoute => {
      if (layoutIds.includes(firstLevelRoute.id)) {
        menuRoutes.push(firstLevelRoute);
      }
    });
  };

  search(routeTree);

  return menuRoutes;
}

/**
 * 菜单生成器
 */
class MenuGenerator {
  /**
   * 生成菜单
   * @param force - 是否强制重新生成，即使已经生成过
   */
  generate() {
    const menuCategories = globalConfig.genMenuLayouts.map(layout => menuCategory[layout].layout);

    // 遍历配置的 layout
    const layoutRoutes = findLayoutRoute(menuCategories);

    const quickReferenceMenus = new Map<MenuCategoryKey, Menu.QuickReferenceMenuMap>();

    const allMenus = new Map<MenuCategoryKey, Menu.CommonMenu[]>();

    layoutRoutes.forEach(layoutRoute => {
      const menuCategoryKey = getMenuCategoryKey(layoutRoute.id);

      if (menuCategoryKey) {
        const quickReferenceMenuMap = new Map<Router.RoutePath, Menu.QuickReferenceMenu>();

        const menus = this.generateLayoutMenus(layoutRoute, quickReferenceMenuMap);

        quickReferenceMenus.set(menuCategoryKey, quickReferenceMenuMap);

        allMenus.set(menuCategoryKey, menus);
      }
    });

    return {
      allMenus,
      quickReferenceMenus
    };
  }

  /**
   * 生成指定 layout 的菜单
   */
  private generateLayoutMenus(layoutRoute: AnyRoute, quickReferenceMenuMap: Menu.QuickReferenceMenuMap) {
    // 3. 根据模式生成菜单
    let menus: Menu.CommonMenu[] = [];

    if (globalConfig.routeMode === 'static') {
      menus = this.generateStaticMenus(layoutRoute, quickReferenceMenuMap);
    }

    return menus;
  }

  private generateStaticMenus(
    layoutRoute: AnyRoute,
    quickReferenceMenuMap: Menu.QuickReferenceMenuMap
  ): Menu.CommonMenu[] {
    const children = layoutRoute.children as AnyRoute[];

    if (!children) {
      return [];
    }

    let menuList: Menu.CommonMenu[] = [];

    if (children.length) {
      menuList = children
        .map(route => this.transformRouteToMenu(route, quickReferenceMenuMap))
        .filter(Boolean) as Menu.CommonMenu[];
    }

    const extraMenus = menuNodeCallback(layoutRoute.id);

    if (extraMenus && extraMenus.length > 0) {
      const extraMenusNode = extraMenus.map(menuConfig =>
        this.createExtraMenu(menuConfig, quickReferenceMenuMap, [], 0)
      );

      menuList.push(...(extraMenusNode.filter(Boolean) as Menu.CommonMenu[]));
    }

    // Sort top-level menus by order
    // 对顶层菜单按 order 排序
    return menuList.sort((a, b) => {
      const orderA = a.order ?? 0;
      const orderB = b.order ?? 0;
      return orderA - orderB;
    });
  }

  // eslint-disable-next-line complexity, max-params
  private transformRouteToMenu(
    route: AnyRoute,
    quickReferenceMenuMap: Menu.QuickReferenceMenuMap,
    parentKeys: string[] = [],
    depth: number = 0
  ): Menu.CommonMenu | null {
    const { staticData } = route.options;

    if (!staticData) {
      return null;
    }

    const { i18nKey, menu: menuInfo, tab, title } = staticData;

    const {
      extra,
      hide = false,
      icon = globalConfig.defaultIcon,
      localIcon,
      order = 0,
      type = 'item'
    } = menuInfo ?? {};

    const data = {
      id: route.id,
      routeId: route.id,
      path: route.fullPath,
      key: route.fullPath,
      i18nKey,
      parentKeys,
      depth,
      menu: menuInfo,
      tab,
      title
    };

    quickReferenceMenuMap.set(route.fullPath, data);

    // 如果设置了 hideInMenu，直接返回 null，跳过该菜单及其所有子级
    if (hide) {
      return null;
    }

    const label = (
      <I18nLabel
        fallback={title}
        i18nKey={i18nKey}
      />
    );

    const menu: Menu.CommonMenu = {
      icon: (
        <SvgIcon
          icon={icon}
          localIcon={localIcon}
          style={{ fontSize: '20px' }}
        />
      ),
      type,

      key: route.fullPath,
      // 保存 i18nKey 和 title，在渲染时动态翻译
      label: <BeyondHiding title={label} />,
      order: order ?? undefined,
      title: label as unknown as string
    };

    if (extra) {
      menu.extra = createElement(extras[extra], staticData);
    }

    // 递归处理子路由
    // Recursively process children routes
    if (route.children && Object.keys(route.children).length > 0) {
      const childMenus: Menu.CommonMenu[] = [];

      Object.values(route.children).forEach((childRoute: any) => {
        const childMenu = this.transformRouteToMenu(
          childRoute,
          quickReferenceMenuMap,
          [...parentKeys, route.fullPath],
          depth + 1
        );
        if (childMenu) {
          childMenus.push(childMenu);
        }
      });

      // 调用节点回调，获取当前节点的额外菜单

      const extraMenus = menuNodeCallback(route.id as Router.RouteId);
      if (extraMenus && extraMenus.length > 0) {
        const extraMenusNode = extraMenus.map(menuConfig =>
          this.createExtraMenu(menuConfig, quickReferenceMenuMap, [...parentKeys, route.id], depth + 1)
        );

        childMenus.push(...(extraMenusNode.filter(Boolean) as Menu.CommonMenu[]));
      }

      // Sort children by order at current level
      // 在当前层级按 order 排序
      if (childMenus.length > 0) {
        menu.children = childMenus.sort((a, b) => {
          const orderA = a.order ?? 0;
          const orderB = b.order ?? 0;
          return orderA - orderB;
        });
      }
    }
    return menu;
  }

  /**
   * 将额外菜单配置转换为菜单对象，并记录到 quickReferenceMap
   * @param config - 额外菜单配置
   * @param parentKeys - 父级菜单的 key 列表
   * @param depth - 菜单深度层级
   * @returns 菜单对象
   */
  // eslint-disable-next-line complexity, max-params
  private createExtraMenu(
    config: Partial<Api.Route.BackendRoute>,
    quickReferenceMenuMap: Menu.QuickReferenceMenuMap,
    parentKeys: string[] = [],
    depth: number = 0
  ): Menu.CommonMenu | null {
    const { menu: menuInfo } = config;

    const { icon = globalConfig.defaultIcon, localIcon, order = 0, type = 'item' } = menuInfo ?? {};

    if (type === 'divider') {
      return {
        type: 'divider',
        order: order ?? undefined
      } as Menu.CommonMenu;
    }

    if (!config.path) return null;

    // 记录到 quickReferenceMap

    const data: Menu.QuickReferenceMenu = {
      ...(config as Api.Route.BackendRoute),
      key: config.path,
      parentKeys,
      depth
    };
    quickReferenceMenuMap.set(config.path, data);

    const menuLabel = (
      <I18nLabel
        fallback={config.title}
        i18nKey={config.i18nKey}
      />
    );

    const menu: Menu.CommonMenu = {
      key: config.path,
      label: <BeyondHiding title={menuLabel} />,
      icon: (
        <SvgIcon
          icon={icon}
          localIcon={localIcon}
          style={{ fontSize: '20px' }}
        />
      ),
      order: order ?? undefined,
      title: menuLabel as unknown as string,
      type
    };

    // 递归处理子菜单
    if (config.children && config.children.length > 0) {
      menu.children = config.children
        .map(child => this.createExtraMenu(child, quickReferenceMenuMap, [...parentKeys, config.path ?? ''], depth + 1))
        .filter(Boolean) as Menu.CommonMenu[];
    }

    return menu;
  }
}

export const menuGenerator = new MenuGenerator();
