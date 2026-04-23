import { Portal } from '@skyroc/web-ui-compose';

import { GLOBAL_HEADER_MENU_ID } from '@/constants/app';

import HorizontalMenu from '../components/HorizontalMenu';
import { HorizontalMenuMode } from '../enum';

interface Props {
  /** 水平菜单显示模式 */
  readonly mode?: HorizontalMenuMode;
}

const Horizontal = ({ mode = HorizontalMenuMode.All }: Props) => {
  return (
    <Portal container={GLOBAL_HEADER_MENU_ID}>
      <HorizontalMenu mode={mode} />
    </Portal>
  );
};

export default Horizontal;
