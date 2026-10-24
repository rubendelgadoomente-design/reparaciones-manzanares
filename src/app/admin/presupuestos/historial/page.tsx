'use client';
import React, { useEffect, useState } from 'react';

type Registro = {
  id: string;
  tipo: 'importar_word' | 'generar_pdf';
  data: any;
  ip: string;
  ciudad: string;
  user_agent: string;
  created_at: string;
};

const euros = (n: number) => (Number(n) || 0).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' });

function dispositivo(ua: string) {
  if (/iPhone/i.test(ua)) return 'iPhone';
  if (/iPad/i.test(ua)) return 'iPad';
  if (/Android/i.test(ua)) return 'Android';
  if (/Macintosh/i.test(ua)) return 'Mac';
  if (/Windows/i.test(ua)) return 'Windows';
  return 'Otro';
}

export default function HistorialPresupuestos() {
  const [pin, setPin] = useState('');
  const [registros, setRegistros] = useState<Registro[] | null>(null);
  const [error, setError] = useState('');
  const [abierto, setAbierto] = useState<string | null>(null);

  const cargar = async (p: string) => {
    setError('');
    const res = await fetch('/api/presupuestos', { headers: { 'x-crm-pin': p } });
    if (!res.ok) {
      sessionStorage.removeItem('crm_pin');
      setError(res.status === 401 ? 'PIN incorrecto' : 'No se pudo cargar el historial');
      return;
    }
    sessionStorage.setItem('crm_pin', p);
    setRegistros(await res.json());
  };

  useEffect(() => {
    const guardado = sessionStorage.getItem('crm_pin');
    if (guardado) cargar(guardado);
  }, []);

  if (!registros) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f1f5f9', padding: 16 }}>
        <form onSubmit={e => { e.preventDefault(); cargar(pin); }} style={{ background: 'white', padding: 32, borderRadius: 12, width: '100%', maxWidth: 360, boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
          <h2 style={{ marginTop: 0 }}>Historial de presupuestos</h2>
          <input type="password" value={pin} onChange={e => setPin(e.target.value)} placeholder="PIN del CRM" autoFocus
            style={{ width: '100%', padding: 12, fontSize: 18, textAlign: 'center', border: '1px solid #e2e8f0', borderRadius: 8, boxSizing: 'border-box' }} />
          {error && <p style={{ color: '#dc2626' }}>{error}</p>}
          <button type="submit" style={{ width: '100%', marginTop: 12, padding: 12, border: 'none', borderRadius: 8, background: '#2563eb', color: 'white', fontWeight: 700 }}>Entrar</button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ background: '#f1f5f9', minHeight: '100vh', padding: '24px 16px', fontFamily: 'system-ui, sans-serif' }}>
      <style dangerouslySetInnerHTML={{ __html: 'nav, footer, .mobile-sticky-bar { display: none !important; }' }} />
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <h1 style={{ margin: '0 0 4px' }}>Historial de presupuestos</h1>
        <p style={{ color: '#64748b', marginTop: 0 }}>Cada Word importado y cada PDF generado con la herramienta de presupuestos.</p>
        {registros.length === 0 && <p>Todavía no hay nada registrado.</p>}
        {registros.map(r => {
          const esPdf = r.tipo === 'generar_pdf';
          const titulo = esPdf ? (r.data?.cliente?.nombre || 'Sin nombre de cliente') : (r.data?.archivo || 'Word sin nombre');
          return (
            <div key={r.id} style={{ background: 'white', borderRadius: 10, padding: 16, marginBottom: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
              <div onClick={() => setAbierto(abierto === r.id ? null : r.id)} style={{ cursor: 'pointer', display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 99, background: esPdf ? '#dcfce7' : '#e0e7ff', color: esPdf ? '#166534' : '#3730a3' }}>
                    {esPdf ? 'PDF generado' : 'Word importado'}
                  </span>
                  <strong style={{ marginLeft: 8 }}>{titulo}</strong>
                  {esPdf && <span style={{ marginLeft: 8, color: '#475569' }}>{euros(r.data?.subtotal)} + IVA</span>}
                </div>
                <div style={{ color: '#64748b', fontSize: 13 }}>
                  {new Date(r.created_at).toLocaleString('es-ES')} · {dispositivo(r.user_agent)} · {r.ciudad || 'ciudad ?'} · {r.ip}
                </div>
              </div>
              {abierto === r.id && (
                <div style={{ marginTop: 12, borderTop: '1px solid #f1f5f9', paddingTop: 12, fontSize: 14 }}>
                  {esPdf ? (
                    <>
                      <p style={{ margin: '0 0 8px' }}><strong>Emisor:</strong> {r.data?.emisor?.nombre} · {r.data?.emisor?.telefono} · {r.data?.emisor?.web} {r.data?.emisor?.nif && `· NIF ${r.data.emisor.nif}`}</p>
                      <p style={{ margin: '0 0 8px' }}><strong>Cliente:</strong> {r.data?.cliente?.nombre} · {r.data?.cliente?.localidad} · {r.data?.cliente?.fecha}</p>
                      {(r.data?.partidas || []).map((p: any, i: number) => (
                        <div key={i} style={{ display: 'flex', gap: 12, justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px dashed #e2e8f0' }}>
                          <span style={{ whiteSpace: 'pre-wrap' }}>{p.descripcion}</span>
                          <strong style={{ whiteSpace: 'nowrap' }}>{euros(p.precio)}</strong>
                        </div>
                      ))}
                      <p style={{ textAlign: 'right' }}>Base {euros(r.data?.subtotal)} · IVA {euros(r.data?.iva)} · <strong>Total {euros(r.data?.total)}</strong></p>
                      <pre style={{ whiteSpace: 'pre-wrap', color: '#475569', fontFamily: 'inherit' }}>{r.data?.notas}</pre>
                    </>
                  ) : (
                    <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', margin: 0 }}>{r.data?.texto}</pre>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
