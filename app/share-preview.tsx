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
import { markShared } from '../services/supabase'
import { useSessionStore } from '../stores/sessionStore'
import { splitAdvice } from '../utils/splitAdvice'

type ShareStyleLabel = 'Classic' | 'Chaos' | 'Wisdom'

const STYLE_LABELS: ShareStyleLabel[] = ['Classic', 'Chaos', 'Wisdom']

export default function SharePreviewScreen() {
  const currentProblem = useSessionStore((state) => state.currentProblem)
  const currentResponse = useSessionStore((state) => state.currentResponse)
  const currentInteractionId = useSessionStore((state) => state.currentInteractionId)
  const [selectedStyle, setSelectedStyle] = useState<ShareStyleLabel>('Classic')
  const cardRef = useRef<View>(null)

  async function handleShare() {
    try {
      const uri = await captureShareCard(cardRef)
      await shareImage(uri)

      if (currentInteractionId) {
        markShared(currentInteractionId, selectedStyle.toLowerCase())
      }
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
                  <Text
                    style={[styles.tabText, selectedStyle === label && styles.tabTextActive]}
                  >
                    {label}
                  </Text>
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

                  <Text style={styles.classicMeLabel}>Me:</Text>
                  <Text style={styles.classicQuestion}>"{currentProblem}"</Text>

                  <View style={styles.classicDivider} />

                  <Text style={styles.classicWhoopsLabel}>Whoops:</Text>
                  <Text style={styles.classicHeadline}>{headline}</Text>
                  <Text style={styles.classicBody}>
                    {body.length > 150 ? body.substring(0, 150) + '...' : body}
                  </Text>

                  <View style={styles.classicBottomRow}>
                    <Text style={styles.classicBrandText}>😈 whoops.app</Text>
                    <Image
                      source={require('../assets/mascott.png')}
                      style={styles.classicMascot}
                      resizeMode="contain"
                    />
                  </View>
                </View>
              )}

              {selectedStyle === 'Chaos' && (
                <View style={styles.chaosCard}>
                  <Text style={styles.chaosTitle}>I ASKED BAD ADVICE</Text>

                  <View style={styles.chaosDivider} />

                  <Text style={styles.chaosMeLabel}>Me:</Text>
                  <Text style={styles.chaosQuestion}>"{currentProblem}"</Text>

                  <Text style={styles.chaosWhoopsLabel}>Whoops:</Text>
                  <Text style={styles.chaosHeadline}>{headline}</Text>
                  <Text style={styles.chaosBody}>
                    {body.length > 150 ? body.substring(0, 150) + '...' : body}
                  </Text>

                  <Image
                    source={require('../assets/mascott.png')}
                    style={styles.chaosMascot}
                    resizeMode="contain"
                  />
                  <Text style={styles.chaosBrand}>😈 whoops.app</Text>
                </View>
              )}

              {selectedStyle === 'Wisdom' && (
                <View style={styles.wisdomCard}>
                  <Text style={styles.wisdomLabel}>WHOOPS WISDOM</Text>
                  <View style={styles.wisdomDivider} />

                  <Text style={styles.wisdomHeadline}>{headline}</Text>
                  <Text style={styles.wisdomBody}>{body}</Text>

                  <Text style={styles.wisdomSignoff}>— Whoops 😈</Text>
                  <View style={[styles.wisdomDivider, styles.wisdomDividerBottom]} />
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
    color: Colors.lavender,
    fontSize: 13,
    fontWeight: '600',
  },
  tabTextActive: {
    color: Colors.textPrimary,
  },
  cardWrap: {
    margin: 24,
    borderRadius: 20,
    overflow: 'hidden',
  },

  // Classic — warm cream card
  classicCard: {
    backgroundColor: '#F5F0E8',
    borderRadius: 20,
    padding: 24,
  },
  classicLogo: {
    width: 110,
    height: 44,
    marginBottom: 16,
  },
  classicMeLabel: {
    color: '#8B7355',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  classicQuestion: {
    color: '#2D1B0E',
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 14,
  },
  classicDivider: {
    height: 1,
    backgroundColor: '#D4C9B0',
  },
  classicWhoopsLabel: {
    color: Colors.primary,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginTop: 14,
    marginBottom: 6,
  },
  classicHeadline: {
    color: '#1A0A0E',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 6,
  },
  classicBody: {
    color: '#4A3728',
    fontSize: 13,
    lineHeight: 19,
  },
  classicBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  classicBrandText: {
    color: Colors.primary,
    fontSize: 11,
  },
  classicMascot: {
    width: 56,
    height: 56,
  },

  // Chaos — pure black card
  chaosCard: {
    backgroundColor: '#000000',
    borderRadius: 20,
    padding: 24,
  },
  chaosTitle: {
    color: Colors.textPrimary,
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: -0.5,
    marginBottom: 20,
  },
  chaosDivider: {
    height: 1,
    backgroundColor: '#222222',
  },
  chaosMeLabel: {
    color: '#888888',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 4,
  },
  chaosQuestion: {
    color: Colors.textPrimary,
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 16,
  },
  chaosWhoopsLabel: {
    color: Colors.secondary,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 6,
  },
  chaosHeadline: {
    color: Colors.textPrimary,
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 4,
  },
  chaosBody: {
    color: '#CCCCCC',
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 20,
  },
  chaosMascot: {
    width: 64,
    height: 64,
    alignSelf: 'center',
  },
  chaosBrand: {
    color: '#555555',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 8,
  },

  // Wisdom — dark navy card
  wisdomCard: {
    backgroundColor: '#1A1A2E',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
  },
  wisdomLabel: {
    color: Colors.lavender,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 24,
  },
  wisdomDivider: {
    width: 40,
    height: 1,
    backgroundColor: Colors.lavender,
    alignSelf: 'center',
    marginBottom: 24,
  },
  wisdomDividerBottom: {
    marginBottom: 12,
  },
  wisdomHeadline: {
    color: Colors.textPrimary,
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: -0.5,
    fontStyle: 'italic',
    lineHeight: 32,
    marginBottom: 12,
  },
  wisdomBody: {
    color: Colors.lavender,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  wisdomSignoff: {
    color: Colors.lavender,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  wisdomUrl: {
    color: Colors.textMuted,
    fontSize: 10,
    textAlign: 'center',
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
