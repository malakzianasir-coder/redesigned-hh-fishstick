import type { Metadata } from 'next'
import Link from 'next/link'

import { Illustration } from '@/components/Illustration'
import { MarketingBreadcrumb } from '@/components/marketing/MarketingShell'
import thankYouData from '../../../../content/thank-you.json'
import { cn } from '@/utilities/ui'

type ThankYouContent = {
  kicker: string
  heading: string
  lede: string
  quote: string
  body: string[]
  illustrationPreset: string
  nextSteps: { title: string; body: string }[]
  contact: { uan: string; phone: string; email: string }
  links: { label: string; href: string; variant?: 'primary' | 'ghost' }[]
}

const content = thankYouData as ThankYouContent

export const metadata: Metadata = {
  title: 'Thank You | Hijaz Hospital',
  description:
    'Thank you for supporting Hijaz Hospital Trust. Your generosity helps provide care to deserving patients.',
}

export default function ThankYouPage() {
  return (
    <article className="bg-white">
      <MarketingBreadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Donate', href: '/donate' },
          { label: 'Thank You' },
        ]}
      />

      <section>
        <div className="container mx-auto px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-16">
            <div className="flex flex-col gap-[6px] text-center lg:col-span-6 lg:text-start">
              <p className="kicker">{content.kicker}</p>
              <h1 className="text-h1M font-bold leading-[110%] tracking-display text-primary-blue lg:text-h1">
                {content.heading}
              </h1>
              <p className="mt-2 max-w-xl text-b16 leading-[150%] text-primary-blue/85 lg:mx-0 mx-auto">
                {content.lede}
              </p>
              <blockquote className="mx-auto mt-4 max-w-xl border-l-4 border-primary-red pl-4 text-b14 italic leading-[150%] text-primary-blue/85 lg:mx-0">
                {content.quote}
              </blockquote>

              <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
                {content.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'inline-flex min-h-[50px] items-center justify-center rounded-full px-6 text-b16 font-bold transition-colors duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-red/40 focus-visible:ring-offset-2',
                      link.variant === 'ghost'
                        ? 'border border-primary-blue/25 text-primary-blue hover:border-primary-red hover:bg-primary-red hover:text-white'
                        : 'bg-primary-red text-white hover:bg-primary-blue',
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="mx-auto aspect-square w-full max-w-[320px] lg:max-h-[320px]">
                <Illustration
                  preset={content.illustrationPreset}
                  confetti
                  animate
                  className="h-full w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-whitebg">
        <div className="container mx-auto px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
          <div className="mx-auto flex max-w-4xl flex-col gap-8">
            <div className="flex flex-col gap-[6px] text-center lg:text-start">
              <p className="kicker">What happens next</p>
              <h2 className="text-h3M font-bold leading-[120%] text-primary-blue lg:text-h3">
                Your gift continues our mission
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              {content.body.map((paragraph) => (
                <p key={paragraph} className="text-b14 leading-[150%] text-primary-blue/85 lg:text-b16">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="card-grid card-grid--2">
              {content.nextSteps.map((step) => (
                <div key={step.title} className="card p-6">
                  <h3 className="text-h6 font-bold leading-[120%] text-primary-blue">{step.title}</h3>
                  <p className="mt-2 text-b14 leading-[150%] text-primary-blue/85">{step.body}</p>
                </div>
              ))}
            </div>

            <div className="card p-6 lg:p-8">
              <p className="field-label-text">Donations Office</p>
              <div className="mt-3 flex flex-col gap-2 text-b14 leading-[150%] text-primary-blue/85">
                <p>
                  UAN:{' '}
                  <a
                    href={`tel:${content.contact.uan.replace(/\s/g, '')}`}
                    className="font-semibold text-primary-red transition-colors hover:text-primary-blue"
                  >
                    {content.contact.uan}
                  </a>
                </p>
                <p>
                  Phone:{' '}
                  <a
                    href={`tel:${content.contact.phone.replace(/\s/g, '')}`}
                    className="font-semibold text-primary-red transition-colors hover:text-primary-blue"
                  >
                    {content.contact.phone}
                  </a>
                </p>
                <p>
                  Email:{' '}
                  <a
                    href={`mailto:${content.contact.email}`}
                    className="font-semibold text-primary-red transition-colors hover:text-primary-blue"
                  >
                    {content.contact.email}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}
