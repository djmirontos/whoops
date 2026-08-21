import type { SafetyClassification } from '../types'

// Layer 1 — input classification (spec Section 7: Safety Architecture)
const BLOCKED_TOPICS = [
  'suicide', 'self-harm', 'self harm', 'kill myself', 'end my life',
  'medication', 'stop taking', 'overdose', 'drugs',
  'violence', 'hurt someone', 'weapon', 'bomb', 'gun',
  'illegal', 'crime', 'steal', 'fraud',
  'financial advice', 'invest my money', 'stock',
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
  // TODO: implement full keyword + pattern classification per spec Section 7
  return { safe: true }
}

// Layer 2 — output validation, run after the AI response comes back
export function validateOutput(response: string): SafetyClassification {
  // TODO: implement output validation per spec Section 7
  return { safe: true }
}
