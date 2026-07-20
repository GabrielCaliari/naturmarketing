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
};

export function DiagnosticoCTA({ children, className, style, trackId, source, ariaLabel }: Props) {
  const { open } = useLeadModal();
  return (
    <button
      type="button"
      className={className}
      style={style}
      aria-label={ariaLabel}
      onClick={() => {
        if (trackId) trackButtonClick(trackId, source ?? "modal");
        open();
      }}
    >
      {children}
    </button>
  );
}
