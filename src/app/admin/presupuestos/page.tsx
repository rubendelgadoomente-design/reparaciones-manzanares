'use client';
import React, { useState } from 'react';

export default function PresupuestosPage() {
  const [cliente, setCliente] = useState({
    nombre: '',
    localidad: '',
    fecha: new Date().toLocaleDateString('es-ES')
  });

  const [partidas, setPartidas] = useState([
    { descripcion: '', precio: 0 }
  ]);

  const [notas, setNotas] = useState(
`CONDICIONES DEL PRESUPUESTO:
- No está incluido ningún material para la ejecución de la obra salvo lo especificado en las partidas.
- Forma de pago: 50% a la aceptación del presupuesto (para provisión de materiales), 50% a la finalización de los trabajos.
- Validez de este presupuesto: 30 días.`
  );

  const agregarPartida = () => setPartidas([...partidas, { descripcion: '', precio: 0 }]);
  const actualizarPartida = (index: number, campo: string, valor: string | number) => {
    const nuevasPartidas = [...partidas];
    nuevasPartidas[index] = { ...nuevasPartidas[index], [campo]: valor };
    setPartidas(nuevasPartidas);
  };
  const eliminarPartida = (index: number) => {
    setPartidas(partidas.filter((_, i) => i !== index));
  };

  const handlePrint = () => window.print();

  const subtotal = partidas.reduce((acc, part) => acc + (Number(part.precio) || 0), 0);
  const iva = subtotal * 0.21;
  const total = subtotal + iva;

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        /* HIDE GLOBAL ELEMENTS */
        nav, footer, .mobile-sticky-bar { display: none !important; }
        body { background-color: #f1f5f9; margin: 0; padding: 0 !important; overflow: hidden; font-family: 'Inter', system-ui, sans-serif; }
        
        * { box-sizing: border-box; }

        .app-container {
          display: flex;
          height: 100vh;
          width: 100vw;
        }

        .control-panel {
          width: 480px;
          background: white;
          box-shadow: 4px 0 15px rgba(0,0,0,0.05);
          z-index: 10;
          display: flex;
          flex-direction: column;
          height: 100vh;
        }

        .control-scroll {
          padding: 32px;
          overflow-y: auto;
          flex: 1;
          padding-bottom: 100px;
        }

        .header-title { font-size: 26px; font-weight: 900; color: #0f172a; margin: 0; letter-spacing: -0.5px; }
        .header-subtitle { font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 1px; margin: 4px 0 32px 0; }
        
        .section-box {
          background: #f8fafc;
          border: 1px solid #f1f5f9;
          border-radius: 12px;
          padding: 24px;
          margin-bottom: 24px;
        }
        
        .section-title {
          font-size: 11px;
          font-weight: 800;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 16px;
        }

        .form-group { margin-bottom: 16px; }
        .form-label { display: block; font-size: 12px; font-weight: 600; color: #475569; margin-bottom: 6px; }
        .form-input { 
          width: 100%; padding: 12px 16px; border: 1px solid #e2e8f0; border-radius: 8px; 
          font-size: 14px; outline: none; transition: border 0.2s; font-family: inherit;
        }
        .form-input:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,0.1); }
        
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

        .partida-item {
          display: flex; gap: 12px; background: white; padding: 16px; border-radius: 10px;
          border: 1px solid #e2e8f0; margin-bottom: 12px; position: relative;
        }
        .partida-desc { flex: 1; resize: none; border: none; outline: none; font-size: 14px; font-family: inherit; color: #334155; }
        .partida-price { width: 100px; text-align: right; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 10px; font-weight: bold; font-family: inherit; font-size: 14px; }
        .btn-delete {
          position: absolute; top: -10px; right: -10px; background: white; border: 1px solid #fca5a5; 
          color: #ef4444; width: 26px; height: 26px; border-radius: 50%; cursor: pointer;
          font-weight: bold; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
        .btn-delete:hover { background: #ef4444; color: white; border-color: #ef4444; }
        
        .btn-add {
          width: 100%; padding: 14px; background: white; border: 2px dashed #cbd5e1; color: #64748b;
          font-weight: 600; border-radius: 10px; cursor: pointer; transition: all 0.2s; font-size: 14px;
        }
        .btn-add:hover { border-color: #3b82f6; color: #3b82f6; background: #eff6ff; }

        .print-btn-container {
          position: absolute; bottom: 0; left: 0; width: 480px; background: white; padding: 20px;
          border-top: 1px solid #f1f5f9; z-index: 20; box-shadow: 0 -4px 15px rgba(0,0,0,0.02);
        }
        .btn-print {
          width: 100%; background: #2563eb; color: white; padding: 16px; font-size: 16px; font-weight: bold;
          border: none; border-radius: 10px; cursor: pointer; box-shadow: 0 4px 12px rgba(37,99,235,0.2); transition: all 0.2s;
        }
        .btn-print:hover { background: #1d4ed8; transform: translateY(-1px); box-shadow: 0 6px 16px rgba(37,99,235,0.3); }
        .btn-print:active { transform: translateY(1px); }

        .preview-panel {
          flex: 1;
          background-color: #e2e8f0;
          background-image: radial-gradient(#cbd5e1 1px, transparent 1px);
          background-size: 20px 20px;
          overflow-y: auto;
          display: flex;
          justify-content: center;
          padding: 40px;
        }

        .a4-page {
          background: white;
          width: 210mm;
          min-height: 297mm;
          padding: 20mm;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          transform-origin: top;
        }

        .doc-header { display: flex; justify-content: space-between; border-bottom: 4px solid #0f172a; padding-bottom: 24px; margin-bottom: 32px; }
        .doc-title { font-size: 32px; font-weight: 900; color: #0f172a; margin: 0; text-transform: uppercase; letter-spacing: -1px; }
        .doc-subtitle { font-size: 11px; font-weight: 700; color: #64748b; letter-spacing: 1px; text-transform: uppercase; margin-top: 4px; }
        .doc-info { margin-top: 24px; font-size: 13px; color: #475569; line-height: 1.6; }
        .doc-info strong { color: #1e293b; }
        
        .client-box { background: #f8fafc; border: 1px solid #e2e8f0; padding: 20px; border-radius: 8px; min-width: 280px; text-align: left; }
        .client-box-title { font-size: 10px; font-weight: bold; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 12px 0; }
        .client-name { font-size: 16px; font-weight: bold; color: #1e293b; text-transform: uppercase; margin: 0 0 4px 0; }
        .client-loc { font-size: 14px; color: #475569; margin: 0; }
        .client-date { margin-top: 16px; padding-top: 16px; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; font-size: 13px; }

        .items-table { width: 100%; border-collapse: collapse; margin-bottom: 40px; }
        .items-table th { padding: 12px 8px; font-size: 11px; font-weight: bold; color: #64748b; text-transform: uppercase; border-bottom: 2px solid #0f172a; text-align: left; }
        .items-table td { padding: 16px 8px; font-size: 14px; color: #334155; border-bottom: 1px solid #f1f5f9; line-height: 1.5; white-space: pre-wrap; }
        
        .totals-box { width: 280px; margin-left: auto; }
        .total-row { display: flex; justify-content: space-between; padding: 10px 0; font-size: 14px; color: #475569; border-bottom: 1px solid #f1f5f9; }
        .total-final { display: flex; justify-content: space-between; padding-top: 16px; margin-top: 4px; font-size: 20px; font-weight: 900; color: #0f172a; border-top: 2px solid #0f172a; }

        .doc-notes { margin-top: 48px; font-size: 11px; color: #64748b; white-space: pre-wrap; line-height: 1.6; max-width: 80%; }
        
        /* RESPONSIVE */
        @media (max-width: 1024px) {
          .app-container { flex-direction: column; overflow: auto; }
          .control-panel { width: 100%; height: auto; display: block; position: relative; }
          .print-btn-container { position: sticky; bottom: 0; width: 100%; }
          .preview-panel { display: none; /* Hide preview on mobile to save space */ }
        }

        /* PRINT STYLES */
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; overflow: auto !important; }
          .print-area { display: block !important; }
        }
      `}} />

      {/* VISTA EN PANTALLA */}
      <div className="app-container no-print">
        
        {/* PANEL IZQUIERDO */}
        <div className="control-panel">
          <div className="control-scroll">
            <h1 className="header-title">Generador PDF</h1>
            <p className="header-subtitle">Reparaciones Manzanares (Uso Interno)</p>

            <div className="section-box">
              <div className="section-title">Datos del Cliente</div>
              <div className="form-group">
                <label className="form-label">Nombre o Empresa</label>
                <input type="text" className="form-input" placeholder="Ej. Juan Pérez" value={cliente.nombre} onChange={e => setCliente({...cliente, nombre: e.target.value})} />
              </div>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Localidad</label>
                  <input type="text" className="form-input" placeholder="Ej. Soto del Real" value={cliente.localidad} onChange={e => setCliente({...cliente, localidad: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Fecha</label>
                  <input type="text" className="form-input" value={cliente.fecha} onChange={e => setCliente({...cliente, fecha: e.target.value})} />
                </div>
              </div>
            </div>

            <div className="section-box">
              <div className="section-title">Partidas y Conceptos</div>
              {partidas.map((partida, index) => (
                <div key={index} className="partida-item">
                  <textarea 
                    className="partida-desc" rows={2} placeholder="Descripción del trabajo..." 
                    value={partida.descripcion} onChange={e => actualizarPartida(index, 'descripcion', e.target.value)} 
                  />
                  <div>
                    <input 
                      type="number" className="partida-price" placeholder="0" 
                      value={partida.precio || ''} onChange={e => actualizarPartida(index, 'precio', parseFloat(e.target.value) || 0)} 
                    />
                  </div>
                  <div className="btn-delete" onClick={() => eliminarPartida(index)}>×</div>
                </div>
              ))}
              <button className="btn-add" onClick={agregarPartida}>+ Añadir Concepto</button>
            </div>

            <div className="section-box">
              <div className="section-title">Condiciones y Notas</div>
              <textarea 
                className="form-input" rows={5} style={{resize: 'vertical'}}
                value={notas} onChange={e => setNotas(e.target.value)} 
              />
            </div>
          </div>
          
          <div className="print-btn-container">
            <button className="btn-print" onClick={handlePrint}>Generar Presupuesto PDF</button>
          </div>
        </div>

        {/* PANEL DERECHO (PREVIEW) */}
        <div className="preview-panel">
          <div className="a4-page" style={{ position: 'relative' }}>
            <div className="doc-header">
              <div>
                <h1 className="doc-title">Reparaciones <span style={{color:'#f97316'}}>Manzanares</span></h1>
                <p className="doc-subtitle">Mantenimiento y Reformas Integrales</p>
                <div className="doc-info">
                  <p><strong>NIF:</strong> Y0000000X</p>
                  <p>Manzanares el Real (Madrid)</p>
                  <p><strong>Tel:</strong> 919 93 09 63</p>
                  <p style={{color:'#2563eb'}}>www.reparacionesmanzanares.es</p>
                </div>
              </div>
              <div style={{textAlign:'right'}}>
                <h2 style={{fontSize:'32px', fontWeight:300, color:'#cbd5e1', textTransform:'uppercase', letterSpacing:'2px', margin:'0 0 16px 0'}}>Presupuesto</h2>
                <div className="client-box">
                  <p className="client-box-title">Datos del Cliente</p>
                  <p className="client-name">{cliente.nombre || 'Nombre del Cliente'}</p>
                  <p className="client-loc">{cliente.localidad || 'Localidad'}</p>
                  <div className="client-date">
                    <span style={{color:'#64748b'}}>Fecha:</span>
                    <span style={{fontWeight:'bold', color:'#1e293b'}}>{cliente.fecha}</span>
                  </div>
                </div>
              </div>
            </div>

            <table className="items-table">
              <thead>
                <tr>
                  <th style={{width:'80%'}}>Concepto</th>
                  <th style={{width:'20%', textAlign:'right'}}>Importe</th>
                </tr>
              </thead>
              <tbody>
                {partidas.map((partida, index) => (
                  <tr key={index}>
                    <td>{partida.descripcion || <span style={{color:'#cbd5e1', fontStyle:'italic'}}>Nueva partida...</span>}</td>
                    <td style={{textAlign:'right', fontWeight:600}}>{partida.precio ? partida.precio.toFixed(2) : '0.00'} €</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="totals-box">
              <div className="total-row"><span>Base Imponible</span><span>{subtotal.toFixed(2)} €</span></div>
              <div className="total-row"><span>IVA (21%)</span><span>{iva.toFixed(2)} €</span></div>
              <div className="total-final"><span style={{textTransform:'uppercase'}}>Total</span><span>{total.toFixed(2)} €</span></div>
            </div>

            <div className="doc-notes">{notas}</div>
            
            <div style={{position:'absolute', bottom:'15mm', left:'15mm', right:'15mm', textAlign:'center', fontSize:'10px', color:'#94a3b8', borderTop:'1px solid #e2e8f0', paddingTop:'16px'}}>
              Documento generado por Reparaciones Manzanares. Aceptación del presupuesto sujeta a las condiciones especificadas.
            </div>
          </div>
        </div>
      </div>

      {/* VISTA PARA IMPRESIÓN REAL (Oculta en pantalla, visible al imprimir) */}
      <div className="print-area" style={{display: 'none'}}>
          <div className="a4-page" style={{boxShadow:'none', margin:0, padding:0, width:'100%', minHeight:'auto', position: 'relative'}}>
            <div className="doc-header">
              <div>
                <h1 className="doc-title">Reparaciones <span style={{color:'#f97316'}}>Manzanares</span></h1>
                <p className="doc-subtitle">Mantenimiento y Reformas Integrales</p>
                <div className="doc-info">
                  <p><strong>NIF:</strong> Y0000000X</p>
                  <p>Manzanares el Real (Madrid)</p>
                  <p><strong>Tel:</strong> 919 93 09 63</p>
                  <p style={{color:'#2563eb'}}>www.reparacionesmanzanares.es</p>
                </div>
              </div>
              <div style={{textAlign:'right'}}>
                <h2 style={{fontSize:'32px', fontWeight:300, color:'#cbd5e1', textTransform:'uppercase', letterSpacing:'2px', margin:'0 0 16px 0'}}>Presupuesto</h2>
                <div className="client-box">
                  <p className="client-box-title">Datos del Cliente</p>
                  <p className="client-name">{cliente.nombre || 'Nombre del Cliente'}</p>
                  <p className="client-loc">{cliente.localidad || 'Localidad'}</p>
                  <div className="client-date">
                    <span style={{color:'#64748b'}}>Fecha:</span>
                    <span style={{fontWeight:'bold', color:'#1e293b'}}>{cliente.fecha}</span>
                  </div>
                </div>
              </div>
            </div>

            <table className="items-table">
              <thead>
                <tr>
                  <th style={{width:'80%'}}>Concepto</th>
                  <th style={{width:'20%', textAlign:'right'}}>Importe</th>
                </tr>
              </thead>
              <tbody>
                {partidas.map((partida, index) => (
                  <tr key={index}>
                    <td>{partida.descripcion}</td>
                    <td style={{textAlign:'right', fontWeight:600}}>{partida.precio ? partida.precio.toFixed(2) : '0.00'} €</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="totals-box">
              <div className="total-row"><span>Base Imponible</span><span>{subtotal.toFixed(2)} €</span></div>
              <div className="total-row"><span>IVA (21%)</span><span>{iva.toFixed(2)} €</span></div>
              <div className="total-final"><span style={{textTransform:'uppercase'}}>Total</span><span>{total.toFixed(2)} €</span></div>
            </div>

            <div className="doc-notes">{notas}</div>
          </div>
      </div>
    </>
  );
}
