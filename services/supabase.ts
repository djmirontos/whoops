import { createClient } from '@supabase/supabase-js'
import type { WhoopsResponse } from '../types'

const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!
)

export default supabase

// Register (or touch) the anonymous device row on launch.
// Never throws — analytics/history mirroring must not block the core loop.
export async function registerDevice(deviceId: string): Promise<void> {
  try {
    const { error } = await supabase.from('devices').upsert(
      {
        device_id: deviceId,
        last_seen: new Date().toISOString(),
        platform: 'android',
      },
      { onConflict: 'device_id' }
    )

    if (error) {
      console.error('[Supabase] registerDevice error:', error.message)
    }
  } catch (err) {
    console.error('[Supabase] registerDevice threw:', err)
  }
}

// Save an interaction after the AI response comes back (spec Section 10: interactions table).
export async function saveInteraction(params: {
  deviceId: string
  userProblem: string
  category: string
  responseJson: WhoopsResponse
  safetyBlocked: boolean
}): Promise<string | null> {
  try {
    const { data, error } = await supabase
      .from('interactions')
      .insert({
        device_id: params.deviceId,
        user_problem: params.userProblem,
        category: params.category,
        response_json: params.responseJson,
        safety_blocked: params.safetyBlocked,
      })
      .select('id')
      .single()

    if (error) {
      console.error('[Supabase] saveInteraction error:', error.message)
      return null
    }

    return (data?.id as string | undefined) ?? null
  } catch (err) {
    console.error('[Supabase] saveInteraction threw:', err)
    return null
  }
}

export async function markChallengeCompleted(interactionId: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('interactions')
      .update({ completed_challenge: true })
      .eq('id', interactionId)

    if (error) {
      console.error('[Supabase] markChallengeCompleted error:', error.message)
    }
  } catch (err) {
    console.error('[Supabase] markChallengeCompleted threw:', err)
  }
}

export async function markShared(interactionId: string, template: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('interactions')
      .update({ shared: true, shared_template: template })
      .eq('id', interactionId)

    if (error) {
      console.error('[Supabase] markShared error:', error.message)
    }
  } catch (err) {
    console.error('[Supabase] markShared threw:', err)
  }
}
