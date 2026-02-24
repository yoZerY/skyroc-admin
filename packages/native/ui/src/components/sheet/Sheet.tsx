import { useCallback, useEffect, useRef } from 'react';
import { Pressable, View } from 'react-native';
import { cn } from '@skyroc/utils';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import type { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '../text/Typography';
import { sheetVariants } from './sheet-variants';
import type { SheetProps } from './types';

/** 底部面板组件，基于 @gorhom/bottom-sheet */
const Sheet = (props: SheetProps) => {
  const {
    children,
    className,
    classNames,
    closeable = true,
    description,
    enablePanDownToClose = true,
    onUpdateShow,
    show,
    showHandle = true,
    snapPoints,
    title,
    ...rest
  } = props;

  const sheetRef = useRef<BottomSheetModal>(null);
  const slots = sheetVariants();
  const hasHeader = Boolean(title) || closeable;
  const insets = useSafeAreaInsets();

  // 根据 show 控制 present / dismiss
  useEffect(() => {
    if (show) {
      sheetRef.current?.present();
    } else {
      sheetRef.current?.dismiss();
    }
  }, [show]);

  function handleDismiss() {
    onUpdateShow?.(false);
  }

  function handleClose() {
    sheetRef.current?.dismiss();
  }

  const renderBackdrop = useCallback(
    (backdropProps: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...backdropProps}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.4}
        pressBehavior="close"
      />
    ),
    []
  );

  return (
    <BottomSheetModal
      ref={sheetRef}
      backdropComponent={renderBackdrop}
      enableDynamicSizing={!snapPoints}
      handleComponent={null}
      enablePanDownToClose={enablePanDownToClose}
      snapPoints={snapPoints}
      onDismiss={handleDismiss}
      {...rest}
    >
      <BottomSheetView style={{ paddingBottom: insets.bottom }}>
        <View className={cn(slots.root(), className)}>
          {/* Handle */}
          {showHandle && (
            <View className={cn(slots.handle(), classNames?.handle)}>
              <View className={cn(slots.handleBar(), classNames?.handleBar)} />
            </View>
          )}

          {/* Header */}
          {hasHeader && (
            <View className={cn(slots.header(), classNames?.header)}>
              {title ? <Text className={cn(slots.title(), classNames?.title)}>{title}</Text> : null}
              {closeable && (
                <Pressable
                  className={cn(slots.close(), classNames?.close)}
                  onPress={handleClose}
                >
                  <AntDesign
                    color="#333"
                    name="close"
                    size={12}
                  />
                </Pressable>
              )}
            </View>
          )}

          {/* Description */}
          {description ? <Text className={cn(slots.description(), classNames?.description)}>{description}</Text> : null}

          {/* Body */}
          <View className={cn(slots.body(), classNames?.body)}>{children}</View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export { Sheet };
