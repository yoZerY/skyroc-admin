import { transformRecordToOption } from '@/utils/common';

export interface MenuSearchParams {
  /** Current page used by the shared table hook. */
  current?: number | string | null;
  /** Menu display name keyword. */
  menuName?: string | null;
  /** Menu node type filter. */
  menuType?: Api.SystemManage.MenuType | string | null;
  /** Route path keyword. */
  routePath?: string | null;
  /** Page size used by the shared table hook. */
  size?: number | string | null;
  /** Enable status filter. */
  status?: Api.Common.EnableStatus | string | null;
}

export interface MenuFormModel {
  /** Route path used when a hidden route should highlight another menu. */
  activeMenu: string | null;
  /** Button permission definitions owned by this route. */
  buttons: Api.SystemManage.MenuButton[];
  /** Whether this route is always available before permission filtering. */
  constant: boolean;
  /** Fixed tab position when the route should stay pinned. */
  fixedIndexInTab: number | null;
  /** Whether the route should be hidden from the visible menu tree. */
  hideInMenu: boolean;
  /** External link target when the menu item opens another site. */
  href: string | null;
  /** Translation key used by the menu renderer. */
  i18nKey: string | null;
  /** Iconify name or local icon name. */
  icon: string;
  /** Icon source type. */
  iconType: Api.SystemManage.IconType;
  /** Stable record id when editing an existing menu. */
  id?: number;
  /** Whether the route should be cached by the tab/content runtime. */
  keepAlive: boolean;
  /** Human-readable menu name used as a fallback label. */
  menuName: string;
  /** Directory or leaf route node type. */
  menuType: Api.SystemManage.MenuType;
  /** Whether the route can open multiple tabs. */
  multiTab: boolean;
  /** Menu ordering weight within the same parent. */
  order: number;
  /** Parent menu id, or 0 for a top-level node. */
  parentId: number;
  /** Route query parameters appended when opening the route. */
  query: Api.SystemManage.MenuRouteQuery[];
  /** Stable route name used by permission and backend route contracts. */
  routeName: string;
  /** Browser path exposed by TanStack Router. */
  routePath: string;
  /** Whether the menu is enabled. */
  status: Api.Common.EnableStatus;
}

export const menuRecord = {
  iconType: {
    '1': 'page.manage.menu.iconType.iconify',
    '2': 'page.manage.menu.iconType.local'
  },
  status: {
    '1': 'page.manage.common.status.enable',
    '2': 'page.manage.common.status.disable'
  },
  type: {
    '1': 'page.manage.menu.type.directory',
    '2': 'page.manage.menu.type.menu'
  }
} as const satisfies {
  iconType: Record<Api.SystemManage.IconType, I18n.I18nKey>;
  status: Record<Api.Common.EnableStatus, I18n.I18nKey>;
  type: Record<Api.SystemManage.MenuType, I18n.I18nKey>;
};

export const enableStatusOptions = transformRecordToOption(menuRecord.status);

export const menuIconTypeOptions = transformRecordToOption(menuRecord.iconType);

export const menuTypeOptions = transformRecordToOption(menuRecord.type);

export const enableStatusTagColorRecord: Record<Api.Common.EnableStatus, string> = {
  '1': 'success',
  '2': 'error'
};

export const menuTypeTagColorRecord: Record<Api.SystemManage.MenuType, string> = {
  '1': 'default',
  '2': 'processing'
};

export function createDefaultMenuFormModel(overrides: Partial<MenuFormModel> = {}): MenuFormModel {
  return {
    activeMenu: null,
    buttons: [],
    constant: false,
    fixedIndexInTab: null,
    hideInMenu: false,
    href: null,
    i18nKey: null,
    icon: '',
    iconType: '1',
    keepAlive: false,
    menuName: '',
    menuType: '1',
    multiTab: false,
    order: 0,
    parentId: 0,
    query: [],
    routeName: '',
    routePath: '',
    status: '1',
    ...overrides
  };
}

export function createMenuFormModel(menu: Api.SystemManage.Menu): MenuFormModel {
  return createDefaultMenuFormModel({
    activeMenu: menu.activeMenu ?? null,
    buttons: menu.buttons ?? [],
    constant: Boolean(menu.constant),
    fixedIndexInTab: menu.fixedIndexInTab ?? null,
    hideInMenu: Boolean(menu.hideInMenu),
    href: menu.href ?? null,
    id: menu.id,
    i18nKey: menu.i18nKey ?? null,
    icon: menu.icon,
    iconType: menu.iconType,
    keepAlive: Boolean(menu.keepAlive),
    menuName: menu.menuName,
    menuType: menu.menuType,
    multiTab: Boolean(menu.multiTab),
    order: menu.order ?? 0,
    parentId: menu.parentId,
    query: menu.query ?? [],
    routeName: menu.routeName,
    routePath: menu.routePath,
    status: menu.status ?? '1'
  });
}

export function getMenuSearchInitialParams(): MenuSearchParams {
  return {
    current: 1,
    menuName: null,
    menuType: null,
    routePath: null,
    size: 10,
    status: null
  };
}

export function normalizeMenuSearchParams(params: MenuSearchParams): MenuSearchParams {
  return {
    ...params,
    current: normalizePageParam(params.current, 1),
    menuName: normalizeNullableString(params.menuName),
    menuType: normalizeMenuType(params.menuType),
    routePath: normalizeNullableString(params.routePath),
    size: normalizePageParam(params.size, 10),
    status: normalizeEnableStatus(params.status)
  };
}

export function filterMenuListResponse(response: Api.SystemManage.MenuList, params: MenuSearchParams) {
  const normalizedParams = normalizeMenuSearchParams(params);
  const records = filterMenuTree(response.records, normalizedParams);

  return {
    ...response,
    current: normalizePageParam(normalizedParams.current, 1),
    records,
    size: normalizePageParam(normalizedParams.size, 10),
    total: countMenus(records)
  } satisfies Api.SystemManage.MenuList;
}

export function flattenMenuOptions(
  menuList: Api.SystemManage.Menu[],
  ignoredIds: Set<number> = new Set()
): Common.Option<number>[] {
  const result: Common.Option<number>[] = [];

  function flatten(menu: Api.SystemManage.Menu) {
    if (!ignoredIds.has(menu.id)) {
      result.push({
        label: menu.menuName,
        value: menu.id
      });
    }

    menu.children?.forEach(flatten);
  }

  menuList.forEach(flatten);

  return result;
}

export function flattenRoutePathOptions(menuList: Api.SystemManage.Menu[]): Common.Option<string>[] {
  const result: Common.Option<string>[] = [];

  function flatten(menu: Api.SystemManage.Menu) {
    if (menu.routePath) {
      result.push({
        label: menu.routePath,
        value: menu.routePath
      });
    }

    menu.children?.forEach(flatten);
  }

  menuList.forEach(flatten);

  return result;
}

export function collectMenuBranchIds(menu: Api.SystemManage.Menu) {
  const result = new Set<number>();

  function collect(item: Api.SystemManage.Menu) {
    result.add(item.id);
    item.children?.forEach(collect);
  }

  collect(menu);

  return result;
}

function filterMenuTree(menuList: Api.SystemManage.Menu[], params: MenuSearchParams) {
  if (!hasSearchParams(params)) return menuList;

  return menuList.map(menu => filterMenu(menu, params)).filter(Boolean) as Api.SystemManage.Menu[];
}

function filterMenu(menu: Api.SystemManage.Menu, params: MenuSearchParams): Api.SystemManage.Menu | null {
  if (matchMenu(menu, params)) return menu;

  const children = menu.children?.map(child => filterMenu(child, params)).filter(Boolean) as
    | Api.SystemManage.Menu[]
    | undefined;

  if (children?.length) {
    return {
      ...menu,
      children
    };
  }

  return null;
}

function matchMenu(menu: Api.SystemManage.Menu, params: MenuSearchParams) {
  const nameMatched = matchKeyword(menu.menuName, params.menuName) || matchKeyword(menu.i18nKey, params.menuName);
  const pathMatched = matchKeyword(menu.routePath, params.routePath) || matchKeyword(menu.routeName, params.routePath);
  const typeMatched = !params.menuType || menu.menuType === params.menuType;
  const statusMatched = !params.status || menu.status === params.status;

  return nameMatched && pathMatched && typeMatched && statusMatched;
}

function hasSearchParams(params: MenuSearchParams) {
  return Boolean(params.menuName || params.menuType || params.routePath || params.status);
}

function matchKeyword(value: string | null | undefined, keyword: string | null | undefined) {
  if (!keyword) return true;
  if (!value) return false;

  return value.toLowerCase().includes(keyword.toLowerCase());
}

function countMenus(menuList: Api.SystemManage.Menu[]) {
  let count = 0;

  function countItem(menu: Api.SystemManage.Menu) {
    count += 1;
    menu.children?.forEach(countItem);
  }

  menuList.forEach(countItem);

  return count;
}

function normalizePageParam(value: number | string | null | undefined, fallback: number) {
  const nextValue = Number(value);

  if (!Number.isFinite(nextValue) || nextValue <= 0) {
    return fallback;
  }

  return nextValue;
}

function normalizeNullableString(value: string | null | undefined) {
  if (value === undefined || value === null || value === '') {
    return null;
  }

  return value;
}

function normalizeMenuType(value: Api.SystemManage.MenuType | string | null | undefined) {
  const normalized = normalizeNullableString(value);

  if (normalized === '1' || normalized === '2') {
    return normalized;
  }

  return null;
}

function normalizeEnableStatus(value: Api.Common.EnableStatus | string | null | undefined) {
  const normalized = normalizeNullableString(value);

  if (normalized === '1' || normalized === '2') {
    return normalized;
  }

  return null;
}
