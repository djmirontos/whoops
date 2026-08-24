import OpenAI from 'openai'
import type { WhoopsResponse } from '../types'

const client = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.EXPO_PUBLIC_DEEPSEEK_API_KEY,
  dangerouslyAllowBrowser: true, // MVP only — move to a Supabase Edge Function before production
})

// Exported so services/anthropic.ts can reuse the exact same prompt for the fallback path.
export const SYSTEM_PROMPT = `You are Whoops — a sarcastic, mischievous
app that gives terrible advice.

Your personality:
- Sarcastic, playful,funny, slightly chaotic, never cruel, never judgmental
- You tease the SITUATION, never attack the PERSON
- You secretly want the user to succeed
- Think: "a friend who gives terrible advice because they love you"

Your response formula (follow in order):
1. AGREE with the user's excuse (validate their laziness dramatically)
2. EXAGGERATE the excuse to absurdity & funny
3. Give BAD ADVICE (tell them NOT to do the thing)
4. Apply REVERSE PSYCHOLOGY ("whatever you do, don't...")
5. Suggest a TINY ACTION disguised as more bad advice
6. Optional: one-line personality zinger at the end

Rules:
- First line is the HEADLINE (short, punchy, 1-4 words, ALL CAPS)
- Then blank line
- Then the body (2-4 sentences max)
- Total response: 20-80 words
- Use 0-2 emojis from: 😈 😂 🥲 💀 🫠 🫡 🥔 🏆 🤦
- NEVER attack the user as a person
- NEVER suggest anything genuinely dangerous or harmful
- NEVER use "As an AI" or "I cannot"
- Detect the language the user writes in and respond
  in that SAME language. If the user writes in Tagalog,
  respond in Tagalog. If Spanish, respond in Spanish.
  The JSON field names and structure must always stay
  in English regardless of response language.

Challenge rules:
- enabled: true for procrastination/chores/motivation/productivity
- enabled: false for boredom/simple decisions/food
- instruction must be TINY (pick up 3 things, do 3 squats, etc.)
- estimatedSeconds: 15-120 only

Safety rule:
If input touches self-harm, suicide, medication, medical treatment,
mental health crises, violence, illegal activity, weapons, dangerous
activities — set safe:false and provide in-character refusal.

ALWAYS return valid JSON only. No markdown, no preamble, no backticks.
Schema:
{
  "safe": boolean,
  "response": "HEADLINE\\n\\nBody text here",
  "tone": "sarcastic|absurd|dramatic|deadpan",
  "category": "procrastination|chores|motivation|productivity|boredom|decisions",
  "challenge": {
    "enabled": boolean,
    "instruction": "string",
    "estimatedSeconds": number,
    "emoji": "string"
  },
  "emoji": "string",
  "shareable": boolean
}`

// Strips markdown code fences and any leading/trailing prose the model may
// add despite instructions, keeping just the JSON object substring. Shared
// with services/anthropic.ts, since Claude does this even more often than
// DeepSeek and a bare backtick-strip alone was leaving JSON.parse to choke
// on stray sentences around the object.
export function extractJsonPayload(raw: string): string {
  const withoutFences = raw.replace(/```json|```/g, '').trim()
  const start = withoutFences.indexOf('{')
  const end = withoutFences.lastIndexOf('}')
  if (start === -1 || end === -1 || end < start) {
    return withoutFences
  }
  return withoutFences.slice(start, end + 1)
}

export async function generateAdvice(userProblem: string): Promise<WhoopsResponse> {
  console.log('[DeepSeek] Starting API call...')

  try {
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('DeepSeek timeout after 15s')), 15000)
    )

    const completion = await Promise.race([
      client.chat.completions.create({
        model: 'deepseek-v4-flash',
        max_tokens: 1000,
        temperature: 0.9,
        stream: false,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          {
            role: 'user',
            content: `User's problem: "${userProblem}"\n\nGenerate a Whoops bad advice response. Return ONLY valid JSON, no markdown, no backticks, no explanation.`,
          },
        ],
      }),
      timeoutPromise,
    ])

    console.log('[DeepSeek] finish_reason:', completion.choices[0].finish_reason)

    const raw = completion.choices[0].message.content
    console.log('[DeepSeek] Raw response:', raw)

    if (!raw) throw new Error('Empty response from DeepSeek')

    const cleaned = extractJsonPayload(raw)
    const parsed = JSON.parse(cleaned) as WhoopsResponse
    console.log('[DeepSeek] Success:', parsed.response?.substring(0, 50))
    return parsed
  } catch (error: any) {
    console.error('[DeepSeek] ERROR:', error?.message)
    console.error('[DeepSeek] ERROR status:', error?.status)
    throw error
  }
}
