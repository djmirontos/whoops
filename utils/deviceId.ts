import AsyncStorage from '@react-native-async-storage/async-storage'

const DEVICE_ID_KEY = 'whoops_device_id'

function createId(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
    const random = (Math.random() * 16) | 0
    const value = char === 'x' ? random : (random & 0x3) | 0x8
    return value.toString(16)
  })
}

// Anonymous device identifier, generated once and persisted locally.
export async function getDeviceId(): Promise<string> {
  const existing = await AsyncStorage.getItem(DEVICE_ID_KEY)
  if (existing) return existing

  const id = createId()
  await AsyncStorage.setItem(DEVICE_ID_KEY, id)
  return id
}
