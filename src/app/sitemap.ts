import { MetadataRoute } from 'next'
import { COMPANY_NAP } from '@/constants/company'

export const revalidate = 86400 // Revalidate every 24 hours

export default function sitemap(): MetadataRoute.Sitemap {
  const siteBase = process.env.NEXT_PUBLIC_SITE_URL || COMPANY_NAP.url
  
  // Static pages
  const staticPages = [
    {
      url: siteBase,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${siteBase}/empresa`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${siteBase}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${siteBase}/public/consultoria-sucesso`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${siteBase}/public/contact-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ]

  // Service areas (if you have location-based pages)
  const locationPages = COMPANY_NAP.areasServed.map(city => ({
    url: `${siteBase}/cidades/${city.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  return [
    ...staticPages,
    ...locationPages,
  ]
}