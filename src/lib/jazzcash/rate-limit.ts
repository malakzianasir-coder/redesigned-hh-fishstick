type Window = {
  count: number
  resetAt: number
}

const windows = new Map<string, Window>()

// In-memory only: limits apply per server instance, which damps abuse but is not
// a hard guarantee on multi-instance hosts.
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): { ok: boolean; retryAfterSec: number } {
  const now = Date.now()
  const current = windows.get(key)

  if (!current || current.resetAt <= now) {
    windows.set(key, { count: 1, resetAt: now + windowMs })
    return { ok: true, retryAfterSec: 0 }
  }

  if (current.count >= limit) {
    return { ok: false, retryAfterSec: Math.ceil((current.resetAt - now) / 1000) }
  }

  current.count += 1
  return { ok: true, retryAfterSec: 0 }
}

export function clientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for')
  const first = forwarded?.split(',')[0]?.trim()
  return first || req.headers.get('x-real-ip') || 'unknown'
}
