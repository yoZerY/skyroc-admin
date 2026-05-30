export {
  ADMIN_AUTH_MUTATION_KEYS,
  ADMIN_AUTH_QUERY_KEYS,
  ADMIN_ROUTE_QUERY_KEYS,
  DEFAULT_ADMIN_AUTH_URLS,
  DEFAULT_ADMIN_ROUTE_URLS,
  createAdminAuthApi,
  createAdminAuthQueries,
  createAdminRouteApi,
  createAdminRouteQueries
} from './api-runtime';
export type {
  AdminAuthApi,
  AdminAuthUrls,
  AdminRequest,
  AdminRouteApi,
  AdminRouteUrls,
  CreateAdminAuthQueriesOptions,
  CreateAdminRouteQueriesOptions
} from './api-runtime';
export { getHtmlBuildTime, setupAppVersionNotification } from './app-update';
export type { AppUpdateAvailableContext, SetupAppVersionNotificationOptions } from './app-update';
export { createAdminAuthRuntime } from './auth-runtime';
export type {
  AdminAuthLayoutRuntime,
  AdminAuthRuntime,
  AdminAuthRuntimeContext,
  AdminAuthState,
  AdminAuthStorage,
  AdminAuthStorageKey,
  CreateAdminAuthRuntimeOptions
} from './auth-runtime';
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
  AdminRequestInstance,
  CreateAdminQueryClientOptions,
  CreateAdminRequestAdapterOptions,
  CreateAdminRequestOptions
} from './request-runtime';
