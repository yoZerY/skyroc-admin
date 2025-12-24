import { Outlet, useLocation, useMatches, useRouterState } from '@tanstack/react-router';

import { router } from '@/features/router';

const GlobalContent = () => {
  const a = useLocation();

  const matches = useMatches();

  const routerState = useRouterState();

  console.log('a', a, matches);

  console.log('routerState', routerState, router);

  return (
    <div className="h-full flex-grow bg-layout p-16px">
      <Outlet />
    </div>
  );
};

export default GlobalContent;
