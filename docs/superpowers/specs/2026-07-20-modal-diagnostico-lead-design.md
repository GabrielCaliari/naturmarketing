# Modal de Diagnóstico Gratuito (Captura de Lead em 3 Etapas) — Design

**Data:** 2026-07-20
**Status:** Aprovado para planejamento

## Problema

Hoje, todos os CTAs de "Diagnóstico Gratuito" ou levam para a página `/diagnostico`
ou vão direto para o WhatsApp com uma mensagem genérica. O time de vendas recebe a
conversa sem os dados da hospedagem, sem saber o tipo de negócio e sem saber quais
serviços interessam ao lead. Isso torna o atendimento lento e dificulta marcar reunião.

## Objetivo

Substituir os CTAs de diagnóstico por um **modal de captura em 3 etapas** que coleta os
dados essenciais do lead e, ao final, redireciona para o WhatsApp com uma mensagem já
montada contendo tudo. O time de vendas inicia o atendimento já sabendo quem é o cliente,
que tipo de hospedagem tem e quais serviços quer.

## Decisões (confirmadas no brainstorming)

| Tema | Decisão |
|---|---|
| Alcance | **Todos** os CTAs de "Diagnóstico Gratuito" do site abrem o modal. |
| Persistência | **Só WhatsApp** — o modal monta a mensagem e redireciona. Sem backend. |
| Serviços (etapa 2) | Conjunto **curado em combos** que cobre todos os serviços. |
| Botão flutuante de WhatsApp (`FloatingSocial`) | **Continua indo direto** ao WhatsApp (não abre o modal). |
| Página `/diagnostico` | **Mantida** (SEO); o formulário inline é trocado por CTAs que abrem o modal. |
| Telefone/WhatsApp na etapa 1 | **Não coletar** — o número já aparece para a equipe quando a pessoa manda a mensagem. |
| Idiomas | Bilíngue **pt/en** via `LocaleContext`. |
| Dependências novas | **Nenhuma.** React Context + `useState` + `framer-motion` (já instalado). |

## Arquitetura

### Componentes / unidades

1. **`LeadModalContext` + `LeadModalProvider`** (`src/context/LeadModalContext.tsx`)
   - Estado global do modal: `isOpen`, `open()`, `close()`.
   - `useLeadModal()` expõe esses três para qualquer componente.
   - Montado no layout público (`src/app/(public)/layout.tsx`), ao lado dos providers existentes.
   - **Por quê Context e não zustand:** zustand não está instalado; o estado é trivial
     (um booleano). Context evita uma dependência nova.

2. **`LeadModal`** (`src/components/LeadModal/index.tsx`)
   - Renderizado **uma única vez** no layout público (dentro do provider).
   - Controla o passo atual (`1 | 2 | 3`), guarda o estado do formulário e as transições
     com `framer-motion` (`AnimatePresence`, mesmo padrão do projeto de referência).
   - Fecha por overlay, botão X e tecla `Esc`; trava o scroll do body enquanto aberto.
   - Textos em objeto `content = { pt, en }`, escolhido por `locale` (padrão do projeto,
     igual ao `DiagnosticoContent`).

3. **`DiagnosticoCTA`** (`src/components/DiagnosticoCTA/index.tsx`)
   - Botão client reutilizável que chama `useLeadModal().open()` no clique.
   - Prop `variant` para cobrir os estilos de CTA já usados (ex.: `"header"`,
     `"header-mobile"`, `"pill-brown"`, `"pill-green"`, `"footer-link"`).
   - Prop `label` opcional (default por locale) e `trackId` para `trackButtonClick`.
   - Permite que **páginas server** (as de serviço) troquem o `<Link href="/diagnostico">`
     por este botão sem virar client component inteiro.

4. **`buildDiagnosticoMessage(data, locale)`** (`src/lib/whatsapp.ts`)
   - Função pura que recebe os dados do lead + locale e devolve a string da mensagem.
   - Reaproveita `buildWhatsAppUrl` já existente.
   - Testável isoladamente (dado um objeto de lead → string esperada).

### Fluxo de dados

```
CTA (DiagnosticoCTA)  →  useLeadModal().open()  →  LeadModal abre no passo 1
        │
        ▼
Passo 1 (dados) → valida → Passo 2 (serviços) → valida (≥1 combo)
        │
        ▼
Passo 3 (sucesso). No clique final (gesto do usuário):
   buildDiagnosticoMessage(state, locale) → buildWhatsAppUrl(msg)
   → window.open(url, "_blank", "noopener,noreferrer")
   + botão fallback "Abrir WhatsApp" na própria tela de sucesso.
```

O `window.open` acontece **no gesto de clique** (não em `useEffect`) para não ser
bloqueado por popup blocker.

## Detalhe das etapas

### Etapa 1 — Dados da pessoa
- **Nome completo** — obrigatório.
- **Nome da hospedagem** — obrigatório. Label genérica:
  "Nome da sua hospedagem (hotel, pousada, resort, Airbnb...)".
- **Tipo de hospedagem** — select opcional: Hotel / Pousada / Resort / Airbnb / Outro.
- **Tem site?** — toggle Não / Sim; ao marcar Sim, aparece campo de link (opcional).
- **Instagram ativo?** — toggle Não / Sim; ao marcar Sim, aparece campo de @ (opcional).
- *(Sem telefone/WhatsApp.)*

Validação: só avança se nome completo e nome da hospedagem estiverem preenchidos.

### Etapa 2 — O que você precisa (combos, marca 1 ou mais)

| Combo (label pt) | Cobre |
|---|---|
| Reservas diretas (Site + Motor) | Sites para hotéis, Motor de reservas, Reservas diretas |
| Anúncios & Tráfego pago | Meta Ads, Google Hotel Ads |
| SEO & Gestão de canais | SEO para hotéis, Gestão de canais |
| Atendimento automatizado (WhatsApp) | Automação de atendimento |
| Conteúdo & Audiovisual | Produção audiovisual |
| Relatórios & Performance | Relatórios de performance |
| Não sei ainda — quero um diagnóstico completo | Ecossistema / consultoria |

- Campo opcional: "Qual seu maior desafio hoje?" (textarea curta).
- Validação: pelo menos **1 combo** selecionado para avançar.
- Botão "Voltar" retorna ao passo 1 preservando os dados.

### Etapa 3 — Sucesso + redirect
- Mensagem de sucesso ("Prontinho! Vamos te levar pro WhatsApp com tudo preenchido").
- Abre o WhatsApp no clique + botão fallback "Abrir WhatsApp".
- Link para a Política de Privacidade.

### Formato da mensagem do WhatsApp (pt)
```
Olá! 👋 Me chamo *{nome}*, da *{hospedagem}*{ (tipo) se houver }.

Serviços de interesse:
• {combo 1}
• {combo 2}

{Site: {url}          — se informado}
{Instagram: {@}       — se informado}
{Maior desafio: {texto} — se informado}

Vim pelo diagnóstico gratuito do site.
```
Versão `en` equivalente. Linhas condicionais são omitidas quando o campo está vazio.

## Barra de progresso
Três marcadores no topo do modal (DADOS · SERVIÇOS · PRONTO), destacando o passo atual e
marcando os concluídos — mesmo padrão visual do modal de referência, adaptado às cores da
marca (verde `#84936f`, marrom `#994f2a`, fundo `#F0EBE3`).

## Pontos de troca dos CTAs (`Link href="/diagnostico"` ou WhatsApp genérico → `DiagnosticoCTA`)

Substituir os CTAs de **diagnóstico** por `DiagnosticoCTA` nos seguintes arquivos:

- `src/components/Header/index.tsx` — CTA desktop (l.323), mobile (l.333), menu (l.486).
- `src/components/Footer/index.tsx` — link "Diagnóstico Gratuito" (l.27).
- `src/app/(public)/home/_components/ConsultoriaBanner/index.tsx`.
- `src/app/(public)/ecossistema/_components/EcossistemaContent.tsx` — CTAs `/diagnostico`.
- `src/app/(public)/marketing-hoteleiro/_components/EmpresaContent.tsx` — CTA WA direto.
- `src/app/(public)/motor-de-reservas/_components/MotorDeReservasContent.tsx` — CTA WA direto.
- Páginas de serviço (server) com botão "Diagnóstico Gratuito" → `/diagnostico`:
  `meta-ads`, `google-hotel-ads`, `seo-para-hoteis`, `reservas-diretas`,
  `gestao-de-canais`, `automacao-atendimento`, `producao-audiovisual`,
  `relatorios-performance`.
- `src/app/(public)/blog/[slug]/_components/ArticleContent.tsx` — CTA WA direto.
- `src/app/(public)/diagnostico/_components/DiagnosticoContent.tsx` — trocar o formulário
  inline pelos botões que abrem o modal (hero CTA e o form). Página permanece por SEO.

**Não alterar:**
- `src/components/FloatingSocial/index.tsx` — continua indo direto ao WhatsApp.
- `src/app/(public)/home/_components/Contact/index.tsx` — é o formulário de contato geral
  (nome/email/telefone/mensagem), não um CTA de diagnóstico; permanece como está.

## Rastreamento (analytics)
Manter a instrumentação existente: `trackButtonClick` ao abrir o modal (por `trackId`),
`trackFormStart` ao iniciar o passo 1, `trackFormSubmit("diagnostico_modal", true)` ao
concluir o passo 3. Tudo já gated por consentimento LGPD (sem mudança nessa camada).

## Fora de escopo (YAGNI)
- Persistência do lead em backend (e-mail/Firestore).
- Alteração do botão flutuante de WhatsApp.
- Alteração do formulário de contato geral da home.
- Novas dependências (react-hook-form, zod, zustand).

## Critérios de sucesso
- Clicar em qualquer CTA de "Diagnóstico Gratuito" abre o modal (sem navegar para outra página).
- O modal valida os campos obrigatórios e exige ≥1 combo.
- Ao concluir, o WhatsApp abre com a mensagem contendo nome, hospedagem, tipo, serviços,
  site/Instagram (se informados) e desafio (se informado).
- Funciona em pt e en.
- `npm run build` e `npm run lint` passam sem erros.
- Nenhuma dependência nova no `package.json`.
```
