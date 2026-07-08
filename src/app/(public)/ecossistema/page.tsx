import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/SEO/JsonLd";
import { COMPANY_NAP } from "@/constants/company";
import EcossistemaContent from "./_components/EcossistemaContent";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || COMPANY_NAP.url;

export const metadata: Metadata = {
  title: "Ecossistema de Aquisição de Hóspedes | Metodologia Réserve",
  description:
    "Conheça o Ecossistema de Aquisição de Hóspedes, a metodologia da Réserve que conecta demanda, conversão, atendimento e dados para gerar reservas diretas de forma previsível.",
  keywords:
    "ecossistema de aquisição de hóspedes, metodologia marketing hoteleiro, estratégia reservas diretas, funil de reservas hotel, marketing hoteleiro integrado, como aumentar reservas diretas",
  alternates: { canonical: `${siteUrl}/ecossistema` },
  openGraph: {
    title: "Ecossistema de Aquisição de Hóspedes | Réserve",
    description:
      "A metodologia da Réserve: demanda, conversão, atendimento e dados trabalhando juntos para gerar reservas diretas de forma previsível.",
    type: "website",
    url: `${siteUrl}/ecossistema`,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Réserve | Ecossistema de Aquisição de Hóspedes" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Ecossistema de Aquisição de Hóspedes | Metodologia Réserve",
  description:
    "Metodologia proprietária da Réserve para hotelaria: diagnóstico, geração de demanda, conversão no canal direto, atendimento com automação e otimização contínua por dados.",
  url: `${siteUrl}/ecossistema`,
  publisher: { "@type": "Organization", "@id": `${siteUrl}/#organization`, name: COMPANY_NAP.name, url: siteUrl },
};

export default function EcossistemaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BreadcrumbJsonLd items={[
        { name: "Início", url: "/" },
        { name: "Ecossistema", url: "/ecossistema" },
      ]} />
      <EcossistemaContent />
    </>
  );
}
