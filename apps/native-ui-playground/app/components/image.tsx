import { Stack } from 'expo-router';
import { ImageDemo } from '@/src/demos/ImageDemo';

const ImagePage = () => {
  return (
    <>
      <Stack.Screen options={{ title: 'Image' }} />
      <ImageDemo />
    </>
  );
};

export default ImagePage;
