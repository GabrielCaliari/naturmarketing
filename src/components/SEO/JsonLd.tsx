import { COMPANY_NAP } from '@/constants/company'

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
    "address": {
      "@type": "PostalAddress",
      "streetAddress": COMPANY_NAP.address.street,
      "addressLocality": COMPANY_NAP.address.city,
      "addressRegion": COMPANY_NAP.address.state,
      "postalCode": COMPANY_NAP.address.zip,
      "addressCountry": "BR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": COMPANY_NAP.geo.latitude,
      "longitude": COMPANY_NAP.geo.longitude
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
    "address": {
      "@type": "PostalAddress",
      "streetAddress": COMPANY_NAP.address.street,
      "addressLocality": COMPANY_NAP.address.city,
      "addressRegion": COMPANY_NAP.address.state,
      "postalCode": COMPANY_NAP.address.zip,
      "addressCountry": "BR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": COMPANY_NAP.geo.latitude,
      "longitude": COMPANY_NAP.geo.longitude
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
    "description": "Serviços especializados de marketing digital para hotéis, resorts e pousadas. Gestão de tráfego, reservas diretas e redução de dependência de OTAs.",
    "provider": {
      "@id": `${siteUrl}/#organization`
    },
    "areaServed": COMPANY_NAP.areasServed.map(area => ({
      "@type": "City", 
      "name": area
    })),
    "serviceType": "Marketing Digital",
    "category": "Marketing Hoteleiro"
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