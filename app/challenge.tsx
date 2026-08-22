import { Stack, router } from 'expo-router'
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '../constants/colors'
import { useSessionStore } from '../stores/sessionStore'

export default function ChallengeScreen() {
  const currentResponse = useSessionStore((state) => state.currentResponse)
  const completeChallenge = useSessionStore((state) => state.completeChallenge)

  function handleDidIt() {
    completeChallenge()
    router.replace('/completion')
  }

  function handleGiveUp() {
    // Spec: navigate to Home with sarcastic message "Typical. 🙃"
    router.replace('/')
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <Stack.Screen options={{ headerShown: false, gestureEnabled: false }} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.fine}>Fine.</Text>
        <Text style={styles.youWin}>You win.</Text>

        <Image
          source={require('../assets/mascott.png')}
          style={styles.mascot}
          resizeMode="contain"
        />

        {currentResponse ? (
          <View style={styles.missionBox}>
            <Text style={styles.missionLabel}>YOUR MISSION:</Text>
            <Text style={styles.missionText}>{currentResponse.challenge.instruction}</Text>
            <Text style={styles.missionEmoji}>{currentResponse.challenge.emoji}</Text>
          </View>
        ) : null}

        <Pressable onPress={handleDidIt} style={styles.button}>
          <Text style={styles.buttonText}>I DID IT ✅</Text>
        </Pressable>
        <Text style={styles.giveUp} onPress={handleGiveUp}>
          I give up 😐
        </Text>
      </ScrollView>
    </SafeAreaView>
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
  fine: {
    fontSize: 42,
    fontWeight: '800',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginTop: 60,
  },
  youWin: {
    fontSize: 28,
    color: Colors.lavender,
    textAlign: 'center',
  },
  mascot: {
    width: 140,
    height: 140,
    alignSelf: 'center',
    marginTop: 16,
  },
  missionBox: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 24,
    marginHorizontal: 24,
    marginTop: 24,
    alignItems: 'center',
  },
  missionLabel: {
    color: Colors.lavender,
    fontSize: 11,
    letterSpacing: 2,
    fontWeight: '700',
    alignSelf: 'flex-start',
  },
  missionText: {
    color: Colors.accent,
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 8,
  },
  missionEmoji: {
    fontSize: 48,
    textAlign: 'center',
    marginTop: 8,
  },
  button: {
    backgroundColor: Colors.success,
    borderRadius: 20,
    paddingVertical: 18,
    marginHorizontal: 24,
    marginTop: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.textOnSuccess,
  },
  giveUp: {
    color: Colors.lavender,
    textAlign: 'center',
    marginTop: 16,
  },
})
