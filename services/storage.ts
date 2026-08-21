import AsyncStorage from '@react-native-async-storage/async-storage'
import type { HistoryItem, ShareCardStyle } from '../types'

// AsyncStorage keys (spec Section 12: Persistent State)
const ONBOARDED_KEY = 'whoops_onboarded'
const HISTORY_KEY = 'whoops_history'
const TOTAL_WHOOPS_KEY = 'whoops_total_whoops'
const TOTAL_DONE_KEY = 'whoops_total_done'
const SHARE_STYLE_KEY = 'whoops_share_style'
const HAPTICS_KEY = 'whoops_haptics'

export async function isOnboarded(): Promise<boolean> {
  return (await AsyncStorage.getItem(ONBOARDED_KEY)) === 'true'
}

export async function setOnboarded(): Promise<void> {
  await AsyncStorage.setItem(ONBOARDED_KEY, 'true')
}

export async function getHistory(): Promise<HistoryItem[]> {
  const raw = await AsyncStorage.getItem(HISTORY_KEY)
  return raw ? (JSON.parse(raw) as HistoryItem[]) : []
}

export async function saveHistory(items: HistoryItem[]): Promise<void> {
  // Max 50 items locally per spec Section 5, Screen 6
  await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(items.slice(0, 50)))
}

export async function getTotalWhoops(): Promise<number> {
  const raw = await AsyncStorage.getItem(TOTAL_WHOOPS_KEY)
  return raw ? Number(raw) : 0
}

export async function getTotalDone(): Promise<number> {
  const raw = await AsyncStorage.getItem(TOTAL_DONE_KEY)
  return raw ? Number(raw) : 0
}

export async function incrementTotalWhoops(): Promise<number> {
  const next = (await getTotalWhoops()) + 1
  await AsyncStorage.setItem(TOTAL_WHOOPS_KEY, String(next))
  return next
}

export async function incrementTotalDone(): Promise<number> {
  const next = (await getTotalDone()) + 1
  await AsyncStorage.setItem(TOTAL_DONE_KEY, String(next))
  return next
}

// Local-time YYYY-MM-DD key, so the daily limit resets at local midnight (not UTC).
export function getTodayDateKey(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export async function getUsageCount(dateKey: string): Promise<number> {
  const raw = await AsyncStorage.getItem(`whoops_usage_${dateKey}`)
  return raw ? Number(raw) : 0
}

export async function incrementUsageCount(dateKey: string): Promise<number> {
  const next = (await getUsageCount(dateKey)) + 1
  await AsyncStorage.setItem(`whoops_usage_${dateKey}`, String(next))
  return next
}

export async function getShareStyle(): Promise<ShareCardStyle> {
  const raw = await AsyncStorage.getItem(SHARE_STYLE_KEY)
  return raw === 'classic' || raw === 'chaos' || raw === 'wisdom' ? raw : 'classic'
}

export async function setShareStyle(style: ShareCardStyle): Promise<void> {
  await AsyncStorage.setItem(SHARE_STYLE_KEY, style)
}

export async function getHapticsEnabled(): Promise<boolean> {
  const raw = await AsyncStorage.getItem(HAPTICS_KEY)
  return raw !== 'off'
}

export async function setHapticsEnabled(enabled: boolean): Promise<void> {
  await AsyncStorage.setItem(HAPTICS_KEY, enabled ? 'on' : 'off')
}
