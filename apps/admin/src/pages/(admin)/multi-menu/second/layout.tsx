import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(admin)/multi-menu/second')({
  component: RouteComponent,
  staticData: {
    title: 'multi-menu_second',
    i18nKey: 'route.multi-menu_second',
    menu: {
      order: 2
    }
  }
});

function RouteComponent() {
  return <Outlet />;
}
