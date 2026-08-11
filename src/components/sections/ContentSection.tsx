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
  const { id, kicker, heading, body, image, background = 'white', align } = section
  const textAlign = align ?? (image ? 'start' : 'center')
  const isStart = textAlign === 'start'
  const paragraphs = Array.isArray(body) ? body : typeof body === 'string' ? [body] : []

  return (
    <section
      id={id}
      className={cn('section-anchor', backgroundClasses[background])}
    >
      <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
        {image ? (
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-16">
            <div
              className={cn(
                'flex flex-col gap-[6px] lg:col-span-6',
                isStart ? 'text-start' : 'text-center lg:text-start',
              )}
            >
              {kicker ? <p className="kicker">{kicker}</p> : null}
              {heading ? (
                <h2 className="text-h3M font-bold text-primary-blue lg:text-h3">{heading}</h2>
              ) : null}
              <div className="mt-2 flex flex-col gap-4">
                {paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-b16 leading-[150%] text-primary-blue/85">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="group relative aspect-video max-h-[320px] overflow-hidden rounded-xl">
                <Image
                  src={image.src}
                  alt={image.alt ?? heading ?? ''}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        ) : (
          <div
            className={cn(
              'mx-auto flex w-full flex-col gap-[6px] lg:w-2/3',
              isStart ? 'text-start' : 'text-center',
            )}
          >
            {kicker ? <p className="kicker">{kicker}</p> : null}
            {heading ? (
              <h2 className="text-h3M font-bold text-primary-blue lg:text-h3">{heading}</h2>
            ) : null}
            {paragraphs.length > 0 ? (
              <div className="mt-2 flex w-full flex-col gap-4">
                {paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-b16 leading-[150%] text-primary-blue/85">
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : null}
          </div>
        )}
      </div>
    </section>
  )
}
