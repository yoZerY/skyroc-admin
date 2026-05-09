import { setupAdminHtmlPlugin } from '../shared/admin-vite';

export function setupHtmlPlugin(buildTime: string) {
  return setupAdminHtmlPlugin({ buildTime });
}
