import { TooltipProvider } from '@skyroc/ui';
import { QueryClientProvider } from '@tanstack/react-query';
import { useAtomsDevtools } from 'jotai-devtools';
import { Suspense, lazy } from 'react';

import LazyAnimate from './features/animate/LazyMotion';
import AntdProvider from './features/antd/AntdProvider';
import { NotificationProvider } from './features/chat';
import GlobalEffect from './features/effects/GlobalEffect';
import JotaiProvider from './features/jotai/JotaiProvider';
import { globalStore } from './features/jotai/store';
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
        {import.meta.env.DEV && (
          <Suspense fallback={null}>
            <Devtools />
          </Suspense>
        )}
        {children}
      </JotaiProvider>
    </QueryClientProvider>
  );
};

const App = () => (
  <Provider>
    <AntdProvider>
      <NotificationProvider>
        <TooltipProvider>
          <LazyAnimate>
            <RouterProvider />
            <GlobalEffect />
          </LazyAnimate>
        </TooltipProvider>
      </NotificationProvider>
    </AntdProvider>
  </Provider>
);

export default App;
