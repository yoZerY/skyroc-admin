import { FirstLevelMenuMode, HorizontalMenuMode } from '../enum';

import Horizontal from './Horizontal';
import VerticalMixMenu from './VerticalMix';

const VerticalHybridHeaderFirst = () => {
  return [
    <Horizontal
      key="vertical-hybrid-header-first-horizontal"
      mode={HorizontalMenuMode.FirstLevel}
    />,

    <VerticalMixMenu
      key="vertical-hybrid-header-first-vertical-mix"
      mode={FirstLevelMenuMode.SecondLevel}
    />
  ];
};

export default VerticalHybridHeaderFirst;
