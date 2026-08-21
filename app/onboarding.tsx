import { router } from 'expo-router'
import { Text, View } from 'react-native'
import { Button } from '../components/ui/Button'
import { setOnboarded } from '../services/storage'

export default function OnboardingScreen() {
  async function handleContinue() {
    await setOnboarded()
    router.replace('/')
  }

  return (
    <View className="flex-1 items-center justify-center bg-background px-6">
      <Text className="text-6xl">🙃</Text>
      <Text className="mt-4 text-4xl font-extrabold text-text-primary">WHOOPS</Text>
      <Text className="mt-4 text-center text-text-secondary">
        You have a problem.{'\n'}We have terrible advice.
      </Text>
      <Button label="LET'S MAKE IT WORSE 😈" onPress={handleContinue} className="mt-8" />
    </View>
  )
}
