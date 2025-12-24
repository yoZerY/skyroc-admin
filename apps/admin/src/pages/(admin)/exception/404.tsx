import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(admin)/exception/404')({
  component: NotFound,
  staticData: {
    title: '404',
    i18nKey: 'route.exception_404',
    menu: {
      icon: 'ic:baseline-web-asset-off',
      order: 2
    }
  }
});

function NotFound() {
  return <ExceptionBase type="404" />;
}
