import '../global.css'

import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
} from '@expo-google-fonts/plus-jakarta-sans'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
  })

  if (!fontsLoaded) {
    // Blank dark screen until fonts are ready — no flash of unstyled text.
    return <View className="flex-1 bg-background" />
  }

  return (
    <SafeAreaProvider>
      {/* style="light" renders light status bar content, which is correct
          against our near-black #0D0D10 background. */}
      <StatusBar style="light" backgroundColor="#0D0D10" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#0D0D10' } }}>
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="advice" />
        <Stack.Screen name="challenge" options={{ gestureEnabled: false }} />
        <Stack.Screen name="completion" />
        <Stack.Screen name="share-preview" options={{ presentation: 'modal' }} />
      </Stack>
    </SafeAreaProvider>
  )
}
