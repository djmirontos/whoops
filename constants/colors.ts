// Design tokens — Whoops "bubbly mascot" redesign (dark purple/navy palette)

export const Colors = {
  background: '#1A0A2E',
  surface: '#2D1B4E',
  surfaceRaised: '#3D2560',
  primary: '#8B5CF6',
  primaryDark: '#6D28D9',
  secondary: '#F43F8E',
  accent: '#FACC15',
  success: '#A3E635',
  textPrimary: '#FFFFFF',
  textSecondary: '#A1A1AA',
  textMuted: '#52525B',
  lavender: '#A78BCA',
  lavenderLight: '#E0D0FF',
  tabInactive: '#4A3570',
  textOnSuccess: '#0D0D10',
  border: '#2D2D3D',
  danger: '#EF4444',
} as const

export type ColorToken = keyof typeof Colors
