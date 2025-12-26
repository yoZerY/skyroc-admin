import fg from 'fast-glob';
import { defineConfig } from 'tsdown';

import pkg from './package.json' with { type: 'json' };

export default defineConfig({
  alias: {
    '@': './src'
  },
  clean: true,
  dts: true,
  entry: ['src/index.ts', ...fg.sync('src/components/**/index.{ts,tsx}'), 'src/hooks/index.ts', 'src/utils/index.ts'],
  external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {}), 'react/jsx-runtime'],
  hooks: {
    'build:before': () => {
      console.log('📦 Building @soybean/ui with Tsdown...');
    },
    'build:done': () => {
      console.log('✅ Build completed successfully!');
      console.log('📦 Generated files in ./dist/');
    }
  },
  minify: false,
  platform: 'neutral',
  sourcemap: false,
  unbundle: true
});
