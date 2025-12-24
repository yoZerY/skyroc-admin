import type { TooltipProps } from 'antd';
import { Tooltip } from 'antd';
import clsx from 'clsx';

import { themeLayoutModeRecord } from '@/constants/app';
import { useSettingsTheme } from '@/features/theme/useSettingsTheme';
import { useAdminState } from '@/layouts/admin-layout/state/use-admin-state';

type LayoutConfig = Record<
  UnionKey.ThemeLayoutMode,
  {
    mainClass: string;
    menuClass: string;
    placement: TooltipProps['placement'];
  }
>;

type Props = Record<UnionKey.ThemeLayoutMode, React.ReactNode>;

const LAYOUT_CONFIG: LayoutConfig = {
  vertical: {
    placement: 'bottom',
    menuClass: 'w-1/3 h-full',
    mainClass: 'w-2/3 h-3/4'
  },
  'vertical-mix': {
    placement: 'bottom',
    menuClass: 'w-1/4 h-full',
    mainClass: 'w-2/3 h-3/4'
  },
  'vertical-hybrid-header-first': {
    placement: 'bottom',
    menuClass: 'w-1/4 h-full',
    mainClass: 'w-2/3 h-3/4'
  },
  horizontal: {
    placement: 'bottom',
    menuClass: 'w-full h-1/4',
    mainClass: 'w-full h-3/4'
  },
  'top-hybrid-sidebar-first': {
    placement: 'bottom',
    menuClass: 'w-full h-1/4',
    mainClass: 'w-2/3 h-3/4'
  },
  'top-hybrid-header-first': {
    placement: 'bottom',
    menuClass: 'w-full h-1/4',
    mainClass: 'w-2/3 h-3/4'
  }
};

const LayoutModeCard: FC<Props> = ({ ...rest }: Props) => {
  const { t } = useTranslation();

  const { isMobile } = useAdminState();

  const {
    layout: { mode },
    setThemeLayout
  } = useSettingsTheme();

  function handleChangeMode(modeType: UnionKey.ThemeLayoutMode) {
    if (isMobile) return;

    setThemeLayout(modeType);
  }

  return (
    <div className="grid grid-cols-2 gap-x-12px gap-y-12px md:grid-cols-3">
      {Object.entries(LAYOUT_CONFIG).map(([key, item]) => (
        <div
          className="flex-col-center cursor-pointer"
          key={key}
          onClick={() => handleChangeMode(key as UnionKey.ThemeLayoutMode)}
        >
          <Tooltip
            placement={item.placement}
            title={t(`theme.layout.layoutMode.${key}_detail`)}
          >
            <div
              className={clsx(
                'h-64px w-96px gap-6px rd-4px p-6px shadow ring-2 ring-transparent transition-all hover:ring-primary',
                mode === key && '!ring-primary'
              )}
            >
              <div className={clsx('h-full w-full gap-1', key.includes('vertical') ? 'flex' : 'flex-col')}>
                {rest[key as UnionKey.ThemeLayoutMode]}
              </div>
            </div>
          </Tooltip>

          <p className="mt-8px text-12px">{t(themeLayoutModeRecord[key as UnionKey.ThemeLayoutMode])}</p>
        </div>
      ))}
    </div>
  );
};

export default LayoutModeCard;
