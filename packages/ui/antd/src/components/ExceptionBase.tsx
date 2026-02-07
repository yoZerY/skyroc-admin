import { SvgIcon } from '@skyroc/ui-compose';
import { useNavigate } from '@tanstack/react-router';
import { Button } from 'antd';
import { memo } from 'react';

type ExceptionType = '403' | '404' | '500';

interface Props {
  /** Button text (default: 'Back to Home') */
  buttonText?: string;
  /**
   * Exception type
   *
   * - 403: no permission
   * - 404: not found
   * - 500: service error
   */
  type: ExceptionType;
}
const iconMap: Record<ExceptionType, string> = {
  '403': 'no-permission',
  '404': 'not-found',
  '500': 'service-error'
};
const ExceptionBase = memo((props: Props) => {
  const { buttonText = 'Back to Home', type } = props;

  const nav = useNavigate();

  function handleClick() {
    nav({ to: '/' });
  }

  return (
    <div className="size-full min-h-520px flex-col-center gap-24px overflow-hidden">
      <div className="flex text-400px text-primary">
        <SvgIcon localIcon={iconMap[type]} />
      </div>
      <Button
        type="primary"
        onClick={handleClick}
      >
        {buttonText}
      </Button>
    </div>
  );
});

ExceptionBase.displayName = 'ExceptionBase';

export default ExceptionBase;
