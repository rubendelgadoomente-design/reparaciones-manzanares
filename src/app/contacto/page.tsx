import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contacto | Reparaciones Manzanares',
  description: 'Solicita tu presupuesto gratuito para reparaciones de fontanería, electricidad o cerrajería en la Sierra de Madrid. Atención 24h para urgencias.',
  alternates: {
    canonical: 'https://www.reparacionesmanzanares.es/contacto'
  }
};

export default function ContactoPage() {
  const PHONE_RAW = "669162085";
  const PHONE_NUMBER = "669 162 085";

  return (
    <main>
      <section style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '6rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ color: 'white', fontSize: '3.5rem', marginBottom: '1.5rem' }}>Contacto y Presupuestos</h1>
          <p style={{ fontSize: '1.25rem', color: '#CBD5E1', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}>
            ¿Tienes una avería técnica o necesitas un presupuesto para una instalación? Estamos aquí para ayudarte.
          </p>
        </div>
      </section>

      <section style={{ padding: '6rem 0', backgroundColor: 'white' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'start' }}>
          
          <div style={{ backgroundColor: 'var(--color-bg)', padding: '3rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'var(--color-primary)' }}>Presupuesto sin compromiso</h2>
            <p style={{ color: '#64748B', marginBottom: '3rem' }}>
              Para darnos los detalles de tu avería o solicitar un presupuesto cerrado, puedes llamarnos o enviarnos un WhatsApp con fotos de la reparación.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', backgroundColor: 'white', padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
                <span style={{ fontSize: '2.5rem' }}>📞</span>
                <div>
                  <div style={{ fontWeight: 600, color: '#64748B', fontSize: '0.9rem', marginBottom: '0.2rem' }}>Teléfono 24 Horas</div>
                  <a href={`tel:${PHONE_RAW}`} style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-primary)', textDecoration: 'none' }}>{PHONE_NUMBER}</a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', backgroundColor: '#EFFFF4', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid #C6F6D5' }}>
                <span style={{ fontSize: '2.5rem' }}>💬</span>
                <div>
                  <div style={{ fontWeight: 600, color: '#2F855A', fontSize: '0.9rem', marginBottom: '0.2rem' }}>WhatsApp Urgente</div>
                  <a href={`https://wa.me/34${PHONE_RAW}`} style={{ fontSize: '1.5rem', fontWeight: 800, color: '#2F855A', textDecoration: 'none' }}>Enviar Mensaje</a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', backgroundColor: 'white', padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
                <span style={{ fontSize: '2.5rem' }}>🏙️</span>
                <div>
                  <div style={{ fontWeight: 600, color: '#64748B', fontSize: '0.9rem', marginBottom: '0.2rem' }}>Zona de Servicio</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-primary)' }}>Sierra de Madrid (Zona Norte)</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Área de Cobertura</h2>
            <div style={{ fontSize: '1.1rem', color: 'var(--color-text)', lineHeight: 1.8 }}>
              <p style={{ marginBottom: '1.5rem' }}>
                Nuestro equipo técnico está distribuido estratégicamente por la comarca de la <strong>Sierra de Madrid</strong> para garantizar una respuesta rápida en los siguientes municipios y sus urbanizaciones:
              </p>
              <ul style={{ 
                listStyle: 'none', 
                padding: 0, 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
                gap: '1rem',
                marginBottom: '3rem'
              }}>
                {['Manzanares el Real', 'Colmenar Viejo', 'Collado Villalba', 'Moralzarzal', 'Alpedrete', 'Guadarrama', 'Cerceda', 'El Boalo', 'Mataelpino', 'Becerril de la Sierra', 'Navacerrada', 'Cercedilla', 'Los Molinos', 'Miraflores', 'Soto del Real'].map((place, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748B' }}>
                    <span style={{ color: 'var(--color-accent)' }}>✓</span> {place}
                  </li>
                ))}
              </ul>

              <div style={{ backgroundColor: '#F1F5F9', borderRadius: 'var(--radius-lg)', overflow: 'hidden', height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #E2E8F0' }}>
                 <div style={{ textAlign: 'center', padding: '2rem' }}>
                   <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📍</div>
                   <p style={{ fontSize: '1rem', color: '#64748B' }}>
                     Cubrimos toda la zona norte de la A-6, A-1 y M-607.<br/>
                     <a href="https://maps.google.com/?q=Sierra+de+Madrid" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent)', fontWeight: 600, textDecoration: 'none', marginTop: '1rem', display: 'block' }}>Ver en Google Maps →</a>
                   </p>
                 </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section style={{ padding: '6rem 0', backgroundColor: 'var(--color-primary)', color: 'white', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem', color: 'white' }}>Atención 24 Horas</h2>
          <p style={{ fontSize: '1.25rem', color: '#CBD5E1', marginBottom: '3rem' }}>
            Las averías industriales y domésticas no descansan. Nosotros tampoco. Llámanos a cualquier hora del día o de la noche.
          </p>
          <a href={`tel:${PHONE_RAW}`} className="btn btn-accent pulse-btn" style={{ fontSize: '1.5rem', padding: '1.5rem 3.5rem' }}>
            📞 Llamar Técnico: {PHONE_NUMBER}
          </a>
        </div>
      </section>
    </main>
  );
}
