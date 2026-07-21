"use client";

import { createContext, useCallback, useContext, useMemo, useState, ReactNode } from "react";

type LeadModalContextValue = {
  isOpen: boolean;
  /** Serviços (ids de SERVICE_COMBOS) pré-marcados na etapa 2. */
  preselect: string[];
  open: (preselect?: string[]) => void;
  close: () => void;
};

const LeadModalContext = createContext<LeadModalContextValue | null>(null);

export function LeadModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [preselect, setPreselect] = useState<string[]>([]);
  const open = useCallback((services?: string[]) => {
    setPreselect(services ?? []);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);
  const value = useMemo(
    () => ({ isOpen, preselect, open, close }),
    [isOpen, preselect, open, close]
  );

  return <LeadModalContext.Provider value={value}>{children}</LeadModalContext.Provider>;
}

export function useLeadModal(): LeadModalContextValue {
  const ctx = useContext(LeadModalContext);
  if (!ctx) {
    throw new Error("useLeadModal deve ser usado dentro de <LeadModalProvider>");
  }
  return ctx;
}
