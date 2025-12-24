import { useSettingsTheme } from '@/features/theme/useSettingsTheme';

import AnimatedCollapse from '../../components/AnimatedCollapse';
import SettingItem from '../../components/SettingItem';

const SiderSettings = () => {
  const { t } = useTranslation();

  const { layout, setSettings, sider } = useSettingsTheme();

  const layoutMode = layout.mode;
  const isMixLayoutMode = layoutMode.includes('mix') || layoutMode.includes('hybrid');
  const isHybridLayoutMode = layoutMode.includes('hybrid');

  const updateSider = (patch: Partial<typeof sider>) => {
    setSettings({
      sider: {
        ...sider,
        ...patch
      }
    });
  };

  const handleWidthChange = (width: number | null) => {
    if (width === null) return;
    updateSider({ width });
  };

  const handleCollapsedWidthChange = (collapsedWidth: number | null) => {
    if (collapsedWidth === null) return;
    updateSider({ collapsedWidth });
  };

  const handleMixWidthChange = (mixWidth: number | null) => {
    if (mixWidth === null) return;
    updateSider({ mixWidth });
  };

  const handleMixCollapsedWidthChange = (mixCollapsedWidth: number | null) => {
    if (mixCollapsedWidth === null) return;
    updateSider({ mixCollapsedWidth });
  };

  const handleMixChildMenuWidthChange = (mixChildMenuWidth: number | null) => {
    if (mixChildMenuWidth === null) return;
    updateSider({ mixChildMenuWidth });
  };

  const handleAutoSelectFirstMenuChange = (autoSelectFirstMenu: boolean) => {
    updateSider({ autoSelectFirstMenu });
  };

  return (
    <div className="flex-col-stretch gap-12px">
      <AnimatedCollapse
        className="flex-col-stretch gap-12px"
        visible={layoutMode === 'vertical'}
      >
        <SettingItem label={t('theme.layout.sider.width')}>
          <AInputNumber
            className="w-120px"
            min={0}
            step={1}
            value={sider.width}
            onChange={handleWidthChange}
          />
        </SettingItem>

        <SettingItem label={t('theme.layout.sider.collapsedWidth')}>
          <AInputNumber
            className="w-120px"
            min={0}
            step={1}
            value={sider.collapsedWidth}
            onChange={handleCollapsedWidthChange}
          />
        </SettingItem>
      </AnimatedCollapse>

      <AnimatedCollapse
        className="flex-col-stretch gap-12px"
        visible={isMixLayoutMode}
      >
        <SettingItem label={t('theme.layout.sider.mixWidth')}>
          <AInputNumber
            className="w-120px"
            min={0}
            step={1}
            value={sider.mixWidth}
            onChange={handleMixWidthChange}
          />
        </SettingItem>

        <SettingItem label={t('theme.layout.sider.mixCollapsedWidth')}>
          <AInputNumber
            className="w-120px"
            min={0}
            step={1}
            value={sider.mixCollapsedWidth}
            onChange={handleMixCollapsedWidthChange}
          />
        </SettingItem>
      </AnimatedCollapse>

      <AnimatedCollapse visible={layoutMode === 'vertical-mix'}>
        <SettingItem label={t('theme.layout.sider.mixChildMenuWidth')}>
          <AInputNumber
            className="w-120px"
            min={0}
            step={1}
            value={sider.mixChildMenuWidth}
            onChange={handleMixChildMenuWidthChange}
          />
        </SettingItem>
      </AnimatedCollapse>

      <AnimatedCollapse visible={isHybridLayoutMode}>
        <SettingItem
          label={t('theme.layout.sider.autoSelectFirstMenu')}
          suffix={
            <ATooltip title={t('theme.layout.sider.autoSelectFirstMenuTip')}>
              <IconMdiInformationOutline className="text-icon-info" />
            </ATooltip>
          }
        >
          <ASwitch
            checked={sider.autoSelectFirstMenu}
            onChange={handleAutoSelectFirstMenuChange}
          />
        </SettingItem>
      </AnimatedCollapse>
    </div>
  );
};

export default SiderSettings;
