import Image from 'next/image'
import React from 'react'

import { BlockHeader } from '@/components/site/BlockHeader'
import type { AccommodationSectionData } from '@/lib/content/types'
import { cn } from '@/utilities/ui'

import { SectionIcon } from './sectionIcons'

const sectionBackground: Record<'white' | 'muted', string> = {
  white: 'bg-white',
  muted: 'bg-whitebg',
}

export function AccommodationSection({ section }: { section: AccommodationSectionData }) {
  const { id, kicker, heading, intro, rooms, background = 'white' } = section

  return (
    <section id={id} className={cn('section-anchor', sectionBackground[background])}>
      <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
        <BlockHeader
          kicker={kicker}
          title={heading}
          lede={Array.isArray(intro) ? intro.join(' ') : intro}
        />

        <div>
          <h3 className="mb-6 text-center text-h5M font-bold text-primary-blue lg:text-h5">
            Accommodation Options
          </h3>
          <div className="card-grid card-grid--4">
            {rooms.map((room, index) => (
              <article
                key={room.label}
                className="card-interactive flex flex-col gap-4 p-5"
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                {room.image?.src ? (
                  <div className="relative aspect-[3/2] overflow-hidden rounded-xl">
                    <Image
                      src={room.image.src}
                      alt={room.image.alt || room.label}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="photo-slot-wide" aria-label={`${room.label} photo placeholder`}>
                    <SectionIcon name="image-square" size={26} />
                  </div>
                )}
                <div className="flex items-end gap-3">
                  <span className="room-numeral">{room.count}</span>
                  <p className="pb-1 text-b16 font-semibold text-primary-blue">{room.label}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
