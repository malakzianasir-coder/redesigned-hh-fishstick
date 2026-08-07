import { unstable_cache } from 'next/cache'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const GRAMS_PER_TROY_OZ = 31.1035
const CACHE_SECONDS = 60 * 60 * 24 // once per day

type GoldApiQuote = {
  price?: number
  price_gram_24k?: number
}

type NisabPrices = {
  goldPkrPerGram: number
  silverPkrPerGram: number
  currency: 'PKR'
  updatedAt: string
}

function perGramFromQuote(quote: GoldApiQuote): number | null {
  if (typeof quote.price_gram_24k === 'number' && quote.price_gram_24k > 0) {
    return quote.price_gram_24k
  }
  if (typeof quote.price === 'number' && quote.price > 0) {
    return quote.price / GRAMS_PER_TROY_OZ
  }
  return null
}

async function fetchMetalPkrPerGram(symbol: 'XAU' | 'XAG', apiKey: string): Promise<number> {
  const headers = new Headers()
  headers.append('x-access-token', apiKey)
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`https://www.goldapi.io/api/${symbol}/PKR`, {
    method: 'GET',
    headers,
    redirect: 'follow',
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error(`goldapi ${symbol}/PKR status ${res.status}`)
  }

  const quote = (await res.json()) as GoldApiQuote
  const perGram = perGramFromQuote(quote)
  if (perGram == null) {
    throw new Error(`goldapi ${symbol}/PKR missing price`)
  }
  return perGram
}

const getCachedNisabPrices = unstable_cache(
  async (): Promise<NisabPrices> => {
    const apiKey = process.env.METALS_API_KEY
    if (!apiKey) {
      throw new Error('METALS_API_KEY missing')
    }

    const [goldPkrPerGram, silverPkrPerGram] = await Promise.all([
      fetchMetalPkrPerGram('XAU', apiKey),
      fetchMetalPkrPerGram('XAG', apiKey),
    ])

    return {
      goldPkrPerGram,
      silverPkrPerGram,
      currency: 'PKR',
      updatedAt: new Date().toISOString(),
    }
  },
  ['nisab-prices-pkr-daily'],
  { revalidate: CACHE_SECONDS, tags: ['nisab-prices'] },
)

/**
 * Daily-cached gold/silver PKR-per-gram for Nisab (goldapi.io XAU + XAG).
 * Set METALS_API_KEY in env. Refreshes at most once per day.
 */
export async function GET() {
  if (!process.env.METALS_API_KEY) {
    return NextResponse.json({ error: 'unavailable' }, { status: 503 })
  }

  try {
    const prices = await getCachedNisabPrices()
    return NextResponse.json(prices, {
      headers: {
        'Cache-Control': `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=3600`,
      },
    })
  } catch {
    return NextResponse.json({ error: 'unavailable' }, { status: 503 })
  }
}
