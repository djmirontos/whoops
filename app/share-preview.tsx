import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import * as MediaLibrary from 'expo-media-library'
import * as Sharing from 'expo-sharing'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { captureRef } from 'react-native-view-shot'
import { Colors } from '../constants/colors'
import { getShareStyle } from '../services/storage'
import { markShared } from '../services/supabase'
import { useSessionStore } from '../stores/sessionStore'
import type { ShareCardStyle } from '../types'
import { splitAdvice } from '../utils/splitAdvice'

const STYLE_LABELS: ShareCardStyle[] = ['Classic', 'Chaos', 'Wisdom']

export default function SharePreviewScreen() {
  const currentProblem = useSessionStore((state) => state.currentProblem)
  const currentResponse = useSessionStore((state) => state.currentResponse)
  const currentInteractionId = useSessionStore((state) => state.currentInteractionId)
  const [selectedStyle, setSelectedStyle] = useState<ShareCardStyle>('Classic')
  const [isCapturing, setIsCapturing] = useState(false)
  const [cardReady, setCardReady] = useState(false)
  const cardReadyRef = useRef(false)
  const cardRef = useRef<View>(null)

  const onCardLayout = useCallback(() => {
    cardReadyRef.current = true
    setCardReady(true)
  }, [])

  // Default to the user's saved preference (Me screen → Default Share Style).
  useEffect(() => {
    getShareStyle().then(setSelectedStyle)
  }, [])

  async function captureCard(): Promise<string> {
    // Wait for card to be ready with layout
    if (!cardReadyRef.current || !cardRef.current) {
      // Wait up to 2 seconds for card to be ready
      let attempts = 0
      while ((!cardReadyRef.current || !cardRef.current) && attempts < 20) {
        await new Promise((resolve) => setTimeout(resolve, 100))
        attempts++
      }
    }

    if (!cardRef.current) {
      throw new Error('Card ref not ready after waiting')
    }

    // Extra delay for Android rendering
    await new Promise((resolve) => setTimeout(resolve, 200))

    try {
      const uri = await captureRef(cardRef, {
        format: 'jpg',
        quality: 0.95,
        result: 'tmpfile',
      })
      console.log('[Share] Captured URI:', uri)
      return uri
    } catch (err) {
      console.error('[Share] captureRef failed:', err)
      throw err
    }
  }

  async function handleShare() {
    try {
      setIsCapturing(true)
      const uri = await captureCard()

      if (currentInteractionId) {
        await markShared(currentInteractionId, selectedStyle.toLowerCase())
      }

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, {
          mimeType: 'image/jpeg',
          dialogTitle: 'Share your Whoops 😈',
          UTI: 'public.jpeg',
        })
      } else {
        Alert.alert('Sharing not available', 'Cannot share on this device')
      }
    } catch (error) {
      console.error('[Share] Error:', error)
      Alert.alert('Oops 😈', 'Could not capture the card. Try again.')
    } finally {
      setIsCapturing(false)
    }
  }

  async function handleSave() {
    try {
      setIsCapturing(true)

      const { status } = await MediaLibrary.requestPermissionsAsync()
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Allow gallery access to save images.')
        return
      }

      const uri = await captureCard()
      await MediaLibrary.saveToLibraryAsync(uri)

      Alert.alert('Saved! 📸', 'Share card saved to your gallery.')
    } catch (error) {
      console.error('[Save] Error:', error)
      Alert.alert('Oops 😈', 'Could not save the image. Try again.')
    } finally {
      setIsCapturing(false)
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

            <View style={styles.cardWrap}>
              <View ref={cardRef} collapsable={false} onLayout={onCardLayout}>
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

              {isCapturing ? (
                <View style={styles.capturingOverlay}>
                  <ActivityIndicator color={Colors.textPrimary} size="large" />
                </View>
              ) : null}
            </View>
          </ScrollView>

          <View style={styles.bottomButtons}>
            <TouchableOpacity
              style={[styles.shareButton, isCapturing && styles.buttonDisabled]}
              onPress={handleShare}
              disabled={isCapturing}
            >
              {isCapturing ? (
                <ActivityIndicator color={Colors.textPrimary} size="small" />
              ) : (
                <Ionicons name="share-social" size={20} color={Colors.textPrimary} />
              )}
              <Text style={styles.shareButtonText}>SHARE IMAGE</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.saveButton, isCapturing && styles.buttonDisabled]}
              onPress={handleSave}
              disabled={isCapturing}
            >
              {isCapturing ? (
                <ActivityIndicator color={Colors.secondary} size="small" />
              ) : (
                <Ionicons name="download-outline" size={20} color={Colors.secondary} />
              )}
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
    position: 'relative',
  },
  capturingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
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
  buttonDisabled: {
    opacity: 0.6,
  },
})
