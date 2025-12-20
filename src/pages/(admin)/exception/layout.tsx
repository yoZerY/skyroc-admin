import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(admin)/exception')({
  component: RouteComponent,
  staticData: {
    title: 'exception',
    i18nKey: 'route.exception',
    menu: {
      type: 'group',
      order: 3
    }
  }
});

function RouteComponent() {
  return <Outlet />;
}
