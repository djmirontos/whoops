import { router } from 'expo-router'
import { useMemo } from 'react'
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '../constants/colors'
import { generatePercentage } from '../utils/percentage'

export default function CompletionScreen() {
  const percentage = useMemo(() => generatePercentage(), [])

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
          <Text style={styles.headline}>WHOOPS.</Text>
          <Text style={styles.subhead}>You actually did it.</Text>

          <Image
            source={require('../assets/happy.png')}
            style={styles.mascot}
            resizeMode="contain"
          />

          <Text style={styles.percentageLabel}>The world is now</Text>
          <Text style={styles.percentageLine}>
            <Text style={styles.percentageNumber}>{percentage}%</Text>
            <Text style={styles.percentageSuffix}> better.</Text>
          </Text>
        </ScrollView>

        <View style={styles.stickyBottom}>
          <Pressable onPress={() => router.replace('/')} style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>ANOTHER PROBLEM 😈</Text>
          </Pressable>

          <Pressable onPress={() => router.push('/share-preview')} style={styles.shareButton}>
            <Text style={styles.shareButtonText}>📤 SHARE THIS WHOOPS</Text>
          </Pressable>

          <Text style={styles.doneForNow} onPress={() => router.replace('/')}>
            I'm done for now
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
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  headline: {
    fontSize: 48,
    fontWeight: '800',
    color: Colors.secondary,
    textAlign: 'center',
    marginTop: 60,
  },
  subhead: {
    fontSize: 24,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginTop: 8,
  },
  mascot: {
    width: 160,
    height: 160,
    alignSelf: 'center',
    marginTop: 16,
  },
  percentageLabel: {
    color: Colors.lavender,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
  },
  percentageLine: {
    textAlign: 'center',
  },
  percentageNumber: {
    color: Colors.accent,
    fontSize: 32,
    fontWeight: '800',
  },
  percentageSuffix: {
    color: Colors.lavender,
    fontSize: 16,
  },
  stickyBottom: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 12,
    backgroundColor: Colors.background,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  shareButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.secondary,
    borderRadius: 20,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareButtonText: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.secondary,
  },
  doneForNow: {
    color: Colors.lavender,
    textAlign: 'center',
  },
})
