import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { portfolioItems } from '@/data/portfolioData';
import Testimonios, { Review } from '@/components/Testimonios';

const PHONE_NUMBER = "919 93 09 63";
const PHONE_RAW = "919930963";
const WA_LINK = `https://wa.me/34${PHONE_RAW}?text=Hola,%20necesito%20informaci%C3%B3n%20sobre%20un%20servicio%20de%20reparaci%C3%B3n.`;

export const metadata: Metadata = {
  title: 'Reparaciones Manzanares | Fontanería, Electricidad, Cerrajería',
  description: '¿Buscas reparaciones del hogar en Manzanares el Real y la Sierra? Fontanería, electricidad y cerrajería de urgencia 24h. Llama al 919 930 963.',
  alternates: {
    canonical: 'https://www.reparacionesmanzanares.es'
  }
};

export default function Home() {
  const faqs = [
    { q: '¿Cobráis el desplazamiento?', a: 'El desplazamiento es gratuito siempre que se acepte el presupuesto de reparación. Si finalmente decides no realizar el servicio, solo se factura la visita técnica de diagnóstico mínima para cubrir los gastos de traslado.' },
    { q: '¿Cuánto tardáis en llegar a una urgencia?', a: 'Para averías críticas como fugas masivas o cortes de luz, priorizamos la asistencia. Intentamos estar lo antes posible en tu domicilio para permitirte recuperar la normalidad de forma inmediata.' },
    { q: '¿Dais garantía de vuestras reparaciones?', a: 'Sí, absolutamente. Ofrecemos 6 meses de garantía por escrito en todas las reparaciones de mano de obra, y hasta 3 años en instalaciones nuevas de componentes electrónicos, calderas o repuestos, según marca la ley vigente.' },
    { q: '¿Se puede pagar con tarjeta?', a: 'Por supuesto. Todos nuestros operarios llevan TPV móvil para facilitar el pago con tarjeta en el acto. También aceptamos efectivo, Bizum y transferencia bancaria inmediata.' }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Reparaciones Manzanares",
    "url": "https://www.reparacionesmanzanares.es",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.reparacionesmanzanares.es/?s={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  // Real reviews list for homepage display
  const homeReviews: Review[] = [
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

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      
      {/* 1. HERO SECTION */}
      <section style={{
        backgroundColor: 'var(--color-primary)',
        color: 'white',
        padding: '6rem 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', top: '-20%', right: '-10%', width: '500px', height: '500px',
          background: 'radial-gradient(circle, var(--color-primary-light) 0%, transparent 70%)',
          borderRadius: '50%', zIndex: 0
        }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 1, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4rem' }}>
          
          <div style={{ flex: '1 1 500px' }}>
            <div style={{
              display: 'inline-block', backgroundColor: 'rgba(255,109,0,0.1)', color: 'var(--color-accent)',
              padding: '0.5rem 1rem', borderRadius: '20px', fontWeight: 600, fontSize: '0.9rem',
              marginBottom: '1.5rem', border: '1px solid rgba(255,109,0,0.3)'
            }}>
              🚨 Asistencia Técnica Urgente en la Zona
            </div>
            <h1 style={{ color: 'white', fontSize: '3rem', marginBottom: '1.5rem', lineHeight: 1.15 }}>
              Reparaciones urgentes y <span style={{ color: 'var(--color-accent)' }}>mantenimiento del hogar</span> en Manzanares el Real.
            </h1>
            <p style={{ fontSize: '1.25rem', color: '#CBD5E1', marginBottom: '1.5rem', maxWidth: '600px' }}>
              Tu servicio técnico de confianza en toda la Sierra Norte. Trato directo, garantía por escrito y precios sin sorpresas.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '1.1rem', color: '#CBD5E1', textAlign: 'left' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}><span style={{ color: 'var(--color-accent)', fontWeight: 'bold' }}>✓</span> Atención inmediata y urgente 24h</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}><span style={{ color: 'var(--color-accent)', fontWeight: 'bold' }}>✓</span> Presupuesto sin compromiso y sin intermediarios</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}><span style={{ color: 'var(--color-accent)', fontWeight: 'bold' }}>✓</span> Contacto directo por teléfono y WhatsApp</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}><span style={{ color: 'var(--color-accent)', fontWeight: 'bold' }}>✓</span> Cobertura completa en toda la Sierra Norte</li>
            </ul>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href={`tel:${PHONE_RAW}`} 
                 data-track-event="call"
                 data-track-service="hero"
                 className="btn btn-accent animate-pulse" style={{ fontSize: '1.2rem' }}>
                📞 Llamar Ahora
              </a>
              <a href={WA_LINK} 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 data-track-event="whatsapp"
                 data-track-service="hero"
                 className="btn animate-pulse-wa" style={{ backgroundColor: '#25D366', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                💬 WhatsApp
              </a>
              <a href="#contacto-rapido" className="btn" style={{ backgroundColor: 'transparent', border: '2px solid white', color: 'white' }}>
                Pedir Presupuesto
              </a>
            </div>
          </div>

          <div id="contacto-rapido" style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
            {/* Quick Contact Form */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)', padding: '2.5rem',
              borderRadius: 'var(--radius-lg)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              width: '100%', maxWidth: '450px'
            }}>
              <h3 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.5rem' }}>¿Avería no urgente?</h3>
              <p style={{ color: '#CBD5E1', marginBottom: '2rem' }}>Déjanos tu número y te damos presupuesto sin compromiso hoy mismo.</p>
              
              <form action="https://api.web3forms.com/submit" method="POST" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input type="hidden" name="access_key" value="8579a69c-e7a0-412b-9679-46792d42e9b3" />
                <input type="hidden" name="subject" value="NUEVO CLIENTE: Presupuesto web Reparaciones" />
                <input type="hidden" name="redirect" value="https://www.reparacionesmanzanares.es" />
                
                <input type="tel" name="telefono" placeholder="Tu Teléfono" required style={{ padding: '1rem', borderRadius: 'var(--radius-md)', border: 'none', fontSize: '1rem', outline: 'none' }} />
                
                <select name="servicio" required style={{ padding: '1rem', borderRadius: 'var(--radius-md)', border: 'none', fontSize: '1rem', outline: 'none', backgroundColor: 'white', color: 'var(--color-text)' }}>
                  <option value="">¿Qué necesitas?</option>
                  <option value="fontaneria">Reparación Fontanería</option>
                  <option value="electricidad">Avería Eléctrica</option>
                  <option value="calderas">Revisión/Avería Caldera</option>
                </select>
                
                <button type="submit" 
                        data-track-event="contact-submit" 
                        data-track-service="home-quick-form"
                        className="btn btn-accent" style={{ marginTop: '0.5rem' }}>
                  Solicitar Presupuesto
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BRANDS SECTION */}
      <section style={{ padding: '3rem 0', backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '2rem', fontSize: '0.9rem' }}>
            Servicio Técnico multimarca
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1.5rem', alignItems: 'center', opacity: 0.7 }}>
            {['Saunier Duval', 'Junkers', 'Vaillant', 'Simon', 'Roca', 'Ferroli'].map(brand => (
              <div key={brand} style={{ padding: '1.5rem', backgroundColor: 'white', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', fontWeight: 800, color: '#334155', border: '1px solid #E2E8F0', fontSize: '1.1rem' }}>
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. OFICIOS GRID */}
      <section style={{ padding: '6rem 0', backgroundColor: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--color-primary)' }}>Nuestros Servicios Profesionales 24h</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.15rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
              Contamos con técnicos autorizados en los principales oficios para garantizar soluciones de calidad en una única llamada.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2.5rem'
          }}>
            {[
              {
                title: 'Fontanería Urgente',
                desc: 'Reparación de fugas, desatascos de tuberías, grifería y sanitarios. Localización de fugas ocultas.',
                slug: 'fontanero-manzanares-el-real',
                icon: '💧'
              },
              {
                title: 'Electricidad 24h',
                desc: 'Solución a cortocircuitos, apagones y saltos de diferencial. Boletines eléctricos y cuadros.',
                slug: 'electricista-manzanares-el-real',
                icon: '⚡'
              },
              {
                title: 'Cerrajería de Guardia',
                desc: 'Apertura de puertas sin romper, cambio de cerraduras y bombines anti-bumping de alta seguridad.',
                slug: 'cerrajero-manzanares-el-real',
                icon: '🔑'
              },
              {
                title: 'Reparación de Calderas',
                desc: 'Mantenimiento y asistencia técnica multimarca en calderas de gas, gasoil y sistemas de calefacción.',
                slug: 'reparacion-calderas-manzanares-el-real',
                icon: '🔥'
              },
              {
                title: 'Aire Acondicionado',
                desc: 'Instalación y reparación de sistemas split, multi-split y conductos. Carga de gas refrigerante.',
                slug: 'aire-acondicionado-manzanares-el-real',
                icon: '❄️'
              },
              {
                title: 'Reparaciones del Hogar',
                desc: 'Montaje de muebles, estores, sellado de juntas de silicona y mantenimiento general doméstico.',
                slug: 'reparaciones-hogar-manzanares-el-real',
                icon: '🏠'
              }
            ].map(srv => (
              <div key={srv.slug} style={{
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: 'var(--radius-lg)',
                padding: '2.5rem',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.25s ease'
              }} className="service-card">
                <div>
                  <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>{srv.icon}</div>
                  <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>{srv.title}</h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                    {srv.desc}
                  </p>
                </div>
                <Link href={`/${srv.slug}`} className="btn" style={{
                  backgroundColor: 'transparent',
                  border: '2px solid var(--color-primary)',
                  color: 'var(--color-primary)',
                  padding: '0.65rem 1.5rem',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  width: '100%',
                  textAlign: 'center'
                }}>
                  Ver Detalles →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. LOCALIDADES COBERTURA GRID */}
      <section style={{ padding: '6rem 0', backgroundColor: '#F8FAFC', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
            <div style={{
              display: 'inline-block', backgroundColor: 'rgba(255,109,0,0.08)', color: 'var(--color-accent)',
              padding: '0.4rem 1rem', borderRadius: '20px', fontWeight: 600, fontSize: '0.85rem',
              marginBottom: '1rem', border: '1px solid rgba(255,109,0,0.2)'
            }}>
              📍 Zonas de Cobertura
            </div>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--color-primary)' }}>Donde Prestamos Servicio en la Sierra</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.15rem', maxWidth: '650px', margin: '0 auto', lineHeight: 1.6 }}>
              Tenemos técnicos residiendo en los principales municipios para poder dar asistencia de urgencia en menos de 30 minutos.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.25rem'
          }}>
            {[
              { name: 'Manzanares el Real', slug: 'manzanares-el-real' },
              { name: 'Soto del Real', slug: 'soto-del-real' },
              { name: 'El Boalo', slug: 'el-boalo' },
              { name: 'Cerceda', slug: 'cerceda' },
              { name: 'Mataelpino', slug: 'mataelpino' },
              { name: 'Miraflores de la Sierra', slug: 'miraflores-de-la-sierra' },
              { name: 'Becerril de la Sierra', slug: 'becerril-de-la-sierra' },
              { name: 'Colmenar Viejo', slug: 'colmenar-viejo' },
              { name: 'Moralzarzal', slug: 'moralzarzal' },
              { name: 'Navacerrada', slug: 'navacerrada' },
              { name: 'Collado Villalba', slug: 'collado-villalba' },
              { name: 'Alpedrete', slug: 'alpedrete' },
              { name: 'Guadarrama', slug: 'guadarrama' },
              { name: 'Cercedilla', slug: 'cercedilla' },
              { name: 'Los Molinos', slug: 'los-molinos' }
            ].map(loc => (
              <div key={loc.slug} style={{
                backgroundColor: 'white',
                border: '1px solid #E2E8F0',
                borderRadius: '12px',
                padding: '1.25rem 1rem',
                textAlign: 'center',
                boxShadow: 'var(--shadow-sm)',
                transition: 'transform 0.2s ease, border-color 0.2s ease'
              }}>
                <div style={{ fontWeight: 700, color: 'var(--color-primary)', marginBottom: '0.75rem', fontSize: '1rem' }}>
                  {loc.name}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', justifyContent: 'center' }}>
                  <Link href={`/fontanero-${loc.slug}`} style={{ fontSize: '0.8rem', color: 'var(--color-accent)', textDecoration: 'none', fontWeight: 600 }}>Fontanería</Link>
                  <span style={{ color: '#CBD5E1', fontSize: '0.8rem' }}>•</span>
                  <Link href={`/electricista-${loc.slug}`} style={{ fontSize: '0.8rem', color: 'var(--color-accent)', textDecoration: 'none', fontWeight: 600 }}>Electricidad</Link>
                  <span style={{ color: '#CBD5E1', fontSize: '0.8rem' }}>•</span>
                  <Link href={`/cerrajero-${loc.slug}`} style={{ fontSize: '0.8rem', color: 'var(--color-accent)', textDecoration: 'none', fontWeight: 600 }}>Cerrajería</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SECCIÓN PORTAFOLIO DE PROYECTOS REALIZADOS (DYNAMIC PORTFOLIO) */}
      <section style={{ padding: '6rem 0', backgroundColor: '#F8FAFC', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{
              display: 'inline-block', backgroundColor: 'rgba(255,109,0,0.08)', color: 'var(--color-accent)',
              padding: '0.4rem 1rem', borderRadius: '20px', fontWeight: 600, fontSize: '0.85rem',
              marginBottom: '1rem', border: '1px solid rgba(255,109,0,0.2)'
            }}>
              📸 Trabajos Reales
            </div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>
              Proyectos y Reformas Completadas
            </h2>
            <p style={{ fontSize: '1.15rem', color: 'var(--color-text-muted)', maxWidth: '650px', margin: '0 auto', lineHeight: 1.6 }}>
              Conoce una muestra de las obras y reformas del hogar que hemos realizado recientemente para vecinos de la Sierra de Madrid.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '4rem'
          }}>
            {portfolioItems.map((proj, i) => (
              <div key={proj.id} style={{
                backgroundColor: 'white',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)',
                border: '1px solid #E2E8F0',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease'
              }} className="project-card">
                <div style={{ position: 'relative', overflow: 'hidden', height: '240px' }}>
                  <img
                    src={proj.img}
                    alt={proj.alt}
                    title={proj.titleAttr}
                    loading="lazy"
                    width={proj.width}
                    height={proj.height}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.3s ease' }}
                    className="project-img"
                  />
                  <div style={{
                    position: 'absolute', top: '16px', left: '16px',
                    backgroundColor: 'var(--color-primary)', color: 'white',
                    padding: '0.35rem 0.85rem', borderRadius: '20px',
                    fontSize: '0.8rem', fontWeight: 700, boxShadow: 'var(--shadow-sm)'
                  }}>
                    📍 {proj.place}
                  </div>
                </div>
                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem', color: 'var(--color-primary)' }}>
                    {proj.title}
                  </h3>
                  <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: 0 }}>
                    {proj.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA de contacto al final de portafolio */}
          <div style={{
            backgroundColor: 'var(--color-primary)', color: 'white', borderRadius: 'var(--radius-lg)', padding: '3rem',
            textAlign: 'center', boxShadow: 'var(--shadow-md)', position: 'relative', overflow: 'hidden'
          }}>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h3 style={{ fontSize: '1.8rem', color: 'white', marginBottom: '1rem' }}>
                ¿Tienes un proyecto de reforma o reparación en mente?
              </h3>
              <p style={{ color: '#CBD5E1', fontSize: '1.1rem', maxWidth: '650px', margin: '0 auto 2rem auto', lineHeight: 1.6 }}>
                Te damos asesoramiento profesional y presupuesto cerrado por escrito sin ningún tipo de compromiso. Trato directo, sin intermediarios.
              </p>
              <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href={`tel:${PHONE_RAW}`} 
                   data-track-event="call"
                   data-track-service="home-portfolio-cta"
                   className="btn btn-accent" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
                  📞 Llamar Técnico ({PHONE_NUMBER})
                </a>
                <a href={WA_LINK} 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   data-track-event="whatsapp"
                   data-track-service="home-portfolio-cta"
                   className="btn" style={{ backgroundColor: '#25D366', color: 'white', fontSize: '1.1rem', padding: '1rem 2rem' }}>
                  💬 Enviar WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Estilos hover */}
        <style dangerouslySetInnerHTML={{ __html: `
          .project-card:hover {
            transform: translateY(-5px);
            box-shadow: var(--shadow-md);
            border-color: var(--color-accent) !important;
          }
          .project-card:hover .project-img {
            transform: scale(1.05);
          }
        `}} />
      </section>

      {/* 6. TESTIMONIALS SECTION (REUSABLE COMPONENT) */}
      <Testimonios reviews={homeReviews} />

      {/* 7. FAQs SECTION */}
      <section style={{ padding: '6rem 0', backgroundColor: '#F8FAFC' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>Preguntas Frecuentes</h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)' }}>Resolvemos tus dudas más comunes antes de que nos llames.</p>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqs.map((faq, i) => (
              <details key={i} style={{ backgroundColor: 'white', border: '1px solid #E2E8F0', borderRadius: 'var(--radius-lg)', padding: '1.5rem', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}>
                <summary style={{ fontSize: '1.15rem', fontWeight: 600, color: '#334155', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {faq.q}
                  <span style={{ color: 'var(--color-accent)', fontSize: '1.5rem', fontWeight: 400 }}>+</span>
                </summary>
                <p style={{ marginTop: '1rem', color: '#64748B', lineHeight: 1.6, fontSize: '1rem' }}>
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
