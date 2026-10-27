import Image from "next/image";

type PageHeroBackdropProps = {
  /** foto do tema da página (Unsplash, licença livre — mesmo critério das
   *  capas do blog) ou caminho a partir de public/ (fotos de cliente em
   *  /img/clientes) */
  src: string;
  /** object-position da foto: o hero é uma faixa larga, então em fotos
   *  retrato (as de cliente são 1200x1600) isto escolhe qual faixa aparece */
  position?: string;
  /** "left": texto alinhado à esquerda, foto respira à direita no desktop.
   *  "center": texto centralizado, véu uniforme. */
  variant?: "left" | "center";
};

/**
 * Fundo dos heros das páginas internas: foto + véu escuro. Substitui a cor
 * chapada com brilho radial que cada página tinha. O véu (em globals.css,
 * .page-hero-overlay) garante contraste AA do texto branco sobre qualquer foto.
 *
 * A seção que usa isto precisa de `position: relative; overflow: hidden` e o
 * conteúdo precisa de `relative z-10` — é o padrão do template das páginas.
 *
 * A foto é decorativa (alt="" + aria-hidden): toda a informação está no h1.
 * priority: é o LCP da página.
 */
export function PageHeroBackdrop({ src, position = "50% 50%", variant = "left" }: PageHeroBackdropProps) {
  return (
    <>
      <Image
        src={src}
        alt=""
        aria-hidden="true"
        fill
        priority
        fetchPriority="high"
        quality={70}
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: position }}
      />
      <div
        aria-hidden="true"
        className={`page-hero-overlay${variant === "center" ? " page-hero-overlay--center" : ""} absolute inset-0`}
      />
    </>
  );
}
