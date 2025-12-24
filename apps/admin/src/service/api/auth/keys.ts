/**
 * Auth module query and mutation keys
 */

export const AUTH_QUERY_KEYS = {
  USER_INFO: ['auth', 'userInfo'] as const
} as const;

export const AUTH_MUTATION_KEYS = {
  LOGIN: ['auth', 'login'] as const,
  REFRESH_TOKEN: ['auth', 'refreshToken'] as const
} as const;
