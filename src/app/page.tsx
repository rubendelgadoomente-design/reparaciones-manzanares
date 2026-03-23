import React from 'react';

export default function Home() {
  return (
    <main>
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
              🚨 Asistencia de Averías en menos de 30 minutos
            </div>
            <h1 style={{ color: 'white', fontSize: '3.5rem', marginBottom: '1.5rem' }}>
              Técnicos <span style={{ color: 'var(--color-accent)' }}>Especialistas</span> en la Sierra de Madrid.
            </h1>
            <p style={{ fontSize: '1.25rem', color: '#CBD5E1', marginBottom: '2.5rem', maxWidth: '600px' }}>
              Solucionamos al instante problemas de <strong>fontanería, electricidad y calderas</strong>. Sin intermediarios, trato directo y garantía por escrito.
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
              
              <form action="https://formsubmit.co/ruben.delgadoomente@gmail.com" method="POST" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input type="hidden" name="_subject" value="NUEVO CLIENTE: Presupuesto web Reparaciones" />
                <input type="hidden" name="_captcha" value="false" />
                
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
      <section style={{ padding: '2rem 0', backgroundColor: 'white', borderBottom: '1px solid #E2E8F0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            Trabajamos con las mejores marcas del mercado
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '3rem', alignItems: 'center', opacity: 0.6 }}>
            {/* Simulated brand logos using text for now to keep it lightweight */}
            <h3 style={{ fontSize: '1.5rem', margin: 0, fontWeight: 800, color: '#333' }}>Saunier Duval</h3>
            <h3 style={{ fontSize: '1.5rem', margin: 0, fontWeight: 800, color: '#333' }}>Junkers</h3>
            <h3 style={{ fontSize: '1.5rem', margin: 0, fontWeight: 800, color: '#333' }}>Vaillant</h3>
            <h3 style={{ fontSize: '1.5rem', margin: 0, fontWeight: 800, color: '#333' }}>Simon</h3>
            <h3 style={{ fontSize: '1.5rem', margin: 0, fontWeight: 800, color: '#333' }}>Roca</h3>
            <h3 style={{ fontSize: '1.5rem', margin: 0, fontWeight: 800, color: '#333' }}>Ferroli</h3>
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
            <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: 'white', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏱️</div>
              <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>Rapidez Garantizada</h3>
              <p style={{ fontSize: '0.95rem' }}>Un técnico en tu casa en menos de 30 minutos para averías urgentes en toda la sierra.</p>
            </div>
            <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: 'white', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💰</div>
              <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>Sin Intermediarios</h3>
              <p style={{ fontSize: '0.95rem' }}>Tratas directamente con los profesionales instaladores. Precios transparentes y sin comisiones ocultas.</p>
            </div>
            <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: 'white', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
              <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>Garantía por Escrito</h3>
              <p style={{ fontSize: '0.95rem' }}>Todas nuestras reparaciones e instalaciones cuentan con una garantía oficial certificada.</p>
            </div>
            <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: 'white', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛠️</div>
              <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>Técnicos Homologados</h3>
              <p style={{ fontSize: '0.95rem' }}>Contamos con los carnets oficiales de la Comunidad de Madrid para boletines e instalaciones.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SERVICES GRID */}
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
              <span style={{ fontWeight: 600, color: 'var(--color-accent)' }}>Saber más →</span>
            </div>
            <div className="service-card" style={{ backgroundColor: 'var(--color-bg)', padding: '2.5rem', borderRadius: 'var(--radius-lg)', cursor: 'pointer', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>⚡</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Averías Eléctricas</h3>
              <p style={{ marginBottom: '1.5rem' }}>Solución a apagones, cortocircuitos, emisión de boletines eléctricos e instalación de iluminación LED.</p>
              <span style={{ fontWeight: 600, color: 'var(--color-accent)' }}>Saber más →</span>
            </div>
            <div className="service-card" style={{ backgroundColor: 'var(--color-bg)', padding: '2.5rem', borderRadius: 'var(--radius-lg)', cursor: 'pointer', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>🔥</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Revisión de Calderas</h3>
              <p style={{ marginBottom: '1.5rem' }}>Reparación de errores, mantenimiento anual y cambios de calderas de gas, gasoil y biomasa.</p>
              <span style={{ fontWeight: 600, color: 'var(--color-accent)' }}>Saber más →</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS SECTION */}
      <section style={{ padding: '5rem 0', backgroundColor: 'var(--color-primary)', color: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'white' }}>Lo que opinan nuestros vecinos</h2>
            <p style={{ fontSize: '1.1rem', color: '#CBD5E1' }}>Reseñas de clientes 100% reales de la zona.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div style={{ backgroundColor: 'var(--color-primary-light)', padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ color: '#FBBF24', fontSize: '1.2rem', marginBottom: '1rem' }}>★★★★★</div>
              <p style={{ fontSize: '1rem', fontStyle: 'italic', marginBottom: '1.5rem' }}>"Llamé a las 3 de la mañana por una tubería rota que me estaba inundando el salón en Collado Villalba. El fontanero llegó en 20 minutos y fue súper profesional."</p>
              <p style={{ fontWeight: 600 }}>— Carlos G. (Collado Villalba)</p>
            </div>
            <div style={{ backgroundColor: 'var(--color-primary-light)', padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ color: '#FBBF24', fontSize: '1.2rem', marginBottom: '1rem' }}>★★★★★</div>
              <p style={{ fontSize: '1rem', fontStyle: 'italic', marginBottom: '1.5rem' }}>"Saltaban los plomos constantemente. El técnico detectó el cortocircuito en un enchufe exterior y lo arregló cobrando un precio totalmente justo. Muy recomendables."</p>
              <p style={{ fontWeight: 600 }}>— María S. (Manzanares el Real)</p>
            </div>
            <div style={{ backgroundColor: 'var(--color-primary-light)', padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ color: '#FBBF24', fontSize: '1.2rem', marginBottom: '1rem' }}>★★★★★</div>
              <p style={{ fontSize: '1rem', fontStyle: 'italic', marginBottom: '1.5rem' }}>"Cambio de caldera antigua por una nueva Saunier Duval. Me explicaron el funcionamiento genial y tramitaron la garantía. Servicio impecable."</p>
              <p style={{ fontWeight: 600 }}>— Javier M. (Colmenar Viejo)</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
