import { ButtonIcon } from '@skyroc/ui-antd';

import { useAdminState } from '@/layouts/admin-layout/state/use-admin-state';

const ThemeButton = memo(() => {
  const { t } = useTranslation();

  const { openThemeDrawer } = useAdminState();

  return (
    <ButtonIcon
      triggerParent
      className="px-12px"
      hoverAnimation="pulse"
      icon="majesticons:color-swatch-line"
      tooltipContent={t('icon.themeConfig')}
      onClick={openThemeDrawer}
    />
  );
});

export default ThemeButton;
