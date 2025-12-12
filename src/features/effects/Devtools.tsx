import { TanStackDevtools } from '@tanstack/react-devtools';
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { DevTools } from 'jotai-devtools';

import { queryClient } from '@/service/queryClient';

import { globalStore } from '../jotai/store';
import { router } from '../router';
import 'jotai-devtools/styles.css';

const Devtools = () => {
  return (
    <>
      <TanStackDevtools
        config={{
          position: 'bottom-right'
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel router={router} />
          },
          {
            name: 'TanStack Query',
            render: <ReactQueryDevtoolsPanel client={queryClient} />
          }
        ]}
      />
      <DevTools store={globalStore} />
    </>
  );
};

export default Devtools;
