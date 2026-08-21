import { router } from 'expo-router'
import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { SafeArea } from '../../components/layout/SafeArea'
import { CATEGORIES } from '../../constants/categories'

const EXAMPLE_CHIPS = CATEGORIES.flatMap((category) => category.examples).slice(0, 4)

export default function HomeScreen() {
  const [problem, setProblem] = useState('')

  const canSubmit = problem.trim().length >= 3

  function handleSubmit() {
    if (!canSubmit) return
    // TODO: wire up useAdvice()/sessionStore.generateAdvice() before navigating
    router.push('/advice')
  }

  return (
    <SafeArea>
      <View className="flex-1 px-6 pt-4">
        <Text className="text-lg text-primary">🙃 Whoops</Text>

        <Text className="mt-6 text-2xl font-bold text-text-primary">What's your problem?</Text>

        <Input
          className="mt-4"
          placeholder="I don't want to clean my room..."
          value={problem}
          onChangeText={(text) => setProblem(text.slice(0, 500))}
        />
        <Text className="mt-1 self-end text-xs text-text-muted">{problem.length}/500</Text>

        <Button
          label="🙃 GIVE ME BAD ADVICE"
          onPress={handleSubmit}
          disabled={!canSubmit}
          className={`mt-4 ${canSubmit ? '' : 'opacity-50'}`}
        />

        <Text className="mt-8 text-text-secondary">Try:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-2">
          {EXAMPLE_CHIPS.map((example) => (
            <View key={example} className="mr-2 rounded-full bg-surface-raised px-4 py-2">
              <Text
                className="text-text-secondary"
                onPress={() => setProblem(example)}
              >
                {example}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeArea>
  )
}
