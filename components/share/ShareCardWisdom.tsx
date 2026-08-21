import { forwardRef } from 'react'
import { Text, View } from 'react-native'
import type { WhoopsResponse } from '../../types'

interface ShareCardProps {
  userProblem: string
  response: WhoopsResponse
}

// Template C — Fake Wisdom (spec Section 9, priority template). Looks like
// an inspirational quote card until the double-take.
export const ShareCardWisdom = forwardRef<View, ShareCardProps>(function ShareCardWisdom(
  { userProblem, response },
  ref
) {
  return (
    <View ref={ref} className="h-[1350px] w-[1080px] items-center justify-center bg-surface p-16">
      <Text className="text-center text-5xl italic text-text-primary">"{response.response}"</Text>

      <View className="mt-16 h-px w-24 bg-border" />

      <Text className="mt-8 text-2xl text-primary">— Whoops 🙃</Text>

      <View className="mt-auto items-center">
        <Text className="text-xs text-text-muted">Terrible advice. Surprisingly good results.</Text>
        <Text className="text-xs text-text-muted">whoops.app</Text>
      </View>

      {/* userProblem is retained on the type for future captioning, not rendered on this template */}
    </View>
  )
})
