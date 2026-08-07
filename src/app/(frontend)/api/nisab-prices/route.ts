import { NextResponse } from 'next/server'
import { getGoldApiKey } from '@/utilities/goldApi'
import { getNisabPrices, NISAB_CACHE_SECONDS } from '@/utilities/nisabPrices'

export const dynamic = 'force-dynamic'

/**
 * Daily-cached gold/silver PKR-per-gram for Nisab (goldapi.io XAU + XAG).
 * Uses METALS_API_KEY / GOLDAPI_KEY from environment or configured key.
 */
export async function GET() {
  if (!getGoldApiKey()) {
    return NextResponse.json({ error: 'unavailable' }, { status: 503 })
  }

  const prices = await getNisabPrices()
  if (!prices) {
    return NextResponse.json({ error: 'unavailable' }, { status: 503 })
  }

  return NextResponse.json(prices, {
    headers: {
      'Cache-Control': `public, s-maxage=${NISAB_CACHE_SECONDS}, stale-while-revalidate=3600`,
    },
  })
}
