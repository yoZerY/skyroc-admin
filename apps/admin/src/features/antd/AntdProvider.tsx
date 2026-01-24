import type { PropsWithChildren } from 'react';

import { initAntdProvider } from '@/config';
import { antdLocales } from '@/locales/antd';

import { useLang } from '../lang/use-lang';
import { useSettingsTheme } from '../theme/useSettingsTheme';

import { getAntdTheme } from './shared';

function ContextHolder() {
  const { message, modal, notification } = AApp.useApp();

  initAntdProvider(message, modal, notification);
  return null;
}

const AntdProvider = ({ children }: PropsWithChildren) => {
  const { locale } = useLang();

  const { darkMode, settings, themeColors, watermark, watermarkContent } = useSettingsTheme();

  const antdTheme = getAntdTheme(themeColors, darkMode, settings);

  return (
    <AConfigProvider
      button={{ classNames: { icon: 'align-1px  text-icon' } }}
      card={{ styles: { body: { flex: 1, overflow: 'hidden', padding: '12px 16px ' } } }}
      locale={antdLocales[locale]}
      menu={{ classNames: { item: '!items-center !flex' } }}
      modal={{ centered: true }}
      theme={antdTheme}
    >
      <AApp style={{ height: '100%' }}>
        <ContextHolder />
        <AWatermark
          className="shadow-initial text-opacity-100 bg-opacity-100 h-full"
          content={watermarkContent}
          {...watermark.settings}
        >
          {children}
        </AWatermark>
      </AApp>
    </AConfigProvider>
  );
};

export default AntdProvider;
