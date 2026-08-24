import { router } from 'expo-router'
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '../constants/colors'
import { useSessionStore } from '../stores/sessionStore'
import { splitAdvice } from '../utils/splitAdvice'

export default function AdviceScreen() {
  const currentProblem = useSessionStore((state) => state.currentProblem)
  const currentResponse = useSessionStore((state) => state.currentResponse)

  const isRefusal = currentResponse ? !currentResponse.safe : false

  function handleFine() {
    // TODO: save to history (spec Section 5, Screen 2) before navigating
    if (isRefusal) {
      // Spec Section 5, Screen 8: a safety refusal never continues into the
      // challenge/completion celebration flow.
      router.replace('/')
    } else if (currentResponse?.challenge.enabled) {
      router.push('/challenge')
    } else {
      router.push('/completion')
    }
  }

  const { headline, body } = currentResponse
    ? splitAdvice(currentResponse.response)
    : { headline: '', body: '' }

  if (currentResponse && isRefusal) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <View style={styles.refusalContainer}>
          <Image
            source={require('../assets/whoah.png')}
            style={styles.whoahImage}
            resizeMode="contain"
          />

          <Text style={styles.refusalHeadline}>{headline}</Text>
          <Text style={styles.refusalBody}>{body}</Text>

          <TouchableOpacity onPress={handleFine} style={styles.refusalButton}>
            <Text style={styles.refusalButtonText}>ASK SOMETHING ELSE 😈</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.label}>BAD ADVICE</Text>

          {currentResponse ? (
            <>
              <Text style={styles.askedCaption}>YOU ASKED:</Text>
              <Text style={styles.question}>"{currentProblem}"</Text>

              <View style={styles.divider} />

              <Text style={styles.headline}>{headline}</Text>
              {body ? <Text style={styles.body}>{body}</Text> : null}

              <Image
                source={require('../assets/main.png')}
                style={styles.mascot}
                resizeMode="contain"
              />
            </>
          ) : (
            <Text style={styles.body}>
              No advice generated yet. {/* TODO: wire up useAdvice()/sessionStore.generateAdvice() */}
            </Text>
          )}
        </ScrollView>

        <View style={styles.stickyBottom}>
          <Pressable onPress={handleFine} style={styles.button}>
            <Text style={styles.buttonText}>{"FINE. I'LL DO IT 😈"}</Text>
          </Pressable>
          <Text style={styles.tryAnother} onPress={() => router.back()}>
            Try another
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  flex: {
    flex: 1,
  },
  refusalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  whoahImage: {
    width: 200,
    height: 200,
  },
  refusalHeadline: {
    color: Colors.textPrimary,
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 24,
    letterSpacing: -0.5,
  },
  refusalBody: {
    color: Colors.lavender,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 24,
  },
  refusalButton: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 32,
    marginTop: 32,
    width: '100%',
  },
  refusalButtonText: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  label: {
    color: Colors.secondary,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    textAlign: 'center',
    marginTop: 48,
  },
  askedCaption: {
    color: Colors.lavender,
    fontSize: 13,
    textAlign: 'center',
    marginTop: 20,
  },
  question: {
    color: Colors.textPrimary,
    fontSize: 15,
    fontStyle: 'italic',
    textAlign: 'center',
    paddingHorizontal: 32,
    marginTop: 6,
  },
  divider: {
    height: 1,
    width: 60,
    backgroundColor: Colors.secondary,
    alignSelf: 'center',
    marginTop: 20,
  },
  headline: {
    fontSize: 38,
    fontWeight: '800',
    color: Colors.textPrimary,
    textAlign: 'center',
    paddingHorizontal: 24,
    lineHeight: 38 * 1.2,
    marginTop: 24,
  },
  body: {
    fontSize: 17,
    color: Colors.lavenderLight,
    textAlign: 'center',
    paddingHorizontal: 32,
    marginTop: 12,
  },
  mascot: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginTop: 16,
  },
  stickyBottom: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 12,
    backgroundColor: Colors.background,
    gap: 12,
  },
  button: {
    backgroundColor: Colors.secondary,
    borderRadius: 20,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  tryAnother: {
    color: Colors.lavender,
    textAlign: 'center',
  },
})
