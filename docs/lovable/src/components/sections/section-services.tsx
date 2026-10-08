import {
  BarChart3,
  Clapperboard,
  Megaphone,
  MessageCircle,
  MonitorSmartphone,
  Search,
  Share2,
  TrendingUp,
} from "lucide-react";

const SERVICES = [
  {
    icon: Share2,
    title: "Gestão de Canais Digitais",
    description:
      "Redes sociais, OTAs e plataformas digitais geridas de forma integrada — do Instagram ao Booking, do Google ao WhatsApp.",
  },
  {
    icon: Clapperboard,
    title: "Produção Audiovisual",
    description:
      "Vídeos e fotografia de alta qualidade que capturam a alma e a atmosfera única do seu hotel.",
  },
  {
    icon: MonitorSmartphone,
    title: "Sites & Landing Pages",
    description:
      "Interfaces focadas em conversão, com navegação fluida e integração direta com motor de reservas.",
  },
  {
    icon: Search,
    title: "Google Ads & Hotel Ads",
    description:
      "Google Hotel Ads, Search e Display direcionados para capturar viajantes no momento da decisão.",
  },
  {
    icon: Megaphone,
    title: "Meta Ads",
    description:
      "Anúncios no Facebook e Instagram que alcançam o público ideal e convertem em reservas diretas.",
  },
  {
    icon: TrendingUp,
    title: "SEO Hoteleiro",
    description:
      "Otimização focada em hotelaria para o seu hotel ranquear acima dos concorrentes no Google.",
  },
  {
    icon: BarChart3,
    title: "Relatórios de Performance",
    description:
      "Análise profunda de ROI e métricas de performance para decisões baseadas em dados reais.",
  },
  {
    icon: MessageCircle,
    title: "Chatbot & Automação",
    description:
      "Automação inteligente de WhatsApp para capturar leads, tirar dúvidas e converter reservas 24/7.",
  },
];

export function SectionServices() {
  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
        <p className="flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-brand-brown">
          <span className="h-px w-10 bg-brand-brown" />
          O Que Fazemos
        </p>

        <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-2xl font-display text-4xl leading-[1.08] text-ink md:text-5xl xl:text-6xl">
            Soluções completas construídas para{" "}
            <span className="italic text-brand-green-deep">hotelaria</span>
          </h2>
          <p className="max-w-sm text-sm leading-relaxed text-ink-soft">
            Atuamos em cada ponto de contato da jornada do hóspede premium.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service) => (
            <div
              key={service.title}
              className="group rounded-2xl border border-ink/10 bg-surface p-8 transition-all hover:-translate-y-1 hover:border-brand-green/50 hover:shadow-xl"
            >
              <span className="grid size-12 place-items-center rounded-full bg-brand-green/15 text-brand-green-deep transition-colors group-hover:bg-brand-green group-hover:text-on-dark">
                <service.icon className="size-5" />
              </span>
              <h3 className="mt-6 font-display text-xl leading-snug text-ink">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
