import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

const baseUrl = 'https://www.reparacionesmanzanares.es';
const PHONE_NUMBER = "669 162 085";
const PHONE_RAW = "669162085";
const WA_LINK = `https://wa.me/34${PHONE_RAW}?text=Hola%20Reparaciones%20Manzanares,%20tengo%20una%20aver%C3%ADa%20urgente%20en%20casa.%20%C2%BFMe%20pod%C3%A9is%20ayudar?`;

export const metadata: Metadata = {
  title: {
    default: 'Reparaciones Manzanares | Fontaneros, Electricistas y Cerrajeros 24h Sierra de Madrid',
    template: '%s | Reparaciones Manzanares'
  },
  description: 'Servicio técnico urgente 24h: fontanería, electricidad, cerrajería y calderas en la Sierra de Madrid. Técnicos autorizados 24h.',
  keywords: ['fontanero urgente Manzanares', 'electricista 24h Sierra Madrid', 'cerrajero urgente Manzanares el Real', 'reparación calderas', 'manitas a domicilio'],
  authors: [{ name: 'Reparaciones Manzanares' }],
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    title: 'Reparaciones Manzanares | Servicio Técnico 24h Sierra de Madrid',
    description: 'Asistencia técnica inmediata: Fontanería, Electricidad, Cerrajería y Calderas.',
    url: baseUrl,
    siteName: 'Reparaciones Manzanares',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reparaciones Manzanares | 24h Urgencias',
    description: 'Técnicos especialistas en reparaciones del hogar en la Sierra de Madrid.',
  },
  robots: {
    index: true,
    follow: true,
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Reparaciones Manzanares",
    "image": `${baseUrl}/logo.png`, 
    "@id": `${baseUrl}/#organization`,
    "url": baseUrl,
    "telephone": `+34${PHONE_RAW}`,
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Servicio a Domicilio",
      "addressLocality": "Manzanares el Real",
      "addressRegion": "Madrid",
      "postalCode": "28410",
      "addressCountry": "ES"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 40.7271,
      "longitude": -3.8614
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "areaServed": [
      { "@type": "City", "name": "Manzanares el Real" },
      { "@type": "City", "name": "Colmenar Viejo" },
      { "@type": "City", "name": "Collado Villalba" },
      { "@type": "City", "name": "Moralzarzal" },
      { "@type": "City", "name": "Soto del Real" },
      { "@type": "City", "name": "Guadarrama" },
      { "@type": "City", "name": "Alpedrete" }
    ]
  };

  return (
    <html lang="es" style={{ scrollBehavior: 'smooth' }}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-MZ2KMK12PM" />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-MZ2KMK12PM');

              window.trackEvent = async function(type, service = '', location = '') {
                try {
                  // Track in our local stats
                  await fetch('/api/track', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ type, service, location })
                  });
                  
                  // Track in Google Analytics too
                  if (typeof gtag === 'function') {
                    gtag('event', type, {
                      'service': service,
                      'location': location
                    });
                  }
                } catch (e) {
                  console.error('Tracking failed', e);
                }
              };
            `,
          }}
        />
        <nav style={{
          backgroundColor: 'var(--color-surface)',
          boxShadow: 'var(--shadow-sm)',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}>
          <div className="container" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '80px'
          }}>
            <a href="/" style={{ textDecoration: 'none' }}>
              <div style={{ fontWeight: 800, fontSize: '1.5rem', color: 'var(--color-primary)' }}>
                Reparaciones<span style={{ color: 'var(--color-accent)' }}>Manzanares</span>
              </div>
            </a>
            <div className="nav-links" style={{ display: 'none', gap: '1.25rem', alignItems: 'center' }}>
              <a href="/nosotros" style={{ color: 'var(--color-text)', textDecoration: 'none', fontWeight: 600 }}>Nosotros</a>
              <a href="/fontanero-manzanares-el-real" style={{ color: 'var(--color-text)', textDecoration: 'none', fontWeight: 500, fontSize: '0.9rem' }}>Fontanería</a>
              <a href="/electricista-manzanares-el-real" style={{ color: 'var(--color-text)', textDecoration: 'none', fontWeight: 500, fontSize: '0.9rem' }}>Electricidad</a>
              <a href="/cerrajero-manzanares-el-real" style={{ color: 'var(--color-text)', textDecoration: 'none', fontWeight: 500, fontSize: '0.9rem' }}>Cerrajería</a>
              <a href="/reparacion-calderas-manzanares-el-real" style={{ color: 'var(--color-text)', textDecoration: 'none', fontWeight: 500, fontSize: '0.9rem' }}>Calderas</a>
              <a href="/contacto" style={{ color: 'var(--color-text)', textDecoration: 'none', fontWeight: 600 }}>Contacto</a>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <a href={`tel:${PHONE_RAW}`} 
                 onClick={() => (window as any).trackEvent?.('call', 'navbar')}
                 className="btn btn-accent" style={{ padding: '0.6rem 1.2rem', fontSize: '1rem' }}>
                📞 24h
              </a>
            </div>
          </div>
          <style dangerouslySetInnerHTML={{ __html: `
            @media (min-width: 1024px) {
              .nav-links { display: flex !important; }
            }
          `}} />
        </nav>
        
        {children}
        
        <footer style={{
          backgroundColor: 'var(--color-primary)',
          color: 'white',
          padding: '4rem 0',
          marginTop: '4rem'
        }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', textAlign: 'left' }}>
            <div>
              <h3 style={{ color: 'white', marginBottom: '1.5rem' }}>Reparaciones Manzanares</h3>
              <p style={{ color: '#A0AEC0', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Tu servicio técnico de confianza en la Sierra de Madrid (Zona Norte). Técnicos autorizados en reparaciones urgentes y mantenimiento del hogar.
              </p>
              <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <a href="/nosotros" style={{ color: 'white', textDecoration: 'none', fontSize: '0.9rem' }}>Sobre nosotros →</a>
                <a href="/contacto" style={{ color: 'white', textDecoration: 'none', fontSize: '0.9rem' }}>Página de contacto →</a>
              </div>
            </div>
            
            <div>
              <h4 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '1.2rem' }}>Oficios 24h</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <li><a href="/fontanero-manzanares-el-real" style={{ color: '#A0AEC0', textDecoration: 'none' }}>Fontanería Urgente</a></li>
                <li><a href="/electricista-manzanares-el-real" style={{ color: '#A0AEC0', textDecoration: 'none' }}>Electricista 24 Horas</a></li>
                <li><a href="/cerrajero-manzanares-el-real" style={{ color: '#A0AEC0', textDecoration: 'none' }}>Cerrajero de Urgencia</a></li>
                <li><a href="/reparacion-calderas-manzanares-el-real" style={{ color: '#A0AEC0', textDecoration: 'none' }}>Reparación de Calderas</a></li>
                <li><a href="/aire-acondicionado-manzanares-el-real" style={{ color: '#A0AEC0', textDecoration: 'none' }}>Aire Acondicionado</a></li>
              </ul>
            </div>

            <div>
              <h4 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '1.2rem' }}>Top Localidades</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                <li><a href="/fontanero-manzanares-el-real" style={{ color: '#A0AEC0', textDecoration: 'none', fontSize: '0.85rem' }}>Manzanares</a></li>
                <li><a href="/fontanero-colmenar-viejo" style={{ color: '#A0AEC0', textDecoration: 'none', fontSize: '0.85rem' }}>Colmenar</a></li>
                <li><a href="/fontanero-collado-villalba" style={{ color: '#A0AEC0', textDecoration: 'none', fontSize: '0.85rem' }}>Villalba</a></li>
                <li><a href="/fontanero-soto-del-real" style={{ color: '#A0AEC0', textDecoration: 'none', fontSize: '0.85rem' }}>Soto</a></li>
                <li><a href="/fontanero-moralzarzal" style={{ color: '#A0AEC0', textDecoration: 'none', fontSize: '0.85rem' }}>Moralzarzal</a></li>
                <li><a href="/fontanero-guadarrama" style={{ color: '#A0AEC0', textDecoration: 'none', fontSize: '0.85rem' }}>Guadarrama</a></li>
              </ul>
            </div>
          </div>
          <div className="container" style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
            <p style={{ color: '#A0AEC0', fontSize: '0.85rem' }}>
              © 2026 Reparaciones Manzanares. Todos los derechos reservados. | Técnicos Autorizados Comunidad de Madrid.
            </p>
          </div>
        </footer>

        {/* FLOATING WHATSAPP BUTTON */}
        <a 
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => (window as any).trackEvent?.('whatsapp', 'floating')}
          className="whatsapp-btn animate-pulse-wa"
          style={{
            position: 'fixed',
            bottom: '100px',
            right: '25px',
            backgroundColor: '#25D366',
            color: 'white',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0 4px 15px rgba(37, 211, 102, 0.4)',
            zIndex: 9999,
          }}
          aria-label="Contactar por WhatsApp"
        >
          <svg width="35" height="35" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
          </svg>
        </a>

        {/* MOBILE STICKY BOTTOM CALL BAR */}
        <div className="mobile-only-cta" style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'var(--color-primary)',
          padding: '0.8rem 1rem',
          display: 'flex',
          justifyContent: 'center',
          boxShadow: '0 -4px 10px rgba(0,0,0,0.1)',
          zIndex: 9998,
        }}>
          <a href={`tel:${PHONE_RAW}`} 
             onClick={() => (window as any).trackEvent?.('call', 'sticky-mobile')}
             className="btn btn-accent pulse-btn" style={{ width: '100%', fontSize: '1.2rem', padding: '0.8rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.4rem' }}>📞</span> ¡Llamar Técnico Ahora!
          </a>
        </div>
      </body>
    </html>
  );
}
