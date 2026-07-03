import type { NextConfig } from "next";
import path from "path";

interface WebpackRule {
  test?: RegExp;
  oneOf?: WebpackRule[];
  use?: unknown;
  exclude?: RegExp | RegExp[];
}

interface WebpackConfig {
  module: {
    rules: WebpackRule[];
  };
  resolve: {
    alias: Record<string, string | false>;
  };
}

// Terceiros permitidos: GTM/GA4, Meta Pixel e Microsoft Clarity (todos gated
// por consentimento LGPD). Testar em staging antes de apertar mais a política.
// Em dev o webpack/HMR precisa de eval() — sem isso a CSP bloqueia todo o JS
// e a página fica "em branco" (animações presas em opacity 0).
const isDev = process.env.NODE_ENV === 'development';

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} https://www.googletagmanager.com https://connect.facebook.net https://www.clarity.ms https://*.clarity.ms`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://www.googletagmanager.com https://www.google-analytics.com https://www.facebook.com https://*.clarity.ms https://images.unsplash.com",
      "font-src 'self'",
      "connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://stats.g.doubleclick.net https://www.facebook.com https://*.clarity.ms",
      "frame-src https://www.googletagmanager.com",
      "frame-ancestors 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      'upgrade-insecure-requests',
    ].join('; '),
  },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

const immutableCache = [
  { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    qualities: [70, 85],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async headers() {
    return [
      { source: '/(.*)', headers: securityHeaders },
      { source: '/img/:path*', headers: immutableCache },
      { source: '/fonts/:path*', headers: immutableCache },
    ]
  },
  async redirects() {
    return [
      // Non-www → www (handles both http and https via Vercel host matching)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'reservemkt.com.br' }],
        destination: 'https://www.reservemkt.com.br/:path*',
        permanent: true,
      },
      // Malformed URLs Google crawled (reported as 404 in Search Console) → /
      { source: '/$', destination: '/', permanent: true },
      { source: '/&', destination: '/', permanent: true },
      // /home is a duplicate of / (route group leak). Consolidate to the canonical /.
      { source: '/home', destination: '/', permanent: true },
      // /contact-us was a thin client-side stub that JS-redirected to / (soft 404).
      // Serve a real 301 instead and keep it out of the sitemap.
      { source: '/contact-us', destination: '/', permanent: true },
      // /empresa renamed to /marketing-hoteleiro (better keyword match). 301 the old URL.
      { source: '/empresa', destination: '/marketing-hoteleiro', permanent: true },
      { source: '/public/home', destination: '/', permanent: true },
      { source: '/public/blog', destination: '/blog', permanent: true },
      { source: '/public/blog/:slug', destination: '/blog/:slug', permanent: true },
      { source: '/public/empresa', destination: '/marketing-hoteleiro', permanent: true },
      { source: '/public/contact-us', destination: '/', permanent: true },
      { source: '/public/privacy-policy', destination: '/privacy-policy', permanent: true },
      { source: '/public/terms-and-conditions', destination: '/terms-and-conditions', permanent: true },
      { source: '/public/consultoria-sucesso', destination: '/consultoria-sucesso', permanent: true },
    ]
  },
  webpack: (config: WebpackConfig) => {
    // Remove os micro-polyfills do Next (Array.at, Object.hasOwn etc.) do bundle:
    // o .browserslistrc só cobre navegadores que já têm esses métodos nativos,
    // e o Lighthouse aponta esse módulo como "JavaScript legado".
    config.resolve.alias[
      path.resolve(__dirname, "node_modules/next/dist/build/polyfills/polyfill-module.js")
    ] = false;

    // Encontra regras CSS e exclui node_modules do PostCSS
    const rules = config.module.rules;
    const oneOfRule = rules.find((rule: WebpackRule) => rule.oneOf);
    
    if (oneOfRule?.oneOf) {
      oneOfRule.oneOf.forEach((rule: WebpackRule) => {
        // Encontra regras CSS que usam PostCSS
        if (rule.test?.toString?.().includes('css')) {
          const uses = Array.isArray(rule.use) ? rule.use : [rule.use].filter(Boolean);
          const hasPostCSS = uses.some((use: unknown) => {
            const loader = typeof use === 'string' ? use : (use as { loader?: string })?.loader || '';
            return String(loader).includes('postcss');
          });
          
          if (hasPostCSS && !rule.exclude) {
            rule.exclude = /node_modules/;
          } else if (hasPostCSS && Array.isArray(rule.exclude)) {
            if (!rule.exclude.some((ex: RegExp) => String(ex).includes('node_modules'))) {
              rule.exclude.push(/node_modules/);
            }
          }
        }
      });
    }
    
    return config;
  },
};

export default nextConfig;
