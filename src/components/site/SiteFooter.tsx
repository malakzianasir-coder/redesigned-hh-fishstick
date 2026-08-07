import Image from 'next/image'
import Link from 'next/link'
import {
  FacebookLogo,
  LinkedinLogo,
  XLogo,
  YoutubeLogo,
} from '@phosphor-icons/react/dist/ssr'
import { NewsletterSignup } from '@/components/forms/NewsletterSignup'
import { getSiteSettings } from '@/lib/content/loaders'

const FOOTER_COLUMNS = [
  {
    title: 'Our Purpose',
    ariaLabel: 'Our Purpose',
    links: [
      { label: 'Vision & Mission', href: '/our-purpose#vision-mission' },
      { label: 'Leadership & Governance', href: '/leadership' },
      { label: 'Messages', href: '/leadership/messages' },
      { label: 'Our Impact', href: '/our-impact' },
      { label: 'Our Supporters', href: '/our-supporters' },
    ],
  },
  {
    title: 'Patient Care',
    ariaLabel: 'Patient Care',
    links: [
      { label: 'Emergency (24/7)', href: '/services/emergency' },
      { label: 'Outpatient (OPD)', href: '/services/opd' },
      { label: 'Inpatient (IPD)', href: '/services/ipd' },
      { label: 'Clinical Laboratory', href: '/services/pathology' },
      { label: 'Find a Doctor', href: '/doctors' },
      { label: 'Patient Welfare', href: '/patient-welfare' },
    ],
  },
  {
    title: 'Donate',
    ariaLabel: 'Donate',
    links: [
      { label: 'Ways to Give', href: '/donate' },
      { label: 'What You Can Support', href: '/donate/what-you-can-support' },
      { label: 'How to Donate', href: '/donate/how-to-donate' },
      { label: 'Zakat', href: '/donate/zakat' },
      { label: 'Sponsor a Patient', href: '/donate/what-you-can-support/sponsor-a-patient' },
      { label: 'Donate Online', href: '/donate/how-to-donate/online' },
    ],
  },
] as const

const SOCIAL_LINKS = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/HijazHospitalTrust/',
    Icon: FacebookLogo,
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/channel/UCIzVtxEnDTJsdIcCokl_paQ',
    Icon: YoutubeLogo,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/hijaz-hospital-trust',
    Icon: LinkedinLogo,
  },
  {
    label: 'X',
    href: 'https://twitter.com/HijazHospital',
    Icon: XLogo,
  },
] as const

const COMPLIANCE_LOGOS = [
  {
    href: '/our-purpose#our-compliance',
    title: 'ISO 9001:2008 — TÜV Austria (QMS)',
    src: '/compliance-logos/tuv-austria-9001.png',
    alt: 'TÜV Austria — EN ISO 9001 certified',
    fallback: undefined,
  },
  {
    href: '/our-purpose#our-compliance',
    title: 'Punjab Healthcare Commission — Licensed',
    src: '/compliance-logos/punjab-health-care-commission.png',
    alt: 'Punjab Healthcare Commission',
    fallback: undefined,
  },
  {
    href: '/our-purpose#our-compliance',
    title: 'Member of Pakistan Centre for Philanthropy (PCP)',
    src: '/compliance-logos/PCP.png',
    alt: 'Pakistan Centre for Philanthropy (PCP)',
    fallback: '/compliance-logos/PCP.jpg',
  },
  {
    href: '/our-purpose#our-compliance',
    title: 'Social Welfare Agencies Ordinance 1961 Registration',
    src: '/compliance-logos/social-welfare.png',
    alt: 'Social Welfare Punjab',
    fallback: '/compliance-logos/social-welfare.jpg',
  },
  {
    href: '/our-purpose#our-compliance',
    title: 'Federal Board of Revenue — NPO / tax exemption',
    src: '/compliance-logos/fbr-pakistan.png',
    alt: 'Federal Board of Revenue Pakistan',
    fallback: undefined,
  },
] as const

export function SiteFooter() {
  const settings = getSiteSettings()
  const newsletter = settings.newsletter

  return (
    <footer className="site-footer bg-whitebg text-primary-blue">
      <div className="site-footer-glow" aria-hidden="true" />
      <div className="container relative mx-auto flex min-h-[470px] flex-col gap-10 overflow-hidden px-6 pb-3 pt-[60px] lg:px-[30px]">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex w-full flex-col items-center gap-2 text-center lg:max-w-[350px] lg:items-start lg:text-start">
              <Link href="/">
                <Image
                  src="/hijaz-hospital-logo-dark.svg"
                  alt="Hijaz Hospital"
                  width={260}
                  height={60}
                  className="h-auto max-h-[60px] w-[230px] lg:w-[260px]"
                  unoptimized
                />
              </Link>
              <p className="mt-2 text-b14 leading-[150%] text-primary-blue/85">
                To care for the ailing with compassion, respect, dignity, and professional excellence,
                while ensuring that financial hardship never stands in the way of receiving care.
              </p>
              <p className="mt-1 text-b12 font-semibold uppercase tracking-wider text-dark-gray">
                Excellence in Care · Dignity in Service · Access for All
              </p>
              {newsletter.enabled ? (
                <NewsletterSignup
                  label={newsletter.label}
                  placeholder={newsletter.placeholder}
                  buttonLabel={newsletter.buttonLabel}
                  successMessage={newsletter.successMessage}
                  errorMessage={newsletter.errorMessage}
                />
              ) : null}
            </div>

            <div className="flex w-full flex-col flex-wrap gap-9 text-center lg:flex-row lg:justify-end lg:text-start">
              {FOOTER_COLUMNS.map((column) => (
                <div key={column.title} className="flex min-w-[120px] flex-col gap-2 lg:max-w-[240px]">
                  <h3 className="text-b18 font-bold leading-[120%] text-primary-blue">{column.title}</h3>
                  <nav className="flex flex-col gap-1" aria-label={column.ariaLabel}>
                    {column.links.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="footer-link py-1 text-b14 leading-[150%]"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                </div>
              ))}

              <div className="flex min-w-[160px] flex-col gap-2 lg:max-w-[280px]">
                <h3 className="text-b18 font-bold leading-[120%] text-primary-blue">Contact</h3>
                <div className="flex flex-col gap-3 text-b14 leading-[150%] text-primary-blue/85">
                  <p>
                    <span className="mb-1 block text-b12 font-semibold uppercase tracking-wider text-dark-gray">
                      Address
                    </span>
                    Hijaz Social Welfare Society (Hijaz Hospital)
                    <br />
                    27-D-1, Sir Syed Road, Gulberg III,
                    <br />
                    Lahore, Pakistan
                  </p>
                  <p>
                    <span className="mb-1 block text-b12 font-semibold uppercase tracking-wider text-dark-gray">
                      Donations Office
                    </span>
                    <a href="tel:+9242111044529" className="footer-link">
                      UAN: +92 42 111 044 529
                    </a>
                    <br />
                    <a href="tel:+923214045125" className="footer-link">
                      Phone: 0321-4045125
                    </a>
                    <br />
                    <a href="mailto:Donations@hijazhospital.org.pk" className="footer-link">
                      Donations@hijazhospital.org.pk
                    </a>
                  </p>
                  <a
                    href="http://110.39.146.42:82/Patient/Login.aspx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link py-1 text-b14 leading-[150%]"
                  >
                    Online Patient Reports
                  </a>
                  <Link href="/complaints" className="footer-link py-1 text-b14 leading-[150%]">
                    Complaints & Feedback
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <p className="max-w-xl text-center text-b14 leading-[150%] text-dark-gray lg:text-start">
            Patient success stories and hospital updates are shared on our official social media
            platforms — visit the links below to explore real stories of hope, recovery, and service
            to humanity.
          </p>
          <div className="flex flex-row flex-wrap justify-center gap-3 lg:justify-end">
            {SOCIAL_LINKS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                className="footer-social"
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon size={18} weight="fill" aria-hidden />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <p className="text-center text-b12 font-semibold uppercase tracking-wider text-dark-gray">
            Our Compliance
          </p>
          <div className="footer-compliance" aria-label="Compliance and accreditation logos">
            {COMPLIANCE_LOGOS.map((logo) => (
              <Link key={logo.src} href={logo.href} title={logo.title}>
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={96}
                  height={56}
                  className="h-auto w-[96px] object-contain"
                />
              </Link>
            ))}
          </div>
        </div>

        <div className="flex w-full flex-col items-center gap-4 border-t border-dark-gray/15 pt-6 text-center lg:flex-row lg:justify-between lg:text-start">
          <span className="text-b16 leading-[120%] text-primary-blue/85">
            © 2026 Hijaz Social Welfare Society (Hijaz Hospital). All rights reserved.
          </span>
          <div className="flex flex-col gap-4 lg:flex-row lg:gap-6">
            <Link href="/patient-welfare/patient-rights" className="footer-link text-b14 leading-[150%]">
              Patient Rights
            </Link>
            <Link href="/departments" className="footer-link text-b14 leading-[150%]">
              Medical Departments
            </Link>
            <Link href="/our-impact" className="footer-link text-b14 leading-[150%]">
              Our Impact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
