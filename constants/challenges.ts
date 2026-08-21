import type { ChallengeSeed } from '../types'

// Curated challenge library stub — the full library is seeded server-side
// in the Supabase `challenges` table (spec Section 10). This local subset
// is a fallback used until that table is wired up.
export const CHALLENGES: ChallengeSeed[] = [
  { category: 'procrastination', instruction: "Write the first sentence of what you're avoiding", estimatedSeconds: 60, emoji: '✍️' },
  { category: 'chores', instruction: 'Pick up 3 things off the floor', estimatedSeconds: 30, emoji: '🧦' },
  { category: 'motivation', instruction: 'Do 3 squats. Right now.', estimatedSeconds: 20, emoji: '🦵' },
  { category: 'productivity', instruction: 'Open the textbook or document', estimatedSeconds: 15, emoji: '📖' },
  { category: 'boredom', instruction: 'Put your phone down for 2 minutes', estimatedSeconds: 120, emoji: '📵' },
  { category: 'decisions', instruction: 'Just pick one. Any one.', estimatedSeconds: 10, emoji: '🎲' },
]

export function getChallengeForCategory(category: string): ChallengeSeed | undefined {
  return CHALLENGES.find((challenge) => challenge.category === category)
}
