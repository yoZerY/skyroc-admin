import { createRoot } from 'react-dom/client';

import App from './App';
import { setupI18n } from './locales';
import { setupAppVersionNotification } from './plugins/app';
import { setupDayjs } from './plugins/dayjs';
import { setupIconifyOffline } from './plugins/iconify';
import './plugins/assets';

function setupApp() {
  const container = document.getElementById('root');

  if (!container) return;

  const root = createRoot(container);

  root.render(<App />);

  setupI18n();

  setupDayjs();

  setupIconifyOffline();

  setupAppVersionNotification();
}

setupApp();
