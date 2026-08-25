import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useEffect, useRef, useState } from 'react'
import {
  Animated,
  Image,
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '../../constants/colors'
import { LOADING_MESSAGES } from '../../constants/loadingMessages'
import { useAdvice } from '../../hooks/useAdvice'
import { useHaptics } from '../../hooks/useHaptics'
import { useSessionStore } from '../../stores/sessionStore'

const CHAR_LIMIT = 500
const MIN_CHARS = 3
const MESSAGE_ROTATE_MS = 700

export default function HomeScreen() {
  const [problem, setProblem] = useState('')
  const [showLoading, setShowLoading] = useState(false)
  const [showLimitModal, setShowLimitModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const { setCurrentProblem, generateAdvice, isLoading } = useAdvice()
  const { impactMedium } = useHaptics()

  useEffect(() => {
    if (!errorMessage) return
    const timeout = setTimeout(() => setErrorMessage(null), 3000)
    return () => clearTimeout(timeout)
  }, [errorMessage])

  const canSubmit = problem.trim().length >= MIN_CHARS
  const isAtCharLimit = problem.length >= CHAR_LIMIT

  async function handleSubmit() {
    Keyboard.dismiss()

    if (!canSubmit) return

    await impactMedium()
    setShowLoading(true)
    setCurrentProblem(problem)

    try {
      await generateAdvice()
      setShowLoading(false)

      if (useSessionStore.getState().rateLimited) {
        setShowLimitModal(true)
        return
      }

      router.push('/advice')
    } catch {
      setShowLoading(false)
      setErrorMessage('Something went wrong. Try again. 😈')
    }
  }

  return (
    <>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
            accessibilityRole="image"
            accessibilityLabel="Whoops"
          />

          <Text style={styles.tagline}>What's your problem?</Text>

          <Image
            source={require('../../assets/mascott.png')}
            style={styles.mascot}
            resizeMode="contain"
            accessibilityRole="image"
            accessibilityLabel="Whoops mascot"
          />

          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.input, { paddingRight: 44 }]}
              placeholder="Tell me your problem... 😈"
              placeholderTextColor={Colors.lavender}
              multiline
              maxLength={CHAR_LIMIT}
              textAlignVertical="top"
              value={problem}
              onChangeText={(text) => setProblem(text.slice(0, CHAR_LIMIT))}
            />
            {problem.length > 0 && (
              <TouchableOpacity
                style={styles.clearButton}
                onPress={() => {
                  setProblem('')
                  Keyboard.dismiss()
                }}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Ionicons name="close-circle" size={20} color={Colors.textMuted} />
              </TouchableOpacity>
            )}
          </View>
          <Text style={[styles.counter, isAtCharLimit && styles.counterLimit]}>
            {problem.length} / {CHAR_LIMIT}
          </Text>

          <Pressable
            onPress={handleSubmit}
            disabled={!canSubmit || isLoading}
            style={[styles.button, !canSubmit && styles.buttonDisabled]}
          >
            <Text style={styles.buttonText}>GET BAD ADVICE 😈</Text>
          </Pressable>

          <Text style={styles.sparkles}>✦ ✧ ✦</Text>

          {errorMessage ? (
            <View style={styles.errorToast}>
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          ) : null}
        </ScrollView>
      </SafeAreaView>

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
    <View style={styles.overlay}>
      <View style={styles.overlayMascotWrap}>
        <Text style={[styles.overlaySparkle, styles.overlaySparkleTopLeft]}>✦</Text>
        <Text style={[styles.overlaySparkle, styles.overlaySparkleTopRight]}>✦</Text>
        <Image
          source={require('../../assets/classic.png')}
          style={styles.overlayMascot}
          resizeMode="contain"
        />
      </View>
      <Animated.View style={{ opacity }}>
        <Text style={styles.overlayMessage}>{LOADING_MESSAGES[messageIndex]}</Text>
      </Animated.View>
    </View>
  )
}

function LimitReachedModal({ onDismiss }: { onDismiss: () => void }) {
  return (
    <View style={styles.overlay}>
      <Image
        source={require('../../assets/mascott.png')}
        style={styles.limitMascot}
        resizeMode="contain"
      />
      <Text style={styles.limitTitle}>You've had enough bad advice today.</Text>
      <Text style={styles.limitBody}>Come back tomorrow for more terrible decisions.</Text>
      <Pressable onPress={onDismiss} style={[styles.button, styles.limitButton]}>
        <Text style={styles.buttonText}>I'M DONE FOR TODAY 😈</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  logo: {
    width: 160,
    height: 64,
    alignSelf: 'center',
    marginTop: 48,
  },
  tagline: {
    color: Colors.textPrimary,
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 16,
  },
  mascot: {
    width: 140,
    height: 140,
    alignSelf: 'center',
    marginTop: 8,
  },
  inputWrapper: {
    position: 'relative',
    marginHorizontal: 24,
    marginTop: 16,
  },
  input: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.surfaceRaised,
    padding: 16,
    color: Colors.textPrimary,
    fontSize: 16,
    minHeight: 100,
  },
  clearButton: {
    position: 'absolute',
    right: 12,
    top: 12,
    zIndex: 1,
  },
  counter: {
    fontSize: 12,
    color: Colors.lavender,
    textAlign: 'right',
    marginTop: 4,
    marginHorizontal: 24,
  },
  counterLimit: {
    color: Colors.danger,
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    paddingVertical: 18,
    marginHorizontal: 24,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  sparkles: {
    color: Colors.secondary,
    textAlign: 'center',
    fontSize: 14,
    marginTop: 16,
  },
  errorToast: {
    backgroundColor: Colors.danger,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 16,
    marginHorizontal: 24,
  },
  errorText: {
    color: Colors.textPrimary,
    fontWeight: '600',
    textAlign: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  overlayMascotWrap: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayMascot: {
    width: 160,
    height: 160,
  },
  overlaySparkle: {
    position: 'absolute',
    color: Colors.accent,
    fontSize: 20,
  },
  overlaySparkleTopLeft: {
    top: 0,
    left: -8,
  },
  overlaySparkleTopRight: {
    top: 12,
    right: -8,
  },
  overlayMessage: {
    fontSize: 18,
    color: Colors.textPrimary,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 24,
  },
  limitMascot: {
    width: 140,
    height: 140,
  },
  limitTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginTop: 24,
  },
  limitBody: {
    fontSize: 15,
    color: Colors.lavender,
    textAlign: 'center',
    marginTop: 8,
  },
  limitButton: {
    marginTop: 32,
    width: '100%',
  },
})
