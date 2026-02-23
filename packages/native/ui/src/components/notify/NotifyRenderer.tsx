import { View } from 'react-native';
import { useStore } from '@skyroc/hooks';
import { Notify } from './Notify';
import { notifyManager } from './notify-manager';

/** Notify 渲染器，通过 Portal 自动挂载 */
const NotifyRenderer = () => {
  const entry = useStore(notifyManager);

  if (!entry) return null;

  function handleClose() {
    notifyManager.close();
    entry?.onClose?.();
  }

  return (
    <View
      className="absolute inset-x-0 z-50"
      pointerEvents="box-none"
      style={entry.position === 'bottom' ? { bottom: 0 } : { top: 0 }}
    >
      <Notify
        {...entry}
        show
        onUpdateShow={() => handleClose()}
      />
    </View>
  );
};

export { NotifyRenderer };
