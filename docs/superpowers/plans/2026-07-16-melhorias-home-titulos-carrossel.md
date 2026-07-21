# Melhorias Home: Títulos dos Cards + Carrossel de Clientes — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Dar mais destaque aos títulos dos cards das seções "Resultados" e "Como Atuamos", aumentar os cards de serviços no mobile, e inserir um carrossel infinito de fotos de clientes entre os cards de serviços e o CTA de diagnóstico.

**Architecture:** Ajustes de classes Tailwind em dois componentes existentes (`ResultadosSection`, `OQueFazemos`). Novo componente `ClientesCarousel` que reutiliza a animação CSS `animate-scroll-infinite-seamless` e o hook `useAutoScrollVisible` já existentes no projeto (hoje local em `PlataformasSection` — será extraído para `src/hooks/`). O carrossel é inserido dentro da seção `OQueFazemos`, full-bleed, entre os cards e a faixa de CTA.

**Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS v4, next/image.

## Global Constraints

- **NUNCA rodar `git commit`** — o usuário controla quando commitar (preferência explícita do usuário; sobrepõe o passo de commit padrão dos templates).
- Não há suíte de testes no projeto. Verificação = `npm run lint` + `npm run build` (ambos devem passar sem novos erros) + verificação visual quando indicada.
- Arquivos `.HEIC` de `public/img/clientes` NÃO entram no carrossel (navegadores não renderizam HEIC): excluir `IMG_4148.HEIC`, `IMG_4763.HEIC`, `IMG_4783.HEIC`.
- Ordem "aleatória" das imagens = ordem embaralhada FIXA hardcoded no array (shuffle em runtime causa mismatch de hidratação SSR/cliente).
- Imagens do carrossel sem espaçamento entre elas (sem `gap`, sem margens, sem border-radius) — coladas umas nas outras.
- Manter o padrão visual existente: cores de marca (`#84936f`, `#5d6b4c`, `#994f2a`, fundo `#F0EBE3`), componente `Reveal`, i18n via `useLocale`.

---

### Task 1: Aumentar títulos dos cards da seção Resultados

**Files:**
- Modify: `src/app/(public)/home/_components/ResultadosSection/index.tsx` (linhas 54 e 81)

**Interfaces:**
- Consumes: nada de outras tasks.
- Produces: nada consumido por outras tasks (mudança puramente visual).

Contexto: cada card tem três textos — o número grande (`stat.value`, 52px), o **título** (`stat.label`, hoje 12px uppercase) e a descrição (`stat.desc`, 14px). O título está quase do mesmo tamanho da descrição e não se destaca. Aumentá-lo nos dois layouts (desktop e mobile).

- [ ] **Step 1: Aumentar o título no grid desktop**

No bloco "Desktop grid", trocar a linha do label. De:

```tsx
              <span className="text-[12px] font-semibold tracking-wide uppercase" style={{ color: "rgba(255,255,255,0.9)" }}>
                {stat.label}
              </span>
```

Para:

```tsx
              <span className="text-[18px] font-semibold leading-snug uppercase" style={{ color: "#ffffff", letterSpacing: "0.02em" }}>
                {stat.label}
              </span>
```

- [ ] **Step 2: Aumentar o título no layout mobile**

No bloco "Mobile", trocar a linha do label. De:

```tsx
                <span className="text-[11px] font-semibold tracking-wide uppercase" style={{ color: "rgba(255,255,255,0.9)" }}>
                  {stat.label}
                </span>
```

Para:

```tsx
                <span className="text-[16px] font-semibold leading-snug uppercase" style={{ color: "#ffffff", letterSpacing: "0.02em" }}>
                  {stat.label}
                </span>
```

- [ ] **Step 3: Verificar lint e build**

Run: `npm run lint` → esperado: sem novos erros.
Run: `npm run build` → esperado: build completa com sucesso.

- [ ] **Step 4: NÃO commitar** (o usuário controla os commits)

---

### Task 2: Destacar títulos e ampliar cards de serviços (Como Atuamos) no mobile

**Files:**
- Modify: `src/app/(public)/home/_components/OQueFazemos/index.tsx` (função `BentoCard`, linhas 77–109)

**Interfaces:**
- Consumes: nada de outras tasks.
- Produces: `BentoCard` continua com a mesma assinatura `{ icon, titulo, descricao }` — a Task 4 modifica o mesmo arquivo, mas em outra região (JSX da seção).

Contexto: `BentoCard` é usado tanto no grid desktop quanto no carrossel mobile. Hoje: título 15px, descrição 13px, `minHeight: 220px`. Objetivo: título maior nos dois breakpoints; no mobile, card maior com textos e ícone maiores para preencher o espaço (sem "buraco" em branco).

- [ ] **Step 1: Substituir a função `BentoCard` inteira**

De:

```tsx
function BentoCard({ icon, titulo, descricao }: { icon: React.ReactNode; titulo: string; descricao: string }) {
  return (
    <div
      className={[
        "group flex flex-col items-center text-center gap-3 px-5 py-6 rounded-2xl h-full",
        "transition-all duration-500 cursor-default",
        "hover:bg-[#84936f] hover:shadow-lg hover:-translate-y-1",
      ].join(" ")}
      style={{ background: BG_CARD, border: `1px solid ${BORDER}`, minHeight: "220px" }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:bg-white/15"
        style={{ background: "rgba(132,147,111,0.12)", color: BRAND_GREEN }}
      >
        {icon}
      </div>
      <div className="flex flex-col gap-1.5 flex-1">
        <h3
          className="text-[15px] font-semibold leading-tight transition-colors duration-500 group-hover:text-white"
          style={{ color: TEXT_HEAD }}
        >
          {titulo}
        </h3>
        <p
          className="text-[13px] leading-[1.65] font-light transition-colors duration-500 group-hover:text-white/80"
          style={{ color: TEXT_BODY }}
        >
          {descricao}
        </p>
      </div>
    </div>
  );
}
```

Para:

```tsx
function BentoCard({ icon, titulo, descricao }: { icon: React.ReactNode; titulo: string; descricao: string }) {
  return (
    <div
      className={[
        "group flex flex-col items-center text-center gap-4 md:gap-3 px-6 py-8 md:px-5 md:py-6 rounded-2xl h-full",
        "min-h-[290px] md:min-h-[230px]",
        "transition-all duration-500 cursor-default",
        "hover:bg-[#84936f] hover:shadow-lg hover:-translate-y-1",
      ].join(" ")}
      style={{ background: BG_CARD, border: `1px solid ${BORDER}` }}
    >
      <div
        className="w-14 h-14 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:bg-white/15"
        style={{ background: "rgba(132,147,111,0.12)", color: BRAND_GREEN }}
      >
        {icon}
      </div>
      <div className="flex flex-col gap-2 md:gap-1.5 flex-1">
        <h3
          className="text-[20px] md:text-[18px] font-semibold leading-tight transition-colors duration-500 group-hover:text-white"
          style={{ color: TEXT_HEAD }}
        >
          {titulo}
        </h3>
        <p
          className="text-[15px] md:text-[13px] leading-[1.65] font-light transition-colors duration-500 group-hover:text-white/80"
          style={{ color: TEXT_BODY }}
        >
          {descricao}
        </p>
      </div>
    </div>
  );
}
```

Racional: `minHeight` saiu do `style` inline para classes responsivas (`min-h-[290px]` mobile / `md:min-h-[230px]` desktop). Título 15→20px no mobile e 18px no desktop (destaque claro sobre a descrição). Descrição, ícone, paddings e gaps maiores no mobile para acompanhar o crescimento do card.

- [ ] **Step 2: Verificar lint e build**

Run: `npm run lint` → esperado: sem novos erros.
Run: `npm run build` → esperado: build completa com sucesso.

- [ ] **Step 3: NÃO commitar** (o usuário controla os commits)

---

### Task 3: Extrair hook `useAutoScrollVisible` para `src/hooks/`

**Files:**
- Create: `src/hooks/useAutoScrollVisible.ts`
- Modify: `src/app/(public)/home/_components/PlataformasSection/index.tsx` (linhas 1–26)

**Interfaces:**
- Consumes: nada de outras tasks.
- Produces: `useAutoScrollVisible<T extends HTMLElement>(): { ref: React.MutableRefObject<T | null>; visible: boolean }` — named export de `@/hooks/useAutoScrollVisible`. A Task 4 importa exatamente isto.

Contexto: o hook hoje é uma função local dentro de `PlataformasSection`. O novo `ClientesCarousel` (Task 4) precisa do mesmo comportamento (pausar a animação fora da viewport). DRY: extrair para `src/hooks/`.

- [ ] **Step 1: Criar `src/hooks/useAutoScrollVisible.ts`**

```ts
"use client";

import { useEffect, useRef, useState } from "react";

// Só liga a animação (transform infinito) quando o carrossel está visível —
// evita o compositor rodando continuamente fora de tela enquanto a página carrega.
export function useAutoScrollVisible<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, visible };
}
```

- [ ] **Step 2: Usar o hook extraído em `PlataformasSection`**

Em `src/app/(public)/home/_components/PlataformasSection/index.tsx`, remover a definição local do hook (linhas 8–26, incluindo o comentário acima dela) e ajustar os imports. O topo do arquivo, que hoje é:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { useLocale } from "@/context/LocaleContext";

// Só liga a animação (transform infinito) quando o carrossel está visível —
// evita o compositor rodando continuamente fora de tela enquanto a página carrega.
function useAutoScrollVisible<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, visible };
}
```

Vira:

```tsx
"use client";

import Image from "next/image";
import Reveal from "@/components/Reveal";
import { useLocale } from "@/context/LocaleContext";
import { useAutoScrollVisible } from "@/hooks/useAutoScrollVisible";
```

Atenção: `useEffect`, `useRef` e `useState` só eram usados pelo hook local — confirmar com busca no arquivo que nenhum outro trecho os usa antes de remover o import de `react`. Se algum for usado em outro ponto, manter apenas os necessários. O restante do arquivo permanece intacto (as chamadas `useAutoScrollVisible<HTMLDivElement>()` já existentes continuam funcionando).

- [ ] **Step 3: Verificar lint e build**

Run: `npm run lint` → esperado: sem novos erros.
Run: `npm run build` → esperado: build completa com sucesso (confirma que `PlataformasSection` compila com o hook importado).

- [ ] **Step 4: NÃO commitar** (o usuário controla os commits)

---

### Task 4: Criar `ClientesCarousel` e inserir entre os cards e o CTA de diagnóstico

**Files:**
- Create: `src/app/(public)/home/_components/ClientesCarousel/index.tsx`
- Modify: `src/app/(public)/home/_components/OQueFazemos/index.tsx` (estrutura do JSX da seção)

**Interfaces:**
- Consumes: `useAutoScrollVisible` de `@/hooks/useAutoScrollVisible` (Task 3); classes CSS globais `animate-scroll-infinite-seamless` / `is-playing` já existentes em `src/styles/globals.css` (não modificar o CSS).
- Produces: `ClientesCarousel` — default export, sem props.

Contexto: o carrossel é uma faixa horizontal infinita de fotos de clientes (pasta `public/img/clientes`), imagens coladas (sem gap), rolando continuamente. Vai DENTRO da seção `OQueFazemos`, entre os cards de serviços e a faixa de CTA "Solicite um diagnóstico gratuito", em largura total (full-bleed, fora do `section-container`). A animação existente translada `-50%`, então o conteúdo é duplicado uma vez para o loop ser contínuo.

- [ ] **Step 1: Criar `src/app/(public)/home/_components/ClientesCarousel/index.tsx`**

```tsx
"use client";

import Image from "next/image";
import { useAutoScrollVisible } from "@/hooks/useAutoScrollVisible";

// Fotos de public/img/clientes em ordem embaralhada FIXA — um shuffle em
// runtime renderizaria ordens diferentes no servidor e no cliente (erro de
// hidratação). Arquivos .HEIC excluídos: navegadores não renderizam HEIC.
const FOTOS = [
  "/img/clientes/IMG_5619.jpg",
  "/img/clientes/28D676B2-2D80-4D92-8BA5-2115E3E79C22.png",
  "/img/clientes/IMG_5188.jpg",
  "/img/clientes/piscina.JPG",
  "/img/clientes/IMG_5585.jpg",
  "/img/clientes/IMG_E5318.jpg",
  "/img/clientes/IMG_5134.jpg",
  "/img/clientes/61FE9AB7-9D2F-4A3F-B0D5-5CE1BB2FF96B.png",
  "/img/clientes/IMG_5586.jpg",
  "/img/clientes/IMG_5190.jpg",
  "/img/clientes/IMG_5732.jpg",
  "/img/clientes/IMG_5584.jpg",
];

export default function ClientesCarousel() {
  const scroll = useAutoScrollVisible<HTMLDivElement>();
  // Duplicado uma vez: a animação translada -50%, então duas cópias = loop contínuo
  const fotos = [...FOTOS, ...FOTOS];

  return (
    <div ref={scroll.ref} className="overflow-hidden">
      <div
        className={`animate-scroll-infinite-seamless${scroll.visible ? " is-playing" : ""}`}
        style={{ animationDuration: "60s" }}
      >
        {fotos.map((src, i) => (
          <div key={`${src}-${i}`} className="h-[180px] md:h-[240px] shrink-0">
            <Image
              src={src}
              alt="Foto de hotel cliente da Réserve"
              width={480}
              height={320}
              quality={70}
              sizes="(max-width: 768px) 300px, 400px"
              className="h-full w-auto max-w-none object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
```

Notas de implementação:
- Sem `gap`, sem margens, sem `rounded` — as imagens ficam coladas ("tudo junto"), como pedido.
- `max-w-none` é obrigatório: sem ele, algum reset `max-width: 100%` em `img` esmagaria imagens mais largas que o viewport.
- `animationDuration: "60s"` inline sobrepõe os 12s/10s da classe global (ritmo de fotos é mais lento que o de logos).
- `quality={70}` está dentro de `qualities: [70, 85]` do `next.config.ts` — usar outro valor quebraria o build.

- [ ] **Step 2: Inserir o carrossel em `OQueFazemos` entre os cards e o CTA**

Em `src/app/(public)/home/_components/OQueFazemos/index.tsx`:

2a. Adicionar o import junto aos demais imports do topo:

```tsx
import ClientesCarousel from "../ClientesCarousel";
```

2b. Reestruturar o JSX do `return` para o carrossel ficar full-bleed (fora do `section-container`) entre os cards e o CTA. Hoje a estrutura é:

```tsx
    <section id="services" className="py-10 md:py-16" style={{ background: "#F0EBE3" }}>
      <div className="section-container">
        {/* header (Reveal) */}
        {/* Desktop grid */}
        {/* Mobile carousel */}
        {/* CTA strip (Reveal com mt-10) */}
      </div>
    </section>
```

Deve virar (fechando o container após o carrossel mobile de cards, inserindo o `ClientesCarousel` full-width, e reabrindo um container para o CTA):

```tsx
    <section id="services" className="py-10 md:py-16" style={{ background: "#F0EBE3" }}>
      <div className="section-container">
        {/* header (Reveal) — inalterado */}
        {/* Desktop grid — inalterado */}
        {/* Mobile carousel (cards + dots) — inalterado */}
      </div>

      {/* Carrossel de fotos de clientes — full-bleed entre os cards e o CTA */}
      <div className="mt-10 md:mt-14">
        <ClientesCarousel />
      </div>

      <div className="section-container">
        {/* CTA strip — inalterado, exceto o espaçamento: trocar "mt-10" por "mt-10 md:mt-14" na className do Reveal */}
      </div>
    </section>
```

Concretamente: o `</div>` que fecha o `section-container` original passa a ficar logo após o `</div>` que fecha o bloco `{/* Mobile carousel */}` (o `div` com os dots de navegação, `className="md:hidden"`). Em seguida entra o bloco do `ClientesCarousel`, e o `<Reveal className="mt-10 flex flex-col ...">` do CTA (linhas 214–233 originais) é envolvido por um novo `<div className="section-container">...</div>`, mudando apenas `mt-10` para `mt-10 md:mt-14` na sua className. Nenhum texto ou atributo interno do CTA muda.

- [ ] **Step 3: Verificar lint e build**

Run: `npm run lint` → esperado: sem novos erros.
Run: `npm run build` → esperado: build completa com sucesso.

- [ ] **Step 4: Verificação visual**

Run: `npm run dev` e abrir `http://localhost:3000`.
Verificar:
1. Na seção "Como Atuamos", entre os cards de serviços e a faixa "Solicite um diagnóstico gratuito", existe uma faixa de fotos rolando continuamente da direita para a esquerda, ocupando a largura total da tela.
2. As imagens estão coladas, sem espaço entre elas.
3. O loop é contínuo (não "pula" ao reiniciar).
4. Em viewport mobile (DevTools ~390px), o carrossel também aparece e as fotos têm ~180px de altura.
5. Nenhum warning de hidratação no console.

- [ ] **Step 5: NÃO commitar** (o usuário controla os commits)

---

## Self-Review (executado na escrita do plano)

1. **Cobertura do spec:** (1) títulos dos cards de Resultados maiores → Task 1 (desktop e mobile). (2) Títulos dos cards de Como Atuamos maiores + cards mobile maiores + conteúdo interno maior → Task 2. (3) Carrossel de fotos entre cards e diagnóstico, sem espaçamento, imagens de `public/img/clientes` em ordem aleatória → Tasks 3–4. ✓
2. **Placeholders:** nenhum TBD/TODO; todos os passos têm código concreto. ✓
3. **Consistência de tipos/nomes:** `useAutoScrollVisible` (named export, Task 3) é importado com o mesmo nome na Task 4; `ClientesCarousel` (default export) importado como default. ✓
