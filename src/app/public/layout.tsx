"use client";

import { AuthProvider } from "@/context/AuthContext";
import StyledComponentsRegistry from "../registry";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Estilos já importados no layout principal

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <StyledComponentsRegistry>
        {children}
        <ToastContainer />
      </StyledComponentsRegistry>
    </AuthProvider>
  );
}