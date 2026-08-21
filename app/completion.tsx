import { router } from 'expo-router'
import { useMemo } from 'react'
import { Text, View } from 'react-native'
import { CompletionCard } from '../components/advice/CompletionCard'
import { SafeArea } from '../components/layout/SafeArea'
import { Button } from '../components/ui/Button'
import { COMPLETION_MESSAGES } from '../constants/completionMessages'
import { generatePercentage } from '../utils/percentage'

export default function CompletionScreen() {
  const message = useMemo(
    () => COMPLETION_MESSAGES[Math.floor(Math.random() * COMPLETION_MESSAGES.length)],
    []
  )
  const percentage = useMemo(() => generatePercentage(), [])

  return (
    <SafeArea>
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-4xl">🙃</Text>

        <View className="mt-6 w-full">
          <CompletionCard message={message} percentage={percentage} />
        </View>

        <View className="mt-8 w-full">
          <Button label="🙃 ANOTHER PROBLEM" onPress={() => router.replace('/')} />
          <Button
            label="🤝 SHARE THIS WHOOPS"
            variant="secondary"
            onPress={() => router.push('/share-preview')}
            className="mt-3"
          />
          <Text className="mt-4 text-center text-text-muted" onPress={() => router.replace('/')}>
            I'm done for now
          </Text>
        </View>
      </View>
    </SafeArea>
  )
}
