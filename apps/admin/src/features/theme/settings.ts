/** Default theme settings */
export const themeSettings: Theme.ThemeSetting = {
  themeScheme: 'light',
  grayscale: false,
  colourWeakness: false,
  recommendColor: false,
  themeColor: '#6366F1', // Indigo：比 #1677FF 更温和、耐看
  themeRadius: 6,
  otherColor: {
    info: '#0EA5E9', // Sky：更“清新”
    success: '#10B981', // Emerald：不荧光、很干净
    warning: '#F59E0B', // Amber：比纯黄耐看很多
    error: '#F43F5E' // Rose：比纯红更优雅
  },
  isInfoFollowPrimary: true,
  themeTextSize: 14,
  layout: {
    mode: 'vertical',
    scrollMode: 'content'
  },
  page: {
    animate: true,
    animateMode: 'fade-slide'
  },
  header: {
    height: 56,
    breadcrumb: {
      visible: true,
      showIcon: true
    },
    multilingual: {
      visible: true
    },
    globalSearch: {
      visible: true
    }
  },
  tab: {
    visible: true,
    cache: true,
    height: 44,
    mode: 'chrome',
    closeTabByMiddleClick: false
  },
  fixedHeaderAndTab: true,
  sider: {
    inverted: false,
    width: 220,
    collapsedWidth: 64,
    mixWidth: 90,
    mixCollapsedWidth: 64,
    mixChildMenuWidth: 200,
    autoSelectFirstMenu: false
  },
  footer: {
    visible: true,
    fixed: false,
    height: 48,
    right: true
  },
  watermark: {
    visible: false,
    text: 'SkyrocAdmin',
    enableCustomText: true,
    enableUserName: false,
    enableTime: false,
    timeFormat: 'YYYY-MM-DD HH:mm',
    settings: {
      font: {
        fontSize: 16
      },
      height: 64,
      offset: [12, 60],
      rotate: -15,
      width: 344,
      zIndex: 9999
    }
  },
  tokens: {
    light: {
      colors: {
        container: 'rgb(255, 255, 255)',
        layout: 'rgb(247, 250, 252)',
        inverted: 'rgb(0, 20, 40)',
        'base-text': 'rgb(31, 31, 31)'
      },
      boxShadow: {
        header: '0 1px 2px rgb(0, 21, 41, 0.08)',
        sider: '2px 0 8px 0 rgb(29, 35, 41, 0.05)',
        tab: '0 1px 2px rgb(0, 21, 41, 0.08)'
      }
    },
    dark: {
      colors: {
        container: 'rgb(28, 28, 28)',
        layout: 'rgb(18, 18, 18)',
        'base-text': 'rgb(224, 224, 224)'
      }
    }
  }
};

/**
 * Override theme settings
 *
 * If publish new version, use `overrideThemeSettings` to override certain theme settings
 */
export const overrideThemeSettings: Partial<Theme.ThemeSetting> = {};
