/* eslint-disable react-hooks/exhaustive-deps */
import { SimpleScrollbar } from '@sa/materials';
import { useNavigate } from '@tanstack/react-router';
import type { MenuProps } from 'antd';

import { useSettingsTheme } from '@/features/theme/useSettingsTheme';
import { useAdminMenus } from '@/layouts/admin-layout/state/menus/use-admin-menus';
import { useAdminState } from '@/layouts/admin-layout/state/use-admin-state';
import { buildMenuMap, getParentKeysByMenuMap } from '@/utils/menu';

const VerticalMenu = memo(() => {
  const { menus: allMenus, secondLevelMenus, selectedKey } = useAdminMenus();

  const { isOnlyExpandCurrentParentMenu, layout } = useSettingsTheme();

  const navigate = useNavigate();

  const isMix = layout.mode.includes('mix');

  const isVerticalMix = layout.mode === 'vertical-mix';

  const { siderCollapse } = useAdminState();

  const inlineCollapsed = isVerticalMix ? false : siderCollapse;

  const menus = isMix ? secondLevelMenus : allMenus;

  // Build menu map for fast lookup (only rebuild when menus change)
  const menuMap = useMemo(() => buildMenuMap(menus), [menus]);

  // Get default open keys based on selected menu
  const defaultOpenKeys = useMemo(() => {
    if (!selectedKey[0]) return [];
    return getParentKeysByMenuMap(menuMap, selectedKey[0]);
  }, [selectedKey, menuMap]);

  const [stateOpenKeys, setStateOpenKeys] = useState<string[]>(inlineCollapsed ? [] : defaultOpenKeys);

  const handleClickMenu: MenuProps['onSelect'] = menuInfo => {
    console.log('menuInfo', menuInfo);

    // navigate({ to: menuInfo.key });
  };

  const onOpenChange: MenuProps['onOpenChange'] = keys => {
    if (keys.includes('rc-menu-more')) {
      setStateOpenKeys(keys);
      return;
    }

    const currentOpenKey = keys.find(key => !stateOpenKeys.includes(key));

    // open
    if (currentOpenKey && isOnlyExpandCurrentParentMenu) {
      const currentMenu = menuMap.get(currentOpenKey);
      const currentDepth = currentMenu?.depth || 0;

      setStateOpenKeys(
        keys.filter(key => {
          const menu = menuMap.get(key);
          return menu && menu.depth <= currentDepth;
        })
      );
    } else {
      // close
      setStateOpenKeys(keys);
    }
  };

  // Update open keys when route changes
  useEffect(() => {
    if (inlineCollapsed || isVerticalMix) return;
    if (!selectedKey[0]) return;

    const openKeys = getParentKeysByMenuMap(menuMap, selectedKey[0]);
    setStateOpenKeys(openKeys);
  }, [selectedKey, inlineCollapsed, isVerticalMix]);

  // Update open keys when collapse state changes
  useEffect(() => {
    if (inlineCollapsed) {
      setStateOpenKeys([]);
    } else if (!isVerticalMix) {
      setStateOpenKeys(defaultOpenKeys);
    }
  }, [isMix, inlineCollapsed]);

  return (
    <SimpleScrollbar>
      <AMenu
        className="size-full transition-300 border-0!"
        inlineCollapsed={inlineCollapsed}
        inlineIndent={18}
        items={menus as MenuProps['items']}
        mode="inline"
        openKeys={stateOpenKeys}
        selectedKeys={selectedKey}
        onOpenChange={onOpenChange}
        onSelect={handleClickMenu}
      />
    </SimpleScrollbar>
  );
});

export default VerticalMenu;
