import { createAdminRouteQueries } from '@skyroc/web-admin-runtime';

import { queryClient } from '@/service/queryClient';

import { AUTH_QUERY_KEYS } from '../auth/keys';

import { routeApi } from './api';

const routeQueries = createAdminRouteQueries({
  isDev: import.meta.env.DEV,
  queryClient,
  routeApi,
  userInfoQueryKey: AUTH_QUERY_KEYS.USER_INFO
});

export const queryMenusOptions = routeQueries.queryMenusOptions;

export function useUserRoutesQuery() {
  return routeQueries.useUserRoutesQuery();
}

export function useIsRouteExistQuery(routeName: string, enabled = true) {
  return routeQueries.useIsRouteExistQuery(routeName, enabled);
}
