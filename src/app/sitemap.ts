import { MetadataRoute } from 'next';
import { locations, services, slugify } from '../data/seoData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://reparacionesmanzanares.es';
  
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];

  services.forEach(service => {
    locations.forEach(location => {
      const slug = `${service.slugBase}-${slugify(location)}`;
      routes.push({
        url: `${baseUrl}/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.8,
      });
    });
  });

  return routes;
}
