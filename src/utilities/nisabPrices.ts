import { unstable_cache } from 'next/cache'
import { fetchGoldApiQuote, getGoldApiKey, perGramFromQuote } from '@/utilities/goldApi'

const CACHE_SECONDS = 60 * 60 * 24 // once per day

export type NisabPrices = {
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

    return {
      goldPkrPerGram: perGramFromQuote(goldQuote),
      silverPkrPerGram: perGramFromQuote(silverQuote),
      currency: 'PKR',
      updatedAt: new Date().toISOString(),
    }
  },
  ['nisab-prices-pkr-daily'],
  { revalidate: CACHE_SECONDS, tags: ['nisab-prices'] },
)

export async function getNisabPrices(): Promise<NisabPrices | null> {
  if (!getGoldApiKey()) return null

  try {
    return await getCachedNisabPrices()
  } catch (err) {
    console.error('Nisab prices fetch error:', err)
    return null
  }
}

export { CACHE_SECONDS as NISAB_CACHE_SECONDS }
