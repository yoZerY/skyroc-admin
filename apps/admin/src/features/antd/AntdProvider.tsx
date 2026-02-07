import { AntdProvider } from '@skyroc/web-admin-theme';
import type { PropsWithChildren } from 'react';

import { antdLocales } from '@/locales/antd';
import { useUserInfoQuery } from '@/service/api';

// 确保主题 atom 从 localStorage 初始化（模块级别副作用）
import '../theme/useSettingsTheme';

import { useLang } from '../lang/use-lang';

/**
 * App 级别的 Antd Provider 薄包装层
 *
 * 职责仅为注入 app 特有的 locale 和 userName，
 * 其余 ConfigProvider / App / Watermark / ContextHolder 由包内部处理。
 */
const AppAntdProvider = (props: PropsWithChildren) => {
  const { children } = props;

  const { locale } = useLang();
  const { data: userInfo } = useUserInfoQuery();

  return (
    <AntdProvider
      locale={antdLocales[locale]}
      userName={userInfo?.userName}
    >
      {children}
    </AntdProvider>
  );
};

export default AppAntdProvider;
