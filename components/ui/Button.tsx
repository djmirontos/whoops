import { Pressable, Text, type GestureResponderEvent, type PressableProps } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

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
  primary: 'font-bold text-text-primary',
  secondary: 'font-semibold text-secondary',
  success: 'font-semibold text-background',
  text: 'font-semibold text-text-secondary',
}

export function Button({
  label,
  variant = 'primary',
  className = '',
  disabled,
  onPressIn,
  onPressOut,
  ...pressableProps
}: ButtonProps) {
  const scale = useSharedValue(1)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  function handlePressIn(event: GestureResponderEvent) {
    scale.value = withTiming(0.97, { duration: 80 })
    onPressIn?.(event)
  }

  function handlePressOut(event: GestureResponderEvent) {
    scale.value = withTiming(1, { duration: 80 })
    onPressOut?.(event)
  }

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled: !!disabled }}
        disabled={disabled}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        className={`items-center justify-center rounded-2xl px-6 py-4 ${VARIANT_CLASSES[variant]} ${
          disabled ? 'opacity-50' : ''
        } ${className}`}
        {...pressableProps}
      >
        <Text className={`text-base ${VARIANT_TEXT_CLASSES[variant]}`}>{label}</Text>
      </Pressable>
    </Animated.View>
  )
}
