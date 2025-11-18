import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  outputFileTracingRoot: path.join(__dirname, '../../'),
  webpack: (config) => {
    // Encontra a regra de CSS e adiciona exclusão para node_modules
    const rules = config.module.rules;
    
    // Procura pela regra oneOf que contém as regras de CSS
    const oneOfRule = rules.find((rule: any) => rule.oneOf);
    
    if (oneOfRule && oneOfRule.oneOf) {
      oneOfRule.oneOf.forEach((rule: any) => {
        // Encontra regras que processam CSS
        if (
          rule.test &&
          (rule.test.toString().includes('css') || 
           rule.test.toString().includes('\.css'))
        ) {
          // Adiciona exclusão para node_modules se não existir
          if (!rule.exclude) {
            rule.exclude = /node_modules/;
          } else if (Array.isArray(rule.exclude)) {
            if (!rule.exclude.some((ex: any) => ex.toString().includes('node_modules'))) {
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
