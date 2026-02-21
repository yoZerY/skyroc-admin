import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { cn } from '@skyroc/utils';
import { inputVariants } from './input-variants';
import type { InputProps } from './types';

const Input = (props: InputProps) => {
  const {
    classNames,
    clearable = false,
    disabled = false,
    error,
    leading,
    onBlur,
    onClear,
    onFocus,
    size = 'md',
    trailing,
    value,
    variant = 'outline',
    ...rest
  } = props;

  const [isFocused, setIsFocused] = useState(false);

  const slots = inputVariants({ disabled, error, focused: isFocused, size, variant });

  function handleFocus(e: Parameters<NonNullable<InputProps['onFocus']>>[0]) {
    setIsFocused(true);
    onFocus?.(e);
  }

  function handleBlur(e: Parameters<NonNullable<InputProps['onBlur']>>[0]) {
    setIsFocused(false);
    onBlur?.(e);
  }

  function handleClear() {
    onClear?.();
  }

  return (
    <View className={cn(slots.root(), classNames?.root)}>
      {leading}
      <TextInput
        className={cn(slots.control(), classNames?.control)}
        editable={!disabled}
        onBlur={handleBlur}
        onFocus={handleFocus}
        allowFontScaling={false}
        inlineImagePadding={0}
        value={value}
        {...rest}
      />
      {clearable && value ? (
        <Pressable
          className={cn(slots.clearable(), classNames?.clearable)}
          onPress={handleClear}
        >
          <Text className="text-muted-foreground">✕</Text>
        </Pressable>
      ) : null}
      {trailing}
    </View>
  );
};

export { Input };
