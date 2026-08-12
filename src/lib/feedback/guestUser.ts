const GUEST_ID_KEY = "hijaz-feedback-guest-id"

const REVIEWER_COLORS = [
  "#0070f3",
  "#c8102e",
  "#2a9d8f",
  "#e9c46a",
  "#9b59b6",
  "#f97316",
] as const

function hashString(value: string): number {
  let hash = 0
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

export function getGuestUserId(): string {
  if (typeof window === "undefined") {
    return "guest-reviewer-ssr"
  }

  const existingId = localStorage.getItem(GUEST_ID_KEY)
  if (existingId) {
    return existingId
  }

  const nextId = `guest-${crypto.randomUUID()}`
  localStorage.setItem(GUEST_ID_KEY, nextId)
  return nextId
}

export function getGuestUserInfo(userId: string) {
  const colorIndex = hashString(userId) % REVIEWER_COLORS.length
  const shortId = userId.replace(/^guest-/, "").slice(0, 4)

  return {
    name: `Reviewer ${shortId}`,
    color: REVIEWER_COLORS[colorIndex],
    avatar: `https://liveblocks.io/avatars/avatar-${(colorIndex % 6) + 1}.png`,
  }
}
