import type { PropsWithChildren } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

interface SafeAreaProps extends PropsWithChildren {
  className?: string
}

export function SafeArea({ children, className = '' }: SafeAreaProps) {
  return (
    <SafeAreaView className={`flex-1 bg-background ${className}`} edges={['top', 'bottom']}>
      {children}
    </SafeAreaView>
  )
}
