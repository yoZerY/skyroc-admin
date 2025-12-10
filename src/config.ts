import type { WatermarkProps } from 'antd';
import type { ArgsProps as MessageArgsProps, MessageInstance, TypeOpen } from 'antd/es/message/interface';
import type { ModalFunc } from 'antd/es/modal/confirm';
import type { HookAPI as ModalHookAPI } from 'antd/es/modal/useModal';
import type { ArgsProps, NotificationInstance } from 'antd/es/notification/interface';

const _ui = {
  message: null as MessageInstance | null,
  modal: null as ModalHookAPI | null,
  notification: null as NotificationInstance | null
};

export function initAntdProvider(message: MessageInstance, modal: ModalHookAPI, notification: NotificationInstance) {
  _ui.message = message;
  _ui.modal = modal;
  _ui.notification = notification;
}

function createConfig() {
  return {
    /** - 是否自动检测更新 */
    automaticallyDetectUpdate: true,
    // ======Lang Config======
    /** - 默认语言配置 */
    defaultLang: 'zh-CN',

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
    localIconPrefix: import.meta.env.VITE_ICON_LOCAL_PREFIX,
    // ======Antd UI Config======
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
    },
    /** - antd 水印配置 */
    watermarkConfig: {
      font: {
        fontSize: 16
      },
      height: 128,
      offset: [12, 60],
      rotate: -15,
      width: 240,
      zIndex: 9999
    } satisfies WatermarkProps,
    /** - antd 水印文本 */
    watermarkText: 'SkyrocAdmin'
  } as const;
}

export const globalConfig = createConfig();

export function showNotification(config: ArgsProps) {
  return globalConfig.notification.open(config);
}

export function destroyNotification(key?: React.Key) {
  return globalConfig.notification.destroy(key);
}

export function showSuccessNotification(config: ArgsProps) {
  return globalConfig.notification.success(config);
}

export function showErrorNotification(config: ArgsProps) {
  return globalConfig.notification.error(config);
}

export function showInfoNotification(config: ArgsProps) {
  return globalConfig.notification.info(config);
}

export function showWarningNotification(config: ArgsProps) {
  return globalConfig.notification.warning(config);
}

export function showMessage(config: MessageArgsProps) {
  return globalConfig.message.open(config);
}

export function destroyMessage(key?: React.Key) {
  return globalConfig.message.destroy(key);
}

export const showSuccessMessage: TypeOpen = (...args) => {
  return globalConfig.message.success(...args);
};

export const showErrorMessage: TypeOpen = (...args) => {
  return globalConfig.message.error(...args);
};

export const showInfoMessage: TypeOpen = (...args) => {
  return globalConfig.message.info(...args);
};

export const showWarningMessage: TypeOpen = (...args) => {
  return globalConfig.message.warning(...args);
};

export const showLoadingMessage: TypeOpen = (...args) => {
  return globalConfig.message.loading(...args);
};

export const showModal: ModalFunc = (...args) => {
  return globalConfig.modal.confirm(...args);
};

export const showConfirmModal: ModalFunc = (...args) => {
  return globalConfig.modal.confirm(...args);
};

export const showInfoModal: ModalFunc = (...args) => {
  return globalConfig.modal.info(...args);
};

export const showSuccessModal: ModalFunc = (...args) => {
  return globalConfig.modal.success(...args);
};

export const showErrorModal: ModalFunc = (...args) => {
  return globalConfig.modal.error(...args);
};

export const showWarningModal: ModalFunc = (...args) => {
  return globalConfig.modal.warning(...args);
};
