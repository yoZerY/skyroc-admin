import { createAdminAuthApi } from '@skyroc/web-admin-runtime';

import { request } from '../../request';

import { AUTH_URLS } from './urls';

export const authApi = createAdminAuthApi(request, {
  error: AUTH_URLS.ERROR,
  getUserInfo: AUTH_URLS.GET_USER_INFO,
  login: AUTH_URLS.LOGIN,
  refreshToken: AUTH_URLS.REFRESH_TOKEN
});

export const { fetchCustomBackendError, fetchGetUserInfo, fetchLogin, fetchRefreshToken } = authApi;
