import { globalStore } from '@skyroc/core-state';
import { Suspense, lazy } from 'react';

import { queryClient } from '@/service/queryClient';

import { router } from '../router';

// 动态导入所有 Devtools 相关的包
const TanStackDevtools = lazy(() =>
  import('@tanstack/react-devtools').then(mod => ({ default: mod.TanStackDevtools }))
);

const ReactQueryDevtoolsPanel = lazy(() =>
  import('@tanstack/react-query-devtools').then(mod => ({ default: mod.ReactQueryDevtoolsPanel }))
);

const TanStackRouterDevtoolsPanel = lazy(() =>
  import('@tanstack/react-router-devtools').then(mod => ({ default: mod.TanStackRouterDevtoolsPanel }))
);

const JotaiDevTools = lazy(async () => {
  // 动态导入 CSS
  await import('jotai-devtools/styles.css');
  const mod = await import('jotai-devtools');
  return { default: mod.DevTools };
});

const Devtools = () => {


  return (
    <Suspense fallback={null}>
      <TanStackDevtools
        config={{
          position: 'bottom-right'
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: (
              <Suspense fallback={<div>Loading Router Devtools...</div>}>
                <TanStackRouterDevtoolsPanel router={router} />
              </Suspense>
            )
          },
          {
            name: 'TanStack Query',
            render: (
              <Suspense fallback={<div>Loading Query Devtools...</div>}>
                <ReactQueryDevtoolsPanel client={queryClient} />
              </Suspense>
            )
          }
        ]}
      />
      <Suspense fallback={null}>
        <JotaiDevTools store={globalStore} />
      </Suspense>
    </Suspense>
  );
};

export default Devtools;
