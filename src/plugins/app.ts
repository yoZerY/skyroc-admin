import { Button } from 'antd';
import { createElement } from 'react';

import { globalConfig } from '@/config';

import { $t } from '../locales';

export function setupAppVersionNotification() {
  // Update check interval in milliseconds
  const UPDATE_CHECK_INTERVAL = 3 * 60 * 1000;

  const canAutoUpdateApp = import.meta.env.VITE_AUTOMATICALLY_DETECT_UPDATE === 'Y' && import.meta.env.PROD;

  if (!canAutoUpdateApp) return;

  let isShow = false;

  document.addEventListener('visibilitychange', async () => {
    const preConditions = [!isShow, document.visibilityState === 'visible'];

    if (!preConditions.every(Boolean)) return;

    const buildTime = await getHtmlBuildTime();

    if (buildTime === BUILD_TIME) return;

    isShow = true;

    window.$notification?.open({
      btn: (() => {
        return createElement(
          'div',
          { style: { display: 'flex', gap: '12px', justifyContent: 'end', width: '325px' } },
          [
            createElement(
              Button,

              {
                key: 'cancel',
                onClick() {
                  window.$notification?.destroy();
                }
              },
              $t('system.updateCancel')
            ),
            createElement(
              Button,
              {
                key: 'ok',
                onClick() {
                  location.reload();
                },
                type: 'primary'
              },
              $t('sys')
            )
          ]
        );
      })(),
      description: $t('system.updateContent'),
      message: $t('system.updateTitle'),
      onClose() {
        isShow = false;
      }
    });
  });
}

async function getHtmlBuildTime(): Promise<string | null> {
  const baseUrl = import.meta.env.VITE_BASE_URL || '/';

  try {
    const res = await fetch(`${baseUrl}index.html?time=${Date.now()}`);

    if (!res.ok) {
      return null;
    }

    const html = await res.text();
    const match = html.match(/<meta name="buildTime" content="(.*)">/);
    return match?.[1] || null;
  } catch (error) {
    window.console.error('getHtmlBuildTime error:', error);
    return null;
  }
}
