"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  IconX,
  IconArrowRight,
  IconArrowLeft,
  IconBrandWhatsapp,
  IconCheck,
} from "@tabler/icons-react";
import { useLocale } from "@/context/LocaleContext";
import { trackFormStart, trackFormSubmit } from "@/lib/analytics";
import { buildDiagnosticoMessage, buildWhatsAppUrl, type LeadData } from "@/lib/whatsapp";
import { SERVICE_COMBOS, PROPERTY_TYPES, MODAL_CONTENT } from "@/components/LeadModal/constants";

const GREEN = "#84936f";
const BROWN = "#994f2a";
const BG = "#F0EBE3";
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

function ToggleRow({
  active,
  onYes,
  onNo,
  yesLabel,
  noLabel,
}: {
  active: boolean;
  onYes: () => void;
  onNo: () => void;
  yesLabel: string;
  noLabel: string;
}) {
  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={onYes}
        className="flex-1 h-11 rounded-xl border text-[13px] font-medium transition-all cursor-pointer"
        style={
          active
            ? { background: GREEN, borderColor: GREEN, color: "#fff" }
            : { background: "#fff", borderColor: BORDER, color: TEXT_BODY }
        }
      >
        {yesLabel}
      </button>
      <button
        type="button"
        onClick={onNo}
        className="flex-1 h-11 rounded-xl border text-[13px] font-medium transition-all cursor-pointer"
        style={
          !active
            ? { background: "#3a332c", borderColor: "#3a332c", color: "#fff" }
            : { background: "#fff", borderColor: BORDER, color: TEXT_BODY }
        }
      >
        {noLabel}
      </button>
    </div>
  );
}

type LeadFormProps = {
  /** Serviços (ids de SERVICE_COMBOS) já marcados na etapa 2. */
  preselect?: string[];
  /** Se presente, mostra o botão de fechar (uso em modal). Ausente = inline. */
  onClose?: () => void;
  /** id do título, para aria-labelledby do container pai. */
  titleId?: string;
  /** Nome do formulário para os eventos de analytics. */
  analyticsId?: string;
};

/**
 * Wizard de 3 etapas de captura de lead (dados → serviços → sucesso) que monta
 * a mensagem do WhatsApp. Renderiza apenas o conteúdo (cabeçalho + corpo); o card
 * externo é responsabilidade do container (LeadModal ou a página /contato).
 */
export function LeadForm({
  preselect = [],
  onClose,
  titleId = "lead-form-title",
  analyticsId = "diagnostico_modal",
}: LeadFormProps) {
  const { locale } = useLocale();
  const lang = locale === "en" ? "en" : "pt";
  const c = MODAL_CONTENT[lang];

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [form, setForm] = useState<FormState>({
    name: "",
    propertyName: "",
    propertyType: "",
    hasSite: false,
    siteUrl: "",
    hasInstagram: false,
    instagramHandle: "",
    services: preselect,
    challenge: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [started, setStarted] = useState(false);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const markStarted = () => {
    if (!started) {
      setStarted(true);
      trackFormStart(analyticsId);
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

  const buildLeadData = (): LeadData => {
    const serviceLabels = SERVICE_COMBOS.filter((s) => form.services.includes(s.id)).map(
      (s) => s[lang]
    );
    return {
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
  };

  const finish = () => {
    if (form.services.length === 0) {
      setError(c.servicesError);
      return;
    }
    setError(null);
    const url = buildWhatsAppUrl(buildDiagnosticoMessage(buildLeadData(), lang));
    trackFormSubmit(analyticsId, true);
    window.open(url, "_blank", "noopener,noreferrer");
    setStep(3);
  };

  const openWhatsAppAgain = () => {
    window.open(
      buildWhatsAppUrl(buildDiagnosticoMessage(buildLeadData(), lang)),
      "_blank",
      "noopener,noreferrer"
    );
  };

  const inputClass =
    "w-full bg-[#F7F3EE] border rounded-xl px-4 py-3 text-[14px] text-[#1A0F08] font-light placeholder:text-[#b0a099] outline-none transition-all duration-200 focus:bg-white border-[rgba(196,164,142,0.3)] focus:border-[#84936f] focus:ring-2 focus:ring-[rgba(132,147,111,0.12)]";

  return (
    <>
      {/* Header */}
      <div className="px-6 pt-6 pb-4" style={{ background: BG }}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id={titleId} className="text-[20px] font-semibold" style={{ color: TEXT_HEAD }}>
              {c.title}
            </h2>
            <p className="text-[13px] font-light mt-1" style={{ color: TEXT_BODY }}>
              {c.subtitle}
            </p>
          </div>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label={c.close}
              className="shrink-0 p-1 rounded-full hover:bg-black/5 transition-colors cursor-pointer"
              style={{ color: TEXT_BODY }}
            >
              <IconX size={20} />
            </button>
          )}
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
                  yesLabel={c.yes}
                  noLabel={c.no}
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
                  yesLabel={c.yes}
                  noLabel={c.no}
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
                className="mt-1 w-full h-12 rounded-xl text-white text-[14px] font-medium flex items-center justify-center gap-2 transition-all hover:opacity-90 cursor-pointer"
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
                      className="w-full h-full text-left px-3.5 py-3 rounded-xl border flex items-start gap-2.5 transition-all cursor-pointer"
                      style={{
                        background: selected ? "rgba(132,147,111,0.12)" : "#fff",
                        borderColor: selected ? GREEN : BORDER,
                      }}
                    >
                      <span
                        className="shrink-0 mt-0.5 w-5 h-5 rounded-md flex items-center justify-center border"
                        style={{
                          background: selected ? GREEN : "transparent",
                          borderColor: selected ? GREEN : BORDER,
                        }}
                      >
                        {selected && <IconCheck size={14} color="#fff" />}
                      </span>
                      <span className="text-[12.5px] font-light leading-snug" style={{ color: TEXT_HEAD }}>
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
                  className="flex-1 h-12 rounded-xl border text-[14px] font-medium flex items-center justify-center gap-2 transition-all hover:bg-black/[0.03] cursor-pointer"
                  style={{ borderColor: BORDER, color: TEXT_BODY }}
                >
                  <IconArrowLeft size={16} />
                  {c.back}
                </button>
                <button
                  type="button"
                  onClick={finish}
                  className="flex-1 h-12 rounded-xl text-white text-[14px] font-medium flex items-center justify-center gap-2 transition-all hover:opacity-90 cursor-pointer"
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
                className="w-full h-12 rounded-xl text-white text-[14px] font-medium flex items-center justify-center gap-2 transition-all hover:opacity-90 cursor-pointer"
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
    </>
  );
}
