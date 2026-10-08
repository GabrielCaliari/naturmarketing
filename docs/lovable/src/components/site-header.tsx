const NAV_LINKS = ["Início", "Serviços", "Ecossistema", "Blog", "Nossa Empresa", "Contato"];

export function SiteHeader() {
  return (
    <header className="bg-brand-green">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-6 lg:px-10">
        <a href="#" className="flex flex-col leading-none">
          <span className="font-display text-[26px] tracking-tight text-on-dark">réserve</span>
          <span className="mt-1 text-[8px] font-semibold uppercase tracking-[0.35em] text-on-dark-muted">
            Marketing Agency
          </span>
        </a>

        <nav className="hidden items-center gap-8 xl:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              className="text-[11px] font-medium uppercase tracking-[0.18em] text-on-dark transition-colors hover:text-on-dark-muted"
            >
              {link}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button className="hidden items-center gap-2 rounded-full border border-on-dark/30 px-4 py-2 text-[11px] font-semibold uppercase tracking-widest text-on-dark sm:flex">
            PT
          </button>
          <a
            href="#"
            className="rounded-full bg-brand-brown px-6 py-3 text-[11px] font-bold uppercase tracking-[0.15em] text-on-dark transition-colors hover:bg-brand-brown/90"
          >
            Diagnóstico Gratuito
          </a>
        </div>
      </div>
    </header>
  );
}
