'use client'

import React, { useEffect, useState, useLayoutEffect, useRef } from 'react'
import { useLenis } from 'lenis/react'
import { LogoMarkSVG } from './LogoMarkSVG'

type Mode = 'hidden' | 'intro'

export function BrandLoader() {
  const [mode, setMode] = useState<Mode>('intro')
  const [isReduced, setIsReduced] = useState(false)
  const lenis = useLenis()
  const svgRef = useRef<SVGSVGElement>(null)
  
  // Easing constants
  const EASE_OUT = 'cubic-bezier(.22, 1, .36, 1)'
  const EASE_INOUT = 'cubic-bezier(.65, 0, .35, 1)'

  // 1. Initial Mount: Check Reduced Motion
  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const connection = (navigator as any).connection
    const saveData = connection?.saveData === true

    if (reduced || saveData) {
      setIsReduced(true)
      setMode('hidden')
      return
    }

    setMode('intro')
  }, [])

  // 2. Body scroll lock for intro mode
  useEffect(() => {
    if (mode === 'intro') {
      document.body.style.overflow = 'hidden'
      if (lenis) lenis.stop()
    } else {
      document.body.style.overflow = ''
      if (lenis) lenis.start()
    }

    return () => {
      document.body.style.overflow = ''
      if (lenis) lenis.start()
    }
  }, [mode, lenis])

  // 3. Intro Timeline execution
  useEffect(() => {
    if (mode !== 'intro' || isReduced || !svgRef.current) return

    const svg = svgRef.current
    const moon = svg.querySelector('#moon') as HTMLElement
    const hh = svg.querySelector('#hh') as HTMLElement
    const slide = svg.querySelector('#stage-slide') as HTMLElement
    const letters = Array.from(svg.querySelectorAll('#wordmark-en .letter')) as HTMLElement[]
    const ar = svg.querySelector('#ar') as HTMLElement

    if (!moon || !hh || !slide || !letters.length || !ar) return

    // Set initial CSS states immediately before WAAPI kicks in
    moon.style.opacity = '0'
    hh.style.opacity = '0'
    letters.forEach(l => l.style.opacity = '0')
    ar.style.opacity = '0'

    // We tighten the timeline from ~3.8s to ~2.6s total

    // Stage 1: Moon drops and scales
    moon.animate([
      { opacity: 0, transform: 'scale(.72) translateY(-20px)' },
      { opacity: 1, transform: 'scale(1) translateY(0)', offset: .55 },
      { opacity: 1, transform: 'scale(1) translateY(0)' }
    ], { duration: 600, easing: EASE_OUT, fill: 'both' })

    // Stage 2: HH monogram fades in
    hh.animate([
      { opacity: 0, transform: 'scale(.8)' },
      { opacity: 1, transform: 'scale(1)' }
    ], { duration: 500, delay: 400, easing: EASE_OUT, fill: 'both' })

    // Stage 3: Slide left
    slide.animate([
      { transform: 'translateX(84.5px)' },
      { transform: 'translateX(0px)' }
    ], { duration: 600, delay: 1000, easing: EASE_INOUT, fill: 'both' })

    // Stage 4a: English wordmark
    letters.forEach((el, i) => {
      el.animate([
        { opacity: 0, transform: 'translateY(7px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], { duration: 400, delay: 1200 + i * 40, easing: EASE_OUT, fill: 'both' })
    })

    // Stage 4b: Arabic wordmark
    ar.animate([
      { opacity: 0, transform: 'translateY(7px)' },
      { opacity: 1, transform: 'translateY(0)' }
    ], { duration: 500, delay: 1700, easing: EASE_OUT, fill: 'both' })

    // Hold and exit
    const exitTimer = setTimeout(() => {
      setMode('hidden')
    }, 2800) // Held for a brief moment after animation finishes at ~2.2s

    return () => clearTimeout(exitTimer)
  }, [mode, isReduced])

  const isHidden = mode === 'hidden'

  return (
    <div 
      id="brand-loader-overlay"
      aria-live="polite"
      role="status"
      className={`
        fixed inset-0 z-[80] flex items-center justify-center bg-white
        transition-opacity duration-500 pointer-events-none
        ${isHidden ? 'opacity-0' : 'opacity-100 pointer-events-auto'}
      `}
      style={{
        display: isReduced ? 'none' : undefined
      }}
    >
      <div className="w-[min(78vw,460px)]">
        <LogoMarkSVG ref={svgRef} className="w-full h-auto" />
      </div>
    </div>
  )
}
