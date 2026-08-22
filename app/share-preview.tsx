import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useRef, useState } from 'react'
import {
  Alert,
  ImageBackground,
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
                <ImageBackground
                  source={require('../assets/classic.jpg')}
                  resizeMode="cover"
                  style={styles.classicCard}
                >
                  <View style={styles.classicOverlay}>
                    <Text style={styles.classicMeLabel}>Me:</Text>
                    <Text style={styles.classicQuestion}>"{currentProblem}"</Text>

                    <View style={styles.classicDivider} />

                    <Text style={styles.classicWhoopsLabel}>Whoops:</Text>
                    <Text style={styles.classicHeadline}>{headline}</Text>
                    <Text style={styles.classicBody}>{body}</Text>
                  </View>
                </ImageBackground>
              )}

              {selectedStyle === 'Chaos' && (
                <ImageBackground
                  source={require('../assets/chaos.jpg')}
                  resizeMode="cover"
                  style={styles.chaosCard}
                >
                  <View style={styles.chaosOverlay}>
                    <Text style={styles.chaosMeLabel}>Me:</Text>
                    <Text style={styles.chaosQuestion}>"{currentProblem}"</Text>

                    <Text style={styles.chaosWhoopsLabel}>Whoops:</Text>
                    <Text style={styles.chaosHeadline}>{headline}</Text>
                    <Text style={styles.chaosBody}>{body}</Text>
                  </View>
                </ImageBackground>
              )}

              {selectedStyle === 'Wisdom' && (
                <ImageBackground
                  source={require('../assets/wisdom.jpg')}
                  resizeMode="cover"
                  style={styles.wisdomCard}
                >
                  <View style={styles.wisdomOverlay}>
                    <Text style={styles.wisdomLabel}>WHOOPS WISDOM</Text>
                    <View style={styles.wisdomDivider} />

                    <Text style={styles.wisdomMeLabel}>Me:</Text>
                    <Text style={styles.wisdomQuestion}>"{currentProblem}"</Text>

                    <View style={styles.wisdomDivider} />

                    <Text style={styles.wisdomWhoopsLabel}>Whoops:</Text>
                    <Text style={styles.wisdomHeadline}>{headline}</Text>
                    <Text style={styles.wisdomBody}>{body}</Text>
                  </View>
                </ImageBackground>
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
  },

  // Classic
  classicCard: {
    width: '100%',
    aspectRatio: 3 / 4,
    borderRadius: 20,
    overflow: 'hidden',
  },
  classicOverlay: {
    paddingHorizontal: 32,
    paddingVertical: 20,
    marginTop: 80,
    marginBottom: 80,
  },
  classicMeLabel: {
    color: '#5A4A3A',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  classicQuestion: {
    color: '#2D1B0E',
    fontSize: 15,
    fontStyle: 'italic',
    fontWeight: '600',
    marginBottom: 16,
  },
  classicDivider: {
    height: 1,
    backgroundColor: '#C0B090',
    marginBottom: 16,
  },
  classicWhoopsLabel: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 6,
  },
  classicHeadline: {
    color: '#1A0A0E',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 6,
  },
  classicBody: {
    color: '#4A3728',
    fontSize: 13,
    lineHeight: 19,
  },

  // Chaos
  chaosCard: {
    width: '100%',
    aspectRatio: 3 / 4,
    borderRadius: 20,
    overflow: 'hidden',
  },
  chaosOverlay: {
    paddingHorizontal: 28,
    marginTop: 120,
    marginBottom: 120,
  },
  chaosMeLabel: {
    color: '#5A3A00',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 4,
  },
  chaosQuestion: {
    color: '#2D1A00',
    fontSize: 15,
    fontWeight: '700',
    fontStyle: 'italic',
    marginBottom: 16,
  },
  chaosWhoopsLabel: {
    color: '#CC3300',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 6,
  },
  chaosHeadline: {
    color: '#1A0A00',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  chaosBody: {
    color: '#3D2A00',
    fontSize: 13,
    lineHeight: 19,
  },

  // Wisdom
  wisdomCard: {
    width: '100%',
    aspectRatio: 3 / 4,
    borderRadius: 20,
    overflow: 'hidden',
  },
  wisdomOverlay: {
    paddingHorizontal: 32,
    marginTop: 100,
    marginBottom: 100,
    alignItems: 'center',
  },
  wisdomLabel: {
    color: Colors.lavender,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 20,
  },
  wisdomDivider: {
    width: 40,
    height: 1,
    backgroundColor: Colors.lavender,
    alignSelf: 'center',
    marginBottom: 20,
  },
  wisdomMeLabel: {
    color: Colors.lavender,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1,
    textAlign: 'center',
    marginBottom: 4,
  },
  wisdomQuestion: {
    color: Colors.lavenderLight,
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 20,
  },
  wisdomWhoopsLabel: {
    color: Colors.secondary,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    textAlign: 'center',
    marginBottom: 8,
  },
  wisdomHeadline: {
    color: Colors.textPrimary,
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: -0.5,
    lineHeight: 28,
    marginBottom: 8,
    flexShrink: 1,
  },
  wisdomBody: {
    color: Colors.lavender,
    fontSize: 13,
    lineHeight: 19,
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
