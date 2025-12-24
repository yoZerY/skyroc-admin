import { Provider } from 'jotai';
import type { PropsWithChildren } from 'react';

import { globalStore } from './store';

const JotaiProvider = ({ children }: PropsWithChildren) => {
  return <Provider store={globalStore}>{children}</Provider>;
};

export default JotaiProvider;
