// All TypeScript interfaces for Whoops (spec Section 8: JSON Response Schema)

export interface WhoopsChallenge {
  enabled: boolean
  instruction: string // e.g. "Pick up 3 shirts"
  estimatedSeconds: number // e.g. 30
  emoji: string // e.g. "🧦"
}

export interface WhoopsResponse {
  safe: boolean
  response: string // The bad advice text (20-80 words)
  tone: 'sarcastic' | 'absurd' | 'dramatic' | 'deadpan'
  category: string // Detected category
  challenge: WhoopsChallenge
  emoji: string // Primary emoji for the screen header
  shareable: boolean // Should share button be shown?
  refusalReason?: string // Only when safe === false
}

export interface HistoryItem {
  id: string
  userProblem: string
  response: WhoopsResponse
  completedChallenge: boolean
  sharedCount: number
  createdAt: string
}

// Supporting types used across constants/, services/, and components/

export interface Category {
  id: string
  label: string
  emoji: string
  examples: string[]
}

export interface ChallengeSeed {
  category: string
  instruction: string
  estimatedSeconds: number
  emoji: string
}

export type ShareCardStyle = 'Classic' | 'Chaos' | 'Wisdom'

export interface SafetyClassification {
  safe: boolean
  reason?: string
}
