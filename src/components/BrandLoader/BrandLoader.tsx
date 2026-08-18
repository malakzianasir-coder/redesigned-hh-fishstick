'use client'

import React, { useEffect, useState, useLayoutEffect, useRef } from 'react'
import { useLenis } from 'lenis/react'
import { LogoMarkSVG } from './LogoMarkSVG'

type Mode = 'hidden' | 'intro' | 'exit'

export function BrandLoader() {
  const [mode, setMode] = useState<Mode>('intro')
  const [isReduced, setIsReduced] = useState(false)
  const lenis = useLenis()
  const svgRef = useRef<SVGSVGElement>(null)
  
  // Easing constants
  const EASE_OUT = 'cubic-bezier(.22, 1, .36, 1)'
  const EASE_INOUT = 'cubic-bezier(.65, 0, .35, 1)'
  const EASE_FLIP = 'cubic-bezier(0.76, 0, 0.24, 1)'

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
    if (isReduced || !svgRef.current) return

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

    const animations: Animation[] = []

    // Stage 1: Moon drops and scales
    animations.push(moon.animate([
      { opacity: 0, transform: 'scale(.72) translateY(-20px)' },
      { opacity: 1, transform: 'scale(1) translateY(0)', offset: .55 },
      { opacity: 1, transform: 'scale(1) translateY(0)' }
    ], { duration: 600, easing: EASE_OUT, fill: 'both' }))

    // Stage 2: HH monogram fades in
    animations.push(hh.animate([
      { opacity: 0, transform: 'scale(.8)' },
      { opacity: 1, transform: 'scale(1)' }
    ], { duration: 500, delay: 400, easing: EASE_OUT, fill: 'both' }))

    // Stage 3: Slide left
    animations.push(slide.animate([
      { transform: 'translateX(84.5px)' },
      { transform: 'translateX(0px)' }
    ], { duration: 600, delay: 1000, easing: EASE_INOUT, fill: 'both' }))

    // Stage 4a: English wordmark
    letters.forEach((el, i) => {
      animations.push(el.animate([
        { opacity: 0, transform: 'translateY(7px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], { duration: 400, delay: 1200 + i * 40, easing: EASE_OUT, fill: 'both' }))
    })

    // Stage 4b: Arabic wordmark
    animations.push(ar.animate([
      { opacity: 0, transform: 'translateY(7px)' },
      { opacity: 1, transform: 'translateY(0)' }
    ], { duration: 500, delay: 1700, easing: EASE_OUT, fill: 'both' }))

    let isUnmounted = false
    const exitTimer = setTimeout(() => {
      if (!isUnmounted) setMode('exit')
    }, 3800) // Held for a full second longer after animation finishes

    return () => {
      isUnmounted = true
      clearTimeout(exitTimer)
      // We only want to cancel if the component actually unmounts prematurely, 
      // not just because mode changed (which we prevented by removing mode from deps).
      animations.forEach(anim => anim.cancel())
    }
  }, [isReduced])

  // 4. Exit Fade Animation
  useEffect(() => {
    if (mode !== 'exit' || isReduced) return

    const overlay = document.getElementById('brand-loader-overlay')
    const targetLogo = document.getElementById('site-header-logo') || document.querySelector('header img[alt="Hijaz Hospital"]')

    const duration = 1000 // Smooth 1-second fade out of the white screen

    if (!overlay) {
      setMode('hidden')
      return
    }

    const overlayAnim = overlay.animate([
      { opacity: 1 },
      { opacity: 0 }
    ], { duration, easing: 'ease-in-out', fill: 'forwards' })

    let targetAnim: Animation | null = null

    if (targetLogo) {
      const targetEl = targetLogo as HTMLElement
      // Animate the real header logo fading in and scaling slightly.
      // Delay it by 800ms so it appears towards the very end of the white screen fading.
      // MUST use fill: 'both' so it stays invisible (opacity: 0) during the delay!
      targetAnim = targetEl.animate([
        { opacity: 0, transform: 'scale(0.95)' },
        { opacity: 1, transform: 'scale(1)' }
      ], { duration: 800, delay: 800, easing: 'ease-out', fill: 'both' })
    }

    // Safe fallback timer (add the delay to the overall duration)
    const safeTimer = setTimeout(() => {
      setMode('hidden')
    }, duration + 800 + 50)

    overlayAnim.onfinish = () => {
      // Don't set mode hidden until the target anim finishes, otherwise the overlay is gone
      // but we wait for safeTimer to actually remove the overlay DOM. Actually, setting mode='hidden' 
      // sets display:none on the overlay which is fine, but we don't want to kill the component early.
      // Wait, if we setMode('hidden'), the component re-renders but the targetLogo is outside.
      // Let's just rely on the safe timer or targetAnim.onfinish.
    }
    
    if (targetAnim) {
      targetAnim.onfinish = () => {
        clearTimeout(safeTimer)
        setMode('hidden')
      }
    } else {
      overlayAnim.onfinish = () => {
        clearTimeout(safeTimer)
        setMode('hidden')
      }
    }

    return () => {
      clearTimeout(safeTimer)
      overlayAnim.cancel()
      if (targetAnim) targetAnim.cancel()
    }
  }, [mode, isReduced])

  const isHidden = mode === 'hidden'

  return (
    <div 
      id="brand-loader-overlay"
      aria-live="polite"
      role="status"
      className={`
        fixed inset-0 z-[80] flex items-center justify-center pointer-events-none
        ${isHidden ? 'hidden' : 'pointer-events-auto'}
      `}
      style={{
        display: isReduced || isHidden ? 'none' : undefined
      }}
    >
      <div id="brand-loader-bg" className="absolute inset-0 bg-white" />
      <div id="loader-logo-wrapper" className="relative w-[min(78vw,460px)] origin-center">
        <LogoMarkSVG ref={svgRef} className="w-full h-auto" />
      </div>
    </div>
  )
}
