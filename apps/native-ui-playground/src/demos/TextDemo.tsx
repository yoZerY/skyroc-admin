import { ScrollView, View, Text } from 'react-native';
import { Typography } from '@skyroc/native-ui';

const TextDemo = () => {
  return (
    <ScrollView className="flex-1 bg-background p-6">
      <Text className="mb-4 text-lg font-semibold text-foreground">Sizes</Text>
      <View className="mb-8 gap-2">
        <Typography size="xs">Extra Small Text</Typography>
        <Typography size="sm">Small Text</Typography>
        <Typography size="md">Medium Text (default)</Typography>
        <Typography size="lg">Large Text</Typography>
        <Typography size="xl">Extra Large Text</Typography>
        <Typography size="2xl">2XL Text</Typography>
        <Typography size="3xl">3XL Text</Typography>
        <Typography size="4xl">4XL Text</Typography>
      </View>

      <Text className="mb-4 text-lg font-semibold text-foreground">Weights</Text>
      <View className="mb-8 gap-2">
        <Typography weight="normal">Normal weight</Typography>
        <Typography weight="medium">Medium weight</Typography>
        <Typography weight="semibold">Semibold weight</Typography>
        <Typography weight="bold">Bold weight</Typography>
      </View>

      <Text className="mb-4 text-lg font-semibold text-foreground">Colors</Text>
      <View className="mb-8 gap-2">
        <Typography color="foreground">Foreground</Typography>
        <Typography color="muted">Muted</Typography>
        <Typography color="primary">Primary</Typography>
        <Typography color="secondary">Secondary</Typography>
        <Typography color="destructive">Destructive</Typography>
        <Typography color="success">Success</Typography>
        <Typography color="warning">Warning</Typography>
        <Typography color="info">Info</Typography>
        <Typography color="accent">Accent</Typography>
      </View>
    </ScrollView>
  );
};

export { TextDemo };
