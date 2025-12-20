import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(admin)/multi-menu')({
  component: RouteComponent,
  staticData: {
    title: 'multi-menu',
    i18nKey: 'route.multi-menu',
    menu: {
      order: 8
    }
  }
});

function RouteComponent() {
  return <Outlet />;
}
