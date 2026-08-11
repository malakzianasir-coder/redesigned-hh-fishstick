'use client'

import 'lenis/dist/lenis.css'

import { ReactLenis } from 'lenis/react'
import { type ReactNode, useEffect, useMemo, useState } from 'react'

import { LenisHashScroll, NativeHashScroll } from '@/components/providers/HashScroll'
import type { SiteSettings } from '@/lib/content/types'

type LenisProviderProps = {
  children: ReactNode
  settings: SiteSettings['lenis']
}

export function LenisProvider({ children, settings }: LenisProviderProps) {
  const [ready, setReady] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReducedMotion(media.matches)
    sync()
    setReady(true)
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  const options = useMemo(
    () => ({
      duration: settings.duration,
      lerp: settings.lerp,
      smoothWheel: settings.smoothWheel,
      syncTouch: settings.syncTouch,
      anchors: settings.anchors,
      autoRaf: true,
    }),
    [settings],
  )

  // Wait for client mount so we can honor prefers-reduced-motion without hydration mismatch.
  if (!ready || !settings.enabled || reducedMotion) {
    return (
      <>
        <NativeHashScroll />
        {children}
      </>
    )
  }

  return (
    <ReactLenis root options={options}>
      <LenisHashScroll />
      {children}
    </ReactLenis>
  )
}
