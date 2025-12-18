import { SimpleScrollbar } from '@sa/materials';
import { AnimatePresence, motion } from 'motion/react';

import { themeTabsOptions } from '@/constants/app';
import { translateOptions } from '@/utils/common';

import { useAdminState } from '../../state/use-admin-state';

import ConfigOperation from './modules/ConfigOperation';
import Appearance from './modules/appearance';
import ThemeGeneral from './modules/general/ThemeGeneral';
import ThemeLayout from './modules/layout/ThemeLayout';
import ThemePreset from './modules/preset/ThemePreset';

const ThemeDrawer = () => {
  const { closeThemeDrawer, themeDrawerVisible } = useAdminState();

  const { t } = useTranslation();

  const options = translateOptions(themeTabsOptions);

  const [activeTab, setActiveTab] = useState<string>(options[0].value);

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
            classNames={{ root: 'w-full mb-16px', item: 'flex-1 py-2px font-500' }}
            options={options}
            value={activeTab}
            onChange={setActiveTab}
          />

          <AnimatePresence
            initial={false}
            mode="wait"
          >
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              initial={{ opacity: 0, x: 10 }}
              key={activeTab}
              transition={{
                duration: 0.2,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              {activeTab === options[0].value && <Appearance />}
              {activeTab === options[1].value && <ThemeLayout />}
              {activeTab === options[2].value && <ThemeGeneral />}
              {activeTab === options[3].value && <ThemePreset />}
            </motion.div>
          </AnimatePresence>
        </div>
      </SimpleScrollbar>
    </ADrawer>
  );
};

export default ThemeDrawer;
