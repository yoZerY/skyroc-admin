import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(admin)/manage')({
  component: RouteComponent,
  staticData: {
    title: 'manage',
    i18nKey: 'route.manage',
    permissions: ['R_ADMIN'],
    menu: {
      order: 9,
      icon: 'carbon:cloud-service-management'
    }
  }
});

function RouteComponent() {
  return <Outlet />;
}
