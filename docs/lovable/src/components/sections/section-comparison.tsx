import { Check, X } from "lucide-react";

const WITHOUT = [
  "Altas taxas de comissão nas OTAs",
  "Comunicação genérica sem identidade",
  "Marketing reativo e sem estratégia",
  "Dependência total de intermediários",
];

const WITH_RESERVE = [
  "Reservas diretas com zero comissão",
  "Posicionamento premium e diferenciado",
  "Estratégia integrada com ROI mensurável",
  "Canal próprio de aquisição de hóspedes",
];

export function SectionComparison() {
  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
        <p className="flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-brand-brown">
          <span className="h-px w-10 bg-brand-brown" />O Comparativo
        </p>

        <h2 className="mt-8 max-w-3xl font-display text-4xl leading-[1.08] text-ink md:text-5xl xl:text-6xl">
          A diferença é <span className="italic text-brand-green-deep">clara</span>
        </h2>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-ink/10 bg-surface p-8 lg:p-12">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-ink-soft">
              Sem estrutura
            </p>
            <ul className="mt-8 space-y-6">
              {WITHOUT.map((item) => (
                <li key={item} className="flex items-start gap-4">
                  <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-ink/8 text-ink-soft">
                    <X className="size-4" />
                  </span>
                  <span className="text-base leading-relaxed text-ink-soft">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-brand-green-deep p-8 shadow-xl lg:p-12">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-brown-light">
              Com a <span className="font-display text-sm normal-case tracking-normal">réserve</span>
            </p>
            <ul className="mt-8 space-y-6">
              {WITH_RESERVE.map((item) => (
                <li key={item} className="flex items-start gap-4">
                  <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-brand-brown text-on-dark">
                    <Check className="size-4" />
                  </span>
                  <span className="text-base font-medium leading-relaxed text-on-dark">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
