import { Outlet, createRootRoute } from '@tanstack/react-router';

import ErrorPage from './error';
import GlobalLoading from './loading';
import NotFound from './not-found';

const Root = () => {
  return <Outlet />;
};

export const Route = createRootRoute({
  component: Root,
  notFoundComponent: NotFound,
  errorComponent: ErrorPage,
  pendingMs: 10,
  pendingComponent: GlobalLoading
});
