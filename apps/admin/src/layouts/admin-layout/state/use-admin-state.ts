import { atom, useAtom } from 'jotai';

import { useSettingsTheme } from '@/features/theme/useSettingsTheme';
import { localStg } from '@/utils/storage';

const initialState = {
  siderCollapse: false,
  themeDrawerVisible: false,
  fullContent: false,
  contentXScrollable: false,
  reloadFlag: true,
  mixSiderFixed: localStg.get('mixSiderFixed') === 'Y'
};

const adminStateAtom = atom(initialState, (get, set, update: Partial<typeof initialState>) => {
  set(adminStateAtom, { ...get(adminStateAtom), ...update });
});

export const useAdminState = () => {
  const [adminState, setAdminState] = useAtom(adminStateAtom);

  const { page } = useSettingsTheme();

  const responsive = useResponsive();

  const isMobile = !responsive.sm;

  function toggleSiderCollapse() {
    setAdminState({ siderCollapse: !adminState.siderCollapse });
  }

  function setSiderCollapse(siderCollapse: boolean) {
    setAdminState({ siderCollapse });
  }

  function openThemeDrawer() {
    setAdminState({ themeDrawerVisible: true });
  }

  function closeThemeDrawer() {
    setAdminState({ themeDrawerVisible: false });
  }

  function toggleFullContent() {
    setAdminState({ fullContent: !adminState.fullContent });
  }

  function setContentXScrollable(contentXScrollable: boolean) {
    setAdminState({ contentXScrollable });
  }

  function toggleMixSiderFixed() {
    setAdminState({ mixSiderFixed: !adminState.mixSiderFixed });
  }

  function setMixSiderFixed(mixSiderFixed: boolean) {
    setAdminState({ mixSiderFixed });
  }

  function setReloadFlag(reloadFlag: boolean) {
    setAdminState({ reloadFlag });
  }

  /**
   * Reload page
   *
   * @param duration Duration time
   */
  async function reloadPage(duration = 300) {
    setReloadFlag(false);

    const d = page.animate ? duration : 40;

    await new Promise(resolve => {
      setTimeout(resolve, d);
    });

    setReloadFlag(true);
  }

  return {
    adminState,
    ...adminState,
    isMobile,
    setAdminState,
    reloadPage,
    toggleSiderCollapse,
    setSiderCollapse,
    setContentXScrollable,
    toggleFullContent,
    openThemeDrawer,
    closeThemeDrawer,
    toggleMixSiderFixed,
    setMixSiderFixed
  };
};
