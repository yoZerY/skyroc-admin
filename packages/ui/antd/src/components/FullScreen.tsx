import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';

import ButtonIcon from './ButtonIcon';

interface Props {
  className?: string;
  full?: boolean;
  toggleFullscreen: () => void;
}

const FullScreen = ({ className, full, toggleFullscreen }: Props) => {
  const { t } = useTranslation();

  return (
    <ButtonIcon
      className={className}
      hoverAnimation="scale"
      tooltipContent={full ? t('icon.fullscreenExit') : t('icon.fullscreen')}
      onClick={toggleFullscreen}
    >
      <Icon icon={full ? 'gridicons:fullscreen-exit' : 'gridicons:fullscreen'} />
    </ButtonIcon>
  );
};

export default FullScreen;
