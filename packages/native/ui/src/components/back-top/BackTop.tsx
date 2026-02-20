import { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';
import Octicons from '@expo/vector-icons/Octicons';
import { scrollTo, useDerivedValue, useScrollOffset, useSharedValue } from 'react-native-reanimated';
import { FloatingButton } from '../floating-button/FloatingButton';
import type { BackTopProps } from './types';

const BackTop = (props: BackTopProps) => {
  const {
    bottom = 128,
    children,
    className,
    immediate = false,
    offset = 200,
    onPress,
    right = 30,
    size = 40,
    target
  } = props;

  const { height: windowHeight, width: windowWidth } = useWindowDimensions();

  const scrollOffset = useScrollOffset(target);

  const visibleValue = useDerivedValue<number>(() => (scrollOffset.value >= offset ? 1 : 0));

  // Trigger counter: incremented on press, useDerivedValue reacts and calls scrollTo on UI thread
  const scrollTrigger = useSharedValue(0);

  useDerivedValue(() => {
    if (scrollTrigger.value > 0) {
      scrollTo(target, 0, 0, !immediate);
    }
  });

  const buttonOffset = useMemo(
    () => ({
      x: windowWidth - size - right,
      y: windowHeight - size - bottom
    }),
    [windowWidth, windowHeight, size, right, bottom]
  );

  function handlePress() {
    onPress?.();
    scrollTrigger.value += 1;
  }

  return (
    <FloatingButton
      axis="lock"
      className={className}
      offset={buttonOffset}
      onPress={handlePress}
      size={size}
      visibleValue={visibleValue}
    >
      {children || (
        <Octicons
          color="white"
          name="chevron-up"
          size={20}
        />
      )}
    </FloatingButton>
  );
};

export { BackTop };
