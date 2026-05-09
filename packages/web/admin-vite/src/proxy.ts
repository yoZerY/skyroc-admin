import process from 'node:process';

import { bgRed, bgYellow, green, lightBlue } from 'kolorist';
import type { HttpProxy, ProxyOptions } from 'vite';

export interface AdminViteServiceConfigItem {
  /** Backend service base url. */
  baseURL: string;

  /** Local proxy path prefix. */
  proxyPattern: string;
}

export interface AdminViteServiceConfig extends AdminViteServiceConfigItem {
  /** Extra backend services that share the same proxy behavior. */
  other?: AdminViteServiceConfigItem[];
}

export interface CreateAdminViteProxyOptions {
  /** Whether proxy creation is enabled for the current command. */
  enabled?: boolean;

  /** Whether request and target urls are printed in the terminal. */
  enableLog?: boolean;

  /** Service config produced by the host application. */
  serviceConfig: AdminViteServiceConfig;
}

export function createAdminViteProxy(options: CreateAdminViteProxyOptions) {
  const { enabled = true, enableLog = false, serviceConfig } = options;

  if (!enabled) return undefined;

  const proxy: Record<string, ProxyOptions> = createProxyItem(serviceConfig, enableLog);

  serviceConfig.other?.forEach(item => {
    Object.assign(proxy, createProxyItem(item, enableLog));
  });

  return proxy;
}

function createProxyItem(item: AdminViteServiceConfigItem, enableLog: boolean) {
  const proxy: Record<string, ProxyOptions> = {};

  proxy[item.proxyPattern] = {
    changeOrigin: true,
    configure: (_proxy: HttpProxy.ProxyServer, options: ProxyOptions) => {
      _proxy.on('proxyReq', (_proxyReq, req) => {
        if (!enableLog) return;

        const requestUrl = `${lightBlue('[proxy url]')}: ${bgYellow(` ${req.method} `)} ${green(`${item.proxyPattern}${req.url}`)}`;
        const proxyUrl = `${lightBlue('[real request url]')}: ${green(`${options.target}${req.url}`)}`;

        process.stdout.write(`${requestUrl}\n${proxyUrl}\n`);
      });
      _proxy.on('error', (_err, req) => {
        if (!enableLog) return;

        process.stdout.write(`${bgRed(`Error: ${req.method} `)} ${green(`${options.target}${req.url}`)}\n`);
      });
    },
    rewrite: path => path.replace(new RegExp(`^${item.proxyPattern}`), ''),
    target: item.baseURL
  };

  return proxy;
}
