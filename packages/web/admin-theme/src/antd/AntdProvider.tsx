import type { ReactNode } from 'react';

import { App, ConfigProvider, Watermark } from 'antd';
import type { Locale } from 'antd/lib/locale';

import { useTheme } from '../hooks';

import { getAntdTheme } from './shared';
import { initAntdUI } from './ui';

interface AntdProviderProps {
  /** 传送门内容 */
  children: ReactNode;

  /** antd 国际化 locale 对象 */
  locale?: Locale;

  /** 用户名（用于水印显示） */
  userName?: string;
}

/**
 * ContextHolder — 利用 App.useApp() 获取 message/modal/notification 实例，
 * 自动完成 UI 实例初始化，无需消费者手动调用 init 函数。
 */
function ContextHolder() {
  const { message, modal, notification } = App.useApp();

  initAntdUI(message, modal, notification);
  return null;
}

/**
 * Antd 统一 Provider
 *
 * 整合 ConfigProvider + App + Watermark + ContextHolder，
 * 内部自动通过 useTheme 获取主题状态，消费者只需传入 locale 和 userName。
 */
const AntdProvider = (props: AntdProviderProps) => {
  const { children, locale, userName } = props;

  const { darkMode, settings, themeColors, watermark, watermarkContent } = useTheme({ userName });

  const antdTheme = getAntdTheme(themeColors, darkMode, settings);

  return (
    <ConfigProvider
      button={{ classNames: { icon: 'align-1px  text-icon' } }}
      card={{ styles: { body: { flex: 1, overflow: 'hidden', padding: '12px 16px ' } } }}
      locale={locale}
      menu={{ classNames: { item: '!items-center !flex' } }}
      modal={{ centered: true }}
      theme={antdTheme}
    >
      <App style={{ height: '100%' }}>
        <ContextHolder />
        <Watermark
          className="shadow-initial h-full bg-opacity-100 text-opacity-100"
          content={watermarkContent}
          {...watermark.settings}
        >
          {children}
        </Watermark>
      </App>
    </ConfigProvider>
  );
};

export default AntdProvider;
