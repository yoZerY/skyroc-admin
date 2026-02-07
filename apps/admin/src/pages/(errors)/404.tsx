import { createFileRoute } from '@tanstack/react-router';

import { ExceptionBase } from '@skyroc/ui-antd';

const NotFound = () => {
  return <ExceptionBase type="404" />;
};

export const Route = createFileRoute('/(errors)/404')({
  component: NotFound,
  staticData: {
    title: '404',
    i18nKey: 'route.404'
  }
});
