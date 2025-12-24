import { useSettingsTheme } from '@/features/theme/useSettingsTheme';

import HorizontalMenu from './modules/Horizontal';
import TopHybridHeaderFirst from './modules/TopHybridHeaderFirst';
import TopHybridSidebarFirst from './modules/TopHybridSidebarFirst';
import VerticalMenu from './modules/Vertical';
import VerticalHybridHeaderFirst from './modules/VerticalHybridHeaderFirst';
import VerticalMix from './modules/VerticalMix';

const AdminMenu = memo(() => {
  const {
    layout: { mode }
  } = useSettingsTheme();

  if (mode === 'horizontal') return <HorizontalMenu />;

  if (mode === 'vertical') return <VerticalMenu />;

  if (mode === 'top-hybrid-header-first') return <TopHybridHeaderFirst />;

  if (mode === 'vertical-mix') return <VerticalMix />;

  if (mode === 'vertical-hybrid-header-first') return <VerticalHybridHeaderFirst />;

  return <TopHybridSidebarFirst />;
});

export default AdminMenu;
