import { Outlet, createRootRouteWithContext, useLocation } from '@tanstack/react-router';

import { AUTH_QUERY_KEYS, ROUTE_QUERY_KEYS, queryMenusOptions, queryUserInfoOptions } from '@/service/api';
import { localStg } from '@/utils/storage';

import ErrorPage from './error';
import GlobalLoading from './loading';
import NotFound from './not-found';

const Root = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    globalConfig.nprogress.done();

    return () => {
      globalConfig.nprogress.start();
    };
  }, [pathname]);

  return <Outlet />;
};

export const Route = createRootRouteWithContext<Router.RouterContext>()({
  component: Root,
  notFoundComponent: NotFound,
  beforeLoad: async ({ context }) => {
    const isInitInfo = Boolean(context.queryClient.getQueryData(AUTH_QUERY_KEYS.USER_INFO));

    const contextData = {} as Router.RouterContext;

    if (!isInitInfo) {
      const enabled = Boolean(localStg.get('token'));

      if (enabled) {
        const data = await context.queryClient.ensureQueryData(queryUserInfoOptions(enabled));

        contextData.info = data;
      }
      const isInitMenus = Boolean(context.queryClient.getQueryData(ROUTE_QUERY_KEYS.USER_ROUTES));

      if (!isInitMenus) {
        await context.queryClient.ensureQueryData(queryMenusOptions());
      }
    }

    return contextData;
  },
  staticData: {
    title: 'skyroc-admin'
  },
  errorComponent: ErrorPage,
  pendingMs: 10,
  pendingComponent: GlobalLoading
});
