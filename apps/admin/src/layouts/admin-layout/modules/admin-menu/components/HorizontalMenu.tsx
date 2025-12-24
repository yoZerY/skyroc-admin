import type { MenuProps } from 'antd';
import type { FC } from 'react';

import { useSettingsTheme } from '@/features/theme/useSettingsTheme';
import { useAdminMenus } from '@/layouts/admin-layout/state/menus/use-admin-menus';

import { HorizontalMenuMode } from '../enum';

interface Props {
  /** 水平菜单显示模式 */
  mode: HorizontalMenuMode;
}

function stripRootType(menus: Menu.CommonMenu[]): Menu.CommonMenu[] {
  return menus.filter(({ type: _ }) => _ !== 'divider').map(({ type: _, ...rest }) => rest);
}

function findChildren(menus: Menu.CommonMenu[], key: string) {
  return menus.find(item => item.key === key)?.children || [];
}

const HorizontalMenu: FC<Props> = memo(props => {
  const { mode } = props;

  const { header } = useSettingsTheme();

  const {
    activeFirstLevelMenuKey,
    changeActiveFirstLevelMenuKey,
    changeActiveSecondLevelMenuKey,
    firstLevelMenus,
    menus,
    routerPushByKey,
    secondLevelMenus,
    selectedKey,
    setDrawerVisible
  } = useAdminMenus();

  function getMenus() {
    if (mode === HorizontalMenuMode.All) {
      return menus;
    } else if (mode === HorizontalMenuMode.Child) {
      return secondLevelMenus;
    }
    return firstLevelMenus;
  }

  const allMenus = getMenus();

  const strippedMenus = stripRootType(allMenus);

  /**
   * 处理菜单点击
   * - FirstLevel 模式：选择一级菜单，如果有子菜单且 autoSelectFirstMenu 开启，自动选择最深层级菜单
   * - 其他模式：直接跳转
   */
  const handleClickMenu: MenuProps['onSelect'] = menuInfo => {
    if (mode === HorizontalMenuMode.FirstLevel) {
      changeActiveFirstLevelMenuKey(menuInfo.key);

      const children = findChildren(menus, menuInfo.key);

      if (!children.length) {
        routerPushByKey(menuInfo.key);
      } else {
        const child = children[0].children || [];

        if (child.length) {
          changeActiveSecondLevelMenuKey(children[0].key);
          setDrawerVisible(true);
        }
      }
    } else {
      routerPushByKey(menuInfo.key);
    }
  };

  return (
    <AMenu
      className="size-full transition-400 border-0!"
      inlineIndent={18}
      items={strippedMenus as MenuProps['items']}
      mode="horizontal"
      selectedKeys={mode === HorizontalMenuMode.FirstLevel ? [activeFirstLevelMenuKey] : selectedKey}
      style={{ lineHeight: `${header.height}px` }}
      onSelect={handleClickMenu}
    />
  );
});

export default HorizontalMenu;
