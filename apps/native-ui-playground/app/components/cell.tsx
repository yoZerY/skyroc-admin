import { Stack } from 'expo-router';
import { CellDemo } from '@/src/demos/CellDemo';

const CellPage = () => {
  return (
    <>
      <Stack.Screen options={{ title: 'Cell' }} />
      <CellDemo />
    </>
  );
};

export default CellPage;
