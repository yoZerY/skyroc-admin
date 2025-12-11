import type { PropsWithChildren } from 'react';

import { globalConfig } from '@/config';
import { antdLocales } from '@/locales/antd';

import { useLang } from '../lang/use-lang';
import { useSettingsTheme } from '../theme/useSettingsTheme';

import { getAntdTheme } from './shared';

const AntdProvider = ({ children }: PropsWithChildren) => {
  const { locale } = useLang();

  const { darkMode, themeColors, tokens } = useSettingsTheme();

  const antdTheme = getAntdTheme(themeColors, darkMode, tokens);

  return (
    <AConfigProvider
      button={{ classNames: { icon: 'align-1px  text-icon' } }}
      card={{ styles: { body: { flex: 1, overflow: 'hidden', padding: '12px 16px ' } } }}
      locale={antdLocales[locale]}
      theme={antdTheme}
    >
      <AWatermark
        className="h-full"
        content={globalConfig.watermarkText}
        {...globalConfig.watermarkConfig}
      />
      {children}
    </AConfigProvider>
  );
};

export default AntdProvider;
