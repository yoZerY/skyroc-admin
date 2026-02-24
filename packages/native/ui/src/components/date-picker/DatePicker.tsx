import { useEffect, useState } from 'react';
import { Pressable } from 'react-native';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { Sheet } from '../sheet/Sheet';
import { DatePickerView } from './DatePickerView';
import type { DatePickerProps } from './types';

const DatePicker = (props: DatePickerProps) => {
  const {
    cancelText = 'Cancel',
    children,
    className,
    classNames,
    columnsType,
    confirmText = 'Confirm',
    defaultValue = [],
    filter,
    formatter,
    haptic,
    itemHeight,
    loading,
    maxDate,
    minDate,
    onChange,
    onCancel,
    onConfirm,
    onUpdateShow,
    show,
    showToolbar = true,
    title,
    value: valueProp,
    visibleCount
  } = props;

  // Committed value — the confirmed selection
  const [committedValue, setCommittedValue] = useControllableState({
    caller: 'DatePicker',
    defaultProp: defaultValue,
    onChange,
    prop: valueProp
  });

  // Display value — temporary while the sheet is open
  const [displayValue, setDisplayValue] = useState<string[]>(committedValue);

  // Sync display value when sheet opens
  useEffect(() => {
    if (show) {
      setDisplayValue(committedValue);
    }
  }, [show]);

  function handleOpen() {
    onUpdateShow?.(true);
  }

  function handleDisplayChange(values: string[]) {
    setDisplayValue(values);
  }

  function handleConfirm(values: string[]) {
    setCommittedValue(values);
    onConfirm?.(values);
    onUpdateShow?.(false);
  }

  function handleCancel(values: string[]) {
    onCancel?.(values);
    onUpdateShow?.(false);
  }

  function renderTrigger() {
    if (!children) return null;

    if (typeof children === 'function') {
      return children({ open: handleOpen, value: committedValue });
    }

    return <Pressable onPress={handleOpen}>{children}</Pressable>;
  }

  return (
    <>
      {renderTrigger()}

      <Sheet
        closeable={false}
        show={show}
        showHandle={false}
        onUpdateShow={onUpdateShow}
      >
        {show ? (
          <DatePickerView
            cancelText={cancelText}
            className={className}
            classNames={classNames}
            columnsType={columnsType}
            confirmText={confirmText}
            filter={filter}
            formatter={formatter}
            haptic={haptic}
            itemHeight={itemHeight}
            loading={loading}
            maxDate={maxDate}
            minDate={minDate}
            onCancel={handleCancel}
            onChange={handleDisplayChange}
            onConfirm={handleConfirm}
            showToolbar={showToolbar}
            title={title}
            value={displayValue}
            visibleCount={visibleCount}
          />
        ) : null}
      </Sheet>
    </>
  );
};

export { DatePicker };
