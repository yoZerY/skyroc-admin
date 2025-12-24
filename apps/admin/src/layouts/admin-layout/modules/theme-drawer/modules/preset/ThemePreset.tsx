import defu from 'defu';
import { useMemo } from 'react';

import { themeSettings } from '@/features/theme/settings';
import { useSettingsTheme } from '@/features/theme/useSettingsTheme';

type ThemePresetProps = Pick<
  Theme.ThemeSetting,
  | 'colourWeakness'
  | 'fixedHeaderAndTab'
  | 'footer'
  | 'grayscale'
  | 'header'
  | 'isInfoFollowPrimary'
  | 'isOnlyExpandCurrentParentMenu'
  | 'layout'
  | 'otherColor'
  | 'page'
  | 'recommendColor'
  | 'sider'
  | 'tab'
  | 'themeColor'
  | 'themeRadius'
  | 'themeScheme'
  | 'themeTextSize'
  | 'tokens'
  | 'watermark'
> & {
  desc: string;
  i18nkey?: string;
  name: string;
  order?: number;
  version: string;
};

interface PresetWithId extends ThemePresetProps {
  id: string;
}

// Import preset JSON files
const presetModules = import.meta.glob<ThemePresetProps>('/src/features/theme/preset/*.json', {
  eager: true,
  import: 'default'
});

const ThemePreset = () => {
  const { t } = useTranslation();

  const {
    setColourWeakness,
    setGrayscale,
    setSettings,
    setThemeLayout,
    setThemeScheme,
    setWatermarkEnableTime,
    setWatermarkEnableUserName
  } = useSettingsTheme();

  // Extract preset data
  const presets = useMemo<PresetWithId[]>(() => {
    return Object.entries(presetModules)
      .map(([path, presetData]) => {
        const fileName = path.split('/').pop()?.replace('.json', '') || '';
        return {
          id: fileName,
          ...presetData
        };
      })
      .sort((a, b) => {
        // Sort by order field if available
        const orderA = a.order ?? 999;
        const orderB = b.order ?? 999;
        return orderA - orderB;
      });
  }, []);

  const getPresetName = (preset: ThemePresetProps): string => {
    if (!preset.i18nkey) return preset.name;
    try {
      const key = `${preset.i18nkey}.name` as I18n.I18nKey;
      const translated = t(key);
      return translated !== key ? translated : preset.name;
    } catch {
      return preset.name;
    }
  };

  const getPresetDesc = (preset: ThemePresetProps): string => {
    if (!preset.i18nkey) return preset.desc;
    try {
      const key = `${preset.i18nkey}.desc` as I18n.I18nKey;
      const translated = t(key);
      return translated !== key ? translated : preset.desc;
    } catch {
      return preset.desc;
    }
  };

  const applyPreset = (preset: ThemePresetProps): void => {
    const mergedPreset = defu(preset, themeSettings);
    const { colourWeakness, grayscale, layout, themeScheme, watermark, ...rest } = mergedPreset;

    setThemeScheme(themeScheme);
    setGrayscale(grayscale);
    setColourWeakness(colourWeakness);
    setThemeLayout(layout.mode);
    setWatermarkEnableUserName(watermark.enableUserName);
    setWatermarkEnableTime(watermark.enableTime);

    setSettings({
      ...rest,
      layout: { ...layout },
      page: { ...rest.page },
      header: { ...rest.header },
      tab: { ...rest.tab },
      sider: { ...rest.sider },
      footer: { ...rest.footer },
      watermark: { ...watermark },
      tokens: { ...rest.tokens }
    });

    showSuccessMessage(t('theme.appearance.preset.applySuccess'));
  };

  return (
    <>
      <ADivider>{t('theme.appearance.preset.title')}</ADivider>

      <div className="flex flex-col gap-12px">
        {presets.map(preset => (
          <div
            className="cursor-pointer border-primary/10 rd-8px border-solid bg-white/5 p-12px backdrop-blur-10 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
            key={preset.id}
          >
            <div className="mb-8px flex items-center justify-between">
              <div className="min-w-0 w-full flex flex-1 items-center justify-between gap-8px">
                <h5 className="m-0 truncate text-14px text-primary font-600">{getPresetName(preset)}</h5>
                <ABadge
                  className="flex-shrink-0 opacity-80"
                  count={`v${preset.version}`}
                  style={{ backgroundColor: '#2080f0' }}
                />
              </div>
              <AButton
                ghost
                className="ml-8px flex-shrink-0"
                shape="round"
                size="small"
                type="primary"
                onClick={() => applyPreset(preset)}
              >
                {t('theme.appearance.preset.apply')}
              </AButton>
            </div>

            <p className="line-clamp-2 mb-12px text-12px text-gray-500 leading-16px">{getPresetDesc(preset)}</p>

            <div className="flex items-center justify-between">
              <div className="flex gap-4px">
                {Object.entries({ primary: preset.themeColor, ...preset.otherColor }).map(([key, color]) => (
                  <div
                    className="h-12px w-12px cursor-pointer border-white/30 rd-full transition-transform hover:scale-110"
                    key={key}
                    style={{ backgroundColor: color }}
                    title={key}
                  />
                ))}
              </div>
              <div className="flex items-center gap-4px">
                <div className="text-18px">{preset.themeScheme === 'dark' ? '🌙' : '☀️'}</div>
                {preset.grayscale && <div className="text-18px">🎨</div>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ThemePreset;
