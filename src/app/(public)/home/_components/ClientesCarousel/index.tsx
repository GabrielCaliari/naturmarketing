"use client";

import Image from "next/image";
import { useAutoScrollVisible } from "@/hooks/useAutoScrollVisible";

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
    <div ref={scroll.ref} className="overflow-hidden">
      <div
        className={`animate-scroll-infinite-seamless${scroll.visible ? " is-playing" : ""}`}
        style={{ animationDuration: "60s" }}
      >
        {fotos.map((src, i) => (
          <div key={`${src}-${i}`} className="h-[180px] md:h-[240px] shrink-0">
            <Image
              src={src}
              alt="Foto de hotel cliente da Réserve"
              width={480}
              height={320}
              quality={70}
              sizes="(max-width: 768px) 300px, 400px"
              className="h-full w-auto max-w-none object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
