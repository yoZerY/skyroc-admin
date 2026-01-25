declare namespace App.Global {
  /**
   * - The global dropdown key
   *
   * - closeAll: close all tabs
   * - closeCurrent: close current tab
   * - closeLeft: close left tabs
   * - closeOther: close other tabs
   * - closeRight: close right tabs
   * - pin: pin tab
   * - unpin: unpin tab
   */
  type DropdownKey = 'closeAll' | 'closeCurrent' | 'closeLeft' | 'closeOther' | 'closeRight' | 'pin' | 'unpin';

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
     * The old tab label
     *
     * when reset the tab label, the tab label will be replaced by this value
     */
    oldLabel?: string;
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
