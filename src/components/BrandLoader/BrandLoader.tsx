'use client'

import React, { useEffect, useState, useLayoutEffect, useRef, useCallback } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useLenis } from 'lenis/react'
import { LogoMarkSVG } from './LogoMarkSVG'
import { brandTransition } from './brandTransition'

type Mode = 'hidden' | 'intro' | 'steady'

export function BrandLoader() {
  const [mode, setMode] = useState<Mode>('hidden')
  const [isReduced, setIsReduced] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const lenis = useLenis()
  const svgRef = useRef<SVGSVGElement>(null)

  // Track the initial path to avoid triggering steady transition on first mount
  const initialPath = useRef<string | null>(null)
  const holdTimer = useRef<NodeJS.Timeout | null>(null)
  
  // Easing constants
  const EASE_OUT = 'cubic-bezier(.22, 1, .36, 1)'
  const EASE_INOUT = 'cubic-bezier(.65, 0, .35, 1)'

  // 1. Initial Mount: Check Session Storage and Reduced Motion
  useLayoutEffect(() => {
    initialPath.current = pathname + (searchParams?.toString() || '')

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // Also consider Save-Data
    const connection = (navigator as any).connection
    const saveData = connection?.saveData === true

    if (reduced || saveData) {
      setIsReduced(true)
      return
    }

    const hasPlayed = sessionStorage.getItem('hh_brand_intro_played')
    if (!hasPlayed) {
      setMode('intro')
    }
  }, []) // Empty dependency array, runs once on mount

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
    const breath = svg.querySelector('#stage-breath') as HTMLElement
    const letters = Array.from(svg.querySelectorAll('#wordmark-en .letter')) as HTMLElement[]
    const ar = svg.querySelector('#ar') as HTMLElement
    const shimmer = svg.querySelector('#logo-shimmer-sweep') as HTMLElement

    if (!moon || !hh || !slide || !letters.length || !ar || !shimmer) return

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
      sessionStorage.setItem('hh_brand_intro_played', 'true')
      
      // We could use WAAPI to fade out the wrapper, but setting mode triggers a CSS transition
      setMode('hidden')
      
      // Start the infinite steady states after intro finishes
      breath.animate([
        { transform: 'scale(1)' },
        { transform: 'scale(1.025)' },
        { transform: 'scale(1)' }
      ], { duration: 1700, iterations: Infinity, easing: 'ease-in-out' })
  
      shimmer.animate([
        { transform: 'translateX(0px)' },
        { transform: 'translateX(500px)' }
      ], { duration: 2600, iterations: Infinity, easing: 'ease-in-out' })

    }, 2500)

    return () => clearTimeout(exitTimer)
  }, [mode, isReduced])

  // 4. Soft Navigation & Imperative Transitions
  
  const showTransition = useCallback(() => {
    if (isReduced) return
    setMode('steady')

    // Add a minimum hold time so it doesn't just flash if the page loads in 10ms
    if (holdTimer.current) clearTimeout(holdTimer.current)
    holdTimer.current = setTimeout(() => {
      // The hide logic depends on if the route has actually committed.
      // brandTransition.done() or a pathname change will close it.
    }, 350)
  }, [isReduced])

  const hideTransition = useCallback(() => {
    // If the hold timer is still running, let it finish before hiding
    // But since this is a simple implementation, we'll just delay the hide if needed
    setTimeout(() => {
      if (brandTransition.getIsTransitioning()) return // wait for programmatic done
      setMode('hidden')
    }, 350) // Minimum display time
  }, [])

  // Listen to route changes
  useEffect(() => {
    const currentPath = pathname + (searchParams?.toString() || '')
    if (initialPath.current === currentPath) return // Ignore first mount
    
    initialPath.current = currentPath // update ref
    hideTransition()
  }, [pathname, searchParams, hideTransition])

  // Subscribe to imperative API
  useEffect(() => {
    const unsubShow = brandTransition.subscribe(() => {
      if (brandTransition.getIsTransitioning()) {
        showTransition()
      } else {
        hideTransition()
      }
    })
    return unsubShow
  }, [showTransition, hideTransition])

  // Intercept internal links for the 150ms threshold
  useEffect(() => {
    if (isReduced) return

    let clickTimer: NodeJS.Timeout | null = null

    const handleClick = (e: MouseEvent) => {
      // Ignore if default prevented or modified click
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return

      // Find closest anchor
      const a = (e.target as HTMLElement).closest('a')
      if (!a) return

      const href = a.getAttribute('href')
      const target = a.getAttribute('target')
      
      // Ignore external, hash links, mailto, etc
      if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:') || target === '_blank') return
      
      // Ignore if it's the exact same path
      const url = new URL(a.href)
      if (url.pathname === window.location.pathname && url.search === window.location.search) return

      // Wait 150ms before showing loader
      clickTimer = setTimeout(() => {
        showTransition()
      }, 150)
    }

    document.addEventListener('click', handleClick, { capture: true })

    return () => {
      document.removeEventListener('click', handleClick, { capture: true })
      if (clickTimer) clearTimeout(clickTimer)
    }
  }, [isReduced, showTransition])


  // Avoid rendering anything interactive if we're hidden, unless we're fading out
  const isHidden = mode === 'hidden'
  const isIntro = mode === 'intro'
  const isSteady = mode === 'steady'

  return (
    <div 
      aria-live="polite"
      role="status"
      className={`
        fixed inset-0 z-[80] flex items-center justify-center bg-white/75 backdrop-blur-md
        transition-opacity duration-300 pointer-events-none
        ${isHidden ? 'opacity-0' : 'opacity-100 pointer-events-auto'}
      `}
      style={{
        // If reduced motion, keep it permanently hidden 
        display: isReduced ? 'none' : undefined
      }}
    >
      <div 
        className="w-[min(78vw,460px)]"
        style={{
          // For intro, we start hidden if the script hasn't run yet.
          // But our CSS will handle .has-played-intro hiding.
        }}
      >
        <LogoMarkSVG 
          ref={svgRef} 
          className={`
            w-full h-auto 
            ${isSteady ? 'logo-steady-mode' : ''}
          `} 
        />
      </div>
    </div>
  )
}
