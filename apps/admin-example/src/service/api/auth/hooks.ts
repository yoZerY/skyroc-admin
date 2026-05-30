import { createAdminAuthQueries } from '@skyroc/web-admin-runtime';

import { useAuth } from '@/features/auth/use-auth';

import { authApi } from './api';

const authQueries = createAdminAuthQueries({
  authApi,
  useAuthStatus: () => useAuth()
});

export const queryUserInfoOptions = authQueries.queryUserInfoOptions;

export function useLoginMutation() {
  return authQueries.useLoginMutation();
}

export function useUserInfoQuery() {
  return authQueries.useUserInfoQuery();
}

export function useRefreshTokenMutation() {
  return authQueries.useRefreshTokenMutation();
}
