"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLeadModal } from "@/context/LeadModalContext";
import { LeadForm } from "@/components/LeadForm";

const CARD = "#FDFAF7";
const BORDER = "rgba(196,164,142,0.25)";

/**
 * Overlay + painel do modal de captura de lead. O conteúdo (wizard de 3 etapas)
 * vive em <LeadForm/>, reaproveitado também inline na página /contato.
 * O LeadForm remonta a cada abertura (fica dentro do AnimatePresence), então o
 * estado do formulário e a pré-seleção são reinicializados sem lógica extra.
 */
export function LeadModal() {
  const { isOpen, close, preselect } = useLeadModal();

  const panelRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  // Enquanto aberto: Esc para fechar, focus-trap (Tab), scroll lock,
  // foco inicial no primeiro campo e devolução do foco ao gatilho ao fechar.
  useEffect(() => {
    if (!isOpen) return;
    openerRef.current = document.activeElement as HTMLElement | null;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Foca o primeiro campo depois que o painel monta/anima.
    const focusTimer = window.setTimeout(() => {
      const target =
        panelRef.current?.querySelector<HTMLElement>("input, select, textarea") ??
        panelRef.current?.querySelector<HTMLElement>("button");
      target?.focus();
    }, 60);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      window.clearTimeout(focusTimer);
      openerRef.current?.focus?.();
    };
  }, [isOpen, close]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={close}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{ background: "rgba(21,17,13,0.55)", backdropFilter: "blur(2px)" }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="lead-modal-title"
        >
          <motion.div
            ref={panelRef}
            key="panel"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl max-h-[92dvh] overflow-y-auto"
            style={{ background: CARD, border: `1px solid ${BORDER}` }}
          >
            <LeadForm preselect={preselect} onClose={close} titleId="lead-modal-title" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
