import { create } from 'zustand'
import { generateAdviceFallback } from '../services/anthropic'
import { generateAdvice as generateDeepSeekAdvice } from '../services/deepseek'
import { buildSafetyRefusal, classifyInput } from '../services/safety'
import { getTodayDateKey, getTodayUsageCount, incrementTodayUsage } from '../services/storage'
import { markChallengeCompleted, registerDevice, saveInteraction } from '../services/supabase'
import type { WhoopsResponse } from '../types'
import { getDeviceId } from '../utils/deviceId'

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
  resetSession: () => void
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
    set({ isLoading: true, error: null, rateLimited: false })

    const usageCount = await getTodayUsageCount()
    // TODO(debug): remove these once the rate-limit issue is confirmed fixed on-device
    console.log('Rate limit check - count:', usageCount, typeof usageCount)
    console.log('Date key:', getTodayDateKey())
    if (usageCount >= DAILY_LIMIT) {
      set({ isLoading: false, rateLimited: true })
      return
    }

    console.log('[Session] Generating advice for:', get().currentProblem)
    console.log('[Session] Rate limit count:', usageCount)

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
