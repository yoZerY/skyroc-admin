import { createFileRoute } from '@tanstack/react-router';

import { showNotification } from '@/config';
import { router } from '@/features/router';
import ThemeSchemaSegmented from '@/features/theme/ThemeSchemaSegmented';
import ThemeSchemaSwitch from '@/features/theme/ThemeSchemaSwitch';
import { $t } from '@/locales';

import logo from '../logo.svg';

import '../App.css';
import LangSwitch from '@/features/lang/LangSwitch';

export const Route = createFileRoute('/')({
  component: App,
  staticData: {
    icon: 'icon-home'
  }
});

const UPDATE_NOTIFICATION_KEY = 'update-notification';

let isShow = false;

const handleCancel = () => {
  console.log('handleCancel');
  isShow = false;
};

const handleOk = () => {
  showErrorMessage('223224');

  isShow = false;
};

function App() {
  useEffect(() => {
    isShow = true;
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img
          alt="logo"
          className="App-logo"
          src={logo}
        />
        <IconGridiconsFullscreenExit />
        <IconGridiconsFullscreen />

        <LangSwitch />

        <p>
          Edit2 <code>src/routes/index.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          rel="noopener noreferrer"
          target="_blank"
        >
          Learn React
        </a>
        <a
          className="App-link"
          href="https://tanstack.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          Learn TanStack
        </a>
        <ThemeSchemaSegmented />
        <ThemeSchemaSwitch />
        <AButton
          onClick={() =>
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
            })
          }
        >
          Show Notification
        </AButton>
      </header>
    </div>
  );
}
