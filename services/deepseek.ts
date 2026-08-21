import OpenAI from 'openai'
import type { WhoopsResponse } from '../types'

const client = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.EXPO_PUBLIC_DEEPSEEK_API_KEY,
  dangerouslyAllowBrowser: true, // MVP only — move to a Supabase Edge Function before production
})

// TODO: move SYSTEM_PROMPT + buildUserMessage in from spec Section 6
const SYSTEM_PROMPT = ''

function buildUserMessage(userProblem: string, category: string, suggestedAction?: string): string {
  return `Category: ${category}\nUser's problem: "${userProblem}"\nSuggested micro-action (optional, use if fits naturally): "${suggestedAction ?? ''}"\n\nGenerate a Whoops bad advice response.`
}

export async function generateAdvice(
  userProblem: string,
  category: string,
  suggestedAction?: string
): Promise<WhoopsResponse> {
  // TODO: implement DeepSeek call per spec Section 11
  void client
  void SYSTEM_PROMPT
  void buildUserMessage(userProblem, category, suggestedAction)
  throw new Error('generateAdvice not implemented')
}
