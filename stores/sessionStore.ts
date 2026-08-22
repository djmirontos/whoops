import { create } from 'zustand'
import { generateAdviceFallback } from '../services/anthropic'
import { generateAdvice as generateDeepSeekAdvice } from '../services/deepseek'
import { buildSafetyRefusal, classifyInput } from '../services/safety'
import { getTodayUsageCount, incrementTodayUsage } from '../services/storage'
import type { WhoopsResponse } from '../types'

const DAILY_LIMIT = 5

// Zustand session state (spec Section 12: State Management)
interface SessionState {
  // Current session
  currentProblem: string
  currentResponse: WhoopsResponse | null
  isLoading: boolean
  error: string | null
  rateLimited: boolean

  // Stats (loaded from AsyncStorage)
  totalWhoops: number
  totalDone: number

  // Actions
  setCurrentProblem: (text: string) => void
  generateAdvice: () => Promise<void>
  completeChallenge: () => void
  resetSession: () => void
}

export const useSessionStore = create<SessionState>((set, get) => ({
  currentProblem: '',
  currentResponse: null,
  isLoading: false,
  error: null,
  rateLimited: false,

  totalWhoops: 0,
  totalDone: 0,

  setCurrentProblem: (text) => set({ currentProblem: text }),

  generateAdvice: async () => {
    set({ isLoading: true, error: null, rateLimited: false })

    const usageCount = await getTodayUsageCount()
    if (usageCount >= DAILY_LIMIT) {
      set({ isLoading: false, rateLimited: true })
      return
    }

    const problem = get().currentProblem

    const classification = classifyInput(problem)
    if (!classification.safe) {
      set({ currentResponse: buildSafetyRefusal(classification.reason), isLoading: false })
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
    } catch (err) {
      set({ isLoading: false, error: 'Something went wrong. Try again. 😈' })
      throw err
    }
  },

  completeChallenge: () => {
    set((state) => ({ totalDone: state.totalDone + 1 }))
  },

  resetSession: () => {
    set({
      currentProblem: '',
      currentResponse: null,
      isLoading: false,
      error: null,
      rateLimited: false,
    })
  },
}))
