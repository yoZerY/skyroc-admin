import type { AnyRoute } from '@tanstack/react-router';
import { createElement } from 'react';

import { globalConfig } from '@/config';
import { routeTree } from '@/features/router/routeTree.gen';

import { extras } from './extras';
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
  routeId: Router.RouteId,
  routePath: string
) => Partial<Api.Route.BackendRoute>[] | undefined;

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
  private mode = globalConfig.routeMode;

  isGenerated = false;

  menuMap = new Map<Router.RouteId, App.Global.AdminLayout.Menu[]>();

  quickReferenceMap = new Map<Router.RouteId, App.Global.QuickReferenceMenu[]>();

  /**
   * 重置菜单生成器，清空所有缓存
   */
  reset(): void {
    this.isGenerated = false;
    this.menuMap.clear();
    this.quickReferenceMap.clear();
  }

  /**
   * 生成菜单
   * @param force - 是否强制重新生成，即使已经生成过
   */
  generate(force = false): Map<Router.RouteId, App.Global.AdminLayout.Menu[]> {
    // 如果不是强制重新生成，且已经有菜单数据，直接返回
    if (!force && this.menuMap.size) {
      return this.menuMap;
    }

    // 如果是强制重新生成，先清空缓存
    if (force) {
      this.reset();
    }

    // 遍历配置的 layout
    const layoutRoutes = findLayoutRoute(globalConfig.genMenuLayouts);

    layoutRoutes.forEach(layoutRoute => {
      const menus = this.generateLayoutMenus(layoutRoute);
      this.menuMap.set(layoutRoute.id, menus);
    });

    this.isGenerated = true;

    return this.menuMap;
  }

  /**
   * 精准匹配菜单项
   * 根据 routeId、path、params、query 从 quickReferenceMap 中找到对应的菜单项
   *
   * @param routeId - 路由 ID
   * @param options - 匹配选项
   * @returns 匹配的菜单项，如果没找到则返回 undefined
   */
  findMenu(
    routeId: Router.RouteId,
    options?: {
      params?: { key: string; value: string }[] | null;
      path?: Router.RoutePath;
      query?: { key: string; value: string }[] | null;
    }
  ): App.Global.QuickReferenceMenu | undefined {
    const menus = this.quickReferenceMap.get(routeId);

    if (!menus || menus.length === 0) {
      return undefined;
    }

    // 如果只有一个菜单项，直接返回
    if (menus.length === 1) {
      return menus[0];
    }

    // 如果没有提供匹配选项，返回第一个
    if (!options) {
      return menus[0];
    }

    const { params, path, query } = options;

    // 精准匹配
    return menus.find(menu => {
      // 匹配 path
      if (path && menu.path !== path) {
        return false;
      }

      // 匹配 params
      if (params !== undefined && menu.params !== params) {
        return false;
      }

      // 匹配 query
      if (query !== undefined) {
        // 如果都为 null/undefined，匹配
        if (!query && !menu.query) {
          return true;
        }

        // 如果一个有值一个没有，不匹配
        if (!query || !menu.query) {
          return false;
        }

        // 比较 query 数组
        if (query.length !== menu.query.length) {
          return false;
        }

        // 检查每个 query 参数是否匹配
        return query.every(q => menu.query?.some(mq => mq.key === q.key && mq.value === q.value));
      }

      return true;
    });
  }

  /**
   * 生成指定 layout 的菜单
   */
  private generateLayoutMenus(layoutRoute: AnyRoute): App.Global.AdminLayout.Menu[] {
    // 2. 获取 layout 的权限配置
    const layoutAuth = Boolean(layoutRoute.options.staticData?.route?.requiresAuth);

    // 3. 根据模式生成菜单
    let menus: App.Global.AdminLayout.Menu[] = [];

    if (this.mode === 'static') {
      menus = this.generateStaticMenus(layoutRoute, layoutAuth);
    }

    return menus;
  }

  private generateStaticMenus(layoutRoute: AnyRoute, layoutAuth: boolean): App.Global.AdminLayout.Menu[] {
    const children = layoutRoute.children as AnyRoute[];

    if (!children) {
      return [];
    }

    let menuList: App.Global.AdminLayout.Menu[] = [];

    if (children.length) {
      menuList = children
        .map(route => this.transformRouteToMenu(route, layoutAuth))
        .filter(Boolean) as App.Global.AdminLayout.Menu[];
    }

    const extraMenus = menuNodeCallback(layoutRoute.id, layoutRoute.fullPath);

    if (extraMenus && extraMenus.length > 0) {
      const extraMenusNode = extraMenus.map(menuConfig => this.createExtraMenu(menuConfig, [], 0));

      menuList.push(...extraMenusNode);
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
    layoutAuth: boolean,
    parentKeys: string[] = [],
    depth: number = 0
  ): App.Global.AdminLayout.Menu | null {
    const { staticData } = route.options;

    if (!staticData) {
      return null;
    }

    const { i18nKey, menu: menuInfo, route: routeInfo, tab, title } = staticData;

    const {
      extra,
      hide = false,
      i18nKey: menuI18nKey,
      icon = globalConfig.defaultIcon,
      localIcon,
      order = 0,
      title: menuTitle,
      type = 'item'
    } = menuInfo ?? {};

    const data = {
      id: route.id,
      iframeUrl: routeInfo?.iframeUrl,
      params: routeInfo?.params,
      query: routeInfo?.query,
      routeId: route.id,
      status: routeInfo?.status,
      path: route.fullPath,
      key: `${route.id},${route.id}`,
      parentKeys,
      depth,
      menu: menuInfo,
      tab,
      title
    };

    // 填充 menuPathMap: routeId -> path 的映射
    // 一个路由可能对应多个菜单入口（不同 path）
    const existingPath = this.quickReferenceMap.get(route.id);

    if (!existingPath) {
      // 第一次遇到这个 routeId，直接存储 path
      this.quickReferenceMap.set(route.id, [data]);
    } else {
      this.quickReferenceMap.set(route.id, [...existingPath, data]);
    }

    // 如果设置了 hideInMenu，直接返回 null，跳过该菜单及其所有子级
    if (hide) {
      return null;
    }

    const label = (
      <I18nLabel
        fallback={menuTitle ?? title}
        i18nKey={menuI18nKey ?? i18nKey}
      />
    );

    const menu: App.Global.AdminLayout.Menu = {
      icon: (
        <SvgIcon
          icon={icon}
          localIcon={localIcon}
          style={{ fontSize: '20px' }}
        />
      ),
      type,

      key: `${route.id},${route.id}`,
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
      const childMenus: App.Global.AdminLayout.Menu[] = [];

      Object.values(route.children).forEach((childRoute: any) => {
        const childMenu = this.transformRouteToMenu(
          childRoute,
          layoutAuth,
          [...parentKeys, `${route.id},${route.id}`],
          depth + 1
        );
        if (childMenu) {
          childMenus.push(childMenu);
        }
      });

      // 调用节点回调，获取当前节点的额外菜单

      const extraMenus = menuNodeCallback(route.id as Router.RouteId, route.fullPath);
      if (extraMenus && extraMenus.length > 0) {
        const extraMenusNode = extraMenus.map(menuConfig =>
          this.createExtraMenu(menuConfig, [...parentKeys, route.id], depth + 1)
        );

        childMenus.push(...extraMenusNode);
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
    parentKeys: string[] = [],
    depth: number = 0
  ): App.Global.AdminLayout.Menu {
    const { menu: menuInfo } = config;

    const {
      i18nKey: menuI18nKey,
      icon = globalConfig.defaultIcon,
      localIcon,
      order = 0,
      title: menuTitle,
      type = 'item'
    } = menuInfo ?? {};

    // 记录到 quickReferenceMap
    if (config.routeId && config.id) {
      const data: App.Global.QuickReferenceMenu = {
        ...(config as Api.Route.BackendRoute),
        key: `${config.routeId}-${config.id ?? ''}`,
        parentKeys,
        depth
      };

      const existingData = this.quickReferenceMap.get(config.routeId as Router.RouteId);
      if (!existingData) {
        this.quickReferenceMap.set(config.routeId as Router.RouteId, [data]);
      } else {
        this.quickReferenceMap.set(config.routeId as Router.RouteId, [...existingData, data]);
      }
    }

    if (type === 'divider') {
      return {
        type: 'divider',
        order: order ?? undefined
      } as App.Global.AdminLayout.Menu;
    }

    const menuLabel = (
      <I18nLabel
        fallback={menuTitle}
        i18nKey={menuI18nKey}
      />
    );

    const menu: App.Global.AdminLayout.Menu = {
      key: `${config.routeId},${config.id ?? ''}`,
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
      menu.children = config.children.map(child =>
        this.createExtraMenu(child, [...parentKeys, `${config.routeId},${config.id ?? ''}`], depth + 1)
      );
    }

    return menu;
  }
}

export const menuGenerator = new MenuGenerator();
