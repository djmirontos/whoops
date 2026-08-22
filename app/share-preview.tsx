import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useRef, useState } from 'react'
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '../constants/colors'
import { captureShareCard, saveImageToGallery, shareImage } from '../services/shareCard'
import { useSessionStore } from '../stores/sessionStore'
import { splitAdvice } from '../utils/splitAdvice'

type ShareStyleLabel = 'Classic' | 'Chaos' | 'Wisdom'

const STYLE_LABELS: ShareStyleLabel[] = ['Classic', 'Chaos', 'Wisdom']

function truncate(text: string, maxLength: number): string {
  return text.length > maxLength ? `${text.slice(0, maxLength).trim()}...` : text
}

export default function SharePreviewScreen() {
  const currentProblem = useSessionStore((state) => state.currentProblem)
  const currentResponse = useSessionStore((state) => state.currentResponse)
  const [selectedStyle, setSelectedStyle] = useState<ShareStyleLabel>('Classic')
  const cardRef = useRef<View>(null)

  async function handleShare() {
    try {
      const uri = await captureShareCard(cardRef)
      await shareImage(uri)
    } catch {
      Alert.alert('Something went wrong', "Couldn't share this Whoops. Try again.")
    }
  }

  async function handleSave() {
    try {
      const uri = await captureShareCard(cardRef)
      await saveImageToGallery(uri)
      Alert.alert('Saved! 📸', 'Share card saved to gallery')
    } catch {
      Alert.alert('Something went wrong', "Couldn't save this Whoops. Try again.")
    }
  }

  const { headline, body } = currentResponse
    ? splitAdvice(currentResponse.response)
    : { headline: '', body: '' }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your terrible advice 😎</Text>
      </View>

      {currentResponse ? (
        <>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.tabsRow}>
              {STYLE_LABELS.map((label) => (
                <TouchableOpacity
                  key={label}
                  style={[styles.tab, selectedStyle === label && styles.tabActive]}
                  onPress={() => setSelectedStyle(label)}
                >
                  <Text style={styles.tabText}>{label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View ref={cardRef} collapsable={false} style={styles.cardWrap}>
              {selectedStyle === 'Classic' && (
                <View style={styles.classicCard}>
                  <Image
                    source={require('../assets/logo.png')}
                    style={styles.classicLogo}
                    resizeMode="contain"
                  />

                  <Text style={styles.classicLabel}>YOU ASKED:</Text>
                  <Text style={styles.classicQuestion}>"{currentProblem}"</Text>

                  <View style={styles.classicDivider} />

                  <Text style={[styles.classicLabel, styles.classicLabelPink]}>WE SAID:</Text>
                  <Text style={styles.classicHeadline}>{headline}</Text>
                  <Text style={styles.classicBody}>{truncate(body, 120)}</Text>

                  <View style={styles.classicBrandRow}>
                    <Text style={styles.classicBrandEmoji}>😈</Text>
                    <Text style={styles.classicBrandText}>Whoops · whoops.app</Text>
                  </View>
                </View>
              )}

              {selectedStyle === 'Chaos' && (
                <View style={styles.chaosCard}>
                  <Text style={styles.chaosTitle}>I ASKED WHOOPS</Text>

                  <Text style={styles.chaosMeLabel}>Me:</Text>
                  <Text style={styles.chaosQuestion}>"{currentProblem}"</Text>

                  <Text style={styles.chaosWhoopsLabel}>Whoops:</Text>
                  <Text style={styles.chaosHeadline}>{headline}</Text>
                  <Text style={styles.chaosBody}>{truncate(body, 100)} 💀</Text>

                  <Text style={styles.chaosBrand}>😈 whoops.app</Text>
                </View>
              )}

              {selectedStyle === 'Wisdom' && (
                <View style={styles.wisdomCard}>
                  <Text style={styles.wisdomQuoteMark}>“</Text>
                  <Text style={styles.wisdomHeadline}>{headline}</Text>
                  <View style={styles.wisdomDivider} />
                  <Text style={styles.wisdomSignoff}>— Whoops 😈</Text>
                  <Text style={styles.wisdomTagline}>
                    Terrible advice. Surprisingly good results.
                  </Text>
                  <Text style={styles.wisdomUrl}>whoops.app</Text>
                </View>
              )}
            </View>
          </ScrollView>

          <View style={styles.bottomButtons}>
            <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
              <Ionicons name="share-social" size={20} color={Colors.textPrimary} />
              <Text style={styles.shareButtonText}>SHARE IMAGE</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Ionicons name="download-outline" size={20} color={Colors.secondary} />
              <Text style={styles.saveButtonText}>SAVE TO GALLERY</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No Whoops to share yet.</Text>
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 24,
  },
  headerTitle: {
    color: Colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  emptyStateText: {
    color: Colors.lavender,
    fontSize: 15,
    textAlign: 'center',
  },
  tabsRow: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginTop: 20,
    gap: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: Colors.surface,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    color: Colors.textPrimary,
    fontSize: 13,
    fontWeight: '600',
  },
  cardWrap: {
    margin: 24,
    borderRadius: 20,
    overflow: 'hidden',
  },

  // Classic
  classicCard: {
    backgroundColor: Colors.background,
    padding: 28,
    borderWidth: 1,
    borderColor: Colors.surface,
    borderRadius: 20,
  },
  classicLogo: {
    width: 100,
    height: 40,
    marginBottom: 16,
  },
  classicLabel: {
    color: Colors.lavender,
    fontSize: 11,
    letterSpacing: 1.5,
    fontWeight: '700',
    marginBottom: 4,
  },
  classicLabelPink: {
    color: Colors.secondary,
    marginBottom: 8,
  },
  classicQuestion: {
    fontStyle: 'italic',
    color: Colors.textPrimary,
    fontSize: 14,
    marginBottom: 16,
  },
  classicDivider: {
    height: 1,
    backgroundColor: Colors.surface,
    marginBottom: 16,
  },
  classicHeadline: {
    color: Colors.textPrimary,
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  classicBody: {
    color: Colors.lavender,
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 20,
  },
  classicBrandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  classicBrandEmoji: {
    fontSize: 16,
  },
  classicBrandText: {
    color: Colors.primary,
    fontSize: 11,
    fontWeight: '700',
  },

  // Chaos
  chaosCard: {
    backgroundColor: '#0D0020',
    padding: 28,
    borderRadius: 20,
  },
  chaosTitle: {
    color: Colors.textPrimary,
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -1,
    marginBottom: 16,
  },
  chaosMeLabel: {
    color: Colors.lavender,
    fontSize: 13,
    marginBottom: 4,
  },
  chaosQuestion: {
    fontStyle: 'italic',
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  chaosWhoopsLabel: {
    color: Colors.secondary,
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 8,
  },
  chaosHeadline: {
    color: Colors.textPrimary,
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  chaosBody: {
    color: Colors.lavender,
    fontSize: 14,
    marginBottom: 20,
  },
  chaosBrand: {
    color: Colors.primary,
    fontSize: 11,
  },

  // Wisdom
  wisdomCard: {
    backgroundColor: Colors.surface,
    padding: 36,
    borderRadius: 20,
    alignItems: 'center',
  },
  wisdomQuoteMark: {
    fontSize: 48,
    color: Colors.secondary,
    lineHeight: 40,
    marginBottom: 8,
  },
  wisdomHeadline: {
    fontStyle: 'italic',
    color: Colors.textPrimary,
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: -0.5,
    marginBottom: 16,
  },
  wisdomDivider: {
    width: 40,
    height: 2,
    backgroundColor: Colors.secondary,
    marginBottom: 16,
  },
  wisdomSignoff: {
    color: Colors.lavender,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  wisdomTagline: {
    color: Colors.textMuted,
    fontSize: 11,
    textAlign: 'center',
  },
  wisdomUrl: {
    color: Colors.textMuted,
    fontSize: 10,
  },

  bottomButtons: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 12,
    gap: 12,
  },
  shareButton: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  shareButtonText: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  saveButton: {
    borderWidth: 2,
    borderColor: Colors.secondary,
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  saveButtonText: {
    color: Colors.secondary,
    fontSize: 16,
    fontWeight: '700',
  },
})
