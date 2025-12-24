import { atom, useAtom } from 'jotai';

import { menuGenerator } from './menu-generator';

interface MenusAtom {
  /** 原始菜单数据：RouteId(layoutId) -> 菜单列表 */
  menus: Menu.Menus;
  quickReferenceMenus: Menu.QuickReferenceMenus;
}

const initState: MenusAtom = {
  menus: new Map(),
  quickReferenceMenus: new Map()
};

const menusAtom = atom(initState, (get, set, update: Partial<MenusAtom>) => {
  set(menusAtom, { ...get(menusAtom), ...update });
});

export const useMenus = () => {
  const [menusState, setMenusState] = useAtom(menusAtom);

  function initMenus() {
    const { allMenus, quickReferenceMenus } = menuGenerator.generate();
    setMenusState({ menus: allMenus, quickReferenceMenus });
  }

  return {
    ...menusState,
    initMenus
  };
};
