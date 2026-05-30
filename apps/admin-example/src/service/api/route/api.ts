import { createAdminRouteApi } from '@skyroc/web-admin-runtime';

import { request } from '../../request';

import { ROUTE_URLS } from './urls';

export const routeApi = createAdminRouteApi(request, {
  getConstantRoutes: ROUTE_URLS.GET_CONSTANT_ROUTES,
  getUserRoutes: ROUTE_URLS.GET_USER_ROUTES,
  isRouteExist: ROUTE_URLS.IS_ROUTE_EXIST
});

export const { fetchGetBackendRoutes, fetchIsRouteExist } = routeApi;
