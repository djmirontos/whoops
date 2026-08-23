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
import { useEffect } from 'react'
import { View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useSessionStore } from '../stores/sessionStore'

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
  })

  const initializeDevice = useSessionStore((state) => state.initializeDevice)

  useEffect(() => {
    initializeDevice()
  }, [initializeDevice])

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
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="advice" options={{ headerShown: false }} />
        <Stack.Screen
          name="challenge"
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen name="completion" options={{ headerShown: false }} />
        <Stack.Screen
          name="share-preview"
          options={{ headerShown: false, presentation: 'modal' }}
        />
      </Stack>
    </SafeAreaProvider>
  )
}
