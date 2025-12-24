import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(admin)/manage/user/$id')({
  component: RouteComponent,
  staticData: {
    title: 'manage_user_detail',
    i18nKey: 'route.manage_user_$id',
    menu: {
      hide: true,
      activeMenu: '/(admin)/manage/user/,/(admin)/manage/user/'
    },
    route: {
      permissions: ['R_ADMIN']
    }
  }
});

function RouteComponent() {
  return <LookForward />;
}
