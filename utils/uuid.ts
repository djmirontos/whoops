// Generates a UUID v4-like identifier without any external dependency.
// Shared by utils/deviceId.ts and stores/sessionStore.ts (history item ids).
export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
    const random = (Math.random() * 16) | 0
    const value = char === 'x' ? random : (random & 0x3) | 0x8
    return value.toString(16)
  })
}
