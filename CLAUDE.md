# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

No test suite is configured in this project.

## Architecture

**Next.js 15 (App Router)** marketing website for "Réserve", a hotel marketing agency. TypeScript, Tailwind CSS v4, styled-components.

### Routing

- `src/app/layout.tsx` — root layout: fonts, CookieConsent (Klaro LGPD), `AutoTrack` analytics
- `src/app/public/` — all public-facing pages; wrapped by `src/app/public/layout.tsx` which adds `AuthProvider`, `StyledComponentsRegistry`, and `ToastContainer`
- `src/app/public/home/_components/` — section components for the homepage
- `src/app/api/contact/` — contact form handler (Resend email service)
- `src/app/api/meta-conversion/` — server-side Meta Conversion API proxy

### Dual styling systems

The project uses **both** Tailwind v4 and styled-components simultaneously:
- styled-components uses co-located `styles.ts` files next to each component and requires `StyledComponentsRegistry` (`src/app/registry.tsx`) for SSR
- `next.config.ts` has a webpack workaround that excludes `node_modules` from PostCSS to prevent conflicts between the two

### Analytics (`src/lib/analytics.ts`)

Unified helper that fans out events to GTM (`window.dataLayer`), Meta Pixel (`window.fbq`), and the Meta Conversion API (`/api/meta-conversion`). All tracking is gated on LGPD consent via the `klaro-consent` cookie. `AutoTrack` component handles automatic page view, scroll depth, time-on-page, and link click tracking.

GTM and Meta Pixel are currently commented out in root layout — uncomment them once env vars are configured.

### External services

- **Firebase** (`src/services/firebase.ts`) — Auth only
- **Resend** — transactional email for the contact form
- **Klaro** — LGPD cookie consent banner

### Environment variables

Copy `.env.example` to `.env.local`:
- `NEXT_PUBLIC_FIREBASE_*` — Firebase Auth
- `RESEND_KEY` — contact form email delivery
- `NEXT_PUBLIC_GTM_ID` — Google Tag Manager (optional)
- `NEXT_PUBLIC_META_PIXEL_ID` + `META_CONVERSION_API_TOKEN` — Meta tracking (optional)
