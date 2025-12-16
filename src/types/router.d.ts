declare namespace Router {
  type QueryClient = import('@tanstack/react-query').QueryClient;

  type RouteId = keyof import('@/features/router/routeTree.gen').FileRoutesById;

  interface RouterContext {
    info?: Api.Auth.UserInfo;
    isLoggedIn: boolean;
    menus: Map<RouteId, App.Global.AdminLayout.Menu[]>;
    queryClient: QueryClient;
    token: string;
  }
}
