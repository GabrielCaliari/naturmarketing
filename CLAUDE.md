# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

No test suite is configured. **`npm run build` is the gate** — it type-checks and prerenders all 41 routes.

## Architecture

**Next.js 15 (App Router)** marketing website for "Réserve", a hotel marketing agency. TypeScript, Tailwind CSS v4. Styling is Tailwind utility classes and inline `style` objects side by side — both are the convention here; don't normalize one into the other.

### Routing

- `src/app/layout.tsx` — root layout: fonts (Rubik + self-hosted PP Hatton), `LocaleProvider`, `LeadModalProvider`, `CookieConsent`, `AutoTrack`, `DeferredAnalytics`
- `src/app/(public)/` — all public pages (route group; the parentheses are part of the path). Its `layout.tsx` is a passthrough — providers live in the root layout so they also wrap `/`
- `src/app/(public)/home/_components/` — section components for the homepage
- `src/app/api/meta-conversion/` — server-side Meta Conversion API proxy (the only API route)

### Performance constraints

The site is under active LCP / Total Blocking Time optimization. Two rules that keep getting re-broken:

- Below-the-fold homepage sections are loaded with `dynamic()` in `home/page.tsx` to keep them out of the initial chunk. Adding a section with a static import silently regresses TBT.
- The `en-US` translation dictionary (~16 KB) is loaded on demand in `LocaleContext.tsx`, only when a visitor switches to English. Don't turn it back into a static import.
- Never fetch media before user interaction (see the video player in `Depoimentos`).

### Lead capture

Every sales CTA goes through `DiagnosticoCTA`, which opens the 3-step `LeadForm` modal. Never replace one with a direct WhatsApp link. The modal (and framer-motion with it) is loaded on first interaction via `LeadModal/Mount.tsx`.

### Testimonials (`src/data/depoimentos.ts`)

`DEPOIMENTOS` feeds both the homepage `Depoimentos` section and the `ReviewsJsonLd` structured data. The list is intentionally empty until real testimonials exist — both consumers render nothing when it is. **Never add fictitious testimonials**: fabricated ratings in Review schema violate Google's guidelines and risk a manual penalty. The file's header comment documents how to add text and video entries.

### Analytics (`src/lib/analytics.ts`)

Unified helper that fans out events to GTM (`window.dataLayer`), Meta Pixel (`window.fbq`), and the Meta Conversion API (`/api/meta-conversion`). All tracking is gated on consent stored in `localStorage` under `reserve-cookie-consent` by the custom `CookieConsent` banner. `AutoTrack` handles page view, scroll depth, time-on-page, and link click tracking. GTM and Microsoft Clarity load off the critical path via `DeferredAnalytics`.

### SEO

- Structured data lives in `src/components/SEO/JsonLd.tsx`. Entities are linked by `@id` — don't redeclare an existing `@id` in a second `<script>` block.
- Never set `alternates.canonical` in the root layout: App Router shallow-merges layout metadata into every child page that lacks its own `alternates`, which would emit the homepage canonical on every route. Canonicals are per-page.
- The root layout deliberately has no title `template` — each page writes its full title so the SERP text isn't pushed past Google's truncation.

### Environment variables

Copy `.env.example` to `.env.local`. Currently consumed by the code:
- `NEXT_PUBLIC_SITE_URL` — canonical origin used by structured data
- `NEXT_PUBLIC_META_PIXEL_ID` + `META_CONVERSION_API_TOKEN` — Meta tracking (optional)
- `NEXT_PUBLIC_GTM_ID` — Google Tag Manager (optional)
- `NEXT_PUBLIC_CLARITY_ID` — Microsoft Clarity (optional)

`.env.example` still lists `NEXT_PUBLIC_FIREBASE_*` and `RESEND_KEY` from removed integrations — no code reads them.
