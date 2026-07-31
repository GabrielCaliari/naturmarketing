"use client";

import { useEffect, useState } from "react";

const BRAND_BROWN = "#994f2a";

/**
 * Barra de progresso de leitura fixa no topo.
 *
 * O listener de scroll apenas agenda um rAF (com flag de coalescência), então
 * no máximo um setState por frame — nunca um por evento de scroll.
 * z-index acima do header fixo (que usa z-index: 1000 em globals.css),
 * senão a barra ficaria escondida atrás dele.
 */
export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      const doc = document.documentElement;
      const docHeight = doc.scrollHeight - doc.clientHeight;
      if (docHeight <= 0) {
        setProgress(0);
        return;
      }
      const pct = (window.scrollY / docHeight) * 100;
      setProgress(Math.min(100, Math.max(0, pct)));
    };

    const schedule = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 w-full h-1"
      style={{ background: "rgba(153,79,42,0.12)", zIndex: 1100 }}
    >
      <div
        className="h-full transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%`, background: BRAND_BROWN }}
      />
    </div>
  );
}
