import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(admin)/manage/menu/')({
  component: RouteComponent,
  staticData: {
    title: 'menu',
    i18nKey: 'route.manage_menu',
    menu: {
      icon: 'material-symbols:route',
      order: 3
    },
    route: {
      permissions: ['R_ADMIN']
    }
  }
});

function RouteComponent() {
  return <LookForward />;
}
