import { destroyNotification, globalConfig, showNotification } from '@/config';
import { router } from '@/features/router';

import { $t } from '../locales';

const UPDATE_NOTIFICATION_KEY = 'update-notification';

export function setupAppVersionNotification() {
  // Update check interval in milliseconds
  const UPDATE_CHECK_INTERVAL = 3 * 60 * 1000;

  const canAutoUpdateApp = globalConfig.automaticallyDetectUpdate && import.meta.env.PROD;

  if (!canAutoUpdateApp) return;

  let isShow = false;
  let updateInterval: ReturnType<typeof setInterval> | undefined;

  const checkForUpdates = async () => {
    if (isShow) return;

    const buildTime = await getHtmlBuildTime();

    // If failed to get build time or build time hasn't changed, no update is needed.
    if (!buildTime || buildTime === BUILD_TIME) {
      return;
    }

    isShow = true;

    const handleCancel = () => {
      destroyNotification(UPDATE_NOTIFICATION_KEY);
    };

    const handleOk = () => {
      router.navigate({ to: '.' });
    };

    showNotification({
      actions: (
        <div className="w-325px flex justify-end gap-3">
          <AButton
            key="cancel"
            onClick={handleCancel}
          >
            {$t('system.updateCancel')}
          </AButton>
          <AButton
            key="ok"
            type="primary"
            onClick={handleOk}
          >
            {$t('system.updateConfirm')}
          </AButton>
        </div>
      ),
      description: $t('system.updateContent'),
      key: UPDATE_NOTIFICATION_KEY,
      onClose() {
        isShow = false;
      },
      title: $t('system.updateTitle')
    });
  };

  function startUpdateInterval() {
    if (updateInterval) {
      clearInterval(updateInterval);
    }
    updateInterval = setInterval(checkForUpdates, UPDATE_CHECK_INTERVAL);
  }

  // If updates should be checked, set up the visibility change listener and start the update interval
  if (!isShow && document.visibilityState === 'visible') {
    // Check for updates when the document is visible
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        checkForUpdates();
        startUpdateInterval();
      }
    });

    // Start the update interval
    startUpdateInterval();
  }
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
