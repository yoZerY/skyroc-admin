import { Stack } from 'expo-router';
import { ButtonDemo } from '@/src/demos/ButtonDemo';

const ButtonPage = () => {
  return (
    <>
      <Stack.Screen options={{ title: 'Button' }} />
      <ButtonDemo />
    </>
  );
};

export default ButtonPage;
