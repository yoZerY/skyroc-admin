import { Portal } from '@skyroc/web-ui-compose';

import { GLOBAL_SIDER_MENU_ID } from '@/constants/app';

import VerticalMenu from '../components/VerticalMenu';

const Vertical = () => {
  return (
    <Portal container={GLOBAL_SIDER_MENU_ID}>
      <VerticalMenu />
    </Portal>
  );
};

export default Vertical;
