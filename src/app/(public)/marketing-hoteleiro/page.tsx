import type { Metadata } from "next";
import EmpresaContent from "./_components/EmpresaContent";
import { COMPANY_NAP } from "@/constants/company";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || COMPANY_NAP.url;

export const metadata: Metadata = {
  title: "Marketing Hoteleiro: Agência Especializada | Réserve",
  // (única página de serviço que mantém a marca no título: é a página
  // institucional, onde a busca por "Réserve" tende a cair)
  description:
    "Agência especializada em marketing hoteleiro: Google Hotel Ads, SEO e reservas diretas. Não atendemos outros nichos — só hotelaria, de ponta a ponta.",
  keywords:
    "agência de marketing para hotel, agência de marketing hoteleiro, marketing digital para hotéis, quem somos Réserve, equipe marketing hoteleiro, especialistas marketing para hotéis, agência marketing hotéis Brasil, sobre a Réserve",
  alternates: { canonical: `${siteUrl}/marketing-hoteleiro` },
  openGraph: {
    title: "Marketing Hoteleiro | Réserve",
    description:
      "Agência especializada em marketing hoteleiro: diagnóstico, estratégia e tecnologia para virar presença digital em reservas diretas.",
    type: "website",
    url: `${siteUrl}/marketing-hoteleiro`,
  },
};

export default function EmpresaPage() {
  return <EmpresaContent />;
}
