"use client";

import { LocaleProvider } from "@/context/LocaleContext";
import { LeadModalProvider } from "@/context/LeadModalContext";
import { LeadModal } from "@/components/LeadModal";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LocaleProvider>
      <LeadModalProvider>
        {children}
        <LeadModal />
      </LeadModalProvider>
    </LocaleProvider>
  );
}
