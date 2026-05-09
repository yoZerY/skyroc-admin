import { LangSwitch } from '@skyroc/i18n';
import { ThemeSchemaSwitch, useSettingsTheme } from '@skyroc/web-admin-theme';
import { FullScreen } from '@skyroc/web-ui-antd';
import { DarkModeContainer } from '@skyroc/web-ui-compose';
import { useFullscreen } from 'ahooks';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { GLOBAL_HEADER_MENU_ID } from '../../constant';
import { useAdminLayoutContext } from '../../context';
import MenuToggler from '../../state/menus/MenuToggler';
import { useAdminMenus } from '../../state/menus/use-admin-menus';
import { useAdminState } from '../../state/use-admin-state';
import AdminSearch from '../admin-search/AdminSearch';
import AdminLogo from '../AdminLogo';
import { renderLogoComponent } from '../shared/logo';

import AdminBreadcrumb from './components/Breadcrumb';
import ThemeButton from './components/ThemeButton';

const GlobalHeader = memo(() => {
  const { headerLeftActions, headerMiddleActions, headerRightActions, logo, logoComponent, logoTitle, logoTo } =
    useAdminLayoutContext();

  const [isFullscreen, { toggleFullscreen }] = useFullscreen(document.body);

  const { isActiveFirstLevelMenuHasChildren } = useAdminMenus();

  const { t } = useTranslation();

  const { header, layout, sider } = useSettingsTheme();

  const { isMobile } = useAdminState();

  const siderWidth = sider.width;

  const mode = layout.mode;

  const HEADER_PROPS_CONFIG: Record<UnionKey.ThemeLayoutMode, App.Global.AdminLayout.HeaderProps> = {
    vertical: {
      showLogo: false,
      showMenu: false,
      showMenuToggler: true
    },
    'vertical-mix': {
      showLogo: false,
      showMenu: false,
      showMenuToggler: false
    },
    'vertical-hybrid-header-first': {
      showLogo: !isActiveFirstLevelMenuHasChildren,
      showMenu: true,
      showMenuToggler: false
    },
    horizontal: {
      showLogo: true,
      showMenu: true,
      showMenuToggler: false
    },
    'top-hybrid-sidebar-first': {
      showLogo: true,
      showMenu: true,
      showMenuToggler: false
    },
    'top-hybrid-header-first': {
      showLogo: true,
      showMenu: true,
      showMenuToggler: isActiveFirstLevelMenuHasChildren
    }
  };

  const { showLogo, showMenu, showMenuToggler } = HEADER_PROPS_CONFIG[mode];

  const hasLogo = Boolean(logo || logoComponent || logoTitle);

  function renderLogo() {
    if (logoComponent) {
      return renderLogoComponent(logoComponent, siderWidth);
    }

    return <AdminLogo logo={logo} title={logoTitle} to={logoTo} style={{ width: `${siderWidth}px` }} />;
  }

  return (
    <DarkModeContainer className="h-full flex-y-center px-12px shadow-header">
      {showLogo && hasLogo ? renderLogo() : null}

      {showMenuToggler && <MenuToggler />}

      <div className="h-full flex-y-center flex-1-hidden" id={GLOBAL_HEADER_MENU_ID}>
        {!isMobile && !showMenu && <AdminBreadcrumb />}
      </div>

      <div className="h-full flex-y-center justify-end">
        <AdminSearch />

        {headerLeftActions}

        {!isMobile && (
          <FullScreen
            className="px-12px"
            enterTooltip={t('icon.fullscreen')}
            exitTooltip={t('icon.fullscreenExit')}
            full={isFullscreen}
            toggleFullscreen={toggleFullscreen}
          />
        )}

        <LangSwitch className="px-12px" visible={header.multilingual.visible} />

        {headerMiddleActions}

        <ThemeSchemaSwitch className="px-12px" tooltipContent={t('icon.themeSchema')} />

        <ThemeButton />

        {headerRightActions}
      </div>
    </DarkModeContainer>
  );
});

export default GlobalHeader;
