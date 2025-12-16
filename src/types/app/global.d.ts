declare namespace App.Global {
  /** The global dropdown key */
  type DropdownKey = 'closeAll' | 'closeCurrent' | 'closeLeft' | 'closeOther' | 'closeRight';

  type RoutePath = import('@/features/router/routeTree.gen').FileRoutesByTo;

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

  /** The global admin layout menu */

  namespace AdminLayout {
    interface Menu {
      /** The menu children */
      children?: Menu[];
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
      /** The tab route path */
      path: RoutePath;
      /** The tooltip title */
      title?: string;
    }
  }
}
