import { createAdminQueryClient } from '@skyroc/web-admin-runtime';

export const queryClient = createAdminQueryClient({
  isDev: import.meta.env.DEV
});
