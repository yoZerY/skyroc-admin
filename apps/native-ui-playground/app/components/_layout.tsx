import { Stack } from 'expo-router';

const ComponentsLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerBackTitle: 'Back',
        headerStyle: { backgroundColor: '#f5f5f5' },
        headerTitleStyle: { fontWeight: '600' }
      }}
    />
  );
};

export default ComponentsLayout;
