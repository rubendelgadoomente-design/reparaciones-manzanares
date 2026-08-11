import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { locations, services, slugify, locationsData } from '@/data/seoData';
import { CalculadoraCaldera, CalculadoraAire } from '@/components/Calculadoras';
import Testimonios, { Review } from '@/components/Testimonios';

const PHONE_NUMBER = "919 93 09 63";
const PHONE_RAW = "919930963";

// Generate all 165 URLs (11 services * 15 locations) at build time dynamically (SSG)
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
  
  // Custom high-CTR title
  const isReforma = service.id.startsWith('reformas');
  const title = isReforma 
    ? `${service.title} en ${location} | Presupuesto Cerrado`
    : `${service.title} en ${location} | Urgencias 24h`;
  
  const description = isReforma
    ? `¿Planeas una reforma de ${service.name.toLowerCase()} en ${location}? Creamos proyectos a medida con presupuestos cerrados y dirección técnica. Llama al ${PHONE_NUMBER}.`
    : `¿Buscas experto en ${service.name.toLowerCase()} en ${location}? Llegamos en menos de 30 minutos. Servicio técnico garantizado, tarifas transparentes y sin intermediarios. Llama al ${PHONE_NUMBER}.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.reparacionesmanzanares.es/${resolvedParams.slug}`
    }
  };
}

// Reverse search to decode the slug
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

// Contextual linking function
function injectContextualLinks(text: string, currentLocationName: string) {
  let modifiedText = text;
  
  // Map keywords to their corresponding target services
  const keywordMapping = [
    { key: "fontanero", serviceSlug: "fontanero" },
    { key: "fontanería", serviceSlug: "fontanero" },
    { key: "electricista", serviceSlug: "electricista" },
    { key: "electricidad", serviceSlug: "electricista" },
    { key: "cerrajero", serviceSlug: "cerrajero" },
    { key: "cerrajería", serviceSlug: "cerrajero" },
    { key: "persianista", serviceSlug: "persianista" },
    { key: "persianas", serviceSlug: "persianista" },
    { key: "caldera", serviceSlug: "reparacion-calderas" },
    { key: "calderas", serviceSlug: "reparacion-calderas" },
    { key: "aire acondicionado", serviceSlug: "aire-acondicionado" },
    { key: "climatización", serviceSlug: "aire-acondicionado" },
    { key: "manitas", serviceSlug: "manitas" },
    { key: "reparaciones del hogar", serviceSlug: "reparaciones-hogar" },
    { key: "reformas de cocinas", serviceSlug: "reformas-cocinas" },
    { key: "reformas de baños", serviceSlug: "reformas-banos" },
    { key: "reformas integrales", serviceSlug: "reformas-integrales" }
  ];
  
  const locationSlug = slugify(currentLocationName);
  const replacedSlugs = new Set<string>();
  
  keywordMapping.forEach(({ key, serviceSlug }) => {
    if (replacedSlugs.has(serviceSlug)) return;
    
    // Regexp focusing on word boundaries, case-insensitive
    const regex = new RegExp(`\\b(${key})\\b`, 'i');
    
    if (regex.test(modifiedText)) {
      modifiedText = modifiedText.replace(regex, (match) => {
        replacedSlugs.add(serviceSlug);
        return `<a href="/${serviceSlug}-${locationSlug}" style="color: var(--color-accent); font-weight: 700; text-decoration: underline;">${match}</a>`;
      });
    }
  });
  
  return modifiedText;
}

// Trust signals block
function TrustSignals({ isReforma }: { isReforma: boolean }) {
  const signals = isReforma ? [
    { icon: "📐", text: "Visita y Medición Gratis" },
    { icon: "👷", text: "Coordinación de Oficios" },
    { icon: "📋", text: "Presupuesto Cerrado" },
    { icon: "📝", text: "Garantías de 3 Años" },
    { icon: "⏱️", text: "Cumplimiento de Plazos" },
    { icon: "💳", text: "Financiación a Medida" }
  ] : [
    { icon: "⚡", text: "Atención urgente 24h" },
    { icon: "👷", text: "Técnicos certificados" },
    { icon: "📋", text: "Presupuesto cerrado" },
    { icon: "📝", text: "Garantía de 6 meses" },
    { icon: "⏱️", text: "Llegada en 30 min" },
    { icon: "💳", text: "Pago con tarjeta" }
  ];
  
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
      gap: '1rem',
      margin: '2.5rem 0',
      padding: '1.5rem',
      backgroundColor: '#F8FAFC',
      borderRadius: 'var(--radius-md)',
      border: '1px solid #E2E8F0',
      boxShadow: 'var(--shadow-sm)'
    }}>
      {signals.map((sig, idx) => (
        <div key={idx} style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          textAlign: 'center', 
          gap: '0.4rem' 
        }}>
          <span style={{ fontSize: '1.8rem', display: 'block' }}>{sig.icon}</span>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', lineHeight: 1.25 }}>
            {sig.text}
          </span>
        </div>
      ))}
    </div>
  );
}

// Inline CTA Component
function CTAInline({ serviceName, location, idx, isReforma }: { serviceName: string, location: string, idx: number, isReforma: boolean }) {
  if (isReforma) {
    return (
      <div style={{
        margin: '2.5rem 0',
        padding: '2.5rem',
        backgroundColor: '#F8FAFC',
        borderLeft: '5px solid var(--color-accent)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <h4 style={{ color: 'var(--color-primary)', fontSize: '1.3rem', marginBottom: '0.5rem', fontWeight: 800 }}>
          📐 ¿Deseas solicitar presupuesto para tu reforma de {serviceName.toLowerCase()} en {location}?
        </h4>
        <p style={{ fontSize: '0.95rem', color: '#475569', marginBottom: '1.5rem', lineHeight: 1.6 }}>
          Ofrecemos visitas de medición y asesoramiento técnico sin ningún coste. Te entregaremos un presupuesto detallado, desglosado y cerrado por escrito.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a href={`tel:${PHONE_RAW}`} 
             data-track-event="call"
             data-track-service={`${slugify(serviceName)}-cta-${idx}`}
             data-track-location={slugify(location)}
             className="btn btn-accent" 
             style={{ padding: '0.8rem 1.8rem', fontSize: '1rem', fontWeight: 700 }}>
            📞 Solicitar Presupuesto: {PHONE_NUMBER}
          </a>
          <a href={`https://wa.me/34${PHONE_RAW}?text=Hola,%20necesito%20presupuesto%20para%20una%20reforma%20de%20${encodeURIComponent(serviceName.toLowerCase())}%20en%20${encodeURIComponent(location)}.`} 
             target="_blank" 
             rel="noopener noreferrer" 
             data-track-event="whatsapp"
             data-track-service={`${slugify(serviceName)}-cta-${idx}`}
             data-track-location={slugify(location)}
             className="btn" 
             style={{ backgroundColor: '#25D366', color: 'white', padding: '0.8rem 1.8rem', fontSize: '1rem', fontWeight: 700 }}>
            💬 Consultar por WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      margin: '2.5rem 0',
      padding: '2.5rem',
      backgroundColor: '#F8FAFC',
      borderLeft: '5px solid var(--color-accent)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <h4 style={{ color: 'var(--color-primary)', fontSize: '1.3rem', marginBottom: '0.5rem', fontWeight: 800 }}>
        🔧 ¿Necesitas solucionar una avería de {serviceName.toLowerCase()} en {location}?
      </h4>
      <p style={{ fontSize: '0.95rem', color: '#475569', marginBottom: '1.5rem', lineHeight: 1.6 }}>
        No corras riesgos. En <strong>Reparaciones Manzanares</strong> garantizamos asistencia inmediata de urgencias 24 horas y presupuesto cerrado sin compromiso.
      </p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <a href={`tel:${PHONE_RAW}`} 
           data-track-event="call"
           data-track-service={`${slugify(serviceName)}-cta-${idx}`}
           data-track-location={slugify(location)}
           className="btn btn-accent" 
           style={{ padding: '0.8rem 1.8rem', fontSize: '1rem', fontWeight: 700 }}>
          📞 Llamar Técnico: {PHONE_NUMBER}
        </a>
        <a href={`https://wa.me/34${PHONE_RAW}?text=Hola,%20necesito%20informaci%C3%B3n%20sobre%20un%20servicio%20de%20reparaci%C3%B3n%20en%20${encodeURIComponent(location)}.`} 
           target="_blank" 
           rel="noopener noreferrer" 
           data-track-event="whatsapp"
           data-track-service={`${slugify(serviceName)}-cta-${idx}`}
           data-track-location={slugify(location)}
           className="btn" 
           style={{ backgroundColor: '#25D366', color: 'white', padding: '0.8rem 1.8rem', fontSize: '1rem', fontWeight: 700 }}>
          💬 WhatsApp Express
        </a>
      </div>
    </div>
  );
}

// Generic price guide table
function ServicePriceTable({ serviceName }: { serviceName: string }) {
  const priceGuide: Record<string, { service: string, price: string, time: string }[]> = {
    "fontaneria": [
      { service: "Desatasco de tuberías sencillo", price: "Desde 60€", time: "30-50 min" },
      { service: "Localización de fugas ocultas", price: "Bajo presupuesto", time: "1-2 horas" },
      { service: "Cambio de grifería o llaves", price: "Desde 50€", time: "20-40 min" },
      { service: "Reparación de cisterna WC", price: "Desde 65€", time: "30-60 min" }
    ],
    "electricidad": [
      { service: "Localización de cortocircuitos", price: "Desde 70€", time: "40-90 min" },
      { service: "Sustitución de diferencial", price: "Desde 80€", time: "30-50 min" },
      { service: "Instalación de cuadro eléctrico", price: "Desde 180€", time: "2-4 horas" },
      { service: "Boletín eléctrico oficial (CIE)", price: "Desde 150€", time: "24-48 horas" }
    ],
    "calderas": [
      { service: "Mantenimiento y revisión RITE", price: "Desde 90€", time: "1-2 horas" },
      { service: "Limpieza de quemador / inyectores", price: "Desde 75€", time: "45-75 min" },
      { service: "Reparación de bomba circuladora", price: "Desde 110€", time: "1-2 horas" },
      { service: "Instalación de caldera condensación", price: "Bajo presupuesto", time: "1 día" }
    ],
    "cerrajeria": [
      { service: "Apertura de puerta sin romper", price: "Desde 55€", time: "15-30 min" },
      { service: "Cambio de bombín anti-bumping", price: "Desde 80€", time: "20-45 min" },
      { service: "Instalación de cerrojo suplemento", price: "Desde 95€", time: "30-60 min" },
      { service: "Instalación de escudo protector", price: "Desde 120€", time: "1-2 horas" }
    ],
    "reformas-integrales": [
      { service: "Reforma completa piso (hasta 70m²)", price: "Desde 18.000€", time: "6-8 semanas" },
      { service: "Reforma completa chalet (hasta 120m²)", price: "Desde 29.000€", time: "8-12 semanas" },
      { service: "Renovación de tabiquería y pladur", price: "Desde 45€/m²", time: "Variable" },
      { service: "Aislamiento térmico de paredes (lana de roca)", price: "Desde 28€/m²", time: "Variable" }
    ],
    "reformas-cocinas": [
      { service: "Reforma de cocina estándar (mano de obra + fontanería/luz)", price: "Desde 3.500€", time: "2 semanas" },
      { service: "Mobiliario a medida con herrajes Blum", price: "Desde 2.900€", time: "1 semana" },
      { service: "Encimera de Silestone o Granito nacional", price: "Desde 1.200€", time: "3 días" },
      { service: "Enchufes y adecuación eléctrica según REBT", price: "Desde 450€", time: "2 días" }
    ],
    "reformas-banos": [
      { service: "Cambio de bañera por plato de ducha (Kit completo)", price: "Desde 890€", time: "24-48 horas" },
      { service: "Reforma de baño estándar (alicatado + sanitarios)", price: "Desde 2.600€", time: "5-7 días" },
      { service: "Impermeabilización de ducha y plato de resina", price: "Desde 550€", time: "1 día" },
      { service: "Instalación de inodoro suspendido con cisterna Geberit", price: "Desde 750€", time: "1 día" }
    ]
  };

  const list = priceGuide[serviceName.toLowerCase()] || [
    { service: "Reparación básica de avería", price: "Desde 50€", time: "30-60 min" },
    { service: "Mantenimiento preventivo general", price: "Desde 60€", time: "1-2 horas" },
    { service: "Sustitución de componentes", price: "Bajo presupuesto", time: "1-2 horas" }
  ];

  return (
    <div style={{ margin: '3rem 0' }}>
      <h3 style={{ fontSize: '1.4rem', color: 'var(--color-primary)', marginBottom: '1rem', fontWeight: 700 }}>
        📊 Tarifas Orientativas del Servicio
      </h3>
      <p style={{ fontSize: '0.95rem', color: '#64748B', marginBottom: '1.5rem', lineHeight: 1.6 }}>
        Precios aproximados del mercado para las intervenciones más usuales en la zona. Ofrecemos presupuestos cerrados.
      </p>
      <table className="price-table">
        <thead>
          <tr>
            <th>Tipo de Trabajo</th>
            <th>Precio Estimado</th>
            <th>Tiempo Medio</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item, idx) => (
            <tr key={idx}>
              <td style={{ fontWeight: 600 }}>{item.service}</td>
              <td style={{ color: 'var(--color-accent)', fontWeight: 700 }}>{item.price}</td>
              <td>{item.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Local architects and aparejadores recommendations block
function ArchitectsSection({ location }: { location: string }) {
  return (
    <div style={{
      marginTop: '3.5rem',
      padding: '2.5rem',
      backgroundColor: '#F8FAFC',
      border: '1px solid #E2E8F0',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <h3 style={{ fontSize: '1.4rem', color: 'var(--color-primary)', marginBottom: '1.5rem', fontWeight: 800 }}>
        📐 Dirección Técnica y Proyectos de Arquitectura en {location}
      </h3>
      <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: '1.5rem' }}>
        Para proyectos de reforma integral que afecten a elementos estructurales (muros de carga, vigas), cambios de fachadas, cubiertas o que requieran **Proyecto de Edificación y visado técnico** en el Ayuntamiento de {location}, colaboramos de forma estrecha con los principales estudios de arquitectura e interiorismo locales.
      </p>
      <p style={{ fontSize: '0.95rem', color: '#64748B', lineHeight: 1.7, margin: 0, fontStyle: 'italic', borderLeft: '3px solid var(--color-accent)', paddingLeft: '1rem' }}>
        ¿Eres arquitecto, arquitecto técnico (aparejador) o diseñador de interiores y realizas obras en {location}? Ponte en contacto con nosotros. Colaboramos en la ejecución material de obras de albañilería, fontanería y electricidad, asegurando enlaces de recomendación mutua y condiciones preferenciales.
      </p>
    </div>
  );
}

export default async function ServiceLocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { service, locationData } = decodeSlug(resolvedParams.slug);
  if (!service || !locationData) notFound();

  const location = locationData.name;
  const baseUrl = 'https://www.reparacionesmanzanares.es';
  const slug = resolvedParams.slug;
  const isReforma = service.id.startsWith('reformas');

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
        "item": isReforma ? `${baseUrl}/reformas-integrales-manzanares-el-real` : `${baseUrl}/${service.slugBase}-manzanares-el-real`
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
      "telephone": `+34${PHONE_RAW}`,
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

  // Enriched localized FAQs (15 original FAQs + 4 hyper-local FAQs = 19 FAQs total)
  const localFAQs = isReforma ? [
    {
      q: `¿Realizáis presupuestos de ${service.name.toLowerCase()} en ${location} sin compromiso?`,
      a: `Sí, realizamos visitas técnicas de medición y presupuesto completamente gratuitas en todo ${location}. Nuestros técnicos locales te asesorarán y te entregarán un presupuesto cerrado por escrito con el desglose de materiales y mano de obra.`
    },
    {
      q: `¿Cuánto tardáis en iniciar una obra de ${service.name.toLowerCase()} en ${location}?`,
      a: `Una vez aceptado el presupuesto y definida la fecha en el contrato de obra, solemos iniciar los trabajos en un plazo de 7 a 15 días, coordinando la solicitud de contenedores de escombro y los permisos municipales necesarios en {location}.`
    },
    {
      q: `¿Os encargáis de la tramitación de las licencias de obra en ${location}?`,
      a: `Sí. Para tu tranquilidad, gestionamos toda la documentación técnica para la presentación de la Declaración Responsable de obra menor o proyecto de obra en el Ayuntamiento de ${location}, asegurando cumplir la ordenanza urbanística local.`
    },
    {
      q: `¿Qué garantía tienen los trabajos de reformas de ${service.name.toLowerCase()} en ${location}?`,
      a: `Todas nuestras reformas en ${location} están totalmente garantizadas. Ofrecemos 3 años de garantía en todas las instalaciones y elementos mecánicos (según ley), y 1 año para acabados y remates de pintura o carpintería.`
    }
  ] : [
    {
      q: `¿Atendéis urgencias de ${service.name.toLowerCase()} en ${location} las 24 horas?`,
      a: `Sí, por supuesto. Nuestro equipo de técnicos de ${service.name.toLowerCase()} atiende de forma urgente las 24 horas del día en ${location} y todas sus zonas de influencia, incluyendo festivos y fines de semana.`
    },
    {
      q: `¿Cuánto tardáis en llegar para solucionar una avería en ${location}?`,
      a: `Nuestro tiempo de llegada promedio en ${location} es de unos ${locationData.timeToArrive}. Al circular por las carreteras principales ${locationData.localReferences}, nos desplazamos con extrema rapidez.`
    },
    {
      q: `¿Os desplazáis a todas las urbanizaciones y barrios de ${location}?`,
      a: `Sí. Prestamos asistencia técnica directa en todo el casco urbano de ${location} y en las urbanizaciones perimetrales como ${locationData.neighborhoods}.`
    },
    {
      q: `¿Cuánto cobráis por el desplazamiento de un ${service.title.toLowerCase()} en ${location}?`,
      a: `En Reparaciones Manzanares el desplazamiento del profesional es 100% gratuito siempre y cuando se acepte el presupuesto cerrado de la reparación.`
    }
  ];

  const allFAQs = [...service.faqs, ...localFAQs];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": allFAQs.map(faq => ({
      "@type": "Question",
      "name": faq.q.replace(/{location}/g, location),
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a.replace(/{location}/g, location)
      }
    }))
  };

  // Prepare and inject contextual links in description text
  const paragraphs = service.longDescription.map((p) => {
    const rawParagraph = p.replace(/{location}/g, location)
                          .replace(/la Sierra de Madrid/g, location)
                          .replace(/la zona norte de Madrid/g, `${location} y alrededores`);
    return injectContextualLinks(rawParagraph, location);
  });

  // Split description paragraphs
  const firstBatch = paragraphs.slice(0, 2);
  const secondBatch = paragraphs.slice(2, 5);
  const thirdBatch = paragraphs.slice(5);

  // Filter actual real reviews matching location or service
  const realReviews: Review[] = [
    {
      name: "Sergio Alderpass",
      city: "Miraflores de la Sierra",
      service: "Electricidad",
      date: "12 de Junio, 2026",
      rating: 5,
      text: "Les llamé porque se me fue la luz en casa en Miraflores y no conseguía encontrar el problema. Vinieron bastante rápido, dieron con la avería enseguida y lo dejaron todo funcionando. Recomendables 100%!"
    },
    {
      name: "Velofer merca",
      city: "Manzanares el Real",
      service: "Fontanería",
      date: "14 de Junio, 2026",
      rating: 5,
      text: "Tuve una fuga de agua en casa y, como vivo en Manzanares el Real, buscaba a alguien que pudiera venir rápido. Contacté con ellos por WhatsApp, respondieron enseguida y solucionaron el problema sin complicaciones. Muy contento con el servicio y con el trato recibido"
    }
  ];

  const applicableReviews = realReviews.filter(rev => 
    rev.city.toLowerCase() === location.toLowerCase() || 
    rev.service.toLowerCase() === service.name.toLowerCase()
  );

  const otherLocations = locationsData.filter(loc => loc.name !== location);
  const otherServices = services.filter(srv => srv.id !== service.id);

  // Future review schema markup (empty in this stage as we are preparing reviews setup without fictive data)
  const reviewJsonLd = applicableReviews.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `${service.title} en ${location}`,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": applicableReviews.length.toString()
    },
    "review": applicableReviews.map(rev => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": rev.name
      },
      "datePublished": "2026-06-12",
      "reviewBody": rev.text,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": rev.rating.toString(),
        "bestRating": "5"
      }
    }))
  } : null;

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      {reviewJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewJsonLd) }} />
      )}

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

      {/* HERO SECTION */}
      <section style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ color: 'white', fontSize: '3rem', marginBottom: '1rem', lineHeight: 1.15 }}>
             {service.emoji} {service.title} en <span style={{ color: 'var(--color-accent)' }}>{location}</span>
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#CBD5E1', maxWidth: '850px', margin: '0 auto', lineHeight: 1.6 }}>
            {isReforma 
              ? `Estudio de reformas, diseño de interiores y obras a medida en ${location}. Te ofrecemos asesoramiento técnico profesional, proyectos de medición gratuitos y presupuesto cerrado por contrato.`
              : `Servicio técnico urgente las 24h. Solucionamos averías en ${location} (con desplazamientos rápidos por ${locationData.localReferences}) con operarios autorizados y asistencia en unos ${locationData.timeToArrive}.`
            }
          </p>
          <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
             <a href={`tel:${PHONE_RAW}`} 
                data-track-event="call"
                data-track-service={service.id}
                data-track-location={location}
                className="btn btn-accent animate-pulse" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
               {isReforma ? `📞 Solicitar Presupuesto` : `📞 Llamar Técnico: ${PHONE_NUMBER}`}
             </a>
             <a href={isReforma
                ? `https://wa.me/34${PHONE_RAW}?text=Hola,%20necesito%20presupuesto%20para%20una%20reforma%20de%20${encodeURIComponent(service.name.toLowerCase())}%20en%20${encodeURIComponent(location)}.`
                : `https://wa.me/34${PHONE_RAW}?text=Hola,%20necesito%20asistencia%20de%20${encodeURIComponent(service.name.toLowerCase())}%20en%20${encodeURIComponent(location)}.`
             } 
                target="_blank"
                rel="noopener noreferrer"
                data-track-event="whatsapp"
                data-track-service={service.id}
                data-track-location={location}
                className="btn animate-pulse-wa" style={{ backgroundColor: '#25D366', color: 'white', fontSize: '1.1rem', padding: '1rem 2rem' }}>
               {isReforma ? `💬 Consultar por WhatsApp` : `💬 WhatsApp Express`}
             </a>
          </div>
        </div>
      </section>

      {/* PILLAR PAGE CONTENT */}
      <section style={{ padding: '5rem 0', backgroundColor: 'white' }}>
         <div className="container" style={{ maxWidth: '1100px' }}>
           <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'start' }}>
              
              {/* Text content area */}
              <div style={{ flex: '1 1 600px', fontSize: '1.1rem', color: 'var(--color-text)', lineHeight: 1.8 }}>
                <h2 style={{ fontSize: '2.2rem', marginBottom: '1.5rem', color: 'var(--color-primary)' }}>
                  {isReforma 
                    ? `Proyectos y reformas de ${service.name.toLowerCase()} en ${location}`
                    : `Operarios autorizados de ${service.name.toLowerCase()} en ${location}`
                  }
                </h2>
                
                <p style={{ marginBottom: '1.5rem' }}>
                  Como profesionales certificados en el sector de {service.name.toLowerCase()} en <strong>{location}</strong>, cubrimos cada calle, barrio y zona residencial de la localidad, incluyendo {locationData.neighborhoods}.
                </p>

                <p style={{ marginBottom: '2rem', fontStyle: 'italic', paddingLeft: '1rem', borderLeft: '3px solid var(--color-accent)', color: 'var(--color-text-muted)' }}>
                  {locationData.uniqueContent}
                </p>

                {/* TRUST SIGNALS BLOCK */}
                <TrustSignals isReforma={isReforma} />

                {/* Render First Batch of Description paragraphs */}
                {firstBatch.map((p, i) => (
                  <p key={`fb-${i}`} style={{ marginBottom: '1.5rem' }} dangerouslySetInnerHTML={{ __html: p }}></p>
                ))}

                {/* CALCULATORS - Rendered dynamically */}
                {service.id === 'calderas' && (
                  <div style={{ margin: '3rem 0' }}>
                    <CalculadoraCaldera />
                  </div>
                )}
                {service.id === 'climatizacion' && (
                  <div style={{ margin: '3rem 0' }}>
                    <CalculadoraAire />
                  </div>
                )}

                {/* CTA 1 */}
                <CTAInline serviceName={service.name} location={location} idx={1} isReforma={isReforma} />

                {/* Render Second Batch of Description paragraphs */}
                {secondBatch.map((p, i) => (
                  <p key={`sb-${i}`} style={{ marginBottom: '1.5rem' }} dangerouslySetInnerHTML={{ __html: p }}></p>
                ))}

                {/* PRICE GUIDES TABLE */}
                <ServicePriceTable serviceName={service.id} />

                {/* CTA 2 */}
                <CTAInline serviceName={service.name} location={location} idx={2} isReforma={isReforma} />

                {/* Render Third Batch of Description paragraphs */}
                {thirdBatch.map((p, i) => (
                  <p key={`tb-${i}`} style={{ marginBottom: '1.5rem' }} dangerouslySetInnerHTML={{ __html: p }}></p>
                ))}

                {/* LOCAL ARCHITECTS COLLABORATION SECTION */}
                {isReforma && <ArchitectsSection location={location} />}
                
                {!isReforma && (
                  <div style={{ marginTop: '2.5rem', padding: '2rem', backgroundColor: '#F8FAFC', borderRadius: 'var(--radius-lg)', borderLeft: '4px solid var(--color-accent)' }}>
                    <h4 style={{ marginBottom: '1rem', color: 'var(--color-primary)', fontWeight: 700 }}>⚠️ Recomendación de Seguridad en {location}</h4>
                    <p style={{ fontSize: '0.95rem', color: '#475569', margin: 0 }}>
                      Ante sospechas de fugas de gas, escapes de agua severos o calentamiento del cuadro eléctrico, corte inmediatamente el suministro general en la llave de paso o en el interruptor de control de potencia y ventile. Esto prevendrá riesgos antes de la llegada de nuestro técnico autorizado.
                    </p>
                  </div>
                )}
              </div>

              {/* Sidebar card */}
              <div style={{ flex: '1 1 300px', backgroundColor: '#F8FAFC', padding: '2.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid #E2E8F0', position: 'sticky', top: '90px' }}>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-primary)' }}>
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="var(--color-accent)" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {isReforma ? 'Servicios de Obra' : 'Trabajos Habituales'}
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
                  {service.tasks.map((task, i) => (
                    <li key={i} style={{ marginBottom: '1.2rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '1rem', color: '#334155', lineHeight: 1.4 }}>
                      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#10B981" strokeWidth={2.5} style={{ flexShrink: 0, marginTop: '2px' }}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      <span>{task} en {location}</span>
                    </li>
                  ))}
                </ul>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <a href={`tel:${PHONE_RAW}`} 
                     data-track-event="call"
                     data-track-service={service.id}
                     data-track-location={location}
                     className="btn btn-accent" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', padding: '1rem', fontSize: '1.1rem', fontWeight: 700 }}>
                    {isReforma ? '📞 Pedir Presupuesto' : '📞 Llamar Técnico ahora'}
                  </a>
                  <a href={isReforma
                     ? `https://wa.me/34${PHONE_RAW}?text=Hola,%20necesito%20presupuesto%20para%20una%20reforma%20de%20${encodeURIComponent(service.name.toLowerCase())}%20en%20${encodeURIComponent(location)}.`
                     : `https://wa.me/34${PHONE_RAW}?text=Hola,%20necesito%20informaci%C3%B3n%20sobre%20un%20servicio%20de%20reparaci%C3%B3n%20en%20${encodeURIComponent(location)}.`
                  }
                     target="_blank"
                     rel="noopener noreferrer"
                     data-track-event="whatsapp"
                     data-track-service={service.id}
                     data-track-location={location}
                     className="btn" style={{ backgroundColor: '#25D366', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', padding: '1rem', fontSize: '1.1rem', fontWeight: 700 }}>
                    💬 Enviar WhatsApp
                  </a>
                </div>
              </div>

           </div>
         </div>
      </section>

      {/* REVIEWS TESTIMONIALS SECTION */}
      <Testimonios reviews={applicableReviews} />

      {/* SERVICE SPECIFIC LOCALIZED FAQS */}
      <section style={{ padding: '5rem 0', backgroundColor: '#F8FAFC', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', textAlign: 'center', color: 'var(--color-primary)' }}>
            Preguntas Frecuentes sobre {service.name} en {location}
          </h2>
          <p style={{ color: '#64748B', fontSize: '1.1rem', textAlign: 'center', marginBottom: '3.5rem' }}>
            Respuestas de nuestro equipo técnico sobre averías habituales, precios y cobertura.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {allFAQs.map((faq, i) => {
              const localizedQ = faq.q.replace(/{location}/g, location);
              const localizedA = faq.a.replace(/{location}/g, location);
              
              return (
                <details key={i} style={{ backgroundColor: 'white', border: '1px solid #E2E8F0', borderRadius: 'var(--radius-lg)', padding: '1.5rem', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}>
                  <summary style={{ fontSize: '1.15rem', fontWeight: 600, color: '#334155', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {localizedQ}
                    <span style={{ color: 'var(--color-accent)', fontSize: '1.5rem', fontWeight: 400 }}>+</span>
                  </summary>
                  <p style={{ marginTop: '1rem', color: '#475569', lineHeight: 1.7, fontSize: '1.05rem' }}>
                    {localizedA}
                  </p>
                </details>
              );
            })}
          </div>
        </div>
      </section>

      {/* MESH INTERNAL LINKING: SERVICES IN SAME LOCATION */}
      <section style={{ padding: '5rem 0', backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
        <div className="container" style={{ maxWidth: '950px', margin: '0 auto', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.3rem', color: 'var(--color-primary)', marginBottom: '1.5rem', fontWeight: 800 }}>
            🛠️ Otros servicios técnicos en {location}:
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem' }}>
            {otherServices.map((srv) => {
              const srvSlug = `${srv.slugBase}-${slugify(location)}`;
              return (
                <Link 
                  key={srv.id} 
                  href={`/${srvSlug}`}
                  style={{
                    backgroundColor: 'white',
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                    padding: '0.6rem 1.2rem',
                    fontSize: '0.9rem',
                    color: 'var(--color-primary)',
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                  className="nearby-link"
                >
                  {srv.emoji} {srv.title} en {location}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* MESH INTERNAL LINKING: SAME SERVICE IN OTHER LOCATIONS */}
      <section style={{ padding: '5rem 0', backgroundColor: '#FFFFFF' }}>
        <div className="container" style={{ maxWidth: '950px', margin: '0 auto', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.3rem', color: 'var(--color-primary)', marginBottom: '1.5rem', fontWeight: 800 }}>
            📍 Otras localidades con servicio de {service.name.toLowerCase()}:
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem' }}>
            {otherLocations.map((loc) => {
              const nearbySlug = `${service.slugBase}-${slugify(loc.name)}`;
              return (
                <Link 
                  key={loc.name} 
                  href={`/${nearbySlug}`}
                  style={{
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    borderRadius: '30px',
                    padding: '0.5rem 1rem',
                    fontSize: '0.85rem',
                    color: 'var(--color-primary)',
                    fontWeight: 500,
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                  className="nearby-link"
                >
                  {service.title} en {loc.name}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* POWERFUL FINAL CTA SECTION */}
      <section style={{ padding: '6rem 0', backgroundColor: 'var(--color-primary)', color: 'white', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <span style={{ color: 'var(--color-accent)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.9rem', display: 'block', marginBottom: '0.75rem' }}>
            {isReforma ? 'Presupuesto de Obra Cerrado y por Escrito' : 'Servicio Técnico Profesional Garantizado'}
          </span>
          <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem', color: 'white' }}>
            {isReforma 
              ? `¿Planeas reformar tu cocina, baño o vivienda en ${location}?`
              : `¿Tienes una urgencia técnica en tu hogar de ${location}?`
            }
          </h2>
          <p style={{ fontSize: '1.25rem', color: '#CBD5E1', marginBottom: '3rem', lineHeight: 1.6 }}>
            {isReforma
              ? `Coordinamos todos los oficios de principio a fin, redactamos la memoria para la licencia del ayuntamiento y te ofrecemos 3 años de garantía en todas las instalaciones.`
              : `No dejes que el problema empeore y cause daños mayores. Llámanos o contáctanos por WhatsApp. Desplazamos un técnico local homologado a tu domicilio en ${location} de forma inmediata.`
            }
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={`tel:${PHONE_RAW}`} 
               data-track-event="call"
               data-track-service={`${slugify(service.name)}-final`}
               data-track-location={slugify(location)}
               className="btn btn-accent animate-pulse" 
               style={{ fontSize: '1.2rem', padding: '1.2rem 2.5rem' }}>
              {isReforma ? `📞 Solicitar Visita Gratis` : `📞 Llamar ahora: ${PHONE_NUMBER}`}
            </a>
            <a href={isReforma
               ? `https://wa.me/34${PHONE_RAW}?text=Hola,%20necesito%20visita%20para%20presupuesto%20de%20reforma%20en%20${encodeURIComponent(location)}.`
               : `https://wa.me/34${PHONE_RAW}?text=Hola,%20necesito%20asistencia%20urgente%20de%20${encodeURIComponent(service.name.toLowerCase())}%20en%20${encodeURIComponent(location)}.`
            } 
               target="_blank" 
               rel="noopener noreferrer" 
               data-track-event="whatsapp"
               data-track-service={`${slugify(service.name)}-final`}
               data-track-location={slugify(location)}
               className="btn" 
               style={{ backgroundColor: '#25D366', color: 'white', fontSize: '1.2rem', padding: '1.2rem 2.5rem' }}>
              {isReforma ? `💬 Consultar por WhatsApp` : `💬 Contactar por WhatsApp`}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
