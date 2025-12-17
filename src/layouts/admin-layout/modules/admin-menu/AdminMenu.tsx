import { useSettingsTheme } from '@/features/theme/useSettingsTheme';

import HorizontalMenu from './modules/Horizontal';
import TopHybridSidebarFirst from './modules/TopHybridSidebarFirst';
import VerticalMenu from './modules/Vertical';

const AdminMenu = memo(() => {
  const {
    layout: { mode }
  } = useSettingsTheme();

  if (mode === 'horizontal') return <HorizontalMenu />;

  if (mode === 'vertical') return <VerticalMenu />;

  return <TopHybridSidebarFirst />;
});

export default AdminMenu;
