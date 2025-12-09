declare namespace I18n {
  type Theme = {
    colourWeakness: string;
    configOperation: {
      copyConfig: string;
      copyFailedMsg: string;
      copySuccessMsg: string;
      resetConfig: string;
      resetSuccessMsg: string;
    };
    fixedHeaderAndTab: string;
    footer: {
      fixed: string;
      height: string;
      right: string;
      visible: string;
    };
    grayscale: string;
    header: {
      breadcrumb: {
        showIcon: string;
        visible: string;
      };
      height: string;
    };
    isOnlyExpandCurrentParentMenu: string;
    layoutMode: { reverseHorizontalMix: string; title: string } & Record<UnionKey.ThemeLayoutMode, string>;
    page: {
      animate: string;
      mode: { title: string } & Record<UnionKey.ThemePageAnimateMode, string>;
    };
    pageFunTitle: string;
    recommendColor: string;
    recommendColorDesc: string;
    scrollMode: { title: string } & Record<UnionKey.ThemeScrollMode, string>;
    sider: {
      collapsedWidth: string;
      inverted: string;
      mixChildMenuWidth: string;
      mixCollapsedWidth: string;
      mixWidth: string;
      width: string;
    };
    tab: {
      cache: string;
      height: string;
      mode: { title: string } & Record<UnionKey.ThemeTabMode, string>;
      visible: string;
    };
    themeColor: {
      followPrimary: string;
      title: string;
    } & Theme.ThemeColor;
    themeDrawerTitle: string;
    themeSchema: { title: string };
    watermark: {
      text: string;
      visible: string;
    };
  };
}
