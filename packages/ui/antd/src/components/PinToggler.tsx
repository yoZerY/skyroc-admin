import { SvgIcon } from '@skyroc/ui-compose';
import React from 'react';
import { useTranslation } from 'react-i18next';

import ButtonIcon from './ButtonIcon';

interface Props {
  className: string;
  onClick?: React.ComponentProps<'button'>['onClick'];
  pin?: boolean;
}
const PinToggler = ({ className, onClick, pin }: Props) => {
  const { t } = useTranslation();

  const icon = pin ? 'mdi-pin-off' : 'mdi-pin';
  return (
    <ButtonIcon
      triggerParent
      className={className}
      tooltipContent={pin ? t('icon.unpin') : t('icon.pin')}
      tooltipPlacement="bottomLeft"
      onClick={onClick}
    >
      <SvgIcon icon={icon} />
    </ButtonIcon>
  );
};

export default PinToggler;
