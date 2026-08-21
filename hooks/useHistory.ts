import { useCallback, useEffect, useState } from 'react'
import { getHistory } from '../services/storage'
import type { HistoryItem } from '../types'

// History management hook — loads/refreshes the local history list.
export function useHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const refresh = useCallback(async () => {
    setIsLoading(true)
    const items = await getHistory()
    setHistory(items)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  return { history, isLoading, refresh }
}
