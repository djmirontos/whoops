import type { ShareCardStyle, WhoopsResponse } from '../types'

export interface ShareCardOptions {
  userProblem: string
  response: WhoopsResponse
  style: ShareCardStyle
}

// Captures a rendered share card component (via react-native-view-shot) to a JPG URI.
export async function captureShareCard(viewRef: unknown): Promise<string> {
  // TODO: implement react-native-view-shot capture per spec Section 9
  void viewRef
  throw new Error('captureShareCard not implemented')
}

// Opens the native OS share sheet (via expo-sharing) with the captured image.
export async function shareImage(uri: string): Promise<void> {
  // TODO: implement expo-sharing per spec Section 9
  void uri
  throw new Error('shareImage not implemented')
}

// Saves the captured image to the device gallery (via expo-media-library).
export async function saveImageToGallery(uri: string): Promise<void> {
  // TODO: implement expo-media-library save per spec Section 9
  void uri
  throw new Error('saveImageToGallery not implemented')
}
