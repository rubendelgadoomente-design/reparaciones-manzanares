import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { sql } from '@vercel/postgres';
import { clientIp } from '@/lib/crmAuth';

// Portal de partners (public/partner.html).
//
// Cada partner entra con su enlace personal: /partner.html?k=CLAVE. Ve solo los contactos
// del CRM que tienen su nombre en "Partner asignado" y marca cómo va cada trabajo.
//
// Lo que marca el partner se guarda en una tabla aparte (partner_estados), no dentro del
// contacto del CRM: así, si el CRM está abierto en otro aparato y guarda, no lo pisa.
// Cada cambio avisa a Rubén por el mismo Telegram del resumen diario.
//
// Variables de entorno (Vercel → Settings → Environment Variables):
// - PARTNER_CLAVES: una clave por partner, separadas por comas. Ej: "Nacho:clave-larga-1,Kevin:clave-larga-2".
//   El nombre debe coincidir con el principio del "Partner asignado" del CRM (sin mayúsculas).
// - TELEGRAM_BOT_TOKEN y (opcional) TELEGRAM_CHAT_ID: los mismos del resumen diario.

const ESTADOS = ['Pendiente', 'Contactado', 'Presupuestado', 'Realizado', 'No sale'];
// Trabajos que el partner sigue viendo aunque ya estén cerrados, durante estos días.
const DIAS_VISIBLE_CERRADO = 60;

function safeEqual(a: string, b: string): boolean {
  const ha = crypto.createHash('sha256').update(a).digest();
  const hb = crypto.createHash('sha256').update(b).digest();
  return crypto.timingSafeEqual(ha, hb);
}

// Mismo freno a la fuerza bruta que el CRM (memoria de la instancia).
const MAX_FAILS = 10;
const WINDOW_MS = 15 * 60 * 1000;
const fallos = new Map<string, { count: number; first: number }>();

function partnerDeClave(request: Request, clave: string): { nombre?: string; error?: NextResponse } {
  const ip = clientIp(request);
  const ahora = Date.now();
  const f = fallos.get(ip);
  if (f && ahora - f.first > WINDOW_MS) fallos.delete(ip);
  const actual = fallos.get(ip);
  if (actual && actual.count >= MAX_FAILS) {
    return { error: NextResponse.json({ error: 'Demasiados intentos' }, { status: 429 }) };
  }
  const lista = (process.env.PARTNER_CLAVES || '')
    .split(',')
    .map(par => par.trim())
    .filter(Boolean)
    .map(par => {
      const i = par.indexOf(':');
      return { nombre: par.slice(0, i).trim(), clave: par.slice(i + 1).trim() };
    })
    .filter(p => p.nombre && p.clave.length >= 12);
  const encontrado = clave ? lista.find(p => safeEqual(p.clave, clave)) : undefined;
  if (encontrado) {
    fallos.delete(ip);
    return { nombre: encontrado.nombre };
  }
  if (actual) actual.count += 1;
  else fallos.set(ip, { count: 1, first: ahora });
  return { error: NextResponse.json({ error: 'Enlace no válido' }, { status: 401 }) };
}

function esDelPartner(lead: any, partner: string): boolean {
  return String(lead?.partner || '').trim().toLowerCase().startsWith(partner.toLowerCase());
}

let tablaLista = false;
async function asegurarTabla() {
  if (tablaLista) return;
  await sql`
    CREATE TABLE IF NOT EXISTS partner_estados (
      lead_id VARCHAR(255) PRIMARY KEY,
      partner VARCHAR(100) NOT NULL,
      estado VARCHAR(50) NOT NULL,
      presupuesto NUMERIC DEFAULT 0,
      factura NUMERIC DEFAULT 0,
      resena BOOLEAN DEFAULT FALSE,
      nota TEXT DEFAULT '',
      historial JSONB DEFAULT '[]'::jsonb,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  tablaLista = true;
}

function esc(t: unknown): string {
  return String(t ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function euros(v: unknown): string {
  return (Number(v) || 0).toLocaleString('es-ES', { maximumFractionDigits: 0 }) + ' €';
}

// Aviso a Rubén. Si Telegram falla, el cambio del partner se guarda igual.
async function avisarTelegram(texto: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return;
  try {
    let chatId = process.env.TELEGRAM_CHAT_ID || '';
    if (!chatId) {
      const { rows } = await sql`SELECT valor FROM app_config WHERE clave = 'telegram_chat_id';`;
      chatId = rows[0]?.valor || '';
    }
    if (!chatId) return;
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: texto, parse_mode: 'HTML', disable_web_page_preview: true }),
    });
  } catch (error) {
    console.error('Aviso de partner por Telegram no enviado:', error);
  }
}

export async function GET(request: Request) {
  const clave = new URL(request.url).searchParams.get('k') || request.headers.get('x-partner-clave') || '';
  const { nombre, error } = partnerDeClave(request, clave);
  if (error) return error;

  try {
    await asegurarTabla();
    const { rows: leads } = await sql`SELECT data FROM crm_leads;`;
    const { rows: estados } = await sql`SELECT * FROM partner_estados WHERE LOWER(partner) = LOWER(${nombre!});`;
    const porId = new Map(estados.map(e => [e.lead_id, e]));
    const limite = Date.now() - DIAS_VISIBLE_CERRADO * 86400000;

    const trabajos = leads
      .map(r => r.data)
      .filter(c => esDelPartner(c, nombre!))
      .map(c => {
        const e = porId.get(c.id);
        return {
          id: c.id,
          fecha: c.fecha || (c.createdAt || '').slice(0, 10),
          nombre: c.nombre || '',
          telefono: c.telefono || '',
          localidad: c.localidad || '',
          servicio: c.servicio || '',
          descripcion: c.descripcion || '',
          estado: e?.estado || 'Pendiente',
          presupuesto: Number(e?.presupuesto) || 0,
          factura: Number(e?.factura) || 0,
          resena: Boolean(e?.resena),
          nota: e?.nota || '',
          actualizado: e?.updated_at || null,
        };
      })
      .filter(t => !['Realizado', 'No sale'].includes(t.estado) || !t.actualizado || new Date(t.actualizado).getTime() >= limite)
      .sort((a, b) => String(b.fecha).localeCompare(String(a.fecha)));

    return NextResponse.json({ partner: nombre, trabajos });
  } catch (err) {
    console.error('Error cargando el portal de partner:', err);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Datos no válidos' }, { status: 400 });
  }
  const { nombre, error } = partnerDeClave(request, String(body?.k || ''));
  if (error) return error;

  const id = String(body?.id || '');
  const estado = String(body?.estado || '');
  if (!id || !ESTADOS.includes(estado)) {
    return NextResponse.json({ error: 'Datos no válidos' }, { status: 400 });
  }
  const presupuesto = Math.max(0, Number(body?.presupuesto) || 0);
  const factura = Math.max(0, Number(body?.factura) || 0);
  const resena = Boolean(body?.resena);
  const nota = String(body?.nota || '').slice(0, 500);

  try {
    await asegurarTabla();
    const { rows } = await sql`SELECT data FROM crm_leads WHERE id = ${id};`;
    const lead = rows[0]?.data;
    // Un partner solo puede tocar sus propios trabajos.
    if (!lead || !esDelPartner(lead, nombre!)) {
      return NextResponse.json({ error: 'Trabajo no encontrado' }, { status: 404 });
    }

    const { rows: previos } = await sql`SELECT * FROM partner_estados WHERE lead_id = ${id};`;
    const previo = previos[0];
    const cambio = { fecha: new Date().toISOString(), estado, presupuesto, factura, resena, nota };
    const historial = [...(previo?.historial || []), cambio].slice(-50);

    await sql`
      INSERT INTO partner_estados (lead_id, partner, estado, presupuesto, factura, resena, nota, historial, updated_at)
      VALUES (${id}, ${nombre!}, ${estado}, ${presupuesto}, ${factura}, ${resena}, ${nota}, ${JSON.stringify(historial)}, NOW())
      ON CONFLICT (lead_id) DO UPDATE SET
        partner = ${nombre!}, estado = ${estado}, presupuesto = ${presupuesto}, factura = ${factura},
        resena = ${resena}, nota = ${nota}, historial = ${JSON.stringify(historial)}, updated_at = NOW();
    `;

    // Aviso solo si cambia algo que a Rubén le importa.
    const novedades: string[] = [];
    if (!previo || previo.estado !== estado) {
      let txt = `→ <b>${esc(estado)}</b>`;
      if (estado === 'Presupuestado' && presupuesto) txt += ` ${euros(presupuesto)}`;
      if (estado === 'Realizado' && factura) txt += `, factura ${euros(factura)}`;
      novedades.push(txt);
    } else {
      if (Number(previo.presupuesto) !== presupuesto && presupuesto) novedades.push(`presupuesto ${euros(presupuesto)}`);
      if (Number(previo.factura) !== factura && factura) novedades.push(`factura ${euros(factura)}`);
    }
    if (resena && !previo?.resena) novedades.push('⭐ el cliente dejó reseña');
    if (nota && nota !== (previo?.nota || '')) novedades.push(`nota: "${esc(nota)}"`);
    if (novedades.length) {
      const quien = [lead.nombre, lead.servicio, lead.localidad].filter(Boolean).map(esc).join(' · ');
      await avisarTelegram(`🔧 <b>${esc(nombre)}</b>: ${quien}\n${novedades.join('\n')}`);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Error guardando estado de partner:', err);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
