import { ArrowRight } from "lucide-react";

export function CtaStrip() {
  return (
    <section className="bg-brand-brown">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-8 px-6 py-14 lg:px-10">
        <h2 className="max-w-2xl font-display text-2xl leading-snug text-on-dark md:text-3xl">
          Quer uma estratégia completa e integrada para o seu hotel?{" "}
          <span className="italic text-on-dark-muted">Solicite um diagnóstico gratuito.</span>
        </h2>
        <a
          href="#contato"
          className="group inline-flex items-center gap-3 rounded-full bg-on-dark px-8 py-4 text-xs font-bold uppercase tracking-[0.15em] text-brand-brown transition-all hover:bg-surface hover:shadow-lg"
        >
          Falar com um especialista
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
}
