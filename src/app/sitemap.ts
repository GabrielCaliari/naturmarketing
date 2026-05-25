import { MetadataRoute } from 'next'
import { COMPANY_NAP } from '@/constants/company'
import { blogPosts } from '@/data/blog-posts'

export const revalidate = 86400 // Revalidate every 24 hours

export default function sitemap(): MetadataRoute.Sitemap {
  const siteBase = process.env.NEXT_PUBLIC_SITE_URL || COMPANY_NAP.url

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteBase,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${siteBase}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteBase}/google-hotel-ads`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${siteBase}/seo-para-hoteis`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${siteBase}/reservas-diretas`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${siteBase}/sites-para-hoteis`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${siteBase}/empresa`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteBase}/contact-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${siteBase}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${siteBase}/terms-and-conditions`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // Blog articles
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${siteBase}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [
    ...staticPages,
    ...blogPages,
  ]
}
