import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { NavBar } from '@skyroc/native-ui';
import { ShareSheetDemo } from '@/src/demos/ShareSheetDemo';

const ShareSheetPage = () => {
  const router = useRouter();

  return (
    <View className="flex-1 bg-background">
      <NavBar leftArrow title="ShareSheet" onLeftPress={() => router.back()} />
      <ShareSheetDemo />
    </View>
  );
};

export default ShareSheetPage;
