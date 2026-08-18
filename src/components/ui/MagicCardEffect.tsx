'use client'

import React, { useEffect, useRef } from 'react'

export function MagicCardEffect() {
  const ref = useRef<HTMLDivElement>(null)
  
  const glowRedRef = useRef<HTMLDivElement>(null)
  const glowNavyRef = useRef<HTMLDivElement>(null)
  const glowCoreRef = useRef<HTMLDivElement>(null)
  const defaultGlowRef = useRef<HTMLDivElement>(null)

  const hoverStateRef = useRef({ isHovered: false, isIntersecting: false })
  const rectRef = useRef<DOMRect | null>(null)
  const animsRef = useRef<{
    defaultAnim?: Animation
    hoverAnims: Animation[]
  }>({ hoverAnims: [] })

  useEffect(() => {
    const parent = ref.current?.closest('.group') as HTMLElement
    if (!parent) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!hoverStateRef.current.isHovered || !rectRef.current) return
      const x = e.clientX - rectRef.current.left
      parent.style.setProperty('--mouse-x', `${x}px`)
    }

    const updatePlayStates = () => {
      const { isHovered, isIntersecting } = hoverStateRef.current
      const { defaultAnim, hoverAnims } = animsRef.current

      if (defaultAnim) {
        if (isIntersecting) {
          if (defaultAnim.playState === 'paused') defaultAnim.play()
        } else {
          if (defaultAnim.playState === 'running') defaultAnim.pause()
        }
      }

      hoverAnims.forEach(anim => {
        if (isIntersecting && isHovered) {
          if (anim.playState === 'paused') anim.play()
        } else {
          if (anim.playState === 'running') anim.pause()
        }
      })
    }

    const handleMouseEnter = () => {
      hoverStateRef.current.isHovered = true
      rectRef.current = parent.getBoundingClientRect()
      updatePlayStates()
    }

    const handleMouseLeave = () => {
      hoverStateRef.current.isHovered = false
      updatePlayStates()
    }

    parent.style.setProperty('--mouse-x', '50%')
    parent.addEventListener('mouseenter', handleMouseEnter)
    parent.addEventListener('mouseleave', handleMouseLeave)
    parent.addEventListener('mousemove', handleMouseMove)

    return () => {
      parent.removeEventListener('mouseenter', handleMouseEnter)
      parent.removeEventListener('mouseleave', handleMouseLeave)
      parent.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  useEffect(() => {
    const container = ref.current
    const gRed = glowRedRef.current
    const gNavy = glowNavyRef.current
    const gCore = glowCoreRef.current
    const defaultGlow = defaultGlowRef.current
    if (!container || !gRed || !gNavy || !gCore || !defaultGlow) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const baseDur = 6000 
    let childIndex = 0
    const parentCard = container.closest('.card-interactive')
    if (parentCard && parentCard.parentElement) {
      childIndex = Array.from(parentCard.parentElement.children).indexOf(parentCard)
    }

    const staggerOffset = -(100000 - childIndex * 800)

    const redAnim = gRed.animate(
      [
        { opacity: 1, offset: 0 },
        { opacity: 0, offset: 0.33 },
        { opacity: 0, offset: 0.66 },
        { opacity: 1, offset: 1 },
      ],
      { duration: baseDur, iterations: Infinity, easing: 'ease-in-out', delay: staggerOffset },
    )

    const navyAnim = gNavy.animate(
      [
        { opacity: 0, offset: 0 },
        { opacity: 1, offset: 0.33 },
        { opacity: 0, offset: 0.66 },
        { opacity: 0, offset: 1 },
      ],
      { duration: baseDur, iterations: Infinity, easing: 'ease-in-out', delay: staggerOffset },
    )

    const coreAnim = gCore.animate(
      [{ opacity: 0.3 }, { opacity: 0.8 }, { opacity: 0.3 }],
      { duration: 3000, iterations: Infinity, easing: 'ease-in-out', delay: staggerOffset },
    )

    const defaultAnim = defaultGlow.animate(
      [{ opacity: 0.4 }, { opacity: 1.0 }, { opacity: 0.4 }],
      { duration: 4000, iterations: Infinity, easing: 'ease-in-out', delay: staggerOffset },
    )

    const hoverAnims = [redAnim, navyAnim, coreAnim]
    
    animsRef.current = { defaultAnim, hoverAnims }

    defaultAnim.pause()
    hoverAnims.forEach(anim => anim.pause())

    const target = parentCard || container
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return
        hoverStateRef.current.isIntersecting = entry.isIntersecting
        
        const { isHovered, isIntersecting } = hoverStateRef.current
        
        if (isIntersecting) {
          if (defaultAnim.playState === 'paused') defaultAnim.play()
        } else {
          if (defaultAnim.playState === 'running') defaultAnim.pause()
        }

        hoverAnims.forEach(anim => {
          if (isIntersecting && isHovered) {
            if (anim.playState === 'paused') anim.play()
          } else {
            if (anim.playState === 'running') anim.pause()
          }
        })
      },
      { rootMargin: '50px 0px 50px 0px' },
    )

    observer.observe(target)

    return () => {
      observer.disconnect()
      defaultAnim.cancel()
      hoverAnims.forEach((anim) => anim.cancel())
    }
  }, [])

  return (
    <>
      {/* Default Idle Glow (Fades out on hover) */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-[inherit] transition-opacity duration-700 opacity-100 group-hover:opacity-0"
      >
        <div 
          ref={defaultGlowRef}
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(400px 200px at 50% 0%, rgba(27, 36, 65, 0.12) 0%, transparent 100%)',
          }}
        />
      </div>

      {/* Interactive Hover Glow (Fades in on hover) */}
      <div ref={ref} className="absolute inset-0 z-0 pointer-events-none overflow-hidden transition-opacity duration-700 opacity-0 group-hover:opacity-100 rounded-[inherit]">
          
          {/* Flashlight Dots Grid Overlay */}
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(#1B2441 1px, transparent 1px)',
              backgroundSize: '16px 16px',
              opacity: 0.25,
              maskImage: 'radial-gradient(250px 200px at var(--mouse-x) 100%, black 0%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(250px 200px at var(--mouse-x) 100%, black 0%, transparent 100%)',
            }}
          />

          {/* Theme Red Aura */}
          <div 
            ref={glowRedRef}
            className="absolute inset-0 opacity-0"
            style={{
              background: 'radial-gradient(350px 150px at var(--mouse-x) 100%, rgba(227, 0, 22, 0.18) 0%, transparent 100%)',
            }}
          />

          {/* Theme Navy Aura */}
          <div 
            ref={glowNavyRef}
            className="absolute inset-0 opacity-0"
            style={{
              background: 'radial-gradient(350px 150px at var(--mouse-x) 100%, rgba(27, 36, 65, 0.15) 0%, transparent 100%)',
            }}
          />

          {/* Small fast white-hot core */}
          <div 
            ref={glowCoreRef}
            className="absolute inset-0 opacity-0"
            style={{
              background: 'radial-gradient(120px 40px at var(--mouse-x) 100%, rgba(255, 255, 255, 0.9) 0%, transparent 100%)',
            }}
          />

          {/* Crisp glowing bottom border line */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-[2px]"
            style={{ 
              background: 'linear-gradient(90deg, transparent calc(var(--mouse-x) - 100px), #E30016 var(--mouse-x), transparent calc(var(--mouse-x) + 100px))',
              boxShadow: '0 0 10px 1px rgba(227, 0, 22, 0.4)',
            }}
          />
      </div>
    </>
  )
}
