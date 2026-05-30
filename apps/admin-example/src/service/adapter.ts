import { createAdminRequestAdapter } from '@skyroc/web-admin-runtime';
import type { RequestAdapter } from '@skyroc/service';

import { setAuth } from '@/features/auth/use-auth';
import { router } from '@/features/router';
import { $t } from '@/locales';
import { localStg } from '@/utils/storage';

import { fetchRefreshToken } from './api';

function showRequestErrorMessage(msg: string, onClose?: () => void) {
  if (onClose) {
    showErrorMessage({ content: msg, onClose });
    return;
  }

  showErrorMessage(msg);
}

function showRequestErrorModal(options: Parameters<RequestAdapter['showErrorModal']>[0]) {
  showErrorModal({
    content: options.content,
    keyboard: false,
    maskClosable: options.maskClosable ?? false,
    okText: $t('common.confirm'),
    onCancel() {
      options.onConfirm();
    },
    onOk() {
      options.onConfirm();
    },
    title: options.title
  });
}

export const antdAdapter: RequestAdapter = createAdminRequestAdapter({
  fetchRefreshToken: refreshToken => fetchRefreshToken(refreshToken),
  getCurrentPath: () => router.state.location.href,
  redirectToLogin: redirectPath => {
    router.navigate({ search: { redirect: redirectPath }, to: '/login-out' });
  },
  setAuth: tokens => setAuth(tokens),
  showErrorMessage: showRequestErrorMessage,
  showErrorModal: showRequestErrorModal,
  storage: localStg,
  t: key => $t(key)
});
