import React from 'react';
import Link from 'next/link';
import { blogPosts } from '@/data/blogData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog de Reparaciones del Hogar y Consejos | Sierra de Madrid',
  description: 'Guías prácticas de fontanería, electricidad, calderas y mantenimiento del hogar escritas por nuestro Equipo Técnico. Aprende a solucionar averías y ahorrar.',
  alternates: {
    canonical: 'https://www.reparacionesmanzanares.es/blog'
  }
};

// Simple visual category tags
const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  "Fontanería": { bg: "rgba(59, 130, 246, 0.08)", text: "#2563EB", border: "rgba(59, 130, 246, 0.2)" },
  "Electricidad": { bg: "rgba(245, 158, 11, 0.08)", text: "#D97706", border: "rgba(245, 158, 11, 0.2)" },
  "Calderas": { bg: "rgba(239, 68, 68, 0.08)", text: "#DC2626", border: "rgba(239, 68, 68, 0.2)" },
  "Cerrajería": { bg: "rgba(16, 185, 129, 0.08)", text: "#059669", border: "rgba(16, 185, 129, 0.2)" }
};

// SVG icons matching the category
function CategoryIcon({ category, style }: { category: string; style?: React.CSSProperties }) {
  switch (category) {
    case "Fontanería":
      return (
        <svg style={style} width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 13.5a3 3 0 100-6 3 3 0 000 6z" />
        </svg>
      );
    case "Electricidad":
      return (
        <svg style={style} width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    case "Calderas":
      return (
        <svg style={style} width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.657 7.343a8 8 0 010 11.314z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    default:
      return (
        <svg style={style} width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m-2 4a2 2 0 012 2m3-10a1 1 0 00-1-1h-1m-1 0H7a3 3 0 00-3 3v8a3 3 0 003 3h12a3 3 0 003-3V5a1 1 0 00-1-1z" />
        </svg>
      );
  }
}

export default function BlogPage() {
  return (
    <main style={{ minHeight: '80vh', backgroundColor: '#F8FAFC' }}>
      {/* Hero Header */}
      <section style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '5rem 0', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ color: 'white', fontSize: '3rem', marginBottom: '1rem' }}>
            Blog del Hogar y Consejos Técnicos
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#CBD5E1', maxWidth: '650px', margin: '0 auto', lineHeight: 1.6 }}>
            Consejos útiles de mantenimiento, guías de averías y explicaciones de normativas redactados por nuestro equipo técnico autorizado en la Sierra de Madrid.
          </p>
        </div>
      </section>

      {/* Grid of Articles */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem'
          }}>
            {blogPosts.map((post) => {
              const colors = categoryColors[post.category] || { bg: '#F1F5F9', text: '#475569', border: '#E2E8F0' };
              
              return (
                <article key={post.slug} style={{
                  backgroundColor: 'white',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  border: '1px solid #E2E8F0',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }} className="blog-card">
                  {/* Decorative Header Image Placeholder */}
                  <div style={{
                    height: '180px',
                    backgroundColor: colors.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderBottom: '1px solid #E2E8F0',
                    position: 'relative'
                  }}>
                    <CategoryIcon category={post.category} />
                    <span style={{
                      position: 'absolute',
                      bottom: '12px',
                      left: '16px',
                      backgroundColor: 'white',
                      border: `1px solid ${colors.border}`,
                      color: colors.text,
                      padding: '0.25rem 0.75rem',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: 600
                    }}>
                      {post.category}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <div style={{ display: 'flex', gap: '0.75rem', color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                      <span>{post.publishDate}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h2 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--color-primary)', lineHeight: 1.3 }}>
                      <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        {post.title}
                      </Link>
                    </h2>

                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem', flexGrow: 1 }}>
                      {post.excerpt}
                    </p>

                    <Link href={`/blog/${post.slug}`} className="btn" style={{
                      backgroundColor: 'transparent',
                      border: '1px solid var(--color-primary)',
                      color: 'var(--color-primary)',
                      textAlign: 'center',
                      padding: '0.75rem',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      width: '100%',
                      textDecoration: 'none',
                      borderRadius: 'var(--radius-md)',
                      display: 'block'
                    }}>
                      Leer artículo →
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
