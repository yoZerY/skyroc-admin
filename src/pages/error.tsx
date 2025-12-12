import type { ErrorComponentProps } from '@tanstack/react-router';

import ErrorBoundary from '@/components/ErrorBoundary';

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
