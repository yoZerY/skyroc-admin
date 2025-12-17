import { HorizontalMenuMode } from '../enum';

import Horizontal from './Horizontal';
import Vertical from './Vertical';

const ReversedHorizontalMix = () => {
  return [
    <Vertical key="vertical" />,

    <Horizontal
      key="HopHybridHeaderFirst "
      mode={HorizontalMenuMode.FirstLevel}
    />
  ];
};

export default ReversedHorizontalMix;
