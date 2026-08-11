import type { Metadata } from 'next'

import { HeroQuoteDemo } from './HeroQuoteDemo'

export const metadata: Metadata = {
  title: 'DS Hero Quote Excerpt',
  robots: { index: false, follow: false },
}

export default function DsHeroQuotePage() {
  return (
    <div className="container mx-auto px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
      <p className="kicker">Dev only</p>
      <h1 className="text-h2M font-bold text-primary-blue lg:text-h2">Hero excerpt — quote style</h1>
      <p className="mt-2 max-w-2xl text-b16 text-primary-blue/85">
        Toggle <code className="text-b14">excerptVariant</code> on <code className="text-b14">MarketingHeroSection</code>.
        Default remains body copy. Quote mode is italic description with a red rule — no quotation marks are added.
        Live departments use quote mode; donate and other heroes stay on body (plus the separate <code className="text-b14">quote</code> field).
      </p>
      <div className="mt-10">
        <HeroQuoteDemo />
      </div>
    </div>
  )
}
