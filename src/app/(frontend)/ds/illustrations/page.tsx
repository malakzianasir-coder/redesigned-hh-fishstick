import type { Metadata } from 'next'

import { MarketingHeroSection } from '@/components/marketing/MarketingHero'
import { JumpNav, MarketingBreadcrumb } from '@/components/marketing/MarketingShell'
import { BlockHeader } from '@/components/site/BlockHeader'
import { getPatientWelfareHub } from '@/lib/content/loaders'
import { toMarketingHero } from '@/lib/content/toMarketingHero'

import { IllustrationsCatalog } from './IllustrationsCatalog'

export const metadata: Metadata = {
  title: 'DS Illustrations',
  robots: { index: false, follow: false },
}

const JUMP_LINKS = [
  { label: 'In context', href: '#in-context' },
  { label: 'Usage', href: '#usage' },
  { label: 'Presets', href: '#presets' },
]

export default function DsIllustrationsPage() {
  const welfareHub = getPatientWelfareHub()

  return (
    <article>
      <MarketingBreadcrumb
        items={[
          { label: 'Design System', href: '/ds' },
          { label: 'Illustrations' },
        ]}
      />

      <section className="bg-white">
        <div className="container mx-auto px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
          <p className="kicker">Dev only</p>
          <h1 className="text-h1M font-bold tracking-display text-primary-blue lg:text-h1">
            Illustration system
          </h1>
          <p className="mt-2 max-w-2xl text-b16 text-primary-blue/85">
            Production renderer used on patient welfare, donate, and thank-you heroes — not the
            archived HTML mockup. Editors pick a preset key;{' '}
            <code className="font-mono text-b14">Illustration</code> draws the SVG.
          </p>
        </div>
      </section>

      <JumpNav links={JUMP_LINKS} />

      <section id="in-context" className="section-anchor border-t border-dark-gray/15 bg-white">
        <div className="container mx-auto px-6 py-[30px] lg:px-[30px] lg:pt-[60px] lg:pb-0">
          <BlockHeader
            kicker="In context"
            title="Patient Welfare hero"
            lede="Same MarketingHeroSection + preset as /patient-welfare. Illustration sits in a 320px square beside the title."
            cta={{ label: 'Open Patient Welfare', href: '/patient-welfare' }}
          />
        </div>
        <MarketingHeroSection hero={toMarketingHero(welfareHub.hero)} />
      </section>

      <section id="usage" className="section-anchor border-t border-dark-gray/15 bg-white">
        <div className="container mx-auto px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
          <BlockHeader
            kicker="Usage"
            title="Preset in, SVG out"
            lede="Pass a key from presets.ts. MarketingHeroSection already wires this when hero.media.type is illustration."
          />

          <div className="card-grid card-grid--2 mt-8">
            <div className="card p-6">
              <p className="field-label-text">Content</p>
              <pre className="mt-3 overflow-x-auto text-b14 leading-[150%] text-primary-blue">
                {`"media": {
  "type": "illustration",
  "preset": "page/patient-welfare"
}`}
              </pre>
            </div>
            <div className="card p-6">
              <p className="field-label-text">Component</p>
              <pre className="mt-3 overflow-x-auto text-b14 leading-[150%] text-primary-blue">
                {`<Illustration
  preset="page/patient-welfare"
  tone="light"
  className="h-full w-full"
/>`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      <IllustrationsCatalog />
    </article>
  )
}
