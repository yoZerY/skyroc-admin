import type { AnyRoute } from '@tanstack/react-router';

import { globalConfig } from '@/config';
import { routeTree } from '@/features/router/routeTree.gen';
import { $t } from '@/locales';

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

function transformRouteToMenu(
  route: AnyRoute,
  layoutAuth: AnyRoute['options']['staticData']['auth'],
  options: { depth?: number; parentPath?: string[] } = {}
): App.Global.AdminLayout.Menu | null {
  const { depth = 1, parentPath = [] } = options;
  const { staticData } = route.options;

  if (!staticData) {
    return null;
  }

  const { i18nKey, icon = globalConfig.defaultIcon, localIcon, order = 0, title } = staticData;

  // 解析最终的权限配置（路由 > layout）
  const label = i18nKey ? $t(i18nKey) : title;

  const menu: App.Global.AdminLayout.Menu = {
    icon: (
      <SvgIcon
        icon={icon}
        localIcon={localIcon}
        style={{ fontSize: '20px' }}
      />
    ),
    key: route.id,
    label: <BeyondHiding title={label} />,
    order: order ?? undefined,
    depth,
    parentkeys: parentPath.join('-'),
    path: route.fullPath,
    title: label
  };

  // 递归处理子路由
  // Recursively process children routes
  if (route.children && Object.keys(route.children).length > 0) {
    const childMenus: App.Global.AdminLayout.Menu[] = [];

    Object.values(route.children).forEach((childRoute: any) => {
      const childMenu = transformRouteToMenu(childRoute, layoutAuth, {
        depth: depth + 1,
        parentPath: [...parentPath, route.id]
      });
      if (childMenu) {
        childMenus.push(childMenu);
      }
    });

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

function generateStaticMenus(
  layoutRoute: AnyRoute,
  layoutAuth: AnyRoute['options']['staticData']['auth']
): App.Global.AdminLayout.Menu[] {
  const children = layoutRoute.children as AnyRoute[];

  if (!children) {
    return [];
  }

  const menus = children
    .map(route => transformRouteToMenu(route, layoutAuth))
    .filter(Boolean) as App.Global.AdminLayout.Menu[];

  // Sort top-level menus by order
  // 对顶层菜单按 order 排序
  return menus.sort((a, b) => {
    const orderA = a.order ?? 0;
    const orderB = b.order ?? 0;
    return orderA - orderB;
  });
}

/**
 * 菜单生成器
 */
export class MenuGenerator {
  private mode = globalConfig.routeMode;

  isGenerated = false;

  menuMap = new Map<Router.RouteId, App.Global.AdminLayout.Menu[]>();

  /**
   * 生成菜单
   */
  generate(): Map<Router.RouteId, App.Global.AdminLayout.Menu[]> {
    if (!this.isGenerated) {
      this.isGenerated = true;
    }

    // 遍历配置的 layout
    const layoutRoutes = findLayoutRoute(globalConfig.genMenuLayouts);

    layoutRoutes.forEach(layoutRoute => {
      const menus = this.generateLayoutMenus(layoutRoute);
      this.menuMap.set(layoutRoute.id, menus);
    });

    return this.menuMap;
  }

  /**
   * 生成指定 layout 的菜单
   */
  private generateLayoutMenus(layoutRoute: AnyRoute): App.Global.AdminLayout.Menu[] {
    // 2. 获取 layout 的权限配置
    const layoutAuth = layoutRoute.options.staticData?.auth;

    // 3. 根据模式生成菜单
    if (this.mode === 'static') {
      return generateStaticMenus(layoutRoute, layoutAuth);
    }

    return [];
  }
}

export const menuGenerator = new MenuGenerator();
