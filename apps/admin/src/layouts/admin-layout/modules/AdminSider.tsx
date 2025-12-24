import DarkModeContainer from '@/components/DarkModeContainer.tsx';
import { GLOBAL_SIDER_MENU_ID } from '@/constants/app';
import { useSettingsTheme } from '@/features/theme/useSettingsTheme';

import { useAdminState } from '../state/use-admin-state';

import AdminLogo from './AdminLogo';

const GlobalSider = memo(() => {
  const { darkMode, header, layout, sider } = useSettingsTheme();

  const { siderCollapse } = useAdminState();

  const isTopHybridSidebarFirst = layout.mode === 'top-hybrid-sidebar-first';
  const isTopHybridHeaderFirst = layout.mode === 'top-hybrid-header-first';

  const darkMenu = !darkMode && !isTopHybridSidebarFirst && !isTopHybridHeaderFirst && sider.inverted;

  const showLogo = layout.mode === 'vertical';

  const headerHeight = header.height;

  const menuWrapperClass = showLogo ? 'flex-1-hidden' : 'h-full';

  return (
    <DarkModeContainer
      className="size-full flex-col-stretch shadow-sider"
      inverted={darkMenu}
    >
      {showLogo && (
        <AdminLogo
          showTitle={!siderCollapse}
          style={{ height: `${headerHeight}px` }}
        />
      )}
      <div
        className={menuWrapperClass}
        id={GLOBAL_SIDER_MENU_ID}
      />
    </DarkModeContainer>
  );
});

export default GlobalSider;
