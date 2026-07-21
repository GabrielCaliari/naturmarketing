import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/SEO/JsonLd";
import { COMPANY_NAP } from "@/constants/company";
import ContatoContent from "./_components/ContatoContent";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || COMPANY_NAP.url;

export const metadata: Metadata = {
  title: "Contato | Réserve | Agência de Marketing Hoteleiro",
  description:
    "Fale com a Réserve. Preencha o formulário e nosso time de vendas inicia o atendimento no WhatsApp já sabendo tudo sobre a sua hospedagem. Telefone, e-mail e endereço.",
  keywords:
    "contato réserve, falar com agência de marketing hoteleiro, contato marketing para hotéis, orçamento marketing hoteleiro",
  alternates: { canonical: `${siteUrl}/contato` },
  openGraph: {
    title: "Contato | Réserve | Agência de Marketing Hoteleiro",
    description:
      "Fale com a Réserve e comece pelo diagnóstico gratuito. Atendimento por WhatsApp, telefone e e-mail.",
    type: "website",
    url: `${siteUrl}/contato`,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Réserve | Contato" }],
  },
};

export default function ContatoPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Início", url: "/" },
        { name: "Contato", url: "/contato" },
      ]} />
      <ContatoContent />
    </>
  );
}
