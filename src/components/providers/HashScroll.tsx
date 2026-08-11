'use client'

import { usePathname } from 'next/navigation'
import { useLenis } from 'lenis/react'
import { useEffect, useRef } from 'react'

import { scheduleScrollToHash } from '@/utilities/scrollToHash'

type LenisInstance = NonNullable<ReturnType<typeof useLenis>>

function useHashScroll(lenis: LenisInstance | undefined) {
  const pathname = usePathname()
  const lenisRef = useRef(lenis)
  lenisRef.current = lenis

  useEffect(() => {
    return scheduleScrollToHash({
      hash: window.location.hash,
      lenis: lenisRef.current ?? null,
      immediate: true,
    })
  }, [pathname])

  useEffect(() => {
    const onHashChange = () => {
      scheduleScrollToHash({
        hash: window.location.hash,
        lenis: lenisRef.current ?? null,
        immediate: true,
      })
    }

    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])
}

/** Native window scroll — use when Lenis is off. */
export function NativeHashScroll() {
  useHashScroll(undefined)
  return null
}

/** Lenis-aware scroll — must render inside ReactLenis. */
export function LenisHashScroll() {
  const lenis = useLenis()
  useHashScroll(lenis)
  return null
}
