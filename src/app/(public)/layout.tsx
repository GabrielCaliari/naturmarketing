"use client";

import { useEffect } from "react";
import { AuthProvider } from "@/context/AuthContext";
import StyledComponentsRegistry from "../registry";
import { LocaleProvider } from "@/context/LocaleContext";
import MetaPixel from "@/components/Analytics/MetaPixel";

import { ToastContainer } from "react-toastify";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    if (typeof window !== 'undefined' && !document.querySelector('link[href*="ReactToastify"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdn.jsdelivr.net/npm/react-toastify@11.0.5/dist/ReactToastify.css';
      document.head.appendChild(link);
    }
  }, []);

  return (
    <AuthProvider>
      <LocaleProvider>
        <StyledComponentsRegistry>
          {children}
          <ToastContainer />
          <MetaPixel />
        </StyledComponentsRegistry>
      </LocaleProvider>
    </AuthProvider>
  );
}