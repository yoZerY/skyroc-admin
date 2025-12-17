import type { ButtonProps, TooltipProps } from 'antd';
import clsx from 'clsx';
import type { CSSProperties } from 'react';

import type { ButtonLinkComponentProps } from './ButtonLink';
import ButtonLink from './ButtonLink';
import SvgIcon from './SvgIcon';

type BaseProps = {
  children?: React.ReactNode;
  /** Button class */
  className?: string;
  /** Tooltip class names */
  classNames?: {
    button?: string;
    icon?: string;
    tooltip?: TooltipProps['classNames'];
  };
  /** Iconify icon name */
  icon?: string;
  styles?: {
    button?: ButtonProps['styles'];
    icon?: CSSProperties;
    tooltip?: TooltipProps['styles'];
  };

  /** Tooltip content */
  tooltipContent?: string;
  /** Tooltip placement */
  tooltipPlacement?: TooltipProps['placement'];
  /** Tooltip props */
  tooltipProps?: Omit<TooltipProps, 'children' | 'classNames' | 'getPopupContainer' | 'placement' | 'title' | 'zIndex'>;
  /** Trigger tooltip on parent */
  triggerParent?: boolean;
  /** z-index */
  zIndex?: number;
};

type WithButtonProps = Omit<ButtonProps, 'icon' | 'iconPosition'> & BaseProps;

type WithLinkProps = Partial<Omit<ButtonLinkComponentProps, 'icon' | 'iconPosition'>> & BaseProps;

type Props = WithButtonProps | WithLinkProps;

/** - 动态计算class */
const computeClass = (className: string) => {
  let clsStr = className;

  if (!clsStr.includes('h-')) {
    clsStr += ' h-32px';
  }

  if (!clsStr.includes('text-')) {
    clsStr += ' text-icon';
  }

  return clsStr;
};

const ButtonIcon = ({
  children,
  className = 'h-32px text-icon',
  classNames,
  icon,
  styles,
  tooltipContent,
  tooltipPlacement = 'bottom',
  tooltipProps,
  triggerParent,
  zIndex = 98,
  ...rest
}: Props) => {
  const cls = computeClass(className);

  function getPopupContainer(triggerNode: HTMLElement) {
    return triggerParent ? triggerNode.parentElement! : document.body;
  }

  const Comp = 'to' in rest ? ButtonLink : AButton;

  const typeProps = 'to' in rest ? { btnType: 'text' as const } : { type: 'text' as const };

  return (
    <ATooltip
      classNames={classNames?.tooltip}
      getPopupContainer={getPopupContainer}
      placement={tooltipPlacement}
      styles={styles?.tooltip}
      title={tooltipContent}
      zIndex={zIndex}
      {...tooltipProps}
    >
      <Comp
        className={clsx(cls, '!px-6px', classNames?.button)}
        {...typeProps}
        {...rest}
        styles={styles?.button}
      >
        <div className="flex-center gap-8px">
          {children || (
            <SvgIcon
              className={classNames?.icon}
              icon={icon}
              style={styles?.icon}
            />
          )}
        </div>
      </Comp>
    </ATooltip>
  );
};
export default ButtonIcon;
