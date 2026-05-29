import type { AnyRoute } from '@tanstack/react-router';
import type { AdminLayoutsDynamicRoutes } from '@skyroc/web-admin-layouts';
import { normalizePath } from '@skyroc/web-admin-layouts';

import { routeTree } from '@/features/router/routeTree.gen';
import { queryMenusOptions } from '@/service/api/route/hooks';
import { queryClient } from '@/service/queryClient';

const availableRoutePaths = collectAvailableRoutePaths(routeTree);

function collectAvailableRoutePaths(route: AnyRoute) {
  const paths = new Set<string>();

  function walk(currentRoute: AnyRoute) {
    const fullPath = normalizePath(currentRoute.fullPath ?? '');

    if (fullPath) {
      paths.add(fullPath);
    }

    const children = currentRoute.children as AnyRoute[] | undefined;
    children?.forEach(child => {
      walk(child);
    });
  }

  walk(route);

  return paths;
}

function normalizeBackendPath(path: string) {
  return normalizePath(path.replaceAll(/:([A-Za-z0-9_]+)/g, '$$$1'));
}

function toRoutePath(path: string) {
  return normalizeBackendPath(path) as Router.RoutePath;
}

function toAvailableRoutePath(path?: string | null) {
  if (!path) return undefined;

  const routePath = toRoutePath(path);

  return availableRoutePaths.has(routePath) ? routePath : undefined;
}

function toMenuCategoryKey(layout?: string | null) {
  return (layout || undefined) as Router.MenuCategoryKey | undefined;
}

function toMenuExtraKey(extra?: string | null) {
  return (extra || undefined) as Router.Extra | undefined;
}

function toI18nKey(i18nKey?: string | null) {
  return (i18nKey || undefined) as I18n.I18nKey | undefined;
}

function toParentId(parentId?: number | string | null) {
  if (parentId === null) return null;
  if (parentId === undefined) return undefined;

  return String(parentId);
}

function toBackendRouteChildren(route: Api.Route.BackendRoutePayload) {
  const children = route.children?.map(toBackendRoute).filter(Boolean) as Api.Route.BackendRoute[] | undefined;

  return children?.length ? children : undefined;
}

function toRouteMenu(handle: Api.Route.BackendRouteHandle) {
  return {
    activeMenu: toAvailableRoutePath(handle.activeMenu),
    badge: handle.badge ?? undefined,
    extra: toMenuExtraKey(handle.extra),
    hide: handle.hideInMenu ?? undefined,
    icon: handle.icon ?? undefined,
    localIcon: handle.localIcon ?? undefined,
    order: handle.order ?? undefined,
    type: handle.type ?? undefined
  };
}

function toRouteTab(handle: Api.Route.BackendRouteHandle) {
  return {
    fixedIndex: handle.fixedIndexInTab ?? undefined,
    multi: handle.multiTab ?? undefined
  };
}

function toBackendRoute(route: Api.Route.BackendRoutePayload): Api.Route.BackendRoute | null {
  const path = toRoutePath(route.path);

  if (!availableRoutePaths.has(path)) {
    return null;
  }

  const handle = route.handle ?? route.meta ?? {};

  return {
    id: String(route.id ?? route.name ?? path),
    children: toBackendRouteChildren(route),
    href: handle.href ?? undefined,
    i18nKey: toI18nKey(handle.i18nKey),
    keepAlive: handle.keepAlive ?? undefined,
    layout: toMenuCategoryKey(route.layout),
    menu: toRouteMenu(handle),
    parentId: toParentId(route.parentId),
    path,
    permissions: handle.roles ?? undefined,
    tab: toRouteTab(handle),
    title: handle.title ?? route.name ?? undefined,
    url: handle.url ?? undefined
  };
}

export function normalizeBackendRouteResponse(routeData: Api.Route.BackendRouteResponse): AdminLayoutsDynamicRoutes {
  return {
    home: toAvailableRoutePath(routeData.home),
    routes: routeData.routes.map(toBackendRoute).filter(Boolean) as Api.Route.BackendRoute[]
  };
}

export async function loadAdminDynamicRoutes() {
  const routeData = await queryClient.ensureQueryData(queryMenusOptions());

  return normalizeBackendRouteResponse(routeData);
}
