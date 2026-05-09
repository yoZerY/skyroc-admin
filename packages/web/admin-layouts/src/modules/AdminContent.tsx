import { Outlet } from '@tanstack/react-router';

import { useAdminLayoutContext } from '../context';

const GlobalContent = () => {
  const { content } = useAdminLayoutContext();

  return (
    <div className="h-full grow bg-layout p-16px">
      {content ?? <Outlet />}
    </div>
  );
};

export default GlobalContent;
