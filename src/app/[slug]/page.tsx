import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { locations, services, slugify, locationsData } from '@/data/seoData';
// Generate all 45 URLs at build time dynamically (SSG)
export function generateStaticParams() {
  const params: { slug: string }[] = [];
  services.forEach(service => {
    locations.forEach(location => {
      params.push({ slug: `${service.slugBase}-${slugify(location)}` });
    });
  });
  return params;
}

// Dynamic SEO tags
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const { service, locationData } = decodeSlug(resolvedParams.slug);
  if (!service || !locationData) return { title: 'Página no encontrada' };

  const location = locationData.name;

  return {
    title: `${service.title} en ${location} | Urgencias 24h`,
    description: `¿Buscas experto en ${service.name.toLowerCase()} en ${location}? Llegamos en menos de 30 minutos. Servicio técnico garantizado, tarifas transparentes y sin intermediarios. Llama al 919 930 963.`,
    alternates: {
      canonical: `https://www.reparacionesmanzanares.es/${resolvedParams.slug}`
    }
  };
}

// Reverse search
function decodeSlug(slug: string) {
  for (const s of services) {
    for (const l of locationsData) {
      if (`${s.slugBase}-${slugify(l.name)}` === slug) {
        return { service: s, locationData: l };
      }
    }
  }
  return { service: null, locationData: null };
}

export default async function ServiceLocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { service, locationData } = decodeSlug(resolvedParams.slug);
  if (!service || !locationData) notFound();

  const location = locationData.name;

  const baseUrl = 'https://www.reparacionesmanzanares.es';
  const slug = resolvedParams.slug;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": service.name,
        "item": `${baseUrl}/${service.slugBase}-manzanares-el-real`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": location,
        "item": `${baseUrl}/${slug}`
      }
    ]
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${service.title} en ${location}`,
    "description": service.description,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Reparaciones Manzanares",
      "telephone": "+34919930963",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": location,
        "addressRegion": "Madrid",
        "addressCountry": "ES"
      }
    },
    "areaServed": {
      "@type": "City",
      "name": location
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": service.name,
      "itemListElement": service.tasks.map(task => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": task
        }
      }))
    }
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": service.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* BREADCRUMBS */}
      <nav style={{ backgroundColor: '#F1F5F9', borderBottom: '1px solid #E2E8F0', padding: '0.75rem 0' }}>
        <div className="container" style={{ fontSize: '0.85rem', color: '#64748B' }}>
          <a href="/" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Inicio</a>
          <span style={{ margin: '0 0.5rem' }}>/</span>
          <span style={{ color: '#94A3B8' }}>{service.name}</span>
          <span style={{ margin: '0 0.5rem' }}>/</span>
          <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{location}</span>
        </div>
      </nav>

      <section style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '6rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ color: 'white', fontSize: '3.5rem', marginBottom: '1rem', lineHeight: 1.1 }}>
             {service.emoji} {service.title} en <span style={{ color: 'var(--color-accent)' }}>{location}</span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#CBD5E1', maxWidth: '750px', margin: '0 auto', lineHeight: 1.6 }}>
            Servicio de averías y reparaciones urgentes las 24 horas. Atendemos en el municipio de <strong>{location}</strong> (con desplazamientos rápidos por {locationData.localReferences}) de forma inmediata, con técnicos autorizados y tiempos de respuesta de unos {locationData.timeToArrive}.
          </p>
          <div style={{ marginTop: '2.5rem' }}>
             <a href="tel:+34919930963" 
                data-track-event="call"
                data-track-service={service.id}
                data-track-location={location}
                className="btn btn-accent animate-pulse" style={{ fontSize: '1.25rem', padding: '1.2rem 2.5rem' }}>
               Llamar Equipo {location}: 919 930 963
             </a>
          </div>
        </div>
      </section>

      <section style={{ padding: '6rem 0', backgroundColor: 'white' }}>
         <div className="container" style={{ maxWidth: '1000px' }}>
           <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center', color: 'var(--color-primary)' }}>
             Especialistas en {service.name.toLowerCase()} en {location}
           </h2>
           
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'start' }}>
              <div style={{ fontSize: '1.1rem', color: 'var(--color-text)', lineHeight: 1.8 }}>
                <p style={{ marginBottom: '1.5rem' }}>
                  Como especialistas en {service.name.toLowerCase()} en <strong>{location}</strong>, conocemos perfectamente 
                  zonas como {locationData.neighborhoods}. Nuestro compromiso es llegar a tu domicilio 
                  en un tiempo aproximado de <strong>{locationData.timeToArrive}</strong>.
                </p>
                <p style={{ marginBottom: '1.5rem', fontStyle: 'italic', paddingLeft: '1rem', borderLeft: '3px solid var(--color-accent)', color: 'var(--color-text-muted)' }}>
                  {locationData.uniqueContent}
                </p>
                {service.longDescription.map((p, i) => (
                 <p key={i} style={{ marginBottom: '1.5rem' }}>
                   {p.replace(/{location}/g, location)
                     .replace(/la Sierra de Madrid/g, location)
                     .replace(/la zona norte de Madrid/g, `${location} y alrededores`)}
                 </p>
               ))}
               
               <div style={{ marginTop: '2.5rem', padding: '2rem', backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-lg)', borderLeft: '4px solid var(--color-accent)' }}>
                 <h4 style={{ marginBottom: '1rem', color: 'var(--color-primary)' }}>⚠️ Consejo de Urgencia en {location}</h4>
                 <p style={{ fontSize: '0.95rem', fontStyle: 'italic' }}>
                   Si tienes una fuga de agua o un cortocircuito, localiza la llave de paso o el cuadro general y corta el suministro antes de llamarnos. Esto minimizará los daños hasta que lleguemos.
                 </p>
               </div>
             </div>

             <div style={{ backgroundColor: '#F8FAFC', padding: '2.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid #E2E8F0' }}>
               <h3 style={{ fontSize: '1.4rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-primary)' }}>
                 <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="var(--color-accent)" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                 ¿Qué solucionamos hoy?
               </h3>
               <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
                 {service.tasks.map((task, i) => (
                   <li key={i} style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '1rem' }}>
                     <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#10B981" strokeWidth={2.5} style={{ flexShrink: 0, marginTop: '3px' }}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                     <span>{task} en {location}</span>
                   </li>
                 ))}
               </ul>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                 <a href="tel:+34919930963" 
                    data-track-event="budget"
                    data-track-service={service.id}
                    data-track-location={location}
                    className="btn btn-accent" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', padding: '1rem', fontSize: '1.1rem' }}>
                   📞 Llamar Técnico ahora
                 </a>
                 <a href="https://wa.me/34919930963?text=Hola,%20necesito%20informaci%C3%B3n%20sobre%20un%20servicio%20de%20reparaci%C3%B3n." 
                    target="_blank"
                    rel="noopener noreferrer"
                    data-track-event="whatsapp"
                    data-track-service={service.id}
                    data-track-location={location}
                    className="btn" style={{ backgroundColor: '#25D366', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', padding: '1rem', fontSize: '1.1rem' }}>
                   💬 Enviar WhatsApp
                 </a>
               </div>
             </div>
           </div>
         </div>
      </section>

      {/* SERVICE SPECIFIC FAQS */}
      <section style={{ padding: '6rem 0', backgroundColor: '#F8FAFC' }}>
        <div className="container" style={{ maxWidth: '850px' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center', color: 'var(--color-primary)' }}>
            Preguntas sobre {service.name.toLowerCase()}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {service.faqs.map((faq, i) => (
              <details key={i} style={{ backgroundColor: 'white', border: '1px solid #E2E8F0', borderRadius: 'var(--radius-lg)', padding: '1.5rem', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}>
                <summary style={{ fontSize: '1.15rem', fontWeight: 600, color: '#334155', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {faq.q}
                  <span style={{ color: 'var(--color-accent)', fontSize: '1.5rem', fontWeight: 400 }}>+</span>
                </summary>
                <p style={{ marginTop: '1rem', color: '#64748B', lineHeight: 1.7, fontSize: '1.05rem' }}>
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '6rem 0', backgroundColor: 'var(--color-primary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'white' }}>Opiniones reales de clientes de la Sierra</h2>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: 'white', fontSize: '1.2rem', fontWeight: 600 }}>5/5</span>
              <div style={{ display: 'flex', gap: '2px' }}>
                {[1,2,3,4,5].map(i => <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="#FBBC05"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
              </div>
              <span style={{ color: '#CBD5E1', fontSize: '1rem' }}>(reseñas verificadas de Google Maps)</span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            {/* Review 1 */}
            <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', color: 'var(--color-text)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '24px', right: '24px', backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '20px', padding: '0.25rem 0.6rem', fontSize: '0.75rem', fontWeight: 600, color: '#16A34A' }}>
                ✓ Reseña Real
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ width: '45px', height: '45px', borderRadius: '50%', backgroundColor: '#4285F4', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>S</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1.05rem' }}>Sergio Alderpass</div>
                  <div style={{ fontSize: '0.85rem', color: '#64748B' }}>Local Guide • en Miraflores de la Sierra</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '2px', marginBottom: '1rem' }}>
                {[1,2,3,4,5].map(i => <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#FBBC05"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
              </div>
              <p style={{ fontSize: '1rem', color: '#334155', lineHeight: 1.6 }}>"Les llamé porque se me fue la luz en casa en Miraflores y no conseguía encontrar el problema. Vinieron bastante rápido, dieron con la avería enseguida y lo dejaron todo funcionando. Recomendables 100%!"</p>
            </div>

            {/* Review 2 */}
            <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', color: 'var(--color-text)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '24px', right: '24px', backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '20px', padding: '0.25rem 0.6rem', fontSize: '0.75rem', fontWeight: 600, color: '#16A34A' }}>
                ✓ Reseña Real
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ width: '45px', height: '45px', borderRadius: '50%', backgroundColor: '#EA4335', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>V</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1.05rem' }}>Velofer merca</div>
                  <div style={{ fontSize: '0.85rem', color: '#64748B' }}>Cliente • en Manzanares el Real</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '2px', marginBottom: '1rem' }}>
                {[1,2,3,4,5].map(i => <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#FBBC05"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
              </div>
              <p style={{ fontSize: '1rem', color: '#334155', lineHeight: 1.6 }}>"Tuve una fuga de agua en casa y, como vivo en Manzanares el Real, buscaba a alguien que pudiera venir rápido. Contacté con ellos por WhatsApp, respondieron enseguida y solucionaron el problema sin complicaciones. Muy contento con el servicio y con el trato recibido"</p>
            </div>
          </div>
        </div>
      </section>

      {/* LOCALIDADES CERCANAS / INTERLINKING */}
      <section style={{ padding: '4rem 0', backgroundColor: '#F8FAFC', borderTop: '1px solid #E2E8F0' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.4rem', color: 'var(--color-primary)', marginBottom: '1.5rem' }}>
            📍 Otras localidades con servicio de {service.name.toLowerCase()} cercano:
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
            {locationData.nearbyLocations.map((nearbyName) => {
              const nearbySlug = `${service.slugBase}-${slugify(nearbyName)}`;
              return (
                <Link 
                  key={nearbyName} 
                  href={`/${nearbySlug}`}
                  style={{
                    backgroundColor: 'white',
                    border: '1px solid #CBD5E1',
                    borderRadius: '30px',
                    padding: '0.6rem 1.2rem',
                    fontSize: '0.95rem',
                    color: 'var(--color-primary)',
                    fontWeight: 500,
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                  className="nearby-link"
                >
                  {service.title} en {nearbyName}
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
