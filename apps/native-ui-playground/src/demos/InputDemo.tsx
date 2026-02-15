import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Input } from '@skyroc/native-ui';

const InputDemo = () => {
  const [value, setValue] = useState('');

  return (
    <ScrollView className="flex-1 bg-background p-6">
      <Text className="mb-4 text-lg font-semibold text-foreground">Variants</Text>
      <View className="mb-8 gap-3">
        <Input variant="outline" placeholder="Outline (default)" />
        <Input variant="filled" placeholder="Filled" />
        <Input variant="underline" placeholder="Underline" />
      </View>

      <Text className="mb-4 text-lg font-semibold text-foreground">Sizes</Text>
      <View className="mb-8 gap-3">
        <Input size="sm" placeholder="Small input" />
        <Input size="md" placeholder="Medium input" />
        <Input size="lg" placeholder="Large input" />
      </View>

      <Text className="mb-4 text-lg font-semibold text-foreground">States</Text>
      <View className="mb-8 gap-3">
        <Input placeholder="Normal input" />
        <Input disabled placeholder="Disabled input" />
        <Input error placeholder="Error input" />
      </View>

      <Text className="mb-4 text-lg font-semibold text-foreground">Controlled</Text>
      <View className="mb-8 gap-3">
        <Input
          value={value}
          onChangeText={setValue}
          placeholder="Type something..."
        />
        <Text className="text-sm text-foreground-muted">
          Value: {value || '(empty)'}
        </Text>
      </View>
    </ScrollView>
  );
};

export { InputDemo };
