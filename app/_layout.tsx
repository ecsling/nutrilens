import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Login',
          headerLeft: () => null, 
          gestureEnabled: false,  
          headerShown: true,
        }} />
        <Stack.Screen name="history_menu" options={{ title: 'Recents' }} />
        <Stack.Screen name="main_menu" options={{ title: 'Home Page' }} />
        <Stack.Screen name="scanner" options={{ title: 'Scan Products' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
