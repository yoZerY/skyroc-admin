import { Outlet, createRootRouteWithContext, useLocation } from '@tanstack/react-router';

import ErrorPage from './error';
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
  beforeLoad: ({ context }) => {
    if (!context.isAuthInitialized && context.isLoggedIn) {
      return context.initAuth().then(() => undefined);
    }
  },
  staticData: {
    title: 'SkyrocAdmin'
  },
  errorComponent: ErrorPage
});
