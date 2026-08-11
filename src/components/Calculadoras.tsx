"use client";

import React, { useState } from 'react';

// Style constants for UI
const cardStyle: React.CSSProperties = {
  backgroundColor: 'white',
  borderRadius: '16px',
  border: '1px solid #E2E8F0',
  boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
  padding: '2.5rem',
  marginBottom: '2.5rem',
  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
};

const titleStyle: React.CSSProperties = {
  fontSize: '1.5rem',
  fontWeight: 700,
  color: '#0D1B2A',
  marginBottom: '0.5rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem'
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.9rem',
  fontWeight: 600,
  color: '#475569',
  marginBottom: '0.5rem'
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.75rem 1rem',
  borderRadius: '8px',
  border: '1px solid #CBD5E1',
  fontSize: '1rem',
  color: '#1E293B',
  marginBottom: '1.5rem',
  outline: 'none',
  transition: 'border-color 0.2s ease'
};

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  appearance: 'none',
  backgroundImage: 'url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 20 20\' fill=\'none\'%3E%3Cpath d=\'M7 9l3 3 3-3\' stroke=\'%2364748B\' stroke-width=\'1.5\' stroke-linecap=\'round\' stroke-linejoin=\'round\'/%3E%3C/svg%3E")',
  backgroundPosition: 'right 1rem center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '1.25rem'
};

const resultBoxStyle: React.CSSProperties = {
  backgroundColor: '#F8FAFC',
  borderRadius: '12px',
  borderLeft: '4px solid #FF6D00',
  padding: '1.5rem',
  marginTop: '1.5rem'
};

const buttonStyle: React.CSSProperties = {
  width: '100%',
  backgroundColor: '#FF6D00',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  padding: '0.85rem 1.5rem',
  fontSize: '1.1rem',
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'background-color 0.2s ease, transform 0.1s ease',
  boxShadow: '0 4px 6px rgba(255, 109, 0, 0.15)'
};

export function CalculadoraCaldera() {
  const [meters, setMeters] = useState<number>(90);
  const [insulation, setInsulation] = useState<string>('medio');
  const [zone, setZone] = useState<string>('sierra-media');
  const [use, setUse] = useState<string>('ambos');
  const [result, setResult] = useState<{ power: number; text: string } | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Base heat loss calculation per m2 (W/m2)
    let wPerM2 = 80;
    if (insulation === 'malo') wPerM2 = 110;
    if (insulation === 'excelente') wPerM2 = 55;

    // Climate correction factor
    let climateFactor = 1.0;
    if (zone === 'sierra-alta') climateFactor = 1.25; // Coldest parts (Navacerrada, Cercedilla)
    if (zone === 'madrid') climateFactor = 0.9;

    // Basic heating power needed (in Watts)
    let heatingPowerW = meters * wPerM2 * climateFactor;
    
    // Add safety margin
    heatingPowerW = heatingPowerW * 1.15; 
    
    // Convert to kW
    let recommendedPowerKW = Math.round((heatingPowerW / 1000) * 10) / 10;

    let text = "";
    let finalPower = 24; // Minimum standard boiler power for ACS

    if (use === 'ambos') {
      // For Hot water (ACS) + Heating, we need at least 24kW for 1-2 bathrooms, 28kW for 2-3 bathrooms, etc.
      if (meters <= 120) {
        finalPower = 24;
        text = "Una caldera de condensación estándar de 24 kW es óptima para calefacción y garantizar agua caliente estable en 1 o 2 baños a la vez.";
      } else if (meters <= 180) {
        finalPower = 28;
        text = "Se recomienda una caldera de 28 kW. Te garantiza calefacción idónea para tus metros y un mayor caudal de agua caliente para uso simultáneo en 2 baños.";
      } else {
        finalPower = 32;
        text = "Para chalets grandes en la sierra de más de 180m², se recomienda una potencia de 32 kW a 35 kW para asegurar agua caliente constante y calefacción simultánea sin caídas.";
      }
    } else {
      // Only heating
      if (recommendedPowerKW <= 18) {
        finalPower = 18;
        text = `Necesitas unos ${recommendedPowerKW} kW para calefacción. Una caldera de 18 kW o 24 kW de solo calefacción será más que suficiente.`;
      } else if (recommendedPowerKW <= 24) {
        finalPower = 24;
        text = `Tu necesidad térmica es de unos ${recommendedPowerKW} kW. Una caldera de solo calefacción de 24 kW es idónea.`;
      } else {
        finalPower = 30;
        text = `Tu necesidad térmica es elevada (${recommendedPowerKW} kW). Se recomienda un equipo de 30 kW o superior para calefacción.`;
      }
    }

    setResult({
      power: finalPower,
      text: text
    });
  };

  return (
    <div style={cardStyle}>
      <h3 style={titleStyle}>
        <span>🔥</span> Calculadora de Potencia de Caldera
      </h3>
      <p style={{ fontSize: '0.95rem', color: '#64748B', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        Calcula de forma aproximada los kW de potencia que necesita la caldera de tu vivienda en la Sierra de Madrid según sus dimensiones y características.
      </p>

      <form onSubmit={calculate}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div>
            <label style={labelStyle} htmlFor="meters-caldera">Superficie útil (m²)</label>
            <input 
              id="meters-caldera"
              type="number" 
              value={meters} 
              onChange={(e) => setMeters(Math.max(10, parseInt(e.target.value) || 0))} 
              style={inputStyle} 
              min="10" 
              max="500" 
            />
          </div>

          <div>
            <label style={labelStyle} htmlFor="insulation-caldera">Nivel de Aislamiento</label>
            <select 
              id="insulation-caldera"
              value={insulation} 
              onChange={(e) => setInsulation(e.target.value)} 
              style={selectStyle}
            >
              <option value="excelente">Excelente (Obra nueva, triple cristal)</option>
              <option value="medio">Medio (Aislamiento estándar, doble cristal)</option>
              <option value="malo">Sencillo / Antiguo (Sin cámara de aire, cristal simple)</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div>
            <label style={labelStyle} htmlFor="zone-caldera">Zona Climática en la Sierra</label>
            <select 
              id="zone-caldera"
              value={zone} 
              onChange={(e) => setZone(e.target.value)} 
              style={selectStyle}
            >
              <option value="sierra-alta">Sierra Alta (Navacerrada, Cercedilla, Becerril)</option>
              <option value="sierra-media">Sierra Media (Manzanares, Soto, Miraflores, Colmenar)</option>
              <option value="madrid">Zona Llana / Madrid Norte</option>
            </select>
          </div>

          <div>
            <label style={labelStyle} htmlFor="use-caldera">Uso de la Caldera</label>
            <select 
              id="use-caldera"
              value={use} 
              onChange={(e) => setUse(e.target.value)} 
              style={selectStyle}
            >
              <option value="ambos">Calefacción + Agua Caliente (ACS)</option>
              <option value="calefaccion">Solo Calefacción</option>
            </select>
          </div>
        </div>

        <button type="submit" style={buttonStyle}>
          Calcular Potencia Necesaria
        </button>
      </form>

      {result && (
        <div style={resultBoxStyle}>
          <h4 style={{ fontSize: '1.1rem', color: '#0D1B2A', marginBottom: '0.5rem', fontWeight: 700 }}>
            Potencia Recomendada: <span style={{ color: '#FF6D00', fontSize: '1.4rem' }}>{result.power} kW</span>
          </h4>
          <p style={{ fontSize: '0.95rem', color: '#334155', lineHeight: 1.6, margin: 0 }}>
            {result.text}
          </p>
          <span style={{ display: 'block', fontSize: '0.8rem', color: '#64748B', marginTop: '1rem', fontStyle: 'italic' }}>
            *Este cálculo es orientativo. Un instalador de Reparaciones Manzanares debe verificar la instalación técnica final.
          </span>
        </div>
      )}
    </div>
  );
}

export function CalculadoraAire() {
  const [meters, setMeters] = useState<number>(25);
  const [sun, setSun] = useState<string>('medio');
  const [glazing, setGlazing] = useState<string>('normal');
  const [result, setResult] = useState<{ frigorias: number; btu: number; text: string } | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();

    // Base frigorias per m2
    let baseFrig = 100; // Average base
    if (sun === 'mucho') baseFrig = 120;
    if (sun === 'poco') baseFrig = 85;

    // Glazing multiplier
    let glazeMultiplier = 1.0;
    if (glazing === 'grande') glazeMultiplier = 1.2;
    if (glazing === 'pequeno') glazeMultiplier = 0.9;

    let finalFrigorias = Math.round(meters * baseFrig * glazeMultiplier);
    
    // Normalize to closest commercial splits
    // Standard sizes: 2250 fg (9000 BTU), 3000 fg (12000 BTU), 4500 fg (18000 BTU), 6000 fg (24000 BTU)
    let commercialFrig = 2250;
    let btu = 9000;
    let text = "";

    if (finalFrigorias <= 2400) {
      commercialFrig = 2250;
      btu = 9000;
      text = "Para estancias pequeñas, dormitorios o despachos de hasta 20-22 m², un split estándar de 2.250 frigorías (9.000 BTU) es idóneo y eficiente.";
    } else if (finalFrigorias <= 3500) {
      commercialFrig = 3000;
      btu = 12000;
      text = "La opción ideal para la mayoría de salones medianos y habitaciones principales de hasta 30 m² es un equipo de 3.000 frigorías (12.000 BTU).";
    } else if (finalFrigorias <= 5200) {
      commercialFrig = 4500;
      btu = 18000;
      text = "Para salones amplios, lofts o cocinas de concepto abierto de hasta 45-50 m², se necesita un split potente de 4.500 frigorías (18.000 BTU).";
    } else {
      commercialFrig = 6000;
      btu = 24000;
      text = "Para estancias de grandes dimensiones, locales comerciales o zonas diáfanas de más de 50 m², se recomienda un equipo de 6.000 frigorías (24.000 BTU) o conductos.";
    }

    setResult({
      frigorias: commercialFrig,
      btu: btu,
      text: text
    });
  };

  return (
    <div style={cardStyle}>
      <h3 style={titleStyle}>
        <span>❄️</span> Calculadora de Frigorías / BTU
      </h3>
      <p style={{ fontSize: '0.95rem', color: '#64748B', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        Calcula la potencia en frigorías y BTU requerida para aclimatar tu salón o dormitorio en verano de manera eficiente y evitar consumos de luz elevados.
      </p>

      <form onSubmit={calculate}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
          <div>
            <label style={labelStyle} htmlFor="meters-aire">Superficie de la estancia (m²)</label>
            <input 
              id="meters-aire"
              type="number" 
              value={meters} 
              onChange={(e) => setMeters(Math.max(5, parseInt(e.target.value) || 0))} 
              style={inputStyle} 
              min="5" 
              max="150" 
            />
          </div>

          <div>
            <label style={labelStyle} htmlFor="sun-aire">Exposición al Sol (Radiación)</label>
            <select 
              id="sun-aire"
              value={sun} 
              onChange={(e) => setSun(e.target.value)} 
              style={selectStyle}
            >
              <option value="medio">Medio (Orientación Este/Oeste)</option>
              <option value="mucho">Mucho sol / Ático (Orientación Sur)</option>
              <option value="poco">Sombra / Planta baja (Orientación Norte)</option>
            </select>
          </div>

          <div>
            <label style={labelStyle} htmlFor="glazing-aire">Ventanas / Acristalamiento</label>
            <select 
              id="glazing-aire"
              value={glazing} 
              onChange={(e) => setGlazing(e.target.value)} 
              style={selectStyle}
            >
              <option value="normal">Normal (Ventana estándar doble cristal)</option>
              <option value="grande">Grande (Ventanal grande o mirador)</option>
              <option value="pequeno">Pequeño (Ventana de patio pequeña)</option>
            </select>
          </div>
        </div>

        <button type="submit" style={buttonStyle}>
          Calcular Frigorías Necesarias
        </button>
      </form>

      {result && (
        <div style={resultBoxStyle}>
          <h4 style={{ fontSize: '1.1rem', color: '#0D1B2A', marginBottom: '0.5rem', fontWeight: 700 }}>
            Recomendado: <span style={{ color: '#FF6D00', fontSize: '1.3rem' }}>{result.frigorias} frigorías</span> / <span style={{ color: '#0077B6', fontSize: '1.3rem' }}>{result.btu} BTU</span>
          </h4>
          <p style={{ fontSize: '0.95rem', color: '#334155', lineHeight: 1.6, margin: 0 }}>
            {result.text}
          </p>
          <span style={{ display: 'block', fontSize: '0.8rem', color: '#64748B', marginTop: '1rem', fontStyle: 'italic' }}>
            *Se recomienda elegir equipos con tecnología Inverter A+++ para reducir el consumo hasta un 40% en verano.
          </span>
        </div>
      )}
    </div>
  );
}
