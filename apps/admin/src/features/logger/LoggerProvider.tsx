import { useSetAtom } from 'jotai';
import { useEffect } from 'react';

import { disposeLogger, initLogger, loggerInitializedAtom, loggerInstanceAtom } from '.';

interface LoggerProviderProps {
  /** 子组件 */
  children: React.ReactNode;
}

/** 日志系统 Provider 在应用启动时初始化日志系统，在卸载时销毁 */
export const LoggerProvider = (props: LoggerProviderProps) => {
  const { children } = props;

  const setLoggerInstance = useSetAtom(loggerInstanceAtom);
  const setLoggerInitialized = useSetAtom(loggerInitializedAtom);

  useEffect(() => {
    async function init() {
      try {
        const instance = await initLogger();
        setLoggerInstance(instance);
        setLoggerInitialized(true);
        instance.logger.info('Logger initialized successfully');
      } catch (error) {
        console.error('Failed to initialize logger:', error);
      }
    }

    init();

    return () => {
      disposeLogger();
      setLoggerInstance(null);
      setLoggerInitialized(false);
    };
  }, [setLoggerInstance, setLoggerInitialized]);

  return children;
};
