import Link from 'next/link'
import React from 'react'

import type { CtaSectionData } from '@/lib/content/types'

export function GlobalCtaSection({ section }: { section: CtaSectionData }) {
  const { kicker = 'Support Our Mission', heading, body, button } = section

  return (
    <section className="relative overflow-hidden bg-primary-blue">
      <div className="pointer-events-none absolute bottom-0 left-1/4 aspect-square w-[250px] rounded-full bg-light-blue opacity-40 blur-[200px]" />
      <div className="container relative mx-auto px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
        <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:items-center lg:justify-between lg:text-start">
          <div className="flex w-full max-w-xl flex-col items-center gap-[6px] lg:items-start">
            <p className="kicker">{kicker}</p>
            <h2 className="text-h4M font-bold text-white lg:text-h4">{heading}</h2>
            {body ? <p className="text-b16 text-white/85">{body}</p> : null}
          </div>
          <Link href={button.href} className="btn-on-dark shrink-0">
            {button.label}
          </Link>
        </div>
      </div>
    </section>
  )
}
