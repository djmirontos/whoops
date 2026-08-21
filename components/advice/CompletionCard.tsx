import { Text, View } from 'react-native'

interface CompletionCardProps {
  message: string
  percentage: number
}

export function CompletionCard({ message, percentage }: CompletionCardProps) {
  return (
    <View className="items-center rounded-2xl bg-surface p-6">
      <Text className="text-center text-2xl font-extrabold text-text-primary">{message}</Text>
      <Text className="mt-2 text-accent">The world is now {percentage}% better.</Text>
    </View>
  )
}
