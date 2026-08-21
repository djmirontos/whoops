import { Text, View } from 'react-native'

interface BadgeProps {
  label: string
  className?: string
}

export function Badge({ label, className = '' }: BadgeProps) {
  return (
    <View className={`rounded-full bg-surface-raised px-3 py-1 ${className}`}>
      <Text className="text-xs text-text-secondary">{label}</Text>
    </View>
  )
}
