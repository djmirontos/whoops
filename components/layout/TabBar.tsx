import { Text, View } from 'react-native'

// Placeholder custom tab bar. Not wired into app/(tabs)/_layout.tsx yet —
// the default expo-router Tabs bar is used until this is styled and
// passed via <Tabs tabBar={TabBar} />.
export function TabBar() {
  return (
    <View className="flex-row items-center justify-around border-t border-border bg-surface py-3">
      <Text className="text-text-secondary">Tab Bar Placeholder</Text>
    </View>
  )
}
