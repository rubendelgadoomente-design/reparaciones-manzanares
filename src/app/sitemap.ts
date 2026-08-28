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
  const reformServices = ['reformas-integrales', 'reformas-cocinas', 'reformas-banos'];
  const priorityLocations = ['collado-villalba', 'guadarrama', 'colmenar-viejo', 'alpedrete'];

  services.forEach(service => {
    locations.forEach(location => {
      const slug = `${service.slugBase}-${slugify(location)}`;
      const isReform = reformServices.includes(service.slugBase);
      const isPriorityLocation = priorityLocations.includes(slugify(location));
      const priority = isReform && isPriorityLocation ? 0.95 : isReform ? 0.9 : 0.8;
      routes.push({
        url: `${baseUrl}/${slug}`,
        lastModified: new Date(),
        changeFrequency: isReform ? 'weekly' : 'monthly',
        priority,
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
