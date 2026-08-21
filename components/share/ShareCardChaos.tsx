import { forwardRef } from 'react'
import { Text, View } from 'react-native'
import type { WhoopsResponse } from '../../types'

interface ShareCardProps {
  userProblem: string
  response: WhoopsResponse
}

// Template B — Chaos (spec Section 9). Large, bold, meme-like layout.
export const ShareCardChaos = forwardRef<View, ShareCardProps>(function ShareCardChaos(
  { userProblem, response },
  ref
) {
  return (
    <View ref={ref} className="h-[1350px] w-[1080px] items-center justify-center bg-background p-16">
      <Text className="text-3xl font-extrabold text-text-primary">I ASKED WHOOPS</Text>

      <View className="mt-12 self-start">
        <Text className="text-lg uppercase text-text-muted">Me:</Text>
        <Text className="text-2xl text-text-primary">"{userProblem}"</Text>
      </View>

      <View className="mt-8 self-start">
        <Text className="text-lg uppercase text-secondary">Whoops:</Text>
      </View>

      <Text className="mt-4 text-center text-6xl font-extrabold text-text-primary">
        {response.response}
      </Text>

      <Text className="mt-auto text-xs text-text-muted">🙃 whoops.app</Text>
    </View>
  )
})
