import React from 'react';

export interface Review {
  name: string;
  city: string;
  service: string;
  date: string;
  rating: number; // 1 to 5 stars
  text: string;
}

interface TestimoniosProps {
  reviews: Review[];
  title?: string;
  subtitle?: string;
}

export default function Testimonios({ reviews, title = "Opiniones reales de clientes de la Sierra", subtitle = "reseñas verificadas de Google Maps" }: TestimoniosProps) {
  // If no reviews are provided, render nothing to avoid fake reviews
  if (!reviews || reviews.length === 0) {
    return null;
  }

  return (
    <section style={{ padding: '6rem 0', backgroundColor: 'var(--color-primary)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'white' }}>{title}</h2>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: 'white', fontSize: '1.2rem', fontWeight: 600 }}>5/5</span>
            <div style={{ display: 'flex', gap: '2px' }}>
              {[1, 2, 3, 4, 5].map(i => (
                <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="#FBBC05">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
            </div>
            <span style={{ color: '#CBD5E1', fontSize: '1rem' }}>({subtitle})</span>
          </div>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '2rem', 
          maxWidth: '900px', 
          margin: '0 auto' 
        }}>
          {reviews.map((review, i) => (
            <div key={i} style={{ 
              backgroundColor: 'white', 
              padding: '2.5rem 2rem', 
              borderRadius: 'var(--radius-lg)', 
              boxShadow: 'var(--shadow-md)', 
              color: 'var(--color-text)', 
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div style={{ 
                position: 'absolute', 
                top: '24px', 
                right: '24px', 
                backgroundColor: '#F0FDF4', 
                border: '1px solid #BBF7D0', 
                borderRadius: '20px', 
                padding: '0.25rem 0.6rem', 
                fontSize: '0.75rem', 
                fontWeight: 600, 
                color: '#16A34A' 
              }}>
                ✓ Reseña Real
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ 
                    width: '45px', 
                    height: '45px', 
                    borderRadius: '50%', 
                    backgroundColor: review.name.toLowerCase().startsWith('s') ? '#4285F4' : '#EA4335', 
                    color: 'white', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    fontWeight: 'bold', 
                    fontSize: '1.2rem' 
                  }}>
                    {review.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--color-primary)' }}>{review.name}</div>
                    <div style={{ fontSize: '0.85rem', color: '#64748B' }}>
                      {review.service} • en {review.city}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '2px', marginBottom: '1rem' }}>
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <svg key={idx} width="18" height="18" viewBox="0 0 24 24" fill={idx < review.rating ? "#FBBC05" : "#E2E8F0"}>
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>

                <p style={{ 
                  fontSize: '1rem', 
                  color: '#334155', 
                  lineHeight: 1.6, 
                  fontStyle: 'italic',
                  margin: 0
                }}>
                  "{review.text}"
                </p>
              </div>

              <div style={{ 
                fontSize: '0.8rem', 
                color: '#94A3B8', 
                marginTop: '1.5rem', 
                textAlign: 'right',
                fontWeight: 500
              }}>
                Publicada: {review.date}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
