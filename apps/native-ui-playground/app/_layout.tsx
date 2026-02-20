import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { BottomSheetModalProvider, registerImageComponent, PortalHost } from '@skyroc/native-ui';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Slot, Stack , useNavigationContainerRef} from 'expo-router';
import { Image as ExpoImage } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import { useReactNavigationDevTools } from '@dev-plugins/react-navigation';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { styled } from 'nativewind';
import { View } from 'react-native';
import 'react-native-reanimated';
import "../global.css"

const RTImage=styled(ExpoImage)

registerImageComponent(RTImage);

export { ErrorFallback as ErrorBoundary } from '@/components/ErrorBoundary';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const navigationRef = useNavigationContainerRef();

  useReactNavigationDevTools(navigationRef);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <BottomSheetModalProvider>
          <View className="flex-1">
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: { flex: 1 },
                animationMatchesGesture: true,
                animation: 'slide_from_right',
                orientation: 'portrait'
              }}
            >
              <Slot />
            </Stack>
            <StatusBar animated style="auto" />
            <PortalHost />
          </View>
        </BottomSheetModalProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
