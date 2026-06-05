import type { Metadata } from "next";
import EmpresaContent from "./_components/EmpresaContent";
import { COMPANY_NAP } from "@/constants/company";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || COMPANY_NAP.url;

export const metadata: Metadata = {
  title: "Agência de Marketing para Hotéis | Réserve — Quem Somos",
  description:
    "A Réserve é a agência de marketing para hotéis especializada em reservas diretas. Conheça o time e como reduzimos a dependência de OTAs com Google Hotel Ads, SEO e tráfego pago.",
  keywords:
    "agência de marketing para hotel, agência de marketing hoteleiro, quem somos Réserve, equipe marketing hoteleiro, especialistas marketing para hotéis, agência marketing hotéis Brasil, sobre a Réserve",
  alternates: { canonical: `${siteUrl}/empresa` },
  openGraph: {
    title: "Agência de Marketing para Hotéis | Réserve — Quem Somos",
    description:
      "A Réserve é a agência de marketing hoteleiro especializada em transformar presença digital em reservas diretas. Conheça o time e a missão.",
    type: "website",
    url: `${siteUrl}/empresa`,
  },
};

export default function EmpresaPage() {
  return <EmpresaContent />;
}
