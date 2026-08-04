'use client'

import { ReactLenis } from 'lenis/react'
import { type ReactNode, useEffect, useMemo, useState } from 'react'

import type { SiteSettings } from '@/lib/content/types'

type LenisProviderProps = {
  children: ReactNode
  settings: SiteSettings['lenis']
}

export function LenisProvider({ children, settings }: LenisProviderProps) {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReducedMotion(media.matches)
    sync()
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

  if (!settings.enabled || reducedMotion) {
    return <>{children}</>
  }

  return (
    <ReactLenis root options={options}>
      {children}
    </ReactLenis>
  )
}
