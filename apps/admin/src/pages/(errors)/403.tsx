import { createFileRoute } from '@tanstack/react-router';

const NotAuth = () => {
  return <ExceptionBase type="403" />;
};

export const Route = createFileRoute('/(errors)/403')({
  component: NotAuth,
  staticData: {
    title: '403',
    i18nKey: 'route.403'
  }
});
