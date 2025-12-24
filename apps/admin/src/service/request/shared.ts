import { setAuth } from '@/features/auth/use-auth';
import { router } from '@/features/router';
import { localStg } from '@/utils/storage';

import { fetchRefreshToken } from '../api';

import type { RequestInstanceState } from './type';

export function getAuthorization() {
  const token = localStg.get('token');
  const Authorization = token ? `Bearer ${token}` : null;

  return Authorization;
}

/**
 * refresh token
 */
export async function handleRefreshToken() {
  const refreshToken = localStg.get('refreshToken') || '';
  try {
    const data = await fetchRefreshToken(refreshToken);

    setAuth(data);
    return true;
  } catch {
    const location = router.state.location;
    const fullPath = location.pathname + location.search + location.hash;
    // router.navigate({ to: '/login-out', search: { redirect: fullPath } });
    return false;
  }
}

export async function handleExpiredRequest(state: RequestInstanceState) {
  if (!state.refreshTokenPromise) {
    state.refreshTokenPromise = handleRefreshToken();
  }

  const success = await state.refreshTokenPromise;

  setTimeout(() => {
    state.refreshTokenPromise = null;
  }, 1000);

  return success;
}

export function showErrorMsg(state: RequestInstanceState, message: string) {
  if (!state.errMsgStack?.length) {
    state.errMsgStack = [];
  }

  const isExist = state.errMsgStack.includes(message);

  if (!isExist) {
    state.errMsgStack.push(message);

    showErrorMessage({
      content: message,
      onClose: () => {
        state.errMsgStack = state.errMsgStack.filter(msg => msg !== message);

        setTimeout(() => {
          state.errMsgStack = [];
        }, 5000);
      }
    });
  }
}
