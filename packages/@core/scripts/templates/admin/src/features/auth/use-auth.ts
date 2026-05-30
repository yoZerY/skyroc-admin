import { atomWithPartial, globalStore, setAtomValue } from '@skyroc/core-state';
import { cacheTabs, useMenus } from '@skyroc/web-admin-layouts';
import type { QueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { flushSync } from 'react-dom';

import { AUTH_QUERY_KEYS } from '@/service/api/auth/keys';
import { queryClient } from '@/service/queryClient';
import { localStg } from '@/utils/storage';

interface AuthState {
  /** 是否完成首轮认证初始化。 */
  initialized: boolean;
  /** 当前 access token，空值表示未登录。 */
  token: string | null;
}

const authAtom = atomWithPartial<AuthState>({
  initialized: false,
  token: getToken()
});

async function queryCurrentUserInfoOptions() {
  const { queryUserInfoOptions } = await import('@/service/api/auth/hooks');

  return queryUserInfoOptions();
}

export function getToken() {
  return localStg.get('token');
}

export function clearAuthStorage() {
  localStg.remove('token');
  localStg.remove('refreshToken');
}

export function setAuth(data: Api.Auth.LoginToken) {
  setAtomValue(authAtom, { token: data.token });

  localStg.set('token', data.token);
  localStg.set('refreshToken', data.refreshToken);
}

export function useAuth() {
  const [state, setState] = useAtom(authAtom, { store: globalStore });
  const { clearMenus, getHomeRoute, home, initMenus } = useMenus();
  const isLoggedIn = Boolean(state.token);
  const userInfo = queryClient.getQueryData<Api.Auth.UserInfo>(AUTH_QUERY_KEYS.USER_INFO);

  async function initAuth() {
    try {
      const userInfoQueryOptions = await queryCurrentUserInfoOptions();
      const data = (await queryClient.ensureQueryData(
        userInfoQueryOptions as Parameters<QueryClient['ensureQueryData']>[0]
      )) as Api.Auth.UserInfo;

      await initMenus(data);

      flushSync(() => {
        setState({ initialized: true });
      });

      return data;
    } catch {
      return null;
    }
  }

  function clearAuth() {
    if (userInfo) {
      localStg.set('lastLoginUserId', userInfo.userId);
    }

    queryClient.clear();

    setState({ token: '' });

    clearAuthStorage();
    clearMenus();
    cacheTabs();
  }

  return {
    token: state.token,
    userInfo,
    isLoggedIn,
    clearAuth,
    getHomeRoute,
    homeRoute: home,
    initMenus,
    initAuth,
    isAuthInitialized: state.initialized,
    setAuth
  };
}
