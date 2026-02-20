/* eslint-disable complexity */
import { useContext } from 'react';
import { Pressable, View } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { cn, isString } from '@skyroc/utils';
import { Text } from '../text/Typography';
import { CheckboxGroupContext } from './CheckboxGroupContext';
import { SIZE_CONTROL_MAP, SIZE_INNER_ICON_MAP, checkboxVariants } from './checkbox-variants';
import type { CheckboxProps } from './types';

const INDICATOR_COLOR = '#fff';

const Checkbox = (props: CheckboxProps) => {
  const {
    checked: checkedProp,
    checkedColor,
    checkedIcon,
    children,
    className,
    color: colorProp,
    defaultChecked = false,
    disabled: disabledProp = false,
    iconSize: iconSizeProp,
    indeterminateIcon,
    labelDisabled = false,
    labelPosition = 'right',
    name,
    onCheckedChange,
    shape = 'round',
    size: sizeProp
  } = props;

  const group = useContext(CheckboxGroupContext);

  const isGrouped = group !== undefined && name !== undefined;
  const isIndeterminate = isGrouped ? false : checkedProp === 'indeterminate';

  function resolveControlledProp() {
    if (isGrouped) return undefined;
    if (isIndeterminate) return false;
    return checkedProp as boolean | undefined;
  }

  const [internalChecked, setInternalChecked] = useControllableState({
    caller: 'checkbox',
    defaultProp: defaultChecked,
    onChange: onCheckedChange,
    prop: resolveControlledProp()
  });

  const isChecked = isGrouped ? group.isChecked(name) : internalChecked;
  const isActive = isChecked || isIndeterminate;

  const disabled = disabledProp || (group?.disabled ?? false);
  const color = colorProp ?? group?.color ?? 'primary';
  const size = sizeProp ?? group?.size ?? 'md';
  const controlSize = iconSizeProp ?? group?.iconSize ?? SIZE_CONTROL_MAP[size];
  const innerIconSize = SIZE_INNER_ICON_MAP[size];
  const resolvedShape = group?.shape ?? shape;
  const resolvedCheckedIcon = checkedIcon ?? group?.checkedIcon;
  const resolvedIndeterminateIcon = indeterminateIcon ?? group?.indeterminateIcon;
  const resolvedCheckedColor = checkedColor ?? group?.checkedColor;

  const {
    control: controlCls,
    label: labelCls,
    root: rootCls
  } = checkboxVariants({
    active: isActive,
    color,
    disabled,
    labelPosition,
    shape: resolvedShape,
    size
  });

  function handleToggle() {
    if (disabled) return;

    if (isGrouped) {
      if (!isChecked && group.isMaxReached()) return;
      group.toggle(name, !isChecked);
      return;
    }

    setInternalChecked(!isChecked);
  }

  function handleLabelPress() {
    if (labelDisabled) return;
    handleToggle();
  }

  function renderIndicator() {
    if (!isActive) return null;

    if (isIndeterminate && resolvedIndeterminateIcon) {
      return resolvedIndeterminateIcon;
    }

    if (isChecked && resolvedCheckedIcon) {
      return resolvedCheckedIcon;
    }

    return (
      <Feather
        color={INDICATOR_COLOR}
        name={isIndeterminate ? 'minus' : 'check'}
        size={innerIconSize}
      />
    );
  }

  return (
    <View className={cn(rootCls(), className)}>
      <Pressable
        disabled={disabled}
        hitSlop={4}
        onPress={handleToggle}
        style={[
          { height: controlSize, width: controlSize },
          isActive && resolvedCheckedColor ? { backgroundColor: resolvedCheckedColor } : undefined
        ]}
      >
        <View className={controlCls()}>{renderIndicator()}</View>
      </Pressable>

      {children ? (
        <Pressable
          disabled={disabled || labelDisabled}
          onPress={handleLabelPress}
        >
          {isString(children) ? <Text className={labelCls()}>{children}</Text> : <View>{children}</View>}
        </Pressable>
      ) : null}
    </View>
  );
};

export { Checkbox };
