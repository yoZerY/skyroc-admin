import { useMutation, useQuery } from '@tanstack/react-query';

import { localStg } from '@/utils/storage';

import { fetchGetUserInfo, fetchLogin, fetchRefreshToken } from './api';
import { AUTH_MUTATION_KEYS, AUTH_QUERY_KEYS } from './keys';

/**
 * Login mutation hook
 *
 * @example
 *   const { mutate: login, isPending } = useLoginMutation();
 *   login({ userName: 'admin', password: '123456' });
 */
export function useLoginMutation() {
  return useMutation({
    mutationFn: (params: Api.Auth.LoginParams) => fetchLogin(params),
    retry: false
  });
}

/**
 * Get user info query hook
 *
 * @example
 *   const { data: userInfo, isLoading } = useUserInfoQuery();
 */
export function useUserInfoQuery() {
  const hasToken = Boolean(localStg.get('token'));

  return useQuery({
    enabled: hasToken,
    gcTime: Infinity,
    placeholderData: () => ({
      buttons: [],
      roles: [],
      userId: '',
      userName: ''
    }),
    queryFn: fetchGetUserInfo,
    queryKey: AUTH_QUERY_KEYS.USER_INFO,
    retry: false,
    staleTime: Infinity
  });
}

/**
 * Refresh token mutation hook
 *
 * @example
 *   const { mutate: refreshToken } = useRefreshTokenMutation();
 *   refreshToken('your-refresh-token');
 */
export function useRefreshTokenMutation() {
  return useMutation({
    mutationFn: (refreshToken: string) => fetchRefreshToken(refreshToken),
    mutationKey: AUTH_MUTATION_KEYS.REFRESH_TOKEN
  });
}
