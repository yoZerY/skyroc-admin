import { useState } from 'react';
import { ScrollView } from 'react-native';
import { Sidebar, Text } from '@skyroc/native-ui';
import type { SidebarItem } from '@skyroc/native-ui';

const BASIC_ITEMS: SidebarItem[] = [
  { key: 'label1', title: 'Label 1' },
  { key: 'label2', title: 'Label 2' },
  { key: 'label3', title: 'Label 3' }
];

const BADGE_ITEMS: SidebarItem[] = [
  { key: 'b1', title: 'Label 1', dot: true },
  { key: 'b2', title: 'Label 2', badge: 5 },
  { key: 'b3', title: 'Label 3', badge: '20' }
];

const DISABLED_ITEMS: SidebarItem[] = [
  { key: 'd1', title: 'Label 1' },
  { key: 'd2', title: 'Label 2', disabled: true },
  { key: 'd3', title: 'Label 3' }
];

const MANY_ITEMS: SidebarItem[] = Array.from({ length: 10 }, (_, i) => ({
  key: `m-${i}`,
  title: `Category ${i + 1}`
}));

const SidebarDemo = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerClassName="p-6 pb-20"
      showsVerticalScrollIndicator={false}
    >
      {/* Basic */}
      <Text className="mb-4 text-lg font-semibold">Basic</Text>

        <Sidebar items={BASIC_ITEMS} />



      {/* With Badge */}
      <Text className="mb-4 text-lg font-semibold">Badge</Text>

        <Sidebar items={BADGE_ITEMS} />



      {/* Disabled */}
      <Text className="mb-4 text-lg font-semibold">Disabled</Text>

        <Sidebar items={DISABLED_ITEMS} />



      {/* Controlled with content */}
      <Text className="mb-4 text-lg font-semibold">Controlled</Text>

        <Sidebar
          activeIndex={activeIndex}
          items={BASIC_ITEMS}
          onIndexChange={setActiveIndex}
        />



      {/* Many items (scrollable) */}
      <Text className="mb-4 text-lg font-semibold">Scrollable (10 items)</Text>
      <ScrollView className="mb-8 h-52" showsVerticalScrollIndicator={false} nestedScrollEnabled>
        <Sidebar items={MANY_ITEMS} />
      </ScrollView>
    </ScrollView>
  );
};

export { SidebarDemo };
