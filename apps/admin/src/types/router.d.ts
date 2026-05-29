declare namespace Router {
  type QueryClient = import('@tanstack/react-query').QueryClient;

  type RouteId = keyof import('@/features/router/routeTree.gen').FileRoutesById;

  type RoutePath = keyof import('@/features/router/routeTree.gen').FileRoutesByTo;

  interface MenuExtraRegistry extends Record<import('@/features/menus/extras').ExtraKey, true> {}

  interface MenuCategoryRegistry extends Record<import('@/features/menus/menu-category').MenuCategoryKey, true> {}

  interface RouterContext {
    getHomeRoute: () => RoutePath;
    homeRoute: RoutePath;
  }
}
