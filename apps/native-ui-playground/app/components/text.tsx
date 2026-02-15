import { Stack } from 'expo-router';
import { TextDemo } from '@/src/demos/TextDemo';

const TextPage = () => {
  return (
    <>
      <Stack.Screen options={{ title: 'Text' }} />
      <TextDemo />
    </>
  );
};

export default TextPage;
