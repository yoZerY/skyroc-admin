import process from 'node:process';
import { fileURLToPath } from 'node:url';

import { defineConfig, loadEnv } from 'vite';

import { createViteProxy } from './build/config/proxy';
import { getBuildTime } from './build/config/time';
import { setupVitePlugins } from './build/plugins';
import { createAdminBuildOptions, createAdminScssPreprocessorOptions } from './build/shared/admin-vite';

export default defineConfig(configEnv => {
  const viteEnv = loadEnv(configEnv.mode, process.cwd()) as unknown as Env.ImportMeta;

  const buildTime = getBuildTime();

  const enableProxy = configEnv.command === 'serve' && !configEnv.isPreview;

  return {
    base: viteEnv.VITE_BASE_URL,
    build: createAdminBuildOptions(),
    css: {
      preprocessorOptions: createAdminScssPreprocessorOptions(`@use "@/styles/scss/global.scss" as *;`)
    },
    define: {
      BUILD_TIME: JSON.stringify(buildTime)
    },
    plugins: setupVitePlugins(viteEnv, buildTime),
    preview: {
      port: 9725
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '~': fileURLToPath(new URL('./', import.meta.url))
      },
      dedupe: ['react', 'react-dom', 'react/jsx-dev-runtime', 'react/jsx-runtime']
    },
    server: {
      host: '0.0.0.0',
      open: true,
      port: 9527,
      proxy: createViteProxy(viteEnv, enableProxy),
      warmup: {
        clientFiles: ['./index.html', './src/{pages,components}/*']
      }
    }
  };
});
