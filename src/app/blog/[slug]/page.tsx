import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { blogPosts } from '@/data/blogData';

const PHONE_NUMBER = "919 930 963";
const PHONE_RAW = "919930963";

export function generateStaticParams() {
  return blogPosts.map(post => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const post = blogPosts.find(p => p.slug === resolvedParams.slug);
  if (!post) return { title: 'Artículo no encontrado' };

  return {
    title: `${post.title} | Consejos de Expertos`,
    description: post.excerpt,
    alternates: {
      canonical: `https://www.reparacionesmanzanares.es/blog/${resolvedParams.slug}`
    }
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = blogPosts.find(p => p.slug === resolvedParams.slug);
  if (!post) notFound();

  // JSON-LD structured data for Article schema
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "datePublished": "2026-06-17T12:00:00Z", // Static date matching publishing
    "author": {
      "@type": "Organization",
      "name": "Equipo técnico",
      "url": "https://www.reparacionesmanzanares.es"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Reparaciones Manzanares",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.reparacionesmanzanares.es/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.reparacionesmanzanares.es/blog/${post.slug}`
    }
  };

  return (
    <main style={{ backgroundColor: '#FCFDFE', minHeight: '100vh', padding: '3rem 0' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      
      <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Breadcrumb / Back Link */}
        <div style={{ marginBottom: '2rem' }}>
          <Link href="/blog" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            ← Volver al Blog
          </Link>
        </div>

        {/* Article Header */}
        <header style={{ marginBottom: '3rem', borderBottom: '1px solid #F1F5F9', paddingBottom: '2rem' }}>
          <span style={{
            backgroundColor: 'rgba(255, 109, 0, 0.08)',
            border: '1px solid rgba(255, 109, 0, 0.2)',
            color: 'var(--color-accent)',
            padding: '0.3rem 0.8rem',
            borderRadius: '20px',
            fontSize: '0.8rem',
            fontWeight: 700,
            textTransform: 'uppercase'
          }}>
            {post.category}
          </span>
          
          <h1 style={{ fontSize: '2.8rem', margin: '1rem 0 1.5rem 0', color: 'var(--color-primary)', lineHeight: 1.2 }}>
            {post.title}
          </h1>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center', color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              👤 Escrito por: <strong>Equipo técnico</strong>
            </span>
            <span>•</span>
            <span>📅 {post.publishDate}</span>
            <span>•</span>
            <span>⏱️ {post.readTime}</span>
          </div>
        </header>

        {/* Main Layout (Article + Sidebar) */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3.5rem', alignItems: 'start' }}>
          
          {/* Article Text Content */}
          <article className="blog-content" style={{ flex: '1 1 650px', maxWidth: '750px' }}>
            <div 
              style={{ fontSize: '1.15rem', lineHeight: '1.85', color: '#334155' }}
              dangerouslySetInnerHTML={{ __html: post.content }} 
            />

            {/* In-Text Banner Call to Action */}
            <div style={{ 
              marginTop: '4rem', 
              padding: '2.5rem', 
              backgroundColor: '#F8FAFC', 
              borderLeft: '5px solid var(--color-accent)', 
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
                ¿Tienes una urgencia técnica en casa?
              </h3>
              <p style={{ fontSize: '1rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
                No arriesgues la seguridad de tu hogar. En <strong>Reparaciones Manzanares</strong> atendemos averías críticas de fontanería, electricidad y calderas las 24 horas del día.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a href={`tel:${PHONE_RAW}`} 
                   data-track-event="call"
                   data-track-service={post.slug}
                   className="btn btn-accent" style={{ fontSize: '1rem', padding: '0.8rem 1.8rem' }}>
                  📞 Llamar Técnico: {PHONE_NUMBER}
                </a>
                <Link href={`/${post.relatedServiceSlug}`} className="btn" style={{ backgroundColor: 'white', border: '1px solid #CBD5E1', color: 'var(--color-primary)', textDecoration: 'none', padding: '0.8rem 1.8rem', borderRadius: 'var(--radius-md)', fontWeight: 600 }}>
                  Ver Servicio Completo
                </Link>
              </div>
            </div>
          </article>

          {/* Sticky Sidebar CTA */}
          <aside style={{ flex: '1 1 280px', position: 'sticky', top: '120px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ 
              backgroundColor: 'var(--color-primary)', 
              color: 'white', 
              padding: '2rem', 
              borderRadius: 'var(--radius-lg)', 
              boxShadow: 'var(--shadow-md)',
              textAlign: 'center'
            }}>
              <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>☎️</span>
              <h3 style={{ color: 'white', fontSize: '1.3rem', marginBottom: '1rem' }}>Asistencia 24 Horas</h3>
              <p style={{ color: '#E2E8F0', fontSize: '0.95rem', lineHeight: 1.5, marginBottom: '2rem' }}>
                Atendemos desatascos, roturas, apagones y fallos en calderas de forma inmediata en toda la Sierra de Madrid.
              </p>
              
              <a href={`tel:${PHONE_RAW}`}
                 data-track-event="call"
                 data-track-service={`${post.slug}-sidebar`}
                 className="btn btn-accent animate-pulse" 
                 style={{ display: 'block', width: '100%', fontSize: '1.1rem', padding: '1rem 0', textDecoration: 'none', textAlign: 'center' }}>
                Llamar Ahora
              </a>
              <span style={{ display: 'block', fontSize: '0.8rem', color: '#94A3B8', marginTop: '1rem' }}>
                Llegada en 15 - 30 minutos
              </span>
            </div>

            <div style={{
              border: '1px solid #E2E8F0',
              padding: '2rem',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'white',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <h4 style={{ color: 'var(--color-primary)', marginBottom: '1rem', fontSize: '1.1rem' }}>Categorías del Blog</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <li><Link href="/blog" style={{ color: 'var(--color-text)', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500 }}>💧 Fontanería</Link></li>
                <li><Link href="/blog" style={{ color: 'var(--color-text)', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500 }}>⚡ Electricidad</Link></li>
                <li><Link href="/blog" style={{ color: 'var(--color-text)', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500 }}>🔥 Calderas</Link></li>
                <li><Link href="/blog" style={{ color: 'var(--color-text)', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500 }}>🔑 Cerrajería</Link></li>
              </ul>
            </div>
          </aside>

        </div>
      </div>

      {/* Styled Blog Specific CSS Elements */}
      <style dangerouslySetInnerHTML={{ __html: `
        .blog-content h2 {
          font-size: 1.8rem;
          color: var(--color-primary);
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          font-weight: 700;
        }
        .blog-content h3 {
          font-size: 1.4rem;
          color: var(--color-primary);
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          font-weight: 600;
        }
        .blog-content p {
          margin-bottom: 1.5rem;
        }
        .blog-content ul, .blog-content ol {
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
        }
        .blog-content li {
          margin-bottom: 0.5rem;
        }
        .blog-content strong {
          color: var(--color-primary);
          font-weight: 700;
        }
      `}} />
    </main>
  );
}
