import { useQuery } from '@tanstack/react-query';

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

/**
 * Get user routes query hook
 *
 * @example
 *   const { data: userRoutes, isLoading } = useUserRoutesQuery();
 *
 * @param enabled - Whether to enable the query (default: true)
 */
export function useUserRoutesQuery(enabled = true) {
  return useQuery({
    enabled,
    gcTime: Infinity,
    queryFn: fetchGetBackendRoutes,
    queryKey: ROUTE_QUERY_KEYS.USER_ROUTES,
    staleTime: Infinity
  });
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
