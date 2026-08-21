import { router } from 'expo-router'
import { FlatList, Text, View } from 'react-native'
import { SafeArea } from '../../components/layout/SafeArea'
import { Button } from '../../components/ui/Button'
import { useHistory } from '../../hooks/useHistory'

export default function HistoryScreen() {
  const { history } = useHistory()

  if (history.length === 0) {
    return (
      <SafeArea>
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-center text-text-secondary">
            Nothing yet.{'\n\n'}Congratulations, you apparently have your life together. 🏆
          </Text>
          <Button
            label="GIVE ME BAD ADVICE"
            onPress={() => router.push('/')}
            className="mt-6"
          />
        </View>
      </SafeArea>
    )
  }

  return (
    <SafeArea>
      <View className="flex-1 px-6 pt-4">
        <Text className="text-2xl font-bold text-text-primary">Your Whoops</Text>
        <FlatList
          className="mt-4"
          data={history}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="mb-3 rounded-2xl bg-surface p-4">
              <Text className="text-text-primary" numberOfLines={1}>
                {item.userProblem.slice(0, 40)}
              </Text>
              <Text className="mt-1 text-xs text-text-muted">{item.createdAt}</Text>
            </View>
          )}
        />
      </View>
    </SafeArea>
  )
}
