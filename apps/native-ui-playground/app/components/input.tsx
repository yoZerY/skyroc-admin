import { Stack } from 'expo-router';
import { InputDemo } from '@/src/demos/InputDemo';

const InputPage = () => {
  return (
    <>
      <Stack.Screen options={{ title: 'Input' }} />
      <InputDemo />
    </>
  );
};

export default InputPage;
