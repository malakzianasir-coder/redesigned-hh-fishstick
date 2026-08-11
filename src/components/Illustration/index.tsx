'use client'

import React, { useId } from 'react'
import * as PhosphorIcons from '@phosphor-icons/react'
import { ILLUSTRATION_PRESETS } from './presets'
import './illustration.css'

export type IllustrationData = {
  preset?: string
  icon?: string
  weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone'
  accent?: string
  soft?: string
  ink?: string
  motif?: 'pulse' | 'ecg' | 'orbit' | 'breathe' | 'none'
  mainAnim?: string
  satellites?: Array<string | { icon: string; anim?: string }>
  orbit?: boolean
  connectors?: boolean
  confetti?: boolean
  animate?: boolean
  tone?: 'light' | 'dark'
}

export type IllustrationProps = IllustrationData & {
  className?: string
}

/** Keep SVG attrs identical across Node/browser float math (avoids hydration mismatch). */
function coord(n: number): number {
  return Math.round(n * 1000) / 1000
}

function toPascalCase(str: string): string {
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('')
}

function RenderIcon({
  name,
  weight,
  size,
  color,
}: {
  name: string
  weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone'
  size: number
  color?: string
}) {
  if (!name) return null

  const pascalName = toPascalCase(name)
  const iconMap = PhosphorIcons as unknown as Record<string, React.ComponentType<any>>
  const IconComponent =
    iconMap[pascalName] ||
    iconMap[toPascalCase(name.replace(/[^a-zA-Z0-9-]/g, ''))] ||
    PhosphorIcons.FirstAidKit

  return (
    <IconComponent
      size={size}
      weight={weight || 'duotone'}
      color={color || 'currentColor'}
    />
  )
}

function shadeColor(hex: string, pct: number): string {
  if (!hex || !hex.startsWith('#') || hex.length < 7) return hex || '#144CD9'
  const n = parseInt(hex.slice(1), 16)
  const f = (v: number) => Math.min(255, Math.max(0, v + Math.round((255 * pct) / 100)))
  return (
    '#' +
    [(n >> 16) & 255, (n >> 8) & 255, n & 255]
      .map(f)
      .map((v) => v.toString(16).padStart(2, '0'))
      .join('')
  )
}

type ResolvedIllustrationConfig = Required<
  Omit<IllustrationData, 'preset' | 'className' | 'tone' | 'motif' | 'weight'>
> & {
  preset?: string
  tone?: IllustrationData['tone']
  motif: NonNullable<IllustrationData['motif']>
  weight: NonNullable<IllustrationData['weight']>
}

const DEFAULTS: ResolvedIllustrationConfig = {
  icon: 'first-aid-kit',
  weight: 'duotone',
  accent: '#144CD9',
  soft: '#DCE7FD',
  ink: '#1B2441',
  motif: 'pulse',
  mainAnim: '',
  satellites: [],
  orbit: true,
  connectors: true,
  confetti: true,
  animate: true,
}

export const Illustration: React.FC<IllustrationProps> = (props) => {
  const rawId = useId()
  const uid = rawId.replace(/[^a-zA-Z0-9]/g, '')

  const presetData =
    props.preset && ILLUSTRATION_PRESETS[props.preset]
      ? ILLUSTRATION_PRESETS[props.preset]
      : {}

  // Merge defaults -> preset -> props (filtering undefined)
  const customProps = Object.fromEntries(
    Object.entries(props).filter(([_, v]) => v !== undefined)
  )

  const c: ResolvedIllustrationConfig = {
    ...DEFAULTS,
    ...presetData,
    ...customProps,
  }

  const S = 560
  const CX = S / 2
  const CY = S / 2
  const animate = c.animate !== false
  const rSat = S * 0.345
  const angles = [-115, -20, 130, 55]

  const badgeClass =
    c.mainAnim === 'none'
      ? ''
      : [animate ? 'a-float' : '', animate ? c.mainAnim : ''].filter(Boolean).join(' ')

  const badgeIconSize = S * 0.17
  const chipBoxSize = S * 0.135
  const chipIconSize = chipBoxSize * 0.58

  const satellitesList = Array.isArray(c.satellites) ? c.satellites.slice(0, 4) : []

  const isDarkTone = c.tone === 'dark'
  const blobColor = c.soft
  const blobCenterOpacity = isDarkTone ? 0.42 : 1
  const ringColor = isDarkTone ? '#FFFFFF' : c.ink
  const motifColor = c.accent
  const orbitStrokeOpacity = isDarkTone ? 0.22 : 0.18

  return (
    <div
      className={`hh-illustration w-full block ${props.className || ''}`}
      data-animate={animate ? undefined : 'off'}
    >
      <svg
        viewBox={`0 0 ${S} ${S}`}
        role="img"
        aria-label={c.preset ? `${c.preset} illustration` : 'illustration'}
        className="w-full h-auto block overflow-visible"
      >
        <defs>
          <radialGradient id={`hhBlob-${uid}`} cx="50%" cy="42%" r="65%">
            <stop offset="0%" stopColor={blobColor} stopOpacity={blobCenterOpacity} />
            <stop offset="100%" stopColor={blobColor} stopOpacity={0} />
          </radialGradient>
          <linearGradient id={`hhBadge-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={c.accent} />
            <stop offset="100%" stopColor={shadeColor(c.accent, -28)} />
          </linearGradient>
          <filter id={`hhShadow-${uid}`} x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow
              dx="0"
              dy="10"
              stdDeviation="14"
              floodColor={c.ink}
              floodOpacity={0.12}
            />
          </filter>
        </defs>

        {/* Layer 1: Background Blob & Orbit Ring */}
        <g>
          <circle cx={CX} cy={CY} r={S * 0.42} fill={`url(#hhBlob-${uid})`} />
          {c.orbit && (
            <circle
              cx={CX}
              cy={CY}
              r={rSat}
              fill="none"
              stroke={ringColor}
              strokeOpacity={orbitStrokeOpacity}
              strokeWidth={1.5}
              strokeDasharray="3 9"
              className={animate ? 'a-spin' : ''}
            />
          )}

          {c.confetti && (
            <g>
              {[
                [0.14, 0.22, 'plus'],
                [0.86, 0.3, 'dot'],
                [0.8, 0.82, 'plus'],
                [0.18, 0.78, 'dot'],
                [0.9, 0.58, 'dot'],
              ].map(([fx, fy, type], i) => {
                const x = (fx as number) * S
                const y = (fy as number) * S
                const animClass = animate ? `a-float-${(i % 3) + 1}` : ''
                if (type === 'plus') {
                  return (
                    <path
                      key={i}
                      d={`M${x - 7} ${y} H${x + 7} M${x} ${y - 7} V${y + 7}`}
                      stroke={motifColor}
                      strokeWidth={3}
                      strokeLinecap="round"
                      opacity={isDarkTone ? 0.45 : 0.5}
                      className={animClass}
                    />
                  )
                }
                return (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r={4}
                    fill={ringColor}
                    opacity={isDarkTone ? 0.35 : 0.25}
                    className={animClass}
                  />
                )
              })}
            </g>
          )}
        </g>

        {/* Layer 2: Motif */}
        {c.motif === 'pulse' && animate && (
          <g>
            {[0, 1, 2].map((i) => (
              <circle
                key={i}
                cx={CX}
                cy={CY}
                r={S * 0.19}
                fill="none"
                stroke={motifColor}
                strokeWidth={2}
                strokeOpacity={isDarkTone ? 0.5 : 1}
                className="a-pulse"
                style={{ animationDelay: `${i * 0.85}s` }}
              />
            ))}
          </g>
        )}

        {c.motif === 'ecg' && (
          <path
            d={`M${CX - (S * 0.72) / 2} ${CY + S * 0.3} h${S * 0.72 * 0.22} l${S * 0.72 * 0.05} -26 l${S * 0.72 * 0.06} 52 l${S * 0.72 * 0.05} -70 l${S * 0.72 * 0.05} 44 h${S * 0.72 * 0.2} l${S * 0.72 * 0.04} -14 h${S * 0.72 * 0.33}`}
            fill="none"
            stroke={motifColor}
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity={isDarkTone ? 0.5 : 1}
            className={animate ? 'a-ecg' : ''}
          />
        )}

        {c.motif === 'breathe' && (
          <circle
            cx={CX}
            cy={CY}
            r={S * 0.26}
            fill={motifColor}
            opacity={isDarkTone ? 0.14 : 0.08}
            className={animate ? 'a-breathe' : ''}
          />
        )}

        {c.motif === 'orbit' && (
          <g>
            {[0, 120, 240].map((deg, i) => {
              const rad = (deg * Math.PI) / 180
              return (
                <g key={i} className={animate ? 'a-orbit' : ''}>
                  <circle
                    cx={coord(CX + rSat * Math.cos(rad))}
                    cy={coord(CY + rSat * Math.sin(rad))}
                    r={6}
                    fill={motifColor}
                    opacity={isDarkTone ? 0.65 : 0.7}
                  />
                </g>
              )
            })}
          </g>
        )}

        {/* Layer 3: Main Badge */}
        <g className={badgeClass}>
          <circle
            cx={CX}
            cy={CY}
            r={S * 0.155}
            fill={`url(#hhBadge-${uid})`}
            filter={`url(#hhShadow-${uid})`}
          />
          <svg
            x={CX - badgeIconSize / 2}
            y={CY - badgeIconSize / 2}
            width={badgeIconSize}
            height={badgeIconSize}
            viewBox="0 0 256 256"
          >
            <RenderIcon
              name={c.icon}
              weight={c.weight as any}
              size={256}
              color="#ffffff"
            />
          </svg>
        </g>

        {/* Layer 4: Satellite Chips & Connectors */}
        {satellitesList.map((sat, i) => {
          const satObj = typeof sat === 'string' ? { icon: sat } : sat
          const anim = satObj.anim || `a-float-${(i % 3) + 1}`
          const a = ((angles[i] ?? 0) * Math.PI) / 180
          const x = coord(CX + rSat * Math.cos(a))
          const y = coord(CY + rSat * Math.sin(a))

          return (
            <g key={i}>
              {c.connectors && (
                <line
                  x1={coord(CX + (x - CX) * 0.48)}
                  y1={coord(CY + (y - CY) * 0.48)}
                  x2={coord(CX + (x - CX) * 0.8)}
                  y2={coord(CY + (y - CY) * 0.8)}
                  stroke={ringColor}
                  strokeOpacity={isDarkTone ? 0.25 : 0.28}
                  strokeWidth={2}
                  className={animate ? 'a-dash' : ''}
                />
              )}
              <g className={animate ? anim : ''}>
                <rect
                  x={coord(x - chipBoxSize / 2)}
                  y={coord(y - chipBoxSize / 2)}
                  width={coord(chipBoxSize)}
                  height={coord(chipBoxSize)}
                  rx={coord(chipBoxSize * 0.28)}
                  fill="#ffffff"
                  filter={`url(#hhShadow-${uid})`}
                />
                <svg
                  x={coord(x - chipIconSize / 2)}
                  y={coord(y - chipIconSize / 2)}
                  width={coord(chipIconSize)}
                  height={coord(chipIconSize)}
                  viewBox="0 0 256 256"
                >
                  <RenderIcon
                    name={satObj.icon}
                    weight={c.weight as any}
                    size={256}
                    color={c.accent}
                  />
                </svg>
              </g>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
