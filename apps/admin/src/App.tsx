// jotai-devtools must run before globalStore is created so the store exposes devtool metadata.
import { useAtomsDevtools } from 'jotai-devtools';

import { JotaiProvider, globalStore } from '@skyroc/core-state';
import { LazyAnimate } from '@skyroc/web-ui-compose';
import { QueryClientProvider } from '@tanstack/react-query';
import { lazy } from 'react';

import AntdProvider from './features/antd/AntdProvider';
import { NotificationProvider } from './features/chat';
import GlobalEffect from './features/effects/GlobalEffect';
import RouterProvider from './features/router/RouterProvider';
import { queryClient } from './service/queryClient';

// 开发环境才加载 Devtools，生产环境会被 tree-shaking 移除
const Devtools = import.meta.env.DEV ? lazy(() => import('./features/effects/Devtools')) : () => null;

const Provider = ({ children }: { children: React.ReactNode }) => {
  if (import.meta.env.DEV) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useAtomsDevtools('demo', { store: globalStore });
  }

  return (
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>
        <Devtools />
        {children}
      </JotaiProvider>
    </QueryClientProvider>
  );
};

const App = () => (
  <Provider>
    <AntdProvider>
      <NotificationProvider>
        <LazyAnimate>
          <RouterProvider />
          <GlobalEffect />
        </LazyAnimate>
      </NotificationProvider>
    </AntdProvider>
  </Provider>
);

export default App;
