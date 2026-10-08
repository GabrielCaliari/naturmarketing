const FOOTER_COLS = [
  {
    title: "Serviços",
    links: [
      "Gestão de Canais",
      "Produção Audiovisual",
      "Sites para Hotéis",
      "Motor de Reservas",
      "Google Ads & Hotel Ads",
      "Meta Ads",
      "SEO para Hotéis",
      "Relatórios de Performance",
      "Automação de Atendimento",
    ],
  },
  {
    title: "Conteúdo",
    links: ["Blog", "Nossa Empresa", "Ecossistema", "Diagnóstico Gratuito"],
  },
  {
    title: "Social",
    links: ["Instagram", "WhatsApp"],
  },
  {
    title: "Legal",
    links: ["Privacidade", "Termos"],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-brand-green">
      <div className="mx-auto max-w-[1440px] px-6 pb-10 pt-20 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr] lg:gap-20">
          <div>
            <a href="#" className="flex flex-col leading-none">
              <span className="font-display text-4xl tracking-tight text-on-dark">réserve</span>
              <span className="mt-1.5 text-[9px] font-semibold uppercase tracking-[0.35em] text-on-dark-muted">
                Marketing Agency
              </span>
            </a>
            <p className="mt-8 max-w-sm text-sm leading-relaxed text-on-dark-muted">
              Agência especializada em Marketing Hoteleiro. Transformamos hotéis,
              pousadas e resorts em marcas fortes com reservas diretas e menos
              dependência de OTAs.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            {FOOTER_COLS.map((col) => (
              <div key={col.title}>
                <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-brown-light">
                  {col.title}
                </p>
                <ul className="mt-5 space-y-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-on-dark-muted transition-colors hover:text-on-dark"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-on-dark/15 pt-8">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-on-dark-muted">
            © 2026 RÉSERVE · Marketing Hoteleiro
          </p>
          <a
            href="#"
            className="text-[11px] font-medium uppercase tracking-[0.2em] text-on-dark-muted transition-colors hover:text-on-dark"
          >
            Política de Privacidade
          </a>
        </div>
      </div>
    </footer>
  );
}
