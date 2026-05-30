import { createAppRequest } from '@skyroc/service';
import type { CreateRequestOptions, RequestAdapter } from '@skyroc/service';
import { createQueryClient } from '@skyroc/service/query';
import type { CreateQueryClientOptions } from '@skyroc/service/query';

export type AdminRequestAuthStorageKey = 'refreshToken' | 'token';

export interface AdminRequestAuthStorage {
  /** 读取请求链路需要的认证 token。 */
  get(key: AdminRequestAuthStorageKey): string | null;
  /** 删除请求链路需要的认证 token。 */
  remove(key: AdminRequestAuthStorageKey): void;
}

export interface CreateAdminRequestAdapterOptions {
  /** 使用 refresh token 换取新 token。 */
  fetchRefreshToken(refreshToken: string): Promise<Api.Auth.LoginToken>;
  /** 获取当前路由路径。 */
  getCurrentPath(): string;
  /** 重定向到登录页。 */
  redirectToLogin(redirectPath?: string): void;
  /** 保存新 token。 */
  setAuth(tokens: Api.Auth.LoginToken): void;
  /** 展示错误消息。 */
  showErrorMessage: RequestAdapter['showErrorMessage'];
  /** 展示错误弹窗。 */
  showErrorModal: RequestAdapter['showErrorModal'];
  /** 认证持久化适配器。 */
  storage: AdminRequestAuthStorage;
  /** 国际化翻译函数。 */
  t: RequestAdapter['t'];
}

export interface CreateAdminQueryClientOptions extends CreateQueryClientOptions {
  /** 是否开发环境，默认关闭错误日志。 */
  isDev?: boolean;
}

export interface AdminRequestInstance {
  /** 发起 admin 后端请求。 */
  <T = unknown>(config: { url: string; [key: string]: unknown }): Promise<T>;
  /** 取消当前实例收集到的全部请求。 */
  cancelAllRequest(): void;
  /** 请求实例运行时状态。 */
  state: Record<string, unknown>;
}

export type CreateAdminRequestOptions = CreateRequestOptions;

export function createAdminRequestAdapter(options: CreateAdminRequestAdapterOptions): RequestAdapter {
  return {
    getCurrentPath() {
      return options.getCurrentPath();
    },

    getRefreshToken() {
      return options.storage.get('refreshToken') || null;
    },

    getToken() {
      return options.storage.get('token') || null;
    },

    redirectToLogin(redirectPath?: string) {
      options.redirectToLogin(redirectPath);
    },

    resetAuth() {
      options.storage.remove('token');
      options.storage.remove('refreshToken');
    },

    setAuth(tokens) {
      options.setAuth({ refreshToken: tokens.refreshToken, token: tokens.token });
    },

    showErrorMessage(msg: string, onClose?: () => void) {
      options.showErrorMessage(msg, onClose);
    },

    showErrorModal(modalOptions) {
      options.showErrorModal(modalOptions);
    },

    t(key: string) {
      return options.t(key);
    },

    async fetchRefreshToken(refreshToken: string) {
      const data = await options.fetchRefreshToken(refreshToken);

      return { refreshToken: data.refreshToken, token: data.token };
    }
  };
}

export function createAdminRequest(options: CreateAdminRequestOptions): AdminRequestInstance {
  return createAppRequest(options) as AdminRequestInstance;
}

export function createAdminQueryClient(options: CreateAdminQueryClientOptions = {}) {
  const { isDev = false, mutationCache, queryCache, ...rest } = options;

  function handleError(error: unknown) {
    if (isDev) {

    }
  }

  return createQueryClient({
    ...rest,
    mutationCache: {
      onError: handleError,
      ...mutationCache
    },
    queryCache: {
      onError: handleError,
      ...queryCache
    }
  });
}
