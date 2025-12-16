import { useNavigate } from '@tanstack/react-router';
import type { MenuProps } from 'antd';
import type { FC } from 'react';

import { useSettingsTheme } from '@/features/theme/useSettingsTheme';
import { useAdminMenus } from '@/layouts/admin-layout/state/menus/use-admin-menus';

import { HorizontalMenuMode } from '../enum';

interface Props {
  /** 水平菜单显示模式 */
  mode: HorizontalMenuMode;
}

function isHasChildren(menus: App.Global.AdminLayout.Menu[], key: string) {
  return menus.some(item => item.key === key && item.children?.length);
}

const HorizontalMenu: FC<Props> = memo(props => {
  const { mode } = props;

  const { header } = useSettingsTheme();

  const { changeActiveFirstLevelMenuKey, firstLevelMenus, menus, secondLevelMenus, selectedKey } = useAdminMenus();

  const navigate = useNavigate();

  const selectedKeys = mode === HorizontalMenuMode.FirstLevel ? [`/${selectedKey[0].split('/')[1]}`] : selectedKey;

  function getMenus() {
    if (mode === HorizontalMenuMode.All) {
      return menus;
    } else if (mode === HorizontalMenuMode.Child) {
      return secondLevelMenus;
    }
    return firstLevelMenus;
  }

  const allMenus = getMenus();

  const handleClickMenu: MenuProps['onSelect'] = menuInfo => {
    if (mode === HorizontalMenuMode.FirstLevel && isHasChildren(menus, menuInfo.key)) {
      changeActiveFirstLevelMenuKey(menuInfo.key);
    } else {
      navigate({ to: menuInfo.key });
    }
  };

  return (
    <AMenu
      className="size-full transition-400 border-0!"
      inlineIndent={18}
      items={allMenus}
      mode="horizontal"
      selectedKeys={selectedKeys}
      style={{ lineHeight: `${header.height}px` }}
      onSelect={handleClickMenu}
    />
  );
});

export default HorizontalMenu;
