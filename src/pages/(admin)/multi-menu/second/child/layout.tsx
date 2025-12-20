import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(admin)/multi-menu/second/child')({
  component: RouteComponent,
  staticData: {
    title: 'multi-menu_second_child',
    i18nKey: 'route.multi-menu_second_child',
    menu: {
      order: 1
    }
  }
});

function RouteComponent() {
  return <Outlet />;
}
