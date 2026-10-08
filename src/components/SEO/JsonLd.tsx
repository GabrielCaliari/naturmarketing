import { COMPANY_NAP } from '@/constants/company'
import { DEPOIMENTOS } from '@/data/depoimentos'

interface JsonLdProps {
  data: Record<string, unknown>
  id?: string
}

export function JsonLd({ data, id }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      id={id}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

// Organization Schema
export function OrganizationJsonLd() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || COMPANY_NAP.url
  
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    "name": COMPANY_NAP.name,
    "legalName": COMPANY_NAP.legalName,
    "url": siteUrl,
    "email": COMPANY_NAP.email,
    "telephone": COMPANY_NAP.phone.schema,
    "foundingDate": COMPANY_NAP.foundingYear.toString(),
    // Service-area business (sem local físico no Google Meu Negócio):
    // não expomos endereço de rua nem geo; o atendimento é em todo o Brasil.
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "BR"
    },
    "sameAs": [
      COMPANY_NAP.social.instagram,
      COMPANY_NAP.social.facebook,
      COMPANY_NAP.social.linkedin,
      COMPANY_NAP.social.googleMaps
    ].filter(Boolean),
    "areaServed": COMPANY_NAP.areasServed.map(area => ({
      "@type": "City",
      "name": area
    }))
  }

  return <JsonLd data={organizationData} id="organization-schema" />
}

// LocalBusiness Schema
export function LocalBusinessJsonLd() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || COMPANY_NAP.url
  
  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": COMPANY_NAP.businessType,
    "@id": `${siteUrl}/#business`,
    "name": COMPANY_NAP.name,
    "description": COMPANY_NAP.tagline,
    "url": siteUrl,
    "email": COMPANY_NAP.email,
    "telephone": COMPANY_NAP.phone.schema,
    // Service-area business (sem local físico no Google Meu Negócio):
    // não expomos endereço de rua nem geo; o atendimento é em todo o Brasil.
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "BR"
    },
    "openingHours": [COMPANY_NAP.hours.schema],
    "areaServed": COMPANY_NAP.areasServed.map(area => ({
      "@type": "City",
      "name": area
    })),
    "sameAs": [
      COMPANY_NAP.social.instagram,
      COMPANY_NAP.social.facebook,
      COMPANY_NAP.social.linkedin,
      COMPANY_NAP.social.googleMaps
    ].filter(Boolean),
    "serviceType": COMPANY_NAP.industry,
    "priceRange": "$$"
  }

  return <JsonLd data={localBusinessData} id="local-business-schema" />
}

// WebSite Schema
export function WebSiteJsonLd() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || COMPANY_NAP.url
  
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    "name": COMPANY_NAP.name,
    "alternateName": "Réserve Marketing",
    "description": COMPANY_NAP.tagline,
    "url": siteUrl,
    "publisher": {
      "@id": `${siteUrl}/#organization`
    },
    "copyrightYear": new Date().getFullYear(),
    "copyrightHolder": {
      "@id": `${siteUrl}/#organization`
    },
    "inLanguage": "pt-BR"
  }

  return <JsonLd data={websiteData} id="website-schema" />
}

// Service Schema
export function ServiceJsonLd() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || COMPANY_NAP.url
  
  const serviceData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Marketing Digital Hoteleiro",
    "description": "Agência especializada em marketing hoteleiro para hotéis, resorts e pousadas. Google Hotel Ads, tráfego pago, SEO, site com motor de reservas e estratégias para aumentar reservas diretas e reduzir dependência de OTAs.",
    "provider": {
      "@id": `${siteUrl}/#organization`
    },
    "areaServed": [
      { "@type": "Country", "name": "Brasil" },
      { "@type": "Country", "name": "Brazil" }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Serviços de Marketing Hoteleiro / Hotel Marketing Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Google Hotel Ads" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Tráfego Pago para Hotéis / Paid Traffic for Hotels" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SEO para Hotéis e Pousadas / Hotel SEO" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Site Hoteleiro com Motor de Reservas / Hotel Website with Booking Engine" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Gestão de Redes Sociais para Hotéis / Hotel Social Media Management" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Reservas Diretas / Direct Booking Strategy" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Redução de OTAs / OTA Commission Reduction" } }
      ]
    },
    "serviceType": "Marketing Digital / Hotel Digital Marketing",
    "category": "Marketing Hoteleiro / Hotel Marketing Agency"
  }

  return <JsonLd data={serviceData} id="service-schema" />
}

// FAQ Schema
interface FAQItem {
  question: string
  answer: string
}

interface FAQJsonLdProps {
  faq: FAQItem[]
}

export function FAQJsonLd({ faq }: FAQJsonLdProps) {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faq.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  }

  return <JsonLd data={faqData} id="faq-schema" />
}

// Breadcrumb Schema
interface BreadcrumbItem {
  name: string
  url: string
}

interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[]
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || COMPANY_NAP.url
  
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${siteUrl}${item.url}`
    }))
  }

  return <JsonLd data={breadcrumbData} id="breadcrumb-schema" />
}

// Reviews / AggregateRating Schema
//
// EXPECTATIVA CORRETA: isto NÃO produz estrelas na SERP do Google. Desde a
// política de set/2019, avaliação "self-serving" — a empresa publicando no
// próprio site notas sobre si mesma, com @type Organization/LocalBusiness —
// é inelegível para o rich result de estrelas, mesmo sendo real. O valor aqui
// é AEO/AIO: dá aos buscadores de IA (ChatGPT, Perplexity, AI Overviews) uma
// fonte estruturada e citável das avaliações. Estrelas na busca dependeriam
// de avaliações em plataforma independente (Google Business Profile etc.).
//
// Só renderizar em página que EXIBE os depoimentos (hoje: a home, junto do
// componente Depoimentos). O Google exige que o conteúdo marcado esteja
// visível na página — emitir isto em uma rota sem a seção viola o requisito.
//
// Isto NÃO redeclara a entidade Organization (@id "#organization", emitida
// por OrganizationJsonLd no layout raiz e presente em toda página). Duas
// tags <script> com @type Organization e o mesmo @id — uma com NAP e sem
// avaliações, outra com avaliações e sem NAP — fariam o Google mesclar por
// @id, mas crawlers de IA e parsers genéricos costumam não mesclar, e o
// próprio objetivo deste schema é ser citável por eles. Por isso o
// AggregateRating e cada Review aqui são nós com identidade própria
// (@id distinto) que apenas *referenciam* a organização via itemReviewed —
// um parser que não resolve a referência ainda vê nós válidos e
// autoexplicativos, sem nunca ver duas Organizations conflitantes.
export function ReviewsJsonLd() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || COMPANY_NAP.url

  const depoimentosComNota = DEPOIMENTOS.filter(
    (d): d is typeof d & { nota: 1 | 2 | 3 | 4 | 5 } => d.nota != null
  )

  // Regra inegociável: sem depoimento com nota, não há avaliação real para
  // publicar — nunca emitir aggregateRating/review fabricado (violaria as
  // diretrizes do Google e pode gerar penalização manual do domínio).
  if (depoimentosComNota.length === 0) {
    return null
  }

  const media = depoimentosComNota.reduce((soma, d) => soma + d.nota, 0) / depoimentosComNota.length
  const organizationRef = { "@id": `${siteUrl}/#organization` }

  const reviewsData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AggregateRating",
        "@id": `${siteUrl}/#aggregate-rating`,
        "itemReviewed": organizationRef,
        "ratingValue": Math.round(media * 10) / 10,
        "reviewCount": depoimentosComNota.length,
        "bestRating": 5,
        "worstRating": 1
      },
      ...depoimentosComNota.map(d => ({
        "@type": "Review",
        "@id": `${siteUrl}/#review-${d.id}`,
        "itemReviewed": organizationRef,
        "author": {
          "@type": "Person",
          "name": d.nome
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": d.nota,
          "bestRating": 5,
          "worstRating": 1
        },
        ...(d.texto ? { "reviewBody": d.texto } : {}),
        ...(d.data ? { "datePublished": d.data } : {})
      }))
    ]
  }

  return <JsonLd data={reviewsData} id="reviews-schema" />
}
