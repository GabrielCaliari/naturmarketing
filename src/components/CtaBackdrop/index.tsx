import Image from "next/image";

/**
 * Fundo da faixa final de "Diagnóstico gratuito" das páginas internas: a
 * mesma foto da faixa final da home (ConsultoriaBanner), para todas as páginas
 * terminarem iguais. Substitui a cor chapada que cada página tinha.
 *
 * O texto dessas faixas é centralizado, então o véu é uniforme (o da home é
 * lateral porque lá o texto fica à esquerda). Com ele o parágrafo em branco a
 * 65% mantém >= 4.5:1 sobre qualquer ponto da foto.
 *
 * A seção precisa de `relative overflow-hidden` e o conteúdo de `relative z-10`.
 * Sem priority: a faixa fica no fim da página, longe do LCP.
 */
export function CtaBackdrop() {
  return (
    <>
      <Image
        src="/img/resource/cta-dark-lobby.jpg"
        alt=""
        aria-hidden="true"
        fill
        quality={70}
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to top, rgba(26,15,8,0.92) 0%, rgba(26,15,8,0.8) 100%)",
        }}
      />
    </>
  );
}
