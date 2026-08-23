import { useFocusEffect } from 'expo-router'
import { useCallback, useState } from 'react'
import { getHistory } from '../services/storage'
import type { HistoryItem } from '../types'

// History management hook — reloads the local history list every time the
// screen using it regains focus, so newly-created items appear immediately.
export function useHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const refresh = useCallback(async () => {
    setIsLoading(true)
    const items = await getHistory()
    setHistory(items)
    setIsLoading(false)
  }, [])

  useFocusEffect(
    useCallback(() => {
      refresh()
    }, [refresh])
  )

  return { history, isLoading, refresh }
}
