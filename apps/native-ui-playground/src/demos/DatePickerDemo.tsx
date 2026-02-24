import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, DatePicker, DatePickerView, Text } from '@skyroc/native-ui';
import type { DatePickerFilter, DatePickerFormatter } from '@skyroc/native-ui';

const DatePickerDemo = () => {
  const [sheetShow, setSheetShow] = useState(false);
  const [sheetValue, setSheetValue] = useState<string[]>(['2026', '02', '25']);

  const [formatterShow, setFormatterShow] = useState(false);
  const [formatterValue, setFormatterValue] = useState<string[]>(['2026', '01', '15']);

  const [filterShow, setFilterShow] = useState(false);
  const [filterValue, setFilterValue] = useState<string[]>(['2026', '02']);

  const yearMonthFormatter: DatePickerFormatter = (type, option) => {
    if (type === 'year') return { ...option, label: `${option.value}年` };
    if (type === 'month') return { ...option, label: `${option.value}月` };
    return { ...option, label: `${option.value}日` };
  };

  const evenMonthFilter: DatePickerFilter = (type, options) => {
    if (type === 'month') {
      return options.filter(opt => Number.parseInt(opt.value, 10) % 2 === 0);
    }
    return options;
  };

  return (
    <ScrollView className="flex-1 bg-muted" contentContainerClassName="pb-20" showsVerticalScrollIndicator={false}>
      {/* Basic — year/month/day */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">Basic</Text>
      <DatePickerView
        defaultValue={['2026', '02', '25']}
        showToolbar={false}
      />

      {/* Year & Month only */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">Year & Month</Text>
      <DatePickerView
        columnsType={['year', 'month']}
        defaultValue={['2026', '06']}
        showToolbar={false}
      />

      {/* Date range constraint */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">Date Range (2024-01-01 ~ 2026-12-31)</Text>
      <DatePickerView
        defaultValue={['2025', '06', '15']}
        maxDate={new Date(2026, 11, 31)}
        minDate={new Date(2024, 0, 1)}
        showToolbar={false}
      />

      {/* With Sheet popup */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">Popup DatePicker</Text>
      <View className="bg-background px-4 py-3">
        <View className="flex-row items-center gap-3">
          <Button size="sm" onPress={() => setSheetShow(true)}>
            Select Date
          </Button>
          <Text className="text-sm text-muted-foreground">
            {sheetValue.join('-') || 'None'}
          </Text>
        </View>

        <DatePicker
          onConfirm={setSheetValue}
          onUpdateShow={setSheetShow}
          show={sheetShow}
          title="Select Date"
          value={sheetValue}
        />
      </View>

      {/* Formatter — add suffixes */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">Custom Formatter</Text>
      <View className="bg-background px-4 py-3">
        <View className="flex-row items-center gap-3">
          <Button size="sm" onPress={() => setFormatterShow(true)}>
            Formatted Picker
          </Button>
          <Text className="text-sm text-muted-foreground">
            {formatterValue.join('-') || 'None'}
          </Text>
        </View>

        <DatePicker
          formatter={yearMonthFormatter}
          onConfirm={setFormatterValue}
          onUpdateShow={setFormatterShow}
          show={formatterShow}
          title="Formatted Date"
          value={formatterValue}
        />
      </View>

      {/* Filter — even months only */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">Filter (Even Months Only)</Text>
      <View className="bg-background px-4 py-3">
        <View className="flex-row items-center gap-3">
          <Button size="sm" onPress={() => setFilterShow(true)}>
            Filtered Picker
          </Button>
          <Text className="text-sm text-muted-foreground">
            {filterValue.join('-') || 'None'}
          </Text>
        </View>

        <DatePicker
          columnsType={['year', 'month']}
          filter={evenMonthFilter}
          onConfirm={setFilterValue}
          onUpdateShow={setFilterShow}
          show={filterShow}
          title="Select Month"
          value={filterValue}
        />
      </View>
    </ScrollView>
  );
};

export { DatePickerDemo };
