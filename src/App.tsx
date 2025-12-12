import { QueryClientProvider } from '@tanstack/react-query';

import LazyAnimate from './features/animate/LazyMotion';
import AntdContextHolder from './features/antd/AntdContextHolder';
import AntdProvider from './features/antd/AntdProvider';
import Devtools from './features/effects/Devtools';
import GlobalEffect from './features/effects/GlobalEffect';
import JotaiProvider from './features/jotai/JotaiProvider';
import RouterProvider from './features/router/RouterProvider';
import { queryClient } from './service/queryClient';

const App = () => (
  <QueryClientProvider client={queryClient}>
    <JotaiProvider>
      <AntdProvider>
        <AntdContextHolder>
          <LazyAnimate>
            <RouterProvider />
            <GlobalEffect />
            <Devtools />
          </LazyAnimate>
        </AntdContextHolder>
      </AntdProvider>
    </JotaiProvider>
  </QueryClientProvider>
);

export default App;
