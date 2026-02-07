import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';

import App from './App';
import { ErrorBoundary as FallbackRender } from '@skyroc/ui-antd';
import { setupI18n } from './locales';
import { setupAppVersionNotification } from './plugins/app';
import { setupDayjs } from './plugins/dayjs';
import { setupIconifyOffline } from './plugins/iconify';
import { setupNProgress } from './plugins/nprogress';

import './plugins/assets';

function setupApp() {
  const container = document.getElementById('app');

  if (!container) return;

  const root = createRoot(container);

  root.render(
    <ErrorBoundary FallbackComponent={FallbackRender}>
      <App />
    </ErrorBoundary>
  );

  setupI18n();

  setupDayjs();

  setupNProgress();

  setupIconifyOffline();

  setupAppVersionNotification();
}

setupApp();
