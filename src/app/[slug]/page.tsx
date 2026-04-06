import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locations, services, slugify } from '@/data/seoData';

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
  const { service, location } = decodeSlug(resolvedParams.slug);
  if (!service || !location) return { title: 'Página no encontrada' };

  return {
    title: `${service.title} en ${location} | Urgencias 24h`,
    description: `¿Buscas experto en ${service.name.toLowerCase()} en ${location}? Llegamos en menos de 30 minutos. Servicio técnico garantizado, tarifas transparentes y sin intermediarios. Llama al 669 162 085.`,
    alternates: {
      canonical: `https://www.reparacionesmanzanares.es/${resolvedParams.slug}`
    }
  };
}

// Reverse search
function decodeSlug(slug: string) {
  for (const s of services) {
    for (const l of locations) {
      if (`${s.slugBase}-${slugify(l)}` === slug) {
        return { service: s, location: l };
      }
    }
  }
  return { service: null, location: null };
}

export default async function ServiceLocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { service, location } = decodeSlug(resolvedParams.slug);
  if (!service || !location) notFound();

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
      "telephone": "+34669162085",
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
            Servicio de averías y reparaciones urgentes las 24 horas. Atendemos en el municipio de <strong>{location}</strong> y toda la zona norte de Madrid de forma inmediata, con técnicos autorizados y tarifas competitivas.
          </p>
          <div style={{ marginTop: '2.5rem' }}>
             <a href="tel:+34669162085" className="btn btn-accent animate-pulse" style={{ fontSize: '1.25rem', padding: '1.2rem 2.5rem' }}>
               Llamar Equipo {location}: 669 162 085
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
               {service.longDescription.map((p, i) => (
                 <p key={i} style={{ marginBottom: '1.5rem' }}>{p.replace(/{location}/g, location)}</p>
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
               <ul style={{ listStyle: 'none', padding: 0 }}>
                 {service.tasks.map((task, i) => (
                   <li key={i} style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '1rem' }}>
                     <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#10B981" strokeWidth={2.5} style={{ flexShrink: 0, marginTop: '3px' }}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                     <span>{task} en {location}</span>
                   </li>
                 ))}
               </ul>
               <a href="tel:+34669162085" className="btn btn-accent" style={{ width: '100%', marginTop: '2rem', padding: '1rem' }}>Pedir Presupuesto Cerrado</a>
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
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'white' }}>Opiniones reales en {location}</h2>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: 'white', fontSize: '1.2rem', fontWeight: 600 }}>4.9/5</span>
              <div style={{ display: 'flex', gap: '2px' }}>
                {[1,2,3,4,5].map(i => <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="#FBBC05"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
              </div>
              <span style={{ color: '#CBD5E1', fontSize: '1rem' }}>(+24 valoraciones locales)</span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            
            <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', color: 'var(--color-text)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '24px', right: '24px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ width: '45px', height: '45px', borderRadius: '50%', backgroundColor: '#4285F4', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>C</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1.05rem' }}>Carlos G.</div>
                  <div style={{ fontSize: '0.85rem', color: '#64748B' }}>hace 2 días en {location}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '2px', marginBottom: '1rem' }}>
                {[1,2,3,4,5].map(i => <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#FBBC05"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
              </div>
              <p style={{ fontSize: '1rem', color: '#334155', lineHeight: 1.6 }}>"Llamé a las 3 de la mañana por una urgencia que me estaba inundando el salón en {location}. El operario llegó en 20 minutos y fue súper rápido. Me salvó la vida."</p>
            </div>

            <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', color: 'var(--color-text)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '24px', right: '24px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ width: '45px', height: '45px', borderRadius: '50%', backgroundColor: '#EA4335', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>M</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1.05rem' }}>María S.</div>
                  <div style={{ fontSize: '0.85rem', color: '#64748B' }}>hace 1 semana cerca de {location}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '2px', marginBottom: '1rem' }}>
                {[1,2,3,4,5].map(i => <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#FBBC05"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
              </div>
              <p style={{ fontSize: '1rem', color: '#334155', lineHeight: 1.6 }}>"Saltaban los plomos en casa. El técnico detectó el cortocircuito en {location} rapidísimo y lo arregló cobrando un precio totalmente justo. Muy honestos."</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
