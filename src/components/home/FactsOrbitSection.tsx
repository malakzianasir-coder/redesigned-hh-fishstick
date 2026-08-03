'use client'

import { useEffect, useRef, useState } from 'react'

type FactsStats = {
  '5_year_totals_and_breakdowns_2021_2025': {
    opd_patients_served_total: number
    ipd_patients_served_total: number
    dialysis_performed_total: number
    surgeries_performed_total: number
    gynae_patients_served_total: number
    eye_patients_served_total: number
    dental_patients_served_total: number
    services_rendered_2021_2025: {
      laboratory: { total: number; free_percentage: number }
      ultrasound: { total: number; free_percentage: number }
      x_ray: { total: number; free_percentage: number }
    }
  }
}

type StatItem = {
  value: number
  label: string
  align?: 'end' | 'start' | 'center'
}

function formatNumber(value: number) {
  return value.toLocaleString('en-PK')
}

function CountUp({
  value,
  active,
  className,
}: {
  value: number
  active: boolean
  className?: string
}) {
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

  return <span className={className}>{formatNumber(display)}</span>
}

function StatOrbit({ item, active }: { item: StatItem; active: boolean }) {
  const alignClass =
    item.align === 'end' ? 'stat-orbit--end' : item.align === 'start' ? 'stat-orbit--start' : ''

  return (
    <div className={`stat-orbit ${alignClass}`}>
      <CountUp
        value={item.value}
        active={active}
        className="text-h4M font-bold leading-[120%] text-primary-red lg:text-h4"
      />
      <span className="text-b14 leading-[150%] text-primary-blue/85">{item.label}</span>
    </div>
  )
}

export function FactsOrbitSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [stats, setStats] = useState<FactsStats | null>(null)
  const [active, setActive] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch('/data/facts-stats.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load facts stats')
        return res.json()
      })
      .then((data: FactsStats) => setStats(data))
      .catch(() => setError(true))
  }, [])

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setActive(true)
          observer.disconnect()
        }
      },
      { threshold: 0.25 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const totals = stats?.['5_year_totals_and_breakdowns_2021_2025']
  const services = totals?.services_rendered_2021_2025

  const leftStats: StatItem[] = totals
    ? [
        { value: totals.surgeries_performed_total, label: 'Surgeries Performed', align: 'end' },
        { value: totals.dialysis_performed_total, label: 'Dialysis Performed', align: 'end' },
        { value: totals.ipd_patients_served_total, label: 'IPD Patients Served', align: 'end' },
      ]
    : []

  const rightStats: StatItem[] =
    services && totals
      ? [
          {
            value: services.laboratory.total,
            label: `Laboratory (${services.laboratory.free_percentage}% free)`,
            align: 'start',
          },
          {
            value: services.ultrasound.total,
            label: `Ultrasound (${services.ultrasound.free_percentage}% free)`,
            align: 'start',
          },
          {
            value: services.x_ray.total,
            label: `X-Ray (${services.x_ray.free_percentage}% free)`,
            align: 'start',
          },
        ]
      : []

  const bottomStats: StatItem[] = totals
    ? [
        { value: totals.gynae_patients_served_total, label: 'Gynae patients served' },
        { value: totals.eye_patients_served_total, label: 'Eye patients served' },
        { value: totals.dental_patients_served_total, label: 'Dental patients served' },
      ]
    : []

  return (
    <section
      ref={sectionRef}
      id="glance"
      className="section-anchor border-t border-dark-gray/15 bg-white"
    >
      <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
        <div className="flex flex-col gap-[6px] text-center">
          <p className="kicker">By The Numbers</p>
          <h2 className="text-h3M font-bold leading-[120%] text-primary-blue lg:text-h3">
            Hijaz Hospital At a Glance
          </h2>
          <p className="mx-auto max-w-2xl text-b16 leading-[150%] text-primary-blue/85">
            2021–2025 · 5-year performance totals
          </p>
        </div>

        {error ? (
          <p className="text-center text-b14 text-warning">
            Could not load statistics. Ensure public/data/facts-stats.json exists.
          </p>
        ) : (
          <div className="facts-orbit">
            <div className="facts-orbit__side facts-orbit__side--left">
              {leftStats.map((item) => (
                <StatOrbit key={item.label} item={item} active={active} />
              ))}
            </div>

            <div className="facts-orbit__center flex justify-center">
              <div className="counter-circle">
                <CountUp
                  value={totals?.opd_patients_served_total ?? 0}
                  active={active}
                  className="relative z-[1] text-h1M font-bold leading-[110%] text-white lg:text-h1"
                />
                <span className="relative z-[1] text-b14 leading-[150%] text-white/90">
                  OPD Patients Served
                </span>
              </div>
            </div>

            <div className="facts-orbit__side facts-orbit__side--right">
              {rightStats.map((item) => (
                <StatOrbit key={item.label} item={item} active={active} />
              ))}
            </div>

            <div className="facts-orbit__bottom">
              {bottomStats.map((item) => (
                <StatOrbit key={item.label} item={item} active={active} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
