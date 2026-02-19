import { Stack } from 'expo-router';
import { NavBarDemo } from '@/src/demos/NavBarDemo';

const NavBarPage = () => {
  return (
    <>
      <Stack.Screen options={{ title: 'NavBar' }} />
      <NavBarDemo />
    </>
  );
};

export default NavBarPage;
