import { unstable_cache } from 'next/cache'
import { NextResponse } from 'next/server'
import { fetchGoldApiQuote, getGoldApiKey, perGramFromQuote } from '@/utilities/goldApi'

export const dynamic = 'force-dynamic'

const CACHE_SECONDS = 60 * 60 * 24 // once per day

type NisabPrices = {
  goldPkrPerGram: number
  silverPkrPerGram: number
  currency: 'PKR'
  updatedAt: string
}

const getCachedNisabPrices = unstable_cache(
  async (): Promise<NisabPrices> => {
    const [goldQuote, silverQuote] = await Promise.all([
      fetchGoldApiQuote('XAU', 'PKR'),
      fetchGoldApiQuote('XAG', 'PKR'),
    ])

    const goldPkrPerGram = perGramFromQuote(goldQuote)
    const silverPkrPerGram = perGramFromQuote(silverQuote)

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
 * Uses METALS_API_KEY / GOLDAPI_KEY from environment or configured key.
 */
export async function GET() {
  const apiKey = getGoldApiKey()
  if (!apiKey) {
    return NextResponse.json({ error: 'unavailable' }, { status: 503 })
  }

  try {
    const prices = await getCachedNisabPrices()
    return NextResponse.json(prices, {
      headers: {
        'Cache-Control': `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=3600`,
      },
    })
  } catch (err) {
    console.error('Nisab prices fetch error:', err)
    return NextResponse.json({ error: 'unavailable' }, { status: 503 })
  }
}
