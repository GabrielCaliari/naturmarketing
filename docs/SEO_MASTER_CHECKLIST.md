# SEO Master Checklist, Next.js Forked Template

Complete SEO reference for all forks of the template project. Covers initial setup, per-file configuration, content audit, canonical remediation, and pre-launch verification.
Replace all `[placeholder]` values with the fork's real data before starting.

> **Template company used for reference:** Acme Corp, fictional, for illustration only.

---

## Agent Instructions, Independent SEO Audit Mindset

> **This section is a direct instruction to the AI agent executing this checklist.**

This checklist is a **floor, not a ceiling.** Completing every item here does not guarantee the project is free of SEO bugs. Silent SEO issues are the most dangerous kind, they produce no build errors, no console warnings, no broken UI, and no obvious symptoms. They only show up as lost rankings, manual actions from Google, or failed Rich Results tests.

**Before starting any section, assume bugs may still exist that this checklist has never seen.** Approach the project with the mindset of an independent senior SEO engineer reviewing someone else's code for the first time, not as someone checking items off a list.

### What to do

- **Read every schema block in full**, do not assume a component is correct because it compiles. Look at the actual field values: Are they real? Do the URLs resolve? Does the `@type` match the page type?
- **Follow every import chain**, when a component uses a constant, verify the constant is actually from the SSOT (`business-info.ts` or equivalent) and not a local copy with stale data.
- **Search independently**, run your own grep queries beyond §17 and §18.10. Search for patterns the checklist doesn't know to ask about: old company names, old domain strings, base-project service names, placeholder text, or legacy schema structures from a previous project.
- **Check what is actually rendered**, a component being defined does not mean it is mounted. A schema being imported does not mean it fires. Verify the actual component tree to confirm what runs on each page.
- **Audit the sitemap against the router**, every URL in the sitemap must correspond to a real, indexable page. Dead entries mislead Googlebot and waste crawl budget.
- **Do not trust comments**, a `// TODO` or `// FIXME` in schema files is an active bug signal, not future work. Treat it as a current defect.

### High-probability silent bug locations

These areas are statistically most likely to contain hidden SEO issues in any fork of this template:

| Area | Risk |
|------|------|
| `article-json-ld.tsx` | Wrong `@type`, hardcoded dates, fake `wordCount`, orphaned `SearchAction` |
| `json-ld.tsx` | Fabricated `aggregateRating`, placeholder reviewers, duplicate `LocalBusiness` schemas |
| `default-seo.tsx` / fallback configs | `alternates.canonical` set globally, overrides every page's canonical |
| Layout `metadata` objects | OG title/description not matching `title.default`; OG `images[].alt` missing or generic |
| `generateMetadata` on dynamic routes | Missing `openGraph.*` and `twitter.*`, social shares show wrong title |
| `sitemap.ts` inline arrays | Location types or page dates hardcoded instead of derived from SSOT constants |
| Legal pages | Hardcoded phone, address, email, hours that should come from SSOT |
| Images adjacent to visible text labels | `alt` repeating the label instead of `alt="" aria-hidden="true"` |
| Schema `sameAs` arrays | Social URLs pointing to inactive or wrong profiles |
| `areaServed` in schema | Hardcoded city list that diverges from the `AREAS_SERVED` SSOT constant |

### Questions to ask while reviewing

1. If I change the phone number in `business-info.ts`, does it update everywhere, including legal pages, schema, and the footer?
2. What schemas are actually rendered on the homepage right now? (Count the `application/ld+json` script tags in View Source.)
3. Does every `generateMetadata` function on a dynamic route set `openGraph.title`? Or does it inherit the layout's generic homepage title?
4. Is there any `alternates.canonical` set anywhere other than a leaf `page.tsx`?
5. Is every URL listed in `sitemap.ts` a real, working route, or are some 404s?
6. Does any schema reference a route (e.g. `/search`, `/gallery`) that doesn't exist in the App Router?
7. Are there any `TODO` or placeholder strings still present in schema fields, meta descriptions, or alt text?

---


## 1. COMPANY_NAP, Single Source of Truth

**File:** `src/constants/company.ts`

All company information (name, phone, address, email, social, hours) lives in a single `COMPANY_NAP` object. No component should have this data hardcoded anywhere else.

**SSOT bootstrap:**

- [ ] Created `src/constants/company.ts` with all NAP, URL, social, geo, and schema constants
- [ ] Added GITKEEP header comment prohibiting duplication of business data elsewhere
- [ ] `src/constants/index.ts` re-exports from `company.ts`
- [ ] `src/constants/footer.ts` (if exists) derives all values from `company.ts`

**Fields to update:**

- [ ] `name` and `legalName` (e.g. `Acme Corp` / `Acme Corporation LLC`)
- [ ] `email` (e.g. `info@acmecorp.com`)
- [ ] `phone`, all 4 formats:
  - `display`: `(555) 123-4567`
  - `href`: `tel:+15551234567`
  - `raw`: `5551234567`
  - `schema`: `+1-555-123-4567`
- [ ] `address` (street, city, state, zip, country, full)
- [ ] `geo` (latitude and longitude of the business address)
- [ ] `hours` (display, displayUpper, schema formats)
- [ ] `foundingYear`
- [ ] `social.instagram` and `social.facebook`
- [ ] `social.googleMaps` (full Google Maps place URL)
- [ ] `social.googleMapsEmbed` (embed src from Google Maps → Share → Embed a map)
- [ ] `areasServed` (list of cities/regions served)
- [ ] `url` (fork domain, also set in `.env` as `NEXT_PUBLIC_SITE_URL`)
- [ ] `tagline`

**Verification:** Grep for hardcoded phone, email, and company name outside `company.ts`. There should be zero relevant results.

---

## 2. Environment Variables

**File:** `.env` (not versioned) and deploy panel

| Variable | Usage | Required |
|----------|-------|----------|
| `NEXT_PUBLIC_SITE_URL` | Base URL for sitemap, canonical, JSON-LD | Yes |
| `BLOG_API_BASE_URL` | Blog article API URL | If blog is enabled |
| `BLOG_SECRET` | Blog API access key | If the API is protected |

- [ ] `NEXT_PUBLIC_SITE_URL` is set in `.env` and in the deploy panel (Vercel, etc.)
- [ ] All `process.env.NEXT_PUBLIC_SITE_URL || "https://fallback.com"` fallbacks replaced with SSOT import from `company.ts`

---

## 3. Canonical URL Setup

**Root cause to avoid:** If `layout.tsx` defines `alternates: { canonical: '/' }`, the Next.js App Router shallow-merges it into all child pages that don't define their own `alternates`. Every route then emits `<link rel="canonical" href="/" />`, signaling to Google that they are all duplicates of the homepage.

**Golden rule:** `layout.tsx` sets `metadataBase` but **never** `alternates.canonical`. Canonicals are always page-specific.

**Files that must reference the canonical URL from SSOT:**

- [ ] Set canonical URL in `company.ts` (e.g. `https://www.acmecorp.com`)
- [ ] `src/app/(public)/layout.tsx`, `metadataBase`, `openGraph.url`, `siteName`, `alt`, **no** `alternates.canonical`
- [ ] `src/server/config/default-seo.tsx`, `url`, `siteName`, `canonical`, `images`, `alt`
- [ ] `src/server/config/legal-pages.ts`, `BASE_URL` aligned to `COMPANY_NAP.url`, `COMMON_KEYWORDS`
- [ ] `src/app/robots.ts`, sitemap URL
- [ ] `src/app/sitemap.ts`, `siteBase`
- [ ] `src/hooks/use-legal-metadata.ts`, `siteName`

**Per-page canonical items:**

- [ ] Root layout (`layout.tsx`): does **NOT** contain `alternates.canonical`, only `metadataBase`
- [ ] Homepage (`src/app/(public)/page.tsx`): `alternates: { canonical: '/' }`
- [ ] Blog index (`src/app/(public)/blog/page.tsx`): `alternates: { canonical: '/blog' }`
- [ ] Gallery (`src/app/(public)/gallery/page.tsx`): `alternates: { canonical: '/gallery' }`
- [ ] Products index (`src/app/(public)/products/page.tsx`): `alternates: { canonical: '/products' }`
- [ ] Service pages (`/services/[slug]`): canonical via `generateMetadata` with dynamic slug
- [ ] Location pages (`/locations/[slug]`): canonical via `generateMetadata` with dynamic slug
- [ ] Product pages (`/products/[category]/[slug]`): canonical via `generateMetadata` with dynamic slug
- [ ] Blog posts (`/blog/[slug]`): canonical via `generateMetadata` with dynamic slug
- [ ] Legal pages (terms, privacy): canonical via `useLegalMetadata`, domain aligned with `COMPANY_NAP.url`
- [ ] Client components (`"use client"`) without metadata: acceptable, Google auto-canonicalizes by URL

---

## 4. Root Layout Metadata

**File:** `src/app/(public)/layout.tsx`

- [ ] `metadataBase` uses `COMPANY_NAP.url`, confirm the URL is correct
- [ ] Homepage `title` reflects the fork's brand name and value proposition
- [ ] Homepage `description`: 120–160 characters, contains city + primary service/product
- [ ] `lang="en"` matches the fork's language (change to `lang="es"` etc. if needed)

---

## 5. Dynamic Sitemap

**File:** `src/app/sitemap.ts`

Sitemap auto-generated from data in `constants/`. Includes: static pages, services, locations, products, and blog (via API).

- [ ] Confirm `NEXT_PUBLIC_SITE_URL` is set to the correct domain in `.env` and deploy panel
- [ ] Confirm all relevant static routes for this fork are listed
- [ ] Confirm `priority` values match the fork's page hierarchy:
  - Homepage: `1.0`
  - Services and locations: `0.9`
  - Products: `0.8`
  - Blog: `0.7`
  - Gallery, tools: `0.6`
  - Legal pages: `0.3`
- [ ] If the fork has no blog, remove the blog API call
- [ ] Confirm `revalidate` (default: `86400` = 1 day) is appropriate for this fork

---

## 6. robots.txt

**File:** `src/app/robots.ts`

Configured via Next.js `MetadataRoute.Robots`.

- [ ] Confirm `NEXT_PUBLIC_SITE_URL` points to the correct domain (used in sitemap URL)
- [ ] Confirm blocked routes: `/maintenance`, `/api/`, `/_next/`
- [ ] Add any fork-specific private routes to `disallow` if needed
- [ ] Do not block AI crawlers (GPTBot, ClaudeBot, etc.), they generate referral traffic

---

## 7. NAP Consistency Audit

Verify consistency of Name, Address, and Phone across the entire codebase.

- [ ] Correct phone number across all files (search for any old/placeholder phone numbers)
- [ ] Correct address across all files (search for placeholder addresses)
- [ ] Correct email across all files (search for old email domain)
- [ ] Terms of Use page contact section uses SSOT (phone, address, email, domain)
- [ ] Privacy Policy page contact section uses SSOT (phone, address, email, domain)
- [ ] ContactModal phone number and hours display uses SSOT

**Legal pages files:**
- `src/app/(public)/(legal)/terms-of-use/page.tsx`
- `src/app/(public)/(legal)/privacy-policy/page.tsx`

- [ ] Phone uses `COMPANY_NAP.phone.href` and `COMPANY_NAP.phone.display`
- [ ] Email uses `COMPANY_NAP.email`
- [ ] Address uses `COMPANY_NAP.address.full`
- [ ] Hours uses `COMPANY_NAP.hours.display`
- [ ] Company name uses `COMPANY_NAP.name`

---

## 8. Structured Data (JSON-LD)

**Files:**
- `src/presentation/components/templates/seo/article-json-ld.tsx`, LocalBusiness, WebSite, Article
- `src/presentation/components/templates/seo/json-ld.tsx`, Organization, Service, FAQ, Breadcrumb, Review

All schemas read from `COMPANY_NAP`. Updating `COMPANY_NAP` propagates to all schemas automatically.

**Implemented schemas:**

| Schema | Where injected | Purpose |
|--------|----------------|---------|
| `LocalBusiness` | Root layout (global) | Core local SEO, address, phone, hours, services |
| `Organization` | Root layout (global) | Company identity, social profiles |
| `WebSite` | Root layout (global) | Site metadata |
| `FAQPage` | Service and location pages | FAQ rich results |
| `BreadcrumbList` | All internal pages | Breadcrumb in search results |
| `Service` | Homepage | Service catalog |
| `Review` / `AggregateRating` | Homepage | Star ratings in search results |
| `Article` | Homepage | Editorial authority |

**Checklist per fork:**

- [ ] Homepage `localBusinessSchema` in `page.tsx`: uses SSOT constants, correct `@type` (e.g. `ProfessionalService`, `LocalBusiness`)
- [ ] `@type` in `LocalBusiness` matches the fork's actual business category, not the base project's
- [ ] `json-ld.tsx` Organization schema: correct NAP from SSOT
- [ ] `json-ld.tsx` Product/Service schema: correct name, description, URL from SSOT
- [ ] `json-ld.tsx` Review schema: correct business name from SSOT
- [ ] `article-json-ld.tsx` Article schema: no stale/legacy content from base project, correct keywords/description
- [ ] `article-json-ld.tsx` LocalBusiness schema: correct `@type`, NAP, services, areas served
- [ ] `article-json-ld.tsx` WebSite schema: correct name, URL, description from SSOT
- [ ] Blog `[slug]/page.tsx` BlogPosting publisher: uses `COMPANY_NAME` from SSOT
- [ ] `aggregateRating.ratingValue` and `ratingCount` reflect real or estimated ratings for the fork
- [ ] Reviews in `ReviewJsonLd` are replaced with real reviews for the fork
- [ ] `Article.datePublished` and `Article.dateModified` are current
- [ ] FAQs on service and location pages are specific to the fork's business and target cities

---

## 9. metaTitle and metaDescription, Length Limits

Required limits to prevent truncation in search results:

| Field | Limit |
|-------|-------|
| `metaTitle` | ≤ 70 characters |
| `metaDescription` | 120–160 characters |

**Constant files to audit:**
- `src/constants/locations.ts`
- `src/constants/services.ts`
- `src/constants/products.ts`

**Length checklist:**

- [ ] All location `metaTitle` values ≤ 70 chars
- [ ] All service `metaTitle` values ≤ 70 chars
- [ ] All product `metaTitle` values ≤ 70 chars
- [ ] All location `metaDescription` values ≤ 160 chars
- [ ] All service `metaDescription` values ≤ 160 chars
- [ ] All product `metaDescription` values ≤ 160 chars
- [ ] Also check hardcoded titles in `page.tsx` files

**Recommended title pattern:** `[Service/Product] in [City] | [Company Name]`

**Keyword quality checklist:**

- [ ] Location page H3 subsection titles use long-tail keywords (not generic labels like "Our Services")
- [ ] Meta descriptions are 120–155 characters, unique per page, include a CTA
- [ ] Meta titles include primary keyword + location

---

## 10. Semantic HTML

- [ ] Service detail pages wrapped in `<article>` tags
- [ ] Location detail pages wrapped in `<article>` tags
- [ ] Blog index page has a proper H2 heading for hierarchy (H1 → H2)
- [ ] Each page has exactly one `<h1>`

---

## 11. Image Alt Text

**Core principle:** Alt text exists for **accessibility and semantic clarity**, not keyword insertion.

> Write alt text as if describing the image to someone who cannot see it.

### When to use descriptive alt text

Use meaningful alt when the image **conveys information not already present in surrounding text**.

Applies to: service images, product screenshots, team/location photos, trust badges, benefit illustrations.

- [ ] Hero images: describe the visible scene (e.g. `alt="Technician performing live scan fingerprinting in an Orlando office"`)
- [ ] Service/product images: describe the action or subject in context
- [ ] Trust badges / certifications: describe the badge (e.g. `alt="SAMHSA-approved laboratory certification badge"`)

### When to use empty alt (`alt=""`)

Use empty alt when the image **duplicates nearby visible text or is purely decorative**.

Applies to: background textures, decorative shapes/gradients, spacers, **icons that sit next to a visible label**.

- [ ] Icons adjacent to a visible text label: `alt="" aria-hidden="true"`, do not repeat the label
- [ ] Icons **with no nearby text**: descriptive alt of the meaning (e.g. `alt="Fast turnaround"`, never `alt="checkmark icon"`)
- [ ] No `alt=""` on images that carry meaning absent from surrounding text

### Keyword usage rule

Include keywords **only if they naturally fit the visible content of the image.**

- [ ] No keyword stuffing (e.g. `alt="Live scan fingerprinting Orlando fast service cheap FBI"` is wrong)
- [ ] No generic labels (`alt="icon"`, `alt="checkmark icon"`, `alt="image"`)
- [ ] No identical alt text repeated across multiple images on the same page
- [ ] Filenames are descriptive (`live-scan-fingerprinting-orlando.jpg`, not `IMG_3921.jpg`)

### Context > alt text (real ranking factor)

- [ ] Images are near relevant H2/H3 headings
- [ ] Surrounding text reinforces the topic of the image

### React / Next.js patterns

```tsx
// Descriptive, image conveys meaning not in nearby text
<Image src={service.image} alt="Technician performing live scan fingerprinting in Orlando" width={800} height={600} />

// Decorative, icon next to visible "Fast turnaround" label
<Image src="/icons/check.svg" alt="" aria-hidden="true" width={20} height={20} />

// Standalone icon, no visible label nearby, describe the meaning not the shape
<Image src="/icons/check.svg" alt="Fast turnaround" width={20} height={20} />
```

### Final heuristic (use in code reviews)

> "If this image failed to load, would this alt text help the user understand the content?"
> - **Yes** → keep it. **No** → simplify or remove (`alt="" aria-hidden="true"`).

---

## 12. Google Maps Embed

**File:** `src/presentation/components/molecules/common/GoogleMap.tsx`

The component uses `COMPANY_NAP.social.googleMapsEmbed` as the iframe `src`.

- [ ] Get the correct embed code: Google Maps → business location → Share → Embed a map → copy only the `src` attribute from the iframe
- [ ] Update `COMPANY_NAP.social.googleMapsEmbed` with that src
- [ ] Update `COMPANY_NAP.social.googleMaps` with the place share link
- [ ] The embed must show the fork's address, not the base project's address

---

## 13. Stale Content Purge

Catch any content inherited from the base project that should not appear in the fork.

- [ ] No references to the base project's business type remain in schema markup
- [ ] No placeholder phone numbers (e.g. `+1-555-000-0000`)
- [ ] No placeholder addresses (e.g. `123 Main St`)
- [ ] No old domain references from the base project (unless an intentional redirect)
- [ ] No base project keywords or industry terms in schema markup
- [ ] `article-json-ld.tsx`, no stale base-project content in Article schema keywords/description

---

## 14. Sitemap Migration, WordPress Pattern to Next.js SSOT Pattern

**File:** `src/app/sitemap.ts`

Forks originated from earlier templates may still contain the **WordPress XML-proxy pattern**: the sitemap fetches a remote `POST_SITEMAP_DOMAIN` endpoint, parses its XML with `xml2js`, remaps the URLs, and merges them as `wpEntries`. This pattern must be removed and replaced with the clean, SSOT-driven Next.js approach used in `frontend_pages_allbrickpavers`.

### Why migrate

| WordPress pattern | Next.js SSOT pattern |
|---|---|
| Fetches external XML at build/revalidate time, brittle | All URLs derived from local constants, zero runtime dependency |
| `xml2js` dependency, Node-only, adds build surface | No extra dependencies beyond Next.js builtins |
| `wpEntries` URLs can diverge from actual App Router routes | Every URL maps 1:1 to a real route in `src/app/` |
| `POST_SITEMAP_DOMAIN` env var required in deploy panel | No extra env vars needed |
| Blog entries are absent unless the WP API is reachable | Blog entries are fetched from the CMS API separately |

### Code diff, before / after

**Before (WordPress pattern):**

```ts
// sitemap.ts, BEFORE (remove this entire block)
import { parseStringPromise } from 'xml2js'

type WpImage = { 'image:loc': string[] }
type WpUrlEntry = { loc: string[]; lastmod: string[]; 'image:image'?: WpImage[] }

// ... fetch wpSitemapUrl, parse XML, build wpUrls[] ...

const wpEntries: MetadataRoute.Sitemap[number][] = wpUrls.map(item => {
  const regex = new RegExp(`^https?:\\/\\/(www\\.)?${process.env.POST_SITEMAP_DOMAIN || ''}\\/`)
  let url = item.url.replace(regex, `${siteBase}/`)
  // ...
  return { url, lastModified: item.lastModified, changeFrequency: 'weekly', priority: 0.5 }
})
```

**After (SSOT pattern, match `frontend_pages_allbrickpavers/src/app/sitemap.ts`):**

```ts
// sitemap.ts, AFTER
import type { MetadataRoute } from 'next'
import { SERVICES_DATA } from '@/constants/services'
import { LOCATIONS_DATA } from '@/constants/locations'
import { COMPANY_NAP } from '@/constants/company'

export const runtime = 'nodejs'
export const revalidate = 86400

const SITE_BASE = (process.env.NEXT_PUBLIC_SITE_URL || COMPANY_NAP.url).replace(/\/$/, '')

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_BASE}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    // ... other static pages
  ]

  const servicePages: MetadataRoute.Sitemap = SERVICES_DATA.map(service => ({
    url: `${SITE_BASE}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.9,
  }))

  const locationPages: MetadataRoute.Sitemap = LOCATIONS_DATA.map(location => ({
    url: `${SITE_BASE}/locations/${location.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.9,
  }))

  return [...staticPages, ...servicePages, ...locationPages]
}
```

> If the fork has a two-level location hierarchy (county → city), map both levels separately, as in the coastalroofing pattern using `getAllCountySlugs()` and `getAllCitySlugs()`.

### Checklist

- [ ] Remove `import { parseStringPromise } from 'xml2js'` and the `xml2js` dependency from `package.json`
- [ ] Remove `WpImage`, `WpUrlEntry` type declarations
- [ ] Remove the `wpSitemapUrl` fetch block and all `wpUrls` / `wpEntries` logic
- [ ] Replace `siteBase` resolver with `COMPANY_NAP.url` fallback (remove `VERCEL_URL` guessing)
- [ ] Add `import { COMPANY_NAP } from '@/constants/company'`
- [ ] Add `import { SERVICES_DATA } from '@/constants/services'` and equivalent for locations/products
- [ ] Derive all URLs from SSOT constants, no inline hardcoded slugs
- [ ] Confirm every URL in the final sitemap maps to a real App Router route
- [ ] Remove `POST_SITEMAP_DOMAIN` from the deploy panel env vars (no longer used)
- [ ] Remove `NEXT_PUBLIC_API_URL` from sitemap if it was only used for the WP XML endpoint
- [ ] Run `/sitemap.xml` in the browser after deploy, confirm all expected URLs appear with no 404s

---

## 15. 301 Redirects (Legacy Migration)

**Files:** `redirects.config.ts`, `next.config.ts`

Permanent redirects from old URLs (WordPress, Wix, etc.) to new Next.js routes. The redirect configuration lives in a dedicated file (`redirects.config.ts`) and is imported by `next.config.ts`.

### Architecture pattern

Redirects are organized by category to keep the file scannable and avoid duplicates:

```ts
// redirects.config.ts
import type { Redirect } from "next/dist/lib/load-custom-routes";

const blogRedirects: Redirect[] = [
  { source: "/post/:slug*", destination: "/blog/:slug*", permanent: true },
  { source: "/old-blog-path", destination: "/blog", permanent: true },
];

const serviceRedirects: Redirect[] = [
  { source: "/old-service-slug", destination: "/services/new-slug", permanent: true },
];

const locationRedirects: Redirect[] = [
  { source: "/service-areas", destination: "/locations/main-city", permanent: true },
];

const galleryRedirects: Redirect[] = [
  { source: "/old-gallery", destination: "/gallery", permanent: true },
];

const miscRedirects: Redirect[] = [
  { source: "/about-us", destination: "/", permanent: true },
  { source: "/contact-us", destination: "/", permanent: true },
  { source: "/contact", destination: "/", permanent: true },
  { source: "/faq", destination: "/", permanent: true },
];

export const allRedirects: Redirect[] = [
  ...blogRedirects,
  ...serviceRedirects,
  ...locationRedirects,
  ...galleryRedirects,
  ...miscRedirects,
];
```

```ts
// next.config.ts
import { allRedirects } from "./redirects.config";

const nextConfig: NextConfig = {
  // ...
  async redirects() {
    return allRedirects;
  },
};
```

### Checklist

- [ ] Created `redirects.config.ts` with typed `Redirect[]` arrays, categorized by page type
- [ ] Imported `allRedirects` in `next.config.ts` → `async redirects()`
- [ ] Map all indexed URLs from the previous site (crawl tools, Google Search Console, Wayback Machine)
- [ ] Create a 301 redirect per old URL → corresponding new route
- [ ] Include all categories: blog, services, locations, gallery, misc pages
- [ ] Pages with no equivalent (e.g. `/about-us`, `/contact-us`, `/faq`) → redirect to `/`
- [ ] WordPress blog URL patterns: `/post/:slug*` → `/blog/:slug*`
- [ ] WordPress category/tag URLs → `/blog` or best match
- [ ] Old service root slugs (e.g. `/paver-installation`) → `/services/paver-installation`
- [ ] Test every redirect before pointing the domain

### 15.a. Google Search Console 404 Feedback Loop

> **This step runs AFTER the initial deploy, not before.** Google may index short or partial URL variants that don't match any redirect or route, these show up as 404s in Search Console only after the site is live.

After the initial deploy and once GSC starts indexing:

- [ ] Open Google Search Console → Pages → "Not Found (404)"
- [ ] Export the 404 URL list
- [ ] For each 404, determine the correct destination route
- [ ] Add a new redirect entry to the appropriate category array in `redirects.config.ts`
- [ ] Common pattern: Google indexes short slugs (e.g. `/services/driveway` instead of `/services/driveway-pavers`), add redirects for these

**Example from allbrickpavers, GSC 404 fix commit:**

```ts
// Short slugs indexed by Google Search Console (HTTP 404 → 301 fix)
{ source: "/services/driveway", destination: "/services/driveway-pavers", permanent: true },
{ source: "/services/maintenance", destination: "/services/maintenance-plans", permanent: true },
{ source: "/services/repair", destination: "/services/pavers-repair", permanent: true },
```

- [ ] Re-deploy after adding the new redirects
- [ ] Re-check GSC after 1-2 weeks, confirm the 404 count drops
- [ ] Repeat this cycle until no meaningful 404s remain

---

## 16. Derived Constants Chain Audit

**Files:** `src/constants/index.ts`, `src/constants/footer.ts`, and any file that re-exports or reshapes business data.

After creating `COMPANY_NAP` (§1), most forks still have **legacy wrapper constants** (`SITE_CONFIG`, `CONTACT`, `SOCIAL_LINKS`, `FOOTER_COMPANY_INFO`) that were defined with inline hardcoded values before the SSOT existed. These must be refactored to derive from `COMPANY_NAP`, or data will go stale on the next phone/address change.

### What to look for

| Legacy constant | Should derive from |
|---|---|
| `SITE_CONFIG.name` | `COMPANY_NAP.name` |
| `SITE_CONFIG.url` | `COMPANY_NAP.url` |
| `SITE_CONFIG.logo` | `COMPANY_NAP.logo` |
| `CONTACT.email` | `COMPANY_NAP.email` |
| `CONTACT.phoneDisplay` | `COMPANY_NAP.phone.display` |
| `CONTACT.phoneHref` | `COMPANY_NAP.phone.href` |
| `CONTACT.phoneRaw` | `COMPANY_NAP.phone.raw` |
| `CONTACT.hours` | `COMPANY_NAP.hours.display` |
| `SOCIAL_LINKS.instagram` | `COMPANY_NAP.social.instagram` |
| `SOCIAL_LINKS.facebook` | `COMPANY_NAP.social.facebook` |
| `SOCIAL_LINKS.googleMaps` | `COMPANY_NAP.social.googleMaps` |
| `SOCIAL_LINKS.whatsapp` | derived from `COMPANY_NAP.phone.raw` |
| `FOOTER_COMPANY_INFO.name` | `COMPANY_NAP.name` |
| `FOOTER_COMPANY_INFO.tagline` | `COMPANY_NAP.tagline` |
| `FOOTER_COMPANY_INFO.address.*` | `COMPANY_NAP.address.*` |
| `FOOTER_COMPANY_INFO.contact.*` | `COMPANY_NAP.phone.*` / `COMPANY_NAP.hours.*` |

### Correct pattern (from allbrickpavers)

```ts
// src/constants/index.ts
export * from "./company";
export * from "./footer";
import { COMPANY_NAP, WHATSAPP_LINK } from "./company";

export const SITE_CONFIG = {
  name: COMPANY_NAP.name,
  description: `${COMPANY_NAP.name} - Your paving solution.`,
  url: COMPANY_NAP.url,
  logo: COMPANY_NAP.logo,
} as const;

export const CONTACT = {
  email: COMPANY_NAP.email,
  phoneDisplay: COMPANY_NAP.phone.display,
  phoneHref: COMPANY_NAP.phone.href,
  phoneRaw: COMPANY_NAP.phone.raw,
  hours: COMPANY_NAP.hours.display,
} as const;

export const SOCIAL_LINKS = {
  whatsapp: WHATSAPP_LINK,
  instagram: COMPANY_NAP.social.instagram,
  facebook: COMPANY_NAP.social.facebook,
  googleMaps: COMPANY_NAP.social.googleMaps,
} as const;
```

```ts
// src/constants/footer.ts
import { COMPANY_NAP } from "./company";

export const FOOTER_COMPANY_INFO = {
  name: COMPANY_NAP.name,
  tagline: COMPANY_NAP.tagline,
  address: {
    label: COMPANY_NAP.address.label,
    street: COMPANY_NAP.address.streetFull,
  },
  contact: {
    hours: COMPANY_NAP.hours.displayUpper,
    phone: COMPANY_NAP.phone.display,
    phoneDisplay: COMPANY_NAP.phone.display,
  },
} as const;
```

### Checklist

- [ ] `src/constants/index.ts` imports and re-exports from `company.ts`
- [ ] `SITE_CONFIG` derives all values from `COMPANY_NAP`, no inline strings
- [ ] `CONTACT` derives all values from `COMPANY_NAP.phone.*`, `COMPANY_NAP.email`, `COMPANY_NAP.hours.*`
- [ ] `SOCIAL_LINKS` derives all values from `COMPANY_NAP.social.*`
- [ ] `FOOTER_COMPANY_INFO` derives all values from `COMPANY_NAP`
- [ ] `WHATSAPP_LINK` is composed from `COMPANY_NAP.social.whatsappBase` + `COMPANY_NAP.phone.raw`
- [ ] No wrapper constant contains an inline string that duplicates data already in `COMPANY_NAP`

### Validation

```bash
# Find hardcoded strings in wrapper constants that should use COMPANY_NAP
grep -n 'SITE_CONFIG\|CONTACT\|SOCIAL_LINKS\|FOOTER_COMPANY_INFO' src/constants/index.ts src/constants/footer.ts

# Should see COMPANY_NAP.* references, NOT inline string literals
```

---

## 17. Quick Grep Commands Tips

Run these to find remaining issues in any forked repo:

```bash
# Find placeholder phone numbers
grep -rn "555-000-0000\|000-0000" src/ --include="*.ts" --include="*.tsx"

# Find placeholder addresses
grep -rn "123 Main St\|Placeholder" src/ --include="*.ts" --include="*.tsx"

# Find old domain references from the base project
grep -rn "basedomain\.com" src/ --include="*.ts" --include="*.tsx"

# Find hardcoded company names that should use SSOT
grep -rn '"Acme Corp"' src/ --include="*.ts" --include="*.tsx"

# Find content images with missing alt text
grep -rn 'alt=""' src/ --include="*.tsx"

# Find canonical leaking from layouts
grep -rn "alternates.*canonical" src/app/**/layout.tsx

# Find any hardcoded email outside constants
grep -rn "@acmecorp.com" src/ --include="*.ts" --include="*.tsx"

# Find hardcoded phone outside constants
grep -rn "tel:+1555\|555-123" src/ --include="*.ts" --include="*.tsx"
```

---

## 18. Silent SEO Bug Audit

These issues throw no errors, break no UI, and appear in no build warnings, but they actively harm crawlability, Rich Results eligibility, and SERP performance. Run this audit on every new fork before launch.

### 18.a. FAQ Rich Snippet

**Files:**
- `src/presentation/components/organisms/home-page-sections/FaqSection.tsx`
- `src/presentation/components/templates/seo/json-ld.tsx`, `FAQJsonLd`

Google can display FAQ rich snippets in search results (expandable Q&A directly below the page title), significantly increasing CTR. To qualify, the page must render a valid `FAQPage` schema with the exact same questions and answers visible in the UI.

### 18.a.1 Architecture Rule, Co-location

> The `FAQJsonLd` schema component must be rendered **inside** `FaqSection`, not in a separate page file or layout.

This ensures the schema and the visible accordion content are always in sync. If the FAQ data is updated, the schema updates automatically. If they live in separate files, they will drift.

**Correct pattern:**

```tsx
// FaqSection.tsx
export const FINGERPRINTING_FAQS = [...] // exported, shareable
export const DRUG_TESTING_FAQS = [...]   // exported, shareable

const ALL_FAQS = [...FINGERPRINTING_FAQS, ...DRUG_TESTING_FAQS]

export default function FaqSection() {
  return (
    <section id="faq">
      <FAQJsonLd faq={ALL_FAQS} /> {/* schema inline with UI */}
      {/* accordion UI below */}
    </section>
  )
}
```

**Wrong pattern (causes drift):**

```tsx
// page.tsx, do NOT do this
import { FAQJsonLd } from "@/presentation/components/templates/seo/json-ld"
const faqs = [...] // separate copy, will go stale

export default function Page() {
  return <>
    <FAQJsonLd faq={faqs} />
    <FaqSection /> {/* different data, schema and UI diverge */}
  </>
}
```

### 18.a.2 Data Requirements

Google's [FAQ rich result guidelines](https://developers.google.com/search/docs/appearance/structured-data/faqpage) require:

- [ ] Each FAQ item has a non-empty `question` and `answer` string
- [ ] The questions and answers in the schema **exactly match** the visible text in the UI, do not paraphrase
- [ ] A minimum of 1 Q&A pair is present (more is better; Google typically shows 2–3 in results)
- [ ] No questions are duplicated within the same page
- [ ] Answer text does not contain HTML, plain text only

### 18.a.3 Coverage, Which Pages Get FAQ Schema

`FaqSection` is mounted on three page types. Confirm `FAQJsonLd` fires on all of them:

- [ ] Homepage (`src/app/(public)/page.tsx`), renders `<FaqSection />` → emits `FAQPage` schema
- [ ] Service pages (`service-detail.view.tsx`), renders `<FaqSection />` → emits `FAQPage` schema
- [ ] Location pages (`location-detail.view.tsx`), renders `<FaqSection />` → emits `FAQPage` schema

> If a fork removes `FaqSection` from any of these pages, that page loses the FAQ rich snippet automatically, no orphaned schema left behind.

### 18.a.4 Validation

```bash
# Confirm FAQJsonLd is mounted inside FaqSection (not in page files)
grep -rn "FAQJsonLd" src/ --include="*.tsx"

# Confirm FAQ data arrays are exported (required for co-location pattern)
grep -rn "export const.*_FAQS" src/ --include="*.tsx"

# Confirm no page-level FAQPage schema that could conflict
grep -rn "FAQPage" src/app/ --include="*.tsx"
```

After deploy, test with the [Rich Results Test](https://search.google.com/test/rich-results), enter the homepage URL and confirm the `FAQPage` type appears with no warnings.


### 18.1 Schema Type Correctness

- [ ] `@type` for the homepage LocalBusiness schema matches the fork's actual business category:
  - `ProfessionalService`, consulting, testing, law, healthcare
  - `HomeAndConstructionBusiness`, contractors, builders
  - `FoodEstablishment`, restaurants, catering
  - `MedicalClinic`, clinics, dental, therapy
  - `LocalBusiness`, fallback if none of the above fits
- [ ] `ArticleJsonLd` / `BlogPosting` schema is **only** mounted on `/blog/[slug]` pages, never on the homepage, service pages, or location pages
- [ ] Service and location pages do **not** emit `Article` schema, wrong `@type` on non-editorial pages triggers a Rich Results mismatch warning

### 18.2 Fake or Fabricated Structured Data

> **Highest risk, Google's review policy prohibits self-serving or fabricated reviews. Violation can trigger a manual action.**

- [ ] `aggregateRating.ratingValue` and `ratingCount` come from a real data source (Google Business API, review platform), not hardcoded placeholders
- [ ] `Review` schema items use real reviewer names and real review text, placeholder names like `"Sarah M."` or `"John D."` must be replaced or the component removed
- [ ] If real review data is unavailable at build time, `ReviewJsonLd` and `aggregateRating` must be **removed entirely**, not left with estimated values
- [ ] `wordCount` in Article schema is not a hardcoded guess, omit the field if count is not computed dynamically

### 18.3 Schema Conflicts, Duplicate `@type` on Same Page

- [ ] Confirm the homepage emits **at most two** top-level schema blocks: one `LocalBusiness`/`ProfessionalService` and one `WebSite`
- [ ] `OrganizationJsonLd` and `LocalBusinessJsonLd` are **not both** mounted globally, choose one or merge them
- [ ] Run `grep -rn 'application/ld+json' src/` and count how many schema blocks appear on the homepage, Google processes one per `@type` and ignores duplicates
- [ ] No two mounted components emit the same `id` prop on the same page, duplicate script `id` attributes silently drop one

### 18.4 Non-Existent Routes in Structured Data

- [ ] `WebSite` schema `potentialAction.SearchAction` is only present if the site has a real, working `/search` route, otherwise remove it entirely (a 404 `urlTemplate` blocks Sitelinks Searchbox eligibility)
- [ ] `BreadcrumbJsonLd` items contain URLs that actually resolve (no 404s)
- [ ] `sameAs` social URLs are active (links resolve, no redirected /deactivated profiles)

### 18.5 Canonical Landmines

- [ ] `src/server/config/default-seo.tsx` (or equivalent fallback config) does **not** contain `alternates.canonical`, if it does, any page that spreads this object inherits the root-domain canonical, silently marking every page as a duplicate of the homepage
- [ ] No layout file (`layout.tsx`) at any route segment sets `alternates.canonical`, canonicals belong exclusively in leaf `page.tsx` files
- [ ] `use-legal-metadata.ts` or equivalent metadata helpers pass `canonical` from the config object, not from a hardcoded root-domain string

### 18.6 Open Graph Inheritance Gaps

- [ ] Service pages (`/services/[slug]`) set their own `openGraph.title` and `openGraph.description` in `generateMetadata`, otherwise every service page social share shows the layout's generic homepage title
- [ ] Location pages (`/locations/[type]/[slug]`) set their own `openGraph.title` and `openGraph.description`
- [ ] Blog posts (`/blog/[slug]`) set `openGraph.type: "article"`, `publishedTime`, and `authors`
- [ ] `openGraph.images[].alt` in `layout.tsx` is descriptive of the actual image content, not just the company name
- [ ] `openGraph.title` and `twitter.title` in `layout.tsx` match `title.default`, mismatches create inconsistency between `<title>` and social share previews

### 18.7 Schema Completeness, LocalBusiness / ProfessionalService

Google uses these fields for Knowledge Panel and Maps data. Omitting them doesn't invalidate the schema but loses ranking signals.

- [ ] `@id` set to `${SITE_URL}/#business`, required for entity disambiguation across schema nodes
- [ ] `legalName` set (from SSOT), used when business legal name differs from display name
- [ ] `foundingDate` set (from SSOT), contributes to entity trust
- [ ] `sameAs` includes all active social profiles + Google Maps place URL (from SSOT)
- [ ] `areaServed` derived from `AREAS_SERVED` constant in SSOT, not a hardcoded inline array
- [ ] `email` included in ContactPoint
- [ ] `openingHours` uses the schema-format string from SSOT (e.g. `"Mo-Sa 09:00-17:00"`)

### 18.8 Article / BlogPosting Schema

- [ ] `datePublished` comes from the actual article's `published_at` field, not a hardcoded date
- [ ] `dateModified` is either set from data or defaults to `datePublished`, not omitted entirely
- [ ] `headline` uses the actual article title, not a generic company tagline
- [ ] `author` uses the real author's name when available, falls back to `Organization` if unknown
- [ ] `publisher.logo` URL resolves to a real image file

### 18.9 WebSite Schema

- [ ] `alternateName` is a **different** name people might search for (e.g. `"Orlando Fingerprinting"`), not a copy of `name`
- [ ] `copyrightYear` is dynamic (`new Date().getFullYear()`), not a hardcoded year that goes stale
- [ ] `potentialAction.SearchAction` removed if no search route exists (see §18.4)

### 18.10 Grep Commands for Silent Bug Detection

```bash
# Detect fake review names in schema
grep -rn '"Sarah\|John D.\|James R.' src/ --include="*.tsx" --include="*.ts"

# Find hardcoded aggregateRating (should come from live data source)
grep -rn 'ratingValue\|ratingCount' src/ --include="*.tsx" --include="*.ts"

# Detect Article schema outside blog pages (wrong @type on homepage/service/location)
grep -rn '"@type": "Article"' src/ --include="*.tsx" --include="*.ts"

# Detect SearchAction declarations (verify /search route exists)
grep -rn 'potentialAction\|SearchAction\|search\?q=' src/ --include="*.tsx" --include="*.ts"

# Find canonical in fallback config objects (canonical landmine)
grep -rn 'canonical' src/server/config/ --include="*.tsx" --include="*.ts"

# Find OG/Twitter metadata missing from dynamic page generateMetadata
grep -rn 'generateMetadata' src/app/ --include="*.tsx" | xargs grep -L 'openGraph'

# Count JSON-LD blocks on a rendered page (should be ≤ 3 on homepage)
grep -rn 'application/ld+json' src/ --include="*.tsx" --include="*.ts"

# Find hardcoded areaServed arrays (should use AREAS_SERVED constant)
grep -rn 'areaServed.*\[' src/ --include="*.tsx" --include="*.ts"

# Find hardcoded copyright years
grep -rn 'copyrightYear.*20[0-9][0-9]' src/ --include="*.tsx" --include="*.ts"

# Find schema @id fields (confirm they exist in LocalBusiness and WebSite)
grep -rn '"@id"' src/ --include="*.tsx" --include="*.ts"
```

---

## 19. Final Verification (per fork)

Before going live:

- [ ] `pnpm build` completes without errors
- [ ] Visit `/sitemap.xml`, all fork URLs appear
- [ ] Visit `/robots.txt`, correct domain in `Sitemap:` field
- [ ] Inspect homepage in browser → View Source → search `application/ld+json`, data is correct
- [ ] Test with [Rich Results Test](https://search.google.com/test/rich-results), LocalBusiness shows no errors
- [ ] Test with [Schema Markup Validator](https://validator.schema.org/), no critical errors
- [ ] Verify canonical on `/services/[slug]`, `/locations/[slug]`, `/products/[category]/[slug]`
- [ ] Confirm no important page returns 404
- [ ] Submit new sitemap in Google Search Console after deploy

---