# AUDITORIA DE FALHAS — reservemkt.com.br → 100/100

**Data:** 07/07/2026
**Estado atual (PageSpeed mobile):** Desempenho **67** · TBT **1.580 ms** · Speed Index **1,9 s** · Reflow forçado **47 ms** · Main thread **2,8 s** · **5 long tasks**
**Objetivo:** 100/100 em Desempenho, Acessibilidade, Práticas Recomendadas e SEO — mobile e desktop.

Este documento substitui o plano de execução do `CHECKUP_SITE_RESERVE.md` (que já foi majoritariamente executado) e cataloga **o que ainda está quebrando e por quê**, com base em leitura completa do código em 07/07/2026. É um documento vivo: marcar os checkboxes conforme os itens forem resolvidos e anotar o resultado do PageSpeed após cada fase.

---

## 0. Leitura do problema: por que o desempenho CAIU depois do checkup

O checkup anterior atacava os problemas certos da época (imagem de 8,6 MB, Firebase placeholder, fontes). Esses itens **já estão resolvidos** no código atual:

- ✅ Fontes via `next/font` (`src/app/layout.tsx:22-38`)
- ✅ Firebase fora do bundle público (só `AuthContext`/`useUserData` importam, e ninguém importa eles)
- ✅ Hero com `next/image` + `priority` + `placeholder="blur"` (`Banner/index.tsx:20-30`)
- ✅ GTM/Clarity adiados para 1ª interação (`DeferredAnalytics.tsx`)
- ✅ Headers de segurança + cache immutable (`next.config.ts`)
- ✅ Polyfills legados removidos (`next.config.ts:111-113`)
- ✅ Seções abaixo da dobra com `dynamic()` (`home/page.tsx:18-22`)

O gargalo mudou de lugar. Hoje as long tasks são atribuídas ao **próprio documento** (`https://www.reservemkt.com.br`, 759 ms + 586 ms + 380 ms + 52 ms) e não a chunks de terceiros. Isso aponta para **scripts inline do próprio Next.js (payload RSC) + hidratação de uma página 100% client-side**, e não mais para imagem/fonte/terceiro. As causas estão detalhadas na Parte 1.

**Regra de ouro a partir de agora:** nenhuma otimização entra sem medição antes/depois. Rodar `npm run build && npm run start` + Lighthouse local (aba anônima, sem extensões) antes de cada deploy, e comparar. O desempenho caiu justamente porque mudanças foram acumuladas sem validação isolada.

---

## PARTE 1 — DESEMPENHO: causas do TBT 1.580 ms / Speed Index 1,9 s

### 1.1 🔴 [P0] A home inteira é client component — hidratação total + payload RSC gigante

`src/app/(public)/home/page.tsx:1` tem `"use client"`, e **todas** as seções (Banner, TransformSection, ResultadosSection, OQueFazemos, ParaQuemFazemos, Footer, Header…) também são client components. Consequências diretas:

1. **Todo o conteúdo da página viaja duas vezes**: uma no HTML e outra serializado no payload RSC (scripts inline `self.__next_f.push(...)`). A avaliação desses scripts inline é atribuída à URL do documento — **é exatamente o padrão das 4 long tasks "reservemkt.com.br Própria" do relatório** (759 ms, 586 ms, 380 ms, 52 ms).
2. **React hidrata ~750 elementos DOM** de uma vez no mobile (CPU 4x mais lento). Isso é a categoria "Other" de 1.989 ms + "Script Evaluation" de 442 ms.
3. Nada disso é necessário: a home é conteúdo estático com meia dúzia de pontos interativos.

**Causa raiz:** o sistema de i18n. Todo texto passa por `useLocale().t()` (`src/context/LocaleContext.tsx`), que é um hook client-side — isso **força** cada seção a ser client component.

**Correção (a maior alavanca do site, fazer com calma):**
- Converter as seções da home em **Server Components**. O texto pt-BR é renderizado no servidor lendo o dicionário diretamente (import de `pt-BR.ts` em componente server não vai para o bundle).
- Isolar interatividade em componentes-folha pequenos com `"use client"`: o carrossel mobile de `OQueFazemos`, o accordion do FAQ, o menu do Header, o botão de scroll do Banner.
- Para o inglês: decidir a estratégia (ver 1.2). A troca client-side de idioma é o que ancora a arquitetura atual.

**Impacto esperado:** é aqui que moram os ~1.900 ms de "Other". Meta pós-correção: TBT < 200 ms.

### 1.2 🔴 [P0] Dicionários pt-BR + en-US inteiros no bundle inicial (~32 KB de fonte)

`LocaleContext.tsx:5-6` importa `pt-BR.ts` (16,7 KB) **e** `en-US.ts` (15,8 KB) estaticamente. Ambos entram no first-load JS de todas as páginas, e cada chamada `t()` roda no cliente durante a hidratação.

**Correção — escolher uma:**
- **(a) Recomendada:** rota `/en` (ou subdomínio) com conteúdo renderizado no servidor. Cada locale só carrega o próprio dicionário, e ganha SEO no idioma (hoje o conteúdo EN é invisível para o Google, pois só existe após troca client-side).
- (b) Mínima: manter pt como server-rendered e carregar `en-US.ts` com `import()` dinâmico apenas quando o usuário troca de idioma.

### 1.3 🔴 [P1] `blog-posts.ts` com 67 KB entra no JS da home via BlogPreview

`src/data/blog-posts.ts` (67 KB, artigos completos em HTML) é importado pelo `BlogPreview` da home. O `dynamic()` separa o chunk, mas ele é baixado e avaliado logo após a hidratação — provável responsável pela long task do chunk `4bd1b696-*.js` (109 ms) e por parte do "Script Parsing".

**Correção:** separar metadados (título, slug, resumo, capa, data) do conteúdo. `BlogPreview` e `/blog` consomem só os metadados; o HTML completo do artigo só é usado em `/blog/[slug]` — e como essas páginas podem ser server components, o conteúdo nem precisa ir para bundle nenhum.

### 1.4 🟡 [P1] Fallback de 8 s do DeferredAnalytics dispara DENTRO do trace do Lighthouse

`DeferredAnalytics.tsx:10` — `FALLBACK_DELAY_MS = 8000`. O Lighthouse não interage com a página, então o timer de 8 s dispara durante o trace (que roda até a rede/CPU ficarem ociosas), puxando **GTM + Clarity para dentro da janela medida**. O Clarity em particular é conhecido por reflows forçados — candidato forte para os **47 ms de reflow "[sem atribuição]"** e para a long task de 586 ms iniciando em 1.729 ms (na simulação lantern os tempos são comprimidos).

**Correção:**
- Carregar GTM/Clarity **somente na interação real** (remover o fallback de tempo) — page views de quem nunca interage têm valor analítico quase nulo; ou
- Subir o fallback para além da janela de trace (≥ 15 s) usando `requestIdleCallback` + timeout.
- Validar: rodar Lighthouse e conferir no trace (DevTools > Performance) se `gtm.js`/`clarity.ms` aparecem antes do fim da medição.

### 1.5 🟡 [P1] Reflow forçado (47 ms) — pontos de leitura de geometria no código próprio

Além do Clarity (1.4), leituras de geometria no código próprio:

| Arquivo | Linha | Leitura | Risco |
|---|---|---|---|
| `src/components/Analytics/AutoTrack.tsx` | 32-33 | `innerHeight` + `scrollHeight` a cada scroll | Roda dentro de rAF, mas lê layout logo após mutações de outros efeitos — intercalar leituras/escritas força reflow |
| `src/app/(public)/home/_components/OQueFazemos/index.tsx` | 128-130, 179 | `offsetWidth`/`offsetLeft` no scroll do carrossel e clique nos dots | Só em interação — impacto no INP, não no TBT |
| `src/hooks/useMobileDevice.ts` | 12 | `innerWidth` no resize | Baixo |

**Correção:** em `AutoTrack`, cachear `documentHeight` (recalcular apenas em `resize`/`ResizeObserver`) em vez de ler `scrollHeight` a cada evento de scroll. Nos carrosséis, ler geometria uma vez e reusar.

### 1.6 🟡 [P2] `experimental.inlineCss: true` — conferir se o CSS inlinado não cresceu demais

`next.config.ts:61`. Inlinar o CSS elimina a request render-blocking (bom para FCP/LCP), mas **todo o CSS do Tailwind entra em cada HTML**. Se o CSS gerado passar de ~50 KB, o custo de parse + o peso do HTML em cada navegação superam o ganho.

**Validação:** `npm run build`, abrir o HTML gerado e medir o `<style>` inline. Se > 50 KB, investigar por que o Tailwind está gerando tanto (ex.: classes arbitrárias demais) ou reverter o `inlineCss` e comparar os scores A/B.

### 1.7 🟡 [P2] CookieConsent com `backdrop-filter: blur(24px)` aparecendo aos 900 ms

`CookieConsent/index.tsx:30,63` — o banner monta aos 900 ms (dentro da janela FCP→TTI) com `backdrop-filter: blur(24px) saturate(180%)`, um dos efeitos de paint mais caros que existem em mobile. Contribui para "Rendering"/"Style & Layout" e para o Speed Index.

**Correção:** trocar por fundo sólido/quase-opaco (`rgba(255,255,255,0.97)`) sem blur — visualmente quase idêntico sobre a página — ou adiar a montagem para depois do load (`requestIdleCallback`), fora da janela medida.

### 1.8 🟢 [P3] Miudezas que somam

- `LocaleProvider` (`LocaleContext.tsx:24-31`) faz `broadcast()` no mount mesmo quando o valor não muda → dispara um `CustomEvent` para dezenas de listeners logo após a hidratação. Só fazer broadcast se `saved !== _locale`.
- `key={`banner-${locale}`}` em **todas** as seções da home (`home/page.tsx:36-48`) → trocar idioma desmonta e remonta a página inteira (jank de ~1 s no clique). Com i18n server-side (1.2a) isso desaparece; enquanto existir, remover as `key`s — o texto atualiza sozinho via re-render.
- Animação infinita `hero-arrow-bounce` e marquee `scroll-infinite-seamless` (`globals.css:869-922`): já usam transform (compositor) — ok, apenas garantir `will-change: transform` no marquee se aparecer como custo de Rendering.

### 1.9 Como validar cada mudança (obrigatório)

```bash
npm run build && npm run start
# Chrome anônimo → DevTools → Lighthouse → Mobile, "Performance"
# Rodar 3x e usar a mediana. Só depois fazer deploy e conferir no PSI.
```

Para o bundle: instalar `@next/bundle-analyzer` e conferir o first-load JS da home antes/depois (meta: **< 130 KB gzip**).

---

## PARTE 2 — CÓDIGO MORTO E DEPENDÊNCIAS FANTASMAS (limpeza segura)

Nada abaixo está em uso — remover reduz superfície de erro, tempo de build e o risco de algum import acidental trazer a lib para o bundle.

### 2.1 Dependências instaladas e não usadas em `src/` (verificado por grep de imports)

`swiper`, `embla-carousel-react`, `recharts`, `@stripe/react-stripe-js`, `@stripe/stripe-js`, `react-day-picker`, `vaul`, `cmdk`, `input-otp`, `sonner`, `next-themes`, `react-hook-form`, `react-toastify`, `resend` (a rota `api/contact` foi deletada), `klaro` (o banner atual é próprio), `firebase` (só usado por arquivos mortos, ver 2.2), a maioria dos ~27 pacotes `@radix-ui/*` (os `ui/button|card|input` que os usam não são importados por ninguém).

- [ ] `npm uninstall` de tudo acima (conferir um a um com `grep -r "<pacote>" src`).

### 2.2 Arquivos mortos (nenhum import aponta para eles)

- `src/components/Cursor/`, `src/components/Button/`, `src/components/Input/`, `src/components/Options/`, `src/components/ItemsHistory/`, `src/components/Sidebar.tsx`, `src/components/UpgradeBanner.tsx`, `src/components/CardCarousel/`, `src/components/ui/`
- `src/app/(public)/home/_components/EspecialistasSection/`, `QuemSomos/`, `QuemSomosSection/`, `Contact/` (o form agora é WhatsApp — conferir antes de apagar)
- `src/context/AuthContext.tsx`, `src/hooks/useUserData.ts`, `src/services/firebase.ts`
- `src/app/registry.tsx` (StyledComponentsRegistry — não é usado por nenhum layout)
- `src/components/Header/styles.ts`, `src/components/Footer/styles.ts`, `src/app/(public)/home/_components/Banner/styles.ts` (styled-components órfãos)
- `src/styles/` — **~900 KB de CSS do template antigo** que não é importado: `bootstrap.css`, `font-awesome.css`, `style-theme.css`, `hover.css`, `animate.css`, `jquery-ui.css`, `swiper.min.css`, `header.css`, `footer.css`, `global.css` etc. Só `globals.css` está em uso.
- `docs/globals.css` (fora de lugar)

- [ ] Após remover os órfãos de styled-components: `npm uninstall styled-components` e deletar o workaround de PostCSS em `next.config.ts:115-138`.

### 2.3 Documentação desatualizada (induz erro em quem for mexer)

O `CLAUDE.md` descreve coisas que não existem mais: Klaro, styled-components + registry, rota `src/app/api/contact` (Resend), `AuthProvider`/`ToastContainer` no layout público, pasta `src/app/public/`.

- [ ] Atualizar `CLAUDE.md` após a limpeza da Parte 2.

---

## PARTE 3 — REVISÃO DE TEXTOS: travessões (—) que denunciam texto de IA

**Inventário:** 354 ocorrências de `—`/`–` em 43 arquivos. Descontando comentários de código, sobram **~250 ocorrências em texto visível ao usuário**. Principais focos:

| Arquivo | Ocorrências | Tipo |
|---|---|---|
| `src/data/blog-posts.ts` | 111 | Corpo dos artigos do blog |
| `src/app/(public)/google-hotel-ads/_components/GoogleHotelAdsContent.tsx` | 24 | Página de serviço |
| `src/app/(public)/motor-de-reservas/_components/MotorDeReservasContent.tsx` | 22 | Página de serviço |
| `src/app/(public)/reservas-diretas/_components/ReservasDiretasContent.tsx` | 20 | Página de serviço |
| `src/app/(public)/ecossistema/_components/EcossistemaContent.tsx` | 18 | Página metodologia |
| `src/app/(public)/seo-para-hoteis/_components/SeoParaHoteisContent.tsx` | 12 | Página de serviço |
| `src/app/(public)/diagnostico/_components/DiagnosticoContent.tsx` | 12 | Landing |
| `src/i18n/pt-BR.ts` + `en-US.ts` | 16 | Home inteira (FAQ, seções) |
| `src/app/(public)/marketing-hoteleiro/_components/EmpresaContent.tsx` | 9 | Institucional |
| Demais páginas de serviço (`meta-ads`, `gestao-de-canais`, `automacao-atendimento`, `sites-para-hoteis`, `relatorios-performance`, `producao-audiovisual`) | ~40 | Páginas de serviço |
| Metadados (`layout.tsx`, `page.tsx` de várias rotas — `title`/`description`) | ~30 | SEO/SERP |

**Regras de substituição (não fazer replace cego — ler a frase):**

1. **Aposto/explicação no meio ou fim da frase → vírgula.**
   Antes: `"...gerenciadas de forma integrada — do Instagram ao Booking..."`
   Depois: `"...gerenciadas de forma integrada, do Instagram ao Booking..."`
2. **Quebra enfática antes de conclusão → ponto final e nova frase.**
   Antes: `"Custo por reserva: R$ 125 — sem pagar os 15% de comissão."`
   Depois: `"Custo por reserva: R$ 125. E sem pagar os 15% de comissão."`
3. **Par de travessões (inciso) → par de vírgulas.**
   Antes: `"por objetivo — awareness, consideração e conversão — com testes A/B"`
   Depois: `"por objetivo (awareness, consideração e conversão), com testes A/B"` — parênteses quando o inciso já contém vírgulas.
4. **Títulos/`<title>` de página** (`"Meta Ads para Hotéis | Réserve — Facebook e Instagram Ads"`): usar `|` ou `:` no lugar do travessão, mantendo o padrão único em todo o site.
5. **Não tocar** em travessões dentro de comentários de código, nem em usos matemáticos/intervalos (`12/05–29/06`).

- [ ] Passar arquivo por arquivo da tabela acima aplicando as regras (começar pelos de maior visibilidade: i18n → páginas de serviço → blog).
- [ ] Revisão final: `grep -rn "—" src` deve retornar apenas comentários de código.

---

## PARTE 4 — CHECKLIST DE EXECUÇÃO PRIORIZADO

### Fase 1 — Medição de base (30 min)
- [ ] Lighthouse local (build de produção) mobile + desktop, 3 rodadas, salvar os relatórios como baseline neste doc
- [ ] `@next/bundle-analyzer`: registrar first-load JS da home

### Fase 2 — Ganhos rápidos (1 dia)
- [ ] 1.4 — GTM/Clarity só na interação real (sem fallback dentro do trace)
- [ ] 1.7 — CookieConsent sem `backdrop-filter` (ou montagem pós-load)
- [ ] 1.3 — separar metadados do conteúdo em `blog-posts.ts`
- [ ] 1.8 — broadcast condicional no LocaleProvider + remover `key={locale}` das seções
- [ ] 1.5 — cachear `scrollHeight` no AutoTrack
- [ ] Parte 2 inteira (código morto) — não muda score, mas destrava as próximas fases
- [ ] **Medir de novo.** Expectativa: TBT ~1.580 → ~800-1.000 ms

### Fase 3 — Reestruturação (2-4 dias, a grande alavanca)
- [ ] 1.1/1.2 — home (e depois as demais rotas) como Server Components; i18n resolvido no servidor; client components só nas folhas interativas
- [ ] 1.6 — validar tamanho do CSS inline após a migração
- [ ] **Medir de novo.** Expectativa: TBT < 200 ms, Speed Index < 1,2 s, Desempenho ≥ 95

### Fase 4 — Textos (paralelo, 1-2 dias)
- [ ] Parte 3 completa (travessões → vírgula/ponto), começando por i18n e páginas de serviço

### Fase 5 — Consolidação
- [ ] PSI de produção mobile + desktop após deploy, registrar os 4 scores aqui
- [ ] Atualizar `CLAUDE.md`
- [ ] Repetir PSI 1x/semana por um mês — regressão detectada = investigar o deploy correspondente

---

## Registro de medições

| Data | Contexto | Desempenho mobile | TBT | SI | Desempenho desktop |
|---|---|---|---|---|---|
| 07/07/2026 | Baseline (produção) | 67 | 1.580 ms | 1,9 s | — |
| | Após Fase 2 | | | | |
| | Após Fase 3 | | | | |
