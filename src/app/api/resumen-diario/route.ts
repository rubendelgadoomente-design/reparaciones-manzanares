import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { sql } from '@vercel/postgres';

// Resumen de "Tareas de hoy" del CRM enviado cada mañana por Telegram.
//
// Lo lanza Vercel Cron (ver vercel.json) dos veces, a las 6:00 y 7:00 UTC, para que
// llegue entre las 8 y las 9 en Madrid tanto en horario de invierno como de verano:
// antes de las 8 no envía nada, y si ya se envió hoy no repite.
//
// Variables de entorno (Vercel → Settings → Environment Variables):
// - CRON_SECRET: Vercel lo manda en cada ejecución; sin él no se acepta la llamada.
// - TELEGRAM_BOT_TOKEN: el token que da @BotFather al crear el bot.
// - TELEGRAM_CHAT_ID: opcional. Si no está, se usa el primer chat que escriba /start
//   al bot y se guarda en la base de datos; a partir de ahí no cambia.

const CRON_SECRET = process.env.CRON_SECRET || '';
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const CRM_URL = 'https://www.reparacionesmanzanares.es/crm.html';

// Mismos criterios que "Tareas de hoy" en public/crm.html.
const ABIERTOS = ['Nuevo', 'Contactado', 'Presupuesto enviado', 'Aceptado'];
const DIAS_PRESUPUESTO_PARADO = 5;
const DIAS_OBRA_SIN_CERRAR = 30;
const FECHA_ACUERDOS = '2026-10-23';

function safeEqual(a: string, b: string): boolean {
  const ha = crypto.createHash('sha256').update(a).digest();
  const hb = crypto.createHash('sha256').update(b).digest();
  return crypto.timingSafeEqual(ha, hb);
}

function madrid(): { fecha: string; hora: number } {
  const ahora = new Date();
  const fecha = ahora.toLocaleDateString('sv-SE', { timeZone: 'Europe/Madrid' });
  const hora = parseInt(ahora.toLocaleTimeString('en-GB', { timeZone: 'Europe/Madrid', hour: '2-digit', hour12: false }), 10);
  return { fecha, hora };
}

function diasDesde(fechaIso: string | undefined): number {
  if (!fechaIso) return 0;
  return Math.floor((Date.now() - new Date(fechaIso).getTime()) / 86400000);
}

function esc(t: unknown): string {
  return String(t ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function euros(v: unknown): string {
  const n = Number(v) || 0;
  return n.toLocaleString('es-ES', { maximumFractionDigits: 0 }) + ' €';
}

async function ensureConfig() {
  await sql`
    CREATE TABLE IF NOT EXISTS app_config (
      clave VARCHAR(100) PRIMARY KEY,
      valor TEXT NOT NULL,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
}

async function leerConfig(clave: string): Promise<string> {
  const { rows } = await sql`SELECT valor FROM app_config WHERE clave = ${clave};`;
  return rows[0]?.valor || '';
}

async function guardarConfig(clave: string, valor: string) {
  await sql`
    INSERT INTO app_config (clave, valor, updated_at) VALUES (${clave}, ${valor}, NOW())
    ON CONFLICT (clave) DO UPDATE SET valor = ${valor}, updated_at = NOW();
  `;
}

async function telegram(metodo: string, datos: Record<string, unknown>) {
  const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/${metodo}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || !json.ok) throw new Error(`Telegram ${metodo}: ${res.status} ${json.description || ''}`);
  return json.result;
}

// El chat al que se envía: variable de entorno, o el guardado, o el primero que mandó /start.
async function chatDestino(): Promise<string> {
  if (process.env.TELEGRAM_CHAT_ID) return process.env.TELEGRAM_CHAT_ID;
  const guardado = await leerConfig('telegram_chat_id');
  if (guardado) return guardado;
  const updates: any[] = await telegram('getUpdates', { allowed_updates: ['message'] });
  const inicio = updates.find(u => u.message?.chat?.type === 'private' && /^\/start\b/.test(u.message?.text || ''));
  if (!inicio) return '';
  const id = String(inicio.message.chat.id);
  await guardarConfig('telegram_chat_id', id);
  return id;
}

function construirResumen(list: any[], hoy: string): string {
  const vistos = new Set<string>();
  const grupo = (filtro: (c: any) => boolean) =>
    list.filter(c => !vistos.has(c.id) && filtro(c)).map(c => { vistos.add(c.id); return c; });

  const llamar = grupo(c => c.proximaLlamada && c.proximaLlamada <= hoy && ABIERTOS.includes(c.estado));
  const parados = grupo(c => c.estado === 'Presupuesto enviado' && diasDesde(c.updatedAt) >= DIAS_PRESUPUESTO_PARADO && !(c.proximaLlamada > hoy));
  const sinCerrar = grupo(c => c.estado === 'Aceptado' && diasDesde(c.updatedAt) >= DIAS_OBRA_SIN_CERRAR);
  const nuevos = grupo(c => c.estado === 'Nuevo' && diasDesde(c.createdAt || c.fecha) >= 1);
  const resenas = grupo(c => c.estado === 'Finalizado' && !c.resenaPedida && (c.fecha || '') >= FECHA_ACUERDOS);

  const linea = (c: any, detalle: string) => {
    const tel = c.telefono ? ` · ${esc(c.telefono)}` : '';
    const serv = c.servicio ? ` · ${esc(c.servicio)}` : '';
    return `• <b>${esc(c.nombre)}</b>${serv}${tel}${detalle ? ` — ${detalle}` : ''}`;
  };
  const MAX = 10;
  const bloque = (titulo: string, items: any[], detalle: (c: any) => string) => {
    if (items.length === 0) return '';
    const filas = items.slice(0, MAX).map(c => linea(c, detalle(c)));
    if (items.length > MAX) filas.push(`… y ${items.length - MAX} más en el CRM`);
    return `\n<b>${titulo} (${items.length})</b>\n${filas.join('\n')}\n`;
  };

  const cuerpo =
    bloque('📞 Llamar hoy', llamar, c => (c.proximaLlamada < hoy ? 'tocaba el ' + c.proximaLlamada.split('-').reverse().join('/') : '')) +
    bloque('⏳ Presupuestos parados', parados, c => `${diasDesde(c.updatedAt)} días · ${euros(c.presupuesto)}`) +
    bloque('🔍 ¿Se hizo la obra?', sinCerrar, c => `aceptado hace ${diasDesde(c.updatedAt)} días`) +
    bloque('🆕 Nuevos sin contactar', nuevos, c => `${diasDesde(c.createdAt || c.fecha)} días`) +
    bloque('⭐ Reseñas por pedir', resenas, () => '');

  const fechaTxt = hoy.split('-').reverse().join('/');
  if (!cuerpo) return `☀️ <b>Buenos días, ${fechaTxt}</b>\n\nTodo al día: no hay nada pendiente en el CRM.`;
  return `☀️ <b>Tareas de hoy, ${fechaTxt}</b>\n${cuerpo}\n<a href="${CRM_URL}">Abrir el CRM</a>`;
}

export async function GET(request: Request) {
  const auth = request.headers.get('authorization') || '';
  if (!CRON_SECRET || !safeEqual(auth, `Bearer ${CRON_SECRET}`)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (!BOT_TOKEN) return NextResponse.json({ error: 'Falta TELEGRAM_BOT_TOKEN' }, { status: 503 });

  const { fecha, hora } = madrid();
  if (hora < 8) return NextResponse.json({ ok: true, omitido: 'antes de las 8 en Madrid' });

  try {
    await ensureConfig();
    if ((await leerConfig('resumen_enviado')) === fecha) {
      return NextResponse.json({ ok: true, omitido: 'ya enviado hoy' });
    }

    const chatId = await chatDestino();
    if (!chatId) {
      return NextResponse.json({ error: 'Nadie ha escrito /start al bot todavía' }, { status: 409 });
    }

    const { rows } = await sql`SELECT data FROM crm_leads;`;
    const texto = construirResumen(rows.map(r => r.data), fecha);
    await telegram('sendMessage', { chat_id: chatId, text: texto, parse_mode: 'HTML', disable_web_page_preview: true });
    await guardarConfig('resumen_enviado', fecha);
    return NextResponse.json({ ok: true, enviado: true });
  } catch (error) {
    console.error('Error enviando el resumen diario:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
