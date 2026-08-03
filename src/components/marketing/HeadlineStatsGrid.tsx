'use client'

import { useEffect, useRef, useState } from 'react'

import type { HeadlineStat } from '@/lib/content/types'

function formatNumber(value: number) {
  return value.toLocaleString('en-US')
}

function CountUpStat({ value, label, size, active }: HeadlineStat & { active: boolean }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!active) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setDisplay(value)
      return
    }
    const duration = 1400
    const start = performance.now()
    let frame = 0
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration)
      const eased = 1 - (1 - progress) ** 3
      setDisplay(Math.round(value * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [active, value])

  const valueClass =
    size === 'md' ? 'text-h4M font-bold text-primary-blue font-display lg:text-h4' : 'text-h2M font-bold text-primary-red font-display lg:text-h2'

  return (
    <article className="card p-4 text-center lg:p-5">
      <p className={valueClass}>{formatNumber(display)}</p>
      <p className="mt-1 text-b14 text-dark-gray">{label}</p>
    </article>
  )
}

export function HeadlineStatsGrid({
  primary,
  secondary,
}: {
  primary: HeadlineStat[]
  secondary?: HeadlineStat[]
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setActive(true)
          observer.disconnect()
        }
      },
      { threshold: 0.35 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="flex flex-col gap-6">
      <div className="card-grid card-grid--4">
        {primary.map((stat) => (
          <CountUpStat key={stat.label} {...stat} active={active} />
        ))}
      </div>
      {secondary && secondary.length > 0 ? (
        <div className="card-grid card-grid--3 mx-auto max-w-3xl">
          {secondary.map((stat) => (
            <CountUpStat key={stat.label} {...stat} size="md" active={active} />
          ))}
        </div>
      ) : null}
    </div>
  )
}
