'use client'

import Link from 'next/link'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

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
  id: string
  value: number
  label: string
  align?: 'end' | 'start' | 'center'
}

const HERO_ID = 'opd'
const FACTS_STATS_HREF = '/our-impact#facts-statistics'
const INVITE_EVERY_MS = 5000
const INVITE_STAGGER_MS = 90
const RESET_MS = 10000
const GRADIENT_HOME = { x: 32, y: 28 }
const GRADIENT_MAX_OFFSET = 44
const GRADIENT_IDLE_MS = 500
const GRADIENT_LERP = 0.065

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
  const displayRef = useRef(0)

  useEffect(() => {
    displayRef.current = display
  }, [display])

  useEffect(() => {
    if (!active) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setDisplay(value)
      displayRef.current = value
      return
    }

    const duration = 900
    const start = performance.now()
    const from = displayRef.current
    let frame = 0

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration)
      const eased = 1 - (1 - progress) ** 3
      const next = Math.round(from + (value - from) * eased)
      setDisplay(next)
      displayRef.current = next
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [active, value])

  return <span className={className}>{formatNumber(display)}</span>
}

function StatOrbitButton({
  item,
  active,
  selected,
  visible,
  inviting,
  index,
  onSelect,
}: {
  item: StatItem
  active: boolean
  selected: boolean
  visible: boolean
  inviting: boolean
  index: number
  onSelect: (id: string) => void
}) {
  const alignClass =
    item.align === 'end' ? 'stat-orbit--end' : item.align === 'start' ? 'stat-orbit--start' : ''

  return (
    <button
      type="button"
      className={[
        'stat-orbit',
        alignClass,
        visible ? 'is-visible' : '',
        inviting ? 'is-inviting' : '',
        selected ? 'is-active' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ '--i': index } as React.CSSProperties}
      aria-pressed={selected}
      onClick={() => onSelect(item.id)}
    >
      <CountUp
        value={item.value}
        active={active}
        className="text-h4M font-bold leading-[120%] text-primary-red lg:text-h4"
      />
      <span className="text-b14 leading-[150%] text-primary-blue/85">{item.label}</span>
    </button>
  )
}

export function FactsOrbitSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const orbRef = useRef<HTMLButtonElement>(null)
  const [stats, setStats] = useState<FactsStats | null>(null)
  const [active, setActive] = useState(false)
  const [error, setError] = useState(false)
  const [focusId, setFocusId] = useState(HERO_ID)
  const [statsVisible, setStatsVisible] = useState(false)
  const [invitingIds, setInvitingIds] = useState<Set<string>>(new Set())
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const inviteIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

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
          setStatsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.25 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const totals = stats?.['5_year_totals_and_breakdowns_2021_2025']
  const heroValue = totals?.opd_patients_served_total ?? 0
  const heroLabel = 'OPD Patients Served'

  const { leftStats, rightStats, bottomStats, allStats } = useMemo(() => {
    if (!totals) {
      return {
        leftStats: [] as StatItem[],
        rightStats: [] as StatItem[],
        bottomStats: [] as StatItem[],
        allStats: [] as StatItem[],
      }
    }

    const svc = totals.services_rendered_2021_2025
    const left: StatItem[] = [
      { id: 'surgeries', value: totals.surgeries_performed_total, label: 'Surgeries Performed', align: 'end' },
      { id: 'dialysis', value: totals.dialysis_performed_total, label: 'Dialysis Performed', align: 'end' },
      { id: 'ipd', value: totals.ipd_patients_served_total, label: 'IPD Patients Served', align: 'end' },
    ]

    const right: StatItem[] = svc
      ? [
          {
            id: 'lab',
            value: svc.laboratory.total,
            label: `Laboratory (${svc.laboratory.free_percentage}% free)`,
            align: 'start',
          },
          {
            id: 'ultrasound',
            value: svc.ultrasound.total,
            label: `Ultrasound (${svc.ultrasound.free_percentage}% free)`,
            align: 'start',
          },
          {
            id: 'xray',
            value: svc.x_ray.total,
            label: `X-Ray (${svc.x_ray.free_percentage}% free)`,
            align: 'start',
          },
        ]
      : []

    const bottom: StatItem[] = [
      { id: 'gynae', value: totals.gynae_patients_served_total, label: 'Gynae patients served' },
      { id: 'eye', value: totals.eye_patients_served_total, label: 'Eye patients served' },
      { id: 'dental', value: totals.dental_patients_served_total, label: 'Dental patients served' },
    ]

    return {
      leftStats: left,
      rightStats: right,
      bottomStats: bottom,
      allStats: [...left, ...right, ...bottom],
    }
  }, [totals])

  const metricById = useMemo(
    () =>
      Object.fromEntries(
        [{ id: HERO_ID, value: heroValue, label: heroLabel }, ...allStats].map((m) => [m.id, m]),
      ),
    [allStats, heroLabel, heroValue],
  )

  const focused = metricById[focusId] ?? { id: HERO_ID, value: heroValue, label: heroLabel }

  const clearReset = useCallback(() => {
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current)
      resetTimerRef.current = null
    }
  }, [])

  const setFocus = useCallback(
    (id: string) => {
      setFocusId(id)
      clearReset()
      if (id !== HERO_ID) {
        resetTimerRef.current = setTimeout(() => setFocusId(HERO_ID), RESET_MS)
      }
    },
    [clearReset],
  )

  const handleStatSelect = useCallback(
    (id: string) => {
      setFocus(focusId === id ? HERO_ID : id)
    },
    [focusId, setFocus],
  )

  useEffect(() => {
    if (!active || allStats.length === 0) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const runInvite = () => {
      allStats.forEach((stat, index) => {
        window.setTimeout(() => {
          setInvitingIds((prev) => new Set(prev).add(stat.id))
          window.setTimeout(() => {
            setInvitingIds((prev) => {
              const next = new Set(prev)
              next.delete(stat.id)
              return next
            })
          }, 700)
        }, index * INVITE_STAGGER_MS)
      })
    }

    runInvite()
    inviteIntervalRef.current = setInterval(runInvite, INVITE_EVERY_MS)

    return () => {
      if (inviteIntervalRef.current) clearInterval(inviteIntervalRef.current)
    }
  }, [active, allStats])

  useEffect(() => () => clearReset(), [clearReset])

  useEffect(() => {
    const orb = orbRef.current
    if (!orb) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    let gradTarget = { ...GRADIENT_HOME }
    const gradCurrent = { ...GRADIENT_HOME }
    let gradFrame = 0
    let gradIdleTimer = 0

    const setGradientTarget = (x: number, y: number) => {
      gradTarget = { x, y }
      if (!gradFrame) gradFrame = requestAnimationFrame(tickGradient)
    }

    const returnGradientHome = () => {
      window.clearTimeout(gradIdleTimer)
      gradIdleTimer = 0
      setGradientTarget(GRADIENT_HOME.x, GRADIENT_HOME.y)
    }

    const setGradientFromPointer = (clientX: number, clientY: number) => {
      const rect = orb.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2

      let dx = clientX - cx
      let dy = clientY - cy
      const dist = Math.hypot(dx, dy)
      if (dist < 1) {
        setGradientTarget(GRADIENT_HOME.x, GRADIENT_HOME.y)
        return
      }

      dx /= dist
      dy /= dist

      const reach = Math.min(1, dist / (rect.width * 0.75))
      const eased = reach * reach * (3 - 2 * reach)

      setGradientTarget(
        GRADIENT_HOME.x + dx * GRADIENT_MAX_OFFSET * eased,
        GRADIENT_HOME.y + dy * GRADIENT_MAX_OFFSET * eased,
      )
    }

    const tickGradient = () => {
      gradCurrent.x += (gradTarget.x - gradCurrent.x) * GRADIENT_LERP
      gradCurrent.y += (gradTarget.y - gradCurrent.y) * GRADIENT_LERP
      orb.style.setProperty('--gx', `${gradCurrent.x}%`)
      orb.style.setProperty('--gy', `${gradCurrent.y}%`)
      const settled =
        Math.abs(gradTarget.x - gradCurrent.x) < 0.03 &&
        Math.abs(gradTarget.y - gradCurrent.y) < 0.03
      if (settled) {
        gradFrame = 0
        return
      }
      gradFrame = requestAnimationFrame(tickGradient)
    }

    const onPointerMove = (e: PointerEvent) => {
      window.clearTimeout(gradIdleTimer)
      setGradientFromPointer(e.clientX, e.clientY)
      gradIdleTimer = window.setTimeout(returnGradientHome, GRADIENT_IDLE_MS)
    }

    document.addEventListener('pointermove', onPointerMove)
    document.addEventListener('pointerleave', returnGradientHome)

    return () => {
      document.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('pointerleave', returnGradientHome)
      window.clearTimeout(gradIdleTimer)
      if (gradFrame) cancelAnimationFrame(gradFrame)
    }
  }, [active])

  let statIndex = 0

  return (
    <section
      ref={sectionRef}
      id="glance"
      className="section-anchor border-t border-dark-gray/15 bg-white"
    >
      <div className="container mx-auto flex flex-col gap-10 px-6 py-[30px] lg:gap-14 lg:px-[30px] lg:py-[60px]">
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
          <>
            <div className="facts-orbit">
              <div className="facts-orbit__side facts-orbit__side--left">
                {leftStats.map((item) => {
                  const index = statIndex++
                  return (
                    <StatOrbitButton
                      key={item.id}
                      item={item}
                      active={active}
                      selected={focusId === item.id}
                      visible={statsVisible}
                      inviting={invitingIds.has(item.id)}
                      index={index}
                      onSelect={handleStatSelect}
                    />
                  )
                })}
              </div>

              <div className="facts-orbit__center flex justify-center">
                <div className="counter-circle-wrap">
                  <div className="counter-circle-rings" aria-hidden="true" />
                  <button
                    ref={orbRef}
                    type="button"
                    className="counter-circle"
                    aria-live="polite"
                    title="Reset to OPD total"
                    onClick={() => setFocus(HERO_ID)}
                  >
                    <span className="counter-circle__bg" aria-hidden="true" />
                    <CountUp
                      value={focused.value}
                      active={active}
                      className="relative z-[1] text-h1M font-bold leading-[110%] text-white lg:text-h1"
                    />
                    <span className="relative z-[1] text-b14 leading-[150%] text-white/90">
                      {focused.label}
                    </span>
                  </button>
                </div>
              </div>

              <div className="facts-orbit__side facts-orbit__side--right">
                {rightStats.map((item) => {
                  const index = statIndex++
                  return (
                    <StatOrbitButton
                      key={item.id}
                      item={item}
                      active={active}
                      selected={focusId === item.id}
                      visible={statsVisible}
                      inviting={invitingIds.has(item.id)}
                      index={index}
                      onSelect={handleStatSelect}
                    />
                  )
                })}
              </div>

              <div className="facts-orbit__bottom">
                {bottomStats.map((item) => {
                  const index = statIndex++
                  return (
                    <StatOrbitButton
                      key={item.id}
                      item={item}
                      active={active}
                      selected={focusId === item.id}
                      visible={statsVisible}
                      inviting={invitingIds.has(item.id)}
                      index={index}
                      onSelect={handleStatSelect}
                    />
                  )
                })}
              </div>
            </div>

            <div className="flex justify-center">
              <Link href={FACTS_STATS_HREF} className="btn-ghost">
                View Facts & Statistics
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
