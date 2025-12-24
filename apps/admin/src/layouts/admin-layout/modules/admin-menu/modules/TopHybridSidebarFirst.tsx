import { GLOBAL_SIDER_MENU_ID } from '@/constants/app';

import FirstLevelMenu from '../components/FirstLevelMenu';
import { HorizontalMenuMode } from '../enum';

import Horizontal from './Horizontal';

const HorizontalMix = () => {
  return [
    <Horizontal
      key="horizontal"
      mode={HorizontalMenuMode.Child}
    />,
    <Portal
      container={GLOBAL_SIDER_MENU_ID}
      key="first-level-menu"
    >
      <FirstLevelMenu key="first-level-menu" />
    </Portal>
  ];
};

export default HorizontalMix;
