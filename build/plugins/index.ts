import { devtools } from '@tanstack/devtools-vite';
import react from '@vitejs/plugin-react';
import inspect from 'vite-plugin-inspect';
import removeConsole from 'vite-plugin-remove-console';

import { setupAutoImport } from './auto-import';
import { setupHtmlPlugin } from './html';
import { setupProjectInfo } from './info';
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
        plugins: ['babel-plugin-react-compiler'],
        presets: ['jotai/babel/preset']
      }
    }),
    setupUnocss(viteEnv),
    ...setupUnPluginIcon(viteEnv),
    setupAutoImport(viteEnv),
    setupHtmlPlugin(buildTime),
    inspect(),
    removeConsole(),
    setupProjectInfo()
  ];
}
