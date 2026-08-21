import { router } from 'expo-router'
import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { ShareCardChaos } from '../components/share/ShareCardChaos'
import { ShareCardClassic } from '../components/share/ShareCardClassic'
import { ShareCardWisdom } from '../components/share/ShareCardWisdom'
import { SafeArea } from '../components/layout/SafeArea'
import { Button } from '../components/ui/Button'
import { useSessionStore } from '../stores/sessionStore'
import type { ShareCardStyle } from '../types'

const STYLE_LABELS: Record<ShareCardStyle, string> = {
  classic: '📸 Classic',
  chaos: '🌀 Chaos',
  wisdom: '🧠 Wisdom',
}

export default function SharePreviewScreen() {
  const currentProblem = useSessionStore((state) => state.currentProblem)
  const currentResponse = useSessionStore((state) => state.currentResponse)
  const [style, setStyle] = useState<ShareCardStyle>('classic')

  return (
    <SafeArea>
      <View className="flex-1 px-6 pt-4">
        <Text className="text-text-secondary" onPress={() => router.back()}>
          ← back
        </Text>

        <Text className="mt-4 text-2xl font-bold text-text-primary">Choose your style:</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-4">
          {(Object.keys(STYLE_LABELS) as ShareCardStyle[]).map((key) => (
            <Text
              key={key}
              onPress={() => setStyle(key)}
              className={`mr-2 rounded-full px-4 py-2 ${
                style === key
                  ? 'bg-primary text-text-primary'
                  : 'bg-surface-raised text-text-secondary'
              }`}
            >
              {STYLE_LABELS[key]}
            </Text>
          ))}
        </ScrollView>

        <ScrollView className="mt-4 flex-1 rounded-2xl bg-surface">
          {currentResponse ? (
            // TODO: attach a ref here and wire up services/shareCard.ts capture
            <View className="scale-[0.3]">
              {style === 'classic' && (
                <ShareCardClassic userProblem={currentProblem} response={currentResponse} />
              )}
              {style === 'chaos' && (
                <ShareCardChaos userProblem={currentProblem} response={currentResponse} />
              )}
              {style === 'wisdom' && (
                <ShareCardWisdom userProblem={currentProblem} response={currentResponse} />
              )}
            </View>
          ) : (
            <Text className="p-6 text-text-secondary">No Whoops to share yet.</Text>
          )}
        </ScrollView>

        <Button
          label="🤝 SHARE IMAGE"
          className="mt-4"
          onPress={() => {
            // TODO: wire up services/shareCard.ts capture + shareImage
          }}
        />
        <Button
          label="💾 SAVE TO GALLERY"
          variant="secondary"
          className="mt-3"
          onPress={() => {
            // TODO: wire up services/shareCard.ts capture + saveImageToGallery
          }}
        />
      </View>
    </SafeArea>
  )
}
