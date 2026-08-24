import { create } from 'zustand'
import { generateAdviceFallback } from '../services/anthropic'
import { generateAdvice as generateDeepSeekAdvice } from '../services/deepseek'
import { buildSafetyRefusal, classifyInput, validateOutput } from '../services/safety'
import {
  getHistory,
  getTodayDateKey,
  getTodayUsageCount,
  incrementTodayUsage,
  incrementTotalWhoops,
  saveHistory,
} from '../services/storage'
import { markChallengeCompleted, registerDevice, saveInteraction } from '../services/supabase'
import type { HistoryItem, WhoopsResponse } from '../types'
import { getDeviceId } from '../utils/deviceId'
import { generateUUID } from '../utils/uuid'

const DAILY_LIMIT = 5

// Zustand session state (spec Section 12: State Management)
interface SessionState {
  // Current session
  currentProblem: string
  currentResponse: WhoopsResponse | null
  currentInteractionId: string | null
  isLoading: boolean
  error: string | null
  rateLimited: boolean

  // Device (anonymous, persisted locally + mirrored to Supabase)
  deviceId: string | null

  // Stats (loaded from AsyncStorage)
  totalWhoops: number
  totalDone: number

  // Actions
  setCurrentProblem: (text: string) => void
  initializeDevice: () => Promise<void>
  generateAdvice: () => Promise<void>
  completeChallenge: () => void
  loadFromHistory: (item: HistoryItem) => void
  resetSession: () => void
}

// Best-effort local history write — never throws, so a storage hiccup
// can't break the advice flow (spec Section 5, Screen 6).
async function appendToHistory(userProblem: string, response: WhoopsResponse, id: string) {
  try {
    const history = await getHistory()
    const newItem: HistoryItem = {
      id,
      userProblem,
      response,
      completedChallenge: false,
      sharedCount: 0,
      createdAt: new Date().toISOString(),
    }
    await saveHistory([newItem, ...history].slice(0, 50))
    await incrementTotalWhoops()
  } catch (err) {
    console.error('[Session] Failed to save history:', err)
  }
}

// Marks the newest history entry as challenge-completed.
async function markLatestHistoryItemCompleted() {
  try {
    const history = await getHistory()
    if (history.length === 0) return

    const [latest, ...rest] = history
    await saveHistory([{ ...latest, completedChallenge: true }, ...rest])
  } catch (err) {
    console.error('[Session] Failed to update history completedChallenge:', err)
  }
}

export const useSessionStore = create<SessionState>((set, get) => ({
  currentProblem: '',
  currentResponse: null,
  currentInteractionId: null,
  isLoading: false,
  error: null,
  rateLimited: false,

  deviceId: null,

  totalWhoops: 0,
  totalDone: 0,

  setCurrentProblem: (text) => set({ currentProblem: text }),

  // Called once on app launch (see app/_layout.tsx). Never throws — device
  // registration is best-effort and must not block the app from starting.
  initializeDevice: async () => {
    try {
      const deviceId = await getDeviceId()
      set({ deviceId })
      await registerDevice(deviceId)
    } catch (err) {
      console.error('[Session] initializeDevice failed:', err)
    }
  },

  generateAdvice: async () => {
    if (get().isLoading) {
      console.log('[Session] Already loading, ignoring tap')
      return
    }

    set({ isLoading: true, error: null, rateLimited: false })

    const usageCount = await getTodayUsageCount()
    if (__DEV__) {
      console.log('Rate limit check - count:', usageCount, typeof usageCount)
      console.log('Date key:', getTodayDateKey())
    }
    if (usageCount >= DAILY_LIMIT) {
      set({ isLoading: false, rateLimited: true })
      return
    }

    if (__DEV__) {
      console.log('[Session] Generating advice...')
      console.log('[Session] Rate limit count:', usageCount)
    }

    const problem = get().currentProblem

    const classification = classifyInput(problem)
    if (!classification.safe) {
      set({
        currentResponse: buildSafetyRefusal(classification.reason),
        currentInteractionId: null,
        isLoading: false,
      })
      return
    }

    try {
      let response: WhoopsResponse
      try {
        response = await generateDeepSeekAdvice(problem)
      } catch {
        response = await generateAdviceFallback(problem)
      }

      // Layer 2 safety check — validate the AI's own output before showing
      // it (spec Section 7). Treated the same as a Layer 1 refusal: no
      // usage charge, no history/Supabase save for the blocked content.
      const outputCheck = validateOutput(response)
      console.log('[Safety] Output check:', outputCheck)
      if (!outputCheck.safe) {
        console.warn('[Safety] Output blocked:', outputCheck.reason)
        set({
          currentResponse: buildSafetyRefusal('output_validation'),
          currentInteractionId: null,
          isLoading: false,
        })
        return
      }

      await incrementTodayUsage()
      set({ currentResponse: response, isLoading: false })

      // Mirror to Supabase — best-effort, never blocks the UI or throws.
      const deviceId = get().deviceId ?? (await getDeviceId())
      const interactionId = await saveInteraction({
        deviceId,
        userProblem: problem,
        category: response.category,
        responseJson: response,
        safetyBlocked: false,
      })
      set({ currentInteractionId: interactionId })

      // Local history — device-local, mirrored to Supabase separately above.
      await appendToHistory(problem, response, interactionId ?? generateUUID())
    } catch (err) {
      set({ isLoading: false, error: 'Something went wrong. Try again. 😈' })
      throw err
    }
  },

  completeChallenge: () => {
    set((state) => ({ totalDone: state.totalDone + 1 }))

    const interactionId = get().currentInteractionId
    if (interactionId) {
      markChallengeCompleted(interactionId)
    }

    markLatestHistoryItemCompleted()
  },

  loadFromHistory: (item) => {
    set({
      currentProblem: item.userProblem,
      currentResponse: item.response,
      currentInteractionId: item.id,
    })
  },

  resetSession: () => {
    set({
      currentProblem: '',
      currentResponse: null,
      currentInteractionId: null,
      isLoading: false,
      error: null,
      rateLimited: false,
    })
  },
}))
