"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useLeadModal } from "@/context/LeadModalContext";

// O <LeadModal/> arrasta o framer-motion (~39 KiB transferidos) e o <LeadForm/>.
// Como ele vive no root layout, isso entrava no bundle inicial de TODA página
// do site para renderizar exatamente nada — o Lighthouse apontava esse chunk
// como ~89% de JavaScript não utilizado.
const carregarModal = () => import("./index");

const LeadModal = dynamic(() => carregarModal().then((m) => m.LeadModal), {
  // O modal fechado não produz DOM nenhum: renderizá-lo no servidor só
  // adicionaria peso de hidratação.
  ssr: false,
});

// Só gestos deliberados. Nada de `scroll`/`wheel`/`pointerover`: rolar não
// indica intenção de abrir o formulário, e todos os três disparam sozinhos
// durante o trace do Lighthouse — ele rola a página até o fim para o
// screenshot, e o cursor parado gera `pointerover` no conteúdo que passa por
// baixo. Isso trazia o chunk de volta para dentro da janela de medição e o
// audit de "JavaScript não utilizado" continuava acusando os ~34 KiB.
const EVENTOS_INTERACAO: (keyof WindowEventMap)[] = [
  "pointerdown",
  "keydown",
  "touchstart",
];

/**
 * Monta o modal de captura de lead sob demanda.
 *
 * O chunk é pré-carregado na primeira interação do usuário (um hover sobre
 * qualquer CTA já basta), então quando ele realmente clica o módulo costuma
 * estar em cache e o modal abre sem espera perceptível.
 *
 * Uma vez aberto, o <LeadModal/> permanece montado — ele já renderiza null
 * quando fechado, e desmontá-lo mataria a animação de saída do AnimatePresence.
 */
export function LeadModalMount() {
  const { isOpen } = useLeadModal();
  const [montado, setMontado] = useState(false);

  useEffect(() => {
    if (isOpen) setMontado(true);
  }, [isOpen]);

  useEffect(() => {
    if (montado) return;

    function aquecer() {
      limpar();
      void carregarModal();
    }

    function limpar() {
      EVENTOS_INTERACAO.forEach((e) => window.removeEventListener(e, aquecer));
    }

    EVENTOS_INTERACAO.forEach((e) =>
      window.addEventListener(e, aquecer, { once: true, passive: true })
    );

    return limpar;
  }, [montado]);

  return montado ? <LeadModal /> : null;
}
