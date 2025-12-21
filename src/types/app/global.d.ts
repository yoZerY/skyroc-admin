declare namespace App.Global {
  /** The global dropdown key */
  type DropdownKey = 'closeAll' | 'closeCurrent' | 'closeLeft' | 'closeOther' | 'closeRight';

  type RoutePath = import('@/features/router/routeTree.gen').FileRoutesByTo;

  type AntdMenu = NonNullable<import('antd').MenuProps['items']>[number];

  /** The global tab */
  type Tab = {
    /** The tab fixed index */
    fixedIndex?: number | null;
    /** The tab route full path */
    fullPath: string;
    /** I18n key */
    i18nKey?: I18n.I18nKey | null;
    /**
     * Tab icon
     *
     * Iconify icon
     */
    icon?: string;
    /** The tab id */
    id: string;
    /** The tab label */
    label: string;
    /**
     * Tab local icon
     *
     * Local icon
     */
    localIcon?: string;
    /**
     * The new tab label
     *
     * If set, the tab label will be replaced by this value
     */
    newLabel?: string;
    /**
     * The old tab label
     *
     * when reset the tab label, the tab label will be replaced by this value
     */
    oldLabel?: string;
    /** The tab route path */
    routePath: RoutePath;
  };

  interface QuickReferenceMenu extends Api.Route.BackendRoute {
    /** 菜单深度层级，从 0 开始 */
    depth?: number;

    /** 菜单的 key */
    key: string;

    /** 父级菜单的 key 列表 */
    parentKeys?: string[];
  }

  /** The global admin layout menu */

  namespace AdminLayout {
    interface HeaderProps {
      /** Whether to show the logo */
      showLogo?: boolean;
      /** Whether to show the menu */
      showMenu?: boolean;
      /** Whether to show the menu toggler */
      showMenuToggler?: boolean;
    }

    interface Menu {
      /** The menu children */
      children?: Menu[];
      /** The menu extra */
      extra?: React.ReactNode;
      /** The menu i18n key */
      i18nKey?: I18n.I18nKey | null;
      /** The menu icon */
      icon?: React.ReactElement;
      /**
       * The menu key
       *
       * Equal to the route key
       */
      key: string;
      /** The menu label */
      label: React.ReactNode;
      /**
       * Menu order for sorting (using hyphen to avoid React DOM warning)
       *
       * @default 0
       */
      order?: number;
      /** The tooltip title */
      title?: string;
      /**
       * Menu type
       *
       * @default 'item'
       */
      type?: string;
    }
  }

  type Menus = Map<Router.RouteId, AdminLayout.Menu[]>;
}
