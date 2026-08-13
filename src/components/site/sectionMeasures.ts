/**
 * Canonical content-width measures from DESIGN-SYSTEM.md §9.1 and closing/callout bands.
 * Prefer `CenteredSectionStack` when the column should also be text-center.
 */
export const sectionMeasureClasses = {
  /** BlockHeader lede, hero excerpt (§9.1) */
  lede: 'max-w-[560px]',
  /** Panels / prose under a centered BlockHeader — column only; do not add text-center */
  centeredColumn: 'mx-auto w-full lg:w-2/3',
  /** Closing bands, program callouts (P12), narrow footnotes */
  narrowBand: 'mx-auto w-full max-w-3xl',
} as const
