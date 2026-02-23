import { ScrollView, View } from 'react-native';
import { Button, showNotify, Text } from '@skyroc/native-ui';

const NotifyDemo = () => {
  function handleBasic() {
    showNotify('通知内容');
  }

  function handlePrimary() {
    showNotify({ message: '通知内容', type: 'primary' });
  }

  function handleSuccess() {
    showNotify({ message: '通知内容', type: 'success' });
  }

  function handleDanger() {
    showNotify({ message: '通知内容', type: 'danger' });
  }

  function handleWarning() {
    showNotify({ message: '通知内容', type: 'warning' });
  }

  function handleCustomDuration() {
    showNotify({ duration: 5000, message: '展示 5 秒后关闭' });
  }

  return (
    <ScrollView
      className="flex-1 bg-muted"
      contentContainerClassName="pb-20"
      showsVerticalScrollIndicator={false}
    >
      {/* Basic */}
      <Text className="mb-3 mt-4 px-4 text-lg font-semibold">基础用法</Text>
      <View className="px-4">
        <Button onPress={handleBasic}>基础用法</Button>
      </View>

      {/* Notify Type */}
      <Text className="mb-3 mt-6 px-4 text-lg font-semibold">通知类型</Text>
      <View className="gap-3 px-4">
        <Button onPress={handlePrimary}>主要通知</Button>
        <Button onPress={handleSuccess}>成功通知</Button>
        <Button onPress={handleDanger}>危险通知</Button>
        <Button onPress={handleWarning}>警告通知</Button>
      </View>

      {/* Custom Duration */}
      <Text className="mb-3 mt-6 px-4 text-lg font-semibold">自定义时长</Text>
      <View className="px-4">
        <Button onPress={handleCustomDuration}>自定义时长</Button>
      </View>
    </ScrollView>
  );
};

export { NotifyDemo };
