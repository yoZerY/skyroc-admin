import { queryOptions, useQuery } from '@tanstack/react-query';

import { queryClient } from '@/service/queryClient';

import { AUTH_QUERY_KEYS } from '../auth/keys';

import { fetchGetBackendRoutes, fetchIsRouteExist } from './api';
import { ROUTE_QUERY_KEYS } from './keys';

export const queryMenusOptions = () => {
  const enabled = Boolean(queryClient.getQueryData(AUTH_QUERY_KEYS.USER_INFO));
  const isDev = import.meta.env.DEV;

  return queryOptions({
    enabled,
    queryFn: fetchGetBackendRoutes,
    // 开发环境：较短的缓存时间，便于热更新后自动刷新
    // 生产环境：永久缓存
    gcTime: isDev ? 1000 * 60 * 5 : Infinity, // 开发环境 5 分钟
    staleTime: isDev ? 1000 * 10 : Infinity, // 开发环境 10 秒
    queryKey: ROUTE_QUERY_KEYS.USER_ROUTES
  });
};

/**
 * Get user routes query hook
 *
 * @example
 *   const { data: userRoutes, isLoading } = useUserRoutesQuery();
 *
 * @param enabled - Whether to enable the query (default: true)
 */
export function useUserRoutesQuery() {
  const options = queryMenusOptions();
  return useQuery(options);
}

/**
 * Check if route exists query hook
 *
 * @example
 *   const { data: exists } = useIsRouteExistQuery('home');
 *
 * @param routeName - Route name to check
 * @param enabled - Whether to enable the query (default: true)
 */
export function useIsRouteExistQuery(routeName: string, enabled = true) {
  return useQuery({
    enabled,
    queryFn: () => fetchIsRouteExist(routeName),
    queryKey: ROUTE_QUERY_KEYS.IS_ROUTE_EXIST(routeName)
  });
}
