# Core Web Vitals Optimization Guide — Forked Template

## Objective

This guide provides a comprehensive set of strategies, techniques, and best practices to achieve a perfect **100/100/100/100** score on Google Lighthouse audits (Performance, Accessibility, Best Practices, and SEO), and to optimize Core Web Vitals (LCP, CLS, INP) across all forks of this project.

---

## Core Web Vitals Overview

To maintain the "Good" (Green) badge in Google's organic metrics, focus on three pillars of perceived user performance:

1. **LCP (Largest Contentful Paint):** Measures the loading time of the largest visible element on the initial screen (usually a Hero image or H1 text block).
2. **CLS (Cumulative Layout Shift):** Measures visual stability. Ensures nothing "jumps" or shifts position while asynchronous assets are loading.
3. **INP (Interaction to Next Paint) / FID (First Input Delay):** Measures responsiveness. Verifies how quickly the page reacts to user interactions (clicks, scrolls) without freezing the main thread.

---

## Applied Strategies and Techniques

### 1. LCP — Largest Contentful Paint

LCP is typically the bottleneck for large homepages. Apply the following:

- **Preload the Hero Image (Above the Fold):**
  - Ensure the main above-the-fold image loads with high priority.
  - Next.js: Use `priority={true}` and `fetchPriority="high"` on the `next/image` component.
- **Use Modern Image Formats (WebP / AVIF):**
  - Serve all user-facing images in next-generation formats with high compression and no perceptible quality loss.
- **TTFB Optimization via SSR + Edge CDN:**
  - Render the initial HTML via SSR (Server-Side Rendering) or SSG (Static Site Generation).
  - Distribute via a CDN to serve files from the closest physical network location to the user.
- **Self-Hosted Optimized Fonts:**
  - Use font optimization modules (e.g., `next/font` in Next.js) to eliminate render-blocking caused by external font API requests. Fonts should be bundled with the main page request.

### 2. CLS — Cumulative Layout Shift

Any layout tremor results in a poor CLS score. Enforce these rules:

- **Explicit Space Reservation (Aspect Ratios):**
  - All media (images, videos, iframes) must have `width` and `height` attributes defined, or use CSS `aspect-ratio` / `object-fit`.
  - This forces the browser to reserve the correct space before the asset finishes downloading.
- **Skeleton Screens (Loaders):**
  - UI sections that rely on client-side data fetching must use skeletons (animated placeholder blocks) that reserve the expected height so the layout does not shift when content arrives.
- **Font Display Strategy (`font-display: swap`):**
  - Configure imported fonts with `font-display: swap`. The user sees a system font immediately, which is smoothly replaced by the brand font without pushing content down.

### 3. INP / TBT — Main Thread

To achieve maximum Lighthouse scores and keep the page responsive during clicks and scrolls, even on low-end devices:

- **Code Splitting:**
  - Use dynamic imports or `Suspense` to defer heavy components or modals that are below the fold. Their JavaScript should only execute after critical above-the-fold content is processed.
- **Lazy-Load Third-Party Scripts:**
  - Heavy analytics and marketing scripts (Meta Pixel, Google Tag Manager, YouTube embeds, live chats) must be lazy-loaded.
  - Next.js: Use `<Script strategy="lazyOnload" />` or `afterInteractive` to prevent non-essential trackers from competing at page load.
- **Debounce and Throttle UX Interactions:**
  - Prevent scroll/resize listeners from blocking the main thread. Eliminate unnecessary re-renders at the top of the component tree.

### 4. SEO and Accessibility — Final Push to 100

- **Strict Heading Hierarchy:**
  - Each page must have exactly one `<h1>`. Subsequent headings follow a logical semantic hierarchy (`<h2>`, `<h3>`, etc.).
- **Color Contrast (WCAG AA):**
  - Colors for buttons, text, and backgrounds must meet WCAG AA rules — a contrast ratio greater than `4.5:1` for body text.
- **ARIA Labels and Metadata:**
  - Purely visual elements, icon-only buttons, and forms require descriptive `aria-label` attributes.
  - Meta titles and descriptions must be optimized for all indexable pages.

---

## How to Audit Correctly

Never run Lighthouse against the local development server (`pnpm dev`), as it contains unminified code and extra framework overhead that skews scores.

To measure the production score accurately:

1. **Generate the production build:**
   ```bash
   pnpm run build
   ```
2. **Start the production server:**
   ```bash
   pnpm run start
   ```
3. **Open the local port** (e.g., `http://localhost:3000`) in an **Incognito / Private tab** to avoid interference from browser extensions.
4. Press `F12` → open the **Lighthouse** tab.
5. **Set the device to Mobile (Moto G4)** — this is the mobile-first benchmark used by Google's official crawler. Click "Analyze page load".
6. Review the results against the 100/100/100/100 target.

---

## Checklist per Fork

- [ ] Hero image uses `priority={true}` and `fetchPriority="high"`
- [ ] All images use WebP or AVIF format
- [ ] All `<img>` / `<Image>` elements have explicit `width` and `height` (or `aspect-ratio` in CSS)
- [ ] Client-fetched sections use skeleton loaders
- [ ] Fonts are self-hosted via `next/font` (no external Google Fonts runtime request)
- [ ] Third-party scripts use `strategy="lazyOnload"` or `afterInteractive`
- [ ] Each page has exactly one `<h1>`
- [ ] Text contrast meets WCAG AA (`4.5:1` minimum)
- [ ] All interactive elements without visible text have `aria-label`
- [ ] Lighthouse audit run on production build (not dev server), Mobile preset
