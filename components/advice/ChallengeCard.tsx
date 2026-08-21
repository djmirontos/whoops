import { Text, View } from 'react-native'
import type { WhoopsChallenge } from '../../types'

interface ChallengeCardProps {
  challenge: WhoopsChallenge
}

export function ChallengeCard({ challenge }: ChallengeCardProps) {
  return (
    <View className="items-center rounded-2xl bg-surface p-6">
      <Text className="text-4xl">{challenge.emoji}</Text>
      <Text className="mt-2 text-center text-2xl font-extrabold text-accent">
        {challenge.instruction}
      </Text>
    </View>
  )
}
