declare namespace I18n {
  type Theme = {
    appearance: {
      colourWeakness: string;
      grayscale: string;
      isOnlyExpandCurrentParentMenu: string;
      preset: {
        apply: string;
        applySuccess: string;
        title: string;
        [key: string]:
          | {
              desc: string;
              name: string;
            }
          | string;
      };
      recommendColor: string;
      recommendColorDesc: string;
      themeBase: {
        radius: string;
        textSize: string;
        title: string;
      };
      themeColor: {
        followPrimary: string;
        title: string;
      } & Record<Theme.ThemeColorKey, string>;
      themeSchema: { title: string } & Record<UnionKey.ThemeScheme, string>;
    };
    configOperation: {
      copyConfig: string;
      copyFailedMsg: string;
      copySuccessMsg: string;
      resetConfig: string;
      resetSuccessMsg: string;
    };
    general: {
      globalSearch: {
        title: string;
        visible: string;
      };
      multilingual: {
        title: string;
        visible: string;
      };
      title: string;
      watermark: {
        enableCustomText: string;
        enableTime: string;
        enableUserName: string;
        text: string;
        timeFormat: string;
        title: string;
        visible: string;
      };
    };
    layout: {
      content: {
        fixedHeaderAndTab: string;
        page: {
          animate: string;
          mode: { title: string } & Record<UnionKey.ThemePageAnimateMode, string>;
        };
        scrollMode: { tip: string; title: string } & Record<UnionKey.ThemeScrollMode, string>;
        title: string;
      };
      footer: {
        fixed: string;
        height: string;
        right: string;
        title: string;
        visible: string;
      };
      header: {
        breadcrumb: {
          showIcon: string;
          visible: string;
        };
        height: string;
        title: string;
      };
      layoutMode: { title: string } & Record<UnionKey.ThemeLayoutMode, string> & {
          [K in `${UnionKey.ThemeLayoutMode}_detail`]: string;
        };
      sider: {
        autoSelectFirstMenu: string;
        autoSelectFirstMenuTip: string;
        collapsedWidth: string;
        inverted: string;
        mixChildMenuWidth: string;
        mixCollapsedWidth: string;
        mixWidth: string;
        title: string;
        width: string;
      };
      tab: {
        cache: string;
        cacheTip: string;
        closeByMiddleClick: string;
        closeByMiddleClickTip: string;
        height: string;
        mode: { title: string } & Record<UnionKey.ThemeTabMode, string>;
        title: string;
        visible: string;
      };
    };
    tabs: {
      appearance: string;
      general: string;
      layout: string;
      preset: string;
    };
    themeDrawerTitle: string;
  };
}
