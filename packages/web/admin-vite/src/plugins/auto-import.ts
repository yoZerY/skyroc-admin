import AutoImport from 'unplugin-auto-import/vite';
import IconsResolver from 'unplugin-icons/resolver';

import type { AdminViteIconEnv, AdminViteIconOptions } from '../types';
import { resolveAdminIconOptions } from './icon-utils';

type AutoImportOptions = NonNullable<Parameters<typeof AutoImport>[0]>;

export interface SetupAdminAutoImportOptions extends AdminViteIconOptions {
  /** Whether Ant Design A-prefixed component auto import is enabled. */
  antd?: boolean;

  /** Directories scanned for local auto imports. */
  dirs?: AutoImportOptions['dirs'];

  /** Declaration file path, or false to disable dts generation. */
  dts?: AutoImportOptions['dts'];

  /** Import presets passed to unplugin-auto-import. */
  imports?: AutoImportOptions['imports'];

  /** Include patterns passed to unplugin-auto-import. */
  include?: AutoImportOptions['include'];

  /** Extra resolvers appended after the admin defaults. */
  resolvers?: AutoImportOptions['resolvers'];
}

const TSR_SPLIT_RE = /\.[tj]sx?(\?.*)?$/;

export function setupAdminAutoImport(env: AdminViteIconEnv, options: SetupAdminAutoImportOptions = {}) {
  const {
    antd = true,
    dirs = ['src/components/**', 'src/config.ts'],
    dts = 'src/types/auto-imports.d.ts',
    imports = ['react', { from: 'react', imports: ['FC'], type: true }, 'react-i18next', 'ahooks'],
    include = [TSR_SPLIT_RE],
    resolvers = []
  } = options;

  const iconOptions = resolveAdminIconOptions(env, options);

  return AutoImport({
    dirs,
    dts,
    imports,
    include,
    resolvers: [
      ...(antd ? [autoImportAntd] : []),
      IconsResolver({
        componentPrefix: iconOptions.iconPrefix,
        customCollections: [iconOptions.collectionName],
        extension: 'tsx',
        prefix: iconOptions.iconPrefix
      }),
      ...normalizeResolvers(resolvers)
    ]
  });
}

function autoImportAntd(componentName: string) {
  const pattern = /^A[A-Z]/;

  if (pattern.test(componentName)) {
    return { from: 'antd', name: componentName.slice(1) };
  }

  return null;
}

function normalizeResolvers(resolvers: AutoImportOptions['resolvers'] = []) {
  if (!Array.isArray(resolvers)) return [resolvers];

  return resolvers.flat();
}
