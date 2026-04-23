import type { LoggerInstance } from '@skyroc/logger';
import { createLogger } from '@skyroc/logger';
import { atom } from 'jotai';

/** 日志实例 atom */
export const loggerInstanceAtom = atom<LoggerInstance | null>(null);

/** 日志初始化状态 atom */
export const loggerInitializedAtom = atom(false);

/** 日志配置 */
const LOGGER_CONFIG = {
  /** 日志保留天数 */
  retentionDays: 7,
  /** 白名单检查端点 */
  whitelistEndpoint: '/api/log/whitelist',
  /** 日志上传端点 */
  uploadEndpoint: '/api/log/upload',
  /** 白名单检查间隔（5 分钟） */
  whitelistCheckInterval: 5 * 60 * 1000,
  /** 批量上传大小 */
  uploadBatchSize: 100
};

/** 日志实例缓存 */
let loggerInstance: LoggerInstance | null = null;

/**
 * 初始化日志系统
 *
 * @returns 日志实例
 */
export async function initLogger(): Promise<LoggerInstance> {
  if (loggerInstance) {
    return loggerInstance;
  }

  loggerInstance = await createLogger(LOGGER_CONFIG);
  return loggerInstance;
}

/** 获取日志实例 如果未初始化，会自动初始化 */
export async function getLogger() {
  const instance = await initLogger();
  return instance.logger;
}

/** 快捷日志方法 */
export const log = {
  debug: async (message: string, data?: Record<string, any>) => {
    const logger = await getLogger();
    if (data) {
      logger.withMetadata(data).debug(message);
    } else {
      logger.debug(message);
    }
  },

  info: async (message: string, data?: Record<string, any>) => {
    const logger = await getLogger();
    if (data) {
      logger.withMetadata(data).info(message);
    } else {
      logger.info(message);
    }
  },

  warn: async (message: string, data?: Record<string, any>) => {
    const logger = await getLogger();
    if (data) {
      logger.withMetadata(data).warn(message);
    } else {
      logger.warn(message);
    }
  },

  error: async (message: string, error?: Error, data?: Record<string, any>) => {
    const logger = await getLogger();
    if (error) {
      logger
        .withError(error)
        .withMetadata(data ?? {})
        .error(message);
    } else if (data) {
      logger.withMetadata(data).error(message);
    } else {
      logger.error(message);
    }
  }
};

/**
 * 创建带上下文的日志记录器
 *
 * @param context 上下文名称
 */
export async function createContextLogger(context: string) {
  const logger = await getLogger();
  return logger.withContext({ module: context });
}

/** 手动上传日志 */
export async function uploadLogs() {
  if (!loggerInstance) {
    return undefined;
  }
  return loggerInstance.uploadLogs();
}

/** 销毁日志实例 */
export function disposeLogger() {
  if (loggerInstance) {
    loggerInstance.dispose();
    loggerInstance = null;
  }
}
