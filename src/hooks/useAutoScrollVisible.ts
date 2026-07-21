"use client";

import { useEffect, useRef, useState } from "react";

// Só liga a animação (transform infinito) quando o carrossel está visível —
// evita o compositor rodando continuamente fora de tela enquanto a página carrega.
export function useAutoScrollVisible<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, visible };
}
