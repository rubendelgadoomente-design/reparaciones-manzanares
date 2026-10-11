"use client";
import React, { useState } from 'react';

type Lead = {
  id: string;
  fecha: string;
  cliente: string;
  localidad: string;
  servicio: string;
  origen: string;
  partner: string;
  facturado: number;
  comision: number;
  estado: string;
};

const LOCALIDADES = [
  "Manzanares el Real", "Soto del Real", "Cerceda", "Becerril de la Sierra", 
  "El Boalo", "Mataelpino", "Moralzarzal", "Colmenar Viejo", 
  "Miraflores de la Sierra", "Guadalix de la Sierra", "Navacerrada", 
  "Tres Cantos", "Cercedilla", "Guadarrama", "Madrid", "Los Molinos", "Otro"
];

const SERVICIOS = [
  "Cerrajería", "Fontanería", "Electricidad", "Pintura", 
  "Calderas", "Manitas", "Persianas", "Aire Acondicionado", 
  "Reforma integral", "Reforma parcial", "Radón"
];

const PARTNERS = ["Toño", "Javi (Fontanero)", "Paco (Pintor)", "Por asignar"];

const ESTADOS = ["Nuevo", "Presupuestado", "Aceptado", "Finalizado", "Cancelado"];

export default function CRMDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  
  // Filtros
  const [filtrosServicios, setFiltrosServicios] = useState<string[]>([]);
  const [filtroPartner, setFiltroPartner] = useState<string>('');
  const [filtroLocalidad, setFiltroLocalidad] = useState<string>('');
  const [filtroEstado, setFiltroEstado] = useState<string>('');
  
  // Modal de Informe
  const [mostrarInforme, setMostrarInforme] = useState(false);

  const [nuevoLead, setNuevoLead] = useState<Partial<Lead>>({
    fecha: new Date().toISOString().split('T')[0],
    cliente: '',
    localidad: 'Manzanares el Real',
    servicio: 'Fontanería',
    origen: 'Web',
    partner: 'Por asignar',
    facturado: 0,
    estado: 'Nuevo'
  });

  const calcularComision = (servicio: string, facturado: number, origen: string) => {
    const s = servicio.toLowerCase();
    if (s.includes('fontaner') || s.includes('pintura') || s.includes('electricidad') || s.includes('caldera') || s.includes('manita') || s.includes('persiana') || s.includes('aire')) {
      return 15;
    }
    if (s.includes('cerrajer')) return 30;
    if (s.includes('reforma')) {
      if (origen.toLowerCase().includes('toño')) return facturado * 0.02;
      return facturado * 0.05;
    }
    return 0;
  };

  const agregarLead = (e: React.FormEvent) => {
    e.preventDefault();
    const comisionCalculada = calcularComision(nuevoLead.servicio!, Number(nuevoLead.facturado), nuevoLead.origen!);
    const leadCompleto: Lead = {
      id: Math.random().toString(36).substr(2, 9),
      fecha: nuevoLead.fecha!,
      cliente: nuevoLead.cliente!,
      localidad: nuevoLead.localidad!,
      servicio: nuevoLead.servicio!,
      origen: nuevoLead.origen!,
      partner: nuevoLead.partner!,
      facturado: Number(nuevoLead.facturado),
      comision: comisionCalculada,
      estado: nuevoLead.estado!
    };
    setLeads([...leads, leadCompleto]);
    setNuevoLead({ ...nuevoLead, cliente: '', facturado: 0 });
  };

  const toggleServicio = (s: string) => {
    if (filtrosServicios.includes(s)) {
      setFiltrosServicios(filtrosServicios.filter(x => x !== s));
    } else {
      setFiltrosServicios([...filtrosServicios, s]);
    }
  };

  const leadsFiltrados = leads.filter(l => {
    const matchServicio = filtrosServicios.length === 0 || filtrosServicios.includes(l.servicio);
    return matchServicio &&
           (filtroPartner === '' || l.partner === filtroPartner) &&
           (filtroLocalidad === '' || l.localidad === filtroLocalidad) &&
           (filtroEstado === '' || l.estado === filtroEstado);
  });

  const totalComisiones = leadsFiltrados.reduce((acc, l) => acc + l.comision, 0);
  const totalFacturado = leadsFiltrados.reduce((acc, l) => acc + l.facturado, 0);
  const totalTrabajos = leadsFiltrados.length;
  const trabajosFinalizados = leadsFiltrados.filter(l => l.estado === 'Finalizado').length;

  // Separación para el informe
  const leadsFijos = leadsFiltrados.filter(l => !l.servicio.toLowerCase().includes('reforma'));
  const leadsPorcentaje = leadsFiltrados.filter(l => l.servicio.toLowerCase().includes('reforma'));
  const subtotalFijas = leadsFijos.reduce((acc, l) => acc + l.comision, 0);
  const subtotalPorcentaje = leadsPorcentaje.reduce((acc, l) => acc + l.comision, 0);

  return (
    <div style={{ backgroundColor: '#0f172a', color: '#f8fafc', minHeight: '100vh', padding: '20px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <style>{`
        .crm-wrapper { max-width: 1400px; margin: 0 auto; }
        
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 25px; }
        .stat-card { background: #1e293b; padding: 20px; border-radius: 10px; border: 1px solid #334155; border-left: 4px solid #3b82f6; }
        .stat-card.green { border-left-color: #10b981; }
        .stat-title { color: #94a3b8; font-size: 0.85rem; text-transform: uppercase; font-weight: 600; margin-bottom: 5px; }
        .stat-value { font-size: 1.8rem; font-weight: bold; margin: 0; color: #fff; }

        .section-box { background: #1e293b; padding: 20px; border-radius: 10px; border: 1px solid #334155; margin-bottom: 25px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .section-title { font-size: 1.1rem; font-weight: 600; color: #e2e8f0; margin-top: 0; margin-bottom: 15px; display: flex; align-items: center; justify-content: space-between; }
        
        .filter-grid { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 15px; }
        .input-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; }
        .input-field { background: #0f172a; color: #f8fafc; border: 1px solid #475569; padding: 10px; border-radius: 6px; width: 100%; box-sizing: border-box; font-size: 0.9rem; }
        .input-field:focus { outline: none; border-color: #3b82f6; }
        
        /* Multi-select Chips */
        .chip-container { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 15px; background: #0f172a; padding: 10px; border-radius: 6px; border: 1px solid #334155; }
        .chip { padding: 6px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 600; cursor: pointer; transition: all 0.2s; border: 1px solid #475569; background: #1e293b; color: #94a3b8; }
        .chip.active { background: #3b82f6; color: #fff; border-color: #2563eb; }

        .btn { background: #3b82f6; color: white; border: none; padding: 10px 15px; border-radius: 6px; cursor: pointer; font-weight: 600; transition: all 0.2s; }
        .btn:hover { background: #2563eb; }
        .btn-green { background: #10b981; }
        .btn-green:hover { background: #059669; }

        .table-responsive { overflow-x: auto; border-radius: 8px; border: 1px solid #334155; }
        .crm-table { width: 100%; border-collapse: collapse; text-align: left; }
        .crm-table th { background: #0f172a; color: #94a3b8; padding: 12px 15px; font-size: 0.8rem; text-transform: uppercase; border-bottom: 1px solid #334155; }
        .crm-table td { padding: 12px 15px; border-bottom: 1px solid #334155; font-size: 0.9rem; }
        .crm-table tr:hover { background: #334155; }
        
        .badge { padding: 4px 8px; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; }
        .badge-blue { background: rgba(59, 130, 246, 0.2); color: #60a5fa; }
        .badge-gray { background: rgba(148, 163, 184, 0.2); color: #cbd5e1; }
        
        /* Modal Informe */
        .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); display: flex; justify-content: center; align-items: center; z-index: 1000; padding: 20px; box-sizing: border-box; }
        .modal-content { background: #161b22; width: 100%; max-width: 800px; max-height: 90vh; overflow-y: auto; border-radius: 12px; padding: 30px; border: 1px solid #30363d; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5); }
        .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid #30363d; padding-bottom: 15px; }
        .modal-header h2 { margin: 0; color: #fff; font-size: 1.5rem; }
        .modal-close { background: none; border: none; color: #8b949e; font-size: 1.5rem; cursor: pointer; }
        .modal-close:hover { color: #fff; }
        
        .report-section { margin-bottom: 30px; }
        .report-section h3 { color: #58a6ff; font-size: 1.1rem; border-bottom: 1px solid #30363d; padding-bottom: 8px; margin-bottom: 15px; }
        .report-table { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
        .report-table th, .report-table td { padding: 10px 5px; text-align: left; border-bottom: 1px solid #30363d; font-size: 0.9rem; color: #c9d1d9; }
        .report-table th { color: #8b949e; text-transform: uppercase; font-size: 0.75rem; }
        .report-total { text-align: right; font-size: 1.1rem; font-weight: bold; color: #fff; padding-top: 10px; }

        @media print {
          body * { visibility: hidden; }
          .modal-overlay { position: absolute; left: 0; top: 0; width: 100%; background: white; padding: 0; }
          .modal-content, .modal-content * { visibility: visible; }
          .modal-content { max-height: none; box-shadow: none; border: none; background: white; color: black; }
          .modal-header h2 { color: black; }
          .report-section h3 { color: #0366d6; border-bottom-color: #ddd; }
          .report-table th, .report-table td { color: black; border-bottom-color: #ddd; }
          .report-total { color: black; }
          .btn, .modal-close { display: none; }
        }
      `}</style>

      {/* MODAL INFORME */}
      {mostrarInforme && (
        <div className="modal-overlay" onClick={() => setMostrarInforme(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Liquidación de Comisiones</h2>
              <div>
                <button onClick={() => window.print()} className="btn btn-green" style={{ marginRight: '10px' }}>Imprimir Informe</button>
                <button onClick={() => setMostrarInforme(false)} className="modal-close">×</button>
              </div>
            </div>
            
            {/* Informe Fijas */}
            <div className="report-section">
              <h3>1. Comisiones Fijas (15€, 25€, 30€)</h3>
              <table className="report-table">
                <thead><tr><th>Fecha</th><th>Cliente/Localidad</th><th>Servicio</th><th style={{textAlign:'right'}}>Comisión</th></tr></thead>
                <tbody>
                  {leadsFijos.map(l => (
                    <tr key={l.id}><td>{l.fecha}</td><td>{l.cliente} ({l.localidad})</td><td>{l.servicio}</td><td style={{textAlign:'right', fontWeight:'bold'}}>{l.comision.toFixed(2)} €</td></tr>
                  ))}
                  {leadsFijos.length === 0 && <tr><td colSpan={4} style={{textAlign:'center'}}>No hay comisiones fijas en esta selección.</td></tr>}
                </tbody>
              </table>
              <div className="report-total">Subtotal Fijas: {subtotalFijas.toFixed(2)} €</div>
            </div>

            {/* Informe Porcentaje */}
            <div className="report-section">
              <h3>2. Comisiones a Porcentaje (5%, 2%)</h3>
              <table className="report-table">
                <thead><tr><th>Fecha</th><th>Cliente/Localidad</th><th>Servicio (Origen)</th><th>Base</th><th style={{textAlign:'right'}}>Comisión</th></tr></thead>
                <tbody>
                  {leadsPorcentaje.map(l => (
                    <tr key={l.id}><td>{l.fecha}</td><td>{l.cliente} ({l.localidad})</td><td>{l.servicio} ({l.origen})</td><td>{l.facturado} €</td><td style={{textAlign:'right', fontWeight:'bold'}}>{l.comision.toFixed(2)} €</td></tr>
                  ))}
                  {leadsPorcentaje.length === 0 && <tr><td colSpan={5} style={{textAlign:'center'}}>No hay comisiones a porcentaje en esta selección.</td></tr>}
                </tbody>
              </table>
              <div className="report-total">Subtotal Porcentaje: {subtotalPorcentaje.toFixed(2)} €</div>
            </div>

            <div style={{ borderTop: '2px solid #30363d', marginTop: '20px', paddingTop: '20px', textAlign: 'right' }}>
              <h2 style={{ margin: 0, fontSize: '1.2rem', color: '#8b949e' }}>Total Liquidación Mes</h2>
              <h1 style={{ margin: 0, fontSize: '2.5rem', color: '#fff' }}>{totalComisiones.toFixed(2)} €</h1>
            </div>
          </div>
        </div>
      )}

      <div className="crm-wrapper">
        <div style={{ marginBottom: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '2rem', color: '#fff' }}>Gestor de Contactos</h1>
            <p style={{ margin: '5px 0 0 0', color: '#94a3b8' }}>Reparaciones Manzanares</p>
          </div>
          <button onClick={() => setMostrarInforme(true)} className="btn btn-green">
            📄 Generar Informe (Imprimir)
          </button>
        </div>

        {/* DASHBOARD */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-title">Total Contactos (Filtro)</div>
            <p className="stat-value">{totalTrabajos}</p>
          </div>
          <div className="stat-card green">
            <div className="stat-title">Total Comisiones</div>
            <p className="stat-value">{totalComisiones.toFixed(2)} €</p>
          </div>
        </div>

        {/* FILTROS */}
        <div className="section-box">
          <h2 className="section-title">Filtros (Selección múltiple de servicios)</h2>
          
          <div className="chip-container">
            <span style={{color: '#94a3b8', fontSize: '0.85rem', alignSelf: 'center', marginRight: '10px'}}>Oficios:</span>
            {SERVICIOS.map(s => (
              <div key={s} onClick={() => toggleServicio(s)} className={`chip ${filtrosServicios.includes(s) ? 'active' : ''}`}>
                {s}
              </div>
            ))}
            {filtrosServicios.length > 0 && (
              <div onClick={() => setFiltrosServicios([])} className="chip" style={{background:'rgba(239, 68, 68, 0.2)', color: '#f87171', borderColor: 'transparent'}}>
                ✕ Borrar oficios
              </div>
            )}
          </div>

          <div className="filter-grid">
            <select className="input-field" style={{maxWidth:'200px'}} value={filtroLocalidad} onChange={(e) => setFiltroLocalidad(e.target.value)}>
              <option value="">📍 Todas las Localidades</option>
              {LOCALIDADES.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
            <select className="input-field" style={{maxWidth:'200px'}} value={filtroPartner} onChange={(e) => setFiltroPartner(e.target.value)}>
              <option value="">👤 Todos los Partners</option>
              {PARTNERS.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            <select className="input-field" style={{maxWidth:'200px'}} value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)}>
              <option value="">📊 Todos los Estados</option>
              {ESTADOS.map(e => <option key={e} value={e}>{e}</option>)}
            </select>
          </div>
        </div>

        {/* NUEVO CONTACTO */}
        <div className="section-box">
          <h2 className="section-title">+ Añadir Nuevo Trabajo</h2>
          <form onSubmit={agregarLead} className="input-grid">
            <input type="date" required className="input-field" value={nuevoLead.fecha} onChange={e => setNuevoLead({...nuevoLead, fecha: e.target.value})} />
            <input type="text" placeholder="Nombre del Cliente" required className="input-field" value={nuevoLead.cliente} onChange={e => setNuevoLead({...nuevoLead, cliente: e.target.value})} />
            <select className="input-field" value={nuevoLead.localidad} onChange={e => setNuevoLead({...nuevoLead, localidad: e.target.value})}>
              {LOCALIDADES.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
            <select className="input-field" value={nuevoLead.servicio} onChange={e => setNuevoLead({...nuevoLead, servicio: e.target.value})}>
              {SERVICIOS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <select className="input-field" value={nuevoLead.origen} onChange={e => setNuevoLead({...nuevoLead, origen: e.target.value})}>
              <option value="Web">Llamada Web</option>
              <option value="Maps">Google Maps</option>
              <option value="Toño">Recomendación Toño</option>
              <option value="Otro">Otro</option>
            </select>
            <select className="input-field" value={nuevoLead.partner} onChange={e => setNuevoLead({...nuevoLead, partner: e.target.value})}>
              {PARTNERS.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            <input type="number" step="0.01" placeholder="Importe Facturado (€)" required className="input-field" value={nuevoLead.facturado || ''} onChange={e => setNuevoLead({...nuevoLead, facturado: Number(e.target.value)})} />
            <select className="input-field" value={nuevoLead.estado} onChange={e => setNuevoLead({...nuevoLead, estado: e.target.value})}>
              {ESTADOS.map(e => <option key={e} value={e}>{e}</option>)}
            </select>
            <button type="submit" className="btn">Guardar</button>
          </form>
        </div>

        {/* TABLA CONTACTOS */}
        <div className="section-box" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="table-responsive">
            <table className="crm-table">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Cliente</th>
                  <th>Localidad</th>
                  <th>Servicio</th>
                  <th>Partner</th>
                  <th>Facturado</th>
                  <th>Comisión</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {leadsFiltrados.length === 0 ? (
                  <tr>
                    <td colSpan={8} style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>No hay contactos.</td>
                  </tr>
                ) : (
                  leadsFiltrados.map((l) => (
                    <tr key={l.id}>
                      <td style={{ color: '#cbd5e1' }}>{l.fecha}</td>
                      <td style={{ fontWeight: 'bold', color: '#fff' }}>{l.cliente}</td>
                      <td><span className="badge badge-gray">{l.localidad}</span></td>
                      <td><span className="badge badge-blue">{l.servicio}</span></td>
                      <td style={{ color: '#94a3b8' }}>{l.partner}</td>
                      <td>{l.facturado} €</td>
                      <td style={{ color: '#10b981', fontWeight: 'bold' }}>{l.comision.toFixed(2)} €</td>
                      <td><span className={`badge estado-${l.estado}`}>{l.estado}</span></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
