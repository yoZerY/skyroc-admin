import { Outlet, createFileRoute } from '@tanstack/react-router';

import { initMenus } from '@/layouts/admin-layout/state/menus/use-admin-menus';

export const Route = createFileRoute('/(admin)')({
  component: AdminLayout,
  beforeLoad: ({ context }) => {
    const menus = context.menus;

    const adminMenus = menus?.get('/(admin)') || [];

    initMenus(adminMenus);
  },
  staticData: {
    title: 'admin'
  }
});

function AdminLayout() {
  return <Outlet />;
}
