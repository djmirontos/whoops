import { Text, View } from 'react-native'
import { SafeArea } from '../../components/layout/SafeArea'
import { Card } from '../../components/ui/Card'

export default function MeScreen() {
  // TODO: pull real stats from services/storage.ts (whoops_total_whoops / whoops_total_done)
  const stats = { whoopsReceived: 0, done: 0, excusesDestroyed: 0 }

  return (
    <SafeArea>
      <View className="flex-1 px-6 pt-4">
        <Text className="text-2xl font-bold text-text-primary">🙃 Your Whoops</Text>

        <View className="mt-6 flex-row justify-between">
          <Card className="flex-1 items-center">
            <Text className="text-2xl font-extrabold text-text-primary">{stats.whoopsReceived}</Text>
            <Text className="text-xs text-text-secondary">Whoops recv'd</Text>
          </Card>
          <View className="w-3" />
          <Card className="flex-1 items-center">
            <Text className="text-2xl font-extrabold text-text-primary">{stats.done}</Text>
            <Text className="text-xs text-text-secondary">Done</Text>
          </Card>
          <View className="w-3" />
          <Card className="flex-1 items-center">
            <Text className="text-2xl font-extrabold text-text-primary">{stats.excusesDestroyed}</Text>
            <Text className="text-xs text-text-secondary">Excuses 💀</Text>
          </Card>
        </View>

        <Text className="mt-8 text-text-secondary">Settings</Text>
        <View className="mt-2">
          {['Notifications', 'Share card style', 'Sound & Haptics', 'Theme', 'Privacy', 'About Whoops'].map(
            (label) => (
              <View key={label} className="border-b border-border py-3">
                <Text className="text-text-primary">{label}</Text>
              </View>
            )
          )}
        </View>
      </View>
    </SafeArea>
  )
}
