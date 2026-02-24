import type { PickerOption } from '../picker/types';
import type { DatePickerColumnType, DatePickerFilter, DatePickerFormatter } from './types';

/** Pad a number to two digits with leading zero */
function padZero(num: number): string {
  return num < 10 ? `0${num}` : `${num}`;
}

/** Get the last day of a given month (handles leap years) */
function getMonthEndDay(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

/** Generate picker options for a range of values */
function genOptions(
  min: number,
  max: number,
  type: DatePickerColumnType,
  formatter: DatePickerFormatter | undefined,
  filter: DatePickerFilter | undefined,
  values: string[]
): PickerOption[] {
  const options: PickerOption[] = [];

  for (let i = min; i <= max; i++) {
    const value = padZero(i);
    let option: PickerOption = { label: value, value };

    if (formatter) {
      option = formatter(type, option);
    }

    options.push(option);
  }

  if (filter) {
    return filter(type, options, values);
  }

  return options;
}

/** Clamp selected values to be within the valid range of each column */
function formatValueRange(values: string[], columns: PickerOption[][]): string[] {
  return values.map((value, index) => {
    const column = columns[index];

    if (!column || column.length === 0) {
      return value;
    }

    // If current value exists in column options, keep it
    if (column.some(option => option.value === value)) {
      return value;
    }

    // Otherwise clamp to the last option (closest valid value)
    return column[column.length - 1]!.value;
  });
}

export { formatValueRange, genOptions, getMonthEndDay, padZero };
