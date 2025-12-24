import { Outlet, createRootRouteWithContext, useLocation } from '@tanstack/react-router';

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
    if (!context.isAuthInitialized) {
      await context.initAuth();
    }
  },
  staticData: {
    title: 'SkyrocAdmin'
  },
  errorComponent: ErrorPage,
  pendingMs: 10,
  pendingComponent: GlobalLoading
});
