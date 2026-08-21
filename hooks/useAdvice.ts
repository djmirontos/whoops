import { useSessionStore } from '../stores/sessionStore'

// Main advice generation hook — thin wrapper around sessionStore.
export function useAdvice() {
  const currentProblem = useSessionStore((state) => state.currentProblem)
  const currentResponse = useSessionStore((state) => state.currentResponse)
  const isLoading = useSessionStore((state) => state.isLoading)
  const error = useSessionStore((state) => state.error)
  const setCurrentProblem = useSessionStore((state) => state.setCurrentProblem)
  const generateAdvice = useSessionStore((state) => state.generateAdvice)

  return {
    currentProblem,
    currentResponse,
    isLoading,
    error,
    setCurrentProblem,
    generateAdvice,
  }
}
