import { useMemo } from 'react';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { PickerView } from '../picker/PickerView';
import type { DatePickerColumnType, DatePickerViewProps } from './types';
import { formatValueRange, genOptions, getMonthEndDay, padZero } from './utils';

function getDefaultDate(offset: number): Date {
  const now = new Date();
  return new Date(now.getFullYear() + offset, now.getMonth(), now.getDate());
}

const DatePickerView = (props: DatePickerViewProps) => {
  const {
    columnsType = ['year', 'month', 'day'],
    defaultValue,
    filter,
    formatter,
    maxDate = getDefaultDate(10),
    minDate = getDefaultDate(-10),
    onChange,
    value: valueProp,
    ...pickerProps
  } = props;

  const initialValue = useMemo(() => {
    if (defaultValue && defaultValue.length > 0) {
      return defaultValue;
    }

    const now = new Date();
    return columnsType.map(type => {
      if (type === 'year') return padZero(now.getFullYear());
      if (type === 'month') return padZero(now.getMonth() + 1);
      return padZero(now.getDate());
    });
  }, []);

  const [value, setValue] = useControllableState({
    caller: 'DatePickerView',
    defaultProp: initialValue,
    onChange,
    prop: valueProp
  });

  function getValue(type: DatePickerColumnType): number {
    const index = columnsType.indexOf(type);
    if (index === -1) return 0;
    return Number.parseInt(value[index] ?? '0', 10);
  }

  function getYearRange(): [number, number] {
    return [minDate.getFullYear(), maxDate.getFullYear()];
  }

  function getMonthRange(): [number, number] {
    const year = getValue('year');
    const [minYear, maxYear] = getYearRange();

    let min = 1;
    let max = 12;

    if (year === minYear) {
      min = minDate.getMonth() + 1;
    }
    if (year === maxYear) {
      max = maxDate.getMonth() + 1;
    }

    return [min, max];
  }

  function getDayRange(): [number, number] {
    const year = getValue('year');
    const month = getValue('month');
    const [minYear, maxYear] = getYearRange();

    let min = 1;
    let max = getMonthEndDay(year, month);

    if (year === minYear && month === minDate.getMonth() + 1) {
      min = minDate.getDate();
    }
    if (year === maxYear && month === maxDate.getMonth() + 1) {
      max = Math.min(max, maxDate.getDate());
    }

    return [min, max];
  }

  function getRangeByType(type: DatePickerColumnType): [number, number] {
    if (type === 'year') return getYearRange();
    if (type === 'month') return getMonthRange();
    return getDayRange();
  }

  const columns = useMemo(() => {
    return columnsType.map(type => {
      const [min, max] = getRangeByType(type);
      return genOptions(min, max, type, formatter, filter, value);
    });
  }, [columnsType, value, minDate, maxDate, formatter, filter]);

  const clampedValue = useMemo(() => {
    return formatValueRange(value, columns);
  }, [value, columns]);

  function handleChange(newValues: string[]) {
    // After changing, we need to re-clamp because cascading constraints may apply
    const newColumns = columnsType.map((type) => {
      // Rebuild columns with the new values to get accurate ranges
      const tempValues = [...newValues];

      function getTempValue(t: DatePickerColumnType): number {
        const idx = columnsType.indexOf(t);
        if (idx === -1) return 0;
        return Number.parseInt(tempValues[idx] ?? '0', 10);
      }

      function getTempRange(): [number, number] {
        if (type === 'year') return getYearRange();

        if (type === 'month') {
          const year = getTempValue('year');
          const [minYear, maxYear] = getYearRange();
          let min = 1;
          let max = 12;
          if (year === minYear) min = minDate.getMonth() + 1;
          if (year === maxYear) max = maxDate.getMonth() + 1;
          return [min, max];
        }

        // day
        const year = getTempValue('year');
        const month = getTempValue('month');
        const [minYear, maxYear] = getYearRange();
        let min = 1;
        let max = getMonthEndDay(year, month);
        if (year === minYear && month === minDate.getMonth() + 1) min = minDate.getDate();
        if (year === maxYear && month === maxDate.getMonth() + 1) max = Math.min(max, maxDate.getDate());
        return [min, max];
      }

      const [min, max] = getTempRange();
      return genOptions(min, max, type, formatter, filter, tempValues);
    });

    const clamped = formatValueRange(newValues, newColumns);
    setValue(clamped);
  }

  return (
    <PickerView
      {...pickerProps}
      columns={columns}
      onChange={handleChange}
      value={clampedValue}
    />
  );
};

export { DatePickerView };
