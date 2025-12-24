import classNames from 'clsx';

import DarkModeContainer from '@/components/DarkModeContainer';
import PinToggler from '@/components/PinToggler';
import { GLOBAL_SIDER_MENU_ID } from '@/constants/app';
import { useSettingsTheme } from '@/features/theme/useSettingsTheme';
import { useAdminMenus } from '@/layouts/admin-layout/state/menus/use-admin-menus';
import { useAdminState } from '@/layouts/admin-layout/state/use-admin-state';

import AdminLogo from '../../AdminLogo';
import FirstLevelMenu from '../components/FirstLevelMenu';
import VerticalMenu from '../components/VerticalMenu';
import { FirstLevelMenuMode } from '../enum';

const VerticalMix = memo(({ mode = FirstLevelMenuMode.All }: { mode?: FirstLevelMenuMode }) => {
  const { t } = useTranslation();

  const { changeActiveFirstLevelMenuKey, childLevelMenus, drawerVisible, secondLevelMenus, setDrawerVisible } =
    useAdminMenus();

  const { darkMode, header, sider } = useSettingsTheme();

  const { mixSiderFixed, toggleMixSiderFixed } = useAdminState();

  const siderInverted = !darkMode && sider.inverted;

  const isFirst = mode === FirstLevelMenuMode.All;

  const hasMenus = isFirst
    ? secondLevelMenus && secondLevelMenus.length > 0
    : childLevelMenus && childLevelMenus.length > 0;

  const showDrawer = hasMenus && (drawerVisible || mixSiderFixed);

  function handleSelectMixMenu() {
    setDrawerVisible(true);
  }

  function handleResetActiveMenu() {
    setDrawerVisible(false);

    if (isFirst) {
      changeActiveFirstLevelMenuKey();
    }
  }

  return (
    <div
      className="h-full flex"
      onMouseLeave={handleResetActiveMenu}
    >
      <FirstLevelMenu
        inverted={siderInverted}
        mode={mode}
        onSelect={handleSelectMixMenu}
      >
        <AdminLogo
          showTitle={false}
          style={{ height: `${header.height}px` }}
        />
      </FirstLevelMenu>
      <div
        className="relative h-full transition-width-300"
        style={{ width: mixSiderFixed && hasMenus ? `${sider.mixChildMenuWidth}px` : '0px' }}
      >
        <DarkModeContainer
          className="absolute-lt h-full flex-col-stretch nowrap-hidden shadow-sm transition-all-300"
          inverted={siderInverted}
          style={{ width: showDrawer ? `${sider.mixChildMenuWidth}px` : '0px' }}
        >
          <header
            className="flex-y-center justify-between px-12px"
            style={{ height: `${header.height}px` }}
          >
            <h2 className="text-16px text-primary font-bold">{t('system.title')}</h2>
            <PinToggler
              className={classNames({ 'text-white:88 !hover:text-white': siderInverted })}
              pin={mixSiderFixed}
              onClick={toggleMixSiderFixed}
            />
          </header>
          <VerticalMenu />
        </DarkModeContainer>
      </div>
    </div>
  );
});

const VerticalMixMenu = ({ mode }: { mode?: FirstLevelMenuMode }) => {
  return (
    <Portal container={GLOBAL_SIDER_MENU_ID}>
      <VerticalMix mode={mode} />
    </Portal>
  );
};

export default VerticalMixMenu;
