"use client";

import Image from "next/image";
import { useAutoScrollVisible } from "@/hooks/useAutoScrollVisible";

// Cor de fundo da <section> que envolve este carrossel (OQueFazemos).
// As máscaras laterais precisam dissolver exatamente nessa cor.
const BG_SECAO = "#F0EBE3";

// Altura renderizada do card, em CSS px — precisa bater com as classes
// `h-[180px] md:h-[240px]` lá embaixo. Como a largura é `w-auto`, a largura
// exibida de cada foto é ALTURA × proporção dela, e é isso que o `sizes`
// precisa declarar (ver comentário no <Image/>).
const ALT_MOBILE = 180;
const ALT_DESKTOP = 240;

// Fotos de public/img/clientes em ordem embaralhada FIXA — um shuffle em
// runtime renderizaria ordens diferentes no servidor e no cliente (erro de
// hidratação). Arquivos .HEIC excluídos: navegadores não renderizam HEIC.
//
// `ratio` = largura/altura REAL do arquivo. Não é decorativo: alimenta os
// atributos width/height (proporção correta = zero layout shift quando a foto
// entra) e o cálculo do `sizes`. Se trocar uma foto, medir o arquivo novo.
const FOTOS = [
  { src: "/img/clientes/IMG_5619.jpg", ratio: 3 / 4 },
  { src: "/img/clientes/28D676B2-2D80-4D92-8BA5-2115E3E79C22.jpg", ratio: 4 / 5 },
  { src: "/img/clientes/IMG_5188.jpg", ratio: 3 / 4 },
  { src: "/img/clientes/piscina.JPG", ratio: 4000 / 2256 },
  { src: "/img/clientes/IMG_5585.jpg", ratio: 3024 / 3303 },
  { src: "/img/clientes/IMG_E5318.jpg", ratio: 3 / 4 },
  { src: "/img/clientes/IMG_5134.jpg", ratio: 3 / 4 },
  { src: "/img/clientes/61FE9AB7-9D2F-4A3F-B0D5-5CE1BB2FF96B.jpg", ratio: 4 / 5 },
  { src: "/img/clientes/IMG_5586.jpg", ratio: 3 / 4 },
  { src: "/img/clientes/IMG_5190.jpg", ratio: 3 / 4 },
  { src: "/img/clientes/IMG_5732.jpg", ratio: 3 / 4 },
  { src: "/img/clientes/IMG_5584.jpg", ratio: 3 / 4 },
];

export default function ClientesCarousel() {
  const scroll = useAutoScrollVisible<HTMLDivElement>();
  // Duplicado uma vez: a animação translada -50%, então duas cópias = loop contínuo
  const fotos = [...FOTOS, ...FOTOS];

  return (
    <div ref={scroll.ref} className="relative w-full overflow-hidden">
      {/* Máscaras de gradiente: as fotos somem na cor da seção em vez de
          serem cortadas a seco nas bordas */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 sm:w-20 lg:w-32"
        style={{ background: `linear-gradient(to right, ${BG_SECAO}, transparent)` }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 sm:w-20 lg:w-32"
        style={{ background: `linear-gradient(to left, ${BG_SECAO}, transparent)` }}
      />

      {/* is-playing só entra quando o carrossel está visível — mantém o
          compositor parado enquanto a seção está fora da viewport */}
      <div
        className={`animate-scroll-infinite-seamless${scroll.visible ? " is-playing" : ""}`}
        style={{ animationDuration: "60s" }}
      >
        {fotos.map(({ src, ratio }, i) => (
          // O espaçamento é margem à direita de TODA foto, não `gap` no trilho:
          // com `gap` haveria 2N-1 intervalos para 2N fotos, e os -50% da
          // animação cairiam meio intervalo fora do ponto de repetição —
          // um salto visível a cada volta do loop.
          <div
            key={`${src}-${i}`}
            className="group relative mr-4 h-[180px] shrink-0 overflow-hidden rounded-xl sm:mr-5 md:h-[240px]"
          >
            <Image
              src={src}
              alt="Foto de hotel cliente da Réserve"
              // Proporção real do arquivo. Com um valor genérico (era 480x320)
              // o browser reserva uma caixa com a proporção errada e reflowa
              // quando a foto chega.
              width={Math.round(480 * ratio)}
              height={480}
              quality={70}
              // Largura REAL exibida = altura do card × proporção. São fotos
              // retrato (~0,75), então cada uma ocupa ~135px no mobile e
              // ~180px no desktop — não os 300/400px que estavam declarados
              // aqui, que faziam o browser baixar o candidato 640w/448w para
              // pintar 236px. O breakpoint casa com o `md:` (768px) acima.
              sizes={`(max-width: 767px) ${Math.ceil(ALT_MOBILE * ratio)}px, ${Math.ceil(ALT_DESKTOP * ratio)}px`}
              className="h-full w-auto max-w-none object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Véu escuro no hover, por cima do zoom */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        ))}
      </div>
    </div>
  );
}
