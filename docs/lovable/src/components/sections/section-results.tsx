const RESULTS = [
  {
    value: "+40%",
    label: "Redução de dependência de OTAs",
    description:
      "Média alcançada por hotéis que constroem canal próprio de reservas diretas com a Réserve.",
  },
  {
    value: "3×",
    label: "Aumento em reservas diretas",
    description:
      "Hotéis com estratégia integrada triplicam o volume de reservas diretas sem intermediários.",
  },
  {
    value: "90d",
    label: "Para resultados mensuráveis",
    description:
      "Prazo médio para consolidar presença digital e obter ROI consistente.",
  },
  {
    value: "100%",
    label: "Foco exclusivo em hotelaria",
    description:
      "Não atendemos nenhum outro segmento. Toda nossa expertise é aplicada ao mercado hoteleiro.",
  },
];

export function SectionResults() {
  return (
    <section className="bg-brand-green-deep">
      <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
        <p className="flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-on-dark-muted">
          <span className="h-px w-10 bg-on-dark-muted" />
          Resultados
        </p>

        <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-2xl font-display text-4xl leading-[1.08] text-on-dark md:text-5xl xl:text-6xl">
            Números que <span className="italic text-brand-brown-light">falam por si</span>
          </h2>
          <p className="max-w-sm text-sm leading-relaxed text-on-dark-muted">
            Médias baseadas na performance de hotéis que adotam uma estratégia
            integrada de marketing hoteleiro.
          </p>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl bg-on-dark/15 sm:grid-cols-2 lg:grid-cols-4">
          {RESULTS.map((item) => (
            <div key={item.value} className="bg-brand-green-deep p-8 lg:p-10">
              <p className="font-display text-5xl text-on-dark xl:text-6xl">{item.value}</p>
              <p className="mt-4 text-xs font-bold uppercase tracking-[0.15em] text-brand-brown-light">
                {item.label}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-on-dark-muted">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
