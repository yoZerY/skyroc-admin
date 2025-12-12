import { Provider } from 'jotai';
import { DevTools } from 'jotai-devtools';
import type { PropsWithChildren } from 'react';

import { globalStore } from './store';
import 'jotai-devtools/styles.css';

const JotaiProvider = ({ children }: PropsWithChildren) => {
  return (
    <Provider store={globalStore}>
      <DevTools store={globalStore} />
      {children}
    </Provider>
  );
};

export default JotaiProvider;
