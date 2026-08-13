# COMPONENTS.md — Hijaz Hospital page building blocks

**How to compose patient-facing pages.** Tokens, typography, and visual rules live in
[`DESIGN-SYSTEM.md`](./DESIGN-SYSTEM.md). This document tells you **which React
components to use, when, and how to assemble home, marketing, and donate pages**.

Living preview: `/dev/components` (`ComponentShowcase`).

---

## 0. Goals for current work

1. **Interior page hero** — match `/our-purpose` (`MarketingHeroSection`). Migrate
   donate / cause / how-to-donate pages off `MediumHero`.
2. **Home keeps its own hero** — `HomeHeroSlider` (full-bleed media slider). Do not
   replace it with `MarketingHeroSection`.
3. **Replace generic stacks** on:
   - `/donate/how-to-donate`
   - Donate a Meal · Donate in Kind · Sponsor a Patient · Sponsor Free Surgeries ·
     Support a Project (`/donate/[slug]`)
4. Prefer **purpose-built patterns** already proven on home and Our Purpose (block
   headers, media cards, icon tiles, impact tables, real photography) over repeated
   plain `content` sections and illustration-preset heroes.

---

## 1. Page families

| Family | Entry | Hero | Breadcrumb | Jump nav | Closing CTA |
|---|---|---|---|---|---|
| **Home** | `HomePage` | `HomeHeroSlider` | No | No | Optional / none (donate lives mid-page via `WaysToGiveSection`) |
| **Marketing / about** | `*Content.tsx` (e.g. `OurPurposeContent`) | `MarketingHeroSection` | `MarketingBreadcrumb` | Optional `JumpNav` | `MarketingSupportCTA` |
| **Donate hub / causes / how-to** | `DonatePage`, `DonationCauseContent`, how-to page | **Migrate to** `MarketingHeroSection` | `MarketingBreadcrumb` | **Hub filter chips** (not JumpNav) | One of `MarketingSupportCTA` / `GlobalCtaSection` |
| **Catalogue hub** | `CategoryHubGrid`, `DoctorsHubGrid`, news/events/stories hubs | None (centered listing `h1`) | `MarketingBreadcrumb` (`Home / Current`) | **Hub filter chips** (same rail) | Optional `GlobalCtaSection` |
| **Clinical detail** | `DetailPageTemplate` | `MediumHero` (legacy) | Varies | Optional `JumpNav` | Default `cta` unless suppressed |
| **Articles** | `ArticlePageTemplate` | `ArticleHero` | Template-owned | No | As designed |
| **404** | `(frontend)/not-found.tsx` | `MarketingHeroSection` | `MarketingBreadcrumb` | No | `MarketingSupportCTA` |

Reuse **section recipes** across families (block headers, card grids, ds3d carousel)
even when the hero differs.

---

## 2. Page shells

### 2.1 Home

```
HomeHeroSlider
Intro (split media + quote)
Compliance (BlockHeader + static cards)
FactsOrbitSection
Engage (icon cards)
Services (media cards)
WaysToGiveSection
Founders (founder cards)
Stories (media cards)
Team (portrait grid)
News (media cards)
Events (date-chip cards)
Machinery (HomeMachineryCarousel / Ds3dCarousel)
```

Reference: `src/components/home/HomePage.tsx` + `content/home.json`.

No breadcrumb. No marketing hero. Sections alternate `bg-white` /
`bg-whitebg` with `border-t border-dark-gray/15` where home already does.

### 2.2 Marketing / donate (interior content pages)

```
MarketingBreadcrumb
MarketingHeroSection
JumpNav                    ← content-full / slug pages only — chips **scroll**, never filter
Body sections
MarketingSupportCTA | GlobalCtaSection
```

Reference: `OurPurposeContent.tsx`.

`JumpNav` is implemented in `sections/JumpNav.tsx` (also re-exported from `MarketingShell`).
It shares `ChipRail` with How to Donate / What You Can Support sibling navs: sticky under
the header, centered chips. Hash chips scroll and spy the active section. Other-page hrefs
render as external chips (`ph-arrow-square-out`, `target="_blank"`). Sibling method/cause
chips stay same-tab; hub links sit in the external set (`withJumpExternals` appends the
parent hub without duplicating hrefs already in the list).

### 2.3 Hubs (content + catalogue) — `ContentHubPage` + `hub-page-patterns.html`

Shared chrome. Live content hubs: `/donate`, `/about-us`, `/patient-welfare`.
Catalogue hubs: departments, services, doctors, news, events, success stories, lab tests.

```
MarketingBreadcrumb                          ← every hub
MarketingHeroSection                         ← content hubs only (/donate, /about-us, /patient-welfare)
Centered listing h1                          ← catalogue hubs only
Filter chips (All + on-page groups)          ← hubs only; hides other groups or cards
External chips (arrow-square-out, new tab)   ← other-page hrefs; never mixed into the rail
Topic groups (`ContentHubPage`) / CategoryHubGrid
MarketingSupportCTA | GlobalCtaSection       ← content hubs
```

Hubs **filter** (`HubFilterRail` + hash, same as `CategoryHubGrid`). Counts off by default
(`showCounts`); Doctors and Lab tests keep counts on their own chip UIs. Innermost content-full
pages (`/our-purpose`, `/leadership`, department and welfare details) use `JumpNav` — chips
**scroll** to the section (H08), never hide content. Mega-menu group hashes
(`/patient-welfare#patient-resources`, `/about-us#leadership`) activate the matching filter
chip on hubs.

---

## 3. Heroes

Three sanctioned heroes. Pick by page family — do not invent a fourth.

### 3.1 `HomeHeroSlider` — home only

**Path:** `home/HomeHeroSlider.tsx`

**When:** `/` only.

**Layout:** Full-bleed (~`min-h-[92vh]`) photo slides, `bg-dark-blue` overlay
(`bg-dark-blue/40`), centered white `h1`/`h2` + body, prev/next + dots, autoplay.

**Rules:**

- Edge-to-edge media plane — not an inset card hero.
- First slide owns the sole `h1`; later slides use `h2` at the same display size.
- Do not put bank details, stats strips, or method lists in the slider.
- Do not reuse this slider on interior pages.

### 3.2 `MarketingHeroSection` — canonical interior hero (Our Purpose)

**Path:** `marketing/MarketingHero.tsx`

**When:** About / marketing / donate hub / donation cause / how-to-donate (after
migration).

**Layout:** White background · 12-col split · left copy (kicker, `h1`, excerpt,
optional CTA links) · right media (`aspect-video` `max-h-[320px]` `rounded-xl`
image, or dashed placeholder while art is pending).

**Content shape** (`MarketingHero` in `src/lib/content/types.ts`):

| Field | Required | Notes |
|---|---|---|
| `kicker` | preferred | `.kicker` eyebrow |
| `title` | yes | Page `h1` |
| `excerpt` | preferred | One short supporting sentence |
| `excerptVariant` | optional | `body` (default) or `quote` — italic description with a red rule; **no quotation marks are added**. Independent of the separate `quote` field. **Live:** departments + all Patient Care `/services/[slug]` pages. Mock: `/ds/hero-quote` |
| `quote` | optional | Separate pull-quote (e.g. Qur’an on Donate). Use **instead of** `excerpt`, not stacked with it. See [Content-System.md](Content-System.md) |
| `media` | preferred | Prefer `type: "image"` with real photo; placeholder only temporarily |
| `links` | optional | Primary / ghost pills into on-page anchors or actions |

**Rules:**

- Prefer **photography** over illustration presets.
- Do not put stats, bank details, or method lists in the hero.
- Do not use navy/red full-bleed backgrounds on these pages.
- Do not use this on the home page (home uses `HomeHeroSlider`).
- Do not stack `quote` and `excerpt` — one hero support line only ([Content-System.md](Content-System.md)).
- Patient Care (`/services/[slug]`): `excerptVariant: 'quote'` with a single excerpt (enforced in `ServiceDetailContent`).

### 3.3 `ArticleHero` — articles only

**Path:** `articles/ArticleHero.tsx`

**When:** News / events / success-story article templates. Variants: `news` |
`event` | `story`.

### 3.4 Legacy: `MediumHero` — migrate away on donate surfaces

| Location | Status |
|---|---|
| `heros/MediumHero.tsx` | Used by `DetailPageTemplate`, `DonatePage`, patient-care hubs |
| `sections/MediumHero.tsx` | Older duplicate API — do not use in new work |

Supports `white` / `navy` / `red`, taglines, stats, illustration presets. That variety
is why donate pages look generic next to Our Purpose / home.

**Migration target:** donate hub, how-to-donate, and donation causes →
`MarketingHeroSection`. Keep `MediumHero` for clinical detail until a later pass.

---

## 4. Home components & section recipes

Home is assembled in `HomePage` from `content/home.json` plus a few dedicated
components. Prefer extracting repeated recipes into shared components when rebuilding
donate pages (same cards / headers), rather than inventing new layouts.

### 4.1 Dedicated home components

| Component | Path | When |
|---|---|---|
| `HomePage` | `home/HomePage.tsx` | `/` composition root |
| `HomeHeroSlider` | `home/HomeHeroSlider.tsx` | Home hero only (§3.1) |
| `FactsOrbitSection` | `home/FactsOrbitSection.tsx` | Animated impact orbit / KPI showcase on home |
| `WaysToGiveSection` | `home/WaysToGiveSection.tsx` | Tabbed donation methods (online, JazzCash, bank, other) — home (and reusable where a methods panel is needed) |
| `HomeMachineryCarousel` | `home/HomeCarousels.tsx` | ds3d machinery row on home |
| `HomeTeamCarousel` | `home/HomeCarousels.tsx` | ds3d team row (available; home currently uses a portrait grid for team) |
| `Ds3dCarousel` | `ds3d/` | Underlying infinite 3D carousel (DESIGN-SYSTEM §8) |

### 4.2 Home section decision table

| Home block (`id`) | Pattern | Reuse on other pages? |
|---|---|---|
| `#hero` | `HomeHeroSlider` | No — home only |
| `#intro` | Split layout: overlapping photo pair + kicker/heading/body/quote + `btn-ghost` | Quote+CTA split OK on about pages; keep stacked photos as a home signature |
| `#compliance` | `BlockHeader` + 3 static credential cards | Yes — same as compliance strips elsewhere |
| Facts | `FactsOrbitSection` | Prefer `HeadlineStatsGrid` / `StatsRowSection` on interior pages unless the orbit treatment is intentional |
| `#engage` | Centered header + `card-grid--3` icon action cards | Yes — same as marketing icon feature grids / donate engage cards |
| `#services` | `BlockHeader` + media cards (`aspect-card` + kicker/title/body) | Yes — canonical media card (DESIGN-SYSTEM §7) |
| Ways to give | `WaysToGiveSection` | Yes for donation-method UX; how-to-donate may specialize further |
| `#our-founders` | `BlockHeader` + `.founder-card` pair | Leadership/profile pages; don’t use for generic lists |
| `#stories` | `BlockHeader` + media cards | Yes — success-story teasers |
| `#team` | `BlockHeader` + dense portrait grid (`card-grid--6`) | Doctor hubs / home; use `DoctorsHubGrid` on the doctors hub |
| `#news` | `BlockHeader` + media cards (date meta) | Yes — news teasers |
| `#events` | `BlockHeader` + date-chip + copy cards | Yes — event teasers |
| `#machinery` | Centered header + `HomeMachineryCarousel` | Featured media collections → ds3d (DESIGN-SYSTEM §8) |

### 4.3 Shared building blocks used heavily on home

| Block | Path / class | Role |
|---|---|---|
| `BlockHeader` | `site/BlockHeader.tsx` | Kicker · title · lede · optional “View all” `btn-ghost` — default for hub-style sections |
| `CenteredSectionStack` | `site/CenteredSectionStack.tsx` | Wrap centered `BlockHeader` + prose so body is not left-flush |
| Media card | `.card-interactive` + `aspect-card` image + copy pad | Services, stories, news |
| Icon action card | `.card-interactive` + `.icon-tile` + title + body + text CTA | Engage, donate cause grids |
| Founder card | `.founder-card` | Portrait + role + excerpt |
| Event date chip | `bg-redbg` day/month tile beside copy | Events lists |
| Section shell | `container mx-auto px-6 lg:px-[30px] py-[30px] lg:py-[60px]` | Every new section |

**Cards:** interactive → `.card-interactive`; static → `.card` / bordered panels. Do not
card-wrap every paragraph (DESIGN-SYSTEM §7).

**Icons:** Phosphor duotone in `.icon-tile`. Map through existing maps — do not invent
one-off SVGs.

---

## 5. Detail / JSON-driven sections (`DetailPageTemplate`)

These map from `Section` types in content JSON. Wired in
`templates/DetailPageTemplate.tsx`.

**Backgrounds:** alternate `white` ↔ `muted` (`bg-whitebg`). Use `red` only for
`content` when a soft red tint is intentional (`bg-redbg`).

Every section should follow the block header idea from DESIGN-SYSTEM §9 (or use
`BlockHeader` like home): kicker · heading · optional lede · then one content pattern.

### 5.1 Decision table

| Need | Section `type` | Component | Prefer when |
|---|---|---|---|
| Prose overview / closing copy | `content` | `ContentSection` | 1–3 paragraphs; optional side image |
| Feature / option cards | `bullets` + `layout: "cards"` | `BulletsSection` | Short items; add `icon` when possible |
| Tag / chip lists | `bullets` + `layout: "chips"` | `BulletsSection` | Dense label lists (conditions, categories) |
| Numbered method / FAQ-style cards | `numberedList` | `NumberedListSection` | Ordered steps with title + body (+ optional nested bullets) |
| Sequential process | `processSteps` | `ProcessStepsSection` | Vertical “step 1…n” with item lines |
| Amount → impact | `impactTable` | `ImpactTableSection` | Donation tiers (e.g. Donate a Meal) |
| Icon label grid | `iconGrid` | `IconGridSection` | Facilities / amenity grids |
| Highlight / partnership band | `callout` | `CalloutSection` | Single emphasis card with optional logo; DS P12 measure (`max-w-3xl`) |
| Big numbers | `stats` | `StatsRowSection` | 2–4 KPI tiles (not in the hero) |
| Procedure / service groups | `serviceGroups` | `ServiceGroupsSection` | `finder` = multi-group catalogues (departments, pathology); `stack` = same `ProcedureListPanel` chrome without rail (Patient Care); `links` = card link grid |
| Room / capacity cards | `accommodation` | `AccommodationSection` | Inpatient room types |
| Quote strip | `closingBand` | `ClosingBandSection` | Short mission quote on `redbg` |
| Success stories teaser | `patientStories` | `PatientStoriesSection` | Department pages (CMS-fed later) |
| Embedded form | `dynamicForm` | `DynamicFormSection` | Contact / enquiry forms by `formId` |
| Dark support CTA | `cta` | `GlobalCtaSection` | End-of-page donate CTA |

### 5.2 Section notes (how-to-donate & causes)

**`ContentSection`** — Use sparingly. Stacking many `content` blocks reads as a
generic document. Prefer one overview (or fold into the hero excerpt), structured
lists for methods, and a `callout` for assistance contacts. **No image:** use
`CenteredSectionStack` so header + prose share one centered column. **`align: "start"`:**
left-align header and body together — never center the header alone over left-flush copy.

**`NumberedListSection`** — Bank accounts, wallet tills, Meezan categories. Short
titles; IBANs / till IDs in nested `bullets`.

**`BulletsSection` (cards)** — Accepted items / sponsorship options / projects. Prefer
icons so cards match home engage tiles and Our Purpose values cards.

**`serviceGroups`** — Department pages use `layout: "finder"` (search + group rail +
`ProcedureListPanel`). Patient Care single lists use `layout: "stack"`: centered
BlockHeader + the same panel chrome at ~department detail-column width (`lg:w-2/3`).
Do not twin `groups[].heading` with the section `heading` — omit the group heading so
the panel shows “Complete list / All services”.

**`CalloutSection`** — DS P12 program callout: `sectionMeasureClasses.narrowBand`, optional
logo slot (e.g. Sehat Sahulat), in-card title at `h5` scale. Tokens live in
`src/components/site/sectionMeasures.ts`.

**`ImpactTableSection`** — Canonical for Donate a Meal tiers. Do not rebuild inside
`content`.

**`ProcessStepsSection`** — When order matters (e.g. pick-up). Prefer over prose walls.

**CTAs** — Prefer **one** closing dark CTA per interior page. Home embeds giving via
`WaysToGiveSection` instead of a trailing `MarketingSupportCTA`.

### 5.3 Sections to avoid on donate cause pages

| Section | Why |
|---|---|
| `accommodation` | Patient-care only |
| `serviceGroups` / `ProcedureFinder` | Department catalogues |
| `patientStories` | Until stories are tagged to causes |
| `iconGrid` | Weak substitute for real photography + `bullets` with icons |
| Navy/red `MediumHero` variants | Breaks the interior-hero standard |
| `HomeHeroSlider` | Home only |

---

## 6. Marketing patterns (Our Purpose + home quality bar)

| Pattern | Component / recipe | When |
|---|---|---|
| Block header | `BlockHeader` | Hub-style sections (home services/news/events; donate grids) |
| Media card grid | `.card-interactive` + `aspect-card` | Services, stories, news teasers |
| Icon feature / action grid | `card-grid--3`/`--4` + `icon-tile` | Engage, sponsorship options |
| Approach / values list | `.approach-list` + `.icon-tile--sm` | Our Purpose Approach and Values (Title–body rows, 2-col grid) |
| Paired feature cards | `card-grid--2` + `card-interactive` | Vision/mission-style dual points |
| Timeline | `JourneyTimeline` | Chronological story only |
| Headline KPIs | `HeadlineStatsGrid` | Impact pages with animated counts |
| Home impact orbit | `FactsOrbitSection` | Home signature KPI treatment |
| Cause card grid | `DonationCauseGrid` | Donate hub listings |
| Ways to give tabs | `WaysToGiveSection` | Home (and reusable methods panel) |
| Featured media carousel | `Ds3dCarousel` / `HomeMachineryCarousel` | 4+ browsable media items (DESIGN-SYSTEM §8) |
| Zakat tool | `ZakatCalculatorSection` | When `zakatCalculator.enabled` |

---

## 7. Donate-specific components

| Component | Use |
|---|---|
| `DonatePage` | `/donate` hub composition |
| `DonationCauseContent` | `/donate/[slug]` — breadcrumb + MarketingHero + sections + how-to-donate link + optional zakat |
| `DonationCauseGrid` | Linked cause cards on the hub |
| `MockDonationFlow` | Dev / mock checkout only |
| `ZakatCalculator` / `ZakatCalculatorSection` | Interactive calculator block |
| How-to-donate hub + methods | `HowToDonateHubContent`, `HowToDonateMethodContent` | `/donate/how-to-donate`, `/donate/how-to-donate/[method]` |

### 7.1 Target composition — what-you-can-support

**Hub** `/donate/what-you-can-support`:

```
MarketingBreadcrumb
MarketingHeroSection
WhatYouCanSupportNav
Cause card grid
How to Donate CTA band
MarketingSupportCTA
```

**Cause subpages** `/donate/what-you-can-support/[cause]`:

| Slug | UI |
|---|---|
| `donate-a-meal` | Tagline prose + impact table + closing |
| `donate-in-kind` | Prose + accepted-items cards + closing |
| `sponsor-a-patient` | Prose + option cards (title/body) + closing |
| `sponsor-free-surgeries` | Prose + option cards + closing |
| `support-a-project` | Prose + project cards + closing |

Do not rebuild these as stacked `content` / `bullets` DetailPageTemplate sections.

### 7.2 Target composition — donation cause (Ways to Give)

```
MarketingBreadcrumb
MarketingHeroSection          ← photo + kicker + title + excerpt (+ Donate CTA)
JumpNav                       ← optional (Overview / Impact / Options)
ContentSection or custom intro
ProcessSteps or Callout       ← contact / next steps
Link band → /donate/how-to-donate
MarketingSupportCTA           ← single closing CTA
```

### 7.3 Target composition — how-to-donate

**Hub** `/donate/how-to-donate`:

```
MarketingBreadcrumb
MarketingHeroSection
HowToDonateMethodNav          ← Overview + method chips
Method card grid              ← card-interactive + icon-tile
Receipts + Need Assistance    ← contact band with tel/mailto (not CalloutSection)
MarketingSupportCTA
```

**Method subpages** `/donate/how-to-donate/[method]`:

| Slug | UI |
|---|---|
| `online` | CTA card + Donate Online button |
| `mobile-wallet` | JazzCash till + copy chip + QR placeholder |
| `bank-transfer` | Bank account cards with copyable fields |
| `meezan-app` | Category cards + QR Code Donation panel |
| `cheque` | Payable-to + address block |
| `pick-up` | Accepted-items grid + arrange/closing prose |

Do not rebuild these as stacked `content` / `numberedList` sections.

---

## 8. Closing CTAs

| Component | API | When |
|---|---|---|
| `MarketingSupportCTA` | Fixed copy → `/donate` | Marketing / about / zakat-enabled causes |
| `GlobalCtaSection` | JSON `type: "cta"` | Page-specific heading / button |
| `WaysToGiveSection` | Home content | Primary giving UX on home (not a dark band) |

Dark bands share the same visual: `bg-primary-blue`, glow blob, white type,
`.btn-on-dark`.

`DetailPageTemplate` appends a default `cta` unless `includeDefaultCta={false}` or the
page already defines one. Do not stack `MarketingSupportCTA` and `GlobalCtaSection` on
the same page.

---

## 9. Templates

| Template / root | Hero today | Intended hero | Used by |
|---|---|---|---|
| `HomePage` | `HomeHeroSlider` | Keep | `/` |
| Marketing `*Content.tsx` | `MarketingHeroSection` | Keep (canonical interior) | Our Purpose, Impact, Leadership, Supporters |
| `DonatePage` / causes / how-to | `MediumHero` (via template or direct) | Migrate → `MarketingHeroSection` | Donate surfaces |
| `DetailPageTemplate` | `MediumHero` | Keep for clinical detail until backlog; donate subset migrates first | Services, departments, patient-care detail |
| `ArticlePageTemplate` | `ArticleHero` | Keep | News / events / stories |

New interior pages should use the marketing shell — not a new hero component. New home
sections should follow §4 recipes and `BlockHeader`, not invent alternate headers.

---

## 10. Hub & article components

Use only in their domains:

- Hub grids: `CategoryHubGrid`, `DoctorsHubGrid`, `LabTestsTable`, hub `*Content`
- Articles: `ArticleBody`, `ArticleCard`, `RelatedArticles`, `CategoryFilter`
- Site chrome: `SiteHeader`, `SiteFooter`, `FloatingQuickActions`, `UtilityTopBar`
- Forms: `DynamicForm`, `NewsletterSignup`
- Media: `Media` / `Illustration` (illustration presets OK for clinical detail heroes
  until migration; **not** preferred for home, marketing, or donate heroes)

---

## 11. Content authoring checklists

### 11.1 Home

- [ ] Hero is `HomeHeroSlider` only (full-bleed); no `MarketingHeroSection` /
      `MediumHero` on `/`
- [ ] Each section has one job, `BlockHeader` (or centered equivalent), and one card
      pattern
- [ ] Media cards use real photography + `aspect-card`
- [ ] Engage / give CTAs use icon tiles or `WaysToGiveSection` — not a wall of prose
- [ ] Machinery / large media collections use ds3d, not a one-off carousel
- [ ] No CMS / editorial notes rendered (see `AGENTS.md`)
- [ ] Section shells and tokens match `DESIGN-SYSTEM.md`

### 11.2 Donate / cause / how-to-donate

- [ ] Hero is `MarketingHeroSection` with photo (or temporary placeholder), not
      `MediumHero` illustration preset and not `HomeHeroSlider`
- [ ] Breadcrumb uses `MarketingBreadcrumb`
- [ ] Jump links only if ≥3 distinct sections with stable `id`s
- [ ] No back-to-back `content` sections that could be one block or a structured list
- [ ] Options use `bullets` cards with icons (or home-style icon grids)
- [ ] PKR tiers use `impactTable`
- [ ] Bank / wallet / app methods use `numberedList`, method cards, or
      `WaysToGiveSection`-class UX
- [ ] Exactly one dark support CTA (home excepted — uses mid-page ways to give)
- [ ] No CMS / editorial notes rendered
- [ ] Section shells use `container mx-auto px-6 lg:px-[30px] py-[30px] lg:py-[60px]`
- [ ] Tokens from `DESIGN-SYSTEM.md` only

---

## 12. Quick “when to use what”

| Content | Use |
|---|---|
| Home landing hero (full-bleed slides) | `HomeHeroSlider` |
| Interior page title + intro + image | `MarketingHeroSection` |
| Article title + meta | `ArticleHero` |
| On-this-page navigation (interior) | `JumpNav` |
| Section kicker / title / lede / view-all | `BlockHeader` |
| Home intro with quote + photos | Home intro split (see `HomePage`) |
| Home / hub media teasers | Media card grid (services / stories / news pattern) |
| Home engage / icon actions | Icon action cards |
| Home donation methods | `WaysToGiveSection` |
| Home impact orbit | `FactsOrbitSection` |
| Featured equipment / media browse | `HomeMachineryCarousel` / `Ds3dCarousel` |
| Short story / policy prose | `ContentSection` (once) |
| “Your gift provides…” tiers | `ImpactTableSection` |
| Accepted items / sponsorship options | `BulletsSection` `layout: "cards"` + icons |
| Bank accounts / wallet tills | `NumberedListSection` |
| Ordered “how it works” | `ProcessStepsSection` |
| Contact / assistance highlight | `CalloutSection` |
| Link to methods page | Centered band + `btn-primary` (`DonationCauseContent`) |
| End of interior page donate push | `MarketingSupportCTA` or `cta` → `GlobalCtaSection` |
| Missing route (404) | `(frontend)/not-found.tsx` — MarketingHero + helpful destination cards |
| Hub cause listing | `DonationCauseGrid` |

---

## 13. Related files

| File | Role |
|---|---|
| `DESIGN-SYSTEM.md` | Tokens, type, cards, buttons, motion, ds3d |
| `src/lib/content/types.ts` | `MarketingHero`, `HeroConfig`, `Section`, home content types |
| `content/home.json` | Home section copy and card data |
| `src/components/home/HomePage.tsx` | Home composition reference |
| `content/our-purpose.json` | Canonical interior hero + section example |
| `content/how-to-donate.json` | Methods page data (migrate presentation) |
| `content/donations.json` | Cause records |
| `src/components/dev/ComponentShowcase.tsx` | Visual catalogue |
| `src/app/(frontend)/dev/components/page.tsx` | Showcase route |
