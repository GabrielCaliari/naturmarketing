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
}

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  outputFileTracingRoot: path.join(__dirname, '../../'),
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
