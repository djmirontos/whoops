// The AI response is one string with the punchy headline and the rest of
// the copy separated by a blank line — split it so the huge headline and
// the body paragraph can be styled independently. Shared by app/advice.tsx
// and app/share-preview.tsx.
export function splitAdvice(response: string): { headline: string; body: string } {
  const separatorIndex = response.indexOf('\n\n')
  if (separatorIndex === -1) {
    return { headline: response, body: '' }
  }
  return {
    headline: response.slice(0, separatorIndex).trim(),
    body: response.slice(separatorIndex + 2).trim(),
  }
}
