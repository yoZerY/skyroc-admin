import { atomWithPartial, globalStore, setAtomValue } from '@skyroc/core-state';
import type { PartialUpdater } from '@skyroc/core-state';
import type { QueryClient, QueryKey } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import type { WritableAtom } from 'jotai';
import { flushSync } from 'react-dom';

export type AdminAuthStorageKey = 'lastLoginUserId' | 'refreshToken' | 'token';

export interface AdminAuthStorage {
  /** 读取认证相关持久化值。 */
  get(key: AdminAuthStorageKey): string | null;
  /** 删除认证相关持久化值。 */
  remove(key: AdminAuthStorageKey): void;
  /** 写入认证相关持久化值。 */
  set(key: AdminAuthStorageKey, value: string): void;
}

export interface AdminAuthState {
  /** 当前 access token，空值表示未登录。 */
  token: string | null;
  /** 是否完成首轮认证初始化。 */
  initialized: boolean;
}

export interface AdminAuthLayoutRuntime<HomeRoute extends string = string> {
  /** 清空当前用户菜单运行时状态。 */
  clearMenus(): void;
  /** 读取当前用户首页路由。 */
  getHomeRoute(): HomeRoute;
  /** 当前用户首页路由。 */
  home: HomeRoute;
  /** 按用户权限初始化菜单。 */
  initMenus(userInfo?: Api.Auth.UserInfo | null): Promise<void> | void;
}

export interface CreateAdminAuthRuntimeOptions<HomeRoute extends string = string> {
  /** 登出时缓存已打开页签的可选回调。 */
  cacheTabs?: () => void;
  /** 查询当前登录用户信息的 Query Options 工厂。 */
  queryUserInfoOptions: () => object;
  /** 当前登录用户信息的 query key。 */
  userInfoQueryKey?: QueryKey;
  /** 应用共享 QueryClient。 */
  queryClient: QueryClient;
  /** 认证持久化适配器。 */
  storage: AdminAuthStorage;
  /** 布局菜单运行时 hook，由应用层注入。 */
  useLayoutRuntime: () => AdminAuthLayoutRuntime<HomeRoute>;
}

export interface AdminAuthRuntimeContext<HomeRoute extends string = string> {
  /** 清空认证状态和菜单状态。 */
  clearAuth(): void;
  /** 当前用户首页路由读取函数。 */
  getHomeRoute(): HomeRoute;
  /** 当前用户首页路由。 */
  homeRoute: HomeRoute;
  /** 初始化认证和菜单。 */
  initAuth(): Promise<Api.Auth.UserInfo | null>;
  /** 初始化菜单。 */
  initMenus(userInfo?: Api.Auth.UserInfo | null): Promise<void> | void;
  /** 是否完成认证初始化。 */
  isAuthInitialized: boolean;
  /** 是否已登录。 */
  isLoggedIn: boolean;
  /** 保存认证 token。 */
  setAuth(data: Api.Auth.LoginToken): void;
  /** 当前 access token。 */
  token: string | null;
  /** 当前登录用户信息。 */
  userInfo?: Api.Auth.UserInfo;
}

export interface AdminAuthRuntime<HomeRoute extends string = string> {
  /** 认证状态 atom，暴露给 devtools 或特殊集成场景。 */
  authAtom: WritableAtom<AdminAuthState, [PartialUpdater<AdminAuthState>], void>;
  /** 清理认证持久化信息。 */
  clearAuthStorage(): void;
  /** 从持久化层读取 access token。 */
  getToken(): string | null;
  /** 保存认证 token。 */
  setAuth(data: Api.Auth.LoginToken): void;
  /** 认证 hook。 */
  useAuth(): AdminAuthRuntimeContext<HomeRoute>;
}

export function createAdminAuthRuntime<HomeRoute extends string = string>(
  options: CreateAdminAuthRuntimeOptions<HomeRoute>
): AdminAuthRuntime<HomeRoute> {
  const userInfoQueryKey = options.userInfoQueryKey ?? ['auth', 'userInfo'];

  function getToken() {
    return options.storage.get('token');
  }

  function clearAuthStorage() {
    options.storage.remove('token');
    options.storage.remove('refreshToken');
  }

  const authAtom = atomWithPartial<AdminAuthState>({
    initialized: false,
    token: getToken()
  });

  function setAuth(data: Api.Auth.LoginToken) {
    setAtomValue(authAtom, { token: data.token });

    options.storage.set('token', data.token);
    options.storage.set('refreshToken', data.refreshToken);
  }

  function useAuth() {
    const [state, setState] = useAtom(authAtom, { store: globalStore });
    const { clearMenus, getHomeRoute, home, initMenus } = options.useLayoutRuntime();
    const isLoggedIn = Boolean(state.token);
    const userInfo = options.queryClient.getQueryData<Api.Auth.UserInfo>(userInfoQueryKey);

    async function initAuth() {
      try {
        const data = (await options.queryClient.ensureQueryData(
          options.queryUserInfoOptions() as Parameters<QueryClient['ensureQueryData']>[0]
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
        options.storage.set('lastLoginUserId', userInfo.userId);
      }

      options.queryClient.clear();

      setState({ token: '' });

      clearAuthStorage();
      clearMenus();
      options.cacheTabs?.();
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

  return {
    authAtom,
    clearAuthStorage,
    getToken,
    setAuth,
    useAuth
  };
}
