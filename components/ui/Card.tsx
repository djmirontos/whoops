import { View, type ViewProps } from 'react-native'

interface CardProps extends ViewProps {
  className?: string
}

export function Card({ className = '', ...viewProps }: CardProps) {
  return <View className={`rounded-2xl bg-surface p-4 ${className}`} {...viewProps} />
}
