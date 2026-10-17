import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.reparacionesmanzanares.es';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/crm.html'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
