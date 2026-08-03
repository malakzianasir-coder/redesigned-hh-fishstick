# AI Handoff Guide — Hijaz Hospital CMS & Design System

**Purpose:** Onboard a new AI agent to continue static mockups, CMS schema work, and Next.js/Payload implementation for Hijaz Hospital. Read this first, then the linked files in order.

**Repos (two-repo model):**

| Repo | Path | Role |
|------|------|------|
| **hijaz** | `c:\Work\hijaz` | Original Payload 3.42 CMS + HTML design-system mockups in `public/*.html`. **Source of truth** for mockups and content corpus. MongoDB `hijaz_dev`. |
| **hijaz-2026** | `c:\Work\hijaz-2026` | New static React site (Payload template scaffold; **no CMS content for public pages**). JSON-driven pages under `content/`. MongoDB `hijaz_2026` for Payload bootstrap/admin only. |

**Stack:** Payload 3.42 + Next.js App Router · pnpm

---

## 1. What this project is doing

Hospital employees need a **simplified CMS** so they can manage departments, services, lab tests, doctors, patient care, welfare, donations, and about/impact content without fighting the current layout-block sprawl.

### hijaz (main repo) — CMS track

**Current phase (mostly complete):** Static HTML mockups in the **design system** (`DESIGN-SYSTEM.md`), a **UI pattern catalog** (every distinct section type), a **mega menu** IA, and a **site build inventory** mapping every route to CMS fields/blocks.

**Next phase (not started in code):** Implement approved patterns as Payload blocks/fixed fields, rebuild pages from mockups, seed content from DOCX/txt sources, wire navigation and breadcrumbs. Implementation phases in [`SITE-BUILD-INVENTORY.md`](c:\work\hijaz\SITE-BUILD-INVENTORY.md) still apply here.

### hijaz-2026 — static React site (parallel track, in progress)

A **JSON-driven static site** porting approved DS mockups to React components. Public pages read from `content/*.json`, not Payload collections. Payload exists only as template scaffolding (admin, posts template leftovers). See **hijaz-2026 static site** section below for routes, content model, and gaps.

**Non-negotiable content rule:** Patient-facing copy must be **verbatim** from source `.txt` files in `archive/tmp-content-extract/` (and `archive/tmp-docx-extract/`). Do not fix typos unless the user explicitly asks. Editorial/CMS notes (e.g. "need to review yet", "Ask Ms. Tabassum") render as **dashed placeholder callouts**, not public copy.

---

## hijaz-2026 static site (parallel track)

**Repo:** `c:\Work\hijaz-2026` · **DB:** `mongodb://localhost:27017/hijaz_2026` (Payload bootstrap only — public pages do not query it)

**Design system:** [`DESIGN-SYSTEM.md`](c:\work\hijaz-2026\DESIGN-SYSTEM.md) copied from hijaz. Typography: Zodiak (headings) + Open Sans (body). Key components: `Illustration`, `Ds3dCarousel`.

**Content corpus:** Still authoritative in hijaz `archive/tmp-content-extract/` — hijaz-2026 JSON is a port, not a new source of truth.

### Architecture

```
content/*.json  →  src/lib/content/loaders.ts  →  page routes + section components
public/ds/*.html  →  /ds/* routes (iframe via DsCatalogFrame)
hijaz public/*.html  →  visual spec / copy reference (not imported at runtime)
```

### Site chrome (implemented)

| Component | Path | Notes |
|-----------|------|-------|
| `UtilityTopBar` | `src/components/site/UtilityTopBar.tsx` | Helpline, social links, utility links above header |
| `SiteHeader` | `src/components/site/SiteHeader.tsx` | Mega menu from [`mega-menu-design-system.html`](c:\work\hijaz\public/mega-menu-design-system.html) — **NOT** hijaz `HeaderV2` |
| `SiteFooter` | `src/components/site/SiteFooter.tsx` | Footer columns + newsletter placeholder |
| `FloatingQuickActions` | `src/components/site/FloatingQuickActions.tsx` | Donate / helpline FABs |

**Navigation data:** `content/navigation.json` — 8 top-level panels unchanged from mockup IA; **short labels** applied in chrome only:

About us · Departments · Doctors · Patient Care · Diagnostics · Patient Welfare · Donate · Our Impact

### Implemented routes

| Route | Source | Notes |
|-------|--------|-------|
| `/` | `content/home.json` + `HomePage.tsx` | Port of `home-alt-design-system.html` — 6-col team grid, `Ds3dCarousel` machinery, ways-to-give, compliance teaser, orbit stats |
| `/our-purpose` | `content/our-purpose.json` | Partial — see gaps |
| `/our-impact` | `content/our-impact.json` | Awards, partners, facts, calendar, highlights |
| `/our-supporters` | `content/our-supporters.json` | Donor wall |
| `/leadership` | `content/leadership.json` | Founders, tenures, management, committees |
| `/leadership/messages` | `content/leadership-messages.json` | Chairman + President messages |
| `/leadership/haji-inam-elahi-asar` | `content/profiles/haji-inam-elahi-asar.json` | Profile template (P26) |
| `/departments` | hub from `content/departments.json` | Category-grouped list |
| `/departments/[slug]` | `content/departments.json` | **Seeded:** `general-surgery` |
| `/services` | hub from `content/services.json` | |
| `/services/[slug]` | `content/services.json` | **Seeded:** `ipd` |
| `/patient-care` | hub from `content/patient-care.json` | |
| `/patient-care/[slug]` | `content/patient-care.json` | e.g. `financial-assistance`, `admission-process`, `patient-rights` |
| `/ds/elements` | iframe → `public/ds/elements.html` | |
| `/ds/dept-service-patterns` | iframe → `public/ds/dept-service-patterns.html` | |
| `/ds/mega-menu` | iframe → `public/ds/mega-menu.html` | |
| `/ds/illustrations` | iframe → `public/ds/illustrations.html` | |

**Detail template:** `src/components/templates/DetailPageTemplate.tsx` + section components in `src/components/sections/` (Procedure Finder, icon grids, callouts, patient stories slot, global CTA).

### How to add a JSON page

1. **Marketing / fixed route:** Add `content/{page}.json`, extend `src/lib/content/types.ts`, register in `src/lib/content/loaders.ts`, create `src/app/(frontend)/{route}/page.tsx` + component in `src/components/marketing/`.
2. **Department / service / patient-care detail:** Append record to `content/departments.json`, `content/services.json`, or `content/patient-care.json` (match shape of existing `general-surgery` / `ipd` entries). `[slug]/page.tsx` routes auto-generate static params from loaders.
3. **Profile:** Add `content/profiles/{slug}.json`, register in `loaders.ts` `getProfile()`.
4. **Nav link:** Update `content/navigation.json` href when slug is live.
5. Pull copy **verbatim** from hijaz `archive/tmp-content-extract/`; cross-check against DS mockup in hijaz `public/`.

### hijaz-2026 gaps (still pending)

| Gap | Notes |
|-----|-------|
| Zodiak font files | Not in repo (`public/fonts/zodiak/`) — headings fall back to Georgia |
| Our Purpose depth | Full 9-milestone journey, compliance lightbox, approach/values sections incomplete vs mockup |
| Dept hub anchors | Category jump links like `/departments#surgery-allied` not wired |
| Content coverage | Most department/service pages not yet in JSON — grow on the go |
| JazzCash / live donations | Out of scope for hijaz-2026 pass; ways-to-give is static/marketing only |
| Payload template cruft | `posts/`, `[slug]/` CMS routes from template — ignore unless repurposing |

---

## 2. Read these files first (in order)

| Priority | File | Why |
|----------|------|-----|
| 1 | [`AGENTS.md`](c:\work\hijaz\AGENTS.md) | Routes, block catalog, donation stack, seed-script rules, collection matrix |
| 2 | [`DESIGN-SYSTEM.md`](c:\work\hijaz\DESIGN-SYSTEM.md) | Tokens, typography, recipes (`.kicker`, `.card`, buttons, spacing) — **only source of truth for new UI** |
| 3 | [`SITE-BUILD-INVENTORY.md`](c:\work\hijaz\SITE-BUILD-INVENTORY.md) | Every page/route, mockup status, P-pattern refs, CMS mapping, gaps, implementation phases |
| 4 | [`public/dept-service-ui-catalog.html`](c:\work\hijaz\public/dept-service-ui-catalog.html) | Live demos of **30 UI patterns (P00–P30)** + HTML-comment inventory |
| 5 | [`public/ds-elements-inventory.html`](c:\work\hijaz\public/ds-elements-inventory.html) | Shared primitives: buttons (incl. on-dark), forms, chips, cards, motion |
| 6 | [`public/mega-menu-design-system.html`](c:\work\hijaz\public/mega-menu-design-system.html) | 8-section IA, route map, navigation global proposal |

**Content corpus:** `archive/tmp-content-extract/merged.txt` (full merge). Individual files are authoritative when merged.txt is stale.

---

## 3. Approved mockups (do not redesign without user approval)

These are signed off as the target visual/IA:

| Mockup | Role |
|--------|------|
| [`public/about-our-purpose-design-system.html`](c:\work\hijaz\public/about-our-purpose-design-system.html) | Production-aligned Our Purpose page (strict DS) |
| [`public/about-our-purpose-mockup.html`](c:\work\hijaz\public/about-our-purpose-mockup.html) | Interactive variant (journey scrubber, more motion); deviations documented in HTML comment |
| [`public/department-page-design-system-general-surgery.html`](c:\work\hijaz\public/department-page-design-system-general-surgery.html) | **Department/service detail template** — Procedure Finder, why-choose grid, stories slot |
| [`public/home-alt-design-system.html`](c:\work\hijaz\public/home-alt-design-system.html) | **Home page (finalized direction)** — CMS-faithful DS modernization of live `pages/home`; archive copy at `archive/html-mockups/public/home-alt-design-system.html` |

**Rejected / do not copy as template:** `public/service-page-design-system-ipd.html` (user disliked the design; content/patterns are still valid for IPD-specific sections).

**Superseded (reference only):** `public/home-design-system.html` — fresh editorial home composition; not the chosen direction.

---

## 4. All design-system mockups (current inventory)

View via dev server: `pnpm dev` → `http://localhost:3000/{filename}.html` (absolute `/media/` and `/compliance-logos/` paths need the server).

### Pages

| File | Route / purpose |
|------|-----------------|
| `home-alt-design-system.html` | `/` — **finalized home** (CMS-faithful; 15 blocks from DB) — see §9 |
| `home-design-system.html` | `/` — superseded exploration (teaser composition); do not implement |
| `about-our-purpose-design-system.html` | Our Purpose (approved) |
| `leadership-governance-design-system.html` | Founders, tenures, management, committees |
| `leadership-messages-design-system.html` | Chairman + President messages |
| `profile-design-system.html` | Person profile template (P26) — exemplar: Haji Inam Elahi Asar |
| `our-impact-design-system.html` | Awards, partners, facts & stats, calendar, highlights, ITW Tower |
| `donor-wall-design-system.html` | 30 donors + logo slots |
| `department-page-design-system-general-surgery.html` | Department detail template (approved) |
| `service-page-design-system-ipd.html` | IPD service (content reference; design not approved) |
| `mega-menu-design-system.html` | Header mega menu demo + inventory |

### Spec / inventory pages (not public routes)

| File | Purpose |
|------|---------|
| `dept-service-ui-catalog.html` | **30 patterns P00–P30** with live demos + CMS mapping |
| `ds-elements-inventory.html` | Buttons, forms, labels, cards, nav, motion, CTA bands |

### Old-style mockups (pre-DS — rebuild, do not extend)

In `archive/html-mockups/public/`: `departments-hub-mockup.html`, `services-hub-mockup.html`, `department-page-full-mockup-dermatology.html`, `service-page-full-mockup-pathology.html`.

Archives: every `public/*design-system*.html` has a copy under `archive/html-mockups/public/`.

---

## 5. Design system rules (summary)

Full spec: [`DESIGN-SYSTEM.md`](c:\work\hijaz\DESIGN-SYSTEM.md). Copy head/CSS from any DS mockup (e.g. `about-our-purpose-design-system.html`).

**Typography:** Zodiak (headings) + Open Sans (body). Semantic `h1`–`h6` with responsive pairs (`text-h3M lg:text-h3`).

**Colors:** `primary-blue`, `primary-red`, `dark-blue`, `dark-gray`, `light-blue`, `whitebg`, `cardbg`, `redbg` only — no Tailwind palette colors, no raw hex in components.

**Section shell:** `container mx-auto px-6 lg:px-[30px] py-[30px] lg:py-[60px]`.

**Recipes:** `.kicker`, `.card`, `.card-interactive`, `.chip`, `.sticky-bar`, `.icon-tile`, `.logo-slot` (dashed placeholder).

**Buttons:**
- Light bg: `.btn-primary` (red → navy hover), `.btn-ghost`
- **Navy CTA bands:** `.btn-on-dark` (white bg, blue text → red hover) and `.btn-on-dark-ghost` — **never** `.btn-primary` on navy (button disappears on hover)

**Icons:** Phosphor (`@phosphor-icons/web`) **inside cards only** (and compliance subsection titles on Our Purpose). Not in kickers, nav chips, or body text.

**Section headers:** Center-aligned, **full width** — no `lg:w-1/2` caps on kicker/heading/intro blocks.

**CMS notes:** Dashed `.cms-note` / placeholder cards for editorial gaps ("PPT data pending", "photos needed").

---

## 6. UI pattern catalog (P00–P30)

Canonical reference: top HTML comment + live sections in `public/dept-service-ui-catalog.html`.

| ID | Pattern | Used by (summary) | CMS mapping |
|----|---------|-------------------|-------------|
| P00 | Template chrome (breadcrumb, jump-nav) | All pages | Template |
| P01 | Hero — base | Depts, services, about | `hero` group (mediumImpact) |
| P02 | Hero — stat card | IPD, OPD, ICU, Emergency, etc. | **ext:** `hero.stats[]` |
| P03 | Hero — quote tagline | OPD, IPD, Nursing, Pathology… | `hero.tagline` |
| P04 | Overview prose | All detail pages | Fixed `overview` richText |
| P05 | Grouped procedure explorer | 11/14 depts, Pathology | `departmentServices` block |
| P06 | Flat check list | ICU, Emergency, Dermatology, Endocrinology… | `content` or single serviceGroup |
| P07 | Flat chip list (conditions) | Cardiology, Pulmonology, Pediatrics | **NEW `chipList`** |
| P08 | Nested sub-list | Dermatology, Nephrology | **ext:** serviceGroup items `children[]` |
| P09 | List + intro/outro framing | Cardiology, Pathology, OT | `content` or group description |
| P10 | Why-choose icon grid | All 14 depts + several services | Fixed `whyChoose[]` |
| P11 | Free-treatment tile grid | IPD only | Fixed `freeTreatment[]` |
| P12 | Program callout (logo slot) | IPD Sehat Sahulat, Welfare | **NEW `programCallout`** |
| P13 | Referral / partner callout | Cardiology, Radiology, OPD labs | **NEW `calloutCard`** |
| P14 | Welfare / free-care note band | Emergency, Dialysis, Pharmacy… | **ext:** `welfareNote` |
| P15 | Big-numeral cards | IPD rooms, OT theatres | **NEW `numeralCards`** |
| P16 | Clinic timings card | OPD only | **ext:** `timings[]` |
| P17 | Stat counters | Emergency, home, impact totals | `counters` block |
| P18 | Numbered steps process | Admission, welfare eligibility | **NEW `processSteps`** |
| P19 | Numbered rights/responsibilities | Patient rights page | **NEW `numberedList`** |
| P20 | Specialty link cards | IPD surgeries, OT Complex | **ext:** `relatedDepartments` |
| P21 | Editorial CMS note | Pediatrics, achievements placeholder | Admin `_contentNote` |
| P22 | Closing quote band | Cardiology, IPD, OPD | Fixed `closing` richText |
| P23 | Patient stories slot | Dept/service pages | `successStories` (context) |
| P24 | Navy donate CTA | All pages | Global CTA settings |
| P25 | Compliance logo + cert popup | Our Purpose, Pathology accreditations | **NEW `complianceLogos`** |
| P26 | Person profile template | 4 leaders | **NEW `profiles` collection** |
| P27 | Events calendar date-rows | Our Impact (17 rows) | `calendarEvents[]` or `events` |
| P28 | Dated highlight cards | Our Impact (5) | `newsList` / `newsCarousel` |
| P29 | Grouped bar chart | Impact financials | `reportFigure` / dataset |
| P30 | Free/paid split bar | Surgeries, services rendered | **NEW `statSplit` / `splitBar`** |

**Build summary:** 8 catalog blocks + 6 About-cluster blocks + 1 collection + 8 field extensions + 1 `navigation` global. Full list in [`SITE-BUILD-INVENTORY.md`](c:\work\hijaz\SITE-BUILD-INVENTORY.md) § Summary.

---

## 7. Content sources map

| Content area | Primary file(s) |
|--------------|-----------------|
| Our Purpose | `Our Purpose (1).txt` |
| Leadership & founders | `Leadership.txt`, `Profiles.txt`, `web.site-work.txt` (committees 2024–26) |
| Messages | `Messages.txt` |
| Our Impact | `Our Impact.txt` (updated — **no Welfare Sharia section**), `facts-stats.json` |
| Medical departments (17) | `Medical Departments (2).txt`, per-dept files e.g. `Dermatology Department.txt` |
| Patient care & facilities | `Patient Care (2).txt` (= `archive/tmp-docx-extract/patient-care.txt`) |
| Patient welfare | `Patient Welfare.txt`, `Financial Support Program.txt` |
| Diagnostics / lab tests | `Diagnostics (2).txt`, `Lab Test list.txt` |
| Doctors | `Doctors (1).txt` |
| Donate | `Donate (3).txt` |
| Donor wall | `Donor List Final.txt`, supporters intro in `Leadership.txt` |
| Home (CMS structure) | MongoDB `pages` slug `home`; copy refresh from `merged.txt` where applicable |
| PPT / misc | `Hijaz-Hospital-General-pptx.txt`, `merged.txt` |

**Facts & statistics dataset:** `archive/tmp-content-extract/facts-stats.json` — financial highlights (Rs M), yearly metrics 2021–2025, 5-year totals, services rendered with free/paid %. Rendered on `our-impact-design-system.html`.

**Compliance logos:** `public/compliance-logos/` (from `archive/logos-for-our-purpose/`): FBR, PCP, Punjab Healthcare Commission, TÜV Austria, social-welfare.

---

## 8. CMS architecture (existing)

```
Payload collections + blocks config
  → payload-types.ts (pnpm generate:types after schema changes)
  → src/app/(frontend)/ routes
  → RenderHero + RenderBlocks (or collection-specific templates)
  → src/blocks/*/Component.tsx
  → src/components/*
```

**Two block systems:** Layout blocks (`RenderBlocks.tsx`) vs report blocks (`ReportSections.tsx` for `reports` collection only).

**Key collections:** `pages`, `departments`, `services`, `donations`, `doctors`, `lab-tests`, `news`, `events`, `success-stories`, `reports`, etc. — see [`AGENTS.md`](c:\work\hijaz\AGENTS.md).

**Donation stack (~85% built):** `WaysToDonatePanel` → `donationMethods` + `bankDetails` globals → JazzCash API. Gaps: missing cause docs (meal, in-kind, sponsor-patient, sponsor-surgeries, ITW tower), pick-up donation service content, zakat calculator page placement. Audit: [`SITE-BUILD-INVENTORY.md`](c:\work\hijaz\SITE-BUILD-INVENTORY.md) §9.

**Department detail template (target shape):**
- Breadcrumb: Home → Medical Departments → {category} → {title}
- Hero (`mediumImpact`, white variant)
- Fixed fields: `overview`, `whyChoose[]`, `serviceGroups[]` (→ Procedure Finder UI)
- Optional layout blocks + auto-injected `successStories` + `GlobalCTA`

**Service detail:** Same template as department; IPD adds P02, P11, P12, P15, P20, P22 — see catalog.

---

## 9. Home page — finalized (`home-alt-design-system.html`)

**React port exists:** hijaz-2026 `/` implements the home-alt direction in `src/components/home/HomePage.tsx` from `content/home.json`. Treat that as the working React reference; the HTML mockup below remains the **spec for hijaz CMS** implementation.

**Decision:** The home page direction is **finalized** on [`public/home-alt-design-system.html`](c:\work\hijaz\public/home-alt-design-system.html) (archived at `archive/html-mockups/public/home-alt-design-system.html`). It modernizes the **live CMS** `pages` slug `home` to `DESIGN-SYSTEM.md` while preserving the existing block order and information architecture.

**Do not implement** [`home-design-system.html`](c:\work\hijaz\public/home-design-system.html) — that was an alternate teaser-led composition; keep it only as a pattern reference.

### Live home layout (from DB — mockup follows this order)

`fullBannerHero` (3 slides) → `textWithImage` → `counters` → `textWithIcons` (Engage) → `servicesCarousel` → `bankAccountsList` → `textWithIcons` (Other Ways) → `personMessage` → `textWithImageAlt` (founder) → `publicationAndResearchCarousel` → `successStories` → `teamMembersCarousel` → `newsCarousel` → `eventsCarousel` → `threeDSlider` → `threeDCarouselR3F`.

### Pending design & content changes (before Next.js implementation)

The mockup is **approved as direction**, not pixel-perfect or content-final. Expect substantial follow-up:

| Area | What still needs work |
|------|------------------------|
| **Design** | Per-section DS polish (hero overlay, counter styling, card grids, 3D machinery sections simplified to DS media rails); consolidate duplicate blocks §14+§15 (same heading, redundant 3D slider + R3F); mobile drawer/spacing pass; align all sections with `ds-elements-inventory.html` recipes |
| **Content** | Refresh copy from `merged.txt` / `Donate (3).txt` / `Our Impact.txt` / `Profiles.txt` where mockup still uses stale DB text; update counters from `facts-stats.json` (5-year totals vs current "At a Glance" figures); news/events/highlights from updated `Our Impact.txt` |
| **CMS data** | Fix DIB/UBL duplicate account numbers; typos ("View repots", "the following is some our Research"); empty team carousel heading/body; `hero.links` not rendered by `FullBannerHero` — wire in implementation or move to page body |
| **Blocks** | Consider merging `threeDSlider` + `threeDCarouselR3F` into one machinery showcase; donation form slide from legacy `heroSliders` — decide if it stays on home or moves to `/donate` |
| **Imagery** | Doctor portraits, bank logos, machinery photos — verify all media IDs resolve in production |

When implementing Phase 8 (home), start from **home-alt** structure, apply the changes above, and update the mockup in the same pass so static HTML stays the spec.

---

## 10. Mega menu IA (8 top-level items)

Full tree and route gaps: [`public/mega-menu-design-system.html`](c:\work\hijaz\public/mega-menu-design-system.html) HTML comment. **Reference file for both repos** — hijaz-2026 `SiteHeader` ports this mockup; do **not** use hijaz `HeaderV2`.

**hijaz-2026 chrome:** `UtilityTopBar` (helpline + social) sits above `SiteHeader`. Nav data in `c:\Work\hijaz-2026\content\navigation.json`. Panel structure unchanged; top-level **short labels** in chrome: About us, Departments, Doctors, Patient Care, Diagnostics, Patient Welfare, Donate, Our Impact.

**hijaz CMS proposal:** Payload `navigation` global (`topLevel[]` → `groups[]` → `links[]`, optional `featured`).

**Routes with no CMS page yet (GAP — hijaz):** Leadership hub URLs, `/our-impact`, `/donor-wall`, 6 patient-welfare slugs outside whitelist, diagnostics accreditation page, zakat calculator anchor. Many of these are **implemented in hijaz-2026** as static JSON routes (see hijaz-2026 section).

**Patient welfare whitelist** (only these work on `/patient-welfare/[slug]` in hijaz today): `financial-assistance`, `admission-process`, `patient-stories`, `free-medical-camps`, `patient-rights`. hijaz-2026 uses `/patient-care/[slug]` with overlapping content.

---

## 11. Critical data drift & decisions for the user

Resolve before bulk seeding:

1. **17 departments, not 14** — hub mockup and early catalog text are wrong; includes Dermatology, Dietetics & Nutrition, Physiotherapy.
2. **Welfare Sharia removed** from updated `Our Impact.txt` but still on `about-our-purpose-design-system.html` impact teaser — reconcile.
3. **Ellahi vs Elahi**, **"20110"** (chairperson tenure), **"Hahi"** (president name) — verbatim in sources; CMS notes flag typos.
4. **Tasneem Firdous Waheed** dates `19XX-20XX` in `Profiles.txt`.
5. **Doctors:** photos missing; 12 entries marked `?` in source; no detail routes (hub only).
6. **Lab test rates:** withheld from public UI by decision.
7. **Orphan content** in `merged.txt` with no IA home: Future Roadmap (MRI/CT…), Our Kind Souls (7 names), Paramedical School/Nursing College, Major Achievements list, >90% free distinction — see [`SITE-BUILD-INVENTORY.md`](c:\work\hijaz\SITE-BUILD-INVENTORY.md) § Orphan content.
8. **Legal/footer pages:** none in sources — confirm with client.
9. **Single Our Purpose page vs `/about/*` child pages** — mockup is single long page; MongoDB may have separate slugs.

---

## 12. Suggested implementation order

### hijaz CMS (main repo)

From [`SITE-BUILD-INVENTORY.md`](c:\work\hijaz\SITE-BUILD-INVENTORY.md):

1. **Phase 0 — Schema:** `profiles`, `navigation` global, new blocks, field extensions, facts dataset, global CTA → `pnpm generate:types`
2. **Phase 1 — Chrome:** mega menu, footer, breadcrumbs hub↔detail, CTA toggle
3. **Phase 2 — Templates:** department ×17, service ×13, DS hubs, doctors hub
4. **Phase 3 — About cluster:** our-purpose, leadership, messages, profiles ×4
5. **Phase 4 — Impact:** our-impact page, donor wall, achievements review
6. **Phase 5 — Donate:** cause docs, payment methods, zakat placement, pickup service
7. **Phase 6 — Welfare:** 6 new pages + whitelist, processSteps, forms
8. **Phase 7 — Diagnostics:** lab-tests seed, pathology/radiology pages
9. **Phase 8 — Home** (after templates stable — implement **`home-alt-design-system.html`**; apply pending design/content changes in §9)
10. **Phase 9 — Migration & QA:** seeds, redirects, preview-path gaps, orphan decisions

### hijaz-2026 (parallel track)

Can proceed **independently** of CMS phases. Priority gaps: Zodiak fonts, Our Purpose completeness, dept hub category anchors, seed remaining JSON pages from content corpus, remove/ignore Payload template routes. JazzCash and live donation APIs are **out of scope** for this pass. When hijaz CMS catches up, decide whether to migrate JSON content into Payload or keep hijaz-2026 as a static preview/staging site.

---

## 13. How to work on static mockups

1. Copy head + `<style>` + header/footer from `about-our-purpose-design-system.html`.
2. Add CMS-mapping HTML comment at top (collection, fields, blocks).
3. Use patterns from `dept-service-ui-catalog.html` — do not invent new layouts if a P-number exists.
4. Pull copy verbatim from `archive/tmp-content-extract/`.
5. Run tag-balance sanity check; archive to `archive/html-mockups/public/`.
6. View on `localhost:3000` (not `file://`) for images.

**Approved template for dept/service detail:** extend `department-page-design-system-general-surgery.html` — swap `SERVICE_GROUPS` JS data and hero copy per department; adjust pattern deltas per catalog (e.g. add P07 chip list for Cardiology, skip P05 for Endocrinology flat list).

---

## 14. How to work on Payload / Next.js

1. Read [`AGENTS.md`](c:\work\hijaz\AGENTS.md) block registration checklist (`config.ts` → collection → `RenderBlocks.tsx` → `pnpm generate:types` → `test-blocks` fixture).
2. Prefer **fixed fields** on `departments`/`services` for overview, whyChoose, serviceGroups (replacing free-form layout sprawl) — matches mockup template.
3. **Seed scripts:** must write `_versions` rows with `latest: true`; use `ObjectId` not hex strings; default `hijaz_dev` only. See AGENTS.md § Seed & publish scripts.
4. **Existing components to reuse:** `Breadcrumb`, `RenderHero`, `WaysToDonatePanel`, `DonationForm`, `LabTestsListBlock`, `categoryGroupedList`, `ScrollReveal`, `GlobalCTA`.
5. **Visual QA:** `src/app/test-blocks/` sandbox — add fixtures when building blocks.

**Query home page from MongoDB:**
```bash
pnpm exec node -e "
const { MongoClient } = require('mongodb');
(async () => {
  const c = await MongoClient.connect('mongodb://localhost:27017/hijaz_dev');
  const doc = await c.db().collection('pages').findOne({ slug: 'home' });
  console.log(JSON.stringify({ hero: doc?.hero?.type, layout: doc?.layout?.map(b => b.blockType) }, null, 2));
  await c.close();
})();
"
```
(Use `createRequire` pattern from `scripts/list-page-titles.mjs` if direct `require('mongodb')` fails under pnpm.)

---

## 15. Pending tasks from conversation (not done in code)

Status key: **2026** = done or partial in hijaz-2026 · **CMS** = still pending in hijaz main repo

| Task | hijaz-2026 | hijaz CMS | Notes |
|------|:----------:|:---------:|-------|
| Site chrome (mega menu, footer, utility bar) | **2026** | CMS | 2026: `SiteHeader` + `UtilityTopBar` + `SiteFooter` + `FloatingQuickActions`; CMS: Phase 1 |
| Home page | **2026** | CMS | 2026: `/` from home-alt; CMS: Phase 8, block wiring |
| About cluster (purpose, leadership, messages, profile) | **2026** | CMS | 2026: routes live; Our Purpose journey/compliance depth incomplete |
| Impact + supporters | **2026** | CMS | 2026: `/our-impact`, `/our-supporters` |
| Dept/service detail template | **2026** | CMS | 2026: `general-surgery` + `ipd` seeded; CMS: Phase 2 ×30 pages |
| Hub pages (`categoryGroupedList`) | partial | CMS | 2026: hubs exist; dept category anchors (`#surgery-allied`) pending |
| Patient care / welfare pages | partial | CMS | 2026: 3 patient-care slugs; CMS: whitelist + 6 welfare slugs |
| Doctors frontend | — | CMS | Hub only in both; photos missing |
| Lab tests collection | — | CMS | Rates omitted from public UI by decision |
| Donation stack (JazzCash, causes) | — | CMS | Out of scope for hijaz-2026 pass |
| Global CTA toggle | partial | CMS | 2026: static `GlobalCtaSection`; CMS: per-document override |
| Import / seed scripts | — | CMS | `seed-departments-from-docx.mjs`, lab test import |
| Zodiak font files | pending | — | `public/fonts/zodiak/` missing in hijaz-2026 |
| Deliver CM guide | — | CMS | Export SOPs for junior content managers |
| Reconcile Our Purpose impact teaser | partial | CMS | Remove/update Welfare Sharia card |
| Fix CMS data | — | CMS | DIB/UBL duplicate accounts, hero.links on FullBannerHero, counter values vs facts-stats.json |

---

## 16. Files you should not treat as source of truth

- Legacy block components with off-brand colors (pre-DS) — drift in `design-system-audit/06-UNIFIED-SPEC.md`
- `public/about-our-purpose-design-system - Copy.html` — duplicate, ignore
- Old mockups in `archive/html-mockups/public/*hub*` and `*full-mockup*` — pre-DS
- `service-page-design-system-ipd.html` — content patterns yes, overall layout no (user rejected)

---

## 17. Quick commands

### hijaz (main repo — mockups + CMS)

```bash
cd c:\Work\hijaz
pnpm dev                    # View mockups at localhost:3000/{filename}.html
pnpm generate:types         # After Payload schema changes
pnpm seed:departments       # If script exists and DB is hijaz_dev
```

### hijaz-2026 (static React site)

```bash
cd c:\Work\hijaz-2026
pnpm dev                    # Site at localhost:3000 (JSON pages + /ds/* catalogs)
pnpm build                  # Production build (static params from content/*.json)
pnpm generate:types         # After Payload schema changes (admin only)
```

**MongoDB:** hijaz uses `hijaz_dev`; hijaz-2026 uses `hijaz_2026` (set `DATABASE_URI` in `.env`).

---

## 18. Conversation context

Prior agent work established: unified content structure for departments/services/lab tests/doctors; hub → detail breadcrumbs; verbatim DOCX/txt content; design-system-first mockups; UI catalog for CMS componentization; mega menu IA; facts & stats dataset; profile pages for founders/leadership; compliance certificate popups with logo assets.

**User approvals:** `about-our-purpose-mockup.html`, `about-our-purpose-design-system.html`, `department-page-design-system-general-surgery.html`, **`home-alt-design-system.html`** (finalized direction — design and content changes still pending per §9). hijaz-2026 React ports of home-alt, mega menu, and marketing/detail templates are in progress.

**User rejections:** Hub-style department explorer for listing page (wanted **detail** page); IPD service page visual design; `home-design-system.html` (superseded by home-alt); hijaz `HeaderV2` for public chrome (use mega-menu mockup instead).

When unsure, prefer **extending the approved General Surgery template** and **checking SITE-BUILD-INVENTORY.md** before creating new patterns.

---

*Last updated: 2026-08-03 — two-repo model (hijaz CMS + hijaz-2026 static React); hijaz-2026 home, chrome, marketing cluster, JSON dept/service/patient-care routes documented; CMS implementation phases unchanged in main repo.*
