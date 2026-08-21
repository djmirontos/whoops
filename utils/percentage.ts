// Absurd completion percentage generator (spec Section 5, Screen 4)
// Always between 0.1 and 4.9, always one decimal place, never a round number.
export function generatePercentage(): number {
  const wholePart = Math.floor(Math.random() * 5) // 0-4
  const decimalDigit = Math.floor(Math.random() * 9) + 1 // 1-9, never 0
  return Math.round((wholePart + decimalDigit / 10) * 10) / 10
}
