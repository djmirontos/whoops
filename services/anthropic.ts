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
  console.log('[Anthropic] API Key exists:', !!process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY)

  try {
    const message = await client.messages.create({
      model: 'claude-sonnet-5',
      max_tokens: 800,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `User's problem: "${userProblem}"\n\nGenerate a Whoops bad advice response.`,
        },
      ],
    })

    const block = message.content[0]
    const raw = block.type === 'text' ? block.text : ''
    console.log('[Anthropic] Raw response:', raw)

    if (!raw) throw new Error('Empty response from Claude')
    const cleaned = extractJsonPayload(raw)
    return JSON.parse(cleaned) as WhoopsResponse
  } catch (error: any) {
    console.error('[Anthropic] ERROR:', error?.message)
    console.error('[Anthropic] Full error:', JSON.stringify(error, null, 2))
    throw error
  }
}
