// Design tokens from spec Section 3: Design System → Color Palette

export const Colors = {
  background: '#0D0D10',
  surface: '#1A1A24',
  surfaceRaised: '#22222F',
  primary: '#8B5CF6',
  primaryDark: '#6D28D9',
  secondary: '#F43F8E',
  accent: '#FACC15',
  success: '#A3E635',
  textPrimary: '#FFFFFF',
  textSecondary: '#A1A1AA',
  textMuted: '#52525B',
  border: '#2D2D3D',
  danger: '#EF4444',
} as const

export type ColorToken = keyof typeof Colors
