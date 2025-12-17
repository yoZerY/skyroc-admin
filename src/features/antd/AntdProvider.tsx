import type { PropsWithChildren } from 'react';

import { globalConfig } from '@/config';
import { antdLocales } from '@/locales/antd';

import { useLang } from '../lang/use-lang';
import { useSettingsTheme } from '../theme/useSettingsTheme';

import { getAntdTheme } from './shared';

const AntdProvider = ({ children }: PropsWithChildren) => {
  const { locale } = useLang();

  const { darkMode, settings, themeColors, watermark } = useSettingsTheme();

  const antdTheme = getAntdTheme(themeColors, darkMode, settings);

  const watermarkContent = watermark.visible ? watermark.text || globalConfig.watermarkText : '';

  return (
    <AConfigProvider
      button={{ classNames: { icon: 'align-1px  text-icon' } }}
      card={{ styles: { body: { flex: 1, overflow: 'hidden', padding: '12px 16px ' } } }}
      locale={antdLocales[locale]}
      theme={antdTheme}
    >
      <AWatermark
        className="h-full"
        content={watermarkContent}
        {...globalConfig.watermarkConfig}
      >
        {children}
      </AWatermark>
    </AConfigProvider>
  );
};

export default AntdProvider;
