/* eslint-disable react-hooks/exhaustive-deps */
import { ScrollArea } from '@skyroc/ui';
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

  const menus = useMemo(() => {
    if (isVerticalMix) return secondLevelMenus;
    if (isMix) return isVerticalHybridHeaderFirst ? secondLevelMenus : childLevelMenus;
    return allMenus;
  }, [isVerticalMix, isMix, isVerticalHybridHeaderFirst, secondLevelMenus, childLevelMenus, allMenus]);

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
    <ScrollArea
      className="h-full"
      type="always"
    >
      <AMenu
        className={clsx('h-full transition-300 border-0!', { 'bg-container!': !darkTheme })}
        inlineCollapsed={inlineCollapsed}
        inlineIndent={18}
        items={menus as MenuProps['items']}
        mode="inline"
        openKeys={stateOpenKeys}
        selectedKeys={selectedKey}
        style={{ width: sider.width }}
        theme={menuTheme}
        onOpenChange={onOpenChange}
        onSelect={handleClickMenu}
      />
    </ScrollArea>
  );
});

export default VerticalMenu;
