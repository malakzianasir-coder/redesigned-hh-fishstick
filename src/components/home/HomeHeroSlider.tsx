'use client'

import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'

const SLIDES = [
  {
    image: '/media/DSC_3635.webp',
    heading: 'Support Life-Saving Care for the Deserving',
    body: 'More than 90% of patients receive treatment completely free of cost, ensuring access for the underprivileged and deserving. Your donation directly pays for surgeries, dialysis, medicines, and emergency care for patients who otherwise cannot afford treatment.',
    isH1: true,
  },
  {
    image: '/media/DSC_9537.webp',
    heading: 'Advanced Care. Trusted Expertise.',
    body: 'With modern medical equipment, specialized departments, and experienced consultants, Hijaz Hospital delivers comprehensive healthcare under one roof. From critical care to specialized surgeries and diagnostics, we combine innovation with compassion to ensure every patient receives high-quality treatment.',
    isH1: false,
  },
  {
    image: '/media/DSC08848.webp',
    heading: 'Growing with Our Community',
    body: 'For decades, Hijaz Hospital has stood as a pillar of trust and care. As we expand facilities, enhance services, and invest in training future healthcare professionals, our mission remains the same — to serve with integrity, excellence, and dedication.',
    isH1: false,
  },
] as const

const AUTOPLAY_MS = 5000

export function HomeHeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0)

  const goTo = useCallback((index: number) => {
    setActiveIndex((index + SLIDES.length) % SLIDES.length)
  }, [])

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo])
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo])

  useEffect(() => {
    const timer = window.setInterval(goNext, AUTOPLAY_MS)
    return () => window.clearInterval(timer)
  }, [goNext])

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] w-full overflow-hidden bg-dark-blue"
      aria-label="Home hero"
    >
      {SLIDES.map((slide, index) => (
        <div
          key={slide.image}
          className={`hero-slide${index === activeIndex ? ' is-active' : ''}`}
          aria-hidden={index !== activeIndex}
        >
          <Image
            src={slide.image}
            alt=""
            fill
            className="object-cover"
            priority={index === 0}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-dark-blue/40" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center md:px-12 lg:px-24">
            <div className="flex max-w-4xl flex-col items-center gap-4">
              {slide.isH1 ? (
                <h1 className="text-h1M font-bold tracking-display leading-[110%] text-white lg:text-h1">
                  {slide.heading}
                </h1>
              ) : (
                <h2 className="text-h1M font-bold tracking-display leading-[110%] text-white lg:text-h1">
                  {slide.heading}
                </h2>
              )}
              <p className="max-w-2xl text-b16 leading-[150%] text-white/85 lg:text-b18">
                {slide.body}
              </p>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute inset-x-0 bottom-24 flex flex-wrap justify-center gap-3 px-6 lg:bottom-28">
        <Link href="/donate" className="btn-on-dark">
          Donate Now
        </Link>
        <Link href="/services" className="btn-on-dark-ghost">
          Explore Services
        </Link>
      </div>

      <button
        type="button"
        className="hero-arrow absolute left-4 top-1/2 -translate-y-1/2 lg:left-8"
        onClick={goPrev}
        aria-label="Previous slide"
      >
        <CaretLeft size={20} weight="bold" />
      </button>
      <button
        type="button"
        className="hero-arrow absolute right-4 top-1/2 -translate-y-1/2 lg:right-8"
        onClick={goNext}
        aria-label="Next slide"
      >
        <CaretRight size={20} weight="bold" />
      </button>

      <div className="absolute inset-x-0 bottom-10 flex justify-center gap-2" role="tablist" aria-label="Hero slides">
        {SLIDES.map((slide, index) => (
          <button
            key={slide.image}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            aria-label={`Go to slide ${index + 1}`}
            className={`hero-dot${index === activeIndex ? ' is-active' : ''}`}
            onClick={() => goTo(index)}
          />
        ))}
      </div>
    </section>
  )
}
