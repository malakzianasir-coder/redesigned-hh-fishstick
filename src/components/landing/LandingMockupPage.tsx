import { MinimalLandingFooter } from '@/components/landing/MinimalLandingFooter'
import { MinimalLandingHeader } from '@/components/landing/MinimalLandingHeader'
import type { LandingPageMockup } from '@/lib/content/types'

export function LandingMockupPage({ page }: { page: LandingPageMockup }) {
  return (
    <article className="bg-white">
      <MinimalLandingHeader ctaLabel={page.hero.primaryCta?.label} ctaHref={page.hero.primaryCta?.href} />

      <section className="container mx-auto px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
        <div className="mx-auto flex max-w-4xl flex-col gap-6 text-center">
          {page.hero.kicker ? <p className="kicker">{page.hero.kicker}</p> : null}
          <h1 className="text-h1M font-bold tracking-display text-primary-blue lg:text-h1">
            {page.hero.heading}
          </h1>
          {page.hero.body ? <p className="text-b18 text-primary-blue/85">{page.hero.body}</p> : null}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {page.hero.primaryCta ? (
              <a
                href={page.hero.primaryCta.href}
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary-red px-4 text-b14 font-bold leading-none text-white transition-colors duration-300 hover:bg-primary-blue"
              >
                {page.hero.primaryCta.label}
              </a>
            ) : null}
            {page.hero.secondaryCta ? (
              <a
                href={page.hero.secondaryCta.href}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-primary-blue/25 px-4 text-b14 font-bold leading-none text-primary-blue transition-colors duration-300 hover:border-primary-red hover:bg-primary-red hover:text-white"
              >
                {page.hero.secondaryCta.label}
              </a>
            ) : null}
          </div>
        </div>
      </section>

      {page.sections.map((section) => (
        <section key={section.heading} className="bg-whitebg">
          <div className="container mx-auto px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
            <div className="card mx-auto max-w-4xl p-6 lg:p-8">
              <h2 className="text-h4M font-bold text-primary-blue lg:text-h4">{section.heading}</h2>
              <p className="mt-3 text-b16 leading-[150%] text-primary-blue/85">{section.body}</p>
            </div>
          </div>
        </section>
      ))}

      {page.ctaBand ? (
        <MinimalLandingFooter
          body={page.ctaBand.body}
          ctaLabel={page.ctaBand.button.label}
          ctaHref={page.ctaBand.button.href}
        />
      ) : (
        <MinimalLandingFooter />
      )}
    </article>
  )
}
