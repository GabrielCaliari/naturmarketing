"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

type RevealProps = {
  children: ReactNode;
  /** Elemento a renderizar (div, section, article, h2…) */
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  /** Atraso da transição em ms (para efeito escalonado entre irmãos) */
  delay?: number;
  /** Direção de entrada: up (padrão), right, left ou none (só fade) */
  from?: "up" | "right" | "left" | "none";
  id?: string;
};

/**
 * Substituto leve do framer-motion whileInView: revela o conteúdo com
 * transição CSS quando entra no viewport. O conteúdo é visível no SSR
 * (sem JS não há opacity:0), então não atrasa LCP nem esconde nada de
 * crawlers — a classe .reveal-pending só é aplicada após a hidratação.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  className,
  style,
  delay = 0,
  from = "up",
  id,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  // null = antes da hidratação (visível), false = escondido aguardando scroll, true = revelado
  const [visible, setVisible] = useState<boolean | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setVisible(true);
      return;
    }
    // Usa apenas o próprio IntersectionObserver para decidir se o elemento já
    // está na tela — evita um getBoundingClientRect() síncrono por instância
    // (dezenas na home) que força reflow intercalado com os demais efeitos
    // de montagem. O primeiro callback do observer chega com o estado atual
    // de interseção, então não há piscar de conteúdo above-the-fold.
    let first = true;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          io.disconnect();
        } else if (first) {
          setVisible(false);
        }
        first = false;
      },
      // -15% na base (era -8%): o elemento só revela depois de subir um pouco
      // na tela, senão a animação acontece na borda inferior e passa
      // despercebida. Mantemos threshold 0 de propósito — um threshold >0
      // nunca dispara para elementos mais altos que a viewport.
      { rootMargin: "0px 0px -15% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const revealClass =
    visible === false
      ? `reveal-pending reveal-from-${from}`
      : visible === true
        ? "reveal-in"
        : "";

  return (
    <Tag
      // ref tipado como HTMLElement genérico — Tag é dinâmico
      ref={ref as never}
      id={id}
      className={[className, revealClass].filter(Boolean).join(" ")}
      style={delay ? { ...style, transitionDelay: `${delay}ms` } : style}
    >
      {children}
    </Tag>
  );
}
