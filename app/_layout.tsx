import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};
const isLoggedIn = false;

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
          <Stack.Protected guard={isLoggedIn}>
              <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
          </Stack.Protected>
          <Stack.Protected guard={isLoggedIn}>
          </Stack.Protected>
          <Stack.Protected guard={!isLoggedIn}>
              <Stack.Screen name="sign-up" options={{ headerShown: false }} />
              <Stack.Screen name="log-in" options={{ headerShown: false }} />
              <Stack.Screen name="modal" options={{
                  presentation: 'modal',
                  title: 'Modal',
                  headerShown: false }} />
          </Stack.Protected>



      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
