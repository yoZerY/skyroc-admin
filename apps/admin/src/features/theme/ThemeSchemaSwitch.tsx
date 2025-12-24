import type { ButtonProps, TooltipProps } from 'antd';
import type { CSSProperties } from 'react';

import ButtonIcon from '@/components/ButtonIcon';

import { icons } from './shared';
import { useSettingsTheme } from './useSettingsTheme';

interface Props {
  className?: string;
  /** Show tooltip */
  showTooltip?: boolean;
  style?: CSSProperties;
  /** Tooltip placement */
  tooltipPlacement?: TooltipProps['placement'];
}

const DEFAULT_ANIMATION_DURATION = 400;
const DEFAULT_ANIMATION_EASING = 'ease-in-out';

const ThemeSchemaSwitch: FC<Props> = memo(({ showTooltip = true, tooltipPlacement = 'bottom', ...props }) => {
  const { t } = useTranslation();

  const { themeScheme, toggleThemeScheme } = useSettingsTheme();

  const tooltipContent = showTooltip ? t('icon.themeSchema') : '';

  const toggleDark: ButtonProps['onClick'] = async event => {
    const isAppearanceTransition = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isAppearanceTransition) {
      toggleThemeScheme();
      return;
    }

    await document.startViewTransition(() => {
      toggleThemeScheme();
    }).ready;

    if (themeScheme === 'auto') return;

    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

    const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`];

    document.documentElement.animate(
      {
        clipPath
      },
      {
        duration: DEFAULT_ANIMATION_DURATION,
        easing: DEFAULT_ANIMATION_EASING,
        pseudoElement: '::view-transition-new(root)'
      }
    );
  };
  return (
    <ButtonIcon
      icon={icons[themeScheme]}
      tooltipContent={tooltipContent}
      {...props}
      tooltipPlacement={tooltipPlacement}
      onClick={toggleDark}
    />
  );
});

export default ThemeSchemaSwitch;
