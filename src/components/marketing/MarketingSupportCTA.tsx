import Link from 'next/link'

export function MarketingSupportCTA({ id, className }: { id?: string; className?: string }) {
  return (
    <section
      id={id}
      className={['relative overflow-hidden bg-primary-blue', className].filter(Boolean).join(' ')}
    >
      <div className="pointer-events-none absolute bottom-0 left-1/4 aspect-square w-[250px] rounded-full bg-light-blue opacity-40 blur-[200px]" />
      <div className="container relative mx-auto px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
        <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:items-center lg:justify-between lg:text-start">
          <div className="flex w-full max-w-xl flex-col items-center gap-[6px] lg:items-start">
            <p className="kicker">Support Our Mission</p>
            <h2 className="text-h4M font-bold text-white lg:text-h4">Help Us Keep Care Within Reach for Every Patient</h2>
            <p className="text-b16 text-white/85">
              Your donation supports free treatment, medicines, and welfare programmes for deserving patients —
              fulfilling our mission that financial hardship never stands in the way of care.
            </p>
          </div>
          <Link href="/donate" className="btn-on-dark shrink-0">
            Donate Now
          </Link>
        </div>
      </div>
    </section>
  )
}
