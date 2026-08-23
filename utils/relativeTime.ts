// Formats an ISO timestamp as a short relative label for history rows.
export function relativeTime(isoString: string): string {
  const date = new Date(isoString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffHours = diffMs / (1000 * 60 * 60)
  const diffDays = diffMs / (1000 * 60 * 60 * 24)

  if (diffHours < 1) return 'Just now'

  if (diffHours < 24) {
    const hours = Math.floor(diffHours)
    return `${hours} hour${hours === 1 ? '' : 's'} ago`
  }

  if (diffDays < 2) return 'Yesterday'

  if (diffDays < 7) {
    const days = Math.floor(diffDays)
    return `${days} days ago`
  }

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
