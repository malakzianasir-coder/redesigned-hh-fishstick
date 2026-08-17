export function generateTxnDateTime(date: Date = new Date()): string {
  const pad = (n: number) => n.toString().padStart(2, '0')
  return (
    date.getFullYear().toString() +
    pad(date.getMonth() + 1) +
    pad(date.getDate()) +
    pad(date.getHours()) +
    pad(date.getMinutes()) +
    pad(date.getSeconds())
  )
}

export function generateTxnExpiryDateTime(txnDateTime: string): string {
  // txnDateTime is YYYYMMDDHHMMSS
  const year = parseInt(txnDateTime.substring(0, 4))
  const month = parseInt(txnDateTime.substring(4, 6)) - 1
  const day = parseInt(txnDateTime.substring(6, 8))
  const hours = parseInt(txnDateTime.substring(8, 10))
  const mins = parseInt(txnDateTime.substring(10, 12))
  const secs = parseInt(txnDateTime.substring(12, 14))

  const date = new Date(year, month, day, hours, mins, secs)
  date.setDate(date.getDate() + 1) // Add 1 day
  return generateTxnDateTime(date)
}

export function generateTxnRefNo(): string {
  return `HIJ${generateTxnDateTime()}`
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
