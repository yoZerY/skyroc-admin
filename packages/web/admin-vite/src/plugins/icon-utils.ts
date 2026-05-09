import path from 'node:path';
import process from 'node:process';

import type { AdminViteIconEnv, AdminViteIconOptions } from '../types';

export interface ResolvedAdminViteIconOptions {
  /** Resolved local icon collection name. */
  collectionName: string;

  /** CSS class prefix for icon presets. */
  iconPrefix: string;

  /** File system directory for local svg icons. */
  localIconPath: string;

  /** Local icon prefix used to derive the icon collection name and svg symbol id. */
  localIconPrefix: string;

  /** Scale applied to generated icons. */
  scale: number;

  /** Svg transformer before icons are registered. */
  transformSvg: (svg: string) => string;
}

export function resolveAdminIconOptions(
  env: AdminViteIconEnv,
  options: AdminViteIconOptions = {}
): ResolvedAdminViteIconOptions {
  const iconPrefix = options.iconPrefix ?? env.VITE_ICON_PREFIX;
  const localIconPrefix = options.localIconPrefix ?? env.VITE_ICON_LOCAL_PREFIX;

  return {
    collectionName: options.collectionName ?? localIconPrefix.replace(`${iconPrefix}-`, ''),
    iconPrefix,
    localIconPath: options.localIconPath ?? path.join(process.cwd(), 'src/assets/svg-icon'),
    localIconPrefix,
    scale: options.scale ?? 1,
    transformSvg: options.transformSvg ?? (svg => svg.replace(/^<svg\s/, '<svg width="1em" height="1em" '))
  };
}
