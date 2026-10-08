import { ArrowDown } from "lucide-react";
import hotelPool from "@/assets/hotel-pool.jpg";

const STATS = [
  { value: "+40%", label: "Redução de dependência de OTAs" },
  { value: "3×", label: "Aumento em reservas diretas" },
  { value: "90d", label: "Para resultados mensuráveis" },
  { value: "100%", label: "Foco exclusivo em hotelaria" },
];

export function HeroCinematic() {
  return (
    <section className="relative overflow-hidden">
      <img
        src={hotelPool}
        alt="Piscina de borda infinita de hotel de luxo ao entardecer"
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/45 to-ink/25" />

      <div className="relative mx-auto flex min-h-[88vh] max-w-[1440px] flex-col justify-end px-6 pb-16 pt-32 lg:px-10">
        <p className="flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-on-dark-muted">
          <span className="h-px w-10 bg-on-dark-muted" />
          Agência de Marketing Hoteleiro
        </p>

        <h1 className="mt-8 max-w-4xl font-display text-5xl leading-[1.04] text-on-dark md:text-7xl xl:text-[84px]">
          Resultados em{" "}
          <span className="italic text-brand-brown-light">reservas diretas.</span>
        </h1>

        <p className="mt-8 max-w-xl text-lg leading-relaxed text-on-dark-muted">
          Do diagnóstico à execução,{" "}
          <strong className="font-semibold text-on-dark">
            canais próprios trabalhando pelo seu hotel 24h.
          </strong>
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-6">
          <a
            href="#"
            className="rounded-full bg-brand-brown px-8 py-4 text-xs font-bold uppercase tracking-[0.15em] text-on-dark transition-all hover:bg-brand-brown/90 hover:shadow-lg"
          >
            Diagnóstico Gratuito
          </a>
          <a
            href="#"
            className="group flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-on-dark-muted transition-colors hover:text-on-dark"
          >
            <span className="grid size-10 place-items-center rounded-full border border-on-dark/30 transition-colors group-hover:border-on-dark">
              <ArrowDown className="size-4" />
            </span>
            Explorar
          </a>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-8 border-t border-on-dark/15 pt-8 md:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.value}>
              <p className="font-display text-3xl text-on-dark md:text-4xl">{stat.value}</p>
              <p className="mt-2 text-[11px] font-medium uppercase tracking-wider text-on-dark-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
