import { describe, expect, it, vi } from 'vitest';

import { createAdminQueryClient, createAdminRequestAdapter } from '../src/request-runtime';

describe('admin request runtime', () => {
  it('creates a request adapter from platform callbacks', async () => {
    const data = {
      refreshToken: 'old-refresh',
      token: 'old-token'
    };
    const storage = {
      get: vi.fn((key: 'refreshToken' | 'token') => data[key]),
      remove: vi.fn()
    };
    const adapter = createAdminRequestAdapter({
      fetchRefreshToken: vi.fn(async () => ({ refreshToken: 'new-refresh', token: 'new-token' })),
      getCurrentPath: vi.fn(() => '/current'),
      redirectToLogin: vi.fn(),
      setAuth: vi.fn(),
      showErrorMessage: vi.fn(),
      showErrorModal: vi.fn(),
      storage,
      t: vi.fn(key => `t:${key}`)
    });

    await expect(adapter.fetchRefreshToken('old-refresh')).resolves.toEqual({
      refreshToken: 'new-refresh',
      token: 'new-token'
    });
    adapter.setAuth({ refreshToken: 'new-refresh', token: 'new-token' });
    adapter.resetAuth();

    expect(adapter.getCurrentPath()).toBe('/current');
    expect(adapter.getToken()).toBe('old-token');
    expect(adapter.getRefreshToken()).toBe('old-refresh');
    expect(storage.remove).toHaveBeenCalledWith('token');
    expect(storage.remove).toHaveBeenCalledWith('refreshToken');
  });

  it('creates a query client with optional dev error logging', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    const client = createAdminQueryClient({ isDev: true });
    const error = new Error('query failed');

    client.getQueryCache().config.onError?.(error, {} as never);
    client.getMutationCache().config.onError?.(error, undefined, undefined, {} as never);

    expect(consoleError).toHaveBeenCalledTimes(2);

    consoleError.mockRestore();
  });
});
