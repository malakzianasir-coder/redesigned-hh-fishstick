import type { Metadata } from 'next'
import Link from 'next/link'

import { MarketingBreadcrumb } from '@/components/marketing/MarketingShell'

export const metadata: Metadata = {
  title: 'Donation Failed | Hijaz Hospital',
  description: 'Your donation transaction could not be completed.',
}

export default function DonateFailedPage() {
  return (
    <article className="bg-white min-h-[70vh]">
      <MarketingBreadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Donate', href: '/donate' },
          { label: 'Failed' },
        ]}
      />

      <section>
        <div className="container mx-auto px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
          <div className="mx-auto flex max-w-2xl flex-col gap-6 text-center">
            <p className="kicker text-red-600">Transaction Failed</p>
            <h1 className="text-h3M font-bold leading-[110%] tracking-display text-primary-blue lg:text-h2">
              We could not process your donation
            </h1>
            
            <p className="text-b16 leading-[150%] text-primary-blue/85">
              Your transaction was declined or an error occurred during processing. No funds have been deducted from your account. 
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/donate"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary-red px-6 text-b14 font-bold leading-none text-white transition-colors hover:bg-primary-blue"
              >
                Try Again
              </Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}
