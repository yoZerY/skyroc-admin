import type { ErrorComponentProps } from '@tanstack/react-router';

import { ErrorBoundary } from '@skyroc/ui-antd';

const ErrorPage = (props: ErrorComponentProps) => {
  const { error, reset } = props;

  return (
    <ErrorBoundary
      error={error}
      resetErrorBoundary={reset}
    />
  );
};

export default ErrorPage;
