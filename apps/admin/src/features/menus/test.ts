import { routeTree } from '@/features/router/routeTree.gen';
import { globalConfig } from '@/config';

  /**
   * 菜单生成器
   */
   export class MenuGenerator {
    constructor(
      private mode: 'static' | 'dynamic',
    ) {}

    /**
     * 生成菜单
     */
    generate(): Map<string, Menu[]> {
      const menuMap = new Map<string, Menu[]>();

      // 遍历配置的 layout
      globalConfig.genMenuLayouts.forEach(layoutId => {
        const menus = this.generateLayoutMenus(layoutId);
        menuMap.set(layoutId, menus);
      });

      return menuMap;
    }

    /**
     * 生成指定 layout 的菜单
     */
    private generateLayoutMenus(layoutId: string): Menu[] {
      // 1. 找到对应的 layout 路由
      const layoutRoute = this.findLayoutRoute(layoutId);

      if (!layoutRoute) {
        console.warn(`Layout "${layoutId}" not found in route tree`);
        return [];
      }

      // 2. 获取 layout 的权限配置
      const layoutAuth = layoutRoute.options.staticData?.auth;

      // 3. 根据模式生成菜单
      if (this.mode === 'static') {
        return this.generateStaticMenus(layoutRoute, layoutAuth);
      } else {
        return this.generateDynamicMenus(layoutRoute, layoutAuth);
      }
    }

    /**
     * 生成静态菜单（从路由树）
     */
    private generateStaticMenus(
      layoutRoute: AnyRoute,
      layoutAuth: { required: boolean }
    ): Menu[] {
      const children = layoutRoute.children;

      if (!children) {
        return [];
      }

      return Object.values(children)
        .map(route => this.transformRouteToMenu(route, layoutAuth))
        .filter(Boolean) as Menu[];
    }

    /**
     * 生成动态菜单（从后端）
     */
    private generateDynamicMenus(
      layoutRoute: AnyRoute,
      layoutAuth: { required: boolean }
    ): Menu[] {
      if (!this.backendMenus) {
        return [];
      }

      // 将后端平铺的菜单转换为菜单树
      return this.backendMenus.map(backendMenu => {
        // 从路由树中找到对应的路由，获取完整的 staticData
        const route = this.findRouteByPath(backendMenu.path);
        const routeStaticData = route?.options.staticData;

        return {
          key: backendMenu.key,
          path: backendMenu.path,
          label: backendMenu.name,
          icon: backendMenu.icon ? (
            <SvgIcon icon={backendMenu.icon} />
          ) : routeStaticData?.icon ? (
            <SvgIcon icon={routeStaticData.icon} />
          ) : undefined,
          // 权限信息从路由的 staticData 中获取
          auth: this.resolveAuth(routeStaticData?.auth, layoutAuth)
        };
      });
    }

    /**
     * 转换路由到菜单
     */
    private transformRouteToMenu(
      route: AnyRoute,
      layoutAuth: { required: boolean }
    ): Menu | null {
      const { staticData } = route.options;

      if (!staticData) {
        return null;
      }

      const { i18nKey, icon, auth } = staticData;

      // 解析最终的权限配置（路由 > layout）
      const finalAuth = this.resolveAuth(auth, layoutAuth);

      const menu: Menu = {
        key: route.id,
        path: route.fullPath,
        label: i18nKey ? $t(i18nKey) : route.id,
        icon: icon ? <SvgIcon icon={icon} /> : undefined,
        auth: finalAuth
      };

      // 递归处理子路由
      if (route.children) {
        const childMenus = Object.values(route.children)
          .map(child => this.transformRouteToMenu(child, layoutAuth))
          .filter(Boolean) as Menu[];

        if (childMenus.length > 0) {
          menu.children = childMenus;
        }
      }

      return menu;
    }

    /**
     * 解析权限配置（路由优先，否则继承 layout）
     */
    private resolveAuth(
      routeAuth?: { required?: boolean; key?: string },
      layoutAuth?: { required: boolean }
    ) {
      return {
        required: routeAuth?.required ?? layoutAuth?.required ?? false,
        key: routeAuth?.key
      };
    }

    /**
     * 从路由树中找到指定 layoutId 的路由
     */
    private findLayoutRoute(layoutId: string): AnyRoute | null {
      // 遍历路由树查找
      const search = (route: AnyRoute): AnyRoute | null => {
        const staticData = route.options.staticData;
        if (staticData?.layoutId === layoutId) {
          return route;
        }

        if (route.children) {
          for (const child of Object.values(route.children)) {
            const found = search(child as AnyRoute);
            if (found) return found;
          }
        }

        return null;
      };

      return search(routeTree);
    }

    /**
     * 根据路径查找路由
     */
    private findRouteByPath(path: string): AnyRoute | null {
      const search = (route: AnyRoute): AnyRoute | null => {
        if (route.fullPath === path) {
          return route;
        }

        if (route.children) {
          for (const child of Object.values(route.children)) {
            const found = search(child as AnyRoute);
            if (found) return found;
          }
        }

        return null;
      };

      return search(routeTree);
    }
  }
