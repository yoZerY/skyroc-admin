import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { NavBar } from '@skyroc/native-ui';
import { SignatureDemo } from '@/src/demos/SignatureDemo';

const SignaturePage = () => {
  const router = useRouter();

  return (
    <View className="flex-1 bg-background">
      <NavBar leftArrow title="Signature" onLeftPress={() => router.back()} />
      <SignatureDemo />
    </View>
  );
};

export default SignaturePage;
