'use client'

import { CaretLeft, CaretRight, HandSwipeLeft } from '@phosphor-icons/react'
import { gsap } from 'gsap'
import Link from 'next/link'
import { useCallback, useEffect, useRef } from 'react'

import { cn } from '@/utilities/ui'

export type Ds3dSlide = {
  src: string
  title: string
  alt?: string
  role?: string
  href?: string
  external?: boolean
}

export type Ds3dCarouselProps = {
  slides: Ds3dSlide[]
  ariaLabel: string
  className?: string
}

const BRAND_FALLBACKS: Array<{ c1: number[]; c2: number[] }> = [
  { c1: [227, 0, 22], c2: [247, 107, 121] },
  { c1: [27, 36, 65], c2: [20, 76, 217] },
  { c1: [20, 76, 217], c2: [241, 169, 176] },
  { c1: [227, 0, 22], c2: [27, 36, 65] },
  { c1: [16, 21, 36], c2: [20, 76, 217] },
  { c1: [247, 107, 121], c2: [227, 0, 22] },
]

const FRICTION = 0.9
const WHEEL_SENS = 0.55
const DRAG_SENS = 1
const MAX_ROTATION = 26
const MAX_DEPTH = 120
const MIN_SCALE = 0.9
const SCALE_RANGE = 0.12
const GAP = 24
const BASE_BG = '#F8F8F9'

const mod = (n: number, m: number) => ((n % m) + m) % m

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      default:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }
  return [h * 360, s, l]
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  h = (((h % 360) + 360) % 360) / 360
  let r: number
  let g: number
  let b: number
  if (s === 0) {
    r = g = b = l
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
}

function extractColors(
  img: HTMLImageElement,
  idx: number,
): { c1: number[]; c2: number[] } {
  try {
    const MAX = 40
    const ratio =
      img.naturalWidth && img.naturalHeight ? img.naturalWidth / img.naturalHeight : 1
    const tw = ratio >= 1 ? MAX : Math.max(16, Math.round(MAX * ratio))
    const th = ratio >= 1 ? Math.max(16, Math.round(MAX / ratio)) : MAX
    const canvas = document.createElement('canvas')
    canvas.width = tw
    canvas.height = th
    const ctx = canvas.getContext('2d')
    if (!ctx) return BRAND_FALLBACKS[idx % BRAND_FALLBACKS.length]!
    ctx.drawImage(img, 0, 0, tw, th)
    const data = ctx.getImageData(0, 0, tw, th).data
    const H_BINS = 36
    const S_BINS = 5
    const SIZE = H_BINS * S_BINS
    const wSum = new Float32Array(SIZE)
    const rSum = new Float32Array(SIZE)
    const gSum = new Float32Array(SIZE)
    const bSum = new Float32Array(SIZE)
    for (let i = 0; i < data.length; i += 4) {
      const a = data[i + 3]! / 255
      if (a < 0.05) continue
      const r = data[i]!
      const g = data[i + 1]!
      const b = data[i + 2]!
      const [h, s, l] = rgbToHsl(r, g, b)
      if (l < 0.12 || l > 0.9 || s < 0.1) continue
      const w = a * (s * s) * (1 - Math.abs(l - 0.5) * 0.6)
      const hi = Math.min(H_BINS - 1, Math.floor((h / 360) * H_BINS))
      const si = Math.min(S_BINS - 1, Math.floor(s * S_BINS))
      const bidx = hi * S_BINS + si
      wSum[bidx]! += w
      rSum[bidx]! += r * w
      gSum[bidx]! += g * w
      bSum[bidx]! += b * w
    }
    let pIdx = -1
    let pW = 0
    for (let i = 0; i < SIZE; i++) {
      if (wSum[i]! > pW) {
        pW = wSum[i]!
        pIdx = i
      }
    }
    if (pIdx < 0 || pW <= 0) return BRAND_FALLBACKS[idx % BRAND_FALLBACKS.length]!
    const avg = (i: number) => {
      const w = wSum[i] || 1e-6
      return [
        Math.round(rSum[i]! / w),
        Math.round(gSum[i]! / w),
        Math.round(bSum[i]! / w),
      ] as [number, number, number]
    }
    const [pr, pg, pb] = avg(pIdx)
    const [h1, s1Raw] = rgbToHsl(pr, pg, pb)
    const s1 = Math.max(0.4, Math.min(1, s1Raw * 1.1))
    return { c1: hslToRgb(h1, s1, 0.48), c2: hslToRgb(h1, s1, 0.68) }
  } catch {
    return BRAND_FALLBACKS[idx % BRAND_FALLBACKS.length]!
  }
}

type CarouselItem = { el: HTMLElement; x: number }

function SlideCaption({ slide }: { slide: Ds3dSlide }) {
  return (
    <div className="ds3d-card__caption">
      <p className="text-b14 font-bold leading-[120%]">{slide.title}</p>
      {slide.role ? (
        <p className="text-b12 mt-1 text-white/85">{slide.role}</p>
      ) : null}
    </div>
  )
}

function SlideImage({ slide }: { slide: Ds3dSlide }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="ds3d-card__img"
      src={slide.src}
      alt={slide.alt || slide.title}
      decoding="async"
      loading="eager"
      draggable={false}
    />
  )
}

export function Ds3dCarousel({ slides, ariaLabel, className }: Ds3dCarouselProps) {
  const stageRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)
  const loaderRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLElement | null)[]>([])
  const suppressClickRef = useRef(false)

  const setCardRef = useCallback(
    (index: number) => (el: HTMLElement | null) => {
      cardRefs.current[index] = el
    },
    [],
  )

  const handleLinkClick = useCallback((e: React.MouseEvent) => {
    if (suppressClickRef.current) {
      e.preventDefault()
      e.stopPropagation()
    }
  }, [])

  useEffect(() => {
    const stage = stageRef.current
    const cardsRoot = cardsRef.current
    const bgCanvas = canvasRef.current
    const loader = loaderRef.current
    const prevBtn = prevRef.current
    const nextBtn = nextRef.current
    if (!stage || !cardsRoot || !bgCanvas) return

    const bgCtx = bgCanvas.getContext('2d', { alpha: false })
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let items: CarouselItem[] = []
    let positions = new Float32Array(0)
    let activeIndex = -1
    let isEntering = true
    let CARD_W = 280
    let STEP = CARD_W + GAP
    let TRACK = 0
    let SCROLL_X = 0
    let VW_HALF = stage.clientWidth * 0.5
    let vX = 0
    let rafId: number | null = null
    let bgRAF: number | null = null
    let lastTime = 0
    let lastBgDraw = 0
    let gradPalette: Array<{ c1: number[]; c2: number[] }> = []
    const gradCurrent = { r1: 227, g1: 0, b1: 22, r2: 27, g2: 36, b2: 65 }
    let bgFastUntil = 0
    let running = false
    let booted = false

    let dragging = false
    let lastX = 0
    let lastT = 0
    let lastDelta = 0
    let pointerStartX = 0

    function collectItems() {
      items = cardRefs.current
        .filter((el): el is HTMLElement => el != null)
        .map((el, i) => ({ el, x: i * STEP }))
    }

    function measure() {
      const sample = items[0]?.el
      if (!sample) return
      const r = sample.getBoundingClientRect()
      CARD_W = r.width || CARD_W
      STEP = CARD_W + GAP
      TRACK = items.length * STEP
      items.forEach((it, i) => {
        it.x = i * STEP
      })
      positions = new Float32Array(items.length)
      VW_HALF = Math.max(stage!.clientWidth * 0.5, 1)
    }

    function computeTransformComponents(screenX: number) {
      const norm = Math.max(-1, Math.min(1, screenX / VW_HALF))
      const invNorm = 1 - Math.abs(norm)
      return {
        ry: -norm * MAX_ROTATION,
        tz: invNorm * MAX_DEPTH,
        scale: MIN_SCALE + invNorm * SCALE_RANGE,
      }
    }

    function transformForScreenX(screenX: number) {
      const { ry, tz, scale } = computeTransformComponents(screenX)
      return {
        transform: `translate3d(${screenX}px,-50%,${tz}px) rotateY(${ry}deg) scale(${scale})`,
        z: tz,
      }
    }

    function updateCarouselTransforms() {
      if (!TRACK) return
      const half = TRACK / 2
      let closestIdx = -1
      let closestDist = Infinity
      for (let i = 0; i < items.length; i++) {
        let pos = items[i]!.x - SCROLL_X
        if (pos < -half) pos += TRACK
        if (pos > half) pos -= TRACK
        positions[i] = pos
        const dist = Math.abs(pos)
        if (dist < closestDist) {
          closestDist = dist
          closestIdx = i
        }
      }
      const prevIdx = (closestIdx - 1 + items.length) % items.length
      const nextIdx = (closestIdx + 1) % items.length
      for (let i = 0; i < items.length; i++) {
        const pos = positions[i]!
        const norm = Math.max(-1, Math.min(1, pos / VW_HALF))
        const { transform, z } = transformForScreenX(pos)
        items[i]!.el.style.transform = transform
        items[i]!.el.style.zIndex = String(1000 + Math.round(z))
        if (!reduceMotion) {
          const isCore = i === closestIdx || i === prevIdx || i === nextIdx
          const blur = isCore ? 0 : 2 * Math.pow(Math.abs(norm), 1.1)
          items[i]!.el.style.filter = `blur(${blur.toFixed(2)}px)`
        }
      }
      if (closestIdx !== activeIndex) setActiveGradient(closestIdx)
    }

    function tick(t: number) {
      const dt = lastTime ? (t - lastTime) / 1000 : 0
      lastTime = t
      SCROLL_X = mod(SCROLL_X + vX * dt, TRACK || 1)
      vX *= Math.pow(FRICTION, dt * 60)
      if (Math.abs(vX) < 0.02) vX = 0
      updateCarouselTransforms()
      rafId = requestAnimationFrame(tick)
    }

    function startCarousel() {
      if (rafId) cancelAnimationFrame(rafId)
      lastTime = 0
      running = true
      rafId = requestAnimationFrame((t) => {
        updateCarouselTransforms()
        tick(t)
      })
    }

    function stopCarousel() {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = null
      running = false
    }

    function setActiveGradient(idx: number) {
      if (idx < 0 || idx >= items.length || idx === activeIndex) return
      activeIndex = idx
      const pal = gradPalette[idx] || BRAND_FALLBACKS[idx % BRAND_FALLBACKS.length]!
      const to = {
        r1: pal.c1[0]!,
        g1: pal.c1[1]!,
        b1: pal.c1[2]!,
        r2: pal.c2[0]!,
        g2: pal.c2[1]!,
        b2: pal.c2[2]!,
      }
      if (!reduceMotion) {
        bgFastUntil = performance.now() + 700
        gsap.to(gradCurrent, { ...to, duration: 0.45, ease: 'power2.out' })
      } else {
        Object.assign(gradCurrent, to)
      }
    }

    function resizeBG() {
      if (!bgCtx || !bgCanvas) return
      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1))
      const w = stage!.clientWidth
      const h = stage!.clientHeight
      const tw = Math.floor(w * dpr)
      const th = Math.floor(h * dpr)
      if (bgCanvas.width !== tw || bgCanvas.height !== th) {
        bgCanvas.width = tw
        bgCanvas.height = th
        bgCtx.setTransform(dpr, 0, 0, dpr, 0, 0)
      }
    }

    function drawBackground() {
      if (!bgCtx) return
      const now = performance.now()
      const minInterval = now < bgFastUntil ? 16 : 33
      if (now - lastBgDraw < minInterval) {
        bgRAF = requestAnimationFrame(drawBackground)
        return
      }
      lastBgDraw = now
      resizeBG()
      const w = stage!.clientWidth
      const h = stage!.clientHeight
      bgCtx.fillStyle = BASE_BG
      bgCtx.fillRect(0, 0, w, h)
      if (reduceMotion) {
        bgRAF = requestAnimationFrame(drawBackground)
        return
      }
      const time = now * 0.0002
      const cx = w * 0.5
      const cy = h * 0.5
      const a1 = Math.min(w, h) * 0.35
      const a2 = Math.min(w, h) * 0.28
      const x1 = cx + Math.cos(time) * a1
      const y1 = cy + Math.sin(time * 0.8) * a1 * 0.4
      const x2 = cx + Math.cos(-time * 0.9 + 1.2) * a2
      const y2 = cy + Math.sin(-time * 0.7 + 0.7) * a2 * 0.5
      const r1 = Math.max(w, h) * 0.75
      const r2 = Math.max(w, h) * 0.65
      const g1 = bgCtx.createRadialGradient(x1, y1, 0, x1, y1, r1)
      g1.addColorStop(0, `rgba(${gradCurrent.r1 | 0},${gradCurrent.g1 | 0},${gradCurrent.b1 | 0},0.55)`)
      g1.addColorStop(1, 'rgba(248,248,249,0)')
      bgCtx.fillStyle = g1
      bgCtx.fillRect(0, 0, w, h)
      const g2 = bgCtx.createRadialGradient(x2, y2, 0, x2, y2, r2)
      g2.addColorStop(0, `rgba(${gradCurrent.r2 | 0},${gradCurrent.g2 | 0},${gradCurrent.b2 | 0},0.4)`)
      g2.addColorStop(1, 'rgba(248,248,249,0)')
      bgCtx.fillStyle = g2
      bgCtx.fillRect(0, 0, w, h)
      bgRAF = requestAnimationFrame(drawBackground)
    }

    function startBG() {
      if (bgRAF) cancelAnimationFrame(bgRAF)
      bgRAF = requestAnimationFrame(drawBackground)
    }

    function stopBG() {
      if (bgRAF) cancelAnimationFrame(bgRAF)
      bgRAF = null
    }

    function buildPalette() {
      gradPalette = items.map((it, i) => {
        const img = it.el.querySelector('img')
        if (!img || !img.naturalWidth) return BRAND_FALLBACKS[i % BRAND_FALLBACKS.length]!
        return extractColors(img, i)
      })
    }

    function waitForImages() {
      return Promise.all(
        items.map((it) => {
          const img = it.el.querySelector('img')
          if (!img || img.complete) return Promise.resolve()
          return new Promise<void>((resolve) => {
            img.addEventListener('load', () => resolve(), { once: true })
            img.addEventListener('error', () => resolve(), { once: true })
          })
        }),
      )
    }

    async function animateEntry(visibleCards: Array<{ item: CarouselItem; screenX: number }>) {
      if (reduceMotion) {
        visibleCards.forEach(({ item, screenX }) => {
          item.el.style.opacity = '1'
          item.el.style.transform = transformForScreenX(screenX).transform
        })
        return
      }
      await new Promise<void>((r) => requestAnimationFrame(() => r()))
      const tl = gsap.timeline()
      visibleCards.forEach(({ item, screenX }, idx) => {
        const state = { p: 0 }
        const { ry, tz, scale: baseScale } = computeTransformComponents(screenX)
        item.el.style.opacity = '0'
        item.el.style.transform = `translate3d(${screenX}px,-50%,${tz}px) rotateY(${ry}deg) scale(0.92) translateY(40px)`
        tl.to(
          state,
          {
            p: 1,
            duration: 0.55,
            ease: 'power3.out',
            onUpdate: () => {
              const t = state.p
              item.el.style.opacity = String(t)
              if (t >= 0.999) {
                item.el.style.transform = transformForScreenX(screenX).transform
              } else {
                item.el.style.transform = `translate3d(${screenX}px,-50%,${tz}px) rotateY(${ry}deg) scale(${0.92 + (baseScale - 0.92) * t}) translateY(${40 * (1 - t)}px)`
              }
            },
          },
          idx * 0.05,
        )
      })
      await new Promise<void>((resolve) => {
        tl.eventCallback('onComplete', resolve)
      })
    }

    function nudge(dir: number) {
      if (isEntering || !TRACK) return
      vX += dir * STEP * 8
    }

    function onWheel(e: WheelEvent) {
      if (isEntering || !running) return
      e.preventDefault()
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
      vX += delta * WHEEL_SENS * 20
    }

    function onDragStart(e: DragEvent) {
      e.preventDefault()
    }

    function onPointerDown(e: PointerEvent) {
      if (isEntering || (e.target as Element).closest('button')) return
      dragging = true
      suppressClickRef.current = false
      pointerStartX = e.clientX
      lastX = e.clientX
      lastT = performance.now()
      lastDelta = 0
      stage!.setPointerCapture(e.pointerId)
      stage!.classList.add('is-dragging')
    }

    function onPointerMove(e: PointerEvent) {
      if (!dragging) return
      if (Math.abs(e.clientX - pointerStartX) > 6) suppressClickRef.current = true
      const now = performance.now()
      const dx = e.clientX - lastX
      const dt = Math.max(1, now - lastT) / 1000
      SCROLL_X = mod(SCROLL_X - dx * DRAG_SENS, TRACK || 1)
      lastDelta = dx / dt
      lastX = e.clientX
      lastT = now
      updateCarouselTransforms()
    }

    function onPointerUp(e: PointerEvent) {
      if (!dragging) return
      dragging = false
      try {
        stage!.releasePointerCapture(e.pointerId)
      } catch {
        /* ignore */
      }
      vX = -lastDelta * DRAG_SENS
      stage!.classList.remove('is-dragging')
    }

    function onPointerCancel() {
      dragging = false
      suppressClickRef.current = true
      stage!.classList.remove('is-dragging')
    }

    function onResize() {
      const ratio = TRACK ? SCROLL_X / TRACK : 0
      measure()
      SCROLL_X = mod(ratio * TRACK, TRACK || 1)
      updateCarouselTransforms()
      resizeBG()
    }

    let resizeTimer: ReturnType<typeof setTimeout> | undefined
    function handleResize() {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(onResize, 80)
    }

    function onVisibilityChange() {
      if (document.hidden) {
        stopCarousel()
        stopBG()
      } else if (stage!.classList.contains('carousel-mode') && !isEntering) {
        startCarousel()
        startBG()
      }
    }

    async function boot() {
      collectItems()
      measure()
      updateCarouselTransforms()
      stage!.classList.add('carousel-mode')
      await waitForImages()
      buildPalette()
      setActiveGradient(0)
      resizeBG()
      if (bgCtx) {
        bgCtx.fillStyle = BASE_BG
        bgCtx.fillRect(0, 0, stage!.clientWidth, stage!.clientHeight)
      }
      startBG()
      const half = TRACK / 2
      const visible: Array<{ item: CarouselItem; screenX: number }> = []
      for (let i = 0; i < items.length; i++) {
        let pos = items[i]!.x - SCROLL_X
        if (pos < -half) pos += TRACK
        if (pos > half) pos -= TRACK
        if (Math.abs(pos) < stage!.clientWidth * 0.7) {
          visible.push({ item: items[i]!, screenX: pos })
        }
      }
      visible.sort((a, b) => a.screenX - b.screenX)
      loader?.classList.add('is-hidden')
      await animateEntry(visible)
      isEntering = false
      startCarousel()
    }

    const onPrev = () => nudge(-1)
    const onNext = () => nudge(1)

    stage.addEventListener('wheel', onWheel, { passive: false })
    stage.addEventListener('dragstart', onDragStart)
    stage.addEventListener('pointerdown', onPointerDown)
    stage.addEventListener('pointermove', onPointerMove)
    stage.addEventListener('pointerup', onPointerUp)
    stage.addEventListener('pointercancel', onPointerCancel)
    prevBtn?.addEventListener('click', onPrev)
    nextBtn?.addEventListener('click', onNext)
    window.addEventListener('resize', handleResize)
    document.addEventListener('visibilitychange', onVisibilityChange)

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            if (!booted) {
              booted = true
              void boot()
            } else if (!isEntering) {
              startCarousel()
              startBG()
            }
          } else {
            stopCarousel()
            stopBG()
          }
        })
      },
      { threshold: 0.2 },
    )
    io.observe(stage)

    return () => {
      io.disconnect()
      stopCarousel()
      stopBG()
      clearTimeout(resizeTimer)
      stage.removeEventListener('wheel', onWheel)
      stage.removeEventListener('dragstart', onDragStart)
      stage.removeEventListener('pointerdown', onPointerDown)
      stage.removeEventListener('pointermove', onPointerMove)
      stage.removeEventListener('pointerup', onPointerUp)
      stage.removeEventListener('pointercancel', onPointerCancel)
      prevBtn?.removeEventListener('click', onPrev)
      nextBtn?.removeEventListener('click', onNext)
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      gsap.killTweensOf(gradCurrent)
    }
  }, [slides])

  return (
    <div
      ref={stageRef}
      className={cn('ds3d-stage', className)}
      aria-label={ariaLabel}
    >
      <div
        ref={loaderRef}
        className="ds3d-loader"
        aria-label="Loading carousel"
        aria-live="assertive"
      >
        <div className="ds3d-loader__ring" aria-hidden="true" />
      </div>

      <canvas ref={canvasRef} className="ds3d-bg" aria-hidden="true" />

      <div ref={cardsRef} className="ds3d-cards" aria-live="polite">
        {slides.map((slide, index) => {
          const cardClass = cn('ds3d-card', slide.href && 'is-link')
          const content = (
            <>
              <SlideImage slide={slide} />
              <SlideCaption slide={slide} />
            </>
          )

          if (slide.href) {
            const linkProps = slide.external
              ? { target: '_blank' as const, rel: 'noopener noreferrer' }
              : {}

            return (
              <Link
                key={`${slide.src}-${index}`}
                ref={setCardRef(index)}
                href={slide.href}
                className={cardClass}
                aria-label={slide.title}
                onClick={handleLinkClick}
                {...linkProps}
              >
                {content}
              </Link>
            )
          }

          return (
            <article
              key={`${slide.src}-${index}`}
              ref={setCardRef(index)}
              className={cardClass}
              aria-label={slide.title}
            >
              {content}
            </article>
          )
        })}
      </div>

      <div className="ds3d-nav">
        <button ref={prevRef} type="button" aria-label="Previous slide">
          <CaretLeft size={20} weight="bold" aria-hidden="true" />
        </button>
        <button ref={nextRef} type="button" aria-label="Next slide">
          <CaretRight size={20} weight="bold" aria-hidden="true" />
        </button>
      </div>

      <p className="ds3d-hint chip text-b12">
        <HandSwipeLeft size={16} weight="bold" aria-hidden="true" />
        Drag · scroll · swipe
      </p>
    </div>
  )
}
