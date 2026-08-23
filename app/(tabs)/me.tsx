import { Ionicons } from '@expo/vector-icons'
import { useFocusEffect } from 'expo-router'
import { useCallback, useState } from 'react'
import {
  Alert,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '../../constants/colors'
import {
  clearHistoryAndStats,
  clearTodayUsage,
  getHapticsEnabled,
  getHistory,
  getShareStyle,
  getTotalDone,
  getTotalWhoops,
  setHapticsEnabled,
  setShareStyle,
} from '../../services/storage'
import type { HistoryItem, ShareCardStyle } from '../../types'
import { clearDeviceId } from '../../utils/deviceId'

const CATEGORY_EMOJI: Record<string, string> = {
  procrastination: '😴',
  chores: '🧹',
  motivation: '💪',
  productivity: '📚',
  boredom: '😐',
  decisions: '🤷',
}

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

function getFavoriteCategory(history: HistoryItem[]): string {
  if (history.length === 0) return 'procrastination'

  const counts: Record<string, number> = {}
  for (const item of history) {
    const category = item.response.category
    counts[category] = (counts[category] ?? 0) + 1
  }

  let favorite = 'procrastination'
  let maxCount = 0
  for (const [category, count] of Object.entries(counts)) {
    if (count > maxCount) {
      favorite = category
      maxCount = count
    }
  }

  return favorite
}

export default function MeScreen() {
  const [totalWhoops, setTotalWhoops] = useState(0)
  const [totalDone, setTotalDone] = useState(0)
  const [favoriteCategory, setFavoriteCategory] = useState('procrastination')
  const [hapticsEnabled, setHapticsEnabledState] = useState(true)
  const [shareStyle, setShareStyleState] = useState<ShareCardStyle>('Classic')

  const loadData = useCallback(async () => {
    try {
      const [whoops, done, history, haptics, style] = await Promise.all([
        getTotalWhoops(),
        getTotalDone(),
        getHistory(),
        getHapticsEnabled(),
        getShareStyle(),
      ])
      setTotalWhoops(whoops)
      setTotalDone(done)
      setFavoriteCategory(getFavoriteCategory(history))
      setHapticsEnabledState(haptics)
      setShareStyleState(style)
    } catch (err) {
      console.error('[Me] Failed to load stats:', err)
    }
  }, [])

  useFocusEffect(
    useCallback(() => {
      loadData()
    }, [loadData])
  )

  const excusesDestroyed = Math.max(0, totalWhoops - totalDone)

  async function handleToggleHaptics(value: boolean) {
    setHapticsEnabledState(value)
    try {
      await setHapticsEnabled(value)
    } catch (err) {
      console.error('[Me] Failed to save haptics setting:', err)
    }
  }

  function handleChooseShareStyle() {
    Alert.alert('Default Share Style', undefined, [
      { text: 'Classic', onPress: () => saveShareStyle('Classic') },
      { text: 'Chaos', onPress: () => saveShareStyle('Chaos') },
      { text: 'Wisdom', onPress: () => saveShareStyle('Wisdom') },
      { text: 'Cancel', style: 'cancel' },
    ])
  }

  async function saveShareStyle(style: ShareCardStyle) {
    setShareStyleState(style)
    try {
      await setShareStyle(style)
    } catch (err) {
      console.error('[Me] Failed to save share style:', err)
    }
  }

  async function handlePrivacyPolicy() {
    try {
      await Linking.openURL('#')
    } catch (err) {
      console.error('[Me] Failed to open privacy policy:', err)
    }
  }

  function handleAboutWhoops() {
    Alert.alert('About Whoops', 'Whoops v1.0.0\nTerrible advice. Zero regrets.\n\n😈')
  }

  async function handleClearRateLimit() {
    await clearTodayUsage()
    Alert.alert('Done', 'Cleared!')
  }

  async function handleClearHistory() {
    await clearHistoryAndStats()
    await loadData()
    Alert.alert('Done', 'Cleared!')
  }

  async function handleClearDeviceId() {
    await clearDeviceId()
    Alert.alert('Done', 'Cleared!')
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={require('../../assets/mascott.png')}
          style={styles.mascot}
          resizeMode="contain"
        />
        <Text style={styles.headerTitle}>Your Whoops 😈</Text>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{totalWhoops}</Text>
            <Text style={styles.statLabel}>Whoops{'\n'}Received</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{totalDone}</Text>
            <Text style={styles.statLabel}>Things{'\n'}Done</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{excusesDestroyed}</Text>
            <Text style={styles.statLabel}>Excuses{'\n'}💀</Text>
          </View>
        </View>

        <View style={styles.favoriteCard}>
          <View>
            <Text style={styles.favoriteLabel}>Your favorite category</Text>
            <Text style={styles.favoriteValue}>{capitalize(favoriteCategory)} 😈</Text>
          </View>
          <Text style={styles.favoriteEmoji}>
            {CATEGORY_EMOJI[favoriteCategory] ?? '😴'}
          </Text>
        </View>

        <Text style={styles.sectionLabel}>Settings</Text>
        <View style={styles.settingsContainer}>
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Ionicons
                name="musical-notes-outline"
                size={20}
                color={Colors.lavender}
                style={styles.settingIcon}
              />
              <Text style={styles.settingLabel}>Sound & Haptics</Text>
            </View>
            <Switch
              value={hapticsEnabled}
              onValueChange={handleToggleHaptics}
              thumbColor={Colors.textPrimary}
              trackColor={{ false: Colors.border, true: Colors.primary }}
            />
          </View>

          <TouchableOpacity style={styles.settingRow} onPress={handleChooseShareStyle}>
            <View style={styles.settingLeft}>
              <Ionicons
                name="share-social-outline"
                size={20}
                color={Colors.lavender}
                style={styles.settingIcon}
              />
              <Text style={styles.settingLabel}>Default Share Style</Text>
            </View>
            <View style={styles.settingRight}>
              <Text style={styles.settingValue}>{shareStyle}</Text>
              <Ionicons name="chevron-forward" size={16} color={Colors.lavender} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingRow} onPress={handlePrivacyPolicy}>
            <View style={styles.settingLeft}>
              <Ionicons
                name="shield-outline"
                size={20}
                color={Colors.lavender}
                style={styles.settingIcon}
              />
              <Text style={styles.settingLabel}>Privacy Policy</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={Colors.lavender} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.settingRow, styles.settingRowLast]}
            onPress={handleAboutWhoops}
          >
            <View style={styles.settingLeft}>
              <Ionicons
                name="information-circle-outline"
                size={20}
                color={Colors.lavender}
                style={styles.settingIcon}
              />
              <Text style={styles.settingLabel}>About Whoops</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={Colors.lavender} />
          </TouchableOpacity>
        </View>

        {__DEV__ && (
          <>
            <Text style={styles.sectionLabel}>Dev Tools</Text>
            <View style={styles.settingsContainer}>
              <TouchableOpacity style={styles.settingRow} onPress={handleClearRateLimit}>
                <Text style={styles.settingLabel}>Clear Rate Limit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.settingRow} onPress={handleClearHistory}>
                <Text style={styles.settingLabel}>Clear History</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.settingRow, styles.settingRowLast]}
                onPress={handleClearDeviceId}
              >
                <Text style={styles.settingLabel}>Clear Device ID</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        <Text style={styles.footer}>😈 Whoops v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  mascot: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 32,
  },
  headerTitle: {
    color: Colors.textPrimary,
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 12,
  },
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginTop: 24,
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  statNumber: {
    color: Colors.textPrimary,
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -1,
  },
  statLabel: {
    color: Colors.lavender,
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 4,
  },
  favoriteCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    marginHorizontal: 24,
    marginTop: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  favoriteLabel: {
    color: Colors.lavender,
    fontSize: 13,
  },
  favoriteValue: {
    color: Colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
    marginTop: 4,
  },
  favoriteEmoji: {
    fontSize: 32,
  },
  sectionLabel: {
    color: Colors.lavender,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginHorizontal: 24,
    marginTop: 28,
    marginBottom: 8,
  },
  settingsContainer: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    marginHorizontal: 24,
    overflow: 'hidden',
  },
  settingRow: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  settingRowLast: {
    borderBottomWidth: 0,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: 12,
  },
  settingLabel: {
    color: Colors.textPrimary,
    fontSize: 15,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  settingValue: {
    color: Colors.lavender,
    fontSize: 13,
  },
  footer: {
    color: Colors.textMuted,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 32,
    marginBottom: 32,
  },
})
