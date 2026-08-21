import { TextInput, type TextInputProps } from 'react-native'
import { Colors } from '../../constants/colors'

interface InputProps extends TextInputProps {
  className?: string
}

export function Input({ className = '', ...textInputProps }: InputProps) {
  return (
    <TextInput
      className={`rounded-2xl bg-surface p-4 text-base text-text-primary ${className}`}
      placeholderTextColor={Colors.textMuted}
      multiline
      maxLength={500}
      {...textInputProps}
    />
  )
}
