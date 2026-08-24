import Anthropic from '@anthropic-ai/sdk'
import { SYSTEM_PROMPT, extractJsonPayload } from './deepseek'
import type { WhoopsResponse } from '../types'

// Claude fallback service — used if the DeepSeek call fails or times out.
const client = new Anthropic({
  apiKey: process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY,
  dangerouslyAllowBrowser: true,
})

export async function generateAdviceFallback(userProblem: string): Promise<WhoopsResponse> {
  console.log('[Anthropic] DeepSeek failed, trying Claude fallback...')

  try {
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Claude timeout after 15s')), 15000)
    )

    const message = await Promise.race([
      client.messages.create({
        model: 'claude-sonnet-5',
        max_tokens: 800,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: 'user',
            content: `User's problem: "${userProblem}"\n\nGenerate a Whoops bad advice response.`,
          },
        ],
      }),
      timeoutPromise,
    ])

    const block = message.content[0]
    const raw = block.type === 'text' ? block.text : ''
    console.log('[Anthropic] Raw response:', raw)

    // Claude sometimes declines internally and returns an empty string
    // rather than an error — treat that as "no advice available" instead
    // of a hard failure, so the user still gets a Whoops response.
    if (!raw || raw.trim().length === 0) {
      console.log('[Anthropic] Empty response - returning default')
      return {
        safe: true,
        response:
          "BOLD CHOICE.\n\nNot doing things is actually a very advanced life strategy. Whatever you do, don't just start with one tiny step. That would ruin everything.",
        tone: 'sarcastic',
        category: 'decisions',
        challenge: {
          enabled: false,
          instruction: '',
          estimatedSeconds: 0,
          emoji: '😈',
        },
        emoji: '😈',
        shareable: true,
      }
    }

    const cleaned = extractJsonPayload(raw)
    return JSON.parse(cleaned) as WhoopsResponse
  } catch (error: any) {
    console.error('[Anthropic] ERROR:', error?.message)
    throw error
  }
}
