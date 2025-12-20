import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(admin)/manage/user/')({
  component: RouteComponent,
  staticData: {
    title: 'manage_user',
    i18nKey: 'route.manage_user',
    menu: {
      icon: 'ic:round-manage-accounts',
      order: 1
    },
    route: {
      permissions: ['R_ADMIN']
    }
  }
});

function RouteComponent() {
  return <LookForward />;
}
