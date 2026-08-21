import { Pressable, Text, type PressableProps } from 'react-native'

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'text'

interface ButtonProps extends PressableProps {
  label: string
  variant?: ButtonVariant
  className?: string
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'bg-primary',
  secondary: 'border border-secondary bg-transparent',
  success: 'bg-success',
  text: 'bg-transparent',
}

const VARIANT_TEXT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'text-text-primary',
  secondary: 'text-secondary',
  success: 'text-background',
  text: 'text-text-secondary',
}

export function Button({ label, variant = 'primary', className = '', ...pressableProps }: ButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      className={`items-center justify-center rounded-2xl px-6 py-4 ${VARIANT_CLASSES[variant]} ${className}`}
      {...pressableProps}
    >
      <Text className={`text-lg font-semibold ${VARIANT_TEXT_CLASSES[variant]}`}>{label}</Text>
    </Pressable>
  )
}
