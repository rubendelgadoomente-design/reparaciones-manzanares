import { Metadata } from 'next';
import { portfolioItems } from '@/data/portfolioData';

export const metadata: Metadata = {
  title: 'Sobre Nosotros | Reparaciones Manzanares',
  description: 'Conoce a Reparaciones Manzanares. Más de 15 años ofreciendo servicio técnico autorizado de calderas, fontanería, electricidad y climatización en la Sierra de Madrid.',
  alternates: {
    canonical: 'https://www.reparacionesmanzanares.es/nosotros'
  }
};

export default function NosotrosPage() {
  const stats = [
    { label: 'Años en la Sierra', value: '15+' },
    { label: 'Servicios Realizados', value: '10.000+' },
    { label: 'Técnicos Locales', value: '8' },
    { label: 'Garantía por Escrito', value: '6 Meses' }
  ];

  const workflow = [
    {
      step: '01',
      title: 'Contacto Inmediato',
      desc: 'Nos llamas al 919 930 963 o nos escribes por WhatsApp. Un técnico responde en el acto sin pasar por centralitas ni robots.'
    },
    {
      step: '02',
      title: 'Diagnóstico & Presupuesto',
      desc: 'El técnico asignado más cercano acude a tu domicilio, valora la avería y te ofrece un presupuesto cerrado por escrito antes de iniciar.'
    },
    {
      step: '03',
      title: 'Reparación Limpia',
      desc: 'Utilizamos repuestos originales compatibles y herramientas de última tecnología para solucionar el problema en la misma visita.'
    },
    {
      step: '04',
      title: 'Garantía Sellada',
      desc: 'Una vez comprobado el correcto funcionamiento y la seguridad, te entregamos la factura oficial con nuestra garantía legal de 6 meses.'
    }
  ];

  const locationsList = [
    "Manzanares el Real", "Colmenar Viejo", "Collado Villalba", 
    "Moralzarzal", "Alpedrete", "Guadarrama", 
    "Cerceda", "El Boalo", "Mataelpino", 
    "Becerril de la Sierra", "Navacerrada", "Cercedilla", 
    "Los Molinos", "Miraflores de la Sierra", "Soto del Real"
  ];

  return (
    <main style={{ backgroundColor: '#FCFDFE' }}>
      {/* Hero Section */}
      <section style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '6rem 0', textAlign: 'center' }}>
        <div className="container">
          <span style={{ color: 'var(--color-accent)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.9rem', display: 'block', marginBottom: '0.75rem' }}>
            Servicio Técnico Autorizado en la Sierra
          </span>
          <h1 style={{ color: 'white', fontSize: '3.5rem', marginBottom: '1.5rem', fontWeight: 800 }}>
            Tus Técnicos de Confianza
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#CBD5E1', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}>
            En Reparaciones Manzanares solucionamos averías de calefacción, calderas, fontanería, electricidad y cerrajería de forma rápida, honesta y sin intermediarios.
          </p>
        </div>
      </section>

      {/* Intro Section with Stats */}
      <section style={{ padding: '6rem 0', backgroundColor: 'white' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--color-primary)' }}>
              Más que una empresa, tus vecinos de la Sierra
            </h2>
            <div style={{ fontSize: '1.1rem', color: '#334155', lineHeight: 1.8 }}>
              <p style={{ marginBottom: '1.5rem' }}>
                Reparaciones Manzanares nació hace más de 15 años en Manzanares el Real con un objetivo muy claro: profesionalizar las reparaciones del hogar en la Sierra de Guadarrama. 
              </p>
              <p style={{ marginBottom: '1.5rem' }}>
                Sabemos lo difícil que es encontrar un fontanero, un electricista o un técnico de calderas en invierno que acuda rápido y no cobre tarifas abusivas por desplazamiento. Por eso, organizamos nuestro equipo de técnicos certificados distribuyéndolos de forma estratégica por las carreteras locales (M-607, M-608, M-617) para garantizar la llegada en minutos.
              </p>
              <p>
                No somos una agencia multiservicios nacional. Trabajamos de forma directa, lo que nos permite ofrecer precios competitivos, repuestos de calidad y dar la cara ante cualquier problema con garantías reales por escrito de 6 meses.
              </p>
            </div>
          </div>
          
          <div style={{ 
            backgroundColor: '#F8FAFC', 
            padding: '3rem 2rem', 
            borderRadius: 'var(--radius-lg)', 
            border: '1px solid #E2E8F0', 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '2.5rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            {stats.map((stat, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.8rem', fontWeight: 800, color: 'var(--color-accent)', marginBottom: '0.25rem' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proceso de Trabajo */}
      <section style={{ padding: '6rem 0', backgroundColor: '#F8FAFC', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>
              Nuestro Método de Trabajo Transparente
            </h2>
            <p style={{ color: '#64748B', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
              Garantizamos un flujo de trabajo sencillo y honesto para tu tranquilidad desde el primer segundo.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {workflow.map((w, i) => (
              <div key={i} style={{ backgroundColor: 'white', padding: '2.5rem 2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', border: '1px solid #E2E8F0', position: 'relative' }}>
                <span style={{ fontSize: '3rem', fontWeight: 800, color: 'rgba(255, 109, 0, 0.1)', position: 'absolute', top: '10px', right: '20px' }}>
                  {w.step}
                </span>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--color-primary)', marginBottom: '1rem', fontWeight: 700 }}>
                  {w.title}
                </h3>
                <p style={{ color: '#64748B', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  {w.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galería de Trabajos Reales */}
      <section style={{ padding: '6rem 0', backgroundColor: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>
              Nuestros Trabajos Realizados
            </h2>
            <p style={{ color: '#64748B', fontSize: '1.1rem', maxWidth: '650px', margin: '0 auto' }}>
              Fotografías reales de obras y reformas ejecutadas recientemente por nuestros operarios en municipios de la Sierra.
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '2rem' 
          }}>
            {portfolioItems.map((item) => (
              <div key={item.id} style={{ 
                border: '1px solid #E2E8F0', 
                borderRadius: 'var(--radius-lg)', 
                overflow: 'hidden', 
                backgroundColor: 'white',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <div style={{ height: '200px', overflow: 'hidden', position: 'relative', backgroundColor: '#F1F5F9' }}>
                  <img 
                    src={item.img} 
                    alt={item.alt}
                    title={item.titleAttr}
                    loading="lazy"
                    width={item.width}
                    height={item.height}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <span style={{ 
                    position: 'absolute', 
                    top: '12px', 
                    left: '12px', 
                    backgroundColor: 'var(--color-primary)', 
                    color: 'white', 
                    padding: '0.3rem 0.8rem', 
                    borderRadius: '20px', 
                    fontSize: '0.75rem', 
                    fontWeight: 700 
                  }}>
                    📍 {item.place}
                  </span>
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.1rem', color: 'var(--color-primary)', marginBottom: '0.5rem', fontWeight: 700 }}>
                    {item.title}
                  </h3>
                  <p style={{ color: '#64748B', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Zonas de Cobertura */}
      <section style={{ padding: '6rem 0', backgroundColor: '#F8FAFC', borderTop: '1px solid #E2E8F0' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>
              Red de Cobertura Local Inmediata
            </h2>
            <p style={{ color: '#64748B', fontSize: '1.1rem' }}>
              Al contar con técnicos residentes en la sierra, cubrimos de forma directa y sin recargos las siguientes localidades:
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', 
            gap: '1rem' 
          }}>
            {locationsList.map((loc, i) => (
              <div key={i} style={{ 
                backgroundColor: 'white', 
                border: '1px solid #E2E8F0', 
                borderRadius: '8px', 
                padding: '1rem', 
                textAlign: 'center',
                fontWeight: 600,
                fontSize: '0.95rem',
                color: '#334155',
                boxShadow: 'var(--shadow-sm)'
              }}>
                {loc}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section style={{ padding: '7rem 0', backgroundColor: 'var(--color-primary)', color: 'white', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem', color: 'white' }}>
            ¿Tienes una avería en la Sierra de Madrid?
          </h2>
          <p style={{ fontSize: '1.25rem', color: '#CBD5E1', marginBottom: '3rem', lineHeight: 1.6 }}>
            No dejes que una fuga, un apagón o un fallo en la calefacción afecte a tu hogar. Atendemos emergencias de forma inmediata y garantizada.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="tel:+34919930963" className="btn btn-accent animate-pulse" style={{ fontSize: '1.25rem', padding: '1.2rem 2.5rem' }}>
              📞 Llamar Técnico: 919 930 963
            </a>
            <a href="https://wa.me/34919930963?text=Hola,%20necesito%20informaci%C3%B3n%20sobre%20un%20servicio%20de%20reparaci%C3%B3n." target="_blank" rel="noopener noreferrer" className="btn" style={{ backgroundColor: '#25D366', color: 'white' }}>
              💬 Escríbenos por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
