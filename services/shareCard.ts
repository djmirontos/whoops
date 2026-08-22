import type { RefObject } from 'react'
import type { View } from 'react-native'
import * as MediaLibrary from 'expo-media-library'
import * as Sharing from 'expo-sharing'
import { captureRef } from 'react-native-view-shot'
import type { ShareCardStyle, WhoopsResponse } from '../types'

export interface ShareCardOptions {
  userProblem: string
  response: WhoopsResponse
  style: ShareCardStyle
}

// Captures a rendered share card component (via react-native-view-shot) to a JPG URI.
// RefObject<View | null> matches what useRef<View>(null) actually produces in React 19.
export async function captureShareCard(viewRef: RefObject<View | null>): Promise<string> {
  return captureRef(viewRef, { format: 'jpg', quality: 0.95 })
}

// Opens the native OS share sheet (via expo-sharing) with the captured image.
export async function shareImage(uri: string): Promise<void> {
  const available = await Sharing.isAvailableAsync()
  if (!available) {
    throw new Error('Sharing is not available on this device')
  }
  await Sharing.shareAsync(uri)
}

// Saves the captured image to the device gallery (via expo-media-library).
export async function saveImageToGallery(uri: string): Promise<void> {
  const { status } = await MediaLibrary.requestPermissionsAsync()
  if (status !== 'granted') {
    throw new Error('Media library permission not granted')
  }
  await MediaLibrary.saveToLibraryAsync(uri)
}
