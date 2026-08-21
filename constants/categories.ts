import type { Category } from '../types'

// 6 MVP categories + example prompts (spec Section 6: AI Prompt Architecture)

export const CATEGORIES: Category[] = [
  {
    id: 'procrastination',
    label: 'Procrastination',
    emoji: '😴',
    examples: [
      "I keep procrastinating.",
      "I can't start my work.",
      "I've been putting this off for weeks.",
    ],
  },
  {
    id: 'chores',
    label: 'Chores',
    emoji: '🧹',
    examples: [
      "I don't want to clean my room.",
      "My dishes are piling up.",
      "I need to do laundry.",
    ],
  },
  {
    id: 'motivation',
    label: 'Motivation',
    emoji: '💪',
    examples: [
      "I don't want to exercise.",
      "Should I go to the gym?",
      "I haven't moved all day.",
    ],
  },
  {
    id: 'productivity',
    label: 'Productivity',
    emoji: '📚',
    examples: [
      "I keep avoiding studying.",
      "I need to start my project.",
      "I can't focus.",
    ],
  },
  {
    id: 'boredom',
    label: 'Boredom',
    emoji: '🥱',
    examples: [
      "I'm bored.",
      "I don't know what to do.",
      "I've been scrolling for hours.",
    ],
  },
  {
    id: 'decisions',
    label: 'Decisions',
    emoji: '🤷',
    examples: [
      "Should I go outside?",
      "I'm hungry but I don't want to cook.",
      "Should I take a nap?",
    ],
  },
]
