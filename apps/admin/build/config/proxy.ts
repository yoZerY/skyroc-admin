import { createServiceConfig } from '../../src/utils/service';
import { createAdminViteProxy } from '../shared/admin-vite';

/**
 * Set http proxy
 *
 * @param env - The current env
 * @param enable - If enable http proxy
 */
export function createViteProxy(env: Env.ImportMeta, enable: boolean) {
  return createAdminViteProxy({
    enabled: enable && env.VITE_HTTP_PROXY === 'Y',
    enableLog: env.VITE_PROXY_LOG === 'Y',
    serviceConfig: createServiceConfig(env)
  });
}
