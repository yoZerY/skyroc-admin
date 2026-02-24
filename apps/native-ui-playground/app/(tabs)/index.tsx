import { useRouter } from 'expo-router';
import { ScrollView, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Cell, CellGroup, Text } from '@skyroc/native-ui';

interface ComponentItem {
  href: string;
  icon: React.ComponentProps<typeof AntDesign>['name'];
  iconColor: string;
  iconBg: string;
  label: string;
}

interface ComponentGroup {
  title: string;
  items: ComponentItem[];
}

const GROUPS: ComponentGroup[] = [
  {
    title: '基础组件',
    items: [
      { href: '/components/button', icon: 'appstore', iconColor: '#3b82f6', iconBg: '#eff6ff', label: 'Button' },
      { href: '/components/text', icon: 'font-size', iconColor: '#8b5cf6', iconBg: '#f5f3ff', label: 'Text' },
      { href: '/components/input', icon: 'form', iconColor: '#06b6d4', iconBg: '#ecfeff', label: 'Input' },
      { href: '/components/divider', icon: 'minus', iconColor: '#6b7280', iconBg: '#f9fafb', label: 'Divider' },
      { href: '/components/space', icon: 'column-width', iconColor: '#f59e0b', iconBg: '#fffbeb', label: 'Space' },
      { href: '/components/checkbox', icon: 'check-square', iconColor: '#22c55e', iconBg: '#f0fdf4', label: 'Checkbox' },
      { href: '/components/radio', icon: 'check-circle', iconColor: '#6366f1', iconBg: '#eef2ff', label: 'Radio' },
      { href: '/components/switch', icon: 'swap', iconColor: '#14b8a6', iconBg: '#f0fdfa', label: 'Switch' },
      { href: '/components/stepper', icon: 'plus-square', iconColor: '#0891b2', iconBg: '#ecfeff', label: 'Stepper' },
      { href: '/components/picker', icon: 'select', iconColor: '#ec4899', iconBg: '#fdf2f8', label: 'Picker' },
      { href: '/components/picker-group', icon: 'select', iconColor: '#d946ef', iconBg: '#fdf4ff', label: 'PickerGroup' },
      { href: '/components/tree-select', icon: 'cluster', iconColor: '#0d9488', iconBg: '#f0fdfa', label: 'TreeSelect' },
      { href: '/components/dropdown-menu', icon: 'down-square', iconColor: '#e11d48', iconBg: '#fff1f2', label: 'DropdownMenu' },
      { href: '/components/signature', icon: 'edit', iconColor: '#7c3aed', iconBg: '#f5f3ff', label: 'Signature' },
    ],
  },
  {
    title: '展示组件',
    items: [
      { href: '/components/image', icon: 'picture', iconColor: '#10b981', iconBg: '#ecfdf5', label: 'Image' },
      { href: '/components/avatar', icon: 'user', iconColor: '#f43f5e', iconBg: '#fff1f2', label: 'Avatar' },
      { href: '/components/badge', icon: 'tag', iconColor: '#ef4444', iconBg: '#fef2f2', label: 'Badge' },
      { href: '/components/cell', icon: 'bars', iconColor: '#64748b', iconBg: '#f8fafc', label: 'Cell' },
      { href: '/components/tag', icon: 'tag', iconColor: '#f97316', iconBg: '#fff7ed', label: 'Tag' },
      { href: '/components/grid', icon: 'appstore', iconColor: '#0ea5e9', iconBg: '#f0f9ff', label: 'Grid' },
    ],
  },
  {
    title: '反馈组件',
    items: [
      { href: '/components/toast', icon: 'notification', iconColor: '#f97316', iconBg: '#fff7ed', label: 'Toast' },
      { href: '/components/dialog', icon: 'message', iconColor: '#3b82f6', iconBg: '#eff6ff', label: 'Dialog' },
      { href: '/components/action-sheet', icon: 'menu-unfold', iconColor: '#8b5cf6', iconBg: '#f5f3ff', label: 'ActionSheet' },
      { href: '/components/notify', icon: 'sound', iconColor: '#ef4444', iconBg: '#fef2f2', label: 'Notify' },
      { href: '/components/share-sheet', icon: 'share-alt', iconColor: '#06b6d4', iconBg: '#ecfeff', label: 'ShareSheet' },
      { href: '/components/swipe-cell', icon: 'swap-left', iconColor: '#f59e0b', iconBg: '#fffbeb', label: 'SwipeCell' },
    ],
  },
  {
    title: '浮层组件',
    items: [
      { href: '/components/popup', icon: 'layout', iconColor: '#06b6d4', iconBg: '#ecfeff', label: 'Popup' },
      { href: '/components/sheet', icon: 'profile', iconColor: '#10b981', iconBg: '#ecfdf5', label: 'Sheet' },
    ],
  },
  {
    title: '导航组件',
    items: [
      { href: '/components/navbar', icon: 'arrow-left', iconColor: '#09090b', iconBg: '#f4f4f5', label: 'NavBar' },
      { href: '/components/tabs-demo', icon: 'switcher', iconColor: '#6366f1', iconBg: '#eef2ff', label: 'Tabs' },
      { href: '/components/pagination', icon: 'ellipsis', iconColor: '#f59e0b', iconBg: '#fffbeb', label: 'Pagination' },
      { href: '/components/sidebar', icon: 'menu-fold', iconColor: '#8b5cf6', iconBg: '#f5f3ff', label: 'Sidebar' },
      { href: '/components/index-bar', icon: 'ordered-list', iconColor: '#0d9488', iconBg: '#f0fdfa', label: 'IndexBar' },
      { href: '/components/anchor-nav', icon: 'link', iconColor: '#f97316', iconBg: '#fff7ed', label: 'AnchorNav' },
      { href: '/components/back-top', icon: 'up-circle', iconColor: '#3b82f6', iconBg: '#eff6ff', label: 'BackTop' },
      { href: '/components/floating-button', icon: 'plus', iconColor: '#f43f5e', iconBg: '#fff1f2', label: 'FloatingButton' },
    ],
  },
];

const TOTAL_COUNT = GROUPS.reduce((sum, group) => sum + group.items.length, 0);

const HomeScreen = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerStyle={{ paddingBottom: insets.bottom + 24, paddingTop: insets.top  }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View
        className="bg-primary px-6 pb-8 pt-4"
      >
        <View className="flex-row items-center gap-3">
          <View className="size-10 items-center justify-center rounded-2xl bg-white/20">
            <AntDesign color="white" name="appstore" size={20} />
          </View>
          <View>
            <Text className="text-lg font-bold text-white">Native UI</Text>
            <Text className="text-xs text-white/70">组件展示平台</Text>
          </View>
        </View>

        <View className="mt-5 flex-row gap-3">
          <View className="flex-1 rounded-2xl bg-white/15 p-4">
            <Text className="text-2xl font-bold text-white">{TOTAL_COUNT}</Text>
            <Text className="mt-0.5 text-xs text-white/70">组件总数</Text>
          </View>
          <View className="flex-1 rounded-2xl bg-white/15 p-4">
            <Text className="text-2xl font-bold text-white">{GROUPS.length}</Text>
            <Text className="mt-0.5 text-xs text-white/70">分类</Text>
          </View>
          <View className="flex-1 rounded-2xl bg-white/15 p-4">
            <Text className="text-2xl font-bold text-white">TS</Text>
            <Text className="mt-0.5 text-xs text-white/70">类型安全</Text>
          </View>
        </View>
      </View>

      {/* Component Groups */}
      <View className="px-4 pt-5">
        {GROUPS.map(group => (
          <View key={group.title} className="mb-4">
            <CellGroup inset title={group.title}>
              {group.items.map(item => (
                <Cell
                  key={item.href}
                  leading={
                    <View
                      className="size-9 items-center justify-center rounded-xl"
                      style={{ backgroundColor: item.iconBg }}
                    >
                      <AntDesign color={item.iconColor} name={item.icon} size={18} />
                    </View>
                  }
                  title={item.label}
                  onPress={() => router.push(item.href as any)}
                />
              ))}
            </CellGroup>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
