'use client'

import React, { useEffect, useState, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export function PageProgress() {
  const glowRedRef = useRef<HTMLDivElement>(null)
  const glowNavyRef = useRef<HTMLDivElement>(null)
  const glowGreyRef = useRef<HTMLDivElement>(null)
  const glowCoreRef = useRef<HTMLDivElement>(null)

  // ... (keep the existing state and path logic)
  const [state, setState] = useState<'idle' | 'loading' | 'completing'>('idle')
  const [progress, setProgress] = useState(0)
  
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPath = useRef<string | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const completeTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const startTime = useRef<number>(0)

  // Initialize path on mount without triggering effect
  useEffect(() => {
    currentPath.current = pathname + (searchParams?.toString() || '')
  }, [])

  const start = () => {
    setState('loading')
    setProgress(5)
    startTime.current = Date.now()

    if (intervalRef.current) clearInterval(intervalRef.current)
    if (completeTimeoutRef.current) clearTimeout(completeTimeoutRef.current)

    intervalRef.current = setInterval(() => {
      setProgress(p => {
        if (p >= 85) return p
        return p + Math.random() * 5
      })
    }, 150)
  }

  const complete = () => {
    if (completeTimeoutRef.current) clearTimeout(completeTimeoutRef.current)

    const finish = () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      setProgress(100)
      setState('completing')
      
      setTimeout(() => {
        setState('idle')
        setTimeout(() => {
          setProgress(0)
        }, 300)
      }, 300)
    }

    const elapsed = Date.now() - startTime.current
    if (elapsed < 600) {
      completeTimeoutRef.current = setTimeout(finish, 600 - elapsed)
    } else {
      finish()
    }
  }

  // Listen for route changes to complete the progress
  useEffect(() => {
    const newPath = pathname + (searchParams?.toString() || '')
    if (currentPath.current !== null && currentPath.current !== newPath) {
      currentPath.current = newPath
      if (state !== 'idle') complete()
    }
  }, [pathname, searchParams, state])

  // Listen for internal clicks to start the progress
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = (e.target as HTMLElement).closest('a')
      if (!a) return
      const href = a.getAttribute('href')
      const target = a.getAttribute('target')
      if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:') || target === '_blank') return
      const url = new URL(a.href, window.location.href)
      if (url.origin !== window.location.origin) return
      if (url.pathname === window.location.pathname && url.search === window.location.search) return

      start()
    }

    document.addEventListener('click', handleClick, { capture: true })
    return () => document.removeEventListener('click', handleClick, { capture: true })
  }, [])

  // Magic Glow WAAPI Animations (Crossfading 3 Brand Colors)
  useEffect(() => {
    if (state === 'idle') return

    const gRed = glowRedRef.current
    const gNavy = glowNavyRef.current
    const gGrey = glowGreyRef.current
    const gCore = glowCoreRef.current
    if (!gRed || !gNavy || !gGrey || !gCore) return

    // Red Peaks at 0% and 100%
    const animRed = gRed.animate([
      { opacity: 0.6, transform: 'translate(-50%, -50%) scale(1)', offset: 0 },
      { opacity: 0, transform: 'translate(-50%, -50%) scale(1.1)', offset: 0.33 },
      { opacity: 0, transform: 'translate(-50%, -50%) scale(1.1)', offset: 0.66 },
      { opacity: 0.6, transform: 'translate(-50%, -50%) scale(1)', offset: 1 }
    ], { duration: 3000, iterations: Infinity, easing: 'ease-in-out' })

    // Navy Peaks at 33%
    const animNavy = gNavy.animate([
      { opacity: 0, transform: 'translate(-50%, -50%) scale(1.1)', offset: 0 },
      { opacity: 0.6, transform: 'translate(-50%, -50%) scale(1)', offset: 0.33 },
      { opacity: 0, transform: 'translate(-50%, -50%) scale(1.1)', offset: 0.66 },
      { opacity: 0, transform: 'translate(-50%, -50%) scale(1.1)', offset: 1 }
    ], { duration: 3000, iterations: Infinity, easing: 'ease-in-out' })

    // Grey Peaks at 66%
    const animGrey = gGrey.animate([
      { opacity: 0, transform: 'translate(-50%, -50%) scale(1.1)', offset: 0 },
      { opacity: 0, transform: 'translate(-50%, -50%) scale(1.1)', offset: 0.33 },
      { opacity: 0.6, transform: 'translate(-50%, -50%) scale(1)', offset: 0.66 },
      { opacity: 0, transform: 'translate(-50%, -50%) scale(1.1)', offset: 1 }
    ], { duration: 3000, iterations: Infinity, easing: 'ease-in-out' })

    // Bright White-hot core pulsing faster
    const animCore = gCore.animate([
      { transform: 'translate(-50%, -50%) scale(0.8)', opacity: 0.7 },
      { transform: 'translate(-50%, -50%) scale(1.2)', opacity: 1 },
      { transform: 'translate(-50%, -50%) scale(0.8)', opacity: 0.7 }
    ], { duration: 1400, iterations: Infinity, easing: 'ease-in-out' })

    return () => {
      animRed.cancel()
      animNavy.cancel()
      animGrey.cancel()
      animCore.cancel()
    }
  }, [state])

  return (
    <>
      {/* 0. The Page Desaturation Overlay */}
      <div 
        className="fixed inset-0 z-[999998] pointer-events-none"
        style={{
          opacity: state === 'idle' ? 0 : 1,
          transition: 'opacity 300ms ease',
          backdropFilter: 'saturate(0.90) blur(4px)',
          WebkitBackdropFilter: 'saturate(0.90) blur(4px)',
        }}
      />

      <div 
        className="fixed top-0 left-0 w-full h-[2px] z-[999999] pointer-events-none"
        style={{
          opacity: state === 'idle' ? 0 : 1,
          transition: state === 'idle' ? 'opacity 300ms ease' : 'none',
        }}
      >
      {/* 1. The Crisp, Unblurred Progress Bar */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px]"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, #E30016 50%, transparent 100%)',
          boxShadow: '0 0 10px #E30016',
          width: `${progress}%`,
          transition: state === 'idle' ? 'none' : 'width 200ms ease-out',
        }}
      />

      {/* 2. The Magical Centered Glows (Crossfading Brand Colors) */}
      <div className="absolute top-0 left-0 w-full h-0">
        
        {/* Illuminated Dots Grid */}
        <div 
          className="absolute top-0 left-1/2 w-[800px] h-[150px] opacity-40"
          style={{
            backgroundImage: 'radial-gradient(#1B2441 1px, transparent 1px)',
            backgroundSize: '16px 16px',
            backgroundPosition: 'center top',
            maskImage: 'radial-gradient(ellipse at top, black 0%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse at top, black 0%, transparent 70%)',
            transform: 'translateX(-50%)'
          }}
        />

        {/* Theme Red Aura */}
        <div 
          ref={glowRedRef}
          className="absolute top-0 w-[800px] h-[150px] opacity-0"
          style={{
            background: 'radial-gradient(ellipse at top, #E30016 0%, transparent 70%)',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        />

        {/* Theme Navy Aura */}
        <div 
          ref={glowNavyRef}
          className="absolute top-0 w-[800px] h-[150px] opacity-0"
          style={{
            background: 'radial-gradient(ellipse at top, #1B2441 0%, transparent 70%)',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        />

        {/* Theme Grey Aura */}
        <div 
          ref={glowGreyRef}
          className="absolute top-0 w-[800px] h-[150px] opacity-0"
          style={{
            background: 'radial-gradient(ellipse at top, #6B7183 0%, transparent 70%)',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        />

        {/* Small fast white-hot core */}
        <div 
          ref={glowCoreRef}
          className="absolute top-0 w-[250px] h-[60px] opacity-80"
          style={{
            background: 'radial-gradient(ellipse at top, #ffffff 0%, transparent 70%)',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        />

      </div>
    </div>
    </>
  )
}
