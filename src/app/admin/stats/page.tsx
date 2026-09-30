
'use client';

import React, { useEffect, useState } from 'react';

export default function StatsDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [gscStats, setGscStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      Promise.all([
        fetch('/api/track').then(res => res.json()).catch(() => ({ totalLeads: 0, calls: 0, whatsapp: 0, services: {}, locations: {} })),
        fetch('/api/gsc').then(res => res.json()).catch(() => null)
      ]).then(([trackData, gscData]) => {
        setStats(trackData);
        setGscStats(gscData);
        setLoading(false);
      });
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === '1234') { 
      setIsAuthenticated(true);
    } else {
      alert('Contraseña incorrecta');
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0F172A', color: 'white' }}>
        <form onSubmit={handleLogin} style={{ backgroundColor: '#1E293B', padding: '3rem', borderRadius: '1rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', width: '100%', maxWidth: '400px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Panel de Control (Command Center)</h2>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94A3B8' }}>Contraseña de Acceso</label>
            <input 
              type="password" 
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="••••"
              style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #334155', backgroundColor: '#0F172A', color: 'white', fontSize: '1.2rem', textAlign: 'center' }}
            />
          </div>
          <button type="submit" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: 'none', backgroundColor: '#3B82F6', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>Entrar al Panel</button>
        </form>
      </div>
    );
  }

  if (loading) return <div style={{ color: 'white', textAlign: 'center', padding: '5rem' }}>Conectando con Google Search Console...</div>;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0F172A', color: 'white', padding: '2rem' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', margin: 0, background: 'linear-gradient(to right, #3B82F6, #2DD4BF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Command Center SEO</h1>
            <p style={{ color: '#94A3B8' }}>Reparaciones Manzanares - Integración GSC + Leads</p>
          </div>
          <div style={{ backgroundColor: '#1E293B', padding: '0.75rem 1.5rem', borderRadius: '2rem', border: '1px solid #334155' }}>
            <span style={{ color: '#2DD4BF', fontWeight: 'bold' }}>📡 API Conectada</span> 
          </div>
        </header>

        {/* TOP STATS GSC */}
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#E2E8F0', borderBottom: '1px solid #334155', paddingBottom: '0.5rem' }}>Rendimiento Google (Últimos 30 días)</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          <div style={cardStyle}>
            <span style={{ fontSize: '0.9rem', color: '#94A3B8' }}>IMPRESIONES</span>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0.5rem 0', color: '#F87171' }}>
              {gscStats?.totals?.impressions?.toLocaleString() || 0}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Veces vistos en Google</div>
          </div>
          <div style={cardStyle}>
            <span style={{ fontSize: '0.9rem', color: '#94A3B8' }}>CLICS ORGÁNICOS</span>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0.5rem 0', color: '#34D399' }}>
              {gscStats?.totals?.clicks?.toLocaleString() || 0}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Visitas desde buscador</div>
          </div>
          <div style={cardStyle}>
            <span style={{ fontSize: '0.9rem', color: '#94A3B8' }}>CTR (Conversión Clic)</span>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0.5rem 0', color: '#FBBF24' }}>
              {gscStats?.totals?.ctr ? (gscStats.totals.ctr * 100).toFixed(2) : 0}%
            </div>
            <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Porcentaje de clics</div>
          </div>
          <div style={cardStyle}>
            <span style={{ fontSize: '0.9rem', color: '#94A3B8' }}>POSICIÓN MEDIA</span>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0.5rem 0', color: '#A78BFA' }}>
              {gscStats?.totals?.position ? gscStats.totals.position.toFixed(1) : 0}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Ranking promedio SEO</div>
          </div>
        </div>

        {/* LEADS STATS */}
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#E2E8F0', borderBottom: '1px solid #334155', paddingBottom: '0.5rem' }}>Conversiones Locales (Leads)</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          <div style={cardStyle}>
            <span style={{ fontSize: '0.9rem', color: '#94A3B8' }}>TOTAL LEADS (TRACKER)</span>
            <div style={{ fontSize: '3rem', fontWeight: 'bold', margin: '0.5rem 0' }}>{stats?.totalLeads || 0}</div>
            <div style={{ color: '#10B981', fontSize: '0.9rem' }}>Conversiones intencionadas</div>
          </div>
          <div style={cardStyle}>
            <span style={{ fontSize: '0.9rem', color: '#94A3B8' }}>LLAMADAS</span>
            <div style={{ fontSize: '3rem', fontWeight: 'bold', margin: '0.5rem 0', color: '#3B82F6' }}>{stats?.calls || 0}</div>
          </div>
          <div style={cardStyle}>
            <span style={{ fontSize: '0.9rem', color: '#94A3B8' }}>WHATSAPP</span>
            <div style={{ fontSize: '3rem', fontWeight: 'bold', margin: '0.5rem 0', color: '#25D366' }}>{stats?.whatsapp || 0}</div>
          </div>
        </div>

        {/* TABLES GSC */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          <div style={cardStyle}>
            <h3 style={{ marginBottom: '1.5rem', color: '#E2E8F0' }}>🔍 Top Consultas (Keywords)</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {!gscStats?.queries?.length ? <p style={{ color: '#64748B' }}>No hay datos.</p> : 
                gscStats.queries.map((q: any, i: number) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #334155', paddingBottom: '0.5rem' }}>
                    <span style={{ color: '#94A3B8' }}>{q.keys[0]}</span>
                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem' }}>
                      <span style={{ color: '#34D399' }}>{q.clicks} clics</span>
                      <span style={{ color: '#F87171' }}>{q.impressions} imp</span>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>

          <div style={cardStyle}>
            <h3 style={{ marginBottom: '1.5rem', color: '#E2E8F0' }}>📄 Top Páginas (Atracción)</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {!gscStats?.pages?.length ? <p style={{ color: '#64748B' }}>No hay datos.</p> : 
                gscStats.pages.map((p: any, i: number) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #334155', paddingBottom: '0.5rem' }}>
                    <span style={{ color: '#94A3B8', fontSize: '0.85rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '60%' }}>
                      {p.keys[0].replace('https://www.reparacionesmanzanares.es', '').replace('https://reparacionesmanzanares.es', '') || '/'}
                    </span>
                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem' }}>
                      <span style={{ color: '#34D399' }}>{p.clicks} clics</span>
                      <span style={{ color: '#F87171' }}>{p.impressions} imp</span>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  backgroundColor: '#1E293B',
  padding: '1.5rem',
  borderRadius: '1rem',
  border: '1px solid #334155',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
};
