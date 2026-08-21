import { forwardRef } from 'react'
import { Text, View } from 'react-native'
import type { WhoopsResponse } from '../../types'

interface ShareCardProps {
  userProblem: string
  response: WhoopsResponse
}

// Template A — Classic (spec Section 9). Rendered off-screen at 1080x1350
// and captured via react-native-view-shot.
export const ShareCardClassic = forwardRef<View, ShareCardProps>(function ShareCardClassic(
  { userProblem, response },
  ref
) {
  return (
    <View ref={ref} className="h-[1350px] w-[1080px] bg-background p-16">
      <Text className="text-2xl text-primary">🙃 WHOOPS</Text>

      <View className="mt-16">
        <Text className="text-xl uppercase tracking-wide text-text-muted">You asked</Text>
        <Text className="mt-2 text-3xl italic text-text-primary">"{userProblem}"</Text>
      </View>

      <View className="mt-16 border-t border-border" />

      <Text className="mt-16 text-5xl font-extrabold text-text-primary">{response.response}</Text>

      <View className="mt-auto items-center">
        <Text className="text-lg text-primary">🙃 Whoops</Text>
        <Text className="text-text-muted">Terrible advice. Zero regrets.</Text>
        <Text className="mt-2 text-xs text-text-muted">Get your own at whoops.app</Text>
      </View>
    </View>
  )
})
