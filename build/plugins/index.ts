import { devtools } from '@tanstack/devtools-vite';
import react from '@vitejs/plugin-react';

import { setupAutoImport } from './auto-import';
import { setupRouterPlugins } from './router';

export function setupVitePlugins(viteEnv: Env.ImportMeta, buildTime: string) {
  return [
    /** - TanStack DevTools */
    devtools(),
    /** - TanStack Router */
    setupRouterPlugins(),
    /** - React */
    react(),
    /** - Auto Import */
    setupAutoImport()
  ];
}
