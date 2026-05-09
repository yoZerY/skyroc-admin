import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders';
import { presetIcons } from '@unocss/preset-icons';
import unocss from '@unocss/vite';

import type { AdminViteIconEnv, AdminViteIconOptions } from '../types';
import { resolveAdminIconOptions } from './icon-utils';

export interface SetupAdminUnocssOptions extends AdminViteIconOptions {
  /** Extra CSS properties assigned to generated icon classes. */
  extraProperties?: Record<string, string>;

  /** Whether missing icons should warn in terminal. */
  warn?: boolean;
}

export function setupAdminUnocss(env: AdminViteIconEnv, options: SetupAdminUnocssOptions = {}) {
  const { extraProperties = { display: 'inline-block' }, warn = true } = options;
  const iconOptions = resolveAdminIconOptions(env, options);

  return unocss({
    presets: [
      presetIcons({
        collections: {
          [iconOptions.collectionName]: FileSystemIconLoader(iconOptions.localIconPath, iconOptions.transformSvg)
        },
        extraProperties,
        prefix: `${iconOptions.iconPrefix}-`,
        scale: iconOptions.scale,
        warn
      })
    ]
  });
}
