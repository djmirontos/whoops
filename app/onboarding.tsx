import { router } from 'expo-router'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '../constants/colors'
import { useHaptics } from '../hooks/useHaptics'
import { setOnboarded } from '../services/storage'

export default function OnboardingScreen() {
  const { impactMedium } = useHaptics()

  async function handleContinue() {
    await impactMedium()
    await setOnboarded()
    router.replace('/(tabs)')
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.spacer} />

      <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain" />
      <Image
        source={require('../assets/mascott.png')}
        style={styles.mascot}
        resizeMode="contain"
      />

      <Text style={styles.tagline1}>You have a problem.</Text>
      <Text style={styles.tagline2}>We have terrible advice.</Text>

      <View style={styles.spacer} />

      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>LET'S MAKE IT WORSE 😈</Text>
      </TouchableOpacity>
      <Text style={styles.smallPrint}>Free to use · No account needed</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingBottom: 32,
  },
  spacer: {
    flex: 1,
  },
  logo: {
    width: 200,
    height: 80,
    alignSelf: 'center',
  },
  mascot: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: 8,
  },
  tagline1: {
    color: Colors.textPrimary,
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 24,
  },
  tagline2: {
    color: Colors.lavender,
    fontSize: 18,
    textAlign: 'center',
    marginTop: 4,
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    paddingVertical: 20,
    marginHorizontal: 32,
  },
  buttonText: {
    color: Colors.textPrimary,
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
  },
  smallPrint: {
    color: Colors.textMuted,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 12,
  },
})
