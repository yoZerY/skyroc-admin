import { themeTabModeOptions } from '@/constants/app';
import { useSettingsTheme } from '@/features/theme/useSettingsTheme';
import { translateOptions } from '@/utils/common';

import AnimatedCollapse from '../../components/AnimatedCollapse';
import SettingItem from '../../components/SettingItem';

const TabSettings = () => {
  const { t } = useTranslation();

  const { setSettings, tab } = useSettingsTheme();

  const tabModeOptions = translateOptions(themeTabModeOptions);

  const updateTab = (patch: Partial<typeof tab>) => {
    setSettings({
      tab: {
        ...tab,
        ...patch
      }
    });
  };

  const handleTabVisibleChange = (visible: boolean) => {
    updateTab({ visible });
  };

  const handleTabCacheChange = (cache: boolean) => {
    updateTab({ cache });
  };

  const handleTabHeightChange = (height: number | null) => {
    if (height === null) return;
    updateTab({ height });
  };

  const handleTabModeChange = (mode: UnionKey.ThemeTabMode) => {
    updateTab({ mode });
  };

  const handleCloseTabByMiddleClickChange = (closeTabByMiddleClick: boolean) => {
    updateTab({ closeTabByMiddleClick });
  };

  return (
    <div className="flex-col-stretch gap-12px">
      <SettingItem label={t('theme.layout.tab.visible')}>
        <ASwitch
          checked={tab.visible}
          onChange={handleTabVisibleChange}
        />
      </SettingItem>

      <AnimatedCollapse
        className="flex-col-stretch gap-12px"
        visible={tab.visible}
      >
        <SettingItem
          label={t('theme.layout.tab.cache')}
          suffix={
            <ATooltip title={t('theme.layout.tab.cacheTip')}>
              <IconMdiInformationOutline className="text-icon-info" />
            </ATooltip>
          }
        >
          <ASwitch
            checked={tab.cache}
            onChange={handleTabCacheChange}
          />
        </SettingItem>

        <SettingItem label={t('theme.layout.tab.height')}>
          <AInputNumber
            className="w-120px"
            min={0}
            step={1}
            value={tab.height}
            onChange={handleTabHeightChange}
          />
        </SettingItem>

        <SettingItem label={t('theme.layout.tab.mode.title')}>
          <ASelect
            className="w-120px"
            options={tabModeOptions}
            size="small"
            value={tab.mode}
            onChange={handleTabModeChange}
          />
        </SettingItem>

        <SettingItem
          label={t('theme.layout.tab.closeByMiddleClick')}
          suffix={
            <ATooltip title={t('theme.layout.tab.closeByMiddleClickTip')}>
              <IconMdiInformationOutline className="text-icon-info" />
            </ATooltip>
          }
        >
          <ASwitch
            checked={tab.closeTabByMiddleClick}
            onChange={handleCloseTabByMiddleClickChange}
          />
        </SettingItem>
      </AnimatedCollapse>
    </div>
  );
};

export default TabSettings;
