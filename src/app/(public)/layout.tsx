"use client";

import { LocaleProvider } from "@/context/LocaleContext";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <LocaleProvider>{children}</LocaleProvider>;
}