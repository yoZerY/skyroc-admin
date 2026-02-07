import { SvgIcon } from '@skyroc/ui-compose';
import type { SegmentedOptions } from 'antd/es/segmented';

import { icons } from '../shared';
import { useSettingsTheme } from '../useSettingsTheme';

const ThemeMode = ['auto', 'dark', 'light'] satisfies UnionKey.ThemeScheme[];

const OPTIONS = Object.values(ThemeMode).map(item => {
  const key = item;
  return {
    label: (
      <div className="w-[70px] flex justify-center">
        <SvgIcon
          className="text-icon-small h-28px"
          icon={icons[key]}
        />
      </div>
    ),
    value: item
  };
}) satisfies SegmentedOptions;

const ThemeSchemaSegmented = () => {
  const { setThemeScheme, themeScheme } = useSettingsTheme();

  return (
    <ASegmented
      className="bg-layout"
      options={OPTIONS}
      value={themeScheme}
      onChange={setThemeScheme}
    />
  );
};

export default ThemeSchemaSegmented;
