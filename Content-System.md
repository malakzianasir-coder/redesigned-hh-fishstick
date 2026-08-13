# Content System — Hijaz Hospital

Canonical rules for patient-facing copy. Visual layout lives in [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md) and [COMPONENTS.md](COMPONENTS.md). This file owns **voice, field roles, kickers, and anti-repetition**.

Changelog of edits from the 2026-08 messaging pass: [CONTENT-CHANGELOG.md](CONTENT-CHANGELOG.md).

Guardrail: `pnpm check:content` → [`scripts/check-content-repetition.mjs`](scripts/check-content-repetition.mjs).

**Out of scope for automated content passes:** [`content/doctors.json`](content/doctors.json), [`content/lab-tests.json`](content/lab-tests.json).

---

## 1. Brand line

**Care within reach.** Hijaz Hospital Trust is a non-profit, trust-based hospital where healthcare is a right, not a privilege — compassionate, dignified, and open to those who cannot afford treatment.

Use this idea across the site without pasting the same sentence into every hero.

---

## 2. Voice pillars

| Pillar | Meaning |
| --- | --- |
| Compassionate | Warm and human; never clinical coldness or pity |
| Clear | Short sentences; concrete services, times, and outcomes |
| Dignified | Patients are people, not cases or “beneficiaries” in marketing copy |
| Concrete | Prefer facts (“free medicines for every OPD patient”) over empty slogans |
| Faith-aware | Qur’an and Islamic framing where the page calls for it (Donate, Zakat); never sermonize on clinical pages |

**Avoid:** stacking slogans; repeating the hero line in the first body paragraph; CMS/editorial notes on the public site (see [AGENTS.md](AGENTS.md)).

---

## 3. Field roles (anti-repetition contract)

| Element | Job | Must not |
| --- | --- | --- |
| `hero.title` | Page H1 | Change casually; treat as stable page name |
| `kicker` | Orient: hub family or section role | Twin the title/heading on the same block |
| Section `heading` | Name the in-page section | Twin its kicker |
| Hero support | **One** line under the H1 | Show both `quote` and `excerpt` |
| `excerpt` / `lede` | One unique supporting idea | Equal SEO `description` or open the body |
| `description` | Meta / SEO only | Appear verbatim as on-page hero or card excerpt |
| Body | Detail and proof | Open by restating the excerpt |

### Hero support: quote vs excerpt

- **Default:** a single `excerpt` (body or quote-style — see §5).
- **Scripture / attribution pages** (e.g. Donate hub): a single `quote` is enough; do not also add a long `excerpt`.
- Never stack `hero.quote` + `hero.excerpt` under the same title.

---

## 4. Kicker taxonomy

Kickers tell the reader **where they are**. Reuse the same label across sibling pages. Do not invent poetic kickers that hide the section.

### Hub / hero kickers (parent area)

About Us · Donate · What You Can Support · How to Donate · Patient Welfare · Doctors · Surgery & Allied Specialties · Internal Medicine & Allied Specialties · Mother & Child Care · Diagnostics · Hospital Facilities · Support Services · Clinical Support · Specialized Care · Financial & Community Support · Patient Resources · …

### Section kickers (in-page role)

Overview · Services · Facilities · Why Choose Us · Timings · Impact · Process · Rights · Access · Accommodation · Quality · Our Team · Commitment · Ways to Give · How to Donate · …

### When kicker and heading collide

1. Prefer keeping the **orientation kicker**.
2. Rewrite the **section heading** so it adds meaning — or shorten the kicker to the role word (`Timings`, `Services`) and keep a concrete heading.
3. Never rewrite `hero.title` to fix a twin; rewrite the **hero kicker** to the parent hub/family instead.

### Kickers must not echo titles

Never use the same words for a kicker and the title/heading next to it. The `/donate` page is the **Donate hub** (H1: Donate). “Ways to Give” is only a **section/filter** inside that hub (Zakat, General, Sadaqah, Eidi) — not the hub name. Cause pages under it use hero kicker `Donate`.

---

## 5. Hero variants by page family

| Family | Routes | Hero support | `excerptVariant` |
| --- | --- | --- | --- |
| Home | `/` | Slider copy in `home.json` (not MarketingHero) | — |
| Marketing / about | `/about-us`, `/our-purpose`, `/leadership`, … | Single `excerpt` | `body` (default) |
| Donate hub | `/donate` | Single Qur’an `quote` (no stacked excerpt) | — |
| Donation causes | `/donate/*`, donations JSON | Single campaign `excerpt` | `body` |
| **Patient Care** | **`/services/[slug]`** | Single `excerpt` only | **`quote`** (italic + red rule) |
| Departments | `/departments/[slug]` | Single `excerpt` | `quote` (forced in UI) |
| Patient welfare | `/patient-welfare/*` | Single `excerpt` | `body` unless set otherwise |

Patient Care = the nav mega-menu group that maps to **services** (OPD, IPD, ICU, diagnostics, etc.). Implementation: [`ServiceDetailContent.tsx`](src/components/services/ServiceDetailContent.tsx) forces `excerptVariant: 'quote'` and clears a separate `quote` field so content cannot reintroduce stacked support lines.

---

## 6. Where content lives

| Area | Source |
| --- | --- |
| Page copy | [`content/*.json`](content/) |
| Types | [`src/lib/content/types.ts`](src/lib/content/types.ts) |
| Loaders | [`src/lib/content/loaders.ts`](src/lib/content/loaders.ts) |
| Interior hero UI | [`src/components/marketing/MarketingHero.tsx`](src/components/marketing/MarketingHero.tsx) |
| Section headers | [`src/components/site/BlockHeader.tsx`](src/components/site/BlockHeader.tsx) |

Author in JSON. Prefer photography over illustration presets for live heroes when assets exist ([COMPONENTS.md](COMPONENTS.md)).

---

## 7. Checklist for new or edited pages

1. `hero.title` is the agreed page name (do not “improve” it without editorial sign-off).
2. Kicker answers “which hub / which section?” and does not equal the title/heading.
3. Exactly one hero support line (`excerpt` **or** `quote`).
4. SEO `description` ≠ on-page excerpt (same idea OK; same wording not OK).
5. First body paragraph adds new information.
6. Patient Care service pages keep `excerptVariant: 'quote'` (UI enforces this).
7. No CMS / editorial notes in rendered output.
8. Run `pnpm check:content`.
9. Append before/after rows to [CONTENT-CHANGELOG.md](CONTENT-CHANGELOG.md) when doing a bulk copy pass.

---

## 8. Related docs

- [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md) — tokens, `.kicker` style, BlockHeader layout  
- [COMPONENTS.md](COMPONENTS.md) — heroes, sections, page recipes  
- [NAVIGATION.md](NAVIGATION.md) — hubs, URLs, mega menu  
- [CONTENT-CHANGELOG.md](CONTENT-CHANGELOG.md) — before/after log for copy edits  
- [CONTENT-REQUEST.md](CONTENT-REQUEST.md) — missing assets and confirmations from the hospital  
