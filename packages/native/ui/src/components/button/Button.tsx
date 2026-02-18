import { ActivityIndicator, Pressable } from 'react-native';
import { cn, isString } from '@skyroc/utils';
import { Text, TextClassContext } from '../text/Typography';
import { buttonTextVariants, buttonVariants } from './button-variants';
import type { ButtonProps } from './types';

const Button = (props: ButtonProps) => {
  const {
    children,
    className,
    color = 'primary',
    disabled = false,
    loading = false,
    shape = 'rounded',
    size = 'md',
    variant = 'solid',
    ...rest
  } = props;

  const isDisabled = disabled || loading;

  const textClass = buttonTextVariants({ variant, color, size });

  const buttonClass = buttonVariants({ variant, color, size, shape });

  return (
    <TextClassContext.Provider value={textClass}>
      <Pressable
        className={cn(buttonClass, isDisabled && 'opacity-50', className)}
        disabled={isDisabled}
        role="button"
        {...rest}
      >
        {loading && (
          <ActivityIndicator
            className={textClass}
            size="small"
          />
        )}

        {isString(children) ? <Text>{children}</Text> : children}
      </Pressable>
    </TextClassContext.Provider>
  );
};

export { Button };
