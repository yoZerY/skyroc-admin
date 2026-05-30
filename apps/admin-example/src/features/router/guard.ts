import {
  hasAuthorizedRoutePath,
  hasMatchedRoutePermission,
  normalizePath
} from '@skyroc/web-admin-layouts';
import { redirect } from '@tanstack/react-router';
import type { AnyRouteMatch, ParsedLocation } from '@tanstack/react-router';

interface AdminRouteGuardOptions {
  context: AdminRouteGuardContext;
  location: ParsedLocation;
  matches: AnyRouteMatch[];
  preload?: boolean;
}

interface AdminRouteGuardContext {
  clearAuth: () => void;
  getHomeRoute: () => string;
  homeRoute?: string;
  initAuth: () => Promise<Api.Auth.UserInfo | null>;
  isAuthInitialized: boolean;
  isLoggedIn: boolean;
  userInfo?: Api.Auth.UserInfo;
}

function getLoginRedirectSearch(location: ParsedLocation, context: AdminRouteGuardContext) {
  const homeRoute = normalizePath(context.homeRoute || context.getHomeRoute());
  const currentPath = normalizePath(location.pathname);

  if (currentPath === homeRoute && !location.searchStr) {
    return undefined;
  }

  return { redirect: location.href };
}

function getCurrentRoutePath(matches: AnyRouteMatch[]) {
  const currentMatch = matches.at(-1);

  if (!currentMatch) {
    return null;
  }

  return normalizePath(currentMatch.fullPath);
}

function getMatchedRouteHref(matches: AnyRouteMatch[]) {
  return matches.findLast(match => match.staticData?.href)?.staticData?.href || null;
}

function getRouteSwitchFallbackPath(context: AdminRouteGuardContext, currentRoutePath: string | null) {
  const homeRoute = normalizePath(context.homeRoute || context.getHomeRoute());

  if (currentRoutePath !== homeRoute) {
    return homeRoute;
  }

  return '/404';
}

async function resolveUserInfo(context: AdminRouteGuardContext) {
  if (context.isAuthInitialized && context.userInfo) {
    return context.userInfo;
  }

  return context.initAuth();
}

export async function guardAdminRoute(options: AdminRouteGuardOptions) {
  const { context, location, matches, preload } = options;

  if (!context.isLoggedIn) {
    throw redirect({ to: '/login', search: getLoginRedirectSearch(location, context) });
  }

  const userInfo = await resolveUserInfo(context);

  if (!userInfo) {
    context.clearAuth();

    throw redirect({ to: '/login', search: getLoginRedirectSearch(location, context) });
  }

  if (import.meta.env.VITE_AUTH_ROUTE_MODE === 'static' && !hasMatchedRoutePermission(matches, userInfo)) {
    throw redirect({ to: '/403' });
  }

  const currentRoutePath = getCurrentRoutePath(matches);

  if (currentRoutePath && !hasAuthorizedRoutePath(currentRoutePath, userInfo)) {
    throw redirect({ to: '/403' });
  }

  const href = getMatchedRouteHref(matches);

  if (href && !preload) {
    window.open(href, '_blank', 'noopener,noreferrer');

    throw redirect({ to: getRouteSwitchFallbackPath(context, currentRoutePath), replace: true });
  }
}
