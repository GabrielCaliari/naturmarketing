# Réserve — Site Completo (Redesign Cinemático Imersivo)

Este pacote contém o código-fonte completo da landing page redesenhada da Réserve, seguindo o conceito **Cinemático Imersivo** aprovado.

## O que está incluso

- **Hero Cinemático** (`src/components/heroes/hero-cinematic.tsx`)
- **Header e Footer** (`src/components/site-header.tsx`, `src/components/site-footer.tsx`)
- **Todas as seções da landing page:**
  - `section-specialty.tsx` — Nossa Especialidade
  - `section-results.tsx` — Números que falam por si
  - `section-services.tsx` — Serviços
  - `cta-strip.tsx` — Faixa de CTA rápido
  - `section-segments.tsx` — Segmentos atendidos
  - `section-channels.tsx` — Canais de aquisição (com marquee)
  - `section-comparison.tsx` — Comparativo OTA vs. Canal Próprio
  - `section-blog.tsx` — Blog
  - `section-faq.tsx` — Perguntas frequentes
  - `section-final-cta.tsx` — CTA final com fundo escuro
- **Rotas principais:** `src/routes/index.tsx` e `src/routes/__root.tsx`
- **Design tokens e estilos:** `src/styles.css`
- **Imagens geradas:** pasta `src/assets/` com todas as fotos de hotéis/pousadas
- **Arquivos de configuração:** `package.json`, `vite.config.ts`, `tsconfig.json`, `components.json`

## Como usar

1. Descompacte o arquivo `reserve-site-completo.zip`.
2. Se estiver usando um projeto Lovable/TanStack Start existente, copie os arquivos de `src/` para a pasta `src/` do seu projeto.
3. Instale as dependências (se ainda não tiver):
   ```bash
   bun install
   # ou
   npm install
   ```
4. Rode o projeto localmente:
   ```bash
   bun run dev
   # ou
   npm run dev
   ```

## Identidade visual

- Verde Réserve: `#84936f`
- Marrom/terracota: `#994f2a`
- Cremes: `#EDE8E0`, `#F7F3EE`, `#FDFAF7`
- Tipografia: **DM Serif Display** (títulos) + **Fira Sans** (corpo)
- Texto em português do Brasil, extraído do site original `reservemkt.com.br`

## Notas

- As imagens foram geradas por IA para o protótipo. Recomendamos substituí-las por fotos reais dos seus clientes/hotel para produção.
- O projeto usa Tailwind CSS v4 com variáveis de tema definidas em `src/styles.css`.
- A estrutura segue o padrão de rotas do TanStack Start v1.
