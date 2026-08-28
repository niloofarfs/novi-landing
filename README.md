# Novi — landing page

Single-page marketing site for Novi, an AI operations assistant for multi-site
restaurant groups. One route (`/`), statically rendered, one conversion action:
book a 15-minute call.

## Run

```bash
pnpm install
pnpm dev
```

Then open http://localhost:3000.

## Build

```bash
pnpm build
pnpm start
```

`next build` fully prerenders `/` — there is no server data and no API route.

> **Set `NEXT_PUBLIC_BOOKING_URL` before you build, not before you start.**
> `NEXT_PUBLIC_*` variables are inlined into the client bundle at build time.
> A build without it produces CTAs pointing at `#` (with a dev-only console
> warning), and setting the variable afterwards will not change them.

```bash
NEXT_PUBLIC_BOOKING_URL="https://cal.com/novi/15min" pnpm build
```

## Checks

```bash
pnpm check
```

Runs `tsc --noEmit` and `next lint`. (`next lint` is deprecated in Next 15 and
removed in 16; `pnpm lint:eslint` runs the ESLint CLI directly for when you
upgrade.)

## Deploy

Deliberately provider-agnostic — no deploy config is committed, because the
hosting target was not confirmed.

`pnpm build` + `pnpm start` runs anywhere that can run Node 20+. If you want a
pure static host (S3, Cloudflare Pages, nginx) instead, add `output: 'export'`
to `next.config.ts` and serve the generated `out/` directory. Nothing on the
page depends on a Node runtime.

## Where to change things

### Copy

**All of it is in [`src/content/site.ts`](src/content/site.ts).** Nothing
user-visible is hardcoded in a component, so rewriting the headline and the
problem copy after customer interviews is a one-file change.

That file also holds:

| Export | What it controls |
|---|---|
| `hero`, `costCalculator`, `howItWorks`, `trust`, `pilot`, `founders`, `faq`, `closingCta` | Section copy, in page order |
| `exchanges` | The five phone-demo exchanges. `dir` drives right-to-left per bubble; `source: null` renders the escalation chip instead of a document name |
| `sliders`, `sliderDefaults` | Calculator control ranges, steps and defaults |
| `REPLACEMENT_COST_LOW` / `_HIGH` | The $2,000–$5,000 replacement-cost band |
| `pilot.price` | The `$1,500 fixed` pilot price |

Answer text uses `\n` to separate lines within a bubble; each line renders on
its own row.

### Design tokens

[`src/app/globals.css`](src/app/globals.css) — the full palette, type stacks,
spacing and radii as CSS custom properties. Components consume tokens only and
never hardcode a hex value. Fonts are declared in
[`src/app/layout.tsx`](src/app/layout.tsx).

### Founder photos

Drop real images into `public/founders/` and point `founders.people[].photo` at
them in `site.ts`. The committed files are flat placeholder plates in the
design's portrait swatch. Keep the 108:130 aspect ratio so the cards do not
shift. See [`public/founders/README.md`](public/founders/README.md).

## Architecture

```
src/
  app/         layout (fonts, metadata, MUI cache), page, global tokens
  content/     site.ts — all copy and data, typed
  components/  one directory per section + shared primitives
  lib/         useInView, useCountUp, analytics, booking, reduced-motion
```

`page.tsx` is a server component. Client boundaries are only where behaviour
demands one: `PhoneDemo`, `CostCalculator`, `Faq`, `Reveal`, `BookButton`,
`ScrollDepth`. `Reveal` is a thin client wrapper that keeps each section's
content server-rendered.

### MUI scope

MUI is used for exactly two components, because they need real accessibility
behaviour:

- `Slider` — the three calculator controls (`CostCalculator`)
- `Accordion` — the FAQ (`Faq`)

Everything else is semantic HTML with CSS Modules. There is no full MUI theme:
[`MuiThemeProvider/muiTheme.ts`](src/components/MuiThemeProvider/muiTheme.ts)
maps only those two components to the design's tokens, and the provider is
mounted inside the two components rather than the app shell, so the MUI styles
engine stays out of the shell's client graph. The root layout's only MUI import
is `AppRouterCacheProvider`, which the App Router requires to avoid style
flicker.

To verify the boundary:

```bash
grep -rl "@mui" src/ --include=*.tsx --include=*.ts
```

Expected: `CostCalculator`, `Faq`, `MuiThemeProvider`, and `app/layout.tsx`.

### Motion

One `IntersectionObserver` per section via `useInView`
(`rootMargin: '0px 0px -15% 0px'`, fires once). Reveal is opacity plus a small
translate, staggered within a section by a `--reveal-delay` custom property.

`prefers-reduced-motion: reduce` disables all of it: sections render in their
final state, the hero exchange appears complete with no typing pass, and the
calculator shows its final figures immediately. Sections are server-rendered
in their final state and only "arm" the hidden start state after mount, so the
page is also correct with JavaScript disabled.

### Analytics

[`src/lib/analytics.ts`](src/lib/analytics.ts) is a synchronous,
failure-tolerant wrapper and a **complete no-op unless
`NEXT_PUBLIC_POSTHOG_KEY` is set**. It never blocks render and never throws.

Events: `cta_click` (`hero` | `pilot` | `closing`), `calculator_interact`
(first interaction, then debounced final values), `language_chip_click`,
`scroll_depth` (25/50/75/100, once each).

It does not bundle `posthog-js` — that would cost more than the page can
afford. Events go to `window.posthog.capture` when the snippet is present and
are otherwise buffered on `window.__noviAnalyticsQueue` for a late loader.
Add the PostHog snippet to `layout.tsx` when you are ready to collect.

## Measured state

Lighthouse mobile, production build, three runs (Chrome 151, default simulated
throttling):

| | Result | Target |
|---|---|---|
| Performance | **87–88** | ≥ 95 |
| Accessibility | **100** | 100 |
| Best practices | **100** | — |
| SEO | **100** | — |
| CLS | **0** | 0 |
| LCP | **3.0–3.1 s** | < 2 s |

Also verified: no layout shift when replaying the phone demo in any of the five
languages or when moving any slider; no horizontal scroll from 360px to 1920px;
a full keyboard path over all 19 interactive stops with a visible focus ring;
Arabic and Urdu rendering right-to-left with correct shaping while the
surrounding chrome stays LTR; zero console errors or failed requests; zero
runtime requests to Google Fonts.

**Performance and LCP do not meet the stated targets.** The gap is structural,
not a defect:

- ~133 KB of the critical path is typefaces the design specifies (Barlow
  Condensed 600/700, Noto Sans 400/700, IBM Plex Mono 400/600, Noto Sans
  Arabic 400). Weights are already trimmed to those actually used, and the
  Devanagari webfont was dropped — the only Devanagari on the page is the
  five-glyph Hindi chip label, and the Hindi exchange itself is romanised.
- ~102 KB of shared JS, most of it React plus the MUI styles engine that
  `Slider` and `Accordion` require.

Measured dead ends, so nobody repeats them: `experimental.inlineCss` moved the
cost into the critical HTML and scored ~2 points *worse*; `next/dynamic` on the
two MUI sections raised route JS without lowering first load; variable-font
versions of Noto Sans and Noto Sans Arabic grew the font payload from 133 KB to
248 KB. Next is not emitting `<link rel="preload">` for any font (its font
manifest is empty for the app route) — that is Next's own attribution
behaviour, and removing `optimizePackageImports` or applying `font.className`
directly does not change it.

The remaining levers all cost something the brief protects: dropping a weight
(~15–30 KB each) changes the type, and dropping MUI changes the stack. Decide
which, if either, is worth trading before pushing further.
