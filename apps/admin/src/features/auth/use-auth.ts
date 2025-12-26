import { atom, useAtom } from 'jotai';
import { flushSync } from 'react-dom';

import { cacheTabs } from '@/layouts/admin-layout/state/tabs/use-admin-tab';
import { AUTH_QUERY_KEYS, queryUserInfoOptions } from '@/service/api';
import { queryClient } from '@/service/queryClient';
import { localStg } from '@/utils/storage';

import { globalStore } from '../jotai/store';
import { useMenus } from '../menus/use-menus';

import { clearAuthStorage, getToken } from './shared';

const initToken = getToken();

const initState = {
  token: initToken,
  initialized: false
};

const authAtom = atom(initState, (get, set, update: Partial<typeof initState>) => {
  set(authAtom, { ...get(authAtom), ...update });
});

/**
 * - 为了在axios的拦截器中使用 单独使用`globalStore`的set方法进行操作
 */
export const setAuth = (data: Api.Auth.LoginToken) => {
  globalStore.set(authAtom, { token: data.token });

  localStg.set('token', data.token);

  localStg.set('refreshToken', data.refreshToken);
};

export function clearAuth() {
  const userInfo = queryClient.getQueryData<Api.Auth.UserInfo>(AUTH_QUERY_KEYS.USER_INFO);

  if (userInfo) {
    localStg.set('lastLoginUserId', userInfo.userId);
  }

  queryClient.clear();

  globalStore.set(authAtom, { token: '' });

  clearAuthStorage();

  cacheTabs();
}

export const useAuth = () => {
  const [state, setState] = useAtom(authAtom);

  const isLoggedIn = Boolean(state.token);

  const userInfo = queryClient.getQueryData<Api.Auth.UserInfo>(AUTH_QUERY_KEYS.USER_INFO);

  const { initMenus } = useMenus();

  async function initAuth() {
    try {
      const data = await queryClient.ensureQueryData(queryUserInfoOptions());

      await initMenus();

      flushSync(() => {
        setState({ initialized: true });
      });

      return data;
    } catch {
      return null;
    }
  }

  return {
    token: state.token,
    userInfo,
    isLoggedIn,
    initMenus,
    initAuth,
    isAuthInitialized: state.initialized,
    setAuth
  };
};
