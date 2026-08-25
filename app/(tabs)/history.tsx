import { router } from 'expo-router'
import { useState } from 'react'
import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '../../constants/colors'
import { useHistory } from '../../hooks/useHistory'
import { useSessionStore } from '../../stores/sessionStore'
import type { HistoryItem } from '../../types'
import { relativeTime } from '../../utils/relativeTime'

export default function HistoryScreen() {
  const { history, refresh } = useHistory()
  const loadFromHistory = useSessionStore((state) => state.loadFromHistory)
  const [refreshing, setRefreshing] = useState(false)

  async function handleRefresh() {
    setRefreshing(true)
    await refresh()
    setRefreshing(false)
  }

  function handleItemPress(item: HistoryItem) {
    loadFromHistory(item)
    // Already-completed items skip the "FINE. I'LL DO IT" advice flow they've
    // already been through and go straight to the share card.
    router.push(item.completedChallenge ? '/share-preview' : '/advice')
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <Text style={styles.header}>Your Whoops 😈</Text>

      {history.length === 0 ? (
        <View style={styles.emptyState}>
          <Image
            source={require('../../assets/nothing.png')}
            style={styles.emptyDevil}
            resizeMode="contain"
          />
          <Text style={styles.emptyTitle}>Nothing yet. 😐</Text>
          <Text style={styles.emptyBody}>
            Congratulations, you apparently{'\n'}have your life together.
          </Text>
          <TouchableOpacity style={styles.emptyButton} onPress={() => router.push('/')}>
            <Text style={styles.emptyButtonText}>GIVE ME BAD ADVICE 😈</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor={Colors.lavender}
            />
          }
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => handleItemPress(item)}>
              <Text style={styles.cardEmoji}>😈</Text>
              <View style={styles.cardContent}>
                <Text style={styles.cardText} numberOfLines={2}>
                  {item.userProblem.slice(0, 60)}
                </Text>
                <View style={styles.cardMetaRow}>
                  <Text style={styles.cardTime}>{relativeTime(item.createdAt)}</Text>
                  {item.completedChallenge ? (
                    <Text style={styles.cardDone}>✅ Done</Text>
                  ) : null}
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    color: Colors.textPrimary,
    fontSize: 24,
    fontWeight: '800',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  emptyDevil: {
    width: 160,
    height: 160,
    marginBottom: 16,
  },
  emptyTitle: {
    color: Colors.textPrimary,
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
  },
  emptyBody: {
    color: Colors.lavender,
    fontSize: 15,
    textAlign: 'center',
    marginTop: 8,
  },
  emptyButton: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginTop: 24,
  },
  emptyButtonText: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 24,
    marginBottom: 12,
  },
  cardEmoji: {
    fontSize: 24,
  },
  cardContent: {
    flex: 1,
    marginLeft: 12,
  },
  cardText: {
    color: Colors.textPrimary,
    fontSize: 15,
    fontWeight: '600',
  },
  cardMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  cardTime: {
    color: Colors.lavender,
    fontSize: 12,
  },
  cardDone: {
    color: Colors.success,
    fontSize: 12,
    fontWeight: '600',
  },
})
