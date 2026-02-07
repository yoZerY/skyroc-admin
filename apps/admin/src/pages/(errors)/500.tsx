import { createFileRoute } from '@tanstack/react-router';

import { ExceptionBase } from '@skyroc/ui-antd';

const GeneralError = () => {
  return <ExceptionBase type="500" />;
};

export const Route = createFileRoute('/(errors)/500')({
  component: GeneralError,
  staticData: {
    title: '500',
    i18nKey: 'route.500'
  }
});
