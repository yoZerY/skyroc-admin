import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Input } from '@skyroc/native-ui';

const InputDemo = () => {
  const [value, setValue] = useState('');
  const [clearableValue, setClearableValue] = useState('');

  return (
    <ScrollView className="flex-1 bg-background p-6">
      <Text className="mb-4 text-lg font-semibold text-foreground">Variants</Text>
      <View className="mb-8 gap-3">
        <Input placeholder="Outline (default)" variant="outline" />
        <Input placeholder="Filled" variant="filled" />
        <Input placeholder="Underline" variant="underline" />
      </View>

      <Text className="mb-4 text-lg font-semibold text-foreground">Sizes</Text>
      <View className="mb-8 gap-3">
        <Input placeholder="Small input" size="sm" />
        <Input placeholder="Medium input" size="md" />
        <Input placeholder="Large input" size="lg" />
      </View>

      <Text className="mb-4 text-lg font-semibold text-foreground">States</Text>
      <View className="mb-8 gap-3">
        <Input placeholder="Normal input" />
        <Input disabled placeholder="Disabled input" />
        <Input error placeholder="Error input" />
      </View>

      <Text className="mb-4 text-lg font-semibold text-foreground">Focus</Text>
      <View className="mb-8 gap-3">
        <Input placeholder="Tap to see focus ring (outline)" variant="outline" />
        <Input placeholder="Tap to see focus ring (filled)" variant="filled" />
        <Input placeholder="Tap to see focus ring (underline)" variant="underline" />
      </View>

      <Text className="mb-4 text-lg font-semibold text-foreground">Clearable</Text>
      <View className="mb-8 gap-3">
        <Input
          clearable
          placeholder="Type and clear..."
          value={clearableValue}
          onChangeText={setClearableValue}
          onClear={() => setClearableValue('')}
        />
      </View>

      <Text className="mb-4 text-lg font-semibold text-foreground">Leading & Trailing</Text>
      <View className="mb-8 gap-3">
        <Input
          leading={<Text className="text-muted-foreground">@</Text>}
          placeholder="Username"
        />
        <Input
          placeholder="Search..."
          trailing={<Text className="text-muted-foreground">🔍</Text>}
        />
        <Input
          leading={<Text className="text-muted-foreground">$</Text>}
          placeholder="0.00"
          trailing={<Text className="text-muted-foreground">USD</Text>}
        />
      </View>

      <Text className="mb-4 text-lg font-semibold text-foreground">Controlled</Text>
      <View className="mb-8 gap-3">
        <Input
          placeholder="Type something..."
          value={value}
          onChangeText={setValue}
        />
        <Text className="text-sm text-muted-foreground">
          Value: {value || '(empty)'}
        </Text>
      </View>
    </ScrollView>
  );
};

export { InputDemo };
