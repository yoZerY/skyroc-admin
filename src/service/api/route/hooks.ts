import { queryOptions, useQuery } from '@tanstack/react-query';

import { menuGenerator } from '@/features/menus/menu-generator';
import { queryClient } from '@/service/queryClient';

import { AUTH_QUERY_KEYS } from '../auth/keys';

import { fetchGetBackendRoutes, fetchGetConstantRoutes, fetchIsRouteExist } from './api';
import { ROUTE_QUERY_KEYS } from './keys';

/**
 * Get constant routes query hook
 *
 * @example
 *   const { data: constantRoutes, isLoading } = useConstantRoutesQuery();
 *
 * @param enabled - Whether to enable the query (default: true)
 */
export function useConstantRoutesQuery(enabled = true) {
  return useQuery({
    enabled,
    queryFn: fetchGetConstantRoutes,
    queryKey: ROUTE_QUERY_KEYS.CONSTANT_ROUTES
  });
}

export const queryMenusOptions = () => {
  const enabled = Boolean(queryClient.getQueryData(AUTH_QUERY_KEYS.USER_INFO));
  return queryOptions({
    enabled,
    queryFn: async () => {
      return await menuGenerator.generate();
    },
    gcTime: Infinity,
    staleTime: Infinity,
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
