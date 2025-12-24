import { atom, useAtomValue } from 'jotai';

import { useUserInfoQuery } from '@/service/api';
import { localStg } from '@/utils/storage';

import { globalStore } from '../jotai/store';
import { useMenus } from '../menus/use-menus';

import { getToken } from './shared';

const initToken = getToken();

const authAtom = atom(initToken);

/**
 * - 为了在axios的拦截器中使用 单独使用`globalStore`的set方法进行操作
 */
export const setAuth = (data: Api.Auth.LoginToken) => {
  globalStore.set(authAtom, data.token);

  localStg.set('token', data.token);

  localStg.set('refreshToken', data.refreshToken);
};

export const useAuth = () => {
  const [auth] = useAtomValue(authAtom);

  const isLoggedIn = Boolean(auth);

  const { data: userInfo, refetch: refetchUserInfo } = useUserInfoQuery();

  const isAuthInitialized = Boolean(userInfo);

  const { initMenus } = useMenus();

  async function initAuth() {
    const { data: info, error } = await refetchUserInfo();

    if (error) {
      return null;
    }

    await initMenus();

    return info as Api.Auth.UserInfo;
  }

  return {
    token: auth,
    userInfo,
    isLoggedIn,
    initMenus,
    initAuth,
    isAuthInitialized,
    setAuth
  };
};
