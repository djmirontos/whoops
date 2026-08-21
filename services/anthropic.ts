import Anthropic from '@anthropic-ai/sdk'
import type { WhoopsResponse } from '../types'

// Claude fallback service — used if the DeepSeek call fails or times out.
const client = new Anthropic({
  apiKey: process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY,
})

export async function generateAdviceFallback(
  userProblem: string,
  category: string,
  suggestedAction?: string
): Promise<WhoopsResponse> {
  // TODO: implement Claude fallback call, mirroring services/deepseek.ts
  void client
  void userProblem
  void category
  void suggestedAction
  throw new Error('generateAdviceFallback not implemented')
}
