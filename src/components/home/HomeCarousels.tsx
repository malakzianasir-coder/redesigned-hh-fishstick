'use client'

import Image from 'next/image'
import { InteractiveCard } from '@/components/ui/InteractiveCard'
import { StandardCarousel } from '@/components/ui/StandardCarousel'
import type { Ds3dSlide } from '@/components/ds3d/Ds3dCarousel'

type HomeCarouselsProps = {
  teamSlides: Ds3dSlide[]
  machinerySlides: Ds3dSlide[]
}

export function HomeTeamCarousel({ slides }: { slides: Ds3dSlide[] }) {
  return (
    <StandardCarousel ariaLabel="Meet our expert medical team — drag or scroll to browse">
      {slides.map((slide) => (
        <InteractiveCard
          key={slide.title}
          href={slide.href}
          className="flex flex-col h-full overflow-hidden"
        >
          <div className="relative aspect-square overflow-hidden bg-whitebg">
            <Image
              src={slide.src}
              alt={slide.alt || slide.title}
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 85vw, 320px"
            />
          </div>
          <div className="flex flex-1 flex-col justify-center gap-1 p-5">
            <h3 className="text-h6M font-bold leading-[120%] text-primary-blue transition-colors group-hover:text-primary-red lg:text-h6">
              {slide.title}
            </h3>
            {slide.role && (
              <p className="text-b14 font-semibold text-primary-red">{slide.role}</p>
            )}
          </div>
        </InteractiveCard>
      ))}
    </StandardCarousel>
  )
}

export function HomeMachineryCarousel({ slides }: { slides: Ds3dSlide[] }) {
  return (
    <StandardCarousel ariaLabel="New machinery and equipment — drag or scroll to browse">
      {slides.map((slide) => (
        <InteractiveCard
          key={slide.title}
          href={slide.href}
          className="flex flex-col h-full overflow-hidden"
        >
          <div className="relative aspect-[4/3] overflow-hidden bg-cardbg">
            <Image
              src={slide.src}
              alt={slide.alt || slide.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 85vw, 320px"
            />
          </div>
          <div className="flex flex-1 flex-col justify-center p-5">
            <h3 className="text-h6M font-bold leading-[120%] text-primary-blue transition-colors group-hover:text-primary-red lg:text-h6">
              {slide.title}
            </h3>
            {slide.role && (
              <p className="mt-1 text-b14 leading-[150%] text-primary-blue/85 line-clamp-3">
                {slide.role}
              </p>
            )}
          </div>
        </InteractiveCard>
      ))}
    </StandardCarousel>
  )
}

export function HomeCarousels({ teamSlides, machinerySlides }: HomeCarouselsProps) {
  return (
    <>
      <HomeTeamCarousel slides={teamSlides} />
      <HomeMachineryCarousel slides={machinerySlides} />
    </>
  )
}
