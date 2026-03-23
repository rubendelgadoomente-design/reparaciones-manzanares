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
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Nuestra forma de trabajar</h3>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li style={{ marginBottom: '0.5rem' }}>✅ Llegada en {'<'}30 min a {location}.</li>
                    <li style={{ marginBottom: '0.5rem' }}>✅ Presupuesto cerrado previo.</li>
                    <li style={{ marginBottom: '0.5rem' }}>✅ Garantía de 6 meses por ley.</li>
                  </ul>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>¿Qué hacemos?</h3>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li style={{ marginBottom: '0.5rem' }}>👉 {service.description}</li>
                    <li style={{ marginBottom: '0.5rem' }}>👉 Solución 100% definitiva hoy.</li>
                    <li style={{ marginBottom: '0.5rem' }}>👉 Piezas de repuesto originales.</li>
                  </ul>
                </div>
             </div>

             <p>
               No dejes que tu problema lo agrave un aficionado o intentes solucionarlo sin las herramientas adecuadas. Confía en los mayores expertos locales. Llámanos ahora mismo al <strong>669 162 085</strong>, explícanos tu avería en {location} y te daremos la orientación técnica para detener los daños y un presupuesto competitivo.
             </p>
           </div>
         </div>
      </section>
    </main>
  );
}
