// LocaleProvider / LeadModalProvider / LeadModal now live in the root layout
// (src/app/layout.tsx) so they also wrap the root "/" route, which re-exports
// (public)/home/page.tsx directly and therefore never rendered this layout.
export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
