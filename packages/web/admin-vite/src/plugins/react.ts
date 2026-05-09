import react from '@vitejs/plugin-react';

type ReactPluginOptions = NonNullable<Parameters<typeof react>[0]>;

export interface SetupAdminReactPluginOptions extends ReactPluginOptions {
  /** Babel plugins prepended before custom babel plugins. */
  defaultBabelPlugins?: string[];

  /** Babel presets prepended before custom babel presets. */
  defaultBabelPresets?: string[];
}

export function setupAdminReactPlugin(options: SetupAdminReactPluginOptions = {}) {
  const {
    babel,
    defaultBabelPlugins = ['babel-plugin-react-compiler'],
    defaultBabelPresets = ['jotai/babel/preset'],
    ...restOptions
  } = options;

  return react({
    ...restOptions,
    babel: createBabelOptions(babel, defaultBabelPlugins, defaultBabelPresets)
  });
}

function createBabelOptions(
  babel: ReactPluginOptions['babel'],
  defaultBabelPlugins: string[],
  defaultBabelPresets: string[]
): ReactPluginOptions['babel'] {
  if (typeof babel === 'function') {
    return (id, options) => mergeBabelOptions(babel(id, options), defaultBabelPlugins, defaultBabelPresets);
  }

  return mergeBabelOptions(babel, defaultBabelPlugins, defaultBabelPresets);
}

function mergeBabelOptions(
  babel: Exclude<ReactPluginOptions['babel'], Function> | undefined,
  defaultBabelPlugins: string[],
  defaultBabelPresets: string[]
) {
  const babelOptions = babel ?? {};

  return {
    ...babelOptions,
    plugins: [...defaultBabelPlugins, ...(babelOptions.plugins ?? [])],
    presets: [...defaultBabelPresets, ...(babelOptions.presets ?? [])]
  };
}
