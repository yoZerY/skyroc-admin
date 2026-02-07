import { FullScreen } from '@skyroc/ui-antd';
import { DarkModeContainer } from '@skyroc/ui-compose';

import { GLOBAL_HEADER_MENU_ID } from '@/constants/app';
import NotificationButton from '@/features/chat/NotificationButton';
import LangSwitch from '@/features/lang/LangSwitch';
import ThemeSchemaSwitch from '@/features/theme/components/ThemeSchemaSwitch';
import { useSettingsTheme } from '@/features/theme/useSettingsTheme';

import MenuToggler from '../../state/menus/MenuToggler';
import { useAdminMenus } from '../../state/menus/use-admin-menus';
import { useAdminState } from '../../state/use-admin-state';
import AdminLogo from '../AdminLogo';
import AdminSearch from '../admin-search/AdminSearch';

import AdminBreadcrumb from './components/Breadcrumb';
import ThemeButton from './components/ThemeButton';
import UserAvatar from './components/UserAvatar';

const GlobalHeader = memo(() => {
  const [isFullscreen, { toggleFullscreen }] = useFullscreen(document.body);

  const { isActiveFirstLevelMenuHasChildren } = useAdminMenus();

  const { layout, sider } = useSettingsTheme();

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

  return (
    <DarkModeContainer className="h-full flex-y-center px-12px shadow-header">
      {showLogo && (
        <AdminLogo
          className="h-full"
          style={{ width: `${siderWidth}px` }}
        />
      )}

      {showMenuToggler && <MenuToggler />}

      <div
        className="h-full flex-y-center flex-1-hidden"
        id={GLOBAL_HEADER_MENU_ID}
      >
        {!isMobile && !showMenu && <AdminBreadcrumb />}
      </div>

      <div className="h-full flex-y-center justify-end">
        <AdminSearch />

        {!isMobile && (
          <FullScreen
            className="px-12px"
            full={isFullscreen}
            toggleFullscreen={toggleFullscreen}
          />
        )}

        <LangSwitch className="px-12px" />

        <NotificationButton className="px-12px" />

        <ThemeSchemaSwitch className="px-12px" />

        <ThemeButton />

        <UserAvatar />
      </div>
    </DarkModeContainer>
  );
});

export default GlobalHeader;
