import { ScrollView, View } from 'react-native';
import { Image, ImageFallback, Text } from '@skyroc/native-ui';

const ImageDemo = () => {
  return (
    <ScrollView className="flex-1 bg-background p-6">
      {/* Basic */}
      <Text className="mb-4 text-lg font-semibold">Basic</Text>
      <View className="mb-8 gap-3">
        <Image
          className="h-48 w-full rounded-xl"
          contentFit="cover"
          src="https://picsum.photos/seed/basic/800/400"
        />
      </View>

      {/* Shapes */}
      <Text className="mb-4 text-lg font-semibold">Shapes</Text>
      <View className="mb-8 flex-row gap-3">
        <Image
          className="h-20 w-20 rounded-lg"
          contentFit="cover"
          src="https://picsum.photos/seed/square/200"
        />
        <Image
          className="h-20 w-20 rounded-full"
          contentFit="cover"
          src="https://picsum.photos/seed/circle/200"
        />
        <Image
          className="h-20 w-32 rounded-xl"
          contentFit="cover"
          src="https://picsum.photos/seed/rect/320/200"
        />
      </View>

      {/* Content Fit */}
      <Text className="mb-4 text-lg font-semibold">Content Fit</Text>
      <View className="mb-8 gap-3">
        <Text className="text-sm text-muted-foreground">cover</Text>
        <Image
          className="h-32 w-full rounded-xl bg-muted"
          contentFit="cover"
          src="https://picsum.photos/seed/cover/800/400"
        />
        <Text className="text-sm text-muted-foreground">contain</Text>
        <Image
          className="h-32 w-full rounded-xl bg-muted"
          contentFit="contain"
          src="https://picsum.photos/seed/contain/800/400"
        />
      </View>

      {/* ImageFallback - Loading */}
      <Text className="mb-4 text-lg font-semibold">Fallback (Loading)</Text>
      <View className="mb-8 gap-3">
        <ImageFallback
          className="h-32 w-full rounded-xl"
          contentFit="cover"
          showLoading
          src="https://picsum.photos/seed/loading/800/400"
        />
      </View>

      {/* ImageFallback - Error */}
      <Text className="mb-4 text-lg font-semibold">Fallback (Error)</Text>
      <View className="mb-8 gap-3">
        <ImageFallback
          className="h-32 w-full rounded-xl"
          errorSlot={<Text className="text-sm text-muted-foreground">Failed to load</Text>}
          showError
          src="https://invalid-url.test/broken.jpg"
        />
      </View>
    </ScrollView>
  );
};

export { ImageDemo };
