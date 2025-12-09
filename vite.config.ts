import process from 'node:process';
import { fileURLToPath } from 'node:url';

import { defineConfig, loadEnv } from 'vite';

import { getBuildTime } from './build/config/time';
import { setupVitePlugins } from './build/plugins';

export default defineConfig(configEnv => {
  const viteEnv = loadEnv(configEnv.mode, process.cwd()) as unknown as Env.ImportMeta;

  const buildTime = getBuildTime();

  return {
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
      }
    },
    server: {
      host: '0.0.0.0',
      open: true,
      port: 9527,
      warmup: {
        clientFiles: ['./index.html', './src/{pages,components}/*']
      }
    }
  };
});
