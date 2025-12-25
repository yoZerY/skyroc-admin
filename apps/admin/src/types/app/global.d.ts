declare namespace App.Global {
  /** The global dropdown key */
  type DropdownKey = 'closeAll' | 'closeCurrent' | 'closeLeft' | 'closeOther' | 'closeRight';

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
    label: React.ReactNode;
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
    newLabel?: React.ReactNode;
    /**
     * The old tab label
     *
     * when reset the tab label, the tab label will be replaced by this value
     */
    oldLabel?: React.ReactNode;
    /** The tab route path */
    routePath: Router.RoutePath;
  };

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
  }
}
