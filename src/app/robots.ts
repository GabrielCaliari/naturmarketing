import { MetadataRoute } from 'next'
import { COMPANY_NAP } from '@/constants/company'

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || COMPANY_NAP.url
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/data/',
          '/maintenance',
          '/admin',
        ],
      },
      // Allow AI crawlers for referral traffic
      {
        userAgent: ['GPTBot', 'ClaudeBot', 'ChatGPT-User'],
        allow: '/',
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}