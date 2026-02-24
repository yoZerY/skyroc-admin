import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { NavBar } from '@skyroc/native-ui';
import { DatePickerDemo } from '@/src/demos/DatePickerDemo';

const DatePickerPage = () => {
  const router = useRouter();

  return (
    <View className="flex-1 bg-background">
      <NavBar leftArrow title="DatePicker" onLeftPress={() => router.back()} />
      <DatePickerDemo />
    </View>
  );
};

export default DatePickerPage;
