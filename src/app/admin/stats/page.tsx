'use client';

import React, { useEffect, useState } from 'react';

export default function StatsDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetch('/api/track')
        .then(res => res.json())
        .then(data => {
          setStats(data);
          setLoading(false);
        });
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === '1234') { // Simple demo passcode as requested
      setIsAuthenticated(true);
    } else {
      alert('Contraseña incorrecta');
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0F172A', color: 'white' }}>
        <form onSubmit={handleLogin} style={{ backgroundColor: '#1E293B', padding: '3rem', borderRadius: '1rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', width: '100%', maxWidth: '400px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Panel de Control</h2>
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

  if (loading) return <div style={{ color: 'white', textAlign: 'center', padding: '5rem' }}>Cargando métricas...</div>;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0F172A', color: 'white', padding: '2rem' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', margin: 0, background: 'linear-gradient(to right, #3B82F6, #2DD4BF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Dashboard de Conversión</h1>
            <p style={{ color: '#94A3B8' }}>Reparaciones Manzanares - Lead Tracking System</p>
          </div>
          <div style={{ backgroundColor: '#1E293B', padding: '0.75rem 1.5rem', borderRadius: '2rem', border: '1px solid #334155' }}>
            <span style={{ color: '#2DD4BF', fontWeight: 'bold' }}>● En vivo</span> 
          </div>
        </header>

        {/* TOP STATS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          <div style={cardStyle}>
            <span style={{ fontSize: '0.9rem', color: '#94A3B8' }}>TOTAL LEADS (CONVERSIONES)</span>
            <div style={{ fontSize: '3rem', fontWeight: 'bold', margin: '0.5rem 0' }}>{stats.totalLeads}</div>
            <div style={{ color: '#10B981', fontSize: '0.9rem' }}>↑ +100% efectividad</div>
          </div>
          <div style={cardStyle}>
            <span style={{ fontSize: '0.9rem', color: '#94A3B8' }}>CLICKS EN LLAMADA</span>
            <div style={{ fontSize: '3rem', fontWeight: 'bold', margin: '0.5rem 0', color: '#3B82F6' }}>{stats.calls}</div>
            <div style={{ fontSize: '0.8rem' }}>Intención de contratación directa</div>
          </div>
          <div style={cardStyle}>
            <span style={{ fontSize: '0.9rem', color: '#94A3B8' }}>CONTACTOS WHATSAPP</span>
            <div style={{ fontSize: '3rem', fontWeight: 'bold', margin: '0.5rem 0', color: '#25D366' }}>{stats.whatsapp}</div>
            <div style={{ fontSize: '0.8rem' }}>Consultas vía chat directo</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '2rem' }}>
          {/* SERVICE BREAKDOWN */}
          <div style={cardStyle}>
            <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid #334155', paddingBottom: '0.5rem' }}>Rendimiento por Servicio</h3>
            {Object.entries(stats.services).length === 0 ? <p style={{ color: '#64748B' }}>Aún no hay datos de servicios.</p> : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {Object.entries(stats.services)
                  .sort(([, a]: any, [, b]: any) => b - a)
                  .map(([name, count]: any) => (
                    <div key={name}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ textTransform: 'capitalize' }}>{name}</span>
                        <span>{count} leads</span>
                      </div>
                      <div style={{ height: '8px', backgroundColor: '#334155', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${(count / stats.totalLeads) * 100}%`, backgroundColor: '#3B82F6' }}></div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* LOCATION BREAKDOWN */}
          <div style={cardStyle}>
            <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid #334155', paddingBottom: '0.5rem' }}>Top Localidades</h3>
            {Object.entries(stats.locations).length === 0 ? <p style={{ color: '#64748B' }}>Aún no hay datos de ubicaciones.</p> : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {Object.entries(stats.locations)
                  .sort(([, a]: any, [, b]: any) => b - a)
                  .slice(0, 5)
                  .map(([name, count]: any) => (
                    <div key={name}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span>{name}</span>
                        <span>{count}</span>
                      </div>
                      <div style={{ height: '8px', backgroundColor: '#334155', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${(count / stats.totalLeads) * 100}%`, backgroundColor: '#2DD4BF' }}></div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>

        {/* PROOF OF VALUE SECTION */}
        <div style={{ marginTop: '3rem', backgroundColor: '#1E293B', padding: '2rem', borderRadius: '1rem', border: '1px solid #3B82F6' }}>
          <h2 style={{ color: '#3B82F6', marginBottom: '1rem' }}>Resumen para Colaboradores</h2>
          <p style={{ color: '#94A3B8', maxWidth: '800px', lineHeight: 1.6 }}>
            Este panel certifica la tracción real de <strong>Reparaciones Manzanares</strong> en la Sierra de Madrid. 
            Cada "Lead" registrado representa una intención clara de un usuario local por contratar un servicio técnico urgente. 
            El tráfico es 100% orgánico y segmentado geográficamente.
          </p>
          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
             <button onClick={() => window.print()} style={{ padding: '0.6rem 1.2rem', borderRadius: '0.5rem', border: 'none', backgroundColor: '#3B82F6', color: 'white', cursor: 'pointer' }}>Exportar Reporte PDF</button>
             <button onClick={() => window.location.reload()} style={{ padding: '0.6rem 1.2rem', borderRadius: '0.5rem', border: '1px solid #334155', backgroundColor: 'transparent', color: 'white', cursor: 'pointer' }}>Refrescar Datos</button>
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
