import { createHmac, timingSafeEqual } from 'crypto'

export function generateSecureHash(
  params: Record<string, string>,
  integritySalt: string
): string {
  const sorted = Object.entries(params)
    .filter(([key, value]) => key !== 'pp_SecureHash' && value !== '')
    .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))

  const valuesString = sorted.map(([, v]) => v).join('&')
  const message = `${integritySalt}&${valuesString}`

  return createHmac('sha256', integritySalt)
    .update(message)
    .digest('hex')
    .toUpperCase()
}

export function verifySecureHash(
  params: Record<string, string>,
  integritySalt: string
): boolean {
  const received = params['pp_SecureHash'] ?? ''
  if (!received) return false
  
  const computed = generateSecureHash(params, integritySalt)
  
  if (received.length !== computed.length) return false
  return timingSafeEqual(Buffer.from(received), Buffer.from(computed))
}

export function normalizePayload(raw: Record<string, unknown>): Record<string, string> {
  const out: Record<string, string> = {}
  for (const [key, value] of Object.entries(raw)) {
    out[key] = value == null ? '' : String(value)
  }
  return out
}
