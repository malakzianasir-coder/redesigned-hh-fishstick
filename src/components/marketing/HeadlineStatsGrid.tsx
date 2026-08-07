'use client'

import { useEffect, useRef, useState } from 'react'

import type { HeadlineStat, ServiceStatCard } from '@/lib/content/types'

function formatNumber(value: number) {
  return value.toLocaleString('en-US')
}

function useCountUp(value: number, active: boolean, duration = 1400) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!active) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setDisplay(value)
      return
    }
    const start = performance.now()
    let frame = 0
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration)
      setDisplay(Math.round(value * (1 - (1 - progress) ** 3)))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [active, duration, value])

  return display
}

function CountUpStat({
  value,
  label,
  size,
  active,
}: HeadlineStat & { active: boolean }) {
  const display = useCountUp(value, active)

  const valueClass =
    size === 'md'
      ? 'font-display text-h4M font-bold text-primary-blue lg:text-h4'
      : 'font-display text-h2M font-bold text-primary-red lg:text-h2'

  return (
    <div className="flex flex-col items-center justify-center px-4 py-6 text-center lg:px-5 lg:py-7">
      <p className={valueClass}>{formatNumber(display)}</p>
      <p className="mt-1.5 text-b14 text-dark-gray">{label}</p>
    </div>
  )
}

function ServiceStatCell({
  label,
  total,
  freePercentage,
  paidPercentage,
  active,
}: ServiceStatCard & { active: boolean }) {
  const display = useCountUp(total, active, 1200)

  return (
    <div className="flex flex-col gap-3 px-4 py-6 lg:px-5 lg:py-7">
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
    </div>
  )
}

export function HeadlineStatsGrid({
  primary,
  secondary,
  serviceStats,
}: {
  primary: HeadlineStat[]
  secondary?: HeadlineStat[]
  serviceStats?: ServiceStatCard[]
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
      { threshold: 0.2 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const hasPrimary = primary.length > 0
  const hasSecondary = Boolean(secondary && secondary.length > 0)
  const hasServices = Boolean(serviceStats && serviceStats.length > 0)

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-2xl border border-dark-gray/15 bg-white shadow-e1"
    >
      {hasPrimary ? (
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {primary.map((stat, index) => (
            <div
              key={stat.label}
              className={[
                index % 2 === 1 ? 'border-l border-dark-gray/10' : '',
                index >= 2 ? 'border-t border-dark-gray/10 lg:border-t-0' : '',
                index > 0 ? 'lg:border-l lg:border-dark-gray/10' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <CountUpStat {...stat} active={active} />
            </div>
          ))}
        </div>
      ) : null}

      {hasSecondary ? (
        <div
          className={`grid grid-cols-1 sm:grid-cols-3 ${hasPrimary ? 'border-t border-dark-gray/15' : ''}`}
        >
          {secondary!.map((stat, index) => (
            <div
              key={stat.label}
              className={index > 0 ? 'border-t border-dark-gray/10 sm:border-l sm:border-t-0' : undefined}
            >
              <CountUpStat {...stat} size="md" active={active} />
            </div>
          ))}
        </div>
      ) : null}

      {hasServices ? (
        <div
          className={`grid grid-cols-2 bg-cardbg/40 lg:grid-cols-4 ${hasPrimary || hasSecondary ? 'border-t border-dark-gray/15' : ''}`}
        >
          {serviceStats!.map((stat, index) => (
            <div
              key={stat.key}
              className={[
                index % 2 === 1 ? 'border-l border-dark-gray/10' : '',
                index >= 2 ? 'border-t border-dark-gray/10 lg:border-t-0' : '',
                index > 0 ? 'lg:border-l lg:border-dark-gray/10' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <ServiceStatCell {...stat} active={active} />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}
