import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(admin)/multi-menu/first')({
  component: RouteComponent,
  staticData: {
    title: 'first',
    i18nKey: 'route.multi-menu_first',
    menu: {
      order: 1
    }
  }
});

function RouteComponent() {
  return <Outlet />;
}
