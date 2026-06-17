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
              <a href="tel:+34919930963" className="btn btn-accent animate-pulse" style={{ fontSize: '1.2rem' }}>
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

      {/* SECCIÓN SEO LOCAL — TEXTO DESCRIPTIVO */}
      <section style={{ padding: '5rem 0', backgroundColor: '#F8FAFC', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
        <div className="container" style={{ maxWidth: '850px', margin: '0 auto', padding: '0 1.5rem' }}>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '1.5rem', color: 'var(--color-primary)', textAlign: 'center' }}>
            Tus Técnicos de Confianza en Manzanares el Real y la Sierra de Madrid
          </h2>
          <div style={{ fontSize: '1.05rem', lineHeight: '1.8', color: 'var(--color-text-muted)', textAlign: 'justify' }}>
            <p style={{ marginBottom: '1.5rem' }}>
              En <strong>Reparaciones Manzanares</strong> nos dedicamos a ofrecer soluciones rápidas, profesionales y eficaces para cualquier tipo de mantenimiento o avería en tu hogar o negocio. Somos técnicos especialistas autorizados y ofrecemos asistencia técnica urgente las 24 horas del día para servicios de <strong>fontanería, averías eléctricas, reparación de calderas de todas las marcas y cerrajería de seguridad</strong> en toda la zona de la Sierra de Madrid.
            </p>
            <p style={{ marginBottom: '1.5rem' }}>
              Nuestra base de operaciones física está en <strong>Manzanares el Real (28410)</strong>, lo que nos sitúa en una posición estratégica inmejorable para dar una respuesta inmediata, con tiempos de llegada de unos 15 a 30 minutos, en municipios colindantes de la zona norte. Atendemos con total rapidez en <strong>Soto del Real, El Boalo, Cerceda, Mataelpino, Moralzarzal, Becerril de la Sierra, Navacerrada, Alpedrete, Collado Villalba y Colmenar Viejo</strong>. Estar en la misma comarca nos permite desplazarnos de urgencia sin costes excesivos de transporte.
            </p>
            <p style={{ marginBottom: '1.5rem' }}>
              Resolvemos incidencias críticas de forma inmediata: localización y sellado de fugas de agua y humedades, desatascos de tuberías con maquinaria especializada, solución a apagones y cortocircuitos eléctricos, instalación de iluminación LED y boletines de luz. También nos encargamos de la apertura de puertas sin roturas por llaves perdidas u olvidadas, cambios de cerraduras por modelos antibumping de seguridad y reparación de calderas de gas, gasoil o pellets que se han quedado sin presión o agua caliente.
            </p>
            <p style={{ marginBottom: 0 }}>
              Trabajamos de forma directa, <strong>sin ningún tipo de intermediarios ni agencias externas</strong>, lo que nos permite ajustar al máximo los costes y garantizar precios económicos y honestos a nuestros vecinos de la sierra. Facilitamos siempre un presupuesto cerrado y detallado por escrito antes de ponernos manos a la obra para tu total tranquilidad, y todas nuestras reparaciones cuentan con una garantía por escrito de hasta 6 meses.
            </p>
          </div>
        </div>
      </section>

      {/* CASO REAL — ANTES / DURANTE / DESPUÉS */}
      <section style={{ padding: '5rem 0', backgroundColor: '#F8FAFC' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{
              display: 'inline-block', backgroundColor: 'rgba(255,109,0,0.08)', color: 'var(--color-accent)',
              padding: '0.4rem 1rem', borderRadius: '20px', fontWeight: 600, fontSize: '0.85rem',
              marginBottom: '1rem', border: '1px solid rgba(255,109,0,0.2)'
            }}>
              📸 Trabajo Real
            </div>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '0.75rem', color: 'var(--color-primary)' }}>
              Reforma exterior en Manzanares el Real
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--color-text-muted)', maxWidth: '580px', margin: '0 auto' }}>
              Jardinería, pavimento exterior con gres y jardineras de hormigón con piedra natural. Así quedó el resultado final.
            </p>
          </div>

          {/* Galería antes / durante / después */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>

            {/* ANTES */}
            <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', position: 'relative' }}>
              <img
                src="/trabajos/antes.jpg"
                alt="Reforma exterior en Manzanares el Real — estado inicial antes de la reforma"
                style={{ width: '100%', height: '280px', objectFit: 'cover', display: 'block' }}
              />
              <div style={{
                position: 'absolute', top: '12px', left: '12px',
                backgroundColor: '#EF4444', color: 'white',
                padding: '0.3rem 0.8rem', borderRadius: '20px',
                fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px'
              }}>
                Antes
              </div>
            </div>

            {/* DURANTE */}
            <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', position: 'relative' }}>
              <img
                src="/trabajos/durante.jpg"
                alt="Reforma exterior en Manzanares el Real — proceso de obra, pavimento instalado"
                style={{ width: '100%', height: '280px', objectFit: 'cover', display: 'block' }}
              />
              <div style={{
                position: 'absolute', top: '12px', left: '12px',
                backgroundColor: '#F59E0B', color: 'white',
                padding: '0.3rem 0.8rem', borderRadius: '20px',
                fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px'
              }}>
                Durante
              </div>
            </div>

            {/* DESPUÉS */}
            <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', position: 'relative' }}>
              <img
                src="/trabajos/despues.jpg"
                alt="Reforma exterior terminada en Manzanares el Real — jardinera con piedra natural y árbol ornamental"
                style={{ width: '100%', height: '280px', objectFit: 'cover', display: 'block' }}
              />
              <div style={{
                position: 'absolute', top: '12px', left: '12px',
                backgroundColor: '#10B981', color: 'white',
                padding: '0.3rem 0.8rem', borderRadius: '20px',
                fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px'
              }}>
                Resultado
              </div>
            </div>
          </div>

          {/* Detalle del trabajo */}
          <div style={{
            backgroundColor: 'white', borderRadius: 'var(--radius-lg)', padding: '2.5rem',
            border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-sm)',
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', alignItems: 'center'
          }}>
            <div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>
                🏡 ¿Qué se hizo en esta reforma?
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {[
                  'Demolición y retirada de escombros',
                  'Pavimento exterior con gres antideslizante',
                  'Jardineras de hormigón con bordillo de piedra caliza',
                  'Plantación de árbol ornamental y jardinería',
                  'Sistema de riego empotrado',
                  'Instalación de césped artificial'
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.95rem', color: '#475569' }}>
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#10B981" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                ¿Tienes un proyecto similar en casa? Te damos presupuesto sin compromiso.
              </p>
              <Link
                href="/manitas-manzanares-el-real"
                className="btn btn-accent"
                style={{ display: 'inline-block', padding: '0.9rem 2rem' }}
              >
                Ver servicio Manitas →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS SECTION */}
      <section style={{ padding: '6rem 0', backgroundColor: 'var(--color-primary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'white' }}>Lo que opinan nuestros clientes</h2>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: 'white', fontSize: '1.2rem', fontWeight: 600 }}>5/5</span>
              <div style={{ display: 'flex', gap: '2px' }}>
                {[1,2,3,4,5].map(i => <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="#FBBC05"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
              </div>
              <span style={{ color: '#CBD5E1', fontSize: '1rem' }}>(testimonios de clientes)</span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {/* Review 1 */}
            <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', color: 'var(--color-text)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '24px', right: '24px', backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '20px', padding: '0.25rem 0.6rem', fontSize: '0.75rem', fontWeight: 600, color: '#16A34A' }}>
                ✓ Cliente verificado
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
              <div style={{ position: 'absolute', top: '24px', right: '24px', backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '20px', padding: '0.25rem 0.6rem', fontSize: '0.75rem', fontWeight: 600, color: '#16A34A' }}>
                ✓ Cliente verificado
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
              <div style={{ position: 'absolute', top: '24px', right: '24px', backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '20px', padding: '0.25rem 0.6rem', fontSize: '0.75rem', fontWeight: 600, color: '#16A34A' }}>
                ✓ Cliente verificado
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
