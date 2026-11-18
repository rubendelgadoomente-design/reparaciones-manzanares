import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { sql } from '@vercel/postgres';

// Avisos de llamadas de Zadarma → contactos del CRM (tabla crm_leads).
//
// Zadarma llama a esta dirección cada vez que termina una llamada entrante (NOTIFY_END).
// - Si el número ya tiene un contacto abierto en el CRM, la llamada se apunta en ese contacto.
// - Si no, se crea un contacto "Nuevo" con el teléfono.
// - Si nadie la cogió, se marca "Llamar hoy" para devolverla.
//
// Variables de entorno (Vercel → Settings → Environment Variables):
// - ZADARMA_SECRET: la clave "Secret" de la API de Zadarma. Sin ella no se acepta nada.
// - ZADARMA_IGNORAR: números que no deben crear contactos (p. ej. el móvil personal),
//   separados por comas. Opcional.

const SECRET = process.env.ZADARMA_SECRET || '';
const IGNORAR = (process.env.ZADARMA_IGNORAR || '')
  .split(',')
  .map(n => ultimos9(n))
  .filter(n => n.length === 9);

const ESTADOS_ABIERTOS = ['Nuevo', 'Contactado', 'Presupuesto enviado', 'Aceptado'];

function ultimos9(tel: string): string {
  return String(tel || '').replace(/\D/g, '').slice(-9);
}

function formatear(tel9: string): string {
  return tel9.replace(/^(\d{3})(\d{3})(\d{3})$/, '$1 $2 $3');
}

function hoyMadrid(): string {
  return new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Madrid' });
}

function safeEqual(a: string, b: string): boolean {
  const ha = crypto.createHash('sha256').update(a).digest();
  const hb = crypto.createHash('sha256').update(b).digest();
  return crypto.timingSafeEqual(ha, hb);
}

// Firma de Zadarma: base64(hmac_sha1(caller_id + called_did + call_start, secret)).
// Su ejemplo en PHP codifica el resultado hexadecimal; aceptamos también el binario.
function firmaValida(request: Request, datos: string): boolean {
  const recibida = request.headers.get('signature') || '';
  if (!recibida) return false;
  const hmac = crypto.createHmac('sha1', SECRET).update(datos);
  const digest = hmac.digest();
  const enHex = Buffer.from(digest.toString('hex')).toString('base64');
  const enBinario = digest.toString('base64');
  return safeEqual(recibida, enHex) || safeEqual(recibida, enBinario);
}

function textoDisposicion(d: string): string {
  const mapa: Record<string, string> = {
    'answered': 'contestada',
    'busy': 'comunicando',
    'cancel': 'colgó antes de que se cogiera',
    'no answer': 'no se cogió',
    'failed': 'falló',
    'no money': 'sin saldo en Zadarma',
    'unallocated number': 'número no existe',
    'no limit': 'límite superado',
    'no day limit': 'límite diario superado',
    'line limit': 'líneas ocupadas',
    'no money, no limit': 'sin saldo en Zadarma',
  };
  return mapa[d] || d || 'desconocido';
}

// Zadarma comprueba la dirección antes de guardarla enviando ?zd_echo=... y espera el mismo texto.
export async function GET(request: Request) {
  const echo = new URL(request.url).searchParams.get('zd_echo');
  if (echo) return new Response(echo, { headers: { 'Content-Type': 'text/plain' } });
  return NextResponse.json({ ok: true });
}

export async function POST(request: Request) {
  if (!SECRET) {
    return NextResponse.json({ error: 'Zadarma no configurado' }, { status: 503 });
  }
  if (!process.env.POSTGRES_URL && !process.env.DATABASE_URL) {
    return NextResponse.json({ error: 'Sin base de datos' }, { status: 503 });
  }

  let form: URLSearchParams;
  try {
    form = new URLSearchParams(await request.text());
  } catch {
    return NextResponse.json({ error: 'Petición no válida' }, { status: 400 });
  }

  const evento = form.get('event') || '';
  const callerId = form.get('caller_id') || '';
  const calledDid = form.get('called_did') || '';
  const callStart = form.get('call_start') || '';

  if (!firmaValida(request, callerId + calledDid + callStart)) {
    return NextResponse.json({ error: 'Firma no válida' }, { status: 401 });
  }

  // Solo nos interesa el final de una llamada entrante: ahí ya sabemos si se cogió y cuánto duró.
  if (evento !== 'NOTIFY_END') return NextResponse.json({ ok: true, ignorado: evento });

  const tel9 = ultimos9(callerId);
  if (tel9.length !== 9) return NextResponse.json({ ok: true, ignorado: 'número oculto' });
  if (IGNORAR.includes(tel9)) return NextResponse.json({ ok: true, ignorado: 'número de la lista' });

  const pbxCallId = (form.get('pbx_call_id') || '').slice(0, 120);
  const disposicion = form.get('disposition') || '';
  const duracion = parseInt(form.get('duration') || '0', 10) || 0;
  const contestada = disposicion === 'answered';
  const ahora = new Date().toISOString();
  const hoy = hoyMadrid();

  const minutos = duracion >= 60 ? `${Math.round(duracion / 60)} min` : `${duracion} s`;
  const textoLlamada = contestada
    ? `Llamada entrante (Zadarma): contestada, ${minutos}.`
    : `LLAMADA PERDIDA (Zadarma): ${textoDisposicion(disposicion)}. Devolver la llamada.`;
  const registro = { date: ahora, text: textoLlamada, zadarmaId: pbxCallId };

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS crm_leads (
        id VARCHAR(255) PRIMARY KEY,
        data JSONB NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // ¿Ya hay un contacto abierto con ese teléfono? Entonces la llamada va a su ficha.
    const { rows } = await sql`
      SELECT id, data FROM crm_leads
      WHERE RIGHT(regexp_replace(COALESCE(data->>'telefono', ''), '\\D', '', 'g'), 9) = ${tel9}
      ORDER BY updated_at DESC;
    `;
    const abierto = rows.find(r => ESTADOS_ABIERTOS.includes(r.data?.estado));

    if (abierto) {
      const c = abierto.data;
      const llamadas = Array.isArray(c.llamadas) ? c.llamadas : [];
      if (pbxCallId && llamadas.some((l: any) => l.zadarmaId === pbxCallId)) {
        return NextResponse.json({ ok: true, repetido: true }); // Zadarma reintentó el aviso
      }
      const actualizado = {
        ...c,
        llamadas: llamadas.concat([registro]),
        updatedAt: ahora,
        ...(contestada ? {} : { proximaLlamada: hoy }),
      };
      await sql`
        UPDATE crm_leads SET data = ${JSON.stringify(actualizado)}, updated_at = NOW()
        WHERE id = ${abierto.id};
      `;
      return NextResponse.json({ ok: true, contacto: abierto.id, nuevo: false });
    }

    // Contacto nuevo. El id sale de la llamada, así un aviso repetido no crea dos.
    const id = 'zd_' + (pbxCallId || crypto.randomBytes(6).toString('hex')).replace(/[^\w.-]/g, '');
    const contacto = {
      id,
      fecha: hoy,
      nombre: 'Llamada ' + formatear(tel9),
      telefono: tel9,
      email: '',
      localidad: '',
      servicio: '',
      origen: 'Llamada directa',
      estado: 'Nuevo',
      prioridad: contestada ? 'Media' : 'Alta',
      presupuesto: 0,
      facturado: 0,
      motivoDescarte: '',
      descripcion: contestada ? '' : 'Llamada perdida: devolver la llamada.',
      observaciones: '',
      partner: '',
      proximaLlamada: contestada ? '' : hoy,
      fotos: [],
      createdAt: ahora,
      updatedAt: ahora,
      historial: [{ date: ahora, description: 'Contacto creado automáticamente por una llamada a Zadarma.' }],
      notas: [],
      llamadas: [registro],
    };
    await sql`
      INSERT INTO crm_leads (id, data, updated_at)
      VALUES (${id}, ${JSON.stringify(contacto)}, NOW())
      ON CONFLICT (id) DO NOTHING;
    `;
    return NextResponse.json({ ok: true, contacto: id, nuevo: true });
  } catch (error) {
    console.error('Error guardando llamada de Zadarma:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
