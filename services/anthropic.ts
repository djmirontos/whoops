import Anthropic from '@anthropic-ai/sdk'
import { SYSTEM_PROMPT } from './deepseek'
import type { WhoopsResponse } from '../types'

// Claude fallback service — used if the DeepSeek call fails or times out.
const client = new Anthropic({
  apiKey: process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY,
  dangerouslyAllowBrowser: true,
})

export async function generateAdviceFallback(userProblem: string): Promise<WhoopsResponse> {
  const message = await client.messages.create({
    model: 'claude-sonnet-5',
    max_tokens: 400,
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
  if (!raw) throw new Error('Empty response from Claude')

  const cleaned = raw.replace(/```json|```/g, '').trim()
  return JSON.parse(cleaned) as WhoopsResponse
}
