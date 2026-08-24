// Design tokens — Whoops "bubbly mascot" redesign (dark purple/navy palette)

export const Colors = {
  background: '#111111',
  surface: '#1C1C1E',
  surfaceRaised: '#2C2C2E',
  primary: '#8B5CF6',
  primaryDark: '#6D28D9',
  secondary: '#F43F8E',
  accent: '#FACC15',
  success: '#A3E635',
  textPrimary: '#FFFFFF',
  textSecondary: '#A1A1AA',
  textMuted: '#636366',
  lavender: '#A78BCA',
  lavenderLight: '#E0D0FF',
  tabInactive: '#636366',
  textOnSuccess: '#0D0D10',
  border: '#3A3A3C',
  danger: '#EF4444',
} as const

export type ColorToken = keyof typeof Colors
