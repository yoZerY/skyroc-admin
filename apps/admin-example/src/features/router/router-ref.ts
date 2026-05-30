import type { RouterConfig } from '.';

let routerInstance: RouterConfig | null = null;

export function setRouterInstance(router: RouterConfig) {
  routerInstance = router;
}

export function getRouterInstance() {
  return routerInstance;
}
