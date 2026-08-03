import { WaysToGiveSection } from '@/components/home/WaysToGiveSection'
import { DetailPageTemplate } from '@/components/templates/DetailPageTemplate'
import { MarketingBreadcrumb } from '@/components/marketing/MarketingShell'
import type { DonateHubContent, DonationCauseRecord } from '@/lib/content/types'

type DonationCauseContentProps = {
  cause: DonationCauseRecord
  donateHub: DonateHubContent
}

function filterWaysToGive(
  waysToGive: DonateHubContent['waysToGive'],
  bankAccountKeys?: string[],
): DonateHubContent['waysToGive'] {
  if (!bankAccountKeys || bankAccountKeys.length === 0) {
    return waysToGive
  }

  return {
    ...waysToGive,
    bankAccounts: waysToGive.bankAccounts.filter(
      (account) => account.key && bankAccountKeys.includes(account.key),
    ),
  }
}

export function DonationCauseContent({ cause, donateHub }: DonationCauseContentProps) {
  const waysToGive = filterWaysToGive(donateHub.waysToGive, cause.bankAccountKeys)

  return (
    <>
      <MarketingBreadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Donate', href: '/donate' },
          { label: cause.title },
        ]}
      />
      <DetailPageTemplate page={cause} />
      <WaysToGiveSection
        content={{
          ...waysToGive,
          kicker: 'How to Donate',
          heading: `Support ${cause.title}`,
          lede: 'Choose the donation method that is most convenient for you.',
          cta: { label: 'View all ways to give', href: '/donate#how-to-donate' },
        }}
        sectionId="how-to-donate"
      />
    </>
  )
}
