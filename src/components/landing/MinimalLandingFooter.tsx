import Link from 'next/link'

type MinimalLandingFooterProps = {
  body?: string
  ctaLabel?: string
  ctaHref?: string
}

export function MinimalLandingFooter({
  body = 'Need guidance before booking? Our team is available to help.',
  ctaLabel = 'Contact Team',
  ctaHref = '/search?q=contact',
}: MinimalLandingFooterProps) {
  return (
    <footer className="border-t border-dark-gray/15 bg-whitebg">
      <div className="container mx-auto flex flex-col items-center gap-4 px-6 py-[30px] text-center lg:px-[30px] lg:py-[60px]">
        <p className="text-b14 text-primary-blue/85">{body}</p>
        <Link
          href={ctaHref}
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary-blue px-4 text-b14 font-bold leading-none text-white transition-colors duration-300 ease-in-out hover:bg-primary-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-red/40 focus-visible:ring-offset-2"
        >
          {ctaLabel}
        </Link>
      </div>
    </footer>
  )
}
