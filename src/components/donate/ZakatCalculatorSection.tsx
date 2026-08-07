import { ZakatCalculator } from './ZakatCalculator'

type ZakatCalculatorSectionProps = {
  heading: string
  body: string
}

export function ZakatCalculatorSection({ heading, body }: ZakatCalculatorSectionProps) {
  return (
    <section id="zakat-calculator" className="section-anchor border-t border-dark-gray/15 bg-white">
      <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
        <div className="flex flex-col gap-[6px] text-center lg:mx-auto lg:w-2/3">
          <h2 className="text-h3M font-bold leading-[120%] text-primary-blue lg:text-h3">
            {heading}
          </h2>
          <p className="text-b16 leading-[150%] text-primary-blue/85 lg:text-b18">{body}</p>
        </div>
        <ZakatCalculator />
      </div>
    </section>
  )
}
