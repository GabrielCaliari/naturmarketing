import { ArrowRight } from "lucide-react";
import ctaDarkLobby from "@/assets/cta-dark-lobby.jpg";

export function SectionFinalCta() {
  return (
    <section id="contato" className="relative overflow-hidden">
      <img
        src={ctaDarkLobby}
        alt="Lobby de hotel de luxo com iluminação quente ao anoitecer"
        width={1920}
        height={1080}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/75 to-ink/40" />

      <div className="relative mx-auto max-w-[1440px] px-6 py-28 lg:px-10 lg:py-40">
        <p className="flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-on-dark-muted">
          <span className="h-px w-10 bg-on-dark-muted" />
          Diagnóstico Gratuito
        </p>

        <h2 className="mt-8 max-w-3xl font-display text-4xl leading-[1.06] text-on-dark md:text-6xl xl:text-7xl">
          Descubra por que seu hotel{" "}
          <span className="italic text-brand-brown-light">perde reservas</span> todos os dias
        </h2>

        <p className="mt-8 max-w-xl text-lg leading-relaxed text-on-dark-muted">
          Solicite uma análise estratégica gratuita e receba um plano de ação
          personalizado.{" "}
          <strong className="font-semibold text-on-dark">
            Aumente seu faturamento direto agora.
          </strong>
        </p>

        <div className="mt-10">
          <a
            href="#"
            className="group inline-flex items-center gap-3 rounded-full bg-brand-brown px-10 py-5 text-xs font-bold uppercase tracking-[0.15em] text-on-dark transition-all hover:bg-brand-brown/90 hover:shadow-2xl"
          >
            Diagnóstico Gratuito
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
