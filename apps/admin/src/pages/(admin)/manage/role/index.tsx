import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(admin)/manage/role/')({
  component: RouteComponent,
  staticData: {
    title: 'role',
    i18nKey: 'route.manage_role',
    menu: {
      icon: 'carbon:user-role',
      order: 2
    },
    route: {
      permissions: ['R_SUPER']
    }
  }
});

function RouteComponent() {
  return <LookForward />;
}
