# SITE-BUILD-INVENTORY.md — Hijaz Hospital

Master spec for the Next.js + PayloadCMS implementation pass. Every page/route, its mockup status, content source, UI patterns (P-numbers reference `public/dept-service-ui-catalog.html`), proposed CMS mapping, and open gaps.

**Sources:** `archive/tmp-content-extract/merged.txt` (full corpus) + individual txt files · `AGENTS.md` (current routes/blocks/collections) · `public/*design-system*.html` (approved DS mockups, CMS-mapping comments) · catalog P00–P30.

**Status legend:** `DS` = DS mockup done (file) · `OLD` = old-style mockup only · `TPL` = CMS template exists, no mockup · `GAP` = no route/slug yet.

---

## 1. Global

| Element | Status | Content source | Patterns | CMS mapping | Gaps / notes |
|---|---|---|---|---|---|
| Header + mega menu | DS `mega-menu-design-system.html` | IA: 8 top items / 21 groups / 84 links | P00 | **NEW `navigation` global** (topLevel[] → groups[] → links[] `{label, link}`, moreLink); SiteHeader renders global w/ hardcoded fallback. **No featured / image-slot promo in mega panels.** | Mega-menu GAP list: leadership-governance, our-impact, donor-wall routes; 6 welfare slugs; zakat placement; accreditation page |
| Footer | TPL (chrome in all DS mockups) | — | P00 | Site settings global | Legal links TBD (§13) |
| Breadcrumb | TPL (in mockups) | Route hierarchy | P00 | `Breadcrumb` component; dept category → crumb | Wire hub ↔ detail (pending task) |
| Global CTA band | DS (in all mockups, `btn-on-dark`) | — | P24 | **NEW global CTA settings + per-doc override toggle** (pages/departments/services) | Pending task `global-cta-toggle` |
| `/search` | TPL | — | — | Existing route | — |
| `/thank-you`, `/my-donations` | TPL | — | — | Existing routes | — |

---

## 2. Home — `/`

| Route | Status | Content source | Sections → patterns | CMS mapping | Gaps / notes |
|---|---|---|---|---|---|
| `/` | DS **finalized** (`home-alt-design-system.html`) | pages slug `home` (DB: fullBannerHero + 15 layout blocks); copy refresh from `merged.txt` / `Donate (3).txt` / `Our Impact.txt` / `facts-stats.json` where applicable | fullBannerHero (3 slides) → textWithImage → counters P17 → textWithIcons (Engage) → servicesCarousel → bankAccountsList → textWithIcons (Other Ways) → personMessage → textWithImageAlt → publicationAndResearchCarousel → successStories → teamMembersCarousel → newsCarousel → eventsCarousel → threeDSlider → threeDCarouselR3F → P24 CTA | pages slug `home` — hero + layout blocks | **Finalized as direction** — significant design polish and content updates still pending before implementation. Superseded: `home-design-system.html`. Excluded from `[slug]` static gen (existing) |

---

## 3. About / Our Purpose

| Route | Status | Content source | Sections → patterns | CMS mapping | Gaps / notes |
|---|---|---|---|---|---|
| `/our-purpose` (working slug) | DS `about-our-purpose-design-system.html` | `Our Purpose (1).txt` | Hero → P01 · Vision & Mission → P04 · Journey scrubber (1979–2026, 8 milestones) → P05-reuse · Philosophy → P04+media · Approach → P10 · Core Values → P10 · Compliance (5 logos + cert lightbox) → P25 · Founders teaser → P26-links · Messages teaser → links · Consultants → P20 · Impact teaser → P17 · Departments teaser → P20 · CTA → P24 | pages doc + layout blocks; compliance → **NEW `complianceLogos`**; journey → content/timeline | IA: single long page vs `/about/*` children — pending decision (`about-purpose-implement`) |
| `/leadership-governance` | DS `leadership-governance-design-system.html` | `Leadership.txt` + `web.site-work.txt` (committees 2024–26) | Founders cards → P26-link · Chairpersons/Presidents tenure → **NEW `tenureTimeline`** · Senior Management (11) → **NEW `personGrid`** · Executive Committee (25) → **NEW `nameGrid`** · Core Committees (12) → nameGrid · notes → P21 | pages doc + new blocks; committees data = web.site-work.txt (supersedes "Ask Ms. Tabassum") | Typos flagged inline: "20110"→2010, "Hahi" |
| `/leadership-messages` | DS `leadership-messages-design-system.html` | `Messages.txt` | Chairman + President articles → **NEW `messageArticle`** {portrait, name, role, org, body, signature} · Quranic verse → **NEW `quoteBlock`** (rtl) | pages doc + new blocks (extends `personMessage`) | About page references `/chairmans-message` + `/presidents-message` — reconcile single vs split |
| `/profiles/{slug}` ×4 | DS template `profile-design-system.html` | `Profiles.txt` | Full profile → P26 | **NEW `profiles` collection** {slug, portrait, name, lifespan, role, org, bio, roles[], closingLine} | Tasneem dates "19XX-20XX" placeholder in source |
| Compliance certificates | DS (section of our-purpose) | `logos-for-our-purpose/` | Logo cards + fullscreen cert popup → P25 | `complianceLogos` {logo, issuer, title, body, certImage?} | certImage uploads pending (5 certs) |

---

## 4. Clinical Departments

**Source:** `Medical Departments (2).txt` — 4 categories, **17 departments** (catalog/hub mockup says "14" — drift, 3 added later: Dermatology, Dietetics & Nutrition, Physiotherapy). Slugs per `scripts/seed-departments-from-docx.mjs`.

| Route | Status | Content source | Patterns | CMS mapping | Gaps / notes |
|---|---|---|---|---|---|
| `/departments` hub | OLD `departments-hub-mockup.html` | category structure | Category-grouped card grid + filters | `categoryGroupedList` block (replace sidebar explorer) | Rebuild hub to DS (mockup predates DS); update to 17 depts |
| `/departments/general-surgery` | DS `department-page-design-system-general-surgery.html` (**approved template**) | txt | P01+P03 hero · P04 overview · P05 Procedure Finder (search + group rail) · P10 why-choose · P23 stories · P24 CTA | departments collection: hero (mediumImpact white), fixed overview, `departmentServices` serviceGroups, whyChoose[], successStories (context), global CTA | — |
| `/departments/dermatology` | OLD `department-page-full-mockup-dermatology.html` | `Dermatology Department.txt` | P06 flat lists · P08 nested (steroid injections "such as:") · P09 | same template | Rebuild on DS template |
| 15 remaining details | TPL | txt | **Deltas:** grouped explorer P05 → Orthopedics, Urology, Ophthalmology, ENT, Dental, General Medicine, Gastroenterology, Nephrology, Cardiology, Pulmonology, Gynae/Obs, Pediatrics · flat list P06 → Endocrinology · chip list P07 → Cardiology, Pulmonology, Pediatrics (conditions) · nested P08 → Nephrology · framing P09 → Cardiology · referral callout P13 → Cardiology | same template, per-dept `departmentServices` shape | Dietetics & Nutrition + Physiotherapy pages exist in txt; add to hub |

---

## 5. Doctors

| Route | Status | Content source | Patterns | CMS mapping | Gaps / notes |
|---|---|---|---|---|---|
| `/doctors` hub | TPL (DoctorsHubClient exists) | `Doctors (1).txt` — 39 consultants + 4 FMH visiting | Filterable cards by specialty | doctors collection | **Photos needed** ("Need a pic for each one with a link to their profile"); 12 entries flagged "?" (unconfirmed) |
| `/doctors/heads-of-departments`, `/doctors/visiting-consultants` | TPL | txt (16 heads, 3 visiting + 4 FMH) | same cards, view filter | tags `head-of-department` / `visiting` | "Vacant — Medical Specialist" entry — handle in CMS |
| Doctor detail pages | — | — | — | **None** (per AGENTS.md; cards may link out later) | txt requests profile links — decision pending |

---

## 6. Patient Care & Facilities — `/services/{slug}`

**Source:** `Patient Care (2).txt` (== `patient-care.txt`). Template = service detail (mirrors department template).

| Service | Status | Pattern deltas (beyond P01/P03/P04/P10/P23/P24 base) | Notes |
|---|---|---|---|
| IPD | DS `service-page-design-system-ipd.html` | P02 stat (25–35 admissions) · P11 free-treatment grid (6) · P12 Sehat Sahulat callout · P20 surgical links (6) · P15 accommodation numerals (4/2/1/1) · P22 closing | Approved |
| OPD | TPL | P16 timings card · P17 counters (40+) · P13 ext-lab referral note · P22 | — |
| ICU | TPL | P02 (6 beds) · P06 flat list · P17 | — |
| Emergency | TPL | P02 (24/7) · P06 · P14 welfare note · P17 | — |
| OT Complex | TPL | P09 framing · P15 theatre numerals (3/1/1/1) · P20 specialty links (11) | — |
| Nursing | TPL | P02 (50+) · P06 · P22 | — |
| Anesthesia | TPL | P06 | — |
| Ambulance | TPL | P14 free-service note | — |
| Dialysis | TPL | P02 (30 machines) · P06 · P14 free-treatment note · P17 | — |
| Pharmacy | TPL | P06 · P14 free-medicines note | — |
| Blood Bank | TPL | P06 · P14 | — |
| Cafeteria | TPL | P22 closing | — |

CMS mapping (all): `services` collection — hero group + FixedDepartmentServiceContent (overview/whyChoose/serviceGroups) + layout blocks + proposed extensions (`hero.stats[]`, `welfareNote`, `timings[]`, `relatedDepartments`, `freeTreatment[]`).

---

## 7. Diagnostics

**Source:** `Diagnostics (2).txt` + `Lab Test list.txt`.

| Route | Status | Content source | Patterns | CMS mapping | Gaps / notes |
|---|---|---|---|---|---|
| `/services/pathology` | OLD `service-page-full-mockup-pathology.html` | txt | P05 grouped test specialties (5 groups) · P09 framing · P13 reference-lab callout (Histopath/PCR via partners) · P25 **accreditation logos** (NEQAS/EQAS) · P10 | services doc + `labTestsList` + `complianceLogos` | Rebuild on DS template |
| `/lab-tests` | TPL (route exists) | `Lab Test list.txt` — 71 tests + 4 dengue | Searchable/filterable table | `lab-tests` collection + `labTestsList` block (`showFilters`) | **Rates withheld from public UI** (per `dynamic-report-builder.md`); fields: name, category, reportingTime, specimen |
| `/services/radiology` | TPL | txt | P04 · P10 · P13 CT/MRI partner referral | services doc | — |
| `/services/cardiac-diagnostics` | TPL | txt | P03 · P07 conditions chips · P10 | services doc | — |
| Diagnostics landing | — | txt intro paragraph | — | **GAP** — menu points to `/services`; no dedicated hub section | Optional services category view |

---

## 8. Patient Welfare & Resources

**Sources:** `Patient Welfare.txt`, `Financial Support Program.txt`.

| Route | Status | Content source | Patterns | CMS mapping | Gaps / notes |
|---|---|---|---|---|---|
| `/patient-welfare` hub | TPL | txt | Section cards → children | pages slug | — |
| `/patient-care/financial-assistance` | **SEEDED** | `Patient Welfare.txt` L2657–2675 (structured Shariah ZMS + eligibility) | P18 eligibility steps (4) · P14 | `patient-care.json` | `numberedList` section type not needed; uses `content` + `bullets` |
| `/patient-care/admission-process` | **SEEDED** | `Financial Support Program.txt` L578–599 (~20 detailed steps) | P18 numbered steps · P21 editorial note (step 4 CMS note excluded) | `patient-care.json` | Uses detailed FSP version; CMS note L2721 excluded per AGENTS.md |
| `/patient-care/patient-rights` | **SEEDED** | `Patient Welfare.txt` L2731–2782 | P19 → **NEW `numberedList` section type** (10 rights + 10 responsibilities) | `patient-care.json` | `NumberedListSection` component created |
| `/patient-welfare/patient-stories` | TPL | — | → success-stories hub | Redirect/alias to `/success-stories` | — |
| `/patient-care/free-medical-camps` | **SEEDED** | `Patient Welfare.txt` L2701–2705 (camps + flood relief) | P04 | `patient-care.json` | — |
| `/patient-care/dialysis-support` | **SEEDED** | `Patient Welfare.txt` L2676–2684 (stipend, ration, marriage assistance) | P04 · P14 | `patient-care.json` | Was GAP; now seeded with structured bullets |
| `/patient-care/free-medicines` | **SEEDED** | `Financial Support Program.txt` L564–569 (Rs. 174M in 2025) | P04 · P17 | `patient-care.json` | Was GAP; FSP version used (more detailed, specific figure) |
| `/patient-care/free-meals` | **SEEDED** | `Patient Welfare.txt` L2694–2696 | P04 | `patient-care.json` | Was GAP; now seeded |
| `/patient-care/sehat-sahulat` | **SEEDED** | `Patient Welfare.txt` L2697–2700 | P12 program callout | `patient-care.json` | Was GAP; CMS note L2698 excluded |
| `/patient-care/patient-information-guide` | **SEEDED** | `Financial Support Program.txt` L650–689 (service overview, forms, online services) | P04 · P13 | `patient-care.json` | **NEW** — no steps format, informational content sections |
| **Forms** (Patient Feedback / Patient Evaluation) | GAP | txt | → form blocks | NEW form collections or reuse complaint pattern | 5 of 6 |
| **Online Services** (Request Appointment, Online Reports) | GAP | txt | P13 callouts + external links | needs slug; reports portal is external | 6 of 6 |


---

## 9. Donate / Ways to Give — audit vs `Donate (3).txt`

**Verdict: ~85% covered by existing donation stack.** (WaysToDonatePanel, `waysToDonate` + `zakatCalculator` blocks, `donations` collection, `donationMethods`/`bankDetails` globals, JazzCash API.)

| Content (txt) | Route / placement | Status | CMS mapping | Gap |
|---|---|---|---|---|
| Ways to Give intro (Qur'an 5:32) | `/donate` hub hero (`mediumImpact` **variant: white**) | TPL | pages slug `donate` body + WaysToDonatePanel `hubMode` | — |
| Zakat (+ Shariah compliance note) | `/donations/zakat` | TPL | donations doc `kind=zakat`; compliance note → otherWays richText | cause doc needed |
| Zakat Calculator | block on zakat page | TPL | `zakatCalculator` block (exists) | **Placement GAP** — no page hosts it yet |
| General Donation | `/donations/general` | TPL | donations doc `kind=general` | — |
| Sadaqah | `/donations/sadaqah` | TPL | donations doc | cause doc needed |
| Eidi & Fitrana | `/donations/eidi-fitrana` | TPL | donations doc | cause doc needed |
| Donate a Meal (PKR 500/1.5k/3.5k/15k impact table) | `/donations/donate-a-meal` | TPL | donations doc; amounts = preset donation amounts; impact table → `tabularData` | cause doc needed |
| Donate in Kind | `/donations/donate-in-kind` | TPL | donations doc; item list → content block; "contact Donations Office" CTA | cause doc needed |
| Sponsor a Patient (4 options) | `/donations/sponsor-a-patient` | TPL | donations doc | cause doc needed |
| Sponsor Free Surgeries (4 options) | `/donations/sponsor-free-surgeries` | TPL | donations doc | cause doc needed |
| Support a Project → ITW Tower | `/donations/itw-medical-tower` | TPL | donations doc; naming-opportunities note → richText | cause doc needed; links to impact Medical Tower section |
| Online Donation (card) | launcher → drawer | **EXISTS** | DonationFormCompact + JazzCash redirect | — |
| Mobile Wallet — JazzCash Till 981444144 | manual rail card | **EXISTS** | `donationMethods` global paymentMethod {title, identifier, qrImage} | QR image upload |
| Bank Transfer ×3 accounts (Zakat/General/ITW — Meezan + BankIslami) | BankTransferPanel | **EXISTS** | `bankDetails` global; cause `bankTransfer.accountKeys` filter (ITW cause → BankIslami only) | verify 3 account keys seeded |
| Meezan Mobile App | manual rail card | TPL | paymentMethod entry {title, steps} | method entry needed |
| QR Code Donation | manual rail card | TPL | paymentMethod {qrImage} | QR asset needed |
| Cheque or Bank Draft (address) | manual rail card | TPL | paymentMethod {steps} or otherWays | method entry needed |
| **Pick-Up Donation Service** | content on `/donate` | GAP | otherWays richText on hub or dedicated section | **No home in current stack** — add to `donationMethods` as steps-only method or page body block |
| Receipts / Need Assistance (UAN, phone, email) | `/donate` sidebar/footer note | TPL | hub body richText | — |

---

## 10. Our Impact & Supporters

| Route | Status | Content source | Patterns | CMS mapping | Gaps / notes |
|---|---|---|---|---|---|
| `/our-impact` | DS `our-impact-design-system.html` | `Our Impact.txt` (updated) + facts dataset | Award → **NEW `featureBanner`** · Health Partners (teaching/academic/diagnostic) → **`featureBanner`/`partnerLogos`** · **Facts & Statistics**: headline counters P17 · financial bar chart P29 · yearly explorer (P05-reuse) · split bars P30 · services rendered P30 · Medical Tower → featureBanner (dark) · Events calendar (17) → P27 · Highlights (5) → P28 · Achievements placeholder → P21 | pages doc + **dataset field** (metrics + periods, reports shape) rendered via `reportStats`/`reportFigure`-style blocks; calendarEvents[] array field | CMS route GAP (mockup only); Welfare Sharia section removed in updated txt — **drift** vs about-page teaser (reconcile); Achievements "need to review yet" |
| `/reports`, `/reports/{slug}` | TPL | reports collection | ReportSections (separate block system) | Existing | — |
| `/donor-wall` | DS `donor-wall-design-system.html` | `Leadership.txt` + `Donor List Final.txt` (30 donors) | Numbered name grid + logo slots → **NEW `donorWall`** {donors[{sn, name, logo, link}]} | pages doc + new block | 8/30 donors have no link (static cards); logos pending; CMS route GAP |
| Events calendar | DS (section) | txt | P27 date-row list | calendarEvents[] array on impact page | — |
| Highlights | DS (section) | txt | P28 dated cards | newsCarousel/newsList (existing) — or highlights on news collection | — |

---

## 11. News / Events / Success Stories / Publications / New Machinery

| Area | Routes | Status | CMS mapping | Gaps / notes |
|---|---|---|---|---|
| News | `/news`, `/news/page/{n}`, `/news/{slug}` | TPL | news collection + NewsHero + content richText + layout | No DS mockup (uses existing template) |
| Events | `/events`, `/events/page/{n}`, `/events/{slug}` | TPL | events collection, same article template | — |
| Success stories | `/success-stories`, `/{slug}` | TPL | success-stories collection; dept pages auto-inject P23 | — |
| Publications | `/publication-and-research`, `/{slug}` | TPL | collection + custom article template | Preview-path gap (AGENTS.md §12) |
| New machinery | `/new-machinery`, `/{slug}` | TPL | collection + specs/gallery + layout | PPT "Major Achievements" machinery items are source candidates |

---

## 12. Forms

| Form | Status | CMS mapping | Notes |
|---|---|---|---|
| Contact | TPL | `contactForm` block → `contact-forms` collection | Existing |
| Complaint | TPL | `complaintForm` block → `complaint-form-submissions` | Existing |
| Patient Feedback | GAP | NEW form collection or reuse complaint pattern | From welfare "Forms" item |
| Patient Evaluation | GAP | NEW form collection | From welfare "Forms" item |

---

## 13. Compliance / Legal

| Item | Status | Notes |
|---|---|---|
| Compliance certificates | DS (our-purpose P25) | FBR registration, PCP membership, Punjab Healthcare Commission, ISO 9001:2008 (TÜV), Social Welfare Ordinance 1961 — certImage uploads pending |
| Footer legal pages (privacy, terms) | GAP | **None found in sources** — confirm with client whether needed |

---

## Summary

### Page counts by status

| Status | Count | Pages |
|---|---|---|
| DS mockup done | **10** | our-purpose, leadership-governance, leadership-messages, profile template, dept general-surgery, service IPD, our-impact, donor-wall, mega-menu (chrome), **home-alt** (finalized; changes pending) |
| Superseded mockup | 1 | home-design-system (teaser composition — do not implement) |
| Old-style mockup only | **4** | departments hub, services hub, dept dermatology, service pathology |
| CMS-template-only | **~45 routes** | 15 dept details · 14 service details (12 patient-care + 2 diagnostics) · /lab-tests · /doctors ×3 views · /patient-welfare ×6 · /donate · /donations/{slug} template · /reports ×2 · news ×3 · events ×3 · success-stories ×2 · publications ×2 · new-machinery ×2 · search/thank-you/my-donations ×3 |
| Content-seeded | **10** | 9 patient-care pages (financial-assistance, admission-process, patient-rights, free-medical-camps, dialysis-support, free-medicines, free-meals, sehat-sahulat, patient-information-guide) + 17 departments + 14 services |
| GAP (no route yet) | **5** | 2 welfare items (Forms, Online Services) · zakat-calculator placement · diagnostics accreditation · pickup-service content |

### Consolidated build list

**NEW blocks (8):** `chipList` (P07) · `programCallout` (P12) · `calloutCard` (P13) · `numeralCards` (P15) · `processSteps` (P18) · ~~`numberedList` (P19)~~ ✅ DONE · `complianceLogos` (P25) · `statSplit`/`splitBar` (P30)
**NEW blocks from About cluster (6):** `featureBanner` · `partnerLogos` · `tenureTimeline` · `personGrid` · `nameGrid` · `messageArticle` (+`quoteBlock`) · `donorWall`
**NEW collections (1):** `profiles` (P26)
**Field extensions (8):** `hero.stats[]` · serviceGroups items `children[]` · `welfareNote` · `timings[]` · `relatedDepartments` · `_contentNote` (admin editorial) · `calendarEvents[]` · `factsStats`/dataset (reports shape)
**Globals (1 new):** `navigation` (mega menu) — `bankDetails`/`donationMethods` exist

### Content gaps & editorial notes to resolve

1. Tasneem Firdous Waheed dates — source has "19XX-20XX" placeholder.
2. Ellahi vs Elahi spelling inconsistency (Leadership.txt vs everywhere else); "20110" and "Hahi" typos flagged inline.
3. Welfare Sharia section removed from updated `Our Impact.txt` — about-page impact teaser still shows it (reconcile).
4. Doctors: photos for all consultants ("Ok"/"?" flags per entry); profile-link decision.
5. ~~PPT graphical data~~ — **resolved** (facts & stats dataset provided, section built).
6. ~~"Ask Ms. Tabassum" committees~~ — **resolved** by `web.site-work.txt` (2024–26 conveners).
7. Lab test rates — withheld from public UI by decision; keep in CMS for internal use.
8. Hospital Achievements — "Share success stories, need to review yet".
9. Patient Information Guide — OPD/OT days only as JPGs; need data or media upload.
10. Donor wall — 8/30 without links; logos to collect.
11. Catalog/hub mockup says "14 departments" — source + seed script have **17** (update hub).

### Orphan content (in merged.txt, NO home in current IA)

| Content | Source | Suggested home |
|---|---|---|
| **Future Roadmap** (MRI, CT, OCT, YAG Laser, Plastic Surgery, Cardiac Surgery, Psychiatry, Chemo/Radiotherapy) | PPT slide 7 | our-impact (after Medical Tower) or home — needs decision |
| **"Our Kind Souls"** (7 names incl. Salah ud Din A. Sahaf, Sh. Azeem Pasha, Majeed A Khan, Sh. Atta ur Rehman) | PPT slide 15 | leadership-governance or donor-wall — needs decision |
| **Paramedical School / Nursing Teaching College / Doctor Training Program** | PPT slides 13/36 | impact achievements or new education page — needs decision |
| **Major Achievements list** (ICU/PACU, C-ARM, LIS, Thrillium Laser, ambulance…) | PPT slide 8/13 | our-impact achievements slot (pending review #8) |
| **"A Unique Distinction"** (>90% free, 3-time meals) | PPT slide 9/16 | partially covered (purpose/impact copy) — reuse as home stat strip |
| Slide-14 supporter names (DIN GROUP, TOPSHOS, MILLAT ART, FRIENDS OF HIJAZ) | PPT | donor-wall candidates (garbled extract — verify) |

### Suggested implementation order

1. **Phase 0 — Schema:** profiles collection · navigation global · 8+7 new blocks · 8 field extensions · dataset field · global CTA settings. `pnpm generate:types`.
2. **Phase 1 — Chrome:** mega-menu header (navigation global), footer, breadcrumbs hub↔detail, global CTA toggle.
3. **Phase 2 — Core templates:** department detail rollout ×17, service detail ×13, hubs rebuilt to DS (categoryGroupedList), doctors hub.
4. **Phase 3 — About cluster:** our-purpose, leadership-governance, leadership-messages, profiles ×4.
5. **Phase 4 — Impact cluster:** our-impact (facts dataset, calendarEvents, highlights), donor wall, achievements review.
6. **Phase 5 — Donate:** 9 cause docs, donationMethods/bankDetails completion, zakat-calculator placement, pickup-service content.
7. **Phase 6 — Welfare cluster:** 6 new pages + whitelist, processSteps/numberedList, feedback/evaluation forms.
8. **Phase 7 — Diagnostics:** lab-tests seed + labTestsList, pathology/radiology/cardiac-dx pages, complianceLogos accreditations.
9. **Phase 8 — Home** (implement `home-alt-design-system.html`; apply pending design/content polish).
10. **Phase 9 — Migration & QA:** seed scripts (departments/doctors/lab-tests versions), redirects, orphan-content decisions, preview-path gaps (success-stories/publications/new-machinery).
