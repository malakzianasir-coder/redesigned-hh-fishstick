---
name Dynamic CMS Report Builder
overview Add a `reports` collection to Payload so editors can author fully custom, data-driven impact reports (sections, copy, stats, charts, CTAs), plus an `impactReport` layout block that embeds any report on any page as a mini teaser that opens the fullscreen editorial view. Also add a filterable diagnostic tests directory where list rows show minimal data and a popup shows full test details.
todos
  - id deps
    content Add recharts dependency
    status pending
  - id collection
    content Create reports collection with SetupDataSectionsSEO tabs, dataset metrics+periods, slug, drafts; register in payload.config.ts
    status pending
  - id rowlabels
    content Add RowLabel admin components for metric and period array rows
    status pending
  - id sections
    content Create report section blocks reportIntro, reportStats, reportFigure, reportCallout, reportRichText, reportTable
    status pending
  - id types
    content Run pnpm generatetypes and verify payload-types.ts
    status pending
  - id aggregate
    content Build aggregate.ts helpers (sumlatestaveragemax) over selected periods
    status pending
  - id charts
    content Build Recharts figure components and chartTheme.ts using brand tokens and custom tooltips
    status pending
  - id shell
    content Build ReportEmbed, ReportShell (fullscreen overlay, sticky bar, TOC), and ReportSections renderer with Lenis + ScrollTrigger scroller handling
    status pending
  - id block
    content Create impactReport block, register in Pages layout and RenderBlocks
    status pending
  - id route
    content Add reports[slug] standalone route with generateStaticParams and SEO
    status pending
  - id print
    content Port print stylesheet for full multi-page PDF export
    status pending
  - id seed
    content Recreate the 2021-2025 donor report in the CMS and verify against the prototype
    status pending
  - id lab-collection
    content Create lab-tests collection (list fields rateturnaroundspecimenoutsourced plus detail fields) and register in payload.config.ts
    status pending
  - id lab-block
    content Create labTestsList block with server select + client filters (search, category, specimen, turnaround, outsourced); register in Pages layout and RenderBlocks
    status pending
  - id lab-popup
    content Build accessible test detail popup via createPortal with lazy full-document fetch and test= deep linking
    status pending
  - id lab-import
    content Write idempotent import script for Lab Test list.xlsx creating categories and upserting tests by slug
    status pending
isProject false
---

# Dynamic CMS Report Builder

## Goal

Editors create reports in the CMS the way they create pages pick sections, type copy, enter data rows, choose chart types. The frontend keeps the fullscreen editorial layout from [hijaz-analytics-hub.html](hijaz-analytics-hub.html), but rebuilt as React with site fonts (Zodiak headings  Open Sans body) and Tailwind brand tokens.

## Architecture

```mermaid
flowchart TD
  Reports[reports collectionbr(dataset + sections)] -- Block[impactReport blockbr(relationship to report)]
  Block -- Render[RenderBlocks.tsx]
  Render -- Embed[ReportEmbed (server)]
  Embed -- Mini[ReportMini hero + KPI strip + CTA]
  Embed -- Shell[ReportShell (client)brfullscreen overlay]
  Shell -- SectionRenderer[ReportSectionsbrblockType - component]
  SectionRenderer -- Charts[Recharts figures]
  Reports -- Route[reports[slug] page]
```



Two consumers of one report document the embeddable block and a standalone route for sharingprinting.

## 1. Data model — `reports` collection

New collection at [srccollectionsReportsindex.ts](srccollectionsReportsindex.ts), following the [Pages](srccollectionsPagesindex.ts) pattern (tabs, `slugField()`, drafts, versions). Register in [srcpayload.config.ts](srcpayload.config.ts) under the `Engagement & Impact` group

```ts
...[News, Events, publicationAndResearch, SuccessStories, Reports].map(...)
```

Tabs

- Report Setup — `eyebrow`, `reportTitle`, `subtitle`, `readTime`, `lastUpdated`, `footerNote`, `enableYearFilter` (checkbox, default `false`)
- Data — the shared dataset (see below)
- Sections — `sections` field of `type 'blocks'` (the report body)
- SEO — same plugin fields as Pages

### Dataset (shared, so a global year filter can be added later)

- `dataset.metrics` array of `{ key (text, e.g. opd), label, format (select number  currency  percent) }`
- `dataset.periods` array of `{ label (e.g. 2021), values array of { metric (text key), value (number) } }`

Every figure and stat references a `metric.key` rather than carrying its own numbers. That is what makes one year toggle re-drive the whole report later. Add `RowLabel` components (precedent [srcHeaderRowLabel.tsx](srcHeaderRowLabel.tsx)) so array rows display the period label and metric key instead of Item 01.

For datasets that are not year-series (e.g. the cumulative diagnostics chart), the figure block gets a `useStaticRows` option with its own `{ label, free, paid }` rows, unaffected by filters.

## 2. Report section blocks

New folder [srcblocksreport](srcblocksreport), each with `config.ts` + `Component.tsx`, mirroring the convention in [srcblocksTabularDataconfig.ts](srcblocksTabularDataconfig.ts)

- `reportIntro` — kicker, title, `richText` lead and body
- `reportStats` — kicker, title, lead, plus `stats` array of `{ label, metric (key), aggregation (select sum  latest  average  max) }`
- `reportFigure` — `figureTitle`, `description`, `chartType` (select line, bar, lineAndBar, groupedBar, stackedBar, donut, horizontalBar), `series` array of `{ metric, label, color (select from brand palette), renderAs (line  bar) }`, optional `centerLabel` for donuts, `useStaticRows` + rows
- `reportCallout` — the How you can help box heading, `richText`, `bullets` array, optional buttons via [srcfieldslinkGroup.ts](srcfieldslinkGroup.ts)
- `reportRichText` — free prose  appendix
- `reportTable` — reuse of the existing tabular rowcell shape

Figure numbering (Figure 1., Figure 2.) is computed at render time from section order, not authored.

## 3. Frontend components

New folder [srccomponentsImpactReport](srccomponentsImpactReport)

- `ReportEmbed.tsx` (server) — receives the resolved report doc, renders mini + shell
- `ReportShell.client.tsx` — fullscreen overlay state, sticky study bar, TOC rail, ESCbackdrop close, body scroll lock
- `ReportSections.tsx` — `blockType - component` map, same shape as the map in [srcblocksRenderBlocks.tsx](srcblocksRenderBlocks.tsx)
- `aggregate.ts` — `sum  latest  average  max` over selected periods; the single place the future year filter plugs into
- `charts` — Recharts wrappers (`LineBarFigure`, `DonutFigure`, `GroupedBarFigure`, `StackedBarFigure`) plus `chartTheme.ts` holding brand colors and a custom tooltip matching site styling

Recharts renders client-side only; load figures via `nextdynamic` with `ssr false` inside `ResponsiveContainer` to avoid SSR width warnings.

### Design compliance

Keep the fullscreen editorial layout as-is. Change only the type stack and tokens

- Headings inherit Zodiak, body inherits Open Sans from [srcapp(frontend)globals.css](srcapp(frontend)globals.css) — drop the Libre Baskerville import
- Colors come from [tailwind.config.mjs](tailwind.config.mjs) `primary-blue` `#1B2441`, `primary-red` `#E30016`, `dark-blue`, `dark-gray`, `whitebg`, `redbg`, `cardbg`
- Type scale uses `text-h3`  `text-h3M`, `text-b16`, etc.
- Section spacing follows the block convention `container mx-auto lgpx-[30px] lgpy-[60px] px-[24px] py-[30px]`
- Rich text via `RichText className=rich-text ... `, links via `CMSLink`

### Two scroll gotchas to handle

- Lenis smooth scroll is global via [srcprovidersLenisProvider.tsx](srcprovidersLenisProvider.tsx). The overlay scrolls in its own container, so stop Lenis (or mark the container `data-lenis-prevent`) and lock `body` while open.
- GSAP reveals inside the overlay must pass `scroller` pointing at the overlay element, the fix already proven in the prototype. Every block is additionally wrapped in `ScrollReveal` by `RenderBlocks`, so the mini teaser needs no extra reveal.

## 4. Embed block

[srcblocksImpactReportconfig.ts](srcblocksImpactReportconfig.ts) with

- `report` — relationship to `reports`, required
- `displayMode` — select `mini` (teaser that opens fullscreen) or `inline` (full report in page flow)
- `miniBlurb`, `ctaLabel` — optional overrides
- `kpis` — array of up to four `{ metric, label, aggregation }` for the teaser strip

Register in the `layout.blocks` array in [srccollectionsPagesindex.ts](srccollectionsPagesindex.ts) (line 111) and add `impactReport ImpactReportBlock` to `blockComponents` in [srcblocksRenderBlocks.tsx](srcblocksRenderBlocks.tsx). Optionally add to the Services, Departments, News and Events layouts too.

## 5. Standalone route

[srcapp(frontend)reports[slug]page.tsx](srcapp(frontend)reports[slug]page.tsx), copying the query and `generateStaticParams` pattern from [srcapp(frontend)[slug]page.tsx](srcapp(frontend)[slug]page.tsx). Renders the report in permanently-open mode — this is the shareable and printable URL.

## 6. Print  PDF

Port the print stylesheet already added to the prototype into a scoped stylesheet for the report expand the fixed overlay to static flow, hide railTOCfiltersmini, force `[data-reveal]` visible, and apply `break-inside avoid` to sections and figures.

## 7. Deferred global year filter

Not built now, but the model supports it `enableYearFilter` on the report, `selectedPeriods` state in `ReportShell`, and every stat and figure already resolving through `aggregate.ts`. Turning it on later is a UI addition, not a data migration.

## 8. Diagnostic tests directory

A second, self-contained feature every lab test on one page, filterable, where the list row shows only the essentials and clicking a test opens a popup with the full record.

Source data is [tmp-content-extractLab Test list.txt](tmp-content-extractLab Test list.txt) — roughly 71 routine tests grouped into Routine Chemistry, Glucose Profile, Special Chemistry, Microbiology, Haematology and Coagulation Profile, plus in-house and outsourced dengue tests. Each row carries test name, rate in PKR, reporting time and specimen type.

### Collection `lab-tests`

[srccollectionsLabTestsindex.ts](srccollectionsLabTestsindex.ts), registered in [srcpayload.config.ts](srcpayload.config.ts) under the `Hospital & Care` group alongside Services and Departments.

List fields (the minimum viable data shown while filtering)

- `title` — test name, required
- `slug` — via `slugField()`, used for deep links
- `categories` — relationship to the existing `categories` collection, matching how [ServicesList](srcblocksServicesListComponent.tsx) filters
- `rate` — number, PKR
- `turnaroundTime` — text, e.g. `24 Hrs`
- `specimen` — text, e.g. `Serum (clotted vial)`
- `isOutsourced` — checkbox

Detail fields (popup only)

- `description` — richText, what the test is for
- `preparation` — richText, fasting and patient instructions
- `includedTests` — array, panel components (Liver Function Test expands to Bilirubin, ALT, AST, ALP, Albumin)
- `sampleInstructions`, `reportDelivery`, `availability`
- `alsoKnownAs` — array of synonyms, feeds the search filter
- `department` — optional relationship to `departments`

### Block `labTestsList`

[srcblocksLabTestsList](srcblocksLabTestsList) with a server `Component.tsx` that fetches using a narrow `select`, exactly the shape used in [ServicesListComponent.tsx](srcblocksServicesListComponent.tsx), then hands off to `LabTestsListClient.tsx`.

Client-side filtering so results update instantly with no reload

- Search across test name and `alsoKnownAs`
- Category chips with an All tests default
- Specimen type
- Turnaround time
- In-house vs outsourced
- Optional sort by price or name

Mobile uses the filter drawer already established in [ServicesListClient.tsx](srcblocksServicesListServicesListClient.tsx) and [DepartmentsListClient.tsx](srcblocksDepartmentsListDepartmentsListClient.tsx).

Register `labTestsList` in the `layout.blocks` array in [srccollectionsPagesindex.ts](srccollectionsPagesindex.ts) and in `blockComponents` in [srcblocksRenderBlocks.tsx](srcblocksRenderBlocks.tsx).

### Detail popup

Reuse the `createPortal` modal already in [srcblocksTextWithIconsComponent.tsx](srcblocksTextWithIconsComponent.tsx) `fixed inset-0 z-[100]`, `role=dialog` with `aria-labelledby`, backdrop click and Escape to close, focus trap and scroll lock.

Because the list query deliberately selects only list fields, the popup lazy-loads the full document on open via `GET apilab-tests{id}depth=1`, shows a skeleton while loading, and caches the result in client state so reopening is instant. If the catalogue stays near 100 rows, preloading everything up front is an acceptable simplification — decide after measuring the payload.

Deep link support `test=slug` opens that test's popup directly, so a single test can be shared or linked from a department page.

### Import script

[scriptsimport-lab-tests.mjs](scriptsimport-lab-tests.mjs), following the existing scripts in [scripts](scripts). It reads [tmp-content-copyLab Test list.xlsx](tmp-content-copyLab%20Test%20list.xlsx), creates the category documents, then upserts tests keyed by slug so re-running is idempotent. Detail fields stay empty for editors to fill in later.

## Validation

Recreate the current Hijaz Hospital Trust 2021–2025 report entirely through the CMS and confirm it matches the prototype visually, then embed it on a page via the block.

For the tests directory import the spreadsheet, place the `labTestsList` block on a page, and confirm filters narrow correctly, the popup loads full details, and `test=` deep links resolve.