import { BeyondHiding } from '@skyroc/web-ui-antd';
import { I18nLabel, SvgIcon } from '@skyroc/web-ui-compose';
import type { MenuProps } from 'antd';
import { createElement } from 'react';

import { getAdminLayoutsOptions } from '../../setup';
import MenuBadge from './MenuBadge';
import type { GeneratedMenu } from './menu-generator';

type AntdMenuItems = NonNullable<MenuProps['items']>;

function createMenuTitle(menu: GeneratedMenu) {
  return <I18nLabel fallback={menu.title} i18nKey={menu.i18nKey} />;
}

function createMenuExtra(menu: GeneratedMenu) {
  const badge = menu.badge ? <MenuBadge badge={menu.badge} /> : null;
  const extra = createCustomMenuExtra(menu);

  if (badge && extra) {
    return (
      <span className="inline-flex items-center gap-6px">
        {badge}
        {extra}
      </span>
    );
  }

  return badge ?? extra;
}

function createCustomMenuExtra(menu: GeneratedMenu) {
  if (!menu.extra) return undefined;

  const { extras } = getAdminLayoutsOptions();
  const Extra = extras?.[menu.extra];

  if (!Extra) return undefined;

  return createElement(Extra, menu);
}

function renderMenu(menu: GeneratedMenu): Menu.CommonMenu {
  if (menu.type === 'divider') {
    return {
      key: menu.key,
      label: null,
      order: menu.order,
      title: menu.title,
      type: 'divider'
    };
  }

  const title = createMenuTitle(menu);
  const { defaultIcon } = getAdminLayoutsOptions();
  const commonMenu: Menu.CommonMenu = {
    extra: createMenuExtra(menu),
    i18nKey: menu.i18nKey,
    icon: <SvgIcon icon={menu.icon || defaultIcon} localIcon={menu.localIcon} style={{ fontSize: '20px' }} />,
    key: menu.key,
    label: <BeyondHiding title={title} />,
    order: menu.order,
    title: menu.title,
    type: menu.type
  };

  if (menu.children?.length) {
    commonMenu.children = renderCommonMenus(menu.children);
  }

  return commonMenu;
}

function createAntdMenuItem(menu: Menu.CommonMenu): AntdMenuItems[number] {
  const { children, i18nKey: _, ...rest } = menu;

  return {
    ...rest,
    children: children?.map(createAntdMenuItem)
  } as AntdMenuItems[number];
}

export function renderCommonMenus(menus: GeneratedMenu[]) {
  return menus.map(renderMenu);
}

export function renderAntdMenuItems(menus: Menu.CommonMenu[]): AntdMenuItems {
  return menus.map(createAntdMenuItem);
}
