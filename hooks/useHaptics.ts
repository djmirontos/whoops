import * as Haptics from 'expo-haptics'

// Haptic feedback hook (spec Section 14: Animation & Haptics)
// TODO: respect the whoops_haptics setting from services/storage.ts before firing
export function useHaptics() {
  const impactLight = () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
  const impactMedium = () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
  const impactHeavy = () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
  const notifySuccess = () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
  const notifyWarning = () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)

  return { impactLight, impactMedium, impactHeavy, notifySuccess, notifyWarning }
}
