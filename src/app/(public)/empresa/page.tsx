import type { Metadata } from "next";
import EmpresaContent from "./_components/EmpresaContent";
import { COMPANY_NAP } from "@/constants/company";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || COMPANY_NAP.url;

export const metadata: Metadata = {
  title: "Nossa Empresa | Réserve — Agência de Marketing Hoteleiro",
  description:
    "Conheça a Réserve, agência especializada em marketing hoteleiro fundada para libertar hotéis, resorts e pousadas da dependência de OTAs. Time de especialistas em Google Hotel Ads, SEO, tráfego pago e reservas diretas.",
  keywords:
    "agência de marketing hoteleiro, quem somos Réserve, equipe marketing hoteleiro, especialistas marketing para hotéis, agência marketing hotéis Brasil, sobre a Réserve",
  alternates: { canonical: `${siteUrl}/empresa` },
  openGraph: {
    title: "Nossa Empresa | Réserve — Agência de Marketing Hoteleiro",
    description:
      "A Réserve é a agência de marketing hoteleiro especializada em transformar presença digital em reservas diretas. Conheça o time e a missão.",
    type: "website",
    url: `${siteUrl}/empresa`,
  },
};

export default function EmpresaPage() {
  return <EmpresaContent />;
}
