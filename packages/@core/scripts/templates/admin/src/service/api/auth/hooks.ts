import { queryOptions, useMutation, useQuery } from '@tanstack/react-query';

import { useAuth } from '@/features/auth/use-auth';

import { fetchGetUserInfo, fetchLogin } from './api';
import { AUTH_MUTATION_KEYS, AUTH_QUERY_KEYS } from './keys';

export function queryUserInfoOptions(enabled = true) {
  return queryOptions({
    enabled,
    gcTime: Infinity,
    queryFn: fetchGetUserInfo,
    queryKey: AUTH_QUERY_KEYS.USER_INFO,
    retry: false,
    staleTime: Infinity
  });
}

export function useLoginMutation() {
  return useMutation({
    mutationFn: (params: Api.Auth.LoginParams) => fetchLogin(params),
    mutationKey: AUTH_MUTATION_KEYS.LOGIN,
    retry: false
  });
}

export function useUserInfoQuery() {
  const { isLoggedIn } = useAuth();
  const query = queryUserInfoOptions(isLoggedIn);

  return useQuery(query);
}
