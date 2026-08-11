'use client'

import { useState } from 'react'

import { MarketingHeroSection } from '@/components/marketing/MarketingHero'
import type { MarketingHero } from '@/lib/content/types'
import { cn } from '@/utilities/ui'

const DEPARTMENT_EXCERPT =
  'Elective and emergency surgical care with modern techniques, experienced teams, and support before, during, and after surgery.'

const WRAPPED_EXCERPT =
  '"Whoever saves one life, it is as if he has saved all mankind."'

function demoHero(excerpt: string, excerptVariant: MarketingHero['excerptVariant']): MarketingHero {
  return {
    kicker: 'Department',
    title: 'General Surgery',
    excerpt,
    excerptVariant,
    media: {
      type: 'placeholder',
      placeholderLabel: 'General Surgery',
      icon: 'Hospital',
    },
    links: [
      { label: 'Our Services', href: '#services', variant: 'primary' },
      { label: 'Why Choose Us', href: '#why-choose', variant: 'ghost' },
    ],
  }
}

export function HeroQuoteDemo() {
  const [variant, setVariant] = useState<'body' | 'quote'>('quote')

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col items-center gap-3">
        <p className="field-label-text">excerptVariant</p>
        <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Hero excerpt style">
          <button
            type="button"
            role="tab"
            aria-selected={variant === 'body'}
            className={cn('chip', variant === 'body' && 'is-active')}
            onClick={() => setVariant('body')}
          >
            Body (default)
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={variant === 'quote'}
            className={cn('chip', variant === 'quote' && 'is-active')}
            onClick={() => setVariant('quote')}
          >
            Quote (italic, no quotes)
          </button>
        </div>
      </div>

      <section className="overflow-hidden rounded-2xl border border-dark-gray/15">
        <MarketingHeroSection hero={demoHero(DEPARTMENT_EXCERPT, variant)} />
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-center text-b14 text-primary-blue/85">
          Wrapping quotation marks in the source are stripped in quote mode — they are not re-added.
        </p>
        <div className="overflow-hidden rounded-2xl border border-dark-gray/15">
          <MarketingHeroSection hero={demoHero(WRAPPED_EXCERPT, variant)} />
        </div>
      </section>
    </div>
  )
}
