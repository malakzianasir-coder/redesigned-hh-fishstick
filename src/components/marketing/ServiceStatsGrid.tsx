'use client'

import { useEffect, useRef, useState } from 'react'

import type { OurImpactRecord } from '@/lib/content/types'

function formatNumber(value: number) {
  return value.toLocaleString('en-PK')
}

function ServiceStatCard({
  label,
  total,
  freePercentage,
  paidPercentage,
  active,
}: {
  label: string
  total: number
  freePercentage: number
  paidPercentage: number
  active: boolean
}) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!active) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setDisplay(total)
      return
    }
    const duration = 1200
    const start = performance.now()
    let frame = 0
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration)
      setDisplay(Math.round(total * (1 - (1 - progress) ** 3)))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [active, total])

  return (
    <article className="card flex flex-col gap-3 p-5">
      <p className="font-display text-h4M font-bold text-primary-red lg:text-h4">{formatNumber(display)}</p>
      <p className="text-b14 font-semibold text-primary-blue">{label}</p>
      <div className="split-bar">
        <span className="free" style={{ width: `${freePercentage}%` }} />
        <span className="paid" style={{ width: `${paidPercentage}%` }} />
      </div>
      <div className="flex justify-between text-b12">
        <span className="font-semibold text-primary-red">{freePercentage}% Free</span>
        <span className="font-semibold text-primary-blue">{paidPercentage}% Paid</span>
      </div>
    </article>
  )
}

export function ServiceStatsGrid({ stats }: { stats: OurImpactRecord['serviceStats'] }) {
  const statsRef = useRef<HTMLDivElement>(null)
  const [statsActive, setStatsActive] = useState(false)

  useEffect(() => {
    const node = statsRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setStatsActive(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={statsRef} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <ServiceStatCard
          key={stat.key}
          label={stat.label}
          total={stat.total}
          freePercentage={stat.freePercentage}
          paidPercentage={stat.paidPercentage}
          active={statsActive}
        />
      ))}
    </div>
  )
}
