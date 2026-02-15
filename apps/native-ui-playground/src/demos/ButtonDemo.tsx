import { useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { Button } from '@skyroc/native-ui';

const ButtonDemo = () => {
  const [loading, setLoading] = useState(false);

  function handleLoadingPress() {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  }

  return (
    <ScrollView className="flex-1 bg-background p-6">
      <Text className="mb-4 text-lg font-semibold text-foreground">Variants</Text>
      <View className="mb-8 gap-3">
        <Button variant="solid" onPress={() => Alert.alert('Solid')}>Solid</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
      </View>

      <Text className="mb-4 text-lg font-semibold text-foreground">Colors</Text>
      <View className="mb-8 gap-3">
        <Button color="primary">Primary</Button>
        <Button color="secondary">Secondary</Button>
        <Button color="destructive">Destructive</Button>
        <Button color="success">Success</Button>
        <Button color="warning">Warning</Button>
        <Button color="info">Info</Button>
        <Button color="accent">Accent</Button>
      </View>

      <Text className="mb-4 text-lg font-semibold text-foreground">Sizes</Text>
      <View className="mb-8 gap-3">
        <Button size="xs">Extra Small</Button>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
        <Button size="xl">Extra Large</Button>
      </View>

      <Text className="mb-4 text-lg font-semibold text-foreground">States</Text>
      <View className="mb-8 gap-3">
        <Button disabled>Disabled</Button>
        <Button loading={loading} onPress={handleLoadingPress}>
          {loading ? 'Loading...' : 'Click to Load'}
        </Button>
      </View>
    </ScrollView>
  );
};

export { ButtonDemo };
