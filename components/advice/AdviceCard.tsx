import { Text, View } from 'react-native'
import type { WhoopsResponse } from '../../types'

interface AdviceCardProps {
  userProblem: string
  response: WhoopsResponse
}

export function AdviceCard({ userProblem, response }: AdviceCardProps) {
  return (
    <View className="rounded-2xl bg-surface p-6">
      <Text className="text-xs uppercase tracking-wide text-text-muted">You asked</Text>
      <Text className="mb-4 italic text-text-secondary">"{userProblem}"</Text>
      <Text className="text-2xl font-extrabold text-text-primary">{response.response}</Text>
    </View>
  )
}
