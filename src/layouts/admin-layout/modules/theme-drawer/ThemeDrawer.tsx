import { SimpleScrollbar } from '@sa/materials';

import { useAdminState } from '../../state/use-admin-state';

import ConfigOperation from './modules/ConfigOperation';
import Appearance from './modules/appearance';

const ThemeDrawer = () => {
  const { closeThemeDrawer, themeDrawerVisible } = useAdminState();

  const { t } = useTranslation();

  const options = [t('theme.tabs.appearance'), t('theme.tabs.layout'), t('theme.tabs.general'), t('theme.tabs.preset')];

  const [activeTab, setActiveTab] = useState<string>(options[0]);

  return (
    <ADrawer
      closeIcon={false}
      footer={<ConfigOperation />}
      open={themeDrawerVisible}
      styles={{ body: { padding: 0 } }}
      title={t('theme.themeDrawerTitle')}
      extra={
        <ButtonIcon
          icon="ant-design:close-outlined"
          onClick={closeThemeDrawer}
        />
      }
      onClose={closeThemeDrawer}
    >
      <SimpleScrollbar>
        <div className="min-h-400px overflow-x-hidden px-24px pb-24px pt-8px">
          <ASegmented<string>
            classNames={{ root: 'w-full mb-16px', item: 'flex-1 py-4px font-500' }}
            options={options}
            value={activeTab}
            onChange={setActiveTab}
          />
          {activeTab === options[0] && <Appearance />}
        </div>
      </SimpleScrollbar>
    </ADrawer>
  );
};

export default ThemeDrawer;
