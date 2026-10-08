import { ArrowRight } from "lucide-react";
import segmentResort from "@/assets/segment-resort.jpg";
import segmentPousada from "@/assets/segment-pousada.jpg";
import segmentAirbnb from "@/assets/segment-airbnb.jpg";

const SEGMENTS = [
  {
    image: segmentResort,
    alt: "Grande resort com piscina e palmeiras ao entardecer",
    tag: "Escala & Posicionamento",
    title: "Hotéis & Resorts",
    description:
      "Estratégias que aumentam ocupação, elevam o ticket médio e fortalecem a marca em posição de liderança no mercado.",
  },
  {
    image: segmentPousada,
    alt: "Pousada boutique com arquitetura colonial e jardim tropical",
    tag: "Alma & Exclusividade",
    title: "Hotéis Boutique & Pousadas",
    description:
      "Marketing personalizado para propriedades que querem se destacar pelo charme, autenticidade e experiência — não pelo preço.",
  },
  {
    image: segmentAirbnb,
    alt: "Interior de apartamento de temporada iluminado e aconchegante",
    tag: "Performance & Desejo",
    title: "Airbnb & Temporada",
    description:
      "Para anfitriões que buscam design visual impecável e otimização de canais para maximizar reservas e avaliações.",
  },
];

export function SectionSegments() {
  return (
    <section className="bg-offwhite">
      <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
        <p className="flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-brand-brown">
          <span className="h-px w-10 bg-brand-brown" />
          Quem Atendemos
        </p>

        <h2 className="mt-8 max-w-3xl font-display text-4xl leading-[1.08] text-ink md:text-5xl xl:text-6xl">
          Marketing Hoteleiro para cada{" "}
          <span className="italic text-brand-green-deep">tipo de propriedade</span>
        </h2>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {SEGMENTS.map((segment) => (
            <article
              key={segment.title}
              className="group relative overflow-hidden rounded-2xl"
            >
              <img
                src={segment.image}
                alt={segment.alt}
                width={1024}
                height={1280}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/35 to-ink/10" />
              <div className="absolute inset-x-0 bottom-0 p-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-brand-brown-light">
                  {segment.tag}
                </p>
                <h3 className="mt-3 font-display text-3xl text-on-dark">{segment.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-on-dark-muted">
                  {segment.description}
                </p>
                <a
                  href="#contato"
                  className="mt-6 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-on-dark transition-colors hover:text-brand-brown-light"
                >
                  Saiba mais
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
