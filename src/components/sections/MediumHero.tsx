import Image from 'next/image'
import Link from 'next/link'
import { Illustration, type IllustrationData } from '@/components/Illustration'
import { cn } from '@/utilities/ui'

export type MediumHeroVariant = 'white' | 'navy' | 'red'
export type MediumHeroMediaMode = 'image' | 'illustration'

export type MediumHeroLink = {
  label: string
  href: string
  variant?: 'primary' | 'ghost'
}

export type MediumHeroProps = {
  heading: string
  body?: string
  variant?: MediumHeroVariant
  mediaMode?: MediumHeroMediaMode
  imageSrc?: string
  imageAlt?: string
  illustration?: IllustrationData
  links?: MediumHeroLink[]
  className?: string
}

export function MediumHero({
  heading,
  body,
  variant = 'navy',
  mediaMode = 'image',
  imageSrc,
  imageAlt,
  illustration,
  links,
  className,
}: MediumHeroProps) {
  const isDark = variant === 'navy' || variant === 'red'
  const sectionBg =
    variant === 'navy' ? 'bg-primary-blue' : variant === 'red' ? 'bg-primary-red' : 'bg-white'
  const sectionPadding = isDark ? 'py-6 lg:py-10' : 'py-[30px] lg:py-[60px]'

  const illustrationProps: IllustrationData = {
    preset: 'dept/cardiology',
    ...(isDark ? { tone: 'dark' } : {}),
    ...illustration,
  }

  return (
    <section className={cn(sectionBg, className)}>
      <div className={cn('container mx-auto px-6 lg:px-[30px]', sectionPadding)}>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
          <div className="flex flex-col gap-4 text-center lg:w-[48%] lg:text-start">
            <h1
              className={cn(
                'text-h1M font-bold leading-[110%] tracking-display lg:text-h1',
                isDark ? 'text-white' : 'text-primary-blue',
              )}
            >
              {heading}
            </h1>
            {body ? (
              <p
                className={cn(
                  'mx-auto max-w-[560px] text-b16 font-normal leading-[150%] lg:mx-0 lg:text-b18',
                  isDark ? 'text-white/85' : 'text-primary-blue/85',
                )}
              >
                {body}
              </p>
            ) : null}
            {links && links.length > 0 ? (
              <ul className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row lg:justify-start">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        link.variant === 'ghost' || variant === 'red' ? 'btn-ghost' : 'btn-primary',
                        variant === 'red' && link.variant !== 'ghost' && 'btn-ghost',
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <div className="lg:w-[52%]">
            {mediaMode === 'illustration' ? (
              <div className="mx-auto w-full max-w-[520px]">
                <Illustration {...illustrationProps} />
              </div>
            ) : (
              <div
                className={cn(
                  'relative aspect-video w-full max-h-[360px] overflow-hidden rounded-xl',
                  isDark && 'border border-white/10',
                )}
              >
                {imageSrc ? (
                  <Image
                    src={imageSrc}
                    alt={imageAlt || heading}
                    fill
                    className="rounded-xl object-cover"
                    priority
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-cardbg text-b14 text-dark-gray">
                    Hero image
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
