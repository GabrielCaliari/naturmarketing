const OWNED_CHANNELS = ["Instagram", "Facebook", "TikTok", "Google", "WhatsApp"];
const INTERMEDIARIES = ["Booking.com", "Expedia", "Airbnb", "Decolar"];

function MarqueeRow({ items, muted }: { items: string[]; muted?: boolean }) {
  const row = [...items, ...items, ...items];
  return (
    <div className="relative overflow-hidden">
      <div className="flex w-max animate-marquee items-center gap-8 py-2">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-8">
            <span
              className={`font-display text-4xl whitespace-nowrap md:text-6xl ${
                muted ? "text-on-dark/35" : "text-on-dark"
              }`}
            >
              {item}
            </span>
            <span
              className={`size-2 rounded-full ${
                muted ? "bg-brand-brown-light/50" : "bg-brand-brown-light"
              }`}
            />
          </span>
        ))}
      </div>
    </div>
  );
}

export function SectionChannels() {
  return (
    <section className="bg-ink">
      <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
        <p className="flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-on-dark-muted">
          <span className="h-px w-10 bg-on-dark-muted" />
          Ecossistema
        </p>

        <div className="mt-16 space-y-20">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-brown-light">
              Canal próprio de aquisição
            </p>
            <h2 className="mt-4 max-w-3xl font-display text-3xl leading-[1.1] text-on-dark md:text-4xl">
              Canais onde construímos o seu{" "}
              <span className="italic text-brand-green">ecossistema de reservas diretas</span>
            </h2>
            <div className="mt-10">
              <MarqueeRow items={OWNED_CHANNELS} />
            </div>
          </div>

          <div className="border-t border-on-dark/10 pt-16">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-on-dark-muted">
              Intermediários que gerenciamos
            </p>
            <h3 className="mt-4 max-w-3xl font-display text-2xl leading-[1.1] text-on-dark-muted md:text-3xl">
              Canais onde otimizamos o posicionamento do seu hotel
            </h3>
            <div className="mt-10">
              <MarqueeRow items={INTERMEDIARIES} muted />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
