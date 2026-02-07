import { SvgIcon } from '@skyroc/ui-compose';
import { Button, Typography } from 'antd';
import type { FallbackProps } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';

const { Text, Title } = Typography;

interface ErrorBoundaryProps extends FallbackProps {
  /** Whether in development mode */
  isDev?: boolean;
  /** Theme color for the reset button */
  themeColor?: string;
}

const ErrorPage = ({ error, isDev = false, resetErrorBoundary, themeColor }: ErrorBoundaryProps) => {
  const { t } = useTranslation();

  return (
    <div className="size-full min-h-520px flex-col-center gap-16px overflow-hidden">
      <div className="flex text-400px text-primary">
        <SvgIcon localIcon="error" />
      </div>
      {isDev ? <Text code>{error.message}</Text> : <Title level={3}>{t('common.errorHint')}</Title>}
      <Button
        style={themeColor ? { backgroundColor: themeColor } : undefined}
        type="primary"
        onClick={resetErrorBoundary}
      >
        {t('common.tryAlign')}
      </Button>
    </div>
  );
};

export default ErrorPage;
