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
      canonical: `https://reparacionesmanzanares.es/${resolvedParams.slug}`
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

  return (
    <main>
      <section style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '6rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ color: 'white', fontSize: '3.5rem', marginBottom: '1rem' }}>
             {service.emoji} {service.title} en <span style={{ color: 'var(--color-accent)' }}>{location}</span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#CBD5E1', maxWidth: '750px', margin: '0 auto', lineHeight: 1.6 }}>
            Servicio de averías y reparaciones urgentes las 24 horas. Atendemos en el municipio de <strong>{location}</strong> y los alrededores de forma inmediata, sin cobrar costes ocultos o excesivos tarifas de desplazamiento.
          </p>
          <div style={{ marginTop: '2.5rem' }}>
             <a href="tel:+34669162085" className="btn btn-accent animate-pulse" style={{ fontSize: '1.25rem', padding: '1.2rem 2.5rem' }}>
               Llamar Equipo Urgencias: 669 162 085
             </a>
          </div>
        </div>
      </section>

      <section style={{ padding: '6rem 0', backgroundColor: 'white' }}>
         <div className="container" style={{ maxWidth: '900px' }}>
           <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>Tu técnico de confianza para {service.name.toLowerCase()} en {location}</h2>
           
           <div style={{ fontSize: '1.15rem', color: 'var(--color-text)', lineHeight: 1.8 }}>
             <p style={{ marginBottom: '2rem' }}>
               Si resides en <strong>{location}</strong> o tienes tu negocio aquí y te ha surgido una avería inesperada de {service.name.toLowerCase()}, estás en el lugar idóneo. Sabemos lo desesperante que resulta convivir con un problema en tu vivienda u oficina, por lo que tenemos técnicos distribuidos por la Sierra de Madrid preparados para acudir en un tiempo récord.
             </p>

             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', margin: '3rem 0', backgroundColor: 'var(--color-bg)', padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
                <div>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="var(--color-accent)" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Nuestra forma de trabajar
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li style={{ marginBottom: '0.8rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#10B981" strokeWidth={2} style={{ flexShrink: 0, marginTop: '2px' }}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      <span>Llegada en {'<'}30 min a {location}.</span>
                    </li>
                    <li style={{ marginBottom: '0.8rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#10B981" strokeWidth={2} style={{ flexShrink: 0, marginTop: '2px' }}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      <span>Presupuesto cerrado previo.</span>
                    </li>
                    <li style={{ marginBottom: '0.8rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#10B981" strokeWidth={2} style={{ flexShrink: 0, marginTop: '2px' }}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      <span>Garantía de 6 meses por ley.</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="var(--color-accent)" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    ¿Qué hacemos?
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li style={{ marginBottom: '0.8rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="var(--color-primary)" strokeWidth={2} style={{ flexShrink: 0, marginTop: '2px' }}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                      <span>{service.description}</span>
                    </li>
                    <li style={{ marginBottom: '0.8rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="var(--color-primary)" strokeWidth={2} style={{ flexShrink: 0, marginTop: '2px' }}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                      <span>Solución 100% definitiva hoy.</span>
                    </li>
                    <li style={{ marginBottom: '0.8rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="var(--color-primary)" strokeWidth={2} style={{ flexShrink: 0, marginTop: '2px' }}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                      <span>Piezas de repuesto originales.</span>
                    </li>
                  </ul>
                </div>
             </div>

             <p>
               No dejes que tu problema lo agrave un aficionado o intentes solucionarlo sin las herramientas adecuadas. Confía en los mayores expertos locales. Llámanos ahora mismo al <strong>669 162 085</strong>, explícanos tu avería en {location} y te daremos la orientación técnica para detener los daños y un presupuesto competitivo.
             </p>
           </div>
         </div>
      </section>

      {/* REVIEWS CLONADAS PARA PÁGINAS INTERNAS */}
      <section style={{ padding: '6rem 0', backgroundColor: 'var(--color-primary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'white' }}>Lo que opinan en {location} y alrededores</h2>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: 'white', fontSize: '1.2rem', fontWeight: 600 }}>4.9/5</span>
              <div style={{ display: 'flex', gap: '2px' }}>
                {[1,2,3,4,5].map(i => <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="#FBBC05"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
              </div>
              <span style={{ color: '#CBD5E1', fontSize: '1rem' }}>(+24 valoraciones en la zona)</span>
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
                  <div style={{ fontSize: '0.85rem', color: '#64748B' }}>hace 2 días en la zona</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '2px', marginBottom: '1rem' }}>
                {[1,2,3,4,5].map(i => <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#FBBC05"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
              </div>
              <p style={{ fontSize: '1rem', color: '#334155', lineHeight: 1.6 }}>"Llamé a las 3 de la mañana por una urgencia que me estaba inundando el salón. El operario llegó en 20 minutos y fue súper rápido. Me salvó la vida."</p>
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
              <p style={{ fontSize: '1rem', color: '#334155', lineHeight: 1.6 }}>"Saltaban los plomos en casa. El técnico detectó el cortocircuito rapidísimo y lo arregló cobrando un precio totalmente justo antes de dar el presupuesto. Muy honestos."</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
