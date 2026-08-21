import { create } from 'zustand'
import type { WhoopsResponse } from '../types'

// Zustand session state (spec Section 12: State Management)
interface SessionState {
  // Current session
  currentProblem: string
  currentResponse: WhoopsResponse | null
  isLoading: boolean
  error: string | null

  // Stats (loaded from AsyncStorage)
  totalWhoops: number
  totalDone: number

  // Actions
  setCurrentProblem: (text: string) => void
  generateAdvice: () => Promise<void>
  completeChallenge: () => void
  resetSession: () => void
}

export const useSessionStore = create<SessionState>((set) => ({
  currentProblem: '',
  currentResponse: null,
  isLoading: false,
  error: null,

  totalWhoops: 0,
  totalDone: 0,

  setCurrentProblem: (text) => set({ currentProblem: text }),

  generateAdvice: async () => {
    // TODO: wire up services/safety.ts + services/deepseek.ts per spec Section 6/7
    throw new Error('generateAdvice not implemented')
  },

  completeChallenge: () => {
    set((state) => ({ totalDone: state.totalDone + 1 }))
  },

  resetSession: () => {
    set({ currentProblem: '', currentResponse: null, isLoading: false, error: null })
  },
}))
