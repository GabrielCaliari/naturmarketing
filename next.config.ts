import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  outputFileTracingRoot: path.join(__dirname, '../../'),
  webpack: (config, { isServer }) => {
    // Encontra a regra oneOf que contém as regras de CSS
    const rules = config.module.rules;
    const oneOfRule = rules.find((rule: any) => rule.oneOf);
    
    if (oneOfRule && oneOfRule.oneOf) {
      // Primeiro, exclui node_modules das regras que usam PostCSS
      oneOfRule.oneOf.forEach((rule: any) => {
        if (rule.test && rule.test.toString && rule.test.toString().includes('css')) {
          const uses = Array.isArray(rule.use) ? rule.use : [rule.use].filter(Boolean);
          const hasPostCSS = uses.some((use: any) => {
            const loader = typeof use === 'string' 
              ? use 
              : (use?.loader || '').toString();
            return loader.includes('postcss');
          });
          
          if (hasPostCSS) {
            // Exclui node_modules do processamento PostCSS
            if (!rule.exclude) {
              rule.exclude = /node_modules/;
            } else if (Array.isArray(rule.exclude)) {
              const hasNodeModules = rule.exclude.some((ex: any) => 
                ex && ex.toString && ex.toString().includes('node_modules')
              );
              if (!hasNodeModules) {
                rule.exclude.push(/node_modules/);
              }
            } else if (rule.exclude && !rule.exclude.toString().includes('node_modules')) {
              rule.exclude = [rule.exclude, /node_modules/];
            }
          }
        }
      });
      
      // Adiciona uma regra específica para CSS de node_modules (sem PostCSS)
      // Esta regra deve vir ANTES das outras para ter prioridade
      // Usa o mesmo sistema do Next.js mas sem PostCSS
      const nodeModulesCSSRuleIndex = oneOfRule.oneOf.findIndex((rule: any) => {
        return rule.test && rule.test.toString && rule.test.toString().includes('css');
      });
      
      if (nodeModulesCSSRuleIndex !== -1) {
        const baseRule = oneOfRule.oneOf[nodeModulesCSSRuleIndex];
        const nodeModulesRule = {
          ...baseRule,
          include: /node_modules/,
          use: baseRule.use?.map((use: any) => {
            // Remove postcss-loader mas mantém outros loaders
            if (typeof use === 'object' && use.loader && use.loader.includes('postcss')) {
              return null;
            }
            if (typeof use === 'string' && use.includes('postcss')) {
              return null;
            }
            return use;
          }).filter(Boolean),
        };
        
        // Insere antes da regra base
        oneOfRule.oneOf.splice(nodeModulesCSSRuleIndex, 0, nodeModulesRule);
      }
    }
    
    return config;
  },
};

export default nextConfig;
