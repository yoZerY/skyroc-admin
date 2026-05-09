import process from 'node:process';

import boxen, { type Options as BoxenOptions } from 'boxen';
import gradientString from 'gradient-string';
import type { Plugin } from 'vite';

export interface SetupAdminProjectInfoOptions {
  /** Boxen options used to render the terminal message. */
  boxenOptions?: BoxenOptions;

  /** Gradient colors passed to gradient-string. */
  colors?: [string, string, ...string[]];

  /** Whether the message is printed. */
  enabled?: boolean;

  /** Text printed when Vite starts building. */
  message?: string;
}

const DEFAULT_MESSAGE = `您好! 欢迎使用 skyroc-admin 开源项目\n我们为您精心准备了精美的保姆级文档\nhttps://admin-docs.skyroc.me/`;

const DEFAULT_BOXEN_OPTIONS: BoxenOptions = {
  borderColor: '#646cff',
  borderStyle: 'round',
  padding: 0.5
};

export function setupAdminProjectInfo(options: SetupAdminProjectInfoOptions = {}): Plugin {
  const {
    boxenOptions = DEFAULT_BOXEN_OPTIONS,
    colors = ['#646cff', 'magenta'],
    enabled = true,
    message = DEFAULT_MESSAGE
  } = options;

  return {
    buildStart() {
      if (!enabled) return;

      process.stdout.write(`${boxen(gradientString(...colors).multiline(message), boxenOptions)}\n`);
    },

    name: 'skyroc:admin-build-info'
  };
}
