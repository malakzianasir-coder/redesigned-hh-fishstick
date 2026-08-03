import React from 'react'

import type { ClosingBandSectionData } from '@/lib/content/types'

export function ClosingBandSection({ section }: { section: ClosingBandSectionData }) {
  const { id, kicker, quote } = section

  return (
    <section id={id} className="bg-redbg">
      <div className="container mx-auto px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <p className="kicker">{kicker}</p>
          <p className="font-display text-h5M font-bold text-primary-blue lg:text-h5">{quote}</p>
        </div>
      </div>
    </section>
  )
}
