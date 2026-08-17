const PKT_TIME_ZONE = 'Asia/Karachi'
const PKT_DATETIME_LENGTH = 14 // YYYYMMDDHHMMSS

function formatPKT(date: Date): string {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: PKT_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).formatToParts(date)
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? '00'
  const hour = get('hour') === '24' ? '00' : get('hour')
  return `${get('year')}${get('month')}${get('day')}${hour}${get('minute')}${get('second')}`
}

// All JazzCash date/time values must be Pakistan Standard Time (guide §3.5).
export function generateTxnDateTime(date: Date = new Date()): string {
  return formatPKT(date)
}

export function generateTxnExpiryDateTime(txnDateTime: string): string {
  const year = Number(txnDateTime.slice(0, 4))
  const month = Number(txnDateTime.slice(4, 6)) - 1
  const day = Number(txnDateTime.slice(6, 8))
  const hours = Number(txnDateTime.slice(8, 10))
  const mins = Number(txnDateTime.slice(10, 12))
  const secs = Number(txnDateTime.slice(12, 14))

  // PKT observes no DST, so +1 day in wall-clock terms is a fixed 24h offset.
  const next = new Date(Date.UTC(year, month, day, hours, mins, secs) + 24 * 60 * 60 * 1000)
  return next.toISOString().replace(/[^0-9]/g, '').slice(0, PKT_DATETIME_LENGTH)
}

// Recommended format: first three letters of the merchant domain + transaction
// date/time (YmdHis) — guide §3.4.
export function generateTxnRefNo(txnDateTime: string = formatPKT(new Date())): string {
  return `hij${txnDateTime}`
}

export function toJazzCashAmount(pkr: number): string {
  return String(Math.round(pkr * 100))
}

export function fromJazzCashAmount(jazzAmount: string | number): number {
  return Number(jazzAmount) / 100
}

export function toBillReference(input: string): string {
  return input.replace(/[^A-Za-z0-9]/g, '')
}
