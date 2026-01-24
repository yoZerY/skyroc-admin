// @unocss-include
import { getHsl } from '@sa/color';
import clsx from 'clsx';

import SystemLogo from '@/components/SystemLogo';
import { globalConfig } from '@/config';
import { DARK_CLASS } from '@/constants/app';
import { toggleHtmlClass } from '@/utils/common';

const GlobalLoading = memo(() => {
  const { t } = useTranslation();

  const { defaultDarkMode, defaultThemeColor } = globalConfig;

  if (defaultDarkMode) {
    toggleHtmlClass(DARK_CLASS).add();
  }

  const { h, l, s } = getHsl(defaultThemeColor);

  const loadingClasses = [
    'left-0 top-0',
    'left-0 bottom-0 animate-delay-500',
    'right-0 top-0 animate-delay-1000',
    'right-0 bottom-0 animate-delay-1500'
  ];

  return (
    <div
      className="bg-layout fixed-center flex-col"
      style={{ '--primary-color': `${h} ${s}% ${l}%` } as React.CSSProperties}
    >
      <SystemLogo className="text-primary size-128px" />
      <div className="my-xl size-xxl">
        <div className="h-full relative animate-spin">
          {loadingClasses.map(item => {
            return (
              <div
                className={clsx('bg-primary size-ms absolute animate-pulse radius-lg', item)}
                key={item}
              />
            );
          })}
        </div>
      </div>
      <h2 className="text-t2 text-primary font-500">{t('system.title')}</h2>
    </div>
  );
});

export default GlobalLoading;
