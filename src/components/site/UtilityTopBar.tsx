'use client'

import Link from 'next/link'
import { FacebookLogo, LinkedinLogo, XLogo, YoutubeLogo } from '@phosphor-icons/react'

const SOCIAL_LINKS = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/HijazHospitalTrust/',
    Icon: FacebookLogo,
  },
  {
    label: 'X',
    href: 'https://twitter.com/HijazHospital',
    Icon: XLogo,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/hijaz-hospital-trust',
    Icon: LinkedinLogo,
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/channel/UCIzVtxEnDTJsdIcCokl_paQ',
    Icon: YoutubeLogo,
  },
] as const

const UTILITY_LINKS = [
  { label: 'Helpline: 042 111 044 529', href: 'tel:009242111044529' },
  { label: 'Lab Reports', href: 'http://110.39.146.42:82/Patient/Login.aspx' },
  
] as const

export function UtilityTopBar() {
  return (
    <div className="utility-top-bar hidden border-b border-dark-gray/15 bg-white/80 backdrop-blur xl:block">
      <div className="mx-auto flex max-w-screen-xl items-center gap-4 px-4 py-2 sm:px-6 xl:px-8">
        <div className="hidden items-center gap-5 sm:flex">
          {UTILITY_LINKS.map((link, index) => (
            <span key={link.href} className="inline-flex items-center gap-5">
              {index > 0 ? <span className="h-3 w-px bg-dark-gray/25" aria-hidden /> : null}
              {link.href.startsWith('tel:') ? (
                <a
                  href={link.href}
                  className="text-b12 text-dark-gray transition-colors duration-300 hover:text-primary-red"
                  aria-label="Call our helpline"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  href={link.href}
                  className="text-b12 text-dark-gray transition-colors duration-300 hover:text-primary-red"
                >
                  {link.label}
                </Link>
              )}
            </span>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2">
          {SOCIAL_LINKS.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="utility-social-link"
            >
              <Icon size={14} weight="fill" aria-hidden />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
