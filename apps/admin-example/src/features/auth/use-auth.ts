import { cacheTabs, useMenus } from '@skyroc/web-admin-layouts';
import {
  ADMIN_AUTH_QUERY_KEYS,
  createAdminAuthRuntime
} from '@skyroc/web-admin-runtime';
import type { AdminAuthStorage } from '@skyroc/web-admin-runtime';

import { queryUserInfoOptions } from '@/service/api';
import { queryClient } from '@/service/queryClient';
import { localStg } from '@/utils/storage';

const authStorage: AdminAuthStorage = {
  get(key) {
    return localStg.get(key);
  },

  remove(key) {
    localStg.remove(key);
  },

  set(key, value) {
    localStg.set(key, value);
  }
};

const authRuntime = createAdminAuthRuntime<Router.RoutePath>({
  cacheTabs,
  queryClient,
  queryUserInfoOptions,
  storage: authStorage,
  useLayoutRuntime: useMenus,
  userInfoQueryKey: ADMIN_AUTH_QUERY_KEYS.USER_INFO
});

export const clearAuthStorage = authRuntime.clearAuthStorage;
export const getToken = authRuntime.getToken;
export const setAuth = authRuntime.setAuth;
export const useAuth = authRuntime.useAuth;
