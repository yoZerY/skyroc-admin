/* eslint-disable react-hooks/exhaustive-deps */
import { SimpleScrollbar } from '@sa/materials';
import type { MenuProps } from 'antd';
import clsx from 'clsx';

import { useSettingsTheme } from '@/features/theme/useSettingsTheme';
import { useAdminMenus } from '@/layouts/admin-layout/state/menus/use-admin-menus';
import { useAdminState } from '@/layouts/admin-layout/state/use-admin-state';

const VerticalMenu = memo(() => {
  const {
    childLevelMenus,
    menus: allMenus,
    openKeys,
    route,
    routerPushByKey,
    secondLevelMenus,
    selectedKey
  } = useAdminMenus();

  const { siderCollapse } = useAdminState();

  const {
    darkMode,
    layout: { mode },
    sider
  } = useSettingsTheme();

  const isVerticalHybridHeaderFirst = mode === 'top-hybrid-header-first';

  const isVertical = mode === 'vertical';

  const inlineCollapsed = isVertical || isVerticalHybridHeaderFirst ? siderCollapse : false;

  const isVerticalMix = mode === 'vertical-mix';

  const isMix = mode.includes('first');

  const [stateOpenKeys, setStateOpenKeys] = useState<string[]>(inlineCollapsed ? [] : openKeys);

  const darkTheme = !darkMode && sider.inverted;

  const menuTheme = darkTheme ? 'dark' : 'light';

  const menus = isVerticalMix
    ? secondLevelMenus
    : isMix
      ? isVerticalHybridHeaderFirst
        ? secondLevelMenus
        : childLevelMenus
      : allMenus;

  const handleClickMenu: MenuProps['onSelect'] = menuInfo => {
    routerPushByKey(menuInfo.key);
  };

  const onOpenChange: MenuProps['onOpenChange'] = keys => {
    if (keys.includes('rc-menu-more')) {
      setStateOpenKeys(keys);
      return;
    }

    // close
    setStateOpenKeys(keys);
  };

  useEffect(() => {
    if (inlineCollapsed) return;
    setStateOpenKeys(openKeys);
  }, [route.pathname, inlineCollapsed]);

  useUpdateEffect(() => {
    if (inlineCollapsed) {
      setStateOpenKeys([]);
    } else {
      setStateOpenKeys(openKeys);
    }
  }, [inlineCollapsed]);

  return (
    <SimpleScrollbar>
      <AMenu
        className={clsx('size-full transition-300 border-0!', { 'bg-container!': !darkTheme })}
        inlineCollapsed={inlineCollapsed}
        inlineIndent={18}
        items={menus as MenuProps['items']}
        mode="inline"
        openKeys={stateOpenKeys}
        selectedKeys={selectedKey}
        theme={menuTheme}
        onOpenChange={onOpenChange}
        onSelect={handleClickMenu}
      />
    </SimpleScrollbar>
  );
});

export default VerticalMenu;
