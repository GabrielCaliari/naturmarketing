import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { HeroCinematic } from "@/components/heroes/hero-cinematic";
import { SectionSpecialty } from "@/components/sections/section-specialty";
import { SectionResults } from "@/components/sections/section-results";
import { SectionServices } from "@/components/sections/section-services";
import { CtaStrip } from "@/components/sections/cta-strip";
import { SectionSegments } from "@/components/sections/section-segments";
import { SectionChannels } from "@/components/sections/section-channels";
import { SectionComparison } from "@/components/sections/section-comparison";
import { SectionBlog } from "@/components/sections/section-blog";
import { SectionFaq } from "@/components/sections/section-faq";
import { SectionFinalCta } from "@/components/sections/section-final-cta";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Réserve | Agência de Marketing Hoteleiro e Reservas Diretas" },
      {
        name: "description",
        content:
          "Agência especializada em marketing hoteleiro. Construímos canais próprios que geram reservas diretas e eliminam comissões de OTAs para hotéis, pousadas e resorts.",
      },
      {
        property: "og:title",
        content: "Réserve | Agência de Marketing Hoteleiro e Reservas Diretas",
      },
      {
        property: "og:description",
        content:
          "Agência especializada em marketing hoteleiro. Construímos canais próprios que geram reservas diretas e eliminam comissões de OTAs para hotéis, pousadas e resorts.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-offwhite font-body text-ink">
      <SiteHeader />
      <HeroCinematic />
      <SectionSpecialty />
      <SectionResults />
      <SectionServices />
      <CtaStrip />
      <SectionSegments />
      <SectionChannels />
      <SectionComparison />
      <SectionBlog />
      <SectionFaq />
      <SectionFinalCta />
      <SiteFooter />
    </div>
  );
}
