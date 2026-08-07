import { NextResponse } from 'next/server'
import { fetchGoldApiQuote, getGoldApiKey, perGramFromQuote, MetalSymbol } from '@/utilities/goldApi'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const metal = (searchParams.get('metal')?.toUpperCase() as MetalSymbol) || 'XAU'
    const currency = searchParams.get('currency')?.toUpperCase() || 'PKR'

    const quote = await fetchGoldApiQuote(metal, currency)
    const pricePerGram24k = perGramFromQuote(quote)

    return NextResponse.json({
      success: true,
      apiKeyConfigured: Boolean(getGoldApiKey()),
      data: {
        ...quote,
        price_gram_calculated_24k: pricePerGram24k,
      },
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=600',
      },
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch metal price'
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 },
    )
  }
}
