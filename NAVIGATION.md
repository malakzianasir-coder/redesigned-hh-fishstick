# NAVIGATION.md — Hijaz Hospital site structure & mega menu

How the site is organized in the header mega menu, how hub pages relate to
subpages, and the rules for keeping links consistent.

Source of truth for labels/hrefs: [`content/navigation.json`](./content/navigation.json).  
Renderer: [`src/components/site/SiteHeader.tsx`](./src/components/site/SiteHeader.tsx).  
Types: [`src/lib/navigation/types.ts`](./src/lib/navigation/types.ts).

Related: [`DESIGN-SYSTEM.md`](./DESIGN-SYSTEM.md) (visual tokens) ·
[`COMPONENTS.md`](./COMPONENTS.md) (page building blocks).

---

## 1. Mental model

```
Website
└── Top-level mega menu item          e.g. Donate, About us, Departments
    ├── moreLink (footer of panel)    e.g. “Ways to give hub →” → /donate
    └── groups[]                      columns in the mega panel
        ├── heading (+ optional href) ← MUST link to the hub when a hub exists
        └── links[]                   subpages / anchors under that hub
```

| Layer | What it is | Example |
|---|---|---|
| **Top-level** | Primary header item that opens a mega panel | Donate |
| **Hub page** | Overview / index for a topic; lists or introduces its children | `/donate/how-to-donate` |
| **Subpage** | Detail page under a hub | `/donate/how-to-donate/online` |
| **Anchor** | In-page section on a hub or long marketing page | `/our-purpose#vision-mission` |

**Rule:** If a mega-menu column title names a hub (e.g. “How to Donate”, “What You
Can Support”), that **heading must be a link** to the hub URL via `groups[].href`.
Child links go to subpages (or anchors) under that hub.

When a hub uses **category filter pills** (e.g. Departments: All / Surgery & Allied /
Internal Medicine…), the group heading should deep-link with a hash that matches the
filter slug so the pill activates on arrival:

| Mega heading | Hub deep link |
|---|---|
| Surgery & Allied Specialties | `/departments#surgery-allied` |
| Internal Medicine & Allied Specialties | `/departments#internal-medicine` |
| Mother & Child | `/departments#mother-child` |
| Specialized Care | `/departments#specialized` |
| Hospital Facilities | `/services#facilities` |
| Clinical Support | `/services#clinical` |
| Support Services | `/services#support` |
| Diagnostics | `/services#diagnostics` |

`CategoryHubGrid` keeps filter chips in sync with `location.hash` (click updates hash;
hash / back-forward activates the matching pill). Use `#all` or no hash for “All”.
Content hubs (Donate, About Us, Patient Welfare) use the **same chip behaviour** for
their groups via `ContentHubPage` — mock: `public/ds/hub-page-patterns.html` H03 / H04 / H07.

---

## 2. URL patterns

Prefer one clear parent path per topic:

| Pattern | Use |
|---|---|
| `/[hub]` | Top hub (listing or overview) |
| `/[hub]/[slug]` | Subpage under that hub |
| `/[hub]/[section]/[slug]` | Nested topic hubs (donate methods / support causes) |

### Donate (canonical)

| Role | URL |
|---|---|
| Donate hub | `/donate` |
| Giving-type subpages (Zakat, General, Sadaqah, Eidi) | `/donate/zakat`, `/donate/general`, `/donate/sadaqah`, `/donate/eidi-fitrana` |
| What You Can Support hub | `/donate/what-you-can-support` |
| Support subpages | `/donate/what-you-can-support/donate-a-meal`, … |
| How to Donate hub | `/donate/how-to-donate` |
| Method subpages | `/donate/how-to-donate/online`, … |

Do **not** mix `/donations/...` with `/donate/...`. New links use `/donate` only.

### Other common hubs

| Hub | URL | Typical children |
|---|---|---|
| About Us | `/about-us` | Cards + filters to purpose / leadership / messages / impact |
| Our Purpose | `/our-purpose` | In-page anchors (`#vision-mission`, …) |
| Leadership | `/leadership` | Anchors + `/leadership/messages` |
| Our Impact | `/our-impact` | Anchors + `/our-supporters` |
| Departments | `/departments` | `/departments/[slug]` |
| Doctors | `/doctors` | `/doctors/visiting-consultants`, `/doctors/heads-of-departments` |
| Services | `/services` | `/services/[slug]` |
| Patient Welfare | `/patient-welfare` | `/patient-welfare/[slug]` |

---

## 3. Mega menu data shape

```ts
type NavGroup = {
  heading: string
  href?: string      // hub URL — required whenever the heading names a hub
  links: NavLink[]
}

type NavTopLevelItem = {
  id: string
  label: string
  moreLink?: NavLink
  groups: NavGroup[]
}
```

### Heading link behaviour

- `href` present → heading renders as a link (desktop + mobile), hover to `primary-red`.
- `href` omitted → heading stays plain label text (only for non-hub category labels
  with no overview page — prefer adding a hub `href` when one exists).

### Donate mega columns (required hubs)

| Heading | `href` |
|---|---|
| Ways to Give | `/donate` |
| What You Can Support | `/donate/what-you-can-support` |
| How to Donate | `/donate/how-to-donate` |

The page at `/donate` is the **Donate hub**. The mega-menu column “Ways to Give” lists giving types (Zakat, General, …) and links to that hub — it is not a separate hub name.

---

## 4. Hub vs subpage composition

Hubs and subpages use the marketing shell from COMPONENTS.md:

```
MarketingBreadcrumb
MarketingHeroSection
Topic chip nav (sibling hubs/methods)   ← optional but preferred for donate hubs
Body (cards / purpose-built panels)
Closing CTA (MarketingSupportCTA or GlobalCtaSection)
```

| Page type | Job |
|---|---|
| **Hub** | Introduce the topic; grid/cards linking to every subpage; short assistance / next-step band |
| **Subpage** | One job only; verbatim topic content; chip nav back to siblings + hub; link to How to Donate when giving is the next action |

Breadcrumb trail for nested donate pages:

```
Home / Donate / [Hub title] / [Subpage title]
```

Breadcrumb trail for About pages (parent is always `/about-us`, never `/our-purpose`):

```
Home / About Us                              ← /about-us hub
Home / About Us / Our Purpose
Home / About Us / Leadership
Home / About Us / Leadership / Messages
Home / About Us / Leadership / Messages / [Chairman | President]
Home / About Us / Leadership / [Founder profile]
Home / About Us / Our Impact
Home / About Us / Our Impact / Our Supporters
```

---

## 5. Top-level menu map

| `id` | Label | Hub / moreLink |
|---|---|---|
| `about` | About us | `/about-us` (+ purpose, leadership, messages, impact via group headings) |
| `departments` | Departments | `/departments` |
| `doctors` | Doctors | `/doctors` |
| `patient-care` | Patient Care | `/services` (Hospital Facilities, Clinical Support, Support Services, Diagnostics) |
| `patient-welfare` | Patient Welfare | `/patient-welfare` |
| `donate` | Donate | `/donate` (+ what-you-can-support & how-to-donate hubs) |

When adding a new top-level item, always define `moreLink` to its primary hub.

---

## 6. Checklist — adding a hub + subpages

1. Create hub route (`/topic` or `/donate/topic`) and subpage routes (`/topic/[slug]`).
2. Add content JSON + loaders; keep copy verbatim from editorial source.
3. Compose with `MarketingBreadcrumb` on **every** hub (content and catalogue) plus
   `MarketingHeroSection` on content hubs, or centered listing `h1` + filters on
   catalogue hubs (see COMPONENTS.md) — not a wall of generic `content` blocks.
4. In `navigation.json`:
   - Add/update a `groups[]` entry with `heading`, **`href` → hub**, and `links[]` → subpages.
   - Keep child hrefs under the same path prefix as the hub.
5. Update footer / home / donate hub cards that deep-link to the same URLs.
6. Reserve the hub path segment in any catch-all `/donate/[slug]` (or similar) router.

---

## 7. Do / Don’t

| Do | Don’t |
|---|---|
| Link every hub-named mega heading via `groups[].href` | Leave “How to Donate” / “What You Can Support” as plain text |
| Use one URL family per topic (`/donate/...`) | Split the same topic across `/donate` and `/donations` |
| Point child links at real subpages | Point mega children only at `#anchors` on a single long page when they should be subpages |
| Keep breadcrumb on every hub (`Home / Current`) and on subpages (`Home → parent hub → current`) | Skip the hub in the trail, or omit breadcrumbs on catalogue hubs |
| Reuse chip rails for sibling methods/causes | Invent a second jump-nav pattern for the same job |
| Keep mega panels to groups + moreLink only | Add a featured / “Image slot” promo card in the mega menu |

---

## 8. Footer link columns

Source of truth for footer link labels/hrefs lives in
[`src/components/site/SiteFooter.tsx`](./src/components/site/SiteFooter.tsx)
(`FOOTER_COLUMNS`). Keep them a **curated subset** of the mega-menu hubs — not a
full dump of every child link.

| Column | Role | Canonical links |
|---|---|---|
| **About Us** | About hubs | About Hijaz Hospital → `/about-us`; Vision & Mission → `/our-purpose#vision-mission`; Leadership & Governance → `/leadership`; Messages → `/leadership/messages`; Our Impact → `/our-impact`; Our Supporters → `/our-supporters` |
| **Patient Care** | Care + find care | Emergency → `/services/emergency`; OPD → `/services/opd`; IPD → `/services/ipd`; Clinical Laboratory → `/services/pathology`; Find a Doctor → `/doctors`; Patient Welfare → `/patient-welfare` |
| **Donate** | Three donate hubs + key children | Donate hub → `/donate`; What You Can Support → `/donate/what-you-can-support`; How to Donate → `/donate/how-to-donate`; Zakat → `/donate/zakat`; Sponsor a Patient → `/donate/what-you-can-support/sponsor-a-patient`; Donate Online → `/donate/how-to-donate/online` |

Bottom legal/utility row (same file):

| Label | Href |
|---|---|
| Patient Rights | `/patient-welfare/patient-rights` |
| Clinical Departments | `/departments` |
| Our Impact | `/our-impact` |

**Rules:** use the same `/donate/...` URL family as the mega menu; point service
links at `/services/[slug]` (not generic `/services` when a specific page exists);
never reintroduce `/donations/...` or dead paths like `/lab-reports` / `/reports`.

---

## 9. Related files

| File | Role |
|---|---|
| `content/navigation.json` | Mega menu labels, hub hrefs, child links |
| `src/components/site/SiteHeader.tsx` | Desktop mega panel + mobile accordion |
| `src/components/site/SiteFooter.tsx` | Footer link columns (keep in sync with hubs) |
| `content/donate.json` | Donate hub cards + jump links |
| `content/how-to-donate.json` | How to Donate hub + methods |
| `content/what-you-can-support.json` | What You Can Support hub + causes |
| `content/donations.json` | Donate giving-type + support cause records (`/donate/[slug]`) |
