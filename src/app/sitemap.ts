import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://ricardonieblas.com/en', lastModified: new Date(), priority: 1 },
    { url: 'https://ricardonieblas.com/es', lastModified: new Date(), priority: 1 },
  ]
}
