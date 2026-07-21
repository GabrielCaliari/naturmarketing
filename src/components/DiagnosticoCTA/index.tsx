"use client";

import { useLeadModal } from "@/context/LeadModalContext";
import { trackButtonClick } from "@/lib/analytics";

type Props = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  trackId?: string;
  source?: string;
  ariaLabel?: string;
  /** Serviços (ids de SERVICE_COMBOS) já marcados na etapa 2 ao abrir o modal. */
  preselect?: string[];
};

export function DiagnosticoCTA({ children, className, style, trackId, source, ariaLabel, preselect }: Props) {
  const { open } = useLeadModal();
  return (
    <button
      type="button"
      className={className}
      style={style}
      aria-label={ariaLabel}
      onClick={() => {
        if (trackId) trackButtonClick(trackId, source ?? "modal");
        open(preselect);
      }}
    >
      {children}
    </button>
  );
}
