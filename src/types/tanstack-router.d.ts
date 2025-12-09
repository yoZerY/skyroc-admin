import '@tanstack/react-router';

declare module '@tanstack/react-router' {
  type RouterConfig = import('@/features/router').RouterConfig;

  interface Register {
    router: RouterConfig;
  }
}
