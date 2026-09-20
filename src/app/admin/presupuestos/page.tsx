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
        /* Ocultar elementos de la web pública (nav, footer y botonera flotante de móvil) */
        nav, footer, .mobile-sticky-bar { display: none !important; }
        
        /* Asegurar que el fondo del body sea limpio */
        body { background-color: #f1f5f9; padding: 0 !important; margin: 0 !important; overflow: hidden; }
        
        /* Ajustes específicos para cuando se imprima en papel/PDF */
        @media print {
          @page { size: A4; margin: 0; }
          body { overflow: auto; background-color: white; }
          .no-print { display: none !important; }
          .print-area { 
            box-shadow: none !important; 
            margin: 0 !important; 
            padding: 20mm !important;
            width: 100% !important;
            max-width: none !important;
          }
        }
      `}} />

      {/* Contenedor principal tipo App (Pantalla dividida) */}
      <div className="flex flex-col lg:flex-row h-screen w-full no-print">
        
        {/* PANEL DE CONTROL (Izquierda) */}
        <div className="w-full lg:w-[480px] h-[50vh] lg:h-full overflow-y-auto bg-white border-b lg:border-b-0 lg:border-r border-slate-200 p-6 flex flex-col shadow-xl z-10 relative">
          <div className="flex items-center justify-between mb-8">
            <div>
                <h1 className="text-2xl font-black text-slate-800 tracking-tight leading-none">Generador PDF</h1>
                <p className="text-slate-400 text-xs mt-1 font-semibold uppercase tracking-wider">Reparaciones Manzanares</p>
            </div>
            <div className="bg-orange-100 text-orange-800 text-[10px] font-bold px-2 py-1 rounded-full border border-orange-200 uppercase tracking-widest">Interno</div>
          </div>

          <div className="space-y-6 pb-20">
            {/* Sección Datos Cliente */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 shadow-sm">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                Datos del Cliente
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5 ml-1">Nombre o Empresa</label>
                  <input type="text" className="w-full bg-white border border-slate-200 px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all shadow-sm" placeholder="Ej. Juan Pérez" value={cliente.nombre} onChange={e => setCliente({...cliente, nombre: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5 ml-1">Localidad</label>
                    <input type="text" className="w-full bg-white border border-slate-200 px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all shadow-sm" placeholder="Ej. Soto del Real" value={cliente.localidad} onChange={e => setCliente({...cliente, localidad: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5 ml-1">Fecha</label>
                    <input type="text" className="w-full bg-white border border-slate-200 px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all shadow-sm" value={cliente.fecha} onChange={e => setCliente({...cliente, fecha: e.target.value})} />
                  </div>
                </div>
              </div>
            </div>

            {/* Sección Partidas */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                  Partidas y Conceptos
                </h2>
              </div>
              
              <div className="space-y-3">
                {partidas.map((partida, index) => (
                  <div key={index} className="flex gap-3 items-start bg-white p-3 rounded-xl border border-slate-200 relative group shadow-sm transition-all hover:border-slate-300">
                    <div className="flex-1">
                      <textarea 
                        className="w-full resize-none outline-none text-sm text-slate-700 bg-transparent placeholder-slate-300" 
                        rows={2}
                        value={partida.descripcion} 
                        onChange={e => actualizarPartida(index, 'descripcion', e.target.value)} 
                        placeholder="Descripción detallada del trabajo..." 
                      />
                    </div>
                    <div className="w-24 shrink-0 relative">
                      <input 
                        type="number" 
                        className="w-full bg-slate-50 border border-slate-200 pl-2 pr-6 py-2 rounded-lg text-sm text-right font-semibold outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white" 
                        value={partida.precio || ''} 
                        onChange={e => actualizarPartida(index, 'precio', parseFloat(e.target.value) || 0)} 
                        placeholder="0" 
                      />
                      <span className="absolute right-2 top-2 text-xs text-slate-400 font-bold">€</span>
                    </div>
                    <button onClick={() => eliminarPartida(index)} className="absolute -top-2.5 -right-2.5 bg-white border border-red-200 text-red-500 w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-sm hover:bg-red-500 hover:text-white hover:border-red-500 z-10" title="Eliminar concepto">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                ))}
              </div>
              
              <button onClick={agregarPartida} className="mt-4 w-full py-3 bg-white border-2 border-dashed border-slate-200 text-slate-500 font-semibold rounded-xl hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center gap-2 text-sm shadow-sm">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
                Añadir Concepto
              </button>
            </div>

            {/* Sección Condiciones */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 shadow-sm">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                Condiciones y Notas
              </h2>
              <textarea 
                className="w-full bg-white border border-slate-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs text-slate-600 transition-all shadow-sm resize-y" 
                rows={4}
                value={notas} 
                onChange={e => setNotas(e.target.value)} 
              />
            </div>
            
          </div>

          {/* Botón Imprimir (Sticky bottom en panel de control) */}
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100 p-4 z-20 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)]">
            <button onClick={handlePrint} className="w-full bg-blue-600 text-white shadow-lg shadow-blue-600/30 px-6 py-3.5 rounded-xl font-bold text-base hover:bg-blue-700 hover:shadow-blue-700/30 transition-all flex items-center justify-center gap-2 transform active:scale-[0.98]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
              Generar Presupuesto PDF
            </button>
          </div>
        </div>

        {/* VISTA PREVIA (Derecha) */}
        <div className="flex-1 h-[50vh] lg:h-full overflow-y-auto bg-slate-200 p-4 sm:p-8 flex items-start justify-center" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
          
          {/* El "Folio A4" */}
          <div className="bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded w-full max-w-[210mm] min-h-[297mm] p-[15mm] sm:p-[20mm] relative transition-all duration-300 ring-1 ring-slate-900/5 mb-10 origin-top transform sm:scale-100 scale-[0.85]">
            
            {/* Cabecera del Presupuesto */}
            <div className="flex flex-col sm:flex-row justify-between items-start border-b-4 border-slate-900 pb-6 mb-8 gap-4 sm:gap-0">
              <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">Reparaciones <span className="text-orange-500">Manzanares</span></h1>
                <p className="text-slate-400 font-bold mt-1.5 tracking-widest uppercase text-[10px]">Mantenimiento y Reformas Integrales</p>
                <div className="mt-5 text-sm text-slate-600 space-y-0.5">
                    <p className="font-semibold text-slate-800">NIF: <span className="font-normal text-slate-600">Y0000000X</span></p>
                    <p>Manzanares el Real (Madrid)</p>
                    <p>Tel: <span className="font-semibold">919 93 09 63</span></p>
                    <p className="text-blue-600">www.reparacionesmanzanares.es</p>
                </div>
              </div>
              
              <div className="text-left sm:text-right w-full sm:w-auto">
                <h2 className="text-3xl sm:text-4xl font-light text-slate-300 uppercase tracking-widest mb-3">Presupuesto</h2>
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg text-left inline-block w-full sm:min-w-[240px]">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1.5">Datos del Cliente</p>
                  <p className="font-bold text-base text-slate-800 uppercase leading-tight">{cliente.nombre || 'Nombre del Cliente'}</p>
                  <p className="text-slate-600 text-sm mt-0.5">{cliente.localidad || 'Localidad'}</p>
                  <div className="mt-3 pt-3 border-t border-slate-200 flex justify-between items-center text-sm">
                    <span className="text-slate-500 text-xs">Fecha:</span>
                    <span className="font-bold text-slate-800">{cliente.fecha}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabla de Conceptos */}
            <div className="mb-10 min-h-[350px]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-slate-900 text-slate-800">
                    <th className="py-2.5 px-2 font-bold uppercase text-[11px] tracking-wider w-4/5 text-slate-500">Concepto</th>
                    <th className="py-2.5 px-2 font-bold uppercase text-[11px] tracking-wider w-1/5 text-right text-slate-500">Importe</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {partidas.map((partida, index) => (
                    <tr key={index} className="group">
                      <td className="py-4 px-2 whitespace-pre-wrap text-slate-700 text-sm leading-relaxed">{partida.descripcion || <span className="text-slate-300 italic">Nueva partida...</span>}</td>
                      <td className="py-4 px-2 text-right font-medium text-slate-900 align-top">{partida.precio ? partida.precio.toFixed(2) : '0.00'} €</td>
                    </tr>
                  ))}
                  {partidas.length === 0 && (
                    <tr>
                        <td colSpan={2} className="py-12 text-center text-slate-300 italic text-sm">El presupuesto está vacío. Añade partidas.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Totales */}
            <div className="flex justify-end mb-12">
              <div className="w-full sm:w-64">
                <div className="flex justify-between py-2 text-sm text-slate-600 border-b border-slate-100">
                  <span className="font-medium">Base Imponible</span>
                  <span>{subtotal.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between py-2 text-sm text-slate-600 border-b border-slate-100">
                  <span className="font-medium">IVA (21%)</span>
                  <span>{iva.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between py-4 mt-1 font-black text-xl text-slate-900 border-t-2 border-slate-900">
                  <span className="uppercase">Total</span>
                  <span>{total.toFixed(2)} €</span>
                </div>
              </div>
            </div>

            {/* Condiciones Legales */}
            <div className="mt-8 text-[11px] text-slate-500 whitespace-pre-wrap leading-relaxed max-w-[80%]">
              {notas}
            </div>
            
            {/* Pie de documento estático */}
            <div className="absolute bottom-[15mm] left-[15mm] right-[15mm] pt-4 border-t border-slate-200 text-center text-[10px] text-slate-400">
              Documento generado por Reparaciones Manzanares. Aceptación del presupuesto sujeta a las condiciones especificadas.
            </div>
          </div>
          
        </div>
      </div>
      
      {/* VERSIÓN PARA IMPRESIÓN (Se inyecta y visualiza SOLO al pulsar Ctrl+P) */}
      <div className="hidden print:block print-area">
        <div className="flex justify-between items-start border-b-4 border-slate-900 pb-6 mb-8" style={{ display: 'flex', flexDirection: 'row' }}>
            <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase m-0 p-0" style={{ fontSize: '32px', lineHeight: '1' }}>Reparaciones <span style={{ color: '#f97316' }}>Manzanares</span></h1>
            <p className="text-slate-500 font-bold mt-1.5 tracking-widest uppercase text-xs" style={{ fontSize: '11px', color: '#64748b' }}>Mantenimiento y Reformas Integrales</p>
            <div className="mt-6 text-sm text-slate-600 space-y-0.5" style={{ fontSize: '13px', color: '#475569', marginTop: '24px' }}>
                <p><span style={{ fontWeight: 600, color: '#1e293b' }}>NIF:</span> Y0000000X</p>
                <p>Manzanares el Real (Madrid)</p>
                <p><span style={{ fontWeight: 600, color: '#1e293b' }}>Tel:</span> 919 93 09 63</p>
                <p style={{ color: '#2563eb' }}>www.reparacionesmanzanares.es</p>
            </div>
            </div>
            
            <div style={{ textAlign: 'right' }}>
            <h2 className="text-4xl font-light uppercase tracking-widest mb-3" style={{ fontSize: '32px', color: '#cbd5e1', margin: '0 0 12px 0' }}>Presupuesto</h2>
            <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', padding: '16px', borderRadius: '8px', textAlign: 'left', minWidth: '260px' }}>
                <p style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 6px 0' }}>Datos del Cliente</p>
                <p style={{ fontWeight: 'bold', fontSize: '16px', color: '#1e293b', textTransform: 'uppercase', margin: '0 0 2px 0' }}>{cliente.nombre || 'Nombre del Cliente'}</p>
                <p style={{ color: '#475569', fontSize: '14px', margin: '0' }}>{cliente.localidad || 'Localidad'}</p>
                <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: '#64748b' }}>Fecha:</span>
                <span style={{ fontWeight: 'bold', color: '#1e293b' }}>{cliente.fecha}</span>
                </div>
            </div>
            </div>
        </div>

        <div style={{ marginBottom: '40px', minHeight: '400px' }}>
            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
                <tr>
                <th style={{ padding: '12px 8px', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.05em', color: '#64748b', borderBottom: '2px solid #0f172a', width: '80%' }}>Concepto</th>
                <th style={{ padding: '12px 8px', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.05em', color: '#64748b', borderBottom: '2px solid #0f172a', width: '20%', textAlign: 'right' }}>Importe</th>
                </tr>
            </thead>
            <tbody>
                {partidas.map((partida, index) => (
                <tr key={index}>
                    <td style={{ padding: '16px 8px', whiteSpace: 'pre-wrap', color: '#334155', fontSize: '14px', lineHeight: '1.6', borderBottom: '1px solid #f1f5f9' }}>{partida.descripcion}</td>
                    <td style={{ padding: '16px 8px', textAlign: 'right', fontWeight: '500', color: '#0f172a', verticalAlign: 'top', borderBottom: '1px solid #f1f5f9' }}>{partida.precio ? partida.precio.toFixed(2) : '0.00'} €</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '48px' }}>
            <div style={{ width: '260px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: '14px', color: '#475569', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ fontWeight: '500' }}>Base Imponible</span>
                <span>{subtotal.toFixed(2)} €</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: '14px', color: '#475569', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ fontWeight: '500' }}>IVA (21%)</span>
                <span>{iva.toFixed(2)} €</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0 0 0', marginTop: '4px', fontWeight: '900', fontSize: '20px', color: '#0f172a', borderTop: '2px solid #0f172a' }}>
                <span style={{ textTransform: 'uppercase' }}>Total</span>
                <span>{total.toFixed(2)} €</span>
            </div>
            </div>
        </div>

        <div style={{ marginTop: '32px', fontSize: '11px', color: '#64748b', whiteSpace: 'pre-wrap', lineHeight: '1.6', maxWidth: '80%' }}>
            {notas}
        </div>
        
        <div style={{ position: 'absolute', bottom: '15mm', left: '15mm', right: '15mm', paddingTop: '16px', borderTop: '1px solid #e2e8f0', textAlign: 'center', fontSize: '10px', color: '#94a3b8' }}>
            Documento generado por Reparaciones Manzanares. Aceptación del presupuesto sujeta a las condiciones especificadas.
        </div>
      </div>
    </>
  );
}
