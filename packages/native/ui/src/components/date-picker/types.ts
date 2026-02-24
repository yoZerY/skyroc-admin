import type { ReactNode } from 'react';
import type { PickerOption, PickerViewProps } from '../picker/types';

/** Date column type identifier */
export type DatePickerColumnType = 'day' | 'month' | 'year';

/** Filter function to exclude certain options from a date column */
export type DatePickerFilter = (
  columnType: DatePickerColumnType,
  options: PickerOption[],
  values: string[]
) => PickerOption[];

/** Formatter function to customize the display of date options */
export type DatePickerFormatter = (
  type: DatePickerColumnType,
  option: PickerOption
) => PickerOption;

/** Props for the inline DatePickerView component */
export interface DatePickerViewProps extends Omit<PickerViewProps, 'columns' | 'fieldNames'> {
  /** Column types to display, defaults to ['year', 'month', 'day'] */
  columnsType?: DatePickerColumnType[];

  /** Filter function to exclude certain options */
  filter?: DatePickerFilter;

  /** Formatter function to customize option display */
  formatter?: DatePickerFormatter;

  /** Maximum selectable date */
  maxDate?: Date;

  /** Minimum selectable date */
  minDate?: Date;
}

/** Props for the popup DatePicker component */
export interface DatePickerProps extends DatePickerViewProps {
  /** Trigger element: ReactNode or render function */
  children?: ReactNode | ((params: { open: () => void; value: string[] }) => ReactNode);

  /** Called when the sheet visibility changes */
  onUpdateShow?: (show: boolean) => void;

  /** Whether the sheet is visible */
  show: boolean;
}
