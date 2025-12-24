/**
 * Route module query keys
 */

export const ROUTE_QUERY_KEYS = {
  CONSTANT_ROUTES: ['route', 'constantRoutes'],
  IS_ROUTE_EXIST: (routeName: string) => ['route', 'isRouteExist', routeName],
  USER_ROUTES: ['route', 'userRoutes']
} as const;
