import { ArrowRight } from "lucide-react";
import hotelReception from "@/assets/hotel-reception.jpg";

export function SectionSpecialty() {
  return (
    <section className="bg-offwhite">
      <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-6 py-24 lg:grid-cols-2 lg:gap-20 lg:px-10 lg:py-32">
        <div>
          <p className="flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-brand-brown">
            <span className="h-px w-10 bg-brand-brown" />
            Nossa Especialidade
          </p>

          <h2 className="mt-8 font-display text-4xl leading-[1.08] text-ink md:text-5xl xl:text-6xl">
            Somos especialistas em{" "}
            <span className="italic text-brand-green-deep">Marketing Hoteleiro.</span>
          </h2>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-soft">
            Construímos canais diretos que geram{" "}
            <strong className="font-semibold text-ink">reservas diretas</strong> e
            eliminam comissões de OTAs. Visibilidade real, hóspedes que pagam por
            valor <strong className="font-semibold text-ink">e margem que fica com você.</strong>
          </p>

          <a
            href="#contato"
            className="group mt-10 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-brown transition-colors hover:text-brand-brown/80"
          >
            Fale com um especialista
            <span className="grid size-10 place-items-center rounded-full border border-brand-brown/40 transition-colors group-hover:border-brand-brown">
              <ArrowRight className="size-4" />
            </span>
          </a>
        </div>

        <div className="relative">
          <img
            src={hotelReception}
            alt="Recepção de hotel boutique com atendente acolhendo hóspedes"
            width={1280}
            height={960}
            loading="lazy"
            className="aspect-[4/3] w-full rounded-2xl object-cover shadow-2xl"
          />
          <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-brand-green px-8 py-6 shadow-xl md:block">
            <p className="font-display text-4xl text-on-dark">100%</p>
            <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-on-dark-muted">
              Foco exclusivo em hotelaria
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
