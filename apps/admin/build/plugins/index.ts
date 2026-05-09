import { setupAdminVitePlugins } from '../shared/admin-vite';

export function setupVitePlugins(viteEnv: Env.ImportMeta, buildTime: string) {
  return setupAdminVitePlugins({ buildTime, env: viteEnv });
}
