import { router } from 'expo-router'
import { Image, Text, View } from 'react-native'
import { Button } from '../components/ui/Button'
import { setOnboarded } from '../services/storage'

export default function OnboardingScreen() {
  async function handleContinue() {
    await setOnboarded()
    router.replace('/')
  }

  return (
    <View className="flex-1 items-center justify-center bg-background px-6">
      <Image
        source={require('../assets/logo.png')}
        style={{ width: 180, height: 72 }}
        resizeMode="contain"
        accessibilityRole="image"
        accessibilityLabel="Whoops"
      />
      <Image
        source={require('../assets/mascott.png')}
        style={{ width: 160, height: 160, marginTop: 8 }}
        resizeMode="contain"
        accessibilityRole="image"
        accessibilityLabel="Whoops mascot"
      />
      <Text className="mt-4 text-center text-text-secondary">
        You have a problem.{'\n'}We have terrible advice.
      </Text>
      <Button label="LET'S MAKE IT WORSE 😈" onPress={handleContinue} className="mt-8" />
    </View>
  )
}
