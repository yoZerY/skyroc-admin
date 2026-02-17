import { Image } from 'expo-image';
import { Text, View, StyleSheet, Button, Pressable } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { EditScreenInfo } from '@/components/EditScreenInfo';
import { Link } from 'expo-router';


export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>

      <View className={styles1.separator} />
      <EditScreenInfo path="App.tsx" />
      <Link asChild href='/components/button'>
        <Pressable>
          <Text className={styles1.title}>Hello World</Text>
        </Pressable>
      </Link>

      <Text className="text-xl font-bold text-blue-500">
        Welcome to Nativewind!
      </Text>

    </ParallaxScrollView>
  );
}

const styles1 = {
  container: `flex flex-1 px-4 bg-white items-center justify-center`,
  separator: `h-px w-[300px] bg-gray-200 my-7`,
  title: `text-xl font-bold`,
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
