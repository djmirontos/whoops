import * as Haptics from 'expo-haptics'
import { getHapticsEnabled } from '../services/storage'

// Haptic feedback hook (spec Section 14: Animation & Haptics)
async function fireIfEnabled(fire: () => Promise<void>) {
  try {
    const enabled = await getHapticsEnabled()
    if (enabled) {
      await fire()
    }
  } catch (err) {
    console.error('[Haptics] Failed to check haptics setting:', err)
  }
}

export function useHaptics() {
  const impactLight = () =>
    fireIfEnabled(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light))
  const impactMedium = () =>
    fireIfEnabled(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium))
  const impactHeavy = () =>
    fireIfEnabled(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy))
  const notifySuccess = () =>
    fireIfEnabled(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success))
  const notifyWarning = () =>
    fireIfEnabled(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning))

  return { impactLight, impactMedium, impactHeavy, notifySuccess, notifyWarning }
}
