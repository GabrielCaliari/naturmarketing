# Hero, animações, carrossel e blog — design

Data: 2026-08-03
Branch: `feat/modal-diagnostico-lead`

Quatro frentes independentes de acabamento visual, aprovadas em brainstorming.
Projeto de referência para carrossel e blog: `C:\Users\gabri\Git\frontend_pages_allbrickpavers`.

---

## 1. Hero — reduzir o overlay marrom

**Problema.** `src/app/(public)/home/_components/Banner/index.tsx:33-36` pinta um overlay
chapado `rgba(90, 45, 15, 0.62)` sobre a foto de fundo. 62% de marrom saturado apaga a
imagem e deixa a seção com aparência alaranjada.

**Solução.** Substituir por um gradiente vertical:

```css
linear-gradient(to bottom,
  rgba(60,30,10,0.55) 0%,
  rgba(60,30,10,0.22) 45%,
  rgba(60,30,10,0.60) 100%)
```

O tom base muda de `90,45,15` para `60,30,10` — mais escuro e menos saturado, o que remove
a lavagem alaranjada. A faixa central de 0.22 deixa a foto aparecer; as extremidades escuras
sustentam o badge (topo) e os CTAs (base).

**Critério de aceite.** O `<h1>` branco sobre a faixa de 0.22 precisa manter contraste
>= 4.5:1. Se não mantiver, adicionar `text-shadow: 0 1px 12px rgba(0,0,0,0.35)` ao `<h1>` e
ao subtítulo — **não** escurecer o gradiente de volta.

---

## 2. Animações de entrada

**Contexto.** As animações não foram removidas: o commit `4bd5b34 "feat: 100/100"`
(02/07/2026) trocou o framer-motion (`motion.div` + `variants` fadeLeft/fadeRight,
`x: ±48`, `duration: 0.8`) pelo componente CSS `src/components/Reveal/index.tsx`, para
atingir PageSpeed 100/100. Manter a abordagem CSS é decisão firme — o framer-motion não volta.

### 2a. Corrigir o `Reveal`

**Bug.** Em `src/styles/globals.css:835-841`, `.reveal-pending` declara `transition`. No
carregamento o elemento pinta visível (SSR não aplica classe nenhuma), o JS aplica
`.reveal-pending`, e ele **desaparece animando** por 0.65s antes de reaparecer no scroll.

**Correção.** Remover a `transition` de `.reveal-pending`; ela fica apenas em `.reveal-in`.
O elemento passa a esconder instantaneamente e só a entrada anima.

**Intensidade.** Devolver o peso do framer-motion original:

| | atual | novo |
|---|---|---|
| `.reveal-from-up` | `translateY(30px)` | `translateY(48px)` |
| `.reveal-from-right` | `translateX(40px)` | `translateX(48px)` |
| `.reveal-from-left` | `translateX(-40px)` | `translateX(-48px)` |
| duração da transição | `0.65s` | `0.8s` |
| `threshold` do observer | `0` (default) | `0.15` |

`rootMargin` continua `0px 0px -8% 0px`. O bloco
`@media (prefers-reduced-motion: reduce)` continua neutralizando tudo.

### 2b. Espalhar o `Reveal`

Hoje só a Home e `marketing-hoteleiro` usam `Reveal`. Aplicar aos arquivos de conteúdo das
demais páginas públicas, seguindo o padrão já estabelecido na Home:

- cabeçalho de seção (label + `h2` + parágrafo) envolto num `Reveal` sem delay;
- grids de cards: um `Reveal` por card com `delay={i * 60}`;
- blocos lado a lado: `from="left"` e `from="right"` com `delay={180}` no segundo.

Arquivos alvo (todos em `src/app/(public)/`):
`ecossistema/_components/EcossistemaContent.tsx`,
`google-hotel-ads/_components/GoogleHotelAdsContent.tsx`,
`motor-de-reservas/_components/MotorDeReservasContent.tsx`,
`reservas-diretas/_components/ReservasDiretasContent.tsx`,
`seo-para-hoteis/_components/SeoParaHoteisContent.tsx`,
`diagnostico/_components/DiagnosticoContent.tsx`,
`contato/_components/ContatoContent.tsx`,
`sites-para-hoteis/page.tsx`, `consultoria-sucesso/page.tsx`,
`meta-ads/page.tsx`, `gestao-de-canais/page.tsx`,
`automacao-atendimento/page.tsx`, `producao-audiovisual/page.tsx`,
`relatorios-performance/page.tsx`.

Fora do escopo: páginas legais (`privacy-policy`, `terms-and-conditions`), `contact-us`,
`not-found`. Os arquivos do blog recebem `Reveal` dentro da frente 4, para evitar edições
concorrentes.

**Restrição.** `Reveal` é `"use client"`. Ao envolver conteúdo em `page.tsx` que hoje é
Server Component, não adicionar `"use client"` no arquivo inteiro — `Reveal` já cria a
fronteira de cliente sozinho.

### 2c. Remover `framer-motion`

Zero imports em `src/`. Remover de `package.json` e atualizar o lockfile.

---

## 3. Carrossel de clientes

**Alvo.** `src/app/(public)/home/_components/ClientesCarousel/index.tsx`, renderizado em
`OQueFazemos/index.tsx:219`.

**Referência.** `PhotoMarquee` em
`src/presentation/components/organisms/home-page-sections/OurWorkSection.tsx` do allbrickpavers.

| | atual | novo |
|---|---|---|
| bordas das fotos | quadradas, coladas | `rounded-xl`, `gap-4 sm:gap-5` |
| laterais | corte seco | máscaras de gradiente, `w-12 sm:w-20 lg:w-32` |
| hover | nenhum | `scale-110` em 500ms + overlay `from-black/30` |
| duração | 60s | 60s (mantém) |

**Adaptações obrigatórias em relação à referência:**

1. **Cor das máscaras.** O allbrickpavers usa `from-white`. A seção `OQueFazemos` tem fundo
   `#F0EBE3` — usar essa cor, senão aparece uma faixa branca errada. Como não é uma cor do
   tema Tailwind, aplicar via `style` com
   `linear-gradient(to right, #F0EBE3, transparent)` e o espelho à direita.
2. **`object-cover`, não `object-contain`.** A referência usa `contain`; com fotos em
   proporções variadas isso deixaria buracos entre os cards.
3. **Manter `useAutoScrollVisible`** e as classes `animate-scroll-infinite-seamless` /
   `is-playing`, que pausam a animação fora da viewport.
4. O container das máscaras precisa de `relative` e as máscaras de
   `pointer-events-none absolute inset-y-0 z-10`.

---

## 4. Blog

**Referências no allbrickpavers:** `atoms/ui/blog-card.tsx`,
`organisms/blog/article-detail.tsx`, `organisms/blog/blog-reading-progress.tsx`.

O que **não** muda: paleta, badge de categoria, breadcrumb, divisões
"Destaques" / "Todos os artigos", related posts, banner de CTA, `BreadcrumbJsonLd`.

Nenhum campo novo é adicionado a `src/data/blog-meta.ts` ou `src/data/blog-posts.ts`.

### 4a. Card — `blog/_components/BlogPageContent.tsx`

Trocar o rodapé atual (que repete a data já mostrada no topo do card) por um affordance de
link no padrão da referência:

```
Ler mais →
```

com a seta em `group-hover:translate-x-1 transition-transform duration-300`, na cor
`BRAND_BROWN`. O resto do card permanece.

### 4b. Artigo — `blog/[slug]/_components/ArticleContent.tsx`

- **Bloco de autor**, logo abaixo do `<h1>`, absorvendo a linha de meta que já existe:
  logo da Réserve como avatar circular (48px), nome "Equipe Réserve", e abaixo
  `data • X min de leitura`.
- **Bio do autor** no rodapé, antes do banner de CTA, em caixa `BG_CARD` com borda
  `BORDER` e avatar de 64px — mesma estrutura do `article-detail.tsx`.
- **Tags de keywords** ao final do conteúdo, antes da bio: `post.keywords` renderizado como
  pills. Os dados já existem e hoje só alimentam o `<head>` e o JSON-LD.
- **Barra de progresso de leitura**: novo componente
  `src/app/(public)/blog/[slug]/_components/ReadingProgress.tsx`, barra fixa no topo
  (`h-1`, `z-50`) na cor `BRAND_BROWN`.
  A referência chama `setState` em todo evento de scroll, sem throttle — **não copiar**.
  Usar `requestAnimationFrame` com flag de coalescência e `{ passive: true }` no listener.
- **Tipografia** do `.article-content` em `globals.css`: hierarquia de `h2`/`h3`,
  largura de linha confortável, ritmo vertical, `blockquote` e listas.

Autor e bio são constantes locais do componente — sem campo por post.

### 4c. JSON-LD

`blog/[slug]/page.tsx` mantém `author: { "@type": "Organization" }`, coerente com o autor
fixo da agência. Nenhuma mudança.

---

## Verificação

`npm run lint` e `npm run build` precisam passar ao final. Não há suíte de testes no projeto.
