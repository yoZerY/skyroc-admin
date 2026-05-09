import { devtools } from '@tanstack/devtools-vite';
import inspect from 'vite-plugin-inspect';
import removeConsole from 'vite-plugin-remove-console';
import type { PluginOption } from 'vite';

import type { AdminViteIconEnv, AdminVitePluginAppendOptions, MaybePluginConfig } from '../types';
import { type SetupAdminAutoImportOptions, setupAdminAutoImport } from './auto-import';
import { type SetupAdminHtmlPluginOptions, setupAdminHtmlPlugin } from './html';
import { type SetupAdminProjectInfoOptions, setupAdminProjectInfo } from './info';
import { type SetupAdminReactPluginOptions, setupAdminReactPlugin } from './react';
import { type SetupAdminRouterPluginOptions, setupAdminRouterPlugins } from './router';
import { type SetupAdminUnocssOptions, setupAdminUnocss } from './unocss';
import { type SetupAdminUnpluginIconOptions, setupAdminUnpluginIcon } from './unplugin-icon';

type InspectOptions = NonNullable<Parameters<typeof inspect>[0]>;
type RemoveConsoleOptions = NonNullable<Parameters<typeof removeConsole>[0]>;

export * from './auto-import';
export * from './html';
export * from './info';
export * from './react';
export * from './router';
export * from './unocss';
export * from './unplugin-icon';

export interface SetupAdminVitePluginsConfig extends AdminVitePluginAppendOptions {
  /** Auto import plugin config. */
  autoImport?: MaybePluginConfig<SetupAdminAutoImportOptions>;

  /** TanStack DevTools Vite plugin switch. */
  devtools?: boolean;

  /** Html build meta plugin config. */
  html?: MaybePluginConfig<Partial<SetupAdminHtmlPluginOptions>>;

  /** Vite inspect plugin config. */
  inspect?: MaybePluginConfig<InspectOptions>;

  /** Project terminal info plugin config. */
  projectInfo?: MaybePluginConfig<SetupAdminProjectInfoOptions>;

  /** React plugin config. */
  react?: MaybePluginConfig<SetupAdminReactPluginOptions>;

  /** remove-console plugin config. */
  removeConsole?: MaybePluginConfig<RemoveConsoleOptions>;

  /** TanStack Router plugin config. */
  router?: MaybePluginConfig<SetupAdminRouterPluginOptions>;

  /** UnoCSS icon preset config. */
  unocss?: MaybePluginConfig<SetupAdminUnocssOptions>;

  /** Local svg and icon component plugin config. */
  unpluginIcon?: MaybePluginConfig<SetupAdminUnpluginIconOptions>;
}

export interface SetupAdminVitePluginsOptions {
  /** Build time injected into html when html plugin is enabled. */
  buildTime: string;

  /** Loaded Vite environment used by icon-related plugins. */
  env: AdminViteIconEnv;

  /** Built-in plugin switches, options, and custom plugin insertion points. */
  plugins?: SetupAdminVitePluginsConfig;
}

export function setupAdminVitePlugins(options: SetupAdminVitePluginsOptions) {
  const { buildTime, env, plugins: pluginConfig = {} } = options;
  const plugins: PluginOption[] = [...(pluginConfig.prependPlugins ?? [])];

  if (pluginConfig.devtools !== false) {
    plugins.push(devtools());
  }

  if (pluginConfig.router !== false) {
    plugins.push(...setupAdminRouterPlugins(resolvePluginOptions(pluginConfig.router)));
  }

  if (pluginConfig.react !== false) {
    plugins.push(setupAdminReactPlugin(resolvePluginOptions(pluginConfig.react)));
  }

  if (pluginConfig.unocss !== false) {
    plugins.push(setupAdminUnocss(env, resolvePluginOptions(pluginConfig.unocss)));
  }

  if (pluginConfig.unpluginIcon !== false) {
    plugins.push(...setupAdminUnpluginIcon(env, resolvePluginOptions(pluginConfig.unpluginIcon)));
  }

  if (pluginConfig.autoImport !== false) {
    plugins.push(setupAdminAutoImport(env, resolvePluginOptions(pluginConfig.autoImport)));
  }

  if (pluginConfig.html !== false) {
    plugins.push(
      setupAdminHtmlPlugin({
        buildTime,
        ...resolvePluginOptions(pluginConfig.html)
      })
    );
  }

  if (pluginConfig.inspect !== false) {
    plugins.push(inspect(resolvePluginOptions(pluginConfig.inspect)));
  }

  if (pluginConfig.removeConsole !== false) {
    plugins.push(removeConsole(resolvePluginOptions(pluginConfig.removeConsole)));
  }

  if (pluginConfig.projectInfo !== false) {
    plugins.push(setupAdminProjectInfo(resolvePluginOptions(pluginConfig.projectInfo)));
  }

  plugins.push(...(pluginConfig.appendPlugins ?? []));

  return plugins;
}

function resolvePluginOptions<T>(config: MaybePluginConfig<T> | undefined): T | undefined {
  if (typeof config === 'object') return config;

  return undefined;
}
