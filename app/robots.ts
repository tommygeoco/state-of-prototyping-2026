import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/api/'],
      },
    ],
    host: 'https://data.prototypingstate.com',
    sitemap: 'https://data.prototypingstate.com/sitemap.xml',
  }
}
