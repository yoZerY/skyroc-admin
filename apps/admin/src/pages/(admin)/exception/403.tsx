import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(admin)/exception/403')({
  component: NotAuth,
  staticData: {
    title: '403',
    i18nKey: 'route.exception_403',
    menu: {
      icon: 'ic:baseline-block',
      order: 1
    }
  }
});

function NotAuth() {
  return <ExceptionBase type="403" />;
}
