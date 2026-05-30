import { QueryClient } from '@tanstack/react-query';
import { describe, expect, it, vi } from 'vitest';

import {
  ADMIN_AUTH_MUTATION_KEYS,
  ADMIN_AUTH_QUERY_KEYS,
  ADMIN_ROUTE_QUERY_KEYS,
  createAdminAuthApi,
  createAdminAuthQueries,
  createAdminRouteApi,
  createAdminRouteQueries
} from '../src/api-runtime';
import type { AdminRequest } from '../src/api-runtime';

describe('admin api runtime', () => {
  it('creates auth api methods from configurable urls', async () => {
    const request = vi.fn(async config => config) as unknown as AdminRequest;
    const api = createAdminAuthApi(request, {
      error: '/custom/error',
      getUserInfo: '/custom/user',
      login: '/custom/login',
      refreshToken: '/custom/refresh'
    });

    await api.fetchLogin({ password: '123456', userName: 'admin' });
    await api.fetchGetUserInfo();
    await api.fetchRefreshToken('refresh-token');
    await api.fetchCustomBackendError('E001', 'broken');

    expect(request).toHaveBeenNthCalledWith(1, {
      data: { password: '123456', userName: 'admin' },
      method: 'post',
      url: '/custom/login'
    });
    expect(request).toHaveBeenNthCalledWith(2, { url: '/custom/user' });
    expect(request).toHaveBeenNthCalledWith(3, {
      data: { refreshToken: 'refresh-token' },
      method: 'post',
      url: '/custom/refresh'
    });
    expect(request).toHaveBeenNthCalledWith(4, {
      params: { code: 'E001', msg: 'broken' },
      url: '/custom/error'
    });
  });

  it('creates route api methods from configurable urls', async () => {
    const request = vi.fn(async config => config) as unknown as AdminRequest;
    const api = createAdminRouteApi(request, {
      getUserRoutes: '/custom/routes',
      isRouteExist: '/custom/route-exists'
    });

    await api.fetchGetBackendRoutes();
    await api.fetchIsRouteExist('home');

    expect(request).toHaveBeenNthCalledWith(1, { url: '/custom/routes' });
    expect(request).toHaveBeenNthCalledWith(2, {
      params: { routeName: 'home' },
      url: '/custom/route-exists'
    });
  });

  it('creates auth query options with stable template keys', () => {
    const authApi = {
      fetchCustomBackendError: vi.fn(),
      fetchGetUserInfo: vi.fn(),
      fetchLogin: vi.fn(),
      fetchRefreshToken: vi.fn()
    };
    const queries = createAdminAuthQueries({
      authApi,
      useAuthStatus: () => ({ isLoggedIn: true })
    });

    const options = queries.queryUserInfoOptions();

    expect(options.queryKey).toEqual(ADMIN_AUTH_QUERY_KEYS.USER_INFO);
    expect(options.gcTime).toBe(Infinity);
    expect(options.staleTime).toBe(Infinity);
    expect(options.retry).toBe(false);
  });

  it('creates route query options with dev cache policy and auth gate', () => {
    const queryClient = new QueryClient();
    queryClient.setQueryData(ADMIN_AUTH_QUERY_KEYS.USER_INFO, { userId: 'u1' });

    const routeApi = {
      fetchGetBackendRoutes: vi.fn(),
      fetchIsRouteExist: vi.fn()
    };
    const queries = createAdminRouteQueries({
      isDev: true,
      queryClient,
      routeApi
    });

    const options = queries.queryMenusOptions();

    expect(options.enabled).toBe(true);
    expect(options.queryKey).toEqual(ADMIN_ROUTE_QUERY_KEYS.USER_ROUTES);
    expect(options.gcTime).toBe(1000 * 60 * 5);
    expect(options.staleTime).toBe(1000 * 10);
  });

  it('creates auth mutation keys for login and refresh token', () => {
    expect(ADMIN_AUTH_MUTATION_KEYS.LOGIN).toEqual(['auth', 'login']);
    expect(ADMIN_AUTH_MUTATION_KEYS.REFRESH_TOKEN).toEqual(['auth', 'refreshToken']);
  });
});
