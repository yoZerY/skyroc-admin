import type { QueryClient, QueryKey } from '@tanstack/react-query';
import { queryOptions, useMutation, useQuery } from '@tanstack/react-query';

interface AdminRequestConfig {
  [key: string]: unknown;
  data?: unknown;
  method?: string;
  params?: unknown;
  url: string;
}

export interface AdminRequest {
  <T>(config: AdminRequestConfig): Promise<T>;
}

export interface AdminAuthUrls {
  /** 后端自定义错误演示接口，用于模板调试错误处理链路。 */
  error?: string;
  /** 当前登录用户信息接口。 */
  getUserInfo: string;
  /** 登录接口。 */
  login: string;
  /** 刷新 access token 的接口。 */
  refreshToken: string;
}

export interface AdminRouteUrls {
  /** 常量路由接口，保留给后端拆分常量/用户路由的项目。 */
  getConstantRoutes?: string;
  /** 判断路由是否存在的接口。 */
  isRouteExist: string;
  /** 当前用户可访问动态路由接口。 */
  getUserRoutes: string;
}

export interface AdminAuthApi {
  /** 返回后端自定义错误，用于验证全局错误处理。 */
  fetchCustomBackendError(code: string, msg: string): Promise<unknown>;
  /** 获取当前登录用户信息。 */
  fetchGetUserInfo(): Promise<Api.Auth.UserInfo>;
  /** 登录并返回 token。 */
  fetchLogin(params: Api.Auth.LoginParams): Promise<Api.Auth.LoginResponse>;
  /** 使用 refresh token 换取新 token。 */
  fetchRefreshToken(refreshToken: string): Promise<Api.Auth.LoginToken>;
}

export interface AdminRouteApi {
  /** 获取当前用户可访问的后端动态路由。 */
  fetchGetBackendRoutes(): Promise<Api.Route.BackendRouteResponse>;
  /** 判断指定路由名是否存在。 */
  fetchIsRouteExist(routeName: string): Promise<boolean>;
}

export interface CreateAdminAuthQueriesOptions {
  /** 认证接口实现。 */
  authApi: AdminAuthApi;
  /** 认证 mutation keys，默认使用内置模板 key。 */
  mutationKeys?: typeof ADMIN_AUTH_MUTATION_KEYS;
  /** 认证 query keys，默认使用内置模板 key。 */
  queryKeys?: typeof ADMIN_AUTH_QUERY_KEYS;
  /** 获取当前认证状态的 hook，由应用层注入以避免 runtime 依赖具体 auth 实例。 */
  useAuthStatus: () => { isLoggedIn: boolean };
}

export interface CreateAdminRouteQueriesOptions {
  /** 是否开发环境，影响动态路由缓存时间。 */
  isDev?: boolean;
  /** 路由 query keys，默认使用内置模板 key。 */
  queryKeys?: typeof ADMIN_ROUTE_QUERY_KEYS;
  /** QueryClient 实例，用于判断用户信息是否已加载。 */
  queryClient: QueryClient;
  /** 路由接口实现。 */
  routeApi: AdminRouteApi;
  /** 用户信息 query key，默认使用内置认证 key。 */
  userInfoQueryKey?: QueryKey;
}

export const DEFAULT_ADMIN_AUTH_URLS: AdminAuthUrls = {
  error: '/auth/error',
  getUserInfo: '/auth/getUserInfo',
  login: '/auth/login',
  refreshToken: '/auth/refreshToken'
};

export const DEFAULT_ADMIN_ROUTE_URLS: AdminRouteUrls = {
  getConstantRoutes: '/route/getConstantRoutes',
  getUserRoutes: '/route/getReactUserRoutes',
  isRouteExist: '/route/isRouteExist'
};

export const ADMIN_AUTH_QUERY_KEYS = {
  USER_INFO: ['auth', 'userInfo'] as const
} as const;

export const ADMIN_AUTH_MUTATION_KEYS = {
  LOGIN: ['auth', 'login'] as const,
  REFRESH_TOKEN: ['auth', 'refreshToken'] as const
} as const;

export const ADMIN_ROUTE_QUERY_KEYS = {
  CONSTANT_ROUTES: ['route', 'constantRoutes'] as const,
  IS_ROUTE_EXIST: (routeName: string) => ['route', 'isRouteExist', routeName] as const,
  USER_ROUTES: ['route', 'userRoutes'] as const
} as const;

export function createAdminAuthApi(request: AdminRequest, urls: AdminAuthUrls = DEFAULT_ADMIN_AUTH_URLS): AdminAuthApi {
  function fetchLogin(params: Api.Auth.LoginParams) {
    return request<Api.Auth.LoginResponse>({
      data: params,
      method: 'post',
      url: urls.login
    });
  }

  function fetchGetUserInfo() {
    return request<Api.Auth.UserInfo>({ url: urls.getUserInfo });
  }

  function fetchRefreshToken(refreshToken: string) {
    return request<Api.Auth.LoginToken>({
      data: {
        refreshToken
      },
      method: 'post',
      url: urls.refreshToken
    });
  }

  function fetchCustomBackendError(code: string, msg: string) {
    if (!urls.error) {
      throw new Error('Admin auth error URL is not configured.');
    }

    return request({ params: { code, msg }, url: urls.error });
  }

  return {
    fetchCustomBackendError,
    fetchGetUserInfo,
    fetchLogin,
    fetchRefreshToken
  };
}

export function createAdminRouteApi(
  request: AdminRequest,
  urls: AdminRouteUrls = DEFAULT_ADMIN_ROUTE_URLS
): AdminRouteApi {
  function fetchGetBackendRoutes() {
    return request<Api.Route.BackendRouteResponse>({ url: urls.getUserRoutes });
  }

  function fetchIsRouteExist(routeName: string) {
    return request<boolean>({ params: { routeName }, url: urls.isRouteExist });
  }

  return {
    fetchGetBackendRoutes,
    fetchIsRouteExist
  };
}

export function createAdminAuthQueries(options: CreateAdminAuthQueriesOptions) {
  const queryKeys = options.queryKeys ?? ADMIN_AUTH_QUERY_KEYS;
  const mutationKeys = options.mutationKeys ?? ADMIN_AUTH_MUTATION_KEYS;

  function useLoginMutation() {
    return useMutation({
      mutationFn: (params: Api.Auth.LoginParams) => options.authApi.fetchLogin(params),
      mutationKey: mutationKeys.LOGIN,
      retry: false
    });
  }

  function queryUserInfoOptions(enabled = true) {
    return queryOptions({
      enabled,
      gcTime: Infinity,
      queryFn: options.authApi.fetchGetUserInfo,
      queryKey: queryKeys.USER_INFO,
      retry: false,
      staleTime: Infinity
    });
  }

  function useUserInfoQuery() {
    const { isLoggedIn } = options.useAuthStatus();
    const query = queryUserInfoOptions(isLoggedIn);

    return useQuery(query);
  }

  function useRefreshTokenMutation() {
    return useMutation({
      mutationFn: (refreshToken: string) => options.authApi.fetchRefreshToken(refreshToken),
      mutationKey: mutationKeys.REFRESH_TOKEN
    });
  }

  return {
    queryUserInfoOptions,
    useLoginMutation,
    useRefreshTokenMutation,
    useUserInfoQuery
  };
}

export function createAdminRouteQueries(options: CreateAdminRouteQueriesOptions) {
  const queryKeys = options.queryKeys ?? ADMIN_ROUTE_QUERY_KEYS;
  const userInfoQueryKey = options.userInfoQueryKey ?? ADMIN_AUTH_QUERY_KEYS.USER_INFO;

  function queryMenusOptions() {
    const enabled = Boolean(options.queryClient.getQueryData<Api.Auth.UserInfo>(userInfoQueryKey));
    const isDev = options.isDev ?? false;

    return queryOptions({
      enabled,
      queryFn: options.routeApi.fetchGetBackendRoutes,
      gcTime: isDev ? 1000 * 60 * 5 : Infinity,
      staleTime: isDev ? 1000 * 10 : Infinity,
      queryKey: queryKeys.USER_ROUTES
    });
  }

  function useUserRoutesQuery() {
    const query = queryMenusOptions();

    return useQuery(query);
  }

  function useIsRouteExistQuery(routeName: string, enabled = true) {
    return useQuery({
      enabled,
      queryFn: () => options.routeApi.fetchIsRouteExist(routeName),
      queryKey: queryKeys.IS_ROUTE_EXIST(routeName)
    });
  }

  return {
    queryMenusOptions,
    useIsRouteExistQuery,
    useUserRoutesQuery
  };
}
