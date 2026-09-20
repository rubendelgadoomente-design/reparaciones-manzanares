"use client";
import { useState } from 'react';

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
    "CONDICIONES DEL PRESUPUESTO:\n- No está incluido ningún material para la realización de estos trabajos, salvo especificación contraria.\n- Forma de pago: 50% a la aceptación del presupuesto, 50% a la finalización de los trabajos.\n- Validez del presupuesto: 15 días."
  );

  const agregarPartida = () => setPartidas([...partidas, { descripcion: '', precio: 0 }]);
  
  const actualizarPartida = (index: number, campo: string, valor: any) => {
    const nuevas = [...partidas];
    nuevas[index] = { ...nuevas[index], [campo]: valor };
    setPartidas(nuevas);
  };

  const eliminarPartida = (index: number) => {
    setPartidas(partidas.filter((_, i) => i !== index));
  };

  const subtotal = partidas.reduce((acc, p) => acc + Number(p.precio), 0);
  const iva = subtotal * 0.21;
  const total = subtotal + iva;

  const handlePrint = () => {
    // Al imprimir, el navegador usará las clases 'print:...' de Tailwind
    // para ocultar los controles y dejar solo el documento limpio.
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans text-gray-800">
      
      {/* 
        =========================================
        ZONA DE CONTROLES (Formulario)
        Se oculta automáticamente al imprimir gracias a "print:hidden"
        =========================================
      */}
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow mb-12 print:hidden border-t-4 border-blue-600">
        <h1 className="text-2xl font-bold mb-6 text-blue-900">Generador Interno de Presupuestos</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-semibold mb-1">Nombre / Empresa</label>
            <input type="text" className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500" value={cliente.nombre} onChange={e => setCliente({...cliente, nombre: e.target.value})} placeholder="Ej. Marina" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Localidad o Dirección</label>
            <input type="text" className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500" value={cliente.localidad} onChange={e => setCliente({...cliente, localidad: e.target.value})} placeholder="Ej. Soto del Real" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Fecha</label>
            <input type="text" className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500" value={cliente.fecha} onChange={e => setCliente({...cliente, fecha: e.target.value})} />
          </div>
        </div>

        <h2 className="text-xl font-bold mb-4 border-b pb-2 text-gray-700">Partidas del Presupuesto</h2>
        {partidas.map((partida, index) => (
          <div key={index} className="flex gap-4 mb-4 items-start">
            <div className="flex-1">
              <textarea 
                className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500" 
                rows={2}
                value={partida.descripcion} 
                onChange={e => actualizarPartida(index, 'descripcion', e.target.value)} 
                placeholder="Descripción detallada del trabajo (ej: Desmontaje de bañera acrílica...)" 
              />
            </div>
            <div className="w-32">
              <label className="block text-xs font-semibold text-gray-500 mb-1">Precio (€)</label>
              <input 
                type="number" 
                className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 font-bold" 
                value={partida.precio || ''} 
                onChange={e => actualizarPartida(index, 'precio', parseFloat(e.target.value) || 0)} 
                placeholder="0.00" 
              />
            </div>
            <div className="pt-5">
                <button onClick={() => eliminarPartida(index)} className="bg-red-50 text-red-600 border border-red-200 px-3 py-2 rounded font-bold hover:bg-red-100 transition-colors" title="Eliminar partida">X</button>
            </div>
          </div>
        ))}
        <button onClick={agregarPartida} className="bg-green-600 text-white px-4 py-2 rounded font-semibold hover:bg-green-700 mb-8 transition-colors shadow-sm">
          + Añadir Partida
        </button>

        <h2 className="text-xl font-bold mb-4 border-b pb-2 text-gray-700">Condiciones y Notas</h2>
        <textarea 
          className="w-full border border-gray-300 p-3 rounded mb-8 focus:ring-2 focus:ring-blue-500" 
          rows={4}
          value={notas} 
          onChange={e => setNotas(e.target.value)} 
        />

        <div className="bg-blue-50 p-4 rounded-lg flex items-center justify-between border border-blue-100">
            <div>
                <p className="font-semibold text-blue-900">Listo para enviar</p>
                <p className="text-sm text-blue-700">Comprueba la vista previa abajo y pulsa imprimir. En la ventana, elige "Guardar como PDF".</p>
            </div>
            <button onClick={handlePrint} className="bg-blue-700 text-white px-6 py-3 rounded-lg font-bold text-lg hover:bg-blue-800 shadow-md transition-colors flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Imprimir / PDF
            </button>
        </div>
      </div>


      {/* 
        =========================================
        ZONA DE IMPRESIÓN (El documento final)
        Se formatea específicamente para papel A4
        =========================================
      */}
      <div className="max-w-4xl mx-auto bg-white p-10 rounded shadow-lg print:shadow-none print:p-0 print:m-0 print:max-w-none">
        
        {/* Cabecera del Documento */}
        <div className="flex flex-col md:flex-row justify-between items-start border-b-4 border-blue-900 pb-6 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-blue-900 tracking-tighter">REPARACIONES MANZANARES</h1>
            <p className="text-gray-700 font-bold mt-1 tracking-widest uppercase text-sm">Mantenimiento y Reformas Integrales</p>
            <div className="mt-4 text-sm text-gray-600">
                <p>NIF: Y0000000X <span className="text-gray-400 italic">(Actualizar en código)</span></p>
                <p>Manzanares el Real (Madrid)</p>
                <p className="font-semibold mt-1">Tel: 919 93 09 63</p>
            </div>
          </div>
          <div className="text-left md:text-right mt-6 md:mt-0">
            <h2 className="text-4xl sm:text-5xl font-light text-gray-300 uppercase tracking-widest mb-4">Presupuesto</h2>
            <div className="bg-gray-50 border border-gray-200 p-4 rounded text-left inline-block min-w-[250px]">
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Datos del Cliente</p>
              <p className="font-bold text-lg text-gray-900">{cliente.nombre || 'Nombre del Cliente'}</p>
              <p className="text-gray-700">{cliente.localidad}</p>
              <p className="text-gray-500 mt-3 text-sm border-t pt-2">Fecha de emisión: <span className="font-semibold text-gray-800">{cliente.fecha}</span></p>
            </div>
          </div>
        </div>

        {/* Tabla de Partidas */}
        <div className="mb-10 min-h-[300px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="p-3 font-semibold w-4/5 rounded-tl-md">Concepto / Descripción del Trabajo</th>
                <th className="p-3 font-semibold w-1/5 text-right rounded-tr-md">Importe</th>
              </tr>
            </thead>
            <tbody>
              {partidas.map((partida, index) => (
                <tr key={index} className="border-b border-gray-200 even:bg-gray-50">
                  <td className="p-4 whitespace-pre-wrap text-gray-800 leading-relaxed">{partida.descripcion}</td>
                  <td className="p-4 text-right font-medium text-gray-800 align-top">{partida.precio.toFixed(2)} €</td>
                </tr>
              ))}
              {partidas.length === 0 && (
                <tr>
                    <td colSpan={2} className="p-8 text-center text-gray-400 italic">No hay partidas añadidas</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Totales */}
        <div className="flex justify-end mb-12">
          <div className="w-full sm:w-1/2 md:w-1/3 bg-gray-50 p-5 rounded-lg border border-gray-200">
            <div className="flex justify-between mb-3 text-gray-600">
              <span className="font-medium">Base Imponible:</span>
              <span>{subtotal.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between mb-3 text-gray-600">
              <span className="font-medium">IVA (21%):</span>
              <span>{iva.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between mt-4 pt-4 border-t-2 border-gray-300 font-black text-2xl text-blue-900">
              <span>TOTAL:</span>
              <span>{total.toFixed(2)} €</span>
            </div>
          </div>
        </div>

        {/* Condiciones Legales */}
        <div className="mt-8 text-sm text-gray-600 bg-gray-50 p-6 rounded-lg border border-gray-100 whitespace-pre-wrap leading-relaxed">
          {notas}
        </div>
        
        {/* Pie de página (Opcional, se suele poner fijo al fondo al imprimir) */}
        <div className="mt-16 pt-4 border-t border-gray-200 text-center text-xs text-gray-400">
          Documento generado por Reparaciones Manzanares. Este presupuesto tiene validez durante los días estipulados en las condiciones.
        </div>
      </div>

    </div>
  );
}
