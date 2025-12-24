import type { PropsWithChildren } from 'react';

import { initAntdProvider } from '@/config';

function ContextHolder() {
  const { message, modal, notification } = AApp.useApp();
  initAntdProvider(message, modal, notification);
  return null;
}

const AntdContextHolder = ({ children }: PropsWithChildren) => {
  return (
    <AApp className="h-full">
      <ContextHolder />
      {children}
    </AApp>
  );
};

export default AntdContextHolder;
