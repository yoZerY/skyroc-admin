declare namespace Router {
  type QueryClient = import('@tanstack/react-query').QueryClient;

  interface RouterContext {
    info?: Api.Auth.UserInfo;
    isLoggedIn: boolean;
    menus: Map<string, App.Global.AdminLayout.Menu[]>;
    queryClient: QueryClient;
    token: string;
  }
}
