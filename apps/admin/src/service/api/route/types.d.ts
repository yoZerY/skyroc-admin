/**
 * 命名空间 Api.Route
 *
 * 后端 API 模块：路由模块
 */
declare namespace Api {
  type EnableStatus = import('@/enums').EnableStatus;

  type MenuCategoryKey = import('@/features/menus/menu-category').MenuCategoryKey;

  namespace Route {
    /** 后端返回的完整路由结构 */
    interface BackendRouteResponse {
      /** 用户首页路由键 */
      home: Router.RoutePath;
      /** 用户可访问的路由列表 */
      routes: BackendRoute[];
    }

    interface BackendRoute extends Omit<Router.Meta, 'permissions'> {
      children?: BackendRoute[];

      id: string;

      layout?: MenuCategoryKey;

      parentId?: string | null;

      path: Router.RoutePath;
    }
  }
}
