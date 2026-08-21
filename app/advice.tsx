import { router } from 'expo-router'
import { Text, View } from 'react-native'
import { AdviceCard } from '../components/advice/AdviceCard'
import { SafeArea } from '../components/layout/SafeArea'
import { Button } from '../components/ui/Button'
import { useSessionStore } from '../stores/sessionStore'

export default function AdviceScreen() {
  const currentProblem = useSessionStore((state) => state.currentProblem)
  const currentResponse = useSessionStore((state) => state.currentResponse)

  function handleFine() {
    // TODO: save to history (spec Section 5, Screen 2) before navigating
    if (currentResponse?.challenge.enabled) {
      router.push('/challenge')
    } else {
      router.push('/completion')
    }
  }

  return (
    <SafeArea>
      <View className="flex-1 px-6 pt-4">
        <Text className="text-secondary">BAD ADVICE</Text>

        {currentResponse ? (
          <View className="mt-4">
            <AdviceCard userProblem={currentProblem} response={currentResponse} />
          </View>
        ) : (
          <Text className="mt-4 text-text-secondary">
            No advice generated yet. {/* TODO: wire up useAdvice()/sessionStore.generateAdvice() */}
          </Text>
        )}

        <View className="mt-auto">
          <Button label="🙃 FINE. I'LL DO IT" onPress={handleFine} />
          <Text className="mt-4 text-center text-text-muted" onPress={() => router.back()}>
            Try another one
          </Text>
        </View>
      </View>
    </SafeArea>
  )
}
