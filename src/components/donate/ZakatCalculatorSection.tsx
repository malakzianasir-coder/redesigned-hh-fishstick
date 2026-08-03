import { Calculator } from '@phosphor-icons/react/dist/ssr'

type ZakatCalculatorSectionProps = {
  heading: string
  body: string
}

export function ZakatCalculatorSection({ heading, body }: ZakatCalculatorSectionProps) {
  return (
    <section id="zakat-calculator" className="section-anchor border-t border-dark-gray/15 bg-white">
      <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
        <div className="flex flex-col gap-[6px] text-center">
          <p className="kicker">Zakat</p>
          <h2 className="text-h3M font-bold text-primary-blue lg:text-h3">{heading}</h2>
          <p className="mx-auto max-w-2xl text-b16 text-primary-blue/85">{body}</p>
        </div>
        <div className="card mx-auto flex max-w-2xl flex-col items-center gap-4 border-dashed p-8 text-center lg:p-12">
          <span className="icon-tile">
            <Calculator size={22} weight="duotone" />
          </span>
          <p className="text-b16 font-bold text-primary-blue">Zakat Calculator Component</p>
          <p className="text-b14 text-dark-gray">
            Production: asset inputs, nisab, 2.5% output, and embedded compact donation form with
            pre-filled amount. JazzCash integration pending.
          </p>
          <button type="button" className="btn-primary min-h-[44px] px-5 text-b14" disabled>
            Open Calculator (placeholder)
          </button>
        </div>
      </div>
    </section>
  )
}
