import { Stack } from 'expo-router';
import { SpaceDemo } from '@/src/demos/SpaceDemo';

const SpacePage = () => {
  return (
    <>
      <Stack.Screen options={{ title: 'Space' }} />
      <SpaceDemo />
    </>
  );
};

export default SpacePage;
