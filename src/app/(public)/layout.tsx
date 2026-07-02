"use client";

import StyledComponentsRegistry from "../registry";
import { LocaleProvider } from "@/context/LocaleContext";

import { ToastContainer } from "react-toastify";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LocaleProvider>
      <StyledComponentsRegistry>
        {children}
        <ToastContainer />
      </StyledComponentsRegistry>
    </LocaleProvider>
  );
}