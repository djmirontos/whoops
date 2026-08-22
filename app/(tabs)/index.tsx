import { router, useFocusEffect } from 'expo-router'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Animated, Image, Pressable, ScrollView, Text, View } from 'react-native'
import WhoopsLogo from '../../assets/logo.png'
import { SafeArea } from '../../components/layout/SafeArea'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { CATEGORIES } from '../../constants/categories'
import { LOADING_MESSAGES } from '../../constants/loadingMessages'
import { useAdvice } from '../../hooks/useAdvice'
import { useHaptics } from '../../hooks/useHaptics'
import { getTodayDateKey, getUsageCount, incrementUsageCount } from '../../services/storage'

const CHAR_LIMIT = 500
const MIN_CHARS = 3
const DAILY_LIMIT = 5
const MESSAGE_ROTATE_MS = 700
const ALL_EXAMPLES = CATEGORIES.flatMap((category) => category.examples)

function pickRandomExamples(count: number): string[] {
  const shuffled = [...ALL_EXAMPLES].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

export default function HomeScreen() {
  const [problem, setProblem] = useState('')
  const [exampleChips, setExampleChips] = useState<string[]>(() => pickRandomExamples(6))
  const [showLoading, setShowLoading] = useState(false)
  const [showLimitModal, setShowLimitModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const { setCurrentProblem, generateAdvice } = useAdvice()
  const { impactMedium } = useHaptics()

  // Reshuffle the example chips every time this screen gains focus, not just on first mount.
  useFocusEffect(
    useCallback(() => {
      setExampleChips(pickRandomExamples(6))
    }, [])
  )

  useEffect(() => {
    if (!errorMessage) return
    const timeout = setTimeout(() => setErrorMessage(null), 3000)
    return () => clearTimeout(timeout)
  }, [errorMessage])

  const canSubmit = problem.trim().length >= MIN_CHARS
  const isAtCharLimit = problem.length >= CHAR_LIMIT

  async function handleSubmit() {
    if (!canSubmit) return

    const dateKey = getTodayDateKey()
    const usageCount = await getUsageCount(dateKey)
    if (usageCount >= DAILY_LIMIT) {
      setShowLimitModal(true)
      return
    }

    await impactMedium()
    setShowLoading(true)
    setCurrentProblem(problem)

    try {
      await generateAdvice()
      await incrementUsageCount(dateKey)
      setShowLoading(false)
      router.push('/advice')
    } catch {
      setShowLoading(false)
      setErrorMessage('Something went wrong. Try again. 😈')
    }
  }

  return (
    <>
      <SafeArea>
        <View className="flex-1 px-6 pt-4">
          <Image
            source={WhoopsLogo}
            style={{ width: 120, height: 48 }}
            resizeMode="contain"
            accessibilityRole="image"
            accessibilityLabel="Whoops"
          />

          <Text className="mt-6 text-2xl font-bold text-text-primary">What's your problem?</Text>

          <View className="relative mt-4">
            <Input
              className="min-h-[140px] pb-8"
              placeholder="I don't want to clean my room..."
              value={problem}
              onChangeText={(text) => setProblem(text.slice(0, CHAR_LIMIT))}
              textAlignVertical="top"
            />
            <Text
              className={`absolute bottom-3 right-4 text-xs ${
                isAtCharLimit ? 'text-danger' : 'text-text-muted'
              }`}
            >
              {problem.length} / {CHAR_LIMIT}
            </Text>
          </View>

          <Button
            label="😈 GIVE ME BAD ADVICE"
            onPress={handleSubmit}
            disabled={!canSubmit}
            className="mt-4"
          />

          <Text className="mt-8 text-text-secondary">Try:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-2">
            {exampleChips.map((example) => (
              <Pressable
                key={example}
                onPress={() => setProblem(example.slice(0, CHAR_LIMIT))}
                className="mr-2 rounded-full border border-border px-4 py-2"
              >
                <Text className="text-text-secondary">{example}</Text>
              </Pressable>
            ))}
          </ScrollView>

          {errorMessage ? (
            <View className="absolute bottom-6 left-6 right-6 rounded-2xl bg-danger px-4 py-3">
              <Text className="text-center font-semibold text-text-primary">{errorMessage}</Text>
            </View>
          ) : null}
        </View>
      </SafeArea>

      {showLoading ? <LoadingOverlay /> : null}
      {showLimitModal ? <LimitReachedModal onDismiss={() => setShowLimitModal(false)} /> : null}
    </>
  )
}

function LoadingOverlay() {
  const [messageIndex, setMessageIndex] = useState(0)
  const opacity = useRef(new Animated.Value(1)).current

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (!finished) return
        setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length)
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start()
      })
    }, MESSAGE_ROTATE_MS)
    return () => clearInterval(interval)
  }, [opacity])

  return (
    <View className="absolute inset-0 items-center justify-center bg-background">
      <Text className="text-6xl">😈</Text>
      <Text className="mt-4 text-lg font-bold text-primary">WHOOPS IS THINKING...</Text>
      <View className="mt-2">
        <Animated.View style={{ opacity }}>
          <Text className="text-text-secondary">{LOADING_MESSAGES[messageIndex]}</Text>
        </Animated.View>
      </View>
    </View>
  )
}

function LimitReachedModal({ onDismiss }: { onDismiss: () => void }) {
  return (
    <View className="absolute inset-0 items-center justify-center bg-background px-8">
      <Text className="text-5xl">😈</Text>
      <Text className="mt-6 text-center text-2xl font-bold text-text-primary">
        You've had enough bad advice today.
      </Text>
      <Text className="mt-2 text-center text-text-secondary">
        Come back tomorrow for more terrible decisions.
      </Text>
      <Button label="I'M DONE FOR TODAY 😈" onPress={onDismiss} className="mt-8 w-full" />
    </View>
  )
}
