# Change summary — 11 August 2026

Leadership, Our Impact, doctor profiles, and in-page hash scrolling.

`.mjs` scripts were **not** included in the commit.

## Leadership

- Replaced the `/leadership` hero with `archive/leadership-pictures/leadership-top-image.jpeg` (saved as `public/media/founders-hero-banner.webp`) and added the design-system hairline stroke on marketing hero images.
- Founders now show lifespan years: **Inam Ellahi Asar (1927–2016)** and **Mian Abdul Waheed (1931–2010)**.
- Each founder has their own biography page:
  - `/leadership/inam-elahi-asar`
  - `/leadership/mian-abdul-waheed` (new)
- Senior management portraits added for all listed office-bearers.
- Core committees now include convener, co-convener, and members, opened in a drawer.
- Chairman / President / leadership-messages hero copy no longer uses “presented in full, exactly as written.”

## Our Impact — health partners

Partner cards use a shared logo box and a **Website** link (opens in a new tab):

| Partner | Site |
|---|---|
| Fatima Memorial Hospital | https://www.fatimamemorial.org.pk/ |
| Qarshi University | https://qu.edu.pk/ |
| Hajvery University | https://hup.edu.pk/ |
| Chughtai Healthcare | https://chughtailab.com/ |
| Al-Noor Diagnostic Centre | https://alnoordiagnostic.com/ |
| Harmone Laboratory | https://hormonelab.com.pk/ |

Logos live in `public/media/partners/`. Hajvery wordmark was converted from white to black so it reads on the white card. Al-Noor logo colours were inverted.

## Our Impact — other

- Highlights now link to the matching news articles. Card images are **hidden** until real photos are provided.
- Tamgha-e-Imtiaz photo cropped 1:1 from the bottom.
- Visitors photo (`news-visitors.webp`) rotated 90° anticlockwise.

## Doctor profile

- Card title: **Qualifications and Specialty**.
- Specialty is a labeled field (not mixed into the degree list).
- If no degrees are stored, **MBBS** is still shown.

## Hash links (`/our-purpose#our-compliance`, etc.)

- Pages now scroll to the hash target instead of staying on the hero.
- Compact header no longer shrinks page padding (that was causing the header on/off loop).
- Scroll offset uses the compact header height so the section sits under the bar, not with a full-header gap.

**Note:** Lenis smooth-scroll is currently **disabled** in `content/site-settings.json` (`lenis.enabled: false`). It was turned off to test the header jitter and can be turned back on — it was not the cause.

## Other

- Illustration orbit coordinates are rounded to avoid SSR/client hydration mismatches.
- Illustration CSS extracted; various hub/section `scroll-mt` values now follow `--header-h`.
