import { MetadataRoute } from 'next';
import { locations, services, slugify } from '../data/seoData';
import { blogPosts } from '../data/blogData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.reparacionesmanzanares.es';
  
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/nosotros`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // Services + Locations dynamic routes
  services.forEach(service => {
    locations.forEach(location => {
      const slug = `${service.slugBase}-${slugify(location)}`;
      routes.push({
        url: `${baseUrl}/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    });
  });

  // Blog dynamic posts routes
  blogPosts.forEach(post => {
    routes.push({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  return routes;
}
