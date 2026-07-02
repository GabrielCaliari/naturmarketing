# CHECKUP COMPLETO — reservemkt.com.br
## Documento de execução para o agente de frontend

**Data do diagnóstico:** 25/06/2026 (PageSpeed) + GSC 12/05–29/06/2026
**Stack detectada:** Next.js (chunks `_next/static`), Tailwind, fontes custom (PP Hatton)
**Objetivo:** Desempenho, Acessibilidade, Práticas Recomendadas e SEO em 100/100 (desktop e mobile) + plano de conteúdo para subir a posição média (hoje 52,1) nas top consultas.

**Scores atuais:**

| Categoria | Desktop | Mobile |
|---|---|---|
| Desempenho | 57 | 65 |
| Acessibilidade | 94 | 84 |
| Práticas recomendadas | 96 | 96 |
| SEO | 100 | 100 |
| Navegação agêntica | 2/2 | 1/2 |

**Métricas críticas mobile:** LCP **27,4s** (meta: <2,5s) · Speed Index 18,6s · FCP 1,3s
**Métricas críticas desktop:** LCP 4,8s · TBT 290ms · Speed Index 4,3s

---

# PARTE 1 — BUGS CRÍTICOS (corrigir ANTES de qualquer otimização)

## 1.1 🔴 Firebase Auth com configuração PLACEHOLDER em produção

O relatório mobile mostra o site carregando na homepage:

- `https://your-project.firebaseapp.com/__/auth/iframe.js` — **90,5 KiB**, no caminho crítico de rede (3.070ms de latência)
- `https://www.googleapis.com/...getProjectConfig?key=your-api-key` — retornando **HTTP 400**

`your-project` e `your-api-key` são literalmente os valores de exemplo da documentação do Firebase. Ou seja: o SDK do Firebase Auth está inicializando na homepage com env vars não configuradas (ou configuradas só em um ambiente).

**Ações:**
1. Localizar onde o Firebase é inicializado (provavelmente `firebase.ts`/`firebaseConfig` importado em layout ou componente global).
2. Se o Firebase Auth **não é usado na homepage pública** (provável — deve ser do painel/área logada): remover a inicialização do bundle público. Fazer import dinâmico (`next/dynamic` com `ssr: false`) apenas nas rotas que realmente usam auth (ex.: `/login`, `/dashboard`).
3. Se for necessário globalmente: corrigir as variáveis `NEXT_PUBLIC_FIREBASE_*` no ambiente de produção e garantir lazy-init (inicializar só na interação, não no load).
4. Validar: após o deploy, nenhuma request para `firebaseapp.com` ou `googleapis.com` deve aparecer no carregamento inicial da homepage.

**Impacto esperado:** remove 90 KiB de JS de terceiros do caminho crítico, elimina o erro 400 do console, melhora LCP/SI mobile drasticamente.

## 1.2 🔴 Imagem check.png com 8,6 MB (83% do peso total da página)

- `/img/resource/check.png`: **8.605 KiB**, dimensões reais 2135×2850, exibida em 384×583.
- Payload total da página: 10.307 KiB. Só essa imagem = ~83%.
- Economia estimada pelo Lighthouse: **8.568 KiB** (99,6% da imagem).

**Ações:**
1. Converter para AVIF (fallback WebP) e redimensionar. Gerar variantes: 384w, 768w (2x retina), 1152w (3x). Alvo: **< 80 KiB** na variante 768w.
2. Usar `next/image` (componente `<Image>`) em vez de `<img>` cru — ele resolve srcset, lazy loading, formato moderno e `sizes` automaticamente. Hoje o site usa `<img src="/img/resource/check.png">` direto.
3. Repetir para as demais imagens flagradas:
   - `airnb.png` — 411 KiB → converter AVIF/WebP + redimensionar para 346×346 exibidos (economia ~392 KiB)
   - `pousada.png` — 385 KiB → idem (economia ~366 KiB)
   - `hotel&resort.webp` — 138 KiB → recomprimir + responsivo (economia ~124 KiB). **Renomear o arquivo**: `&` em nome de arquivo é má prática (encoding de URL) → `hotel-resort.webp`.
   - `seedsbackground.png` — 359 KiB → converter para AVIF/WebP; se for textura decorativa, considerar CSS ou SVG.
4. Padrão a adotar no projeto inteiro: **nenhuma imagem raster acima de 150 KiB**; hero pode chegar a 200 KiB em AVIF se inevitável.

## 1.3 🔴 Erro de hidratação React #418

Console registra `Minified React error #418` (hydration mismatch — o HTML do servidor difere do render do cliente, argumento `text`).

**Ações:**
1. Rodar o build em dev (`next dev`) e reproduzir para ver o erro completo.
2. Causas típicas a procurar: datas/horas renderizadas com `new Date()` direto no JSX, `Math.random()`, conteúdo dependente de `window`, texto que muda por locale, extensões de i18n (o site tem seletor PT). O seletor de idioma é suspeito principal.
3. Corrigir com `useEffect`/estado montado ou `suppressHydrationWarning` apenas onde justificado.

**Impacto:** hydration mismatch força re-render completo no cliente — contribui para o TBT de 290ms e as long tasks de 363ms/223ms no chunk `148-*.js`.

---

# PARTE 2 — DESEMPENHO (meta: 100/100 nos dois devices)

## 2.1 LCP — Atraso de renderização de 2.550ms no `<h1>`

O elemento LCP é o `<h1>` do hero ("Agência de marketing hoteleiro. Resultados em reservas diretas.") com **2.550ms de render delay** e TTFB de 0ms — ou seja, o problema não é servidor, é bloqueio de renderização no cliente.

**Ações:**
1. **Fonte do hero (PP Hatton):** adicionar `<link rel="preload" as="font" type="font/woff2" crossorigin>` para `pp-hatton-medium.woff2` e a fonte do body. Usar `font-display: swap` (ou `optional` no hero se aceitável). Com `next/font/local` isso vem de graça — migrar as fontes para `next/font`.
2. **CSS render-blocking:** `0a6ac5216f6010af.css` (13,5 KiB, 974ms de latência no caminho crítico). Next.js já faz code-splitting de CSS — verificar se há CSS global desnecessário importado no root layout. Inline do critical CSS do hero se necessário (`experimental.optimizeCss` ou extração manual).
3. **Se o hero tiver imagem de fundo:** carregar com `priority` no `next/image` ou `fetchpriority="high"`.
4. Meta: LCP < 2,0s desktop e < 2,5s mobile.

## 2.2 JavaScript

1. **JS não usado (~78 KiB mobile / 24 KiB desktop):** a maior parte era o Firebase (resolvido na Parte 1). O restante está em `chunks/148-*.js` (23,8 KiB não usados de 42,3 KiB). Rodar `next build` com `@next/bundle-analyzer` e identificar o que está nesse chunk. Candidatos típicos: biblioteca de carrossel, ícones (tabler-icons — importar ícones individuais, nunca o pacote inteiro), animações.
2. **JS legado (12 KiB de polyfills):** o build está transpilando `Array.prototype.at`, `flat`, `flatMap`, `Object.fromEntries`, `hasOwn`, `trimStart/End` — tudo Baseline há anos. Criar/ajustar `.browserslistrc`:
   ```
   >0.3%, last 2 versions, not dead, not op_mini all
   ```
   e garantir que não há `target: es5` em config custom.
3. **Long tasks (363ms + 223ms + 121ms no chunk 148):** depois de resolver hidratação + bundle, revalidar. Se persistir, quebrar componentes pesados com `next/dynamic` e adiar tudo que está abaixo da dobra.
4. **Reflow forçado (38ms):** código no chunk 148 lê propriedade geométrica (`offsetWidth` etc.) após mutação de DOM — típico de carrossel/animação custom. Trocar leituras síncronas por `requestAnimationFrame` ou usar CSS puro para a animação.

## 2.3 Rede e cache

1. **Preconnect:** hoje não há nenhum. Após remover o Firebase, provavelmente não sobra origem externa — perfeito, manter tudo first-party. Se sobrar alguma (analytics), adicionar `<link rel="preconnect">`.
2. **Cache TTL:** garantir `Cache-Control: public, max-age=31536000, immutable` para `/img/*`, `/fonts/*` e assets estáticos. Os assets `_next/static` já são imutáveis por padrão — conferir se o host (Vercel/outro) não está sobrescrevendo.
3. **DOM (747 elementos, profundidade 15):** aceitável, mas revisar o footer (repetição massiva de links) e os 8 dots do carrossel duplicados. Meta: < 800 elementos, sem nós invisíveis renderizados.

---

# PARTE 3 — ACESSIBILIDADE (94 desktop / 84 mobile → 100)

## 3.1 Contraste insuficiente (afeta os dois devices — maior lista de falhas)

Dois grupos de elementos reprovados:

**Header (fundo escuro):**
- Links do menu com `rgba(255,255,255,0.8)` e span "MARKETING AGENCY" — não atingem 4.5:1.
- **Correção:** subir para `rgba(255,255,255,0.92)` ou `#EDEDED` sólido. Para o texto de 14px/400 a razão mínima é 4.5:1. Validar com a paleta real do fundo do header.

**Footer (fundo `#F0EBE3`):**
- Textos em `rgb(122,106,94)` (marrom médio) sobre bege: razão ~4.2:1 — reprovado para 13px.
- Labels em `rgba(26,15,8,0.3)` e `0.35`: razão ~2.6:1 — muito reprovado.
- **Correção:** escurecer o corpo do footer para `#5C4F45` (ou mais escuro) e as labels/copyright para no mínimo `rgba(26,15,8,0.55)`. Manter a estética quiet luxury é possível: contraste vem de luminosidade, não de saturação — testar tons de marrom mais profundos antes de recorrer ao preto.
- Regra de projeto: **todo texto < 18px precisa de 4.5:1; ≥ 18px (ou 14px bold) precisa de 3:1**. Adicionar tokens de cor no Tailwind config com esses pares já validados para ninguém reintroduzir o problema.

## 3.2 Botão sem nome acessível (mobile)

`button.mobile-nav-toggler` (hambúrguer) não tem texto nem label. **Este item também reprova a Navegação Agêntica mobile (1/2)** — corrigi-lo leva os dois checks a 100.

```jsx
<button className="mobile-nav-toggler" aria-label="Abrir menu de navegação" aria-expanded={isOpen}>
```

## 3.3 Áreas de toque (mobile)

Dots do carrossel com 6×6px (ativo 20×6px). Mínimo: **24×24px de área de toque** com espaçamento.

**Correção sem mudar o visual:** manter o dot visual pequeno, mas dar padding ao botão:

```jsx
<button aria-label="Slide 2" className="p-2.5 -m-1"> {/* área de toque ~44px */}
  <span className="block w-1.5 h-1.5 rounded-full ..." />
</button>
```

## 3.4 Ordem de títulos

`<h3>` "Somos especialistas em Marketing Hoteleiro" aparece sem `<h2>` antes. Reestruturar a hierarquia da home:
- `<h1>` — hero (único)
- `<h2>` — cada seção principal (Serviços, Sobre, Segmentos, Clientes, CTA final)
- `<h3>` — cards e subitens dentro das seções

Nunca pular nível. Se o problema for tamanho visual, separar semântica de estilo (`<h2 className="text-lg">` é válido).

---

# PARTE 4 — PRÁTICAS RECOMENDADAS (96 → 100) — Headers de segurança

Todos os itens abaixo são headers HTTP. Em Next.js, configurar em `next.config.js` → `headers()` (ou no host):

```js
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'", // meta: migrar para nonces/strict-dynamic
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data:",
      "font-src 'self'",
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; '),
  },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
];
```

Ajustar `connect-src`/`script-src` conforme os terceiros que sobrarem (analytics, wa.me não precisa — é link, não script). Testar em staging antes: CSP mal calibrada quebra o site. Para o Lighthouse aceitar como "CSP restrita", o ideal é nonce-based (`script-src 'nonce-...'`) — Next.js 14+ suporta via middleware. Depois de estabilizar o HSTS, submeter o domínio em hstspreload.org.

Os erros de console (React #418 e Firebase 400) já foram cobertos na Parte 1 — resolvê-los também limpa a auditoria "Erros do navegador".

---

# PARTE 5 — SEO E ESTRATÉGIA DE CONTEÚDO (posição média 52,1 → primeira página)

## 5.1 Leitura dos dados do Search Console

Top consultas (28 dias): 87 consultas, 1 clique total.

| Consulta | Impressões | Diagnóstico |
|---|---|---|
| motor de reservas para hotel/hotéis | 262 | Maior volume. SERP dominada por **fornecedores de tecnologia** (Hospedin, FastHotel, TOTVS, Stays, RoomRaccoon, Foco) com guias longos de blog |
| reservas diretas | 161 | Termo-conceito. SERP mista: agências (Reprotel) + fornecedores |
| marketing hoteleiro | 142 | Termo-marca da categoria. SERP: Reprotel, Balloon, HotelariaWeb, Foco, Unity |
| motor de reservas | 106 | Idem cluster 1 |
| google hotel ads / hotel ads | 137 | SERP: Reprotel (certificada Google), documentação Google, blogs |
| marketing digital hotel | 83 | Agências |
| agencia de marketing para hotel | 69 | **Consulta de fundo de funil — prioridade máxima de conversão** |

**Conclusão estratégica:** o site já tem impressões relevantes com apenas ~7 semanas de dados — o Google entendeu o nicho. O que falta é (a) profundidade de conteúdo para competir com guias de 2.000+ palavras que dominam essas SERPs e (b) sinais de autoridade (E-E-A-T: cases, provas, autoria). A posição 52 é normal para domínio novo; o plano abaixo acelera a curva de 3–6 meses.

## 5.2 Gap de conteúdo vs. concorrentes (o que eles têm e a RÉSERVE não tem)

Pesquisa nos sites de Reprotel, Balloon, HotelariaWeb, Foco Multimídia, Unity e Ecoturismo Digital:

| Elemento | Concorrentes | Ação para a RÉSERVE |
|---|---|---|
| **Cases e depoimentos com resultados** | Todos exibem depoimentos; Reprotel cita R$ 5 milhões geridos em ads | Componente "Clientes" com Pousada Dona Tereza e Estância Mineira (permutas) — logos, foto, 1 métrica real por case quando houver (ex.: leads gerados no piloto). Nunca inflar: métricas reais pequenas > promessas vazias |
| **Consultoria/diagnóstico gratuito como CTA central** | Reprotel, Balloon, Ecoturismo | O site já tem "DIAGNÓSTICO" no header — transformar em landing page própria `/diagnostico` com formulário curto + agendamento, e usar como CTA de todos os artigos do blog |
| **Blog ativo com guias longos** | Reprotel, Balloon, Foco publicam guias que rankeiam nas suas top queries | Calendário editorial abaixo (5.3) |
| **FAQ estruturado (com schema)** | Ecoturismo, HotelariaWeb, Hospedin | Seção FAQ na home + FAQs específicos por página de serviço, com `FAQPage` schema |
| **Metodologia própria nomeada** | HotelariaWeb ("plataforma própria"), Foco ("jornada do hóspede") | A RÉSERVE já tem: **Ecossistema de Aquisição de Hóspedes**. Criar página `/ecossistema` explicando o método em etapas — isso vira o diferencial de marca que nenhum concorrente copia |
| **Prova de especialização técnica** | Reprotel: "certificada Google Hotel Ads" | Buscar certificações Google Partner / Meta Business Partner e exibir selos quando obtidas |
| **Números institucionais** | "20 anos", "dezenas de hotéis", "15k cliques em 3 meses" | Usar os números reais do piloto: "+150 leads gerados em campanhas" (dado interno já existente) — honesto e concreto |

**Diferencial que a RÉSERVE tem e os concorrentes não exploram:** automação de atendimento com IA no WhatsApp integrada à geração de demanda (o gargalo real da hotelaria é atendimento, não lead). Nenhum dos concorrentes pesquisados posiciona isso como produto central — Asksuite existe, mas é software, não agência. A página `/automacao-atendimento` (já existe no footer) deve virar página forte com o argumento: *lead que espera mais de 5 minutos esfria; o hotel perde reserva no atendimento, não no anúncio*.

## 5.3 Calendário editorial — 90 dias (1 pillar page + artigos de suporte por cluster)

Formato dos artigos: 1.800–2.500 palavras, H2/H3 respondendo perguntas reais, FAQ com schema no final, CTA para `/diagnostico`, 2–3 links internos entre artigos do mesmo cluster e para a página de serviço correspondente.

**Mês 1 — Cluster "Motor de Reservas" (maior volume de impressões, página de serviço já existe):**
1. `Motor de reservas para hotel: o que é, como funciona e como escolher em 2026` → pillar, linka para `/motor-de-reservas`
2. `Omnibees, Stays ou TOTVS: comparativo de motores de reserva para pousadas` (a RÉSERVE integra os três — autoridade real)
3. `Quanto custa um motor de reservas — e quando ele se paga`

**Mês 2 — Cluster "Reservas Diretas" (termo central do posicionamento):**
4. `Reservas diretas: guia completo para reduzir dependência das OTAs`
5. `Quanto seu hotel perde em comissão de OTA (com calculadora)` — considerar uma calculadora interativa simples: é linkável e diferencia
6. `Click-to-WhatsApp para hotéis: como transformar anúncio em reserva` (conecta com o produto de automação)

**Mês 3 — Cluster "Google Hotel Ads + Marketing Hoteleiro":**
7. `Google Hotel Ads: guia para hotéis independentes e pousadas`
8. `Marketing hoteleiro em 2026: o que funciona para pousadas de até 20 quartos` (nicho onde a RÉSERVE compete de verdade — long tail com menos concorrência)
9. `Por que seu hotel gera leads no WhatsApp e não fecha reservas` — artigo-tese da RÉSERVE, insight próprio da agência

## 5.4 SEO técnico e on-page

1. **Schema markup (JSON-LD):**
   - Home: `Organization` (ou `ProfessionalService`) com logo, sameAs (Instagram), address, telephone
   - Páginas de serviço: `Service` + `BreadcrumbList`
   - Artigos: `Article` com autor nomeado (E-E-A-T: criar página de autor para Nicolly e Gabriel com bio)
   - FAQs: `FAQPage`
2. **Title/meta description únicos por página** com a keyword do cluster no início. Auditar os atuais — páginas de serviço do footer (`/gestao-de-canais`, `/meta-ads` etc.) precisam de conteúdo real (mínimo 600–900 palavras cada), não podem ser páginas finas.
3. **Interlinking:** toda página de serviço linka para 2–3 artigos do cluster e vice-versa. Home linka para as páginas de serviço com anchor text descritivo (já ocorre no footer — adicionar também no corpo).
4. **Sitemap.xml + robots.txt** verificados e submetidos no GSC (conferir se todas as páginas de serviço estão indexadas — usar Inspeção de URL).
5. **Google Business Profile** da agência (Campo Belo/região) — impacta "agencia de marketing para hotel" com intenção local e gera o knowledge panel.
6. **Componente de clientes/cases na home** (item já planejado): incluir `Review`/`AggregateRating` schema apenas quando houver depoimentos reais dos clientes.

---

# PARTE 6 — CHECKLIST DE EXECUÇÃO PRIORIZADO

## Sprint 1 — Bugs e desempenho (impacto imediato nos scores)
- [ ] Remover/isolar Firebase Auth da homepage (1.1)
- [ ] Converter e redimensionar TODAS as imagens: check.png, airnb.png, pousada.png, hotel&resort.webp (renomear), seedsbackground.png (1.2)
- [ ] Migrar `<img>` para `next/image` em todo o site
- [ ] Corrigir hydration error React #418 (1.3)
- [ ] Migrar fontes para `next/font/local` com preload (2.1)
- [ ] Browserslist moderno — eliminar polyfills legados (2.2)
- [ ] Bundle analyzer no chunk 148 — tree-shaking de ícones e libs (2.2)
- [ ] Cache-Control immutable em /img e /fonts (2.3)
- [ ] Revalidar PageSpeed: meta ≥ 95 nos dois devices

## Sprint 2 — Acessibilidade e segurança
- [ ] Corrigir contraste header + footer com novos tokens de cor (3.1)
- [ ] `aria-label` no mobile-nav-toggler (3.2) — resolve também Navegação Agêntica
- [ ] Área de toque ≥ 24px nos dots do carrossel (3.3)
- [ ] Hierarquia h1→h2→h3 na home (3.4)
- [ ] Headers de segurança: CSP, HSTS, COOP, XFO, nosniff (Parte 4)
- [ ] Revalidar: 100 em Acessibilidade e Práticas Recomendadas

## Sprint 3 — Conteúdo e autoridade
- [ ] Componente "Clientes" na home (Dona Tereza + Estância Mineira)
- [ ] Landing `/diagnostico` com formulário
- [ ] Página `/ecossistema` (metodologia nomeada)
- [ ] Reforçar `/automacao-atendimento` como página-produto
- [ ] Engordar páginas de serviço finas (600–900 palavras cada)
- [ ] Schema JSON-LD em todas as páginas
- [ ] Publicar artigos 1–3 (cluster motor de reservas)
- [ ] Google Business Profile

## Sprint 4–12 (contínuo)
- [ ] 3 artigos/mês seguindo o calendário (5.3)
- [ ] Revisão mensal do GSC: consultas novas → ajustar pauta
- [ ] Meta 90 dias: posição média < 30 nas 5 top queries; meta 180 dias: primeira página em "agencia de marketing para hotel" e "marketing hoteleiro" long-tail

---

## Nota final sobre expectativa

Os scores 100/100 de desempenho, acessibilidade e práticas recomendadas são atingíveis nos Sprints 1–2 — os problemas são concentrados (uma imagem de 8,6 MB, um SDK mal configurado e ajustes de cor/aria). Já a posição média depende de conteúdo + tempo de domínio: o plano da Parte 5 é o que encurta essa curva, porque as SERPs das suas top consultas são vencidas por profundidade de conteúdo e prova social, não por autoridade bruta de domínio. O componente de clientes com as duas permutas é exatamente o tipo de sinal que falta hoje.
