import AsyncStorage from '@react-native-async-storage/async-storage'
import { generateUUID } from './uuid'

const DEVICE_ID_KEY = 'whoops_device_id'

// Anonymous device identifier, generated once and persisted locally.
export async function getDeviceId(): Promise<string> {
  const existing = await AsyncStorage.getItem(DEVICE_ID_KEY)
  if (existing) return existing

  const id = generateUUID()
  await AsyncStorage.setItem(DEVICE_ID_KEY, id)
  return id
}

// Dev tool: forgets the local device id. A fresh one is generated (and
// re-registered with Supabase) the next time initializeDevice() runs.
export async function clearDeviceId(): Promise<void> {
  await AsyncStorage.removeItem(DEVICE_ID_KEY)
}
