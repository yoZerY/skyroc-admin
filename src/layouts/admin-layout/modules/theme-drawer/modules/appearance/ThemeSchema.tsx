import ThemeSchemaSegmented from '@/features/theme/ThemeSchemaSegmented';
import { useSettingsTheme } from '@/features/theme/useSettingsTheme';

import SettingItem from '../../components/SettingItem';
import '@/styles/css/darkMode.css';

const DarkMode = () => {
  const { t } = useTranslation();

  const {
    colourWeakness,
    grayscale,
    isOnlyExpandCurrentParentMenu,
    setColourWeakness,
    setGrayscale,
    setSettings,
    sider
  } = useSettingsTheme();

  const handleIsOnlyExpandCurrentParentMenuChange = (value: boolean) => {
    setSettings({ isOnlyExpandCurrentParentMenu: value });
  };

  const handleSiderInvertedChange = (value: boolean) => {
    setSettings({ sider: { ...sider, inverted: value } });
  };

  return (
    <div className="flex-col-stretch gap-16px">
      <div className="i-flex-center">
        <ThemeSchemaSegmented />
      </div>

      <SettingItem label={t('theme.layout.sider.inverted')}>
        <ASwitch
          checked={sider.inverted}
          onChange={handleSiderInvertedChange}
        />
      </SettingItem>
      <SettingItem label={t('theme.appearance.grayscale')}>
        <ASwitch
          checked={grayscale}
          onChange={setGrayscale}
        />
      </SettingItem>

      <SettingItem label={t('theme.appearance.colourWeakness')}>
        <ASwitch
          checked={colourWeakness}
          onChange={setColourWeakness}
        />
      </SettingItem>

      <SettingItem label={t('theme.appearance.isOnlyExpandCurrentParentMenu')}>
        <ASwitch
          checked={isOnlyExpandCurrentParentMenu}
          onChange={handleIsOnlyExpandCurrentParentMenuChange}
        />
      </SettingItem>
    </div>
  );
};

export default DarkMode;
