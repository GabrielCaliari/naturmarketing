import { ArrowRight, Clock } from "lucide-react";

const POSTS = [
  {
    tag: "Estratégia",
    readTime: "6 min",
    date: "10 de março de 2025",
    title: "Agência de Marketing Hoteleiro vs. Agência Genérica: qual a diferença real?",
    excerpt:
      "Contratar uma agência que não conhece hotelaria pode custar muito mais do que a mensalidade. Entenda o impacto real no resultado.",
  },
  {
    tag: "Google Ads",
    readTime: "8 min",
    date: "18 de agosto de 2025",
    title: "Google Hotel Ads: o guia completo para hotéis e pousadas em 2026",
    excerpt:
      "O Google Hotel Ads coloca seu hotel lado a lado com o Booking e o Expedia no momento exato em que o viajante decide reservar.",
  },
  {
    tag: "OTAs & Canal Direto",
    readTime: "7 min",
    date: "09 de junho de 2026",
    title: "Booking sobe a comissão para 18% em julho de 2026: o que o seu hotel precisa fazer agora",
    excerpt:
      "A Booking.com comunicou aos parceiros brasileiros uma comissão preferencial de 18%. Veja como proteger a margem do seu hotel.",
  },
];

export function SectionBlog() {
  return (
    <section className="bg-offwhite">
      <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
        <p className="flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-brand-brown">
          <span className="h-px w-10 bg-brand-brown" />
          Do Blog
        </p>

        <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-2xl font-display text-4xl leading-[1.08] text-ink md:text-5xl xl:text-6xl">
            Conteúdo para <span className="italic text-brand-green-deep">Marketing Hoteleiro</span>
          </h2>
          <p className="max-w-sm text-sm leading-relaxed text-ink-soft">
            Estratégias, ferramentas e dados para hotéis que querem crescer com reservas diretas.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {POSTS.map((post) => (
            <article
              key={post.title}
              className="group flex flex-col rounded-2xl border border-ink/10 bg-surface p-8 transition-all hover:-translate-y-1 hover:border-brand-green/50 hover:shadow-xl"
            >
              <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-wider">
                <span className="rounded-full bg-brand-green/15 px-3 py-1 text-brand-green-deep">
                  {post.tag}
                </span>
                <span className="flex items-center gap-1.5 text-ink-soft">
                  <Clock className="size-3.5" />
                  {post.readTime}
                </span>
              </div>
              <h3 className="mt-6 font-display text-xl leading-snug text-ink">{post.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">{post.excerpt}</p>
              <div className="mt-6 flex items-center justify-between border-t border-ink/10 pt-5">
                <span className="text-xs text-ink-soft">{post.date}</span>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-brand-brown transition-colors hover:text-brand-brown/80"
                >
                  Ler artigo
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#"
            className="group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-brown transition-colors hover:text-brand-brown/80"
          >
            Ver todos os artigos
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
