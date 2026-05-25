import type { NextConfig } from "next";

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
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
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
      // Literal /$  → / (Google crawled this malformed URL)
      { source: '/$', destination: '/', permanent: true },
      { source: '/public/home', destination: '/', permanent: true },
      { source: '/public/blog', destination: '/blog', permanent: true },
      { source: '/public/blog/:slug', destination: '/blog/:slug', permanent: true },
      { source: '/public/empresa', destination: '/empresa', permanent: true },
      { source: '/public/contact-us', destination: '/contact-us', permanent: true },
      { source: '/public/privacy-policy', destination: '/privacy-policy', permanent: true },
      { source: '/public/terms-and-conditions', destination: '/terms-and-conditions', permanent: true },
      { source: '/public/consultoria-sucesso', destination: '/consultoria-sucesso', permanent: true },
    ]
  },
  webpack: (config: WebpackConfig) => {
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
