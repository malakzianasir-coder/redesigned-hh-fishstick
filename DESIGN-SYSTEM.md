# DESIGN-SYSTEM.md — Hijaz Hospital

**This is the single source of truth for all new UI.** Any new component, block, hero, or
page must follow this document. Existing components predate it and contain known drift —
they are legacy, will be migrated later (backlog: `design-system-audit/06-UNIFIED-SPEC.md`),
and **must not be used as style references**.

All tokens below **exist in the config today** (`tailwind.config.mjs`, `globals.css`).
If a value you need isn't here, extend the config — never hardcode.

---

## 1. Color

### 1.1 Brand core

| Token | Hex | Role |
|---|---|---|
| `primary-blue` | `#1B2441` | Headings, strong text, dark sections, secondary buttons |
| `primary-red` | `#E30016` | Primary CTAs, link hovers, kickers, focus rings, accents |
| `dark-blue` | `#101524` | Deepest ink — footer, overlays on media (not headings) |
| `dark-gray` | `#6B7183` | Muted/meta text; borders via alpha |
| `light-blue` | `#144CD9` | Highlight/glow accents on dark backgrounds |
| `red-soft` | `#F76B79` | Illustration accents, chart series, swiper bullets |
| `red-softer` | `#F1A9B0` | Inactive swiper bullets, soft red tints |

`pure-blue` is a deprecated duplicate of `light-blue` — never use it.

### 1.2 Surfaces

| Token | Hex | Role |
|---|---|---|
| `white` | `#FFFFFF` | Default surface |
| `whitebg` | `#F8F8F9` | Alternate section background |
| `cardbg` | `#F4F4F4` | Card fills, chips, skeletons, table headers |
| `redbg` | `#F1EAEB` | Red-tinted surface (callouts, icon tiles) |
| `cream` | `#F4F1EC` | Impact-report hero visual only |

### 1.3 Status

| Token | Hex | Usage |
|---|---|---|
| `success` | `#16A34A` | Confirmations, published states |
| `warning` | `#D97706` | Pending states, cautions |
| `error` | `#DC2626` | Form errors, destructive actions |
| `info` | `#144CD9` | Informational chips/links |

### 1.4 Text color ramp (the only four)

| Purpose | Class |
|---|---|
| Headings / strong text | `text-primary-blue` |
| Body on light | `text-primary-blue/85` |
| Secondary text | `text-primary-blue/70` |
| Meta / captions | `text-dark-gray` |

On dark: `text-white`, `text-white/85`, `text-white/55`.
Heading ink is **always** `primary-blue` — never `dark-blue`.

### 1.5 Borders

- Hairline (cards, panels, dividers): `border border-dark-gray/15`
- Inputs: `border-dark-gray/25`, hover `border-dark-gray/40`
- On dark: `border-white/10`
- Never `border-[0.5px]` (sub-pixel, inconsistent across browsers)

### 1.6 Opacity ramp

Allowed stops: `/5 /10 /15 /25 /40 /60 /80`, plus text ramp `/85 /70 /55`, plus `/95` for
translucent bars/overlays. No other alpha values.

### 1.7 shadcn semantic layer

`background`, `foreground`, `card`, `popover`, `primary`, `secondary`, `muted`, `accent`,
`destructive` (+`-foreground`s), `border`, `input`, `ring` are defined and alias the brand
tokens. Use them only inside shadcn-style primitives (`src/components/ui/*`); everywhere
else use the brand tokens directly.

### 1.8 Banned

Tailwind palette colors (`slate-*`, `gray-*`, `red-500/600`, `blue-*`, `rose-*`, `teal-*`,
`amber-*`, `green-*`, `indigo-*`, `cyan-*`, `emerald-*`…), raw hex/rgba in className,
`rgb(27,36,65,…)` shadows (use `shadow-e*`).

---

## 2. Typography

### 2.1 Families

| Token | Stack | Usage |
|---|---|---|
| `font-display` | Zodiak → Georgia → serif | Display type on non-heading elements (rare) |
| `font-sans` | Open Sans → system-ui | Explicit sans when overriding |
| `font-mono` | ui-monospace | Till/IBAN identifiers only |

Body text inherits Open Sans automatically; **semantic `h1`–`h6` tags get Zodiak
automatically** via base CSS. Always use real heading tags for headings — don't style a
`p`/`div` as one.

### 2.2 Scale

| Token | Size | Mobile pair | Usage |
|---|---|---|---|
| `h1` | 42px | `h1M` 32px | Page/hero titles |
| `h2` | 34px | `h2M` 28px | Major sections |
| `h3` | 30px | `h3M` 24px | Block headings |
| `h4` | 28px | `h4M` 22px | Sub-sections |
| `h5` | 24px | `h5M` 20px | Card-group titles |
| `h6` | 20px | `h6M` 18px | Card titles |
| `b18` | 18px | — | Leads, pull quotes |
| `b16` | 16px | — | Body |
| `b14` | 14px | — | Small body, meta, dense UI |
| `b12` | 12px | — | Kickers, tags, breadcrumbs |
| `label` | 11px | — | Field/group labels |

Rules:

- Every heading is responsive: `text-h3M lg:text-h3` (never flat `text-h3`).
- Line heights: `leading-[110%]` (h1), `leading-[120%]` (h2–h6), `leading-[150%]` (body).
  No other leading values.
- Display tracking: `tracking-display` (−0.32%) on h1-level titles only.
- Weights: 400 / 600 / 700 only. No `font-extrabold`/`font-black`.
- No arbitrary text sizes (`text-[13px]`, `text-[64px]`…). If the scale lacks a size, the
  design is off-system — fix the design or extend the scale.

### 2.3 Micro-styles (canonical classes)

```html
<p class="kicker">Section eyebrow</p>            <!-- b12 bold uppercase 0.12em primary-red -->
<span class="field-label-text">Group label</span> <!-- 11px semibold uppercase wide blue/55 -->

<!-- Breadcrumb — b12, single row. Overflow: show the end by default; pinned white fades. -->
<nav aria-label="Breadcrumb" class="border-b border-dark-gray/15 bg-white">
  <div class="container mx-auto px-6 py-2 lg:px-[30px]">
    <div class="breadcrumb-overflow">
      <div class="breadcrumb-overflow__fade breadcrumb-overflow__fade--start"></div>
      <div class="breadcrumb-overflow__fade breadcrumb-overflow__fade--end"></div>
      <div class="breadcrumb-scroller">
        <ol class="flex w-max flex-nowrap items-center gap-2 text-b12 leading-[150%] text-dark-gray">
          <li class="flex shrink-0 items-center gap-2">
            <a href="/" class="text-primary-blue hover:text-primary-red">Home</a>
          </li>
          <li class="flex shrink-0 items-center gap-2">
            <span class="text-dark-gray/40">/</span>
            <span aria-current="page" class="font-semibold text-primary-blue">Current</span>
          </li>
        </ol>
      </div>
    </div>
  </div>
</nav>
```

---

## 3. Layout, spacing, elevation, z-index, motion

### 3.1 Section shell — every new block/page section

```html
<section className="container mx-auto px-6 lg:px-[30px] py-[30px] lg:py-[60px]">
```

Optional tone: `bg-whitebg` (alternate) or `bg-primary-blue` (dark band). Nothing else.
Nested panels inside a section use `p-4 lg:p-5`, never section padding.

### 3.2 Grids

- Split layouts: `grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16` + `lg:col-span-*`
  (4/6/8/12 are safelisted).
- Card grids: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-{3|4} gap-6` (dense) or `gap-8`.
- Gaps from the default scale only (`gap-2/3/4/6/8/12/16`).

### 3.3 Radius (role-based)

| Role | Class | Value |
|---|---|---|
| Cards, panels, form boxes | `rounded-2xl` | 16px |
| Inputs, media/images, drawers | `rounded-xl` | 12px |
| Inner chips, table cells | `rounded-lg` | 8px |
| Tags, badges, buttons, pills, avatars | `rounded-full` | pill |
| Report chrome only | `rounded` | 4px |

Not allowed in new work: `rounded-3xl`, `rounded-[…]` arbitrary, bare `rounded` outside
reports.

### 3.4 Elevation (tokenized)

| Token | Usage |
|---|---|
| `shadow-e1` | Resting cards (≈ `shadow-sm`; either is acceptable, prefer `shadow-e1`) |
| `shadow-e2` | Card hover, sticky bars, dropdown panels |
| `shadow-e3` | Drawers, modals, donation form overlays |

No other shadows (no `shadow-md/lg/xl/2xl`, no arbitrary shadow values).

### 3.5 z-index (tokenized)

| Token | Value | Usage |
|---|---|---|
| `z-sticky` | 30 | Sticky filter bars — pair with `.sticky-bar` |
| `z-header` | 40 | Site header |
| `z-overlay` | 50 | Dropdowns, mega panels, drawer overlays |
| `z-drawer` | 60 | Drawers, mobile nav |
| `z-modal` | 70 | Dialogs, fullscreen views |
| `z-max` | 80 | Toasts, skip links |

No `z-[…]` brackets, no `z-10/20/50` guessing.

### 3.6 Motion

- Durations: `duration-200` (micro), `duration-300` (default), `duration-500` (image zoom).
- Ease: `ease-in-out` for color swaps, `ease-out` for movement.
- Card hover: `-translate-y-0.5` + `shadow-e2` (`.card-interactive` does this).
- Link hover: `hover:text-primary-red`; button hover: red↔blue swap (§5).
- Reveals: `ScrollReveal` (via `RenderBlocks`) / `StaggerReveal` for lists — never hand-roll
  observers.

---

## 4. Icons & media

- Icons: `PhosphorIcon` with `color="currentColor"`, size 16/20/24. (Lucide only inside
  carousel chevron buttons, matching existing heroes.)
- Images: `Media` component or `getMediaUrl()` — never hardcode `/media/…` paths.
- Media frames: `rounded-xl overflow-hidden`; `aspect-video` (feature) or `aspect-card`
  (3:2, card thumbnails); `object-cover`.

---

## 5. Buttons

Pill shape, bold, one focus ring, red↔blue hover. Three sanctioned forms:

### 5.1 CMS links — `CMSLink`

`appearance="default"` = red pill + blue icon chip (canonical CTA).
`appearance="outline"` = white/blue pill filling red on hover.
`appearance="link"` = inline text link.
Do not restyle these with extra classes.

### 5.2 Action buttons (submit, toggle) — recipe

```html
<!-- Primary -->
<button className="inline-flex items-center justify-center gap-[10px] min-h-[50px] px-6
  rounded-full bg-primary-red text-b16 font-bold text-white
  transition-colors duration-300 ease-in-out hover:bg-primary-blue
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-red/40
  focus-visible:ring-offset-2 disabled:opacity-50">
  Label
</button>

<!-- Secondary: swap to bg-primary-blue hover:bg-primary-red -->
<!-- Ghost: bg-transparent text-primary-blue hover:bg-cardbg -->
```

Sizes: `h-9 px-4 text-b14` (sm) · `min-h-[50px] px-6 text-b16` (md) · `h-12 px-8 text-b18` (lg).
Site CTAs (`.btn-primary`, `.btn-ghost`, `.btn-on-dark`, `.btn-on-dark-ghost`) all use **md** — same height, padding, and type size. Color and fill differ; size does not.

### 5.3 Icon button

```html
<button className="flex h-11 w-11 items-center justify-center rounded-full border
  border-primary-blue/25 text-primary-blue transition-all duration-300
  hover:border-primary-red hover:bg-primary-red hover:text-white
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-red/40">
  <PhosphorIcon iconName="MagnifyingGlass" size={20} color="currentColor" />
</button>
```

> Known legacy issue: `ui/button`'s standalone `size="default"` has left-only padding
> (B-1) — use the recipes above until its Phase-2 CVA rewrite.

Hover rule: red→blue or blue→red only. Never red→red/85, never scale, never shadow-only.

### 5.4 Link & button copy — must be descriptive

Labels name the destination or action. Never reuse the same generic phrase across a
card grid.

| Do | Don’t |
|---|---|
| View Our Founders | View leadership (on every card) |
| View General Surgery | View department / View details |
| Give Zakat · Read Chairman’s Message | Learn more · Read more · Click here |
| View Leadership (section “All X” CTA) | More · Submit · Continue (unless the action is truly that) |

A section header CTA may say “View Leadership” / “All News” once. Card links under it
must still be unique and match that card’s title.

---

## 6. Inputs & forms

One boxed field system for light backgrounds, one underline variant for dark.

### 6.1 Boxed fields (light backgrounds) — existing canonical classes

```html
<div class="float-field">
  <input id="email" placeholder="Email" class="float-input peer" />
  <label for="email" class="float-label">Email</label>
</div>

<label class="donation-field-label" for="amount">Amount</label>
<input id="amount" class="donation-field" />

<select class="brand-select">…</select>
<textarea class="float-textarea" />
```

(White bg, `dark-gray/25` border, `rounded-xl`, 56px min height, red focus border +
`ring-primary-red/15`.) Errors: `text-error text-b14 mt-1`. Success: `text-success`.

### 6.2 Underline field (dark backgrounds only)

```html
<input class="w-full border-b border-white/40 bg-transparent px-4 py-3 text-b16 text-white
  placeholder:text-white/55 focus:border-primary-red focus:outline-none" />
```

### 6.3 Search / filter pill

```html
<input class="min-h-[44px] w-full rounded-full border border-dark-gray/25 bg-white px-4
  text-b14 text-primary-blue placeholder:text-primary-blue/55
  focus:border-primary-red focus:outline-none focus:ring-2 focus:ring-primary-red/15" />
```

**Never** use `.custom-input` (white text — invisible on light backgrounds; legacy bug I-2).

---

## 7. Cards & chips

Canonical classes now exist in `globals.css` — use them:

```html
<!-- Static card -->
<div class="card p-6">…</div>

<!-- Interactive card (hover lift + e2 shadow) -->
<a class="card-interactive group flex flex-col overflow-hidden">
  <div class="relative aspect-card overflow-hidden">
    <Image fill class="object-cover transition-transform duration-500 group-hover:scale-105" />
  </div>
  <div class="flex flex-1 flex-col gap-2 p-6">
    <p class="kicker">Tag</p>
    <h3 class="text-h6 font-bold leading-[120%] text-primary-blue
      transition-colors group-hover:text-primary-red">Title</h3>
    <p class="line-clamp-3 text-b14 leading-[150%] text-primary-blue/85">Excerpt…</p>
  </div>
</a>

<!-- Overlay/media card: card + relative overflow-hidden, gradient
     bg-gradient-to-b from-primary-blue/0 to-primary-blue, white text bottom-anchored -->

<!-- Chip (filters, quick links) -->
<button class="chip">Filter</button>

<!-- Filter chip with count — label 11px (`text-label`), not the same size as the chip -->
<button class="chip">All <span class="chip-count">24</span></button>

<!-- Status chips -->
<span class="rounded-full bg-success/10 px-3 py-1 text-b14 font-medium text-success">Active</span>
<span class="rounded-full bg-warning/10 px-3 py-1 text-b14 font-medium text-warning">Pending</span>
<span class="rounded-full bg-info/10 px-3 py-1 text-b14 font-medium text-info">Research</span>

<!-- Skeleton -->
<div class="animate-pulse rounded-2xl bg-cardbg"><div class="aspect-card" /></div>
```

---

## 8. Carousel (ds3d — infinite 3D)

Canonical interactive carousel for **featured media rows** (machinery, doctors, similar
collections). Reference implementation:
`archive/html-mockups/public/home-alt-design-system.html` (`createDs3dCarousel`, `.ds3d-*`).

Do **not** invent a second carousel pattern (no new Swiper skins, no CSS-only ring clones)
unless this recipe cannot cover the use case.

### 8.1 When to use

| Use | Prefer |
|---|---|
| 4+ portrait/media items that should feel browsable | **ds3d carousel** |
| 1–3 static feature cards | Grid of `.card-interactive` (§7) |
| Hero banners | Existing `fullBannerHero` / CMS hero types (§10) |

### 8.2 Shell markup

```html
<div class="ds3d-stage" id="…-stage" aria-label="… carousel — drag or scroll to browse">
  <div class="ds3d-loader" id="…-loader" aria-label="Loading" aria-live="assertive">
    <div class="ds3d-loader__ring" aria-hidden="true"></div>
  </div>
  <canvas class="ds3d-bg" id="…-bg" aria-hidden="true"></canvas>
  <div class="ds3d-cards" id="…-cards" aria-live="polite"></div>
  <div class="ds3d-nav">
    <button type="button" id="…-prev" aria-label="Previous"><!-- icon --></button>
    <button type="button" id="…-next" aria-label="Next"><!-- icon --></button>
  </div>
  <p class="ds3d-hint chip text-b12">Drag · scroll · swipe</p>
</div>
```

Pair with the §9 block header (kicker / title / lede + optional “View all” CTA).

### 8.3 Tokens & classes

| Piece | Spec |
|---|---|
| Stage | `whitebg` fill, `border-dark-gray/15`, `rounded-2xl`, `perspective` ~1800px |
| Card | `rounded-xl`, hairline border, `shadow-e1`, media `object-cover`, aspect **3/4** |
| Caption | Bottom gradient `dark-blue/80 → transparent`, title `text-b14 font-bold text-white` |
| Meta under title | `text-b12 text-white/85` |
| Nav chevrons | Pill icon buttons (§5.3): white fill, `border-dark-gray/15`, hover red fill |
| Focus | `focus-visible:ring-2 ring-primary-red/40` (+ white/whitebg offset as needed) |
| Motion | Drag / wheel momentum; entry via GSAP when available; honor `prefers-reduced-motion` |

Gradient canvas behind cards uses **brand palette fallbacks** (`primary-red`, `primary-blue`,
`light-blue`, `red-soft`) — never arbitrary Tailwind palette colors.

### 8.4 Slide data (including links)

Each slide is a plain object. **`href` is required when the card should navigate** to another
page (department, service, doctor hub, new-machinery detail, etc.).

```ts
type Ds3dSlide = {
  src: string          // media URL (production: Media / getMediaUrl)
  title: string        // caption title
  alt?: string         // img alt; defaults to title
  role?: string        // optional subtitle (e.g. specialty)
  href?: string        // optional — when set, card renders as <a class="ds3d-card is-link">
  external?: boolean   // optional — target=_blank + rel=noopener noreferrer
}
```

```js
createDs3dCarousel({
  stageId, cardsId, bgId, loaderId, prevId, nextId,
  slides: [
    {
      src: '/media/…',
      title: 'Dialysis Care Unit',
      alt: 'Dialysis care unit',
      href: '/departments/dialysis-care-unit',  // ← link to destination page
    },
  ],
  captionHtml: (s) =>
    `<p class="text-b14 font-bold leading-[120%]">${s.title}</p>` +
    (s.role ? `<p class="text-b12 text-white/85 mt-1">${s.role}</p>` : ''),
})
```

**Link rules:**

- With `href`: root element is `<a class="ds3d-card is-link">` (full-card hit target).
- Without `href`: root element is `<article class="ds3d-card">` (display-only).
- Drag / swipe must **not** trigger navigation — suppress click when pointer moved past a
  small threshold (~6px).
- Keyboard: linked cards are focusable via normal tab order; chevrons remain separate controls.
- Production React: prefer `CMSLink` / Next `Link` wrapping the same card chrome, or pass
  relationship-resolved `href` from Payload (`departments`, `services`, `doctors`,
  `new-machinery`, etc.).

### 8.5 Interaction summary

| Input | Behavior |
|---|---|
| Drag / swipe | Scroll track + momentum |
| Wheel (over stage) | Horizontal scroll (prevent page scroll while interacting) |
| Prev / next | Nudge by one card step |
| Click / tap (linked card, no drag) | Navigate to `href` |
| Scroll into view | Boot once; pause loops when off-screen / tab hidden |

### 8.6 Do not

- Put CTAs, chips, or stats on the card face beyond title / optional role.
- Use inset / floating image cards instead of edge-to-edge cover media inside `.ds3d-card`.
- Hardcode off-brand gradient hexes or shadow stacks outside `shadow-e*`.
- Nest interactive controls inside a linked card (chevron nav stays outside the card list).

---

## 9. Block header pattern

Every new block reuses this header (don't hand-roll variants).

**Alignment rule:** Block title, kicker, and lede are **center-aligned** when the header
has no CTA. If the header includes a CTA button/link (e.g. "All News"), the text group
is **left-aligned** and the CTA sits on the right at the `lg:` breakpoint.

**"All X" CTA rule:** Any section that **lists a collection** (news, doctors, departments,
services, machinery, etc.) **must** include an "All {Collection}" CTA button (e.g. "All
News", "All Doctors", "All Departments") unless explicitly asked otherwise or a documented
exception applies.

### 9.1 Center-only header (no CTA)

For blocks that don't list a browsable collection (e.g. a feature highlight, about blurb,
testimonial):

```html
<div className="flex flex-col gap-8">
  <div className="flex flex-col items-center gap-[6px] text-center">
    <p className="kicker">Kicker</p>
    <h2 className="text-h3M font-bold leading-[120%] text-primary-blue lg:text-h3">Heading</h2>
    <p className="text-b16 leading-[150%] text-primary-blue/85">Lede…</p>
  </div>
  {/* grid / carousel / content */}
</div>
```

### 9.2 Left header + right-aligned CTA (listing sections)

For blocks that list a collection (news, doctors, services…). At `lg`, copy is
left-aligned and the CTA sits on the right (`flex-row justify-between`). Stacked
and centered on mobile.

Reference: `public/ds/hub-page-patterns.html` (H02).

```html
<div className="block-header">
  <div className="block-header__copy">
    <p className="kicker">Kicker</p>
    <h2 className="text-h3M font-bold leading-[120%] text-primary-blue lg:text-h3">Heading</h2>
    <p className="text-b16 leading-[150%] text-primary-blue/85">Lede…</p>
  </div>
  <a href="/news" className="btn-ghost block-header__action">All News</a>
</div>
```

`.block-header` with an `__action` becomes a row at `lg`: `__copy` is `flex-1 text-start`,
CTA is `shrink-0` on the right. CMS blocks may use `CMSLink appearance="outline"` in
place of `btn-ghost`.

**Hub-index exception:** the page that *is* the collection (`/departments`, `/donate`
Ways to Give, `/news` hub) omits a self-referential “All X” CTA. Teaser listings on
other pages keep it.

---

## 10. Tables & sticky bars

Tables: `w-full border-collapse text-b14`; header cells `bg-cardbg px-4 py-3 text-left
font-semibold`; body cells `border-b border-dark-gray/15 px-4 py-3 text-primary-blue/85`.

Sticky filter bars: `<div class="sticky-bar">` (hairline + blur always; sticky only at
`lg+`, docking at `var(--header-h)`).

---

## 11. Heroes, navigation, reports

- **Heroes:** don't create new hero types — the CMS `hero` group
  (none/low/medium/high/fullBanner) and `NewsHero` cover all templates. New hero-styled
  content must match: `text-h1M lg:text-h1 font-bold leading-[110%] tracking-display
  text-primary-blue`, body `text-b16 lg:text-b18 text-primary-blue/85`, media `rounded-xl`,
  overlays `bg-dark-blue/40`.
- **Navigation:** frozen. Two legacy header implementations exist pending consolidation;
  don't add nav UI or copy `HeaderV2` classes anywhere. New menu entries come from the
  Header global in CMS.
- **Hub filters vs content-page jump:** the chip rail looks the same. **Hubs filter**
  (`All` + on-page groups; each chip shows a `chip-count` in `text-label` / 11px;
  selecting a chip hides the rest; hash-sync like Departments).
  Hub cards/items within each visible section must render in **A–Z** order by title
  (or name when title is unavailable), independent of source JSON order.
  **Innermost content-full pages scroll** (no `All` chip; hash chips jump to the section
  and never hide content; sticky while reading on desktop, non-sticky on mobile/tablet).
  On mobile, the chip rail stacks vertically (single column) to avoid consuming vertical
  viewport space.
  On tablet, reduce jump chips to `text-b12` with tighter pill padding to preserve viewport.
  **Other-page links are never mixed in** —
  they sit beside the rail as chips with `ph-arrow-square-out`, `target="_blank"`, and
  `rel="noopener noreferrer"`. Spec: `public/ds/hub-page-patterns.html` (hubs H03/H04/H05/H07;
  content-full H08).
- **Breadcrumbs:** `text-b12 leading-[150%]`, single row (`flex-nowrap`), `py-2`. Links
  `text-primary-blue hover:text-primary-red`; current crumb `font-semibold text-primary-blue`.
  Required on **every interior hub** (content and catalogue) as `Home / Current`, and on
  subpages as `Home → parent hub → current`. Not used on home or campaign landing pages.
  When the trail overflows: **no auto-marquee** — the row is overflow-x scrollable
  (scrollbar hidden) and **defaults to the end** so the current page stays visible
  (earlier crumbs fade off the left). Short white fades (`w-6` / 24px) are **pinned to
  the viewport ends** (not on the scrolling items). Left fade hides at the start; right
  fade hides at the end. Use `MarketingBreadcrumb`.
- **Impact reports:** scoped editorial sub-system — reuse `src/blocks/report/` blocks and
  `report.css`; don't import report styles into layout blocks or vice versa.

---

## 12. Illustration system

Preset-driven SVG art for interior-page heroes. Living catalog: `/ds/illustrations`.

**Source of truth is production code**, not `public/ds/illustrations.html` (archived mockup engine — do not port or iframe it).

**Gradient parity (Facts Orbit):** the illustration background “blob” uses the same radial multi-stop gradient as
`FactsOrbitSection`:
- anchor: `circle at 32% 28%`
- stops: `#F76B79` @ 0%, `#E30016` @ 42%, `#C40012` @ 72%, `#1B2441` @ 100%

| Piece | Path |
|---|---|
| Renderer | `src/components/Illustration/index.tsx` |
| Presets | `src/components/Illustration/presets.ts` |
| Motion | `src/components/Illustration/illustration.css` |
| Hero wiring | `MarketingHeroSection` (also `MediumHero`, thank-you page) |

### 12.1 When to use

Editors pick a **preset key** (`page/patient-welfare`, `dept/cardiology`, `svc/pharmacy`). The renderer merges defaults → preset → optional prop overrides. Do not invent a second illustration engine or drop raw SVG into heroes.

Hero media:

```json
"media": { "type": "illustration", "preset": "page/patient-welfare" }
```

```tsx
import { Illustration } from '@/components/Illustration'

<div className="mx-auto w-full max-w-[320px] aspect-square lg:max-h-[320px]">
  <Illustration preset="page/patient-welfare" tone="light" className="h-full w-full" />
</div>
```

That 320px square is the canonical hero size (see `/patient-welfare`).

### 12.2 Preset schema

Keys are `dept/{slug}`, `svc/{slug}`, or `page/{slug}`. Each preset:

```ts
{
  collection: 'departments' | 'services' | 'pages'
  slug: string
  title: string
  icon: string            // Phosphor name, kebab-case
  weight?: 'duotone'      // default duotone
  motif?: 'pulse' | 'ecg' | 'orbit' | 'breathe' | 'none'
  accent: string          // hex
  soft: string            // hex blob fill
  ink?: string            // hex, default #1B2441
  mainAnim?: string       // e.g. 'a-beat'
  satellites?: string[]   // max 4 Phosphor names
}
```

**Stack:** soft blob + dashed orbit → motif (pulse rings / ECG / breathe / orbit dots) → centre badge with Phosphor icon → satellite chips on connectors.

### 12.3 Renderer props

`Illustration` accepts a `preset` plus optional overrides: `icon`, `weight`, `accent`, `soft`, `ink`, `motif`, `mainAnim`, `satellites`, `orbit`, `connectors`, `confetti`, `animate`, `tone` (`light` | `dark`). Prefer presets over one-off overrides.

`animate={false}` (and `prefers-reduced-motion`) freeze motion. Catalog tiles on `/ds/illustrations` render static; live heroes animate.

### 12.4 Ground rules

- One component, one preset table — do not reintroduce the HTML mockup `scene` / `theme` / `emblem` config.
- Icons are Phosphor name strings. CMS stores the **preset key**, not SVG.
- Photography is preferred for home, marketing, and donate heroes when a photo exists (`COMPONENTS.md`). Illustration presets stay on patient-welfare / donate-type / thank-you heroes until those migrate.
- Do not render CMS / editorial notes on this catalog or on patient-facing pages.

---

## 13. Pre-merge checklist (new components)

- [ ] Tokens only — diff contains no `slate-|gray-|red-500|blue-500|rose-|teal-|amber-|green-|indigo-|#[0-9A-Fa-f]{3,6}|rgba(`.
- [ ] Headings are `h1`–`h6`, responsive pairs, correct leading (`110/120/150%`).
- [ ] Section shell exactly `container mx-auto px-6 lg:px-[30px] py-[30px] lg:py-[60px]`.
- [ ] Buttons/fields/cards/carousels from §5–§8 recipes or canonical classes (`.card`, `.chip`,
      `.kicker`, `.field-label-text`, `.sticky-bar`, `.ds3d-*`).
- [ ] Button/link copy is descriptive (§5.4) — no repeated “Learn more” / “View details”.
- [ ] Focus ring everywhere interactive: `focus-visible:ring-2 ring-primary-red/40 ring-offset-2`.
- [ ] Radius per §3.3; shadows only `shadow-e1/e2/e3`; z only `z-sticky/header/overlay/drawer/modal/max`.
- [ ] No arbitrary values where a token exists (text sizes, gaps, radii, leading).
- [ ] Images via `Media`/`getMediaUrl`, `rounded-xl`, aspect class.
- [ ] ds3d carousel slides use `href` when cards should navigate; drag does not trigger links.
- [ ] Payload registration done per AGENTS.md (config → collection → RenderBlocks →
      `pnpm generate:types` → test-blocks fixture) and visually checked at 375px + 1280px.

---

## 14. Legacy & Phase 2

Known drift in existing components (two headers, off-brand nav palette, `.custom-input`
bug, rich-text mobile sizes, `font-noraml` typos, ad-hoc buttons/cards/radii/shadows,
`top-[73px]` hardcodes, unused fonts…) is catalogued with severity + fix recipes in
`design-system-audit/06-UNIFIED-SPEC.md` (Part 2 register, Part 3 remediation). That
migration happens later — until then, **this document governs all new code**.
