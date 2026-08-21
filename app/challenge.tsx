import { Stack, router } from 'expo-router'
import { Text, View } from 'react-native'
import { ChallengeCard } from '../components/advice/ChallengeCard'
import { SafeArea } from '../components/layout/SafeArea'
import { Button } from '../components/ui/Button'
import { useSessionStore } from '../stores/sessionStore'

export default function ChallengeScreen() {
  const currentResponse = useSessionStore((state) => state.currentResponse)
  const completeChallenge = useSessionStore((state) => state.completeChallenge)

  function handleDidIt() {
    completeChallenge()
    router.replace('/completion')
  }

  function handleGiveUp() {
    // Spec: navigate to Home with sarcastic message "Typical. 🙃"
    router.replace('/')
  }

  return (
    <SafeArea>
      <Stack.Screen options={{ headerShown: false, gestureEnabled: false }} />
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-2xl font-bold text-text-primary">Fine. You win.</Text>
        <Text className="mt-2 text-text-muted">Your extremely annoying mission:</Text>

        {currentResponse ? (
          <View className="mt-6 w-full">
            <ChallengeCard challenge={currentResponse.challenge} />
          </View>
        ) : null}

        <View className="mt-auto w-full">
          <Button label="I DID IT ✅" variant="success" onPress={handleDidIt} />
          <Text className="mt-4 text-center text-text-muted" onPress={handleGiveUp}>
            I give up 🥲
          </Text>
        </View>
      </View>
    </SafeArea>
  )
}
