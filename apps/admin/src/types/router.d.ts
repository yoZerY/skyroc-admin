declare namespace Router {
  type QueryClient = import('@tanstack/react-query').QueryClient;

  type RouteId = keyof import('@/features/router/routeTree.gen').FileRoutesById;

  type RoutePath = keyof import('@/features/router/routeTree.gen').FileRoutesByTo;

  type Extra = import('@/features/menus/extras').ExtraKey;

  interface Meta {
    /**
     * I18n key of the route
     *
     * It's used in i18n, if it is set, the title will be ignored
     */
    i18nKey?: I18n.I18nKey | null;

    /**
     * Whether to cache the route
     */
    keepAlive?: boolean | null;

    /**
     * Menu configuration of the route
     *
     * It controls how the route is displayed in the menu
     */
    menu?: {
      /**
       * The menu key will be activated when entering the route
       *
       * It is usually used for detail pages or hidden routes
       *    * Active strategy configuration
       *
       * It defines which menu should be activated when entering the route
       */
      activeMenu?: string | null;

      /**
       * Extra menu
       *
       * It can be used to add extra menu to the route
       */
      extra?: Extra | null;
      /**
       * Whether to hide the route in the menu
       *
       * If true, the route will not be rendered in the menu tree
       */
      hide?: boolean | null;

      /**
       * Iconify icon
       *
       * It can be used in the menu or breadcrumb
       */
      icon?: string;

      /**
       * Local icon
       *
       * In "src/assets/svg-icon", if it is set, the icon will be ignored
       */
      localIcon?: string;

      /**
       * Meta data of the menu
       *
       * It can be used to add meta data to the menu
       */
      meta?: { key: string; value: string }[] | null;

      /**
       * The menu order
       *
       * Smaller value means higher priority
       */
      order?: number | null;

      /**
       * Menu type
       *
       * @default 'item'
       */
      type?: 'divider' | 'group';
    };

    /**
     * Required permissions to access the route
     */
    permissions?: string[];

    /**
     * Whether the route is required
     *
     * It can be used in permission or feature checks
     */
    requiresAuth?: boolean;

    /**
     * Tabs behavior configuration
     *
     * It controls how the route behaves in the tabs system
     */
    tab?: {
      /**
       * If set, the route will be fixed in tabs,
       * and the value is the order of fixed tabs
       */
      fixedIndex?: number | null;

      /**
       * Whether to allow multiple tabs for the same route
       *
       * By default, the same route path will use one tab,
       * even with different query parameters
       */
      multi?: boolean | null;
    };

    /**
     * Title of the route
     *
     * It can be used in document title
     */
    title?: string;
  }

  interface RouterContext {
    initAuth: () => Promise<Api.Auth.UserInfo | null>;
    isAuthInitialized: boolean;
    isLoggedIn: boolean;
    queryClient: QueryClient;
    userInfo?: Api.Auth.UserInfo;
  }
}
