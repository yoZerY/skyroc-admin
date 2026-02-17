import { useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { Button, Text } from '@skyroc/native-ui';

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
        <Button variant="solid" onPress={() => Alert.alert('Solid')}><Text>Solid</Text></Button>
        <Button variant="outline"><Text>Outline</Text></Button>
        <Button variant="ghost"><Text>Ghost</Text></Button>
      </View>

      <Text className="mb-4 text-lg font-semibold text-foreground">Colors</Text>
      <View className="mb-8 gap-3">
        <Button color="primary"><Text>Primary</Text></Button>
        <Button color="secondary"><Text>Secondary</Text></Button>
        <Button color="destructive"><Text>Destructive</Text></Button>
        <Button color="success"><Text>Success</Text></Button>
        <Button color="warning"><Text>Warning</Text></Button>
        <Button color="info"><Text>Info</Text></Button>
        <Button color="accent"><Text>Accent</Text></Button>
      </View>

      <Text className="mb-4 text-lg font-semibold text-foreground">Sizes</Text>
      <View className="mb-8 gap-3">
        <Button size="xs"><Text>Extra Small</Text></Button>
        <Button size="sm"><Text>Small</Text></Button>
        <Button size="md"><Text>Medium</Text></Button>
        <Button size="lg"><Text>Large</Text></Button>
        <Button size="xl"><Text>Extra Large</Text></Button>
      </View>

      <Text className="mb-4 text-lg font-semibold text-foreground">States</Text>
      <View className="mb-8 gap-3">
        <Button disabled><Text>Disabled</Text></Button>
        <Button loading={loading} onPress={handleLoadingPress}>
          <Text>{loading ? 'Loading...' : 'Click to Load'}</Text>
        </Button>
      </View>
    </ScrollView>
  );
};

export { ButtonDemo };
