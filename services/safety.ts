import type { SafetyClassification, WhoopsResponse } from '../types'

// Layer 1 — input classification (spec Section 7: Safety Architecture)
const BLOCKED_TOPICS = [
  'suicide', 'self-harm', 'self harm', 'kill myself', 'end my life',
  'medication', 'stop taking', 'overdose', 'drugs',
  'violence', 'hurt someone', 'weapon', 'bomb', 'gun',
  'illegal', 'crime', 'steal', 'fraud',
  'legal advice', 'sue', 'lawsuit',
]

// Semantic patterns — not just keywords
const BLOCKED_PATTERNS: RegExp[] = [
  /want to die/i,
  /don't want to (be )?alive/i,
  /should i (stop|quit) (taking|my) (meds|medication|pills)/i,
  /how (do i|to) (hurt|harm|kill)/i,
]

export function classifyInput(text: string): SafetyClassification {
  for (const pattern of BLOCKED_PATTERNS) {
    if (pattern.test(text)) {
      return { safe: false, reason: pattern.source }
    }
  }

  const lowerText = text.toLowerCase()
  for (const topic of BLOCKED_TOPICS) {
    if (lowerText.includes(topic)) {
      return { safe: false, reason: topic }
    }
  }

  return { safe: true }
}

// Layer 2 — output validation, run after the AI response comes back
export function validateOutput(response: string): SafetyClassification {
  // TODO: implement output validation per spec Section 7
  return { safe: true }
}

// In-character refusal shown whenever classifyInput() flags the input as
// unsafe (spec Section 8: example unsafe response).
export function buildSafetyRefusal(reason?: string): WhoopsResponse {
  return {
    safe: false,
    response:
      "WHOAH. 😳\n\nEven I know when to stop being an idiot.\n\nThat's not something I'm going to mess around with.\n\nFor something this serious, talk to a qualified professional.",
    tone: 'deadpan',
    category: 'safety',
    challenge: {
      enabled: false,
      instruction: '',
      estimatedSeconds: 0,
      emoji: '',
    },
    emoji: '😳',
    shareable: false,
    refusalReason: reason ?? 'unsafe',
  }
}
