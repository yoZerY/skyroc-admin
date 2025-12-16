/**
 * Route module query keys
 */

export const ROUTE_QUERY_KEYS = {
  CONSTANT_ROUTES: ['route', 'constantRoutes'] as const,
  IS_ROUTE_EXIST: (routeName: string) => ['route', 'isRouteExist', routeName] as const,
  USER_ROUTES: ['route', 'userRoutes'] as const
} as const;
