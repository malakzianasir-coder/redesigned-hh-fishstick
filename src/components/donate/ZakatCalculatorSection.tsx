import { getNisabPrices } from '@/utilities/nisabPrices'
import { BlockHeader } from '@/components/site/BlockHeader'
import { ZakatCalculator } from './ZakatCalculator'

type ZakatCalculatorSectionProps = {
  heading: string
  body: string
}

export async function ZakatCalculatorSection({ heading, body }: ZakatCalculatorSectionProps) {
  const initialPrices = await getNisabPrices()

  return (
    <section id="zakat-calculator" className="section-anchor border-t border-dark-gray/15 bg-white">
      <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
        <BlockHeader kicker="Zakat Calculator" title={heading} lede={body} />
        <ZakatCalculator initialPrices={initialPrices} />
      </div>
    </section>
  )
}
