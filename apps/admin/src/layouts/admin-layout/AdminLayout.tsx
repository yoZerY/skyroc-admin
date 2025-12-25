import type { LayoutMode } from '@sa/materials';
import { AdminLayout as AdminLayoutComponent, LAYOUT_SCROLL_EL_ID } from '@sa/materials';
import { useSettingsTheme } from '@/features/theme/useSettingsTheme';
import { LAYOUT_MODE_HORIZONTAL, LAYOUT_MODE_VERTICAL } from './constant';
import GlobalContent from './modules/AdminContent';
import GlobalFooter from './modules/AdminFooter';
import GlobalSider from './modules/AdminSider';
import AdminHeader from './modules/admin-header/AdminHeader';
import AdminMenu from './modules/admin-menu/AdminMenu';
import AdminTab from './modules/admin-tab/AdminTab';
import { useAdminMenus } from './state/menus/use-admin-menus';
import { useAdminState } from './state/use-admin-state';

const ThemeDrawer = lazy(() => import('./modules/theme-drawer/ThemeDrawer'));

const AdminLayout = () => {
  const { contentXScrollable, fullContent, isMobile, mixSiderFixed, siderCollapse, toggleSiderCollapse } =
    useAdminState();

  const { fixedHeaderAndTab, footer, header, layout, sider, tab } = useSettingsTheme();

  const { childLevelMenus, isActiveFirstLevelMenuHasChildren, secondLevelMenus } = useAdminMenus();

  const layoutMode = layout.mode.includes(LAYOUT_MODE_VERTICAL) ? LAYOUT_MODE_VERTICAL : LAYOUT_MODE_HORIZONTAL;

  const isTopHybridHeaderFirst = layout.mode === 'top-hybrid-header-first';

  const isVerticalHybridHeaderFirst = layout.mode === 'vertical-hybrid-header-first';

  const isTopHybridSidebarFirst = layout.mode === 'top-hybrid-sidebar-first';

  const isVerticalMix = layout.mode === 'vertical-mix';

  const siderVisible = layout.mode !== 'horizontal';

  const siderWidth = getSiderAndCollapsedWidth(false);

  const siderCollapsedWidth = getSiderAndCollapsedWidth(true);

  function getSiderAndCollapsedWidth(isCollapsed: boolean) {
    const { collapsedWidth, mixChildMenuWidth, mixCollapsedWidth, mixWidth: themeMixWidth, width: themeWidth } = sider;

    const width = isCollapsed ? collapsedWidth : themeWidth;
    const mixWidth = isCollapsed ? mixCollapsedWidth : themeMixWidth;

    if (isTopHybridHeaderFirst) {
      return isActiveFirstLevelMenuHasChildren ? width : 0;
    }

    if (isVerticalHybridHeaderFirst && !isActiveFirstLevelMenuHasChildren) {
      return 0;
    }

    const isMixMode = isVerticalMix || isTopHybridSidebarFirst || isVerticalHybridHeaderFirst;
    let finalWidth = isMixMode ? mixWidth : width;

    if (isVerticalMix && mixSiderFixed && secondLevelMenus.length) {
      finalWidth += mixChildMenuWidth;
    }

    if (isVerticalHybridHeaderFirst && mixSiderFixed && childLevelMenus.length) {
      finalWidth += mixChildMenuWidth;
    }

    return finalWidth;
  }

  console.log('2222333676766');

  return (
    <AdminLayoutComponent
      contentClass={contentXScrollable ? 'overflow-x-hidden' : ''}
      fixedFooter={footer.fixed}
      fixedTop={fixedHeaderAndTab}
      Footer={<GlobalFooter />}
      footerHeight={footer.height}
      footerVisible={footer.visible}
      fullContent={fullContent}
      Header={<AdminHeader />}
      headerHeight={header.height}
      isMobile={isMobile}
      mode={layoutMode as LayoutMode}
      rightFooter={footer.right}
      scrollElId={LAYOUT_SCROLL_EL_ID}
      scrollMode={layout.scrollMode}
      Sider={<GlobalSider />}
      siderCollapse={siderCollapse}
      siderCollapsedWidth={siderCollapsedWidth}
      siderVisible={siderVisible}
      siderWidth={siderWidth}
      Tab={<AdminTab />}
      tabHeight={tab.height}
      tabVisible={tab.visible}
      updateSiderCollapse={toggleSiderCollapse}
    >
      <GlobalContent />

      <AdminMenu />

      <Suspense fallback={null}>
        <ThemeDrawer />
      </Suspense>
    </AdminLayoutComponent>
  );
};

export default AdminLayout;
