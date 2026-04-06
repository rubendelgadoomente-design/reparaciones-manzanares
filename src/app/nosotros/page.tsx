import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sobre Nosotros | Reparaciones Manzanares',
  description: 'Conoce a Reparaciones Manzanares, tu servicio técnico de confianza en la Sierra de Madrid con más de 15 años de experiencia en reparaciones del hogar.',
  alternates: {
    canonical: 'https://www.reparacionesmanzanares.es/nosotros'
  }
};

export default function NosotrosPage() {
  const stats = [
    { label: 'Años de Experiencia', value: '15+' },
    { label: 'Averías Resueltas', value: '10.000+' },
    { label: 'Técnicos Certificados', value: '8' },
    { label: 'Satisfacción Cliente', value: '4.9/5' }
  ];

  return (
    <main>
      <section style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '6rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ color: 'white', fontSize: '3.5rem', marginBottom: '1.5rem' }}>Nuestra Historia</h1>
          <p style={{ fontSize: '1.25rem', color: '#CBD5E1', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}>
            Especialistas en devolver la tranquilidad a tu hogar con rapidez, honestidad y profesionalidad en toda la Sierra de Madrid.
          </p>
        </div>
      </section>

      <section style={{ padding: '6rem 0', backgroundColor: 'white' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Más que técnicos, tus vecinos en la Sierra</h2>
            <div style={{ fontSize: '1.1rem', color: 'var(--color-text)', lineHeight: 1.8 }}>
              <p style={{ marginBottom: '1.5rem' }}>
                Reparaciones Manzanares nació hace más de 15 años con una misión clara: ofrecer un servicio técnico de reparación de averías urgente que fuera realmente transparente y local. 
              </p>
              <p style={{ marginBottom: '1.5rem' }}>
                En una zona como la Sierra de Madrid, donde el clima y la distancia a la capital pueden complicar las reparaciones, decidimos establecernos estratégicamente en Manzanares el Real para dar cobertura inmediata a todos los municipios colindantes.
              </p>
              <p>
                Hoy en día, contamos con un equipo de técnicos autorizados en fontanería, electricidad, climatización y cerrajería, todos ellos residentes en la zona y comprometidos con ofrecer soluciones duraderas con garantía por escrito.
              </p>
            </div>
          </div>
          <div style={{ backgroundColor: '#F8FAFC', padding: '3rem', borderRadius: 'var(--radius-lg)', border: '1px solid #E2E8F0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            {stats.map((stat, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-accent)', marginBottom: '0.5rem' }}>{stat.value}</div>
                <div style={{ fontSize: '0.9rem', color: '#64748B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '6rem 0', backgroundColor: '#F1F5F9' }}>
        <div className="container">
          <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '4rem' }}>Por qué confiar en nosotros</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {[
              { title: 'Técnicos Autorizados', desc: 'Contamos con todos los carnés industriales necesarios de la Comunidad de Madrid.', icon: '🛡️' },
              { title: 'Rapidez Extrema', desc: 'Atendemos urgencias en menos de 20 minutos gracias a nuestra ubicación local.', icon: '⚡' },
              { title: 'Precios Cerrados', desc: 'Damos presupuesto por teléfono o antes de empezar. Sin sorpresas finales.', icon: '💰' },
              { title: 'Garantía por Escrito', desc: 'Todas nuestras reparaciones tienen garantía legal mínima de 6 meses.', icon: '📝' }
            ].map((feature, i) => (
              <div key={i} style={{ backgroundColor: 'white', padding: '2.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{feature.icon}</div>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>{feature.title}</h3>
                <p style={{ color: '#64748B' }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '8rem 0', backgroundColor: 'white', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>¿Tienes una avería técnica?</h2>
          <p style={{ fontSize: '1.25rem', color: '#64748B', marginBottom: '3rem' }}>
            No esperes a que el problema empeore. Estamos disponibles las 24 horas del día para ayudarte.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="tel:+34669162085" className="btn btn-accent pulse-btn" style={{ fontSize: '1.2rem', padding: '1.2rem 2.5rem' }}>
              📞 Llamar ahora: 669 162 085
            </a>
            <a href="/contacto" className="btn" style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>
              Solicitar Presupuesto
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
