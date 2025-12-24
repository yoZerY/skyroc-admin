import type { ArgsProps as MessageArgsProps, MessageInstance, TypeOpen } from 'antd/es/message/interface';
import type { ModalFunc } from 'antd/es/modal/confirm';
import type { HookAPI as ModalHookAPI } from 'antd/es/modal/useModal';
import type { ArgsProps, NotificationInstance } from 'antd/es/notification/interface';
import type { NProgress } from 'nprogress';

import { menuCategory } from './features/menus/menu-category';
import { themeSettings } from './features/theme/settings';
import { localStg } from './utils/storage';

const _ui = {
  message: null as MessageInstance | null,
  modal: null as ModalHookAPI | null,
  nprogress: null as NProgress | null,
  notification: null as NotificationInstance | null
};

/**
 * 初始化 Antd UI 组件实例
 * @param message - Antd 消息实例
 * @param modal - Antd 模态框实例
 * @param notification - Antd 通知实例
 */
export function initAntdProvider(message: MessageInstance, modal: ModalHookAPI, notification: NotificationInstance) {
  _ui.message = message;
  _ui.modal = modal;
  _ui.notification = notification;
}

export function initNProgress(nprogress: NProgress) {
  _ui.nprogress = nprogress;
}

function createConfig() {
  return {
    // ======System Config======
    /** - 是否自动检测更新 */
    automaticallyDetectUpdate: true,

    /** - 是否开发环境 */
    isDev: import.meta.env.DEV,
    /** - 生成菜单的布局 */
    genMenuLayouts: [menuCategory.admin.key],
    /** - 默认首页 */
    defaultHome: import.meta.env.VITE_ROUTE_HOME,

    localIconPrefix: import.meta.env.VITE_ICON_LOCAL_PREFIX,

    defaultIcon: import.meta.env.VITE_MENU_ICON,

    routeMode: import.meta.env.VITE_AUTH_ROUTE_MODE,

    /** - nprogress 实例 */
    get nprogress(): NProgress {
      if (!_ui.nprogress) {
        console.error('nprogress is not initialized, please call initNProgress function first');
        throw new Error('nprogress is not initialized');
      }
      return _ui.nprogress;
    },

    /// //////////////////////////////////////////////////////////////////////////////
    // ======Theme Config======
    /// //////////////////////////////////////////////////////////////////////////////
    /** - 默认主题配置 */
    get defaultThemeColor(): string {
      return localStg.get('themeColor') || themeSettings.themeColor;
    },
    get defaultDarkMode(): boolean {
      return localStg.get('darkMode') || themeSettings.themeScheme === 'dark';
    },

    /// //////////////////////////////////////////////////////////////////////////////
    // ======Lang Config======
    /// //////////////////////////////////////////////////////////////////////////////
    /** - 默认语言配置 */
    get defaultLang(): I18n.LangType {
      return localStg.get('lang') || 'zh-CN';
    },
    /** - 默认语言选项 */
    get defaultLangOptions(): I18n.LangOption[] {
      return [
        {
          key: 'zh-CN',
          label: '中文'
        },
        {
          key: 'en-US',
          label: 'English'
        }
      ];
    },

    /// //////////////////////////////////////////////////////////////////////////////
    // ======Antd UI Config======
    /// //////////////////////////////////////////////////////////////////////////////
    /** - antd 消息实例 */
    get message(): MessageInstance {
      if (!_ui.message) {
        console.error('message is not initialized, please call AntdContextHolder component first');
        throw new Error('message is not initialized');
      }
      return _ui.message;
    },
    /** - antd 模态框实例 */
    get modal(): ModalHookAPI {
      if (!_ui.modal) {
        console.error('modal is not initialized, please call AntdContextHolder component first');
        throw new Error('modal is not initialized');
      }
      return _ui.modal;
    },
    /** - antd 通知实例 */
    get notification(): NotificationInstance {
      if (!_ui.notification) {
        console.error('notification is not initialized, please call AntdContextHolder component first');
        throw new Error('notification is not initialized');
      }
      return _ui.notification;
    }
  } as const;
}

export const globalConfig = createConfig();

/**
 * 显示通知
 * @param config - 通知配置
 * @returns 通知实例
 */
export function showNotification(config: ArgsProps) {
  return globalConfig.notification.open(config);
}

/**
 * 销毁通知
 * @param key - 通知的唯一标识,不传则销毁所有通知
 */
export function destroyNotification(key?: React.Key) {
  return globalConfig.notification.destroy(key);
}

/**
 * 显示成功通知
 * @param config - 通知配置
 * @returns 通知实例
 */
export function showSuccessNotification(config: ArgsProps) {
  return globalConfig.notification.success(config);
}

/**
 * 显示错误通知
 * @param config - 通知配置
 * @returns 通知实例
 */
export function showErrorNotification(config: ArgsProps) {
  return globalConfig.notification.error(config);
}

/**
 * 显示信息通知
 * @param config - 通知配置
 * @returns 通知实例
 */
export function showInfoNotification(config: ArgsProps) {
  return globalConfig.notification.info(config);
}

/**
 * 显示警告通知
 * @param config - 通知配置
 * @returns 通知实例
 */
export function showWarningNotification(config: ArgsProps) {
  return globalConfig.notification.warning(config);
}

/**
 * 显示消息
 * @param config - 消息配置
 * @returns 消息实例
 */
export function showMessage(config: MessageArgsProps) {
  return globalConfig.message.open(config);
}

/**
 * 销毁消息
 * @param key - 消息的唯一标识,不传则销毁所有消息
 */
export function destroyMessage(key?: React.Key) {
  return globalConfig.message.destroy(key);
}

/**
 * 显示成功消息
 * @param args - 消息配置参数
 * @returns 消息实例
 */
export const showSuccessMessage: TypeOpen = (...args) => {
  return globalConfig.message.success(...args);
};

/**
 * 显示错误消息
 * @param args - 消息配置参数
 * @returns 消息实例
 */
export const showErrorMessage: TypeOpen = (...args) => {
  return globalConfig.message.error(...args);
};

/**
 * 显示信息消息
 * @param args - 消息配置参数
 * @returns 消息实例
 */
export const showInfoMessage: TypeOpen = (...args) => {
  return globalConfig.message.info(...args);
};

/**
 * 显示警告消息
 * @param args - 消息配置参数
 * @returns 消息实例
 */
export const showWarningMessage: TypeOpen = (...args) => {
  return globalConfig.message.warning(...args);
};

/**
 * 显示加载消息
 * @param args - 消息配置参数
 * @returns 消息实例
 */
export const showLoadingMessage: TypeOpen = (...args) => {
  return globalConfig.message.loading(...args);
};

/**
 * 显示模态框
 * @param args - 模态框配置参数
 * @returns 模态框实例
 */
export const showModal: ModalFunc = (...args) => {
  return globalConfig.modal.confirm(...args);
};

/**
 * 显示确认模态框
 * @param args - 模态框配置参数
 * @returns 模态框实例
 */
export const showConfirmModal: ModalFunc = (...args) => {
  return globalConfig.modal.confirm(...args);
};

/**
 * - 显示信息模态框
 * @param args - 模态框配置参数
 * @returns 模态框实例
 */
export const showInfoModal: ModalFunc = (...args) => {
  return globalConfig.modal.info(...args);
};

/**
 * 显示成功模态框
 * @param args - 模态框配置参数
 * @returns 模态框实例
 */
export const showSuccessModal: ModalFunc = (...args) => {
  return globalConfig.modal.success(...args);
};

/**
 * 显示错误模态框
 * @param args - 模态框配置参数
 * @returns 模态框实例
 */
export const showErrorModal: ModalFunc = (...args) => {
  return globalConfig.modal.error(...args);
};

/**
 * 显示警告模态框
 * @param args - 模态框配置参数
 * @returns 模态框实例
 */
export const showWarningModal: ModalFunc = (...args) => {
  return globalConfig.modal.warning(...args);
};
