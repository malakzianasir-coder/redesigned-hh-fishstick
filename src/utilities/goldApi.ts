export type MetalSymbol = 'XAU' | 'XAG' | 'XPT' | 'XPD'

export type GoldApiQuote = {
  timestamp: number
  metal: string
  currency: string
  exchange: string
  symbol: string
  open_time: number
  ask: number
  bid: number
  price: number
  ch: number
  price_gram_24k?: number
  price_gram_22k?: number
  price_gram_21k?: number
  price_gram_20k?: number
  price_gram_18k?: number
  price_gram_16k?: number
  price_gram_14k?: number
  price_gram_10k?: number
}

const DEFAULT_GOLDAPI_KEY = 'goldapi-cad7c0b4299708fedb85cbf2fda5eb54-io'
const GRAMS_PER_TROY_OZ = 31.1034768

export function getGoldApiKey(): string {
  return (
    process.env.METALS_API_KEY ||
    process.env.GOLDAPI_KEY ||
    process.env.GOLD_API_KEY ||
    DEFAULT_GOLDAPI_KEY
  )
}

/**
  * Fetches live metal quote from goldapi.io
  */
export async function fetchGoldApiQuote(
  metal: MetalSymbol = 'XAU',
  currency: string = 'PKR',
): Promise<GoldApiQuote> {
  const apiKey = getGoldApiKey()
  const headers = new Headers()
  headers.append('x-access-token', apiKey)
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`https://www.goldapi.io/api/${metal}/${currency}`, {
    method: 'GET',
    headers,
    redirect: 'follow',
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error(`GoldAPI request failed for ${metal}/${currency} with status ${res.status}`)
  }

  const data = (await res.json()) as GoldApiQuote
  return data
}

/**
  * Extracts per-gram price from quote (prefers price_gram_24k, falls back to price / GRAMS_PER_TROY_OZ)
  */
export function perGramFromQuote(quote: GoldApiQuote): number {
  if (typeof quote.price_gram_24k === 'number' && quote.price_gram_24k > 0) {
    return quote.price_gram_24k
  }
  if (typeof quote.price === 'number' && quote.price > 0) {
    return quote.price / GRAMS_PER_TROY_OZ
  }
  throw new Error(`Quote missing valid price data for ${quote.symbol || 'metal'}`)
}
