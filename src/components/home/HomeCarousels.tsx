'use client'

import { Ds3dCarousel } from '@/components/ds3d'
import type { Ds3dSlide } from '@/components/ds3d/Ds3dCarousel'

type HomeCarouselsProps = {
  teamSlides: Ds3dSlide[]
  machinerySlides: Ds3dSlide[]
}

export function HomeTeamCarousel({ slides }: { slides: Ds3dSlide[] }) {
  return (
    <Ds3dCarousel
      slides={slides}
      ariaLabel="Meet our expert medical team — drag or scroll to browse"
    />
  )
}

export function HomeMachineryCarousel({ slides }: { slides: Ds3dSlide[] }) {
  return (
    <Ds3dCarousel
      slides={slides}
      ariaLabel="New machinery and equipment — drag or scroll to browse"
    />
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
