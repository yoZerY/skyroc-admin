export { getHtmlBuildTime, setupAppVersionNotification } from './app-update';
export type { AppUpdateAvailableContext, SetupAppVersionNotificationOptions } from './app-update';
export { setupDayjs } from './dayjs';
export type { SetupDayjsOptions } from './dayjs';
export { setupIconifyOffline } from './iconify';
export type { SetupIconifyOfflineOptions } from './iconify';
export { setupNProgress } from './nprogress';
export type { SetupNProgressOptions } from './nprogress';
export { setupAdminRuntimePlugins } from './plugins';
export type { AdminRuntimePluginCleanup, AdminRuntimePluginConfig, SetupAdminRuntimePluginsOptions } from './plugins';
export { createAdminQueryClient, createAdminRequest, createAdminRequestAdapter } from './request-runtime';
export type {
  AdminRequestAuthStorage,
  AdminRequestAuthStorageKey,
  AdminRequestInstance,
  CreateAdminQueryClientOptions,
  CreateAdminRequestAdapterOptions,
  CreateAdminRequestOptions
} from './request-runtime';
