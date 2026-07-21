# Modal de Diagnóstico Gratuito (Captura de Lead) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Substituir os CTAs de "Diagnóstico Gratuito" do site por um modal de captura de lead em 3 etapas que redireciona ao WhatsApp com uma mensagem já preenchida.

**Architecture:** Um `LeadModalProvider` (React Context) montado no layout público expõe `useLeadModal().open()`. Um único `<LeadModal />` (framer-motion, 3 passos) é renderizado no layout. Um botão client reutilizável `<DiagnosticoCTA>` substitui os CTAs espalhados e chama `open()`. Ao concluir, uma função pura monta a mensagem e abre o WhatsApp via `buildWhatsAppUrl`.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind v4, framer-motion (já instalado), `@tabler/icons-react`. Analytics via `src/lib/analytics.ts`. i18n via `useLocale()`.

## Global Constraints

- **Nenhuma dependência nova** no `package.json` (proibido react-hook-form, zod, zustand).
- Bilíngue **pt/en** via `useLocale()` de `@/context/LocaleContext` (padrão: objeto `content = { pt, en }`, seleção por `locale === "en" ? "en" : "pt"`).
- Cores da marca: verde `#84936f`, marrom `#994f2a`, fundo `#F0EBE3`, card `#FDFAF7`, texto-título `#1A0F08`, texto-corpo `#5C4F45`, borda `rgba(196,164,142,0.25)`.
- **Sem backend / sem persistência** — só monta a mensagem e abre o WhatsApp.
- `window.open` do WhatsApp deve ocorrer **dentro do gesto de clique** (nunca em `useEffect`) para não ser bloqueado.
- **Não coletar telefone/WhatsApp** na etapa 1.
- **Não alterar** `src/components/FloatingSocial/index.tsx` nem `src/app/(public)/home/_components/Contact/index.tsx`.
- Sem suíte de testes no projeto — o gate de verificação de cada tarefa é `npm run lint` + `npm run build` (e verificação manual do fluxo).
- Componentes que usam hooks/eventos são client components (`"use client"`).
- Commits são responsabilidade do usuário — **não commitar automaticamente** (preferência registrada). Onde o plano diz "Commit", pause e deixe o usuário decidir.

---

## File Structure

- `src/lib/whatsapp.ts` — **modificar**: adicionar tipo `LeadData` e função pura `buildDiagnosticoMessage(data, locale)`.
- `src/context/LeadModalContext.tsx` — **criar**: Context + Provider + `useLeadModal()`.
- `src/app/(public)/layout.tsx` — **modificar**: envolver com `LeadModalProvider` e renderizar `<LeadModal />`.
- `src/components/LeadModal/index.tsx` — **criar**: o modal de 3 passos.
- `src/components/LeadModal/constants.ts` — **criar**: combos de serviço, tipos de hospedagem, textos pt/en.
- `src/components/DiagnosticoCTA/index.tsx` — **criar**: botão client reutilizável que abre o modal.
- CTAs espalhados — **modificar**: trocar `<Link href="/diagnostico">` / WhatsApp direto por `<DiagnosticoCTA>` (Task 6).

---

## Task 1: Tipo `LeadData` e função `buildDiagnosticoMessage`

**Files:**
- Modify: `src/lib/whatsapp.ts`

**Interfaces:**
- Produces:
  - `type LeadData = { name: string; propertyName: string; propertyType?: string; hasSite: boolean; siteUrl?: string; hasInstagram: boolean; instagramHandle?: string; serviceLabels: string[]; challenge?: string; }`
  - `buildDiagnosticoMessage(data: LeadData, locale: "pt" | "en"): string`
  - (já existente) `buildWhatsAppUrl(message: string): string`

- [ ] **Step 1: Substituir o conteúdo de `src/lib/whatsapp.ts`**

```ts
import { WHATSAPP_LINK } from "@/constants/company";

/** Monta a URL de Click-to-Chat do WhatsApp com a mensagem já codificada. */
export function buildWhatsAppUrl(message: string): string {
  return `${WHATSAPP_LINK}?text=${encodeURIComponent(message)}`;
}

/** Dados coletados pelo modal de diagnóstico. */
export type LeadData = {
  name: string;
  propertyName: string;
  propertyType?: string;
  hasSite: boolean;
  siteUrl?: string;
  hasInstagram: boolean;
  instagramHandle?: string;
  /** Rótulos dos combos de serviço já resolvidos no idioma corrente. */
  serviceLabels: string[];
  challenge?: string;
};

/** Monta a mensagem de WhatsApp do diagnóstico com todos os dados do lead. */
export function buildDiagnosticoMessage(
  data: LeadData,
  locale: "pt" | "en"
): string {
  const isEn = locale === "en";
  const typeSuffix = data.propertyType ? ` (${data.propertyType})` : "";

  const greeting = isEn
    ? `Hi! 👋 My name is *${data.name}*, from *${data.propertyName}*${typeSuffix}.`
    : `Olá! 👋 Me chamo *${data.name}*, da *${data.propertyName}*${typeSuffix}.`;

  const servicesTitle = isEn ? "Services I'm interested in:" : "Serviços de interesse:";
  const servicesBlock = [servicesTitle, ...data.serviceLabels.map((s) => `• ${s}`)].join("\n");

  const details: string[] = [];
  if (data.hasSite && data.siteUrl) {
    details.push(`${isEn ? "Website" : "Site"}: ${data.siteUrl}`);
  }
  if (data.hasInstagram && data.instagramHandle) {
    details.push(`Instagram: ${data.instagramHandle}`);
  }
  if (data.challenge) {
    details.push(`${isEn ? "Biggest challenge" : "Maior desafio"}: ${data.challenge}`);
  }

  const closing = isEn
    ? "I came from the free assessment on your website."
    : "Vim pelo diagnóstico gratuito do site.";

  const blocks = [greeting, "", servicesBlock];
  if (details.length > 0) {
    blocks.push("", details.join("\n"));
  }
  blocks.push("", closing);

  return blocks.join("\n");
}
```

- [ ] **Step 2: Verificar lint e types**

Run: `npm run lint`
Expected: sem erros novos em `src/lib/whatsapp.ts`.

- [ ] **Step 3: Commit** *(pausar — usuário decide se commita)*

```bash
git add src/lib/whatsapp.ts
git commit -m "feat: buildDiagnosticoMessage para o modal de lead"
```

---

## Task 2: `LeadModalContext` e wiring no layout público

**Files:**
- Create: `src/context/LeadModalContext.tsx`
- Modify: `src/app/(public)/layout.tsx`

**Interfaces:**
- Consumes: nada.
- Produces:
  - `LeadModalProvider({ children }: { children: React.ReactNode }): JSX.Element`
  - `useLeadModal(): { isOpen: boolean; open: () => void; close: () => void }`

- [ ] **Step 1: Criar `src/context/LeadModalContext.tsx`**

```tsx
"use client";

import { createContext, useCallback, useContext, useMemo, useState, ReactNode } from "react";

type LeadModalContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const LeadModalContext = createContext<LeadModalContextValue | null>(null);

export function LeadModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const value = useMemo(() => ({ isOpen, open, close }), [isOpen, open, close]);

  return <LeadModalContext.Provider value={value}>{children}</LeadModalContext.Provider>;
}

export function useLeadModal(): LeadModalContextValue {
  const ctx = useContext(LeadModalContext);
  if (!ctx) {
    throw new Error("useLeadModal deve ser usado dentro de <LeadModalProvider>");
  }
  return ctx;
}
```

- [ ] **Step 2: Envolver o layout público e renderizar o modal**

Substituir o conteúdo de `src/app/(public)/layout.tsx` por:

```tsx
"use client";

import { LocaleProvider } from "@/context/LocaleContext";
import { LeadModalProvider } from "@/context/LeadModalContext";
import { LeadModal } from "@/components/LeadModal";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LocaleProvider>
      <LeadModalProvider>
        {children}
        <LeadModal />
      </LeadModalProvider>
    </LocaleProvider>
  );
}
```

> Nota: `LeadModal` só existe a partir da Task 3. Se executar em ordem, a Task 3 vem antes deste passo; caso contrário, este `import` quebra o build até a Task 3 estar pronta. Recomendado executar Task 3 **antes** do Step 2.

- [ ] **Step 3: Commit** *(pausar — usuário decide)*

```bash
git add src/context/LeadModalContext.tsx src/app/(public)/layout.tsx
git commit -m "feat: LeadModalProvider no layout publico"
```

---

## Task 3: Constantes do modal (combos, tipos, textos)

**Files:**
- Create: `src/components/LeadModal/constants.ts`

**Interfaces:**
- Produces:
  - `type ServiceCombo = { id: string; pt: string; en: string }`
  - `SERVICE_COMBOS: ServiceCombo[]`
  - `PROPERTY_TYPES: { pt: string[]; en: string[] }`
  - `MODAL_CONTENT: { pt: ModalCopy; en: ModalCopy }` onde `ModalCopy` cobre todos os rótulos de UI.

- [ ] **Step 1: Criar `src/components/LeadModal/constants.ts`**

```ts
export type ServiceCombo = { id: string; pt: string; en: string };

export const SERVICE_COMBOS: ServiceCombo[] = [
  { id: "canal-direto", pt: "Reservas diretas (Site + Motor)", en: "Direct bookings (Website + Booking engine)" },
  { id: "trafego", pt: "Anúncios & Tráfego pago", en: "Ads & Paid traffic" },
  { id: "seo", pt: "SEO & Gestão de canais", en: "SEO & Channel management" },
  { id: "atendimento", pt: "Atendimento automatizado (WhatsApp)", en: "Automated guest service (WhatsApp)" },
  { id: "audiovisual", pt: "Conteúdo & Audiovisual", en: "Content & Audiovisual" },
  { id: "relatorios", pt: "Relatórios & Performance", en: "Reports & Performance" },
  { id: "completo", pt: "Não sei ainda — quero um diagnóstico completo", en: "Not sure yet — I want a full assessment" },
];

export const PROPERTY_TYPES = {
  pt: ["Hotel", "Pousada", "Resort", "Airbnb", "Outro"],
  en: ["Hotel", "Inn", "Resort", "Airbnb", "Other"],
};

export type ModalCopy = {
  steps: [string, string, string];
  title: string;
  subtitle: string;
  // step 1
  nameLabel: string;
  propertyLabel: string;
  typeLabel: string;
  typePlaceholder: string;
  hasSiteQuestion: string;
  siteUrlPlaceholder: string;
  hasInstagramQuestion: string;
  instagramPlaceholder: string;
  yes: string;
  no: string;
  // step 2
  servicesTitle: string;
  servicesHint: string;
  challengeLabel: string;
  challengePlaceholder: string;
  // step 3
  successTitle: string;
  successBody: string;
  openWhatsApp: string;
  // nav
  next: string;
  back: string;
  finish: string;
  close: string;
  privacy: string;
  requiredError: string;
  servicesError: string;
};

export const MODAL_CONTENT: { pt: ModalCopy; en: ModalCopy } = {
  pt: {
    steps: ["DADOS", "SERVIÇOS", "PRONTO"],
    title: "Diagnóstico gratuito",
    subtitle: "Leva menos de 1 minuto. Já te levamos pro WhatsApp com tudo preenchido.",
    nameLabel: "Seu nome completo",
    propertyLabel: "Nome da sua hospedagem (hotel, pousada, resort, Airbnb...)",
    typeLabel: "Tipo de hospedagem (opcional)",
    typePlaceholder: "Selecione...",
    hasSiteQuestion: "Sua hospedagem tem site?",
    siteUrlPlaceholder: "Link do site (opcional)",
    hasInstagramQuestion: "Tem Instagram ativo?",
    instagramPlaceholder: "@ do Instagram (opcional)",
    yes: "Sim",
    no: "Não",
    servicesTitle: "O que você precisa?",
    servicesHint: "Escolha uma ou mais opções.",
    challengeLabel: "Qual seu maior desafio hoje? (opcional)",
    challengePlaceholder: "Ex.: dependo muito da Booking, meu site não converte...",
    successTitle: "Prontinho! 🎉",
    successBody: "Vamos te levar pro WhatsApp com tudo preenchido. Nosso time já inicia o atendimento sabendo tudo sobre a sua hospedagem.",
    openWhatsApp: "Abrir WhatsApp",
    next: "Continuar",
    back: "Voltar",
    finish: "Ir para o WhatsApp",
    close: "Fechar",
    privacy: "Ao continuar, você concorda com a nossa Política de Privacidade.",
    requiredError: "Preencha seu nome e o nome da hospedagem.",
    servicesError: "Escolha pelo menos uma opção.",
  },
  en: {
    steps: ["DETAILS", "SERVICES", "DONE"],
    title: "Free assessment",
    subtitle: "It takes under a minute. We'll take you to WhatsApp with everything filled in.",
    nameLabel: "Your full name",
    propertyLabel: "Your property's name (hotel, inn, resort, Airbnb...)",
    typeLabel: "Property type (optional)",
    typePlaceholder: "Select...",
    hasSiteQuestion: "Does your property have a website?",
    siteUrlPlaceholder: "Website link (optional)",
    hasInstagramQuestion: "Active Instagram?",
    instagramPlaceholder: "Instagram @ (optional)",
    yes: "Yes",
    no: "No",
    servicesTitle: "What do you need?",
    servicesHint: "Pick one or more options.",
    challengeLabel: "What's your biggest challenge today? (optional)",
    challengePlaceholder: "e.g. I rely too much on Booking, my site doesn't convert...",
    successTitle: "All set! 🎉",
    successBody: "We'll take you to WhatsApp with everything filled in. Our team starts the conversation already knowing all about your property.",
    openWhatsApp: "Open WhatsApp",
    next: "Continue",
    back: "Back",
    finish: "Go to WhatsApp",
    close: "Close",
    privacy: "By continuing, you agree to our Privacy Policy.",
    requiredError: "Please fill in your name and your property's name.",
    servicesError: "Please pick at least one option.",
  },
};
```

- [ ] **Step 2: Verificar lint**

Run: `npm run lint`
Expected: sem erros em `src/components/LeadModal/constants.ts`.

- [ ] **Step 3: Commit** *(pausar — usuário decide)*

```bash
git add src/components/LeadModal/constants.ts
git commit -m "feat: constantes do modal de diagnostico"
```

---

## Task 4: Componente `LeadModal` (3 etapas)

**Files:**
- Create: `src/components/LeadModal/index.tsx`

**Interfaces:**
- Consumes: `useLeadModal()` (Task 2); `SERVICE_COMBOS`, `PROPERTY_TYPES`, `MODAL_CONTENT` (Task 3); `buildDiagnosticoMessage`, `buildWhatsAppUrl`, `LeadData` (Task 1); `useLocale()`; `trackFormStart`, `trackFormSubmit` de `@/lib/analytics`.
- Produces: `export function LeadModal(): JSX.Element | null`

- [ ] **Step 1: Criar `src/components/LeadModal/index.tsx`**

```tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  IconX,
  IconArrowRight,
  IconArrowLeft,
  IconBrandWhatsapp,
  IconCheck,
} from "@tabler/icons-react";
import { useLocale } from "@/context/LocaleContext";
import { useLeadModal } from "@/context/LeadModalContext";
import { trackFormStart, trackFormSubmit } from "@/lib/analytics";
import { buildDiagnosticoMessage, buildWhatsAppUrl, type LeadData } from "@/lib/whatsapp";
import { SERVICE_COMBOS, PROPERTY_TYPES, MODAL_CONTENT } from "./constants";

const GREEN = "#84936f";
const BROWN = "#994f2a";
const BG = "#F0EBE3";
const CARD = "#FDFAF7";
const TEXT_HEAD = "#1A0F08";
const TEXT_BODY = "#5C4F45";
const BORDER = "rgba(196,164,142,0.25)";

type FormState = {
  name: string;
  propertyName: string;
  propertyType: string;
  hasSite: boolean;
  siteUrl: string;
  hasInstagram: boolean;
  instagramHandle: string;
  services: string[];
  challenge: string;
};

const EMPTY: FormState = {
  name: "",
  propertyName: "",
  propertyType: "",
  hasSite: false,
  siteUrl: "",
  hasInstagram: false,
  instagramHandle: "",
  services: [],
  challenge: "",
};

export function LeadModal() {
  const { isOpen, close } = useLeadModal();
  const { locale } = useLocale();
  const lang = locale === "en" ? "en" : "pt";
  const c = MODAL_CONTENT[lang];

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [error, setError] = useState<string | null>(null);
  const [started, setStarted] = useState(false);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleClose = useCallback(() => {
    close();
    setTimeout(() => {
      setStep(1);
      setForm(EMPTY);
      setError(null);
      setStarted(false);
    }, 300);
  }, [close]);

  // Esc + travar scroll enquanto aberto
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, handleClose]);

  const markStarted = () => {
    if (!started) {
      setStarted(true);
      trackFormStart("diagnostico_modal");
    }
  };

  const goStep2 = () => {
    if (!form.name.trim() || !form.propertyName.trim()) {
      setError(c.requiredError);
      return;
    }
    setError(null);
    setStep(2);
  };

  const finish = () => {
    if (form.services.length === 0) {
      setError(c.servicesError);
      return;
    }
    setError(null);

    const serviceLabels = SERVICE_COMBOS.filter((s) => form.services.includes(s.id)).map(
      (s) => s[lang]
    );
    const data: LeadData = {
      name: form.name.trim(),
      propertyName: form.propertyName.trim(),
      propertyType: form.propertyType || undefined,
      hasSite: form.hasSite,
      siteUrl: form.hasSite ? form.siteUrl.trim() || undefined : undefined,
      hasInstagram: form.hasInstagram,
      instagramHandle: form.hasInstagram ? form.instagramHandle.trim() || undefined : undefined,
      serviceLabels,
      challenge: form.challenge.trim() || undefined,
    };

    const url = buildWhatsAppUrl(buildDiagnosticoMessage(data, lang));
    trackFormSubmit("diagnostico_modal", true);
    window.open(url, "_blank", "noopener,noreferrer");
    setStep(3);
  };

  const openWhatsAppAgain = () => {
    const serviceLabels = SERVICE_COMBOS.filter((s) => form.services.includes(s.id)).map(
      (s) => s[lang]
    );
    const data: LeadData = {
      name: form.name.trim(),
      propertyName: form.propertyName.trim(),
      propertyType: form.propertyType || undefined,
      hasSite: form.hasSite,
      siteUrl: form.hasSite ? form.siteUrl.trim() || undefined : undefined,
      hasInstagram: form.hasInstagram,
      instagramHandle: form.hasInstagram ? form.instagramHandle.trim() || undefined : undefined,
      serviceLabels,
      challenge: form.challenge.trim() || undefined,
    };
    window.open(buildWhatsAppUrl(buildDiagnosticoMessage(data, lang)), "_blank", "noopener,noreferrer");
  };

  const inputClass =
    "w-full bg-[#F7F3EE] border rounded-xl px-4 py-3 text-[14px] text-[#1A0F08] font-light placeholder:text-[#b0a099] outline-none transition-all duration-200 focus:bg-white border-[rgba(196,164,142,0.3)] focus:border-[#84936f] focus:ring-2 focus:ring-[rgba(132,147,111,0.12)]";

  const ToggleRow = ({
    active,
    onYes,
    onNo,
  }: {
    active: boolean;
    onYes: () => void;
    onNo: () => void;
  }) => (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={onYes}
        className="flex-1 h-11 rounded-xl border text-[13px] font-medium transition-all"
        style={
          active
            ? { background: GREEN, borderColor: GREEN, color: "#fff" }
            : { background: "#fff", borderColor: BORDER, color: TEXT_BODY }
        }
      >
        {c.yes}
      </button>
      <button
        type="button"
        onClick={onNo}
        className="flex-1 h-11 rounded-xl border text-[13px] font-medium transition-all"
        style={
          !active
            ? { background: "#3a332c", borderColor: "#3a332c", color: "#fff" }
            : { background: "#fff", borderColor: BORDER, color: TEXT_BODY }
        }
      >
        {c.no}
      </button>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleClose}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{ background: "rgba(21,17,13,0.55)", backdropFilter: "blur(2px)" }}
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl max-h-[92dvh] overflow-y-auto"
            style={{ background: CARD, border: `1px solid ${BORDER}` }}
          >
            {/* Header */}
            <div className="px-6 pt-6 pb-4" style={{ background: BG }}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-[20px] font-semibold" style={{ color: TEXT_HEAD }}>
                    {c.title}
                  </h2>
                  <p className="text-[13px] font-light mt-1" style={{ color: TEXT_BODY }}>
                    {c.subtitle}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleClose}
                  aria-label={c.close}
                  className="shrink-0 p-1 rounded-full hover:bg-black/5 transition-colors"
                  style={{ color: TEXT_BODY }}
                >
                  <IconX size={20} />
                </button>
              </div>

              {/* Progress */}
              <div className="flex gap-2 mt-5">
                {c.steps.map((label, i) => {
                  const n = (i + 1) as 1 | 2 | 3;
                  const done = step > n;
                  const active = step === n;
                  return (
                    <div key={label} className="flex-1">
                      <span
                        className="text-[10px] font-medium tracking-[0.15em] uppercase block mb-1"
                        style={{ color: active ? TEXT_HEAD : "rgba(92,79,69,0.5)" }}
                      >
                        {label}
                      </span>
                      <div
                        className="h-1.5 rounded-full transition-colors"
                        style={{ background: active ? BROWN : done ? GREEN : "rgba(196,164,142,0.35)" }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Body */}
            <div className="px-6 py-6">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="s1"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-4"
                  >
                    <input
                      className={inputClass}
                      placeholder={c.nameLabel}
                      value={form.name}
                      onFocus={markStarted}
                      onChange={(e) => set("name", e.target.value)}
                    />
                    <input
                      className={inputClass}
                      placeholder={c.propertyLabel}
                      value={form.propertyName}
                      onChange={(e) => set("propertyName", e.target.value)}
                    />
                    <div>
                      <label className="text-[12px] font-light block mb-1.5" style={{ color: TEXT_BODY }}>
                        {c.typeLabel}
                      </label>
                      <select
                        className={inputClass}
                        value={form.propertyType}
                        onChange={(e) => set("propertyType", e.target.value)}
                      >
                        <option value="">{c.typePlaceholder}</option>
                        {PROPERTY_TYPES[lang].map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[13px] font-medium block mb-2" style={{ color: TEXT_HEAD }}>
                        {c.hasSiteQuestion}
                      </label>
                      <ToggleRow
                        active={form.hasSite}
                        onYes={() => set("hasSite", true)}
                        onNo={() => {
                          set("hasSite", false);
                          set("siteUrl", "");
                        }}
                      />
                      {form.hasSite && (
                        <input
                          className={`${inputClass} mt-2`}
                          placeholder={c.siteUrlPlaceholder}
                          value={form.siteUrl}
                          onChange={(e) => set("siteUrl", e.target.value)}
                        />
                      )}
                    </div>

                    <div>
                      <label className="text-[13px] font-medium block mb-2" style={{ color: TEXT_HEAD }}>
                        {c.hasInstagramQuestion}
                      </label>
                      <ToggleRow
                        active={form.hasInstagram}
                        onYes={() => set("hasInstagram", true)}
                        onNo={() => {
                          set("hasInstagram", false);
                          set("instagramHandle", "");
                        }}
                      />
                      {form.hasInstagram && (
                        <input
                          className={`${inputClass} mt-2`}
                          placeholder={c.instagramPlaceholder}
                          value={form.instagramHandle}
                          onChange={(e) => set("instagramHandle", e.target.value)}
                        />
                      )}
                    </div>

                    {error && <p className="text-[13px]" style={{ color: "#c0392b" }}>{error}</p>}

                    <button
                      type="button"
                      onClick={goStep2}
                      className="mt-1 w-full h-12 rounded-xl text-white text-[14px] font-medium flex items-center justify-center gap-2 transition-all hover:opacity-90"
                      style={{ background: BROWN }}
                    >
                      {c.next}
                      <IconArrowRight size={16} />
                    </button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="s2"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-4"
                  >
                    <div>
                      <h3 className="text-[15px] font-semibold" style={{ color: TEXT_HEAD }}>
                        {c.servicesTitle}
                      </h3>
                      <p className="text-[12px] font-light" style={{ color: TEXT_BODY }}>
                        {c.servicesHint}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2">
                      {SERVICE_COMBOS.map((s) => {
                        const selected = form.services.includes(s.id);
                        return (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() =>
                              set(
                                "services",
                                selected
                                  ? form.services.filter((x) => x !== s.id)
                                  : [...form.services, s.id]
                              )
                            }
                            className="w-full text-left px-4 py-3 rounded-xl border flex items-center gap-3 transition-all"
                            style={{
                              background: selected ? "rgba(132,147,111,0.12)" : "#fff",
                              borderColor: selected ? GREEN : BORDER,
                            }}
                          >
                            <span
                              className="shrink-0 w-5 h-5 rounded-md flex items-center justify-center border"
                              style={{
                                background: selected ? GREEN : "transparent",
                                borderColor: selected ? GREEN : BORDER,
                              }}
                            >
                              {selected && <IconCheck size={14} color="#fff" />}
                            </span>
                            <span className="text-[13px] font-light" style={{ color: TEXT_HEAD }}>
                              {s[lang]}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <div>
                      <label className="text-[12px] font-light block mb-1.5" style={{ color: TEXT_BODY }}>
                        {c.challengeLabel}
                      </label>
                      <textarea
                        className={`${inputClass} h-20 resize-none`}
                        placeholder={c.challengePlaceholder}
                        value={form.challenge}
                        onChange={(e) => set("challenge", e.target.value)}
                      />
                    </div>

                    {error && <p className="text-[13px]" style={{ color: "#c0392b" }}>{error}</p>}

                    <div className="flex gap-3 mt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setError(null);
                          setStep(1);
                        }}
                        className="flex-1 h-12 rounded-xl border text-[14px] font-medium flex items-center justify-center gap-2 transition-all hover:bg-black/[0.03]"
                        style={{ borderColor: BORDER, color: TEXT_BODY }}
                      >
                        <IconArrowLeft size={16} />
                        {c.back}
                      </button>
                      <button
                        type="button"
                        onClick={finish}
                        className="flex-1 h-12 rounded-xl text-white text-[14px] font-medium flex items-center justify-center gap-2 transition-all hover:opacity-90"
                        style={{ background: GREEN }}
                      >
                        <IconBrandWhatsapp size={17} />
                        {c.finish}
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="s3"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col items-center text-center gap-4 py-4"
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(132,147,111,0.15)" }}
                    >
                      <IconCheck size={32} color={GREEN} />
                    </div>
                    <h3 className="text-[20px] font-semibold" style={{ color: TEXT_HEAD }}>
                      {c.successTitle}
                    </h3>
                    <p className="text-[14px] font-light max-w-sm" style={{ color: TEXT_BODY }}>
                      {c.successBody}
                    </p>
                    <button
                      type="button"
                      onClick={openWhatsAppAgain}
                      className="w-full h-12 rounded-xl text-white text-[14px] font-medium flex items-center justify-center gap-2 transition-all hover:opacity-90"
                      style={{ background: GREEN }}
                    >
                      <IconBrandWhatsapp size={17} />
                      {c.openWhatsApp}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {step !== 3 && (
                <p className="text-[11px] font-light mt-4 text-center" style={{ color: "#9a8878" }}>
                  {c.privacy}
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Garantir o import no layout (se ainda não feito na Task 2 Step 2)**

Confirmar que `src/app/(public)/layout.tsx` importa e renderiza `<LeadModal />` conforme Task 2.

- [ ] **Step 3: Verificar lint e build**

Run: `npm run lint`
Then: `npm run build`
Expected: build conclui sem erros; sem warnings de tipos no LeadModal.

- [ ] **Step 4: Verificação manual**

Run: `npm run dev`
- Abrir `http://localhost:3000`, e via console executar temporariamente ou (após a Task 6) clicar num CTA. Como ainda não há gatilho, validar montagem adicionando temporariamente um botão de teste OU aguardar a Task 6.
Expected: nenhum erro de runtime no console ao carregar a home.

- [ ] **Step 5: Commit** *(pausar — usuário decide)*

```bash
git add src/components/LeadModal/index.tsx
git commit -m "feat: componente LeadModal de 3 etapas"
```

---

## Task 5: Botão reutilizável `DiagnosticoCTA`

**Files:**
- Create: `src/components/DiagnosticoCTA/index.tsx`

**Interfaces:**
- Consumes: `useLeadModal()` (Task 2); `trackButtonClick` de `@/lib/analytics`.
- Produces:
  - `function DiagnosticoCTA(props: { children: React.ReactNode; className?: string; style?: React.CSSProperties; trackId?: string; source?: string; ariaLabel?: string }): JSX.Element`

- [ ] **Step 1: Criar `src/components/DiagnosticoCTA/index.tsx`**

```tsx
"use client";

import { useLeadModal } from "@/context/LeadModalContext";
import { trackButtonClick } from "@/lib/analytics";

type Props = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  trackId?: string;
  source?: string;
  ariaLabel?: string;
};

export function DiagnosticoCTA({ children, className, style, trackId, source, ariaLabel }: Props) {
  const { open } = useLeadModal();
  return (
    <button
      type="button"
      className={className}
      style={style}
      aria-label={ariaLabel}
      onClick={() => {
        if (trackId) trackButtonClick(trackId, source ?? "modal");
        open();
      }}
    >
      {children}
    </button>
  );
}
```

- [ ] **Step 2: Verificar lint**

Run: `npm run lint`
Expected: sem erros.

- [ ] **Step 3: Commit** *(pausar — usuário decide)*

```bash
git add src/components/DiagnosticoCTA/index.tsx
git commit -m "feat: botao reutilizavel DiagnosticoCTA"
```

---

## Task 6: Trocar os CTAs de diagnóstico pelo modal

Substituir cada CTA de "Diagnóstico Gratuito" (que hoje navega para `/diagnostico` ou abre WhatsApp genérico) por `<DiagnosticoCTA>`, **preservando as classes/estilos atuais** de cada botão (o `DiagnosticoCTA` só troca o comportamento, não o visual).

**Regra geral por CTA:**
- `<Link href="/diagnostico" className="X">LABEL</Link>` → `<DiagnosticoCTA className="X" trackId="cta_...">LABEL</DiagnosticoCTA>`
- `<a href={waHref} className="X" ...>LABEL</a>` (quando o texto é "Diagnóstico"/"Agendar diagnóstico") → `<DiagnosticoCTA className="X" trackId="cta_...">LABEL</DiagnosticoCTA>`
- Em **client components**, importar direto `import { DiagnosticoCTA } from "@/components/DiagnosticoCTA";`.
- Em **server components** (páginas de serviço `page.tsx`), o `DiagnosticoCTA` já é `"use client"`, então pode ser usado diretamente dentro do JSX server — funciona como client island.

**Files (localizar cada CTA com o Grep abaixo e editar):**

Run para mapear os alvos:
`Grep pattern="href=\"/diagnostico\"|/diagnostico\"|Diagnóstico Gratuito|Diagnosis" glob="**/*.tsx" output_mode="content" -n=true`

- Modify: `src/components/Header/index.tsx`
  - l.323: `<Link href="/diagnostico" className="header-cta-btn">{t("nav.cta")}</Link>` → `<DiagnosticoCTA className="header-cta-btn" trackId="cta_header" source="/">{t("nav.cta")}</DiagnosticoCTA>`
  - l.333-335: `<Link href="/diagnostico" className="header-cta-btn-mobile">{locale === "en" ? "Diagnosis" : "Diagnóstico"}</Link>` → `<DiagnosticoCTA className="header-cta-btn-mobile" trackId="cta_header_mobile" source="/">{locale === "en" ? "Diagnosis" : "Diagnóstico"}</DiagnosticoCTA>`
  - l.486 (menu): trocar o `<Link href="/diagnostico" ...>` por `<DiagnosticoCTA className={...mesmas classes...} trackId="cta_menu">...</DiagnosticoCTA>`. Se estiver dentro do `MobileMenu` (que recebe props), passar um handler; se o componente `MobileMenu` não tem acesso ao provider, importar `DiagnosticoCTA` diretamente nele (é client).
  - Adicionar `import { DiagnosticoCTA } from "@/components/DiagnosticoCTA";`.
  - **Atenção CSS:** `.header-cta-btn` pode assumir `<a>`. Após a troca, conferir no browser que o botão mantém o mesmo visual; se precisar, adicionar `border:none; cursor:pointer; background: inherit` já vem do class. Ajustar `appearance:none` se necessário.

- Modify: `src/components/Footer/index.tsx`
  - l.27: o item `{ label: "Diagnóstico Gratuito", href: "/diagnostico" }` — trocar a renderização desse link específico por `<DiagnosticoCTA>` com as mesmas classes do link do footer. Manter os demais links como `<Link>`. Importar `DiagnosticoCTA`.

- Modify: `src/app/(public)/home/_components/ConsultoriaBanner/index.tsx`
  - O CTA já é client e chama `trackButtonClick("cta_diagnostico", "/")`. Trocar o `<Link href="/diagnostico">`/`<a>` por `<DiagnosticoCTA className={...} trackId="cta_diagnostico" source="/">...</DiagnosticoCTA>` (remover o `trackButtonClick` manual duplicado, pois o `DiagnosticoCTA` já rastreia).

- Modify: `src/app/(public)/ecossistema/_components/EcossistemaContent.tsx`
  - Os CTAs `href="/diagnostico"` (heroCta e os dois botões nas l.192 e l.288) → `<DiagnosticoCTA>` com as mesmas classes. Importar `DiagnosticoCTA`. Os `links: [{ label, href: "/diagnostico" }]` usados em cards podem permanecer como `<Link>` (navegação legítima para a landing) OU virar CTA — **manter como `<Link>`** para não sobrecarregar; só os botões de ação principais viram modal.

- Modify: `src/app/(public)/marketing-hoteleiro/_components/EmpresaContent.tsx`
  - O CTA que usa `ctaWaText` (WhatsApp direto, label "Solicitar Diagnóstico Gratuito") → `<DiagnosticoCTA className={...} trackId="cta_empresa">{c.ctaBtn}</DiagnosticoCTA>`. Importar `DiagnosticoCTA`.

- Modify: `src/app/(public)/motor-de-reservas/_components/MotorDeReservasContent.tsx`
  - O CTA "Diagnóstico Gratuito" que monta `waHref` direto → `<DiagnosticoCTA>` com as mesmas classes. Importar `DiagnosticoCTA`.

- Modify (páginas de serviço server components) — cada uma tem um bloco CTA com botão "Diagnóstico Gratuito" → `/diagnostico`:
  - `src/app/(public)/meta-ads/page.tsx`
  - `src/app/(public)/google-hotel-ads/_components/GoogleHotelAdsContent.tsx`
  - `src/app/(public)/seo-para-hoteis/_components/SeoParaHoteisContent.tsx`
  - `src/app/(public)/reservas-diretas/_components/ReservasDiretasContent.tsx`
  - `src/app/(public)/gestao-de-canais/page.tsx`
  - `src/app/(public)/automacao-atendimento/page.tsx`
  - `src/app/(public)/producao-audiovisual/page.tsx`
  - `src/app/(public)/relatorios-performance/page.tsx`
  - Em cada: localizar o `<Link href="/diagnostico" ...>Diagnóstico Gratuito</Link>` (ou `<a href={...whatsapp...}>`) no bloco CTA final e trocar por `<DiagnosticoCTA className={...mesmas classes...} trackId="cta_<pagina>">Diagnóstico Gratuito</DiagnosticoCTA>`, importando `DiagnosticoCTA`.

- Modify: `src/app/(public)/blog/[slug]/_components/ArticleContent.tsx`
  - O CTA WhatsApp direto (l.105, texto de diagnóstico) → `<DiagnosticoCTA className={...} trackId="cta_blog">...</DiagnosticoCTA>`.

- Modify: `src/app/(public)/diagnostico/_components/DiagnosticoContent.tsx`
  - Manter a página (SEO). Trocar o **hero CTA** (`href="#form"`) e o **formulário inline** por chamadas ao modal:
    - Hero CTA → `<DiagnosticoCTA className={...mesmas classes do heroCta...} trackId="cta_diag_page_hero">{c.heroCta}</DiagnosticoCTA>`.
    - Bloco do formulário (`<form onSubmit={handleSubmit}>...`) → substituir por um card com texto curto + `<DiagnosticoCTA>` grande (label `c.submit`). Remover `handleSubmit`, `handleFormStart`, `isSubmitting`, `formStarted` e imports não usados (`useRouter`, `buildWhatsAppUrl` se ficar órfão). Manter o botão "Agendar pelo WhatsApp" direto se desejar, ou também trocar por modal (recomendado trocar por modal para um fluxo único).
  - **Não** remover a página nem seus metadados/SEO.

- [ ] **Step 1: Rodar o Grep de mapeamento** (comando acima) e listar todos os alvos.
- [ ] **Step 2: Editar cada arquivo** conforme a regra geral, preservando classes/estilos.
- [ ] **Step 3: Verificar lint**

Run: `npm run lint`
Expected: sem erros; sem imports não usados (remover `Link`/`buildWhatsAppUrl` órfãos onde aplicável).

- [ ] **Step 4: Verificar build**

Run: `npm run build`
Expected: build conclui sem erros de tipos nem de client/server boundary.

- [ ] **Step 5: Verificação manual do fluxo completo**

Run: `npm run dev`
- Clicar no CTA "Diagnóstico" do header (desktop e mobile) → modal abre.
- Passo 1: tentar avançar vazio → erro "Preencha seu nome...". Preencher nome + hospedagem, marcar "Sim" em site/Instagram → campos extras aparecem → avançar.
- Passo 2: avançar sem serviço → erro. Marcar ≥1 combo, opcionalmente desafio → "Ir para o WhatsApp".
- Nova aba do WhatsApp abre com a mensagem contendo nome, hospedagem, tipo, serviços, site/Instagram e desafio.
- Passo 3: tela de sucesso; "Abrir WhatsApp" reabre a conversa.
- Trocar idioma para EN e repetir: textos e mensagem em inglês.
- Fechar por overlay, X e Esc; scroll do body trava enquanto aberto.
- Conferir que os CTAs das páginas de serviço e do footer também abrem o modal.
- Conferir que o botão flutuante de WhatsApp (`FloatingSocial`) **ainda vai direto** ao WhatsApp.

Expected: todos os itens acima funcionam; sem erros no console.

- [ ] **Step 6: Commit** *(pausar — usuário decide)*

```bash
git add -A
git commit -m "feat: CTAs de diagnostico abrem o modal de captura de lead"
```

---

## Self-Review (feita pelo autor do plano)

- **Cobertura do spec:** dados etapa 1 (Task 4), combos etapa 2 cobrindo todos os serviços (Task 3+4), sucesso+redirect (Task 4), mensagem WhatsApp completa (Task 1), todos os CTAs (Task 6), FloatingSocial e Contact intactos (constraint + Task 6), página /diagnostico mantida (Task 6), bilíngue (Task 3/4), sem deps novas (constraint). ✔
- **Placeholders:** nenhum passo com "TBD/TODO"; todo código está completo. Task 6 usa uma "regra geral + lista exata de arquivos" porque os estilos por CTA variam — cada alvo está nomeado com arquivo e a transformação exata. ✔
- **Consistência de tipos:** `LeadData` (Task 1) é o que a Task 4 monta; `useLeadModal()` retorna `{ isOpen, open, close }` (Task 2) e é consumido igual nas Tasks 4/5; `MODAL_CONTENT`/`SERVICE_COMBOS`/`PROPERTY_TYPES` (Task 3) batem com o uso na Task 4; `s[lang]` usa `lang: "pt" | "en"` consistente com `buildDiagnosticoMessage(..., lang)`. ✔

## Notas de execução
- Ordem recomendada: Task 1 → Task 3 → Task 4 → Task 2 (que importa o LeadModal) → Task 5 → Task 6. (A Task 2 Step 2 depende do arquivo da Task 4 existir.)
- Se algum `.header-cta-btn` ou classe de pílula assumir `<a>`, ajustar CSS mínimo para o `<button>` manter o visual (sem mudar o layout).
```
