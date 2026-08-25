import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  // Each locale declares the other so Google serves MX visitors the Spanish
  // page and U.S. visitors the English one, instead of picking arbitrarily.
  const alternates = {
    languages: {
      en: `${SITE_URL}/en`,
      es: `${SITE_URL}/es`,
    },
  }

  return [
    { url: `${SITE_URL}/en`, lastModified, priority: 1, changeFrequency: 'monthly', alternates },
    { url: `${SITE_URL}/es`, lastModified, priority: 1, changeFrequency: 'monthly', alternates },
    { url: `${SITE_URL}/the-forge`, lastModified, priority: 0.6, changeFrequency: 'yearly' },
    { url: `${SITE_URL}/nicoles-cafe`, lastModified, priority: 0.6, changeFrequency: 'yearly' },
    { url: `${SITE_URL}/vessel-and-vine`, lastModified, priority: 0.6, changeFrequency: 'yearly' },
  ]
}
