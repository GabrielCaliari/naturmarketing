"use client";

import { useEffect } from "react";
import { AuthProvider } from "@/context/AuthContext";
import StyledComponentsRegistry from "../registry";

import { ToastContainer } from "react-toastify";

// Estilos já importados no layout principal

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    // Carrega CSS do react-toastify dinamicamente para evitar problemas no build
    if (typeof window !== 'undefined' && !document.querySelector('link[href*="ReactToastify"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdn.jsdelivr.net/npm/react-toastify@11.0.5/dist/ReactToastify.css';
      document.head.appendChild(link);
    }
  }, []);

  return (
    <AuthProvider>
      <StyledComponentsRegistry>
        {children}
        <ToastContainer />
      </StyledComponentsRegistry>
    </AuthProvider>
  );
}