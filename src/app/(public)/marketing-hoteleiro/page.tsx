import type { Metadata } from "next";
import EmpresaContent from "./_components/EmpresaContent";
import { COMPANY_NAP } from "@/constants/company";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || COMPANY_NAP.url;

export const metadata: Metadata = {
  title: "Agência Especializada em Marketing Hoteleiro | Réserve",
  // (única página de serviço que mantém a marca no título: é a página
  // institucional, onde a busca por "Réserve" tende a cair)
  description:
    "Não somos uma agência genérica que também atende hotel. A Réserve faz só hotelaria: Google Hotel Ads, SEO e reservas diretas para hotéis e pousadas.",
  keywords:
    "agência de marketing para hotel, agência de marketing hoteleiro, quem somos Réserve, equipe marketing hoteleiro, especialistas marketing para hotéis, agência marketing hotéis Brasil, sobre a Réserve",
  alternates: { canonical: `${siteUrl}/marketing-hoteleiro` },
  openGraph: {
    title: "Agência de Marketing para Hotéis | Réserve | Quem Somos",
    description:
      "A Réserve é a agência de marketing hoteleiro especializada em transformar presença digital em reservas diretas. Conheça o time e a missão.",
    type: "website",
    url: `${siteUrl}/marketing-hoteleiro`,
  },
};

export default function EmpresaPage() {
  return <EmpresaContent />;
}
