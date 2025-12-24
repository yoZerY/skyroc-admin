import { RouterProvider as TanStackRouterProvider } from '@tanstack/react-router';

import { useAuth } from '../auth/use-auth';

import { router } from '.';

const RouterProvider = () => {
  const { initAuth, isAuthInitialized, isLoggedIn, userInfo } = useAuth();

  return (
    <TanStackRouterProvider
      context={{ initAuth, isAuthInitialized, isLoggedIn, userInfo }}
      router={router}
    />
  );
};

export default RouterProvider;
