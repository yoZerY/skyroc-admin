import { devtools } from '@tanstack/devtools-vite';
import react from '@vitejs/plugin-react';
import progress from 'vite-plugin-progress';

import { setupAutoImport } from './auto-import';
import { setupRouterPlugins } from './router';
import { setupUnocss } from './unocss';
import { setupUnPluginIcon } from './unplugin-icon';

export function setupVitePlugins(viteEnv: Env.ImportMeta, buildTime: string) {
  return [
    /** - TanStack DevTools */
    devtools(),

    /** - TanStack Router */
    setupRouterPlugins(),
    /** - React */
    react({
      babel: {
        plugins: ['babel-plugin-react-compiler']
      }
    }),
    // setupUnocss(viteEnv),
    // ...setupUnPluginIcon(viteEnv),
    setupAutoImport(),
    progress()
  ];
}
