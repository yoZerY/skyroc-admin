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
  const isDev = import.meta.env.DEV;

  return queryOptions({
    enabled,
    queryFn: () => {
      // 在开发环境中，如果菜单数据为空（热更新后），强制重新生成
      const shouldForceRegenerate = isDev && menuGenerator.menuMap.size === 0;
      return menuGenerator.generate(shouldForceRegenerate);
    },
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
 * Hook to manually refresh menus
 * This will reset the menu generator and invalidate the query cache
 *
 * @example
 *   const refreshMenus = useRefreshMenus();
 *   <button onClick={refreshMenus}>Refresh Menus</button>
 */
export function useRefreshMenus() {
  return () => {
    // 重置菜单生成器
    menuGenerator.reset();
    // 使 React Query 缓存失效，触发重新获取
    queryClient.invalidateQueries({ queryKey: ROUTE_QUERY_KEYS.USER_ROUTES });
  };
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
