import Image from 'next/image'
import React from 'react'

import type { ContentSectionData } from '@/lib/content/types'
import { cn } from '@/utilities/ui'

type ContentSectionProps = {
  section: ContentSectionData
}

const backgroundClasses: Record<NonNullable<ContentSectionData['background']>, string> = {
  white: 'bg-white',
  muted: 'bg-whitebg',
  red: 'bg-redbg',
}

export const ContentSection: React.FC<ContentSectionProps> = ({ section }) => {
  const { id, kicker, heading, body, image, background = 'white' } = section

  return (
    <section
      id={id}
      className={cn('section-anchor scroll-mt-[140px]', backgroundClasses[background])}
    >
      <div className="container mx-auto px-6 lg:px-[30px] py-[30px] lg:py-[60px] flex flex-col gap-8">
        <div
          className={cn(
            'flex flex-col gap-8',
            image ? 'lg:grid lg:grid-cols-12 lg:items-center lg:gap-16' : '',
          )}
        >
          <div className={cn('flex flex-col gap-[6px]', image ? 'lg:col-span-6' : 'text-center')}>
            {kicker && (
              <p className="text-b12 font-bold uppercase tracking-kicker text-primary-red">{kicker}</p>
            )}
            {heading ? (
              <h2 className="text-h3M lg:text-h3 font-bold text-primary-blue">{heading}</h2>
            ) : null}
            <div className={cn('flex flex-col gap-4', image ? '' : 'max-w-3xl mx-auto')}>
              {(Array.isArray(body) ? body : typeof body === 'string' ? [body] : []).map(
                (paragraph, index) => (
                  <p key={index} className="text-b16 text-primary-blue/85">
                    {paragraph}
                  </p>
                ),
              )}
            </div>
          </div>
          {image && (
            <div className="lg:col-span-6">
              <div className="relative overflow-hidden rounded-xl aspect-video max-h-[320px]">
                <Image
                  src={image.src}
                  alt={image.alt ?? heading ?? ''}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
