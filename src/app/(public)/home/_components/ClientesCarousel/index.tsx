"use client";

import Image from "next/image";
import { useAutoScrollVisible } from "@/hooks/useAutoScrollVisible";

// Cor de fundo da <section> que envolve este carrossel (OQueFazemos).
// As máscaras laterais precisam dissolver exatamente nessa cor.
const BG_SECAO = "#F0EBE3";

// Fotos de public/img/clientes em ordem embaralhada FIXA — um shuffle em
// runtime renderizaria ordens diferentes no servidor e no cliente (erro de
// hidratação). Arquivos .HEIC excluídos: navegadores não renderizam HEIC.
const FOTOS = [
  "/img/clientes/IMG_5619.jpg",
  "/img/clientes/28D676B2-2D80-4D92-8BA5-2115E3E79C22.png",
  "/img/clientes/IMG_5188.jpg",
  "/img/clientes/piscina.JPG",
  "/img/clientes/IMG_5585.jpg",
  "/img/clientes/IMG_E5318.jpg",
  "/img/clientes/IMG_5134.jpg",
  "/img/clientes/61FE9AB7-9D2F-4A3F-B0D5-5CE1BB2FF96B.png",
  "/img/clientes/IMG_5586.jpg",
  "/img/clientes/IMG_5190.jpg",
  "/img/clientes/IMG_5732.jpg",
  "/img/clientes/IMG_5584.jpg",
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
        {fotos.map((src, i) => (
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
              width={480}
              height={320}
              quality={70}
              sizes="(max-width: 768px) 300px, 400px"
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
