import { z } from 'zod';

import { menuCategoryKeys } from '@/features/menus/menu-category';
import { transformRecordToOption } from '@/utils/common';

type BackendRouteHandleSource = 'empty' | 'handle' | 'meta';

const menuNullableStringSearchSchema = z
  .string()
  .nullish()
  .catch(null)
  .transform(value => value || null);

const menuLayoutSearchSchema = z
  .string()
  .nullish()
  .catch(null)
  .transform(value => {
    if (!value) return null;

    return menuCategoryKeys.includes(value as Router.MenuCategoryKey) ? (value as Router.MenuCategoryKey) : null;
  });

const menuTypeSearchSchema = z
  .string()
  .nullish()
  .catch(null)
  .transform(value => {
    if (value === 'divider' || value === 'group' || value === 'item') {
      return value;
    }

    return null;
  });

export const MenuSearchSchema = z.object({
  current: z.coerce.number().positive().catch(1).default(1),
  layout: menuLayoutSearchSchema,
  menuName: menuNullableStringSearchSchema,
  menuType: menuTypeSearchSchema,
  routePath: menuNullableStringSearchSchema,
  size: z.coerce.number().positive().catch(10).default(10)
});

export interface MenuSearchParams {
  /** Current page used by the shared table hook. */
  current?: number | string | null;
  /** Top-level admin layout category key. */
  layout?: Router.MenuCategoryKey | string | null;
  /** Keyword matched against title, name, and i18n key. */
  menuName?: string | null;
  /** Dynamic route menu type. */
  menuType?: Router.MenuType | string | null;
  /** Keyword matched against path, name, and redirect. */
  routePath?: string | null;
  /** Page size used by the shared table hook. */
  size?: number | string | null;
}

export interface BackendRouteFormModel {
  /** Route path used when a hidden route should highlight another menu. */
  activeMenu: string | null;
  /** Whether a zero static or dynamic badge value should still render. */
  badgeShowZero: boolean;
  /** Standard badge render mode. */
  badgeType: Router.MenuBadgeType | null;
  /** Static badge value when the badge does not read a dynamic key. */
  badgeValue: Router.MenuBadgeValue;
  /** Dynamic badge value key registered in the layout badge store. */
  badgeValueKey: string | null;
  /** Badge visual variant. */
  badgeVariant: Router.MenuBadgeVariant | null;
  /** Whether this route is always available before permission filtering. */
  constant: boolean;
  /** App-specific menu extra component key. */
  extra: Router.Extra | null;
  /** Fixed tab position when the route should stay pinned. */
  fixedIndexInTab: number | null;
  /** Whether the route should be hidden from the visible menu tree. */
  hideInMenu: boolean;
  /** External link target when the menu item opens another site. */
  href: string | null;
  /** Translation key used by the menu renderer. */
  i18nKey: string | null;
  /** Iconify icon name. */
  icon: string | null;
  /** Stable route id when the backend provides one. */
  id: string;
  /** Whether the route should be cached by the tab/content runtime. */
  keepAlive: boolean;
  /** Top-level layout category key. */
  layout: Router.MenuCategoryKey | null;
  /** Local SVG icon name. */
  localIcon: string | null;
  /** Whether the route can open multiple tabs. */
  multiTab: boolean;
  /** Backend route name. */
  name: string | null;
  /** Menu ordering weight within the same parent. */
  order: number | null;
  /** Parent backend route id. */
  parentId: string | null;
  /** Browser path exposed by TanStack Router. */
  path: string;
  /** Default search params carried when opening this route from the menu. */
  query: Api.Route.BackendRouteQuery[];
  /** Backend redirect target kept for API round-tripping. */
  redirect: string | null;
  /** Roles allowed to access this route. */
  roles: string[];
  /** Menu title used when no i18n key is present. */
  title: string | null;
  /** Menu tree node type consumed by the layout generator. */
  type: Router.MenuType;
  /** Iframe or external page URL rendered by the route runtime. */
  url: string | null;
}

export interface BackendRouteTableRecord extends BackendRouteFormModel {
  /** Child backend routes. */
  children?: BackendRouteTableRecord[];
  /** Normalized handle value from handle, meta, or an empty fallback. */
  handle: Api.Route.BackendRouteHandle;
  /** Original handle field used by the backend payload. */
  handleSource: BackendRouteHandleSource;
  /** Original backend route id before string normalization. */
  rawId: number | string | null;
  /** Original parent id before string normalization. */
  rawParentId: number | string | null;
}

export interface BackendRouteListResponse {
  /** Current page number. */
  current: number;
  /** Backend route records displayed by the table. */
  records: BackendRouteTableRecord[];
  /** Page size. */
  size: number;
  /** Total route count after filtering. */
  total: number;
}

export const routeMenuRecord = {
  badgeType: {
    dot: 'page.manage.menu.badgeType.dot',
    normal: 'page.manage.menu.badgeType.normal'
  },
  badgeVariant: {
    default: 'page.manage.menu.badgeVariant.default',
    error: 'page.manage.menu.badgeVariant.error',
    info: 'page.manage.menu.badgeVariant.info',
    primary: 'page.manage.menu.badgeVariant.primary',
    success: 'page.manage.menu.badgeVariant.success',
    warning: 'page.manage.menu.badgeVariant.warning'
  },
  type: {
    divider: 'page.manage.menu.type.divider',
    group: 'page.manage.menu.type.group',
    item: 'page.manage.menu.type.item'
  }
} as const satisfies {
  badgeType: Record<Router.MenuBadgeType, I18n.I18nKey>;
  badgeVariant: Record<Router.MenuBadgeVariant, I18n.I18nKey>;
  type: Record<Router.MenuType, I18n.I18nKey>;
};

export const badgeTypeOptions = transformRecordToOption(routeMenuRecord.badgeType);

export const badgeVariantOptions = transformRecordToOption(routeMenuRecord.badgeVariant);

export const routeMenuTypeOptions = transformRecordToOption(routeMenuRecord.type);

export const routeMenuTypeTagColorRecord: Record<Router.MenuType, string> = {
  divider: 'warning',
  group: 'default',
  item: 'processing'
};

export const routeBadgeVariantTagColorRecord: Record<Router.MenuBadgeVariant, string> = {
  default: 'default',
  error: 'error',
  info: 'blue',
  primary: 'processing',
  success: 'success',
  warning: 'warning'
};

export function createDefaultBackendRouteQuery(): Api.Route.BackendRouteQuery {
  return {
    key: '',
    value: ''
  };
}

export function createDefaultBackendRouteFormModel(
  overrides: Partial<BackendRouteFormModel> = {}
): BackendRouteFormModel {
  return {
    activeMenu: null,
    badgeShowZero: false,
    badgeType: null,
    badgeValue: null,
    badgeValueKey: null,
    badgeVariant: null,
    constant: false,
    extra: null,
    fixedIndexInTab: null,
    hideInMenu: false,
    href: null,
    id: '',
    i18nKey: null,
    icon: null,
    keepAlive: false,
    layout: null,
    localIcon: null,
    multiTab: false,
    name: null,
    order: null,
    parentId: null,
    path: '',
    query: [],
    redirect: null,
    roles: [],
    title: null,
    type: 'item',
    url: null,
    ...overrides
  };
}

export function createBackendRouteFormModel(route: BackendRouteTableRecord): BackendRouteFormModel {
  return createDefaultBackendRouteFormModel({
    activeMenu: route.activeMenu,
    badgeShowZero: route.badgeShowZero,
    badgeType: route.badgeType,
    badgeValue: route.badgeValue,
    badgeValueKey: route.badgeValueKey,
    badgeVariant: route.badgeVariant,
    constant: route.constant,
    extra: route.extra,
    fixedIndexInTab: route.fixedIndexInTab,
    hideInMenu: route.hideInMenu,
    href: route.href,
    id: route.id,
    i18nKey: route.i18nKey,
    icon: route.icon,
    keepAlive: route.keepAlive,
    layout: route.layout,
    localIcon: route.localIcon,
    multiTab: route.multiTab,
    name: route.name,
    order: route.order,
    parentId: route.parentId,
    path: route.path,
    query: route.query,
    redirect: route.redirect,
    roles: route.roles,
    title: route.title,
    type: route.type,
    url: route.url
  });
}

export function getBackendRouteSearchInitialParams(): MenuSearchParams {
  return {
    current: 1,
    layout: null,
    menuName: null,
    menuType: null,
    routePath: null,
    size: 10
  };
}

export function normalizeMenuSearchParams(params: Partial<MenuSearchParams>): MenuSearchParams {
  return MenuSearchSchema.parse(params);
}

export function filterBackendRouteResponse(
  response: Api.Route.BackendRouteResponse,
  params: MenuSearchParams
): BackendRouteListResponse {
  const normalizedParams = normalizeMenuSearchParams(params);
  const routeRecords = toBackendRouteRecords(response);
  const records = filterRouteTree(routeRecords, normalizedParams);

  return {
    current: normalizePageParam(normalizedParams.current, 1),
    records,
    size: normalizePageParam(normalizedParams.size, 10),
    total: countRoutes(records)
  };
}

export function toBackendRouteRecords(response: Api.Route.BackendRouteResponse): BackendRouteTableRecord[] {
  return response.routes.map(toBackendRouteRecord);
}

export function flattenParentRouteOptions(
  routes: BackendRouteTableRecord[],
  ignoredIds: Set<string> = new Set()
): Common.Option<string>[] {
  const result: Common.Option<string>[] = [];

  function flatten(route: BackendRouteTableRecord) {
    if (!ignoredIds.has(route.id)) {
      result.push({
        label: `${route.title ?? route.path} (${route.path})`,
        value: route.id
      });
    }

    route.children?.forEach(flatten);
  }

  routes.forEach(flatten);

  return result;
}

export function flattenRoutePathOptions(routes: BackendRouteTableRecord[]): Common.Option<string>[] {
  const result: Common.Option<string>[] = [];

  function flatten(route: BackendRouteTableRecord) {
    if (route.path) {
      result.push({
        label: route.path,
        value: route.path
      });
    }

    route.children?.forEach(flatten);
  }

  routes.forEach(flatten);

  return result;
}

export function collectRouteBranchIds(route: BackendRouteTableRecord) {
  const result = new Set<string>();

  function collect(item: BackendRouteTableRecord) {
    result.add(item.id);
    item.children?.forEach(collect);
  }

  collect(route);

  return result;
}

function toBackendRouteRecord(route: Api.Route.BackendRoutePayload): BackendRouteTableRecord {
  const handle = route.handle ?? route.meta ?? {};
  const id = String(route.id ?? route.name ?? route.path);
  const parentId = route.parentId === null || route.parentId === undefined ? null : String(route.parentId);
  const handleSource = getHandleSource(route);
  const title = handle.title ?? route.name ?? route.path;
  const children = route.children?.map(toBackendRouteRecord) ?? [];
  const formModel = toBackendRouteFormModel(route, handle, { id, parentId, title });

  return {
    ...formModel,
    children: children.length ? children : undefined,
    handle,
    handleSource,
    rawId: route.id ?? null,
    rawParentId: route.parentId ?? null
  };
}

function toBackendRouteFormModel(
  route: Api.Route.BackendRoutePayload,
  handle: Api.Route.BackendRouteHandle,
  base: Pick<BackendRouteFormModel, 'id' | 'parentId' | 'title'>
) {
  return createDefaultBackendRouteFormModel({
    ...toBackendRouteBadgeFields(handle),
    ...toBackendRouteHandleFields(handle),
    ...toBackendRoutePayloadFields(route, base)
  });
}

function toBackendRouteBadgeFields(handle: Api.Route.BackendRouteHandle): Partial<BackendRouteFormModel> {
  return {
    badgeShowZero: Boolean(handle.badge?.showZero),
    badgeType: handle.badge?.type ?? null,
    badgeValue: handle.badge?.value ?? null,
    badgeValueKey: handle.badge?.valueKey ?? null,
    badgeVariant: handle.badge?.variant ?? null
  };
}

function toBackendRouteHandleFields(handle: Api.Route.BackendRouteHandle): Partial<BackendRouteFormModel> {
  return {
    activeMenu: handle.activeMenu ?? null,
    constant: Boolean(handle.constant),
    extra: handle.extra ?? null,
    fixedIndexInTab: handle.fixedIndexInTab ?? null,
    hideInMenu: Boolean(handle.hideInMenu),
    href: handle.href ?? null,
    i18nKey: handle.i18nKey ?? null,
    icon: handle.icon ?? null,
    keepAlive: Boolean(handle.keepAlive),
    localIcon: handle.localIcon ?? null,
    multiTab: Boolean(handle.multiTab),
    order: handle.order ?? null,
    query: normalizeBackendRouteQuery(handle.query),
    roles: handle.roles ?? [],
    type: handle.type ?? 'item',
    url: handle.url ?? null
  };
}

function normalizeBackendRouteQuery(
  query: Api.Route.BackendRouteQuery[] | null | undefined
): Api.Route.BackendRouteQuery[] {
  if (!query?.length) return [];

  return query
    .filter(item => item.key)
    .map(item => ({
      key: item.key,
      value: item.value ?? ''
    }));
}

function toBackendRoutePayloadFields(
  route: Api.Route.BackendRoutePayload,
  base: Pick<BackendRouteFormModel, 'id' | 'parentId' | 'title'>
): Partial<BackendRouteFormModel> {
  return {
    id: base.id,
    layout: route.layout ?? null,
    name: route.name ?? null,
    parentId: base.parentId,
    path: route.path,
    redirect: route.redirect ?? null,
    title: base.title
  };
}

function getHandleSource(route: Api.Route.BackendRoutePayload): BackendRouteHandleSource {
  if (route.handle) return 'handle';
  if (route.meta) return 'meta';

  return 'empty';
}

function filterRouteTree(routes: BackendRouteTableRecord[], params: MenuSearchParams) {
  if (!hasSearchParams(params)) return routes;

  return routes.map(route => filterRoute(route, params)).filter(Boolean) as BackendRouteTableRecord[];
}

function filterRoute(route: BackendRouteTableRecord, params: MenuSearchParams): BackendRouteTableRecord | null {
  if (matchRoute(route, params)) return route;

  const children = route.children?.map(child => filterRoute(child, params)).filter(Boolean) as
    | BackendRouteTableRecord[]
    | undefined;

  if (children?.length) {
    return {
      ...route,
      children
    };
  }

  return null;
}

function matchRoute(route: BackendRouteTableRecord, params: MenuSearchParams) {
  const nameMatched =
    matchKeyword(route.title, params.menuName) ||
    matchKeyword(route.name, params.menuName) ||
    matchKeyword(route.i18nKey, params.menuName);
  const pathMatched =
    matchKeyword(route.path, params.routePath) ||
    matchKeyword(route.name, params.routePath) ||
    matchKeyword(route.redirect, params.routePath);
  const typeMatched = !params.menuType || route.type === params.menuType;
  const layoutMatched = !params.layout || route.layout === params.layout;

  return nameMatched && pathMatched && typeMatched && layoutMatched;
}

function hasSearchParams(params: MenuSearchParams) {
  return Boolean(params.layout || params.menuName || params.menuType || params.routePath);
}

function matchKeyword(value: string | number | null | undefined, keyword: string | null | undefined) {
  if (!keyword) return true;
  if (value === null || value === undefined) return false;

  return String(value).toLowerCase().includes(keyword.toLowerCase());
}

function countRoutes(routes: BackendRouteTableRecord[]) {
  let count = 0;

  function countItem(route: BackendRouteTableRecord) {
    count += 1;
    route.children?.forEach(countItem);
  }

  routes.forEach(countItem);

  return count;
}

function normalizePageParam(value: number | string | null | undefined, fallback: number) {
  const nextValue = Number(value);

  if (!Number.isFinite(nextValue) || nextValue <= 0) {
    return fallback;
  }

  return nextValue;
}
