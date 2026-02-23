import { ScrollView, View } from 'react-native';
import { DropdownMenu, Text } from '@skyroc/native-ui';
import type { DropdownMenuItem } from '@skyroc/native-ui';

const SORT_OPTIONS: DropdownMenuItem = {
  options: [
    { text: '综合排序', value: 'default' },
    { text: '好评优先', value: 'rating' },
    { text: '销量优先', value: 'sales' }
  ]
};

const FILTER_OPTIONS: DropdownMenuItem = {
  options: [
    { text: '全部商品', value: 'all' },
    { text: '新品上架', value: 'new' },
    { text: '活动商品', value: 'promo' }
  ]
};

const DISABLED_OPTIONS: DropdownMenuItem = {
  options: [
    { text: '默认', value: 'default' },
    { text: '已下架', value: 'offline', disabled: true },
    { text: '热门', value: 'hot' }
  ]
};

const DropdownMenuDemo = () => {
  return (
    <ScrollView
      className="flex-1 bg-muted"
      contentContainerClassName="pb-20"
      showsVerticalScrollIndicator={false}
    >
      {/* Basic */}
      <Text className="mb-3 mt-4 px-4 text-lg font-semibold">基础用法</Text>
      <DropdownMenu items={[SORT_OPTIONS, FILTER_OPTIONS]} />

      {/* Custom Title */}
      <Text className="mb-3 mt-6 px-4 text-lg font-semibold">自定义标题</Text>
      <DropdownMenu
        items={[
          { ...SORT_OPTIONS, title: '排序' },
          { ...FILTER_OPTIONS, title: '筛选' }
        ]}
      />

      {/* Disabled Option */}
      <Text className="mb-3 mt-6 px-4 text-lg font-semibold">禁用选项</Text>
      <DropdownMenu items={[DISABLED_OPTIONS, FILTER_OPTIONS]} />

      {/* Direction Up */}
      <Text className="mb-3 mt-6 px-4 text-lg font-semibold">向上展开</Text>
      <View className="mt-40">
        <DropdownMenu
          direction="up"
          items={[SORT_OPTIONS, FILTER_OPTIONS]}
        />
      </View>
    </ScrollView>
  );
};

export { DropdownMenuDemo };
