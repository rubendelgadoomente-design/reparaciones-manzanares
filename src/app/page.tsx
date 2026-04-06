import React from 'react';
import Link from 'next/link';

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
            <h1 style={{ color: 'white', fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: 1.1 }}>
              Fontanero y Electricista <span style={{ color: 'var(--color-accent)' }}>Urgente 24h</span> en Manzanares el Real.
            </h1>
            <p style={{ fontSize: '1.25rem', color: '#CBD5E1', marginBottom: '2.5rem', maxWidth: '600px' }}>
              Solucionamos al instante problemas de <strong>fontanería, electricidad y calderas</strong> en toda la Sierra de Madrid. Trato directo, garantía por escrito y precios transparentes.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="tel:+34669162085" className="btn btn-accent animate-pulse" style={{ fontSize: '1.2rem' }}>
                Llamar Urgencia 24h
              </a>
              <a href="#servicios" className="btn" style={{ backgroundColor: 'transparent', border: '2px solid white', color: 'white' }}>
                Ver Nuestros Servicios
              </a>
            </div>
          </div>

          <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
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
                
                <button type="submit" className="btn btn-accent" style={{ marginTop: '0.5rem' }}>Solicitar Presupuesto</button>
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

      {/* 3. WHY CHOOSE US SECTION */}
      <section style={{ padding: '5rem 0', backgroundColor: 'var(--color-bg)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>¿Por qué confiar en nosotros?</h2>
            <p style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>Más de 15 años solucionando los problemas de los vecinos de la zona norte de Madrid.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            <div style={{ textAlign: 'center', padding: '2.5rem 1.5rem', backgroundColor: 'white', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', border: '1px solid #E2E8F0' }}>
              <div style={{ width: '60px', height: '60px', margin: '0 auto 1.5rem auto', backgroundColor: 'rgba(255,109,0,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent)' }}>
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>Respuesta Rápida</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)' }}>Atendemos tus urgencias con la máxima prioridad para minimizar daños y esperas.</p>
            </div>
            
            <div style={{ textAlign: 'center', padding: '2.5rem 1.5rem', backgroundColor: 'white', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', border: '1px solid #E2E8F0' }}>
              <div style={{ width: '60px', height: '60px', margin: '0 auto 1.5rem auto', backgroundColor: 'rgba(255,109,0,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent)' }}>
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>Sin Intermediarios</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)' }}>Tratas directamente con los profesionales instaladores. Precios transparentes y sin comisiones ocultas.</p>
            </div>

            <div style={{ textAlign: 'center', padding: '2.5rem 1.5rem', backgroundColor: 'white', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', border: '1px solid #E2E8F0' }}>
              <div style={{ width: '60px', height: '60px', margin: '0 auto 1.5rem auto', backgroundColor: 'rgba(255,109,0,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent)' }}>
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>Garantía por Escrito</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)' }}>Todas nuestras reparaciones e instalaciones cuentan con una garantía oficial certificada.</p>
            </div>

            <div style={{ textAlign: 'center', padding: '2.5rem 1.5rem', backgroundColor: 'white', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', border: '1px solid #E2E8F0' }}>
              <div style={{ width: '60px', height: '60px', margin: '0 auto 1.5rem auto', backgroundColor: 'rgba(255,109,0,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent)' }}>
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>Técnicos Homologados</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)' }}>Contamos con los carnets oficiales de la Comunidad de Madrid para boletines e instalaciones.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. STATS SECTION */}
      <section style={{ padding: '4rem 0', backgroundColor: 'var(--color-primary)', color: 'white' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
            <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--color-accent)', marginBottom: '0.5rem' }}>+15</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#E2E8F0' }}>Años de Experiencia</div>
            </div>
            <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--color-accent)', marginBottom: '0.5rem' }}>+2k</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#E2E8F0' }}>Averías Solucionadas</div>
            </div>
            <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--color-accent)', marginBottom: '0.5rem' }}>100%</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#E2E8F0' }}>Garantía Oficial</div>
            </div>
            <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--color-accent)', marginBottom: '0.5rem' }}>24/7</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#E2E8F0' }}>Asistencia de Urgencias</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SERVICES GRID */}
      <section id="servicios" style={{ padding: '5rem 0', backgroundColor: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Nuestros Servicios Principales</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div className="service-card" style={{ backgroundColor: 'var(--color-bg)', padding: '2.5rem', borderRadius: 'var(--radius-lg)', cursor: 'pointer', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>🚰</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Fontanería Urgente</h3>
              <p style={{ marginBottom: '1.5rem' }}>Detección de fugas, desatascos con maquinaria, cambio de grifería, roturas de tuberías y humedades.</p>
              <Link href="/fontanero-manzanares-el-real" style={{ fontWeight: 600, color: 'var(--color-accent)', textDecoration: 'none' }}>Saber más →</Link>
            </div>
            <div className="service-card" style={{ backgroundColor: 'var(--color-bg)', padding: '2.5rem', borderRadius: 'var(--radius-lg)', cursor: 'pointer', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>⚡</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Averías Eléctricas</h3>
              <p style={{ marginBottom: '1.5rem' }}>Solución a apagones, cortocircuitos, emisión de boletines eléctricos e instalación de iluminación LED.</p>
              <Link href="/electricista-manzanares-el-real" style={{ fontWeight: 600, color: 'var(--color-accent)', textDecoration: 'none' }}>Saber más →</Link>
            </div>
            <div className="service-card" style={{ backgroundColor: 'var(--color-bg)', padding: '2.5rem', borderRadius: 'var(--radius-lg)', cursor: 'pointer', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>🔥</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Revisión de Calderas</h3>
              <p style={{ marginBottom: '1.5rem' }}>Reparación de errores, mantenimiento anual y cambios de calderas de gas, gasoil y biomasa.</p>
              <Link href="/reparacion-calderas-manzanares-el-real" style={{ fontWeight: 600, color: 'var(--color-accent)', textDecoration: 'none' }}>Saber más →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS SECTION */}
      <section style={{ padding: '6rem 0', backgroundColor: 'var(--color-primary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'white' }}>Lo que opinan en la sierra</h2>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: 'white', fontSize: '1.2rem', fontWeight: 600 }}>4.9/5</span>
              <div style={{ display: 'flex', gap: '2px' }}>
                {[1,2,3,4,5].map(i => <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="#FBBC05"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
              </div>
              <span style={{ color: '#CBD5E1', fontSize: '1rem' }}>(+150 valoraciones)</span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {/* Review 1 */}
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
                  <div style={{ fontSize: '0.85rem', color: '#64748B' }}>hace 2 días en Collado Villalba</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '2px', marginBottom: '1rem' }}>
                {[1,2,3,4,5].map(i => <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#FBBC05"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
              </div>
              <p style={{ fontSize: '1rem', color: '#334155', lineHeight: 1.6 }}>"Llamé a las 3 de la mañana por una tubería rota que me estaba inundando el salón. El fontanero llegó en 20 minutos y fue súper rápido. Me salvó la vida."</p>
            </div>

            {/* Review 2 */}
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
                  <div style={{ fontSize: '0.85rem', color: '#64748B' }}>hace 1 semana en Manzanares</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '2px', marginBottom: '1rem' }}>
                {[1,2,3,4,5].map(i => <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#FBBC05"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
              </div>
              <p style={{ fontSize: '1rem', color: '#334155', lineHeight: 1.6 }}>"Saltaban los plomos en casa. El técnico detectó el cortocircuito en un enchufe exterior y lo arregló cobrando un precio totalmente justo antes de dar el presupuesto. Muy honestos."</p>
            </div>

            {/* Review 3 */}
            <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', color: 'var(--color-text)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '24px', right: '24px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ width: '45px', height: '45px', borderRadius: '50%', backgroundColor: '#F59E0B', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>J</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1.05rem' }}>Javier M.</div>
                  <div style={{ fontSize: '0.85rem', color: '#64748B' }}>hace 1 mes en Colmenar</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '2px', marginBottom: '1rem' }}>
                {[1,2,3,4,5].map(i => <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#FBBC05"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
              </div>
              <p style={{ fontSize: '1rem', color: '#334155', lineHeight: 1.6 }}>"Cambio de caldera antigua por una nueva Saunier Duval. Me explicaron el funcionamiento genial y tramitaron la garantía sin yo pedirlo. Muy satisfecho con el trabajo."</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQs SECTION */}
      <section style={{ padding: '6rem 0', backgroundColor: '#F8FAFC' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>Preguntas Frecuentes</h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)' }}>Resolvemos tus dudas más comunes antes de que nos llames.</p>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { q: '¿Cobráis el desplazamiento?', a: 'El desplazamiento es gratuito siempre que se acepte el presupuesto de reparación. Si finalmente decides no realizar el servicio, solo se factura la visita técnica de diagnóstico mínima para cubrir los gastos de traslado.' },
              { q: '¿Cuánto tardáis en llegar a una urgencia?', a: 'Para averías críticas como fugas masivas o cortes de luz, priorizamos la asistencia. Intentamos estar lo antes posible en tu domicilio para evitar daños mayores, dependiendo siempre del volumen de avisos.' },
              { q: '¿Dais garantía de vuestras reparaciones?', a: 'Sí, absolutamente. Ofrecemos 6 meses de garantía por escrito en todas las reparaciones de mano de obra, y hasta 3 años en instalaciones nuevas de componentes electrónicos, calderas o repuestos, según marca la ley vigente.' },
              { q: '¿Se puede pagar con tarjeta?', a: 'Por supuesto. Todos nuestros operarios llevan TPV móvil para facilitar el pago con tarjeta en el acto. También aceptamos efectivo, Bizum y transferencia bancaria inmediata.' }
            ].map((faq, i) => (
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
  )
}
