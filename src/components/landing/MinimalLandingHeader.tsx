import Link from 'next/link'

type MinimalLandingHeaderProps = {
  ctaLabel?: string
  ctaHref?: string
}

export function MinimalLandingHeader({
  ctaLabel = 'Donate Now',
  ctaHref = '/donate',
}: MinimalLandingHeaderProps) {
  return (
    <header className="sticky top-0 z-header border-b border-dark-gray/15 bg-white/95 backdrop-blur">
      <div className="container mx-auto flex items-center justify-between px-6 py-3 lg:px-[30px]">
        <Link href="/" className="text-b18 font-bold text-primary-blue transition-colors hover:text-primary-red">
          Hijaz Hospital
        </Link>
        <Link
          href={ctaHref}
          className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-primary-red px-5 text-b14 font-bold text-white transition-colors duration-300 ease-in-out hover:bg-primary-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-red/40 focus-visible:ring-offset-2"
        >
          {ctaLabel}
        </Link>
      </div>
    </header>
  )
}
