import Image from 'next/image'
import React from 'react'

import { sectionMeasureClasses } from '@/components/site/sectionMeasures'
import type { CalloutSectionData } from '@/lib/content/types'
import { cn } from '@/utilities/ui'

import { SectionIcon } from './sectionIcons'

const sectionBackground: Record<'white' | 'muted', string> = {
  white: 'bg-white',
  muted: 'bg-whitebg',
}

export function CalloutSection({ section }: { section: CalloutSectionData }) {
  const { id, kicker, heading, body, logo, background = 'white' } = section

  return (
    <section id={id} className={cn('section-anchor', sectionBackground[background])}>
      <div className="container mx-auto px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
        <article
          className={cn(
            'card flex flex-col items-start gap-5 border-primary-red/30 bg-redbg p-6 sm:flex-row lg:p-8',
            sectionMeasureClasses.narrowBand,
          )}
        >
          {logo?.src ? (
            <div className="logo-slot logo-slot-lg overflow-hidden">
              <Image src={logo.src} alt={logo.alt || heading} width={84} height={68} className="object-contain" />
            </div>
          ) : (
            <div className="logo-slot logo-slot-lg" aria-label={`${heading} logo placeholder`}>
              <SectionIcon name="image-square" size={28} />
            </div>
          )}
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            {kicker ? <p className="kicker">{kicker}</p> : null}
            <h2 className="text-h5M font-bold leading-[120%] text-primary-blue lg:text-h5">{heading}</h2>
            <div className="flex flex-col gap-4">
              {(Array.isArray(body) ? body : typeof body === 'string' ? [body] : []).map(
                (paragraph, index) => (
                  <p key={index} className="text-b16 leading-[150%] text-primary-blue/85">
                    {paragraph}
                  </p>
                ),
              )}
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
