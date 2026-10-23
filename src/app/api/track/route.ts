import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { checkAuth, clientIp } from '@/lib/crmAuth';
import { services, locationsData, slugify } from '@/data/seoData';

// Registro de pulsaciones en "Llamar" y "WhatsApp" de la web.
// Ojo: cuenta pulsaciones del botón, no llamadas realmente hechas ni mensajes enviados.
// No guardamos IP ni nada que identifique a la persona.

const TIPOS = ['call', 'whatsapp'];

// Anti-spam en memoria de la instancia: ignora dobles toques (mismo botón y página
// en 60 s) y más de 20 registros por IP cada 10 minutos.
const recent = new Map<string, number>();
const perIp = new Map<string, { count: number; first: number }>();

function shouldIgnore(ip: string, key: string): boolean {
  const now = Date.now();
  if (recent.size > 5000) recent.clear();
  if (perIp.size > 5000) perIp.clear();

  const last = recent.get(key);
  recent.set(key, now);
  if (last && now - last < 60 * 1000) return true;

  const entry = perIp.get(ip);
  if (!entry || now - entry.first > 10 * 60 * 1000) {
    perIp.set(ip, { count: 1, first: now });
    return false;
  }
  entry.count += 1;
  return entry.count > 20;
}

let tableInitialized = false;
async function ensureTable() {
  if (tableInitialized) return;
  await sql`
    CREATE TABLE IF NOT EXISTS web_clicks (
      id SERIAL PRIMARY KEY,
      tipo VARCHAR(20) NOT NULL,
      pagina VARCHAR(300) NOT NULL,
      boton VARCHAR(120),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  tableInitialized = true;
}

const clean = (v: unknown, max: number) => (typeof v === 'string' ? v.slice(0, max) : '');

export async function POST(request: Request) {
  try {
    // sendBeacon manda text/plain, así que leemos el cuerpo como texto.
    const body = JSON.parse(await request.text());
    const tipo = clean(body.type, 20);
    if (!TIPOS.includes(tipo)) {
      return NextResponse.json({ success: false }, { status: 400 });
    }
    let pagina = clean(body.page, 300).split('?')[0].split('#')[0] || '/';
    if (!pagina.startsWith('/')) pagina = '/';
    const boton = clean(body.button, 120);

    const ip = clientIp(request);
    if (shouldIgnore(ip, `${ip}|${tipo}|${pagina}`)) {
      return NextResponse.json({ success: true });
    }

    await ensureTable();
    await sql`INSERT INTO web_clicks (tipo, pagina, boton) VALUES (${tipo}, ${pagina}, ${boton});`;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Tracking Error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

// Traduce la URL de la página a servicio y municipio legibles.
const slugMap = new Map<string, { servicio: string; municipio: string }>();
services.forEach(s => {
  locationsData.forEach(l => {
    slugMap.set(`${s.slugBase}-${slugify(l.name)}`, { servicio: s.name, municipio: l.name });
  });
});

function describePage(pagina: string): { servicio: string; municipio: string } {
  const slug = pagina.replace(/^\/+|\/+$/g, '');
  if (slug === '') return { servicio: 'Portada', municipio: 'Sin municipio' };
  if (slug === 'contacto') return { servicio: 'Página de contacto', municipio: 'Sin municipio' };
  if (slug.startsWith('blog')) return { servicio: 'Blog', municipio: 'Sin municipio' };
  return slugMap.get(slug) || { servicio: 'Otras páginas', municipio: 'Sin municipio' };
}

// Resumen mensual para el CRM (protegido con el PIN del CRM).
export async function GET(request: Request) {
  const authError = checkAuth(request);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const mes = searchParams.get('mes') || '';
    if (!/^\d{4}-\d{2}$/.test(mes)) {
      return NextResponse.json({ error: 'Parámetro mes (AAAA-MM) obligatorio' }, { status: 400 });
    }

    await ensureTable();
    const { rows } = await sql`
      SELECT tipo, pagina, COUNT(*)::int AS total
      FROM web_clicks
      WHERE to_char(created_at AT TIME ZONE 'Europe/Madrid', 'YYYY-MM') = ${mes}
      GROUP BY tipo, pagina;
    `;

    const resumen = { mes, llamadas: 0, whatsapp: 0, servicios: {} as Record<string, any>, municipios: {} as Record<string, any>, paginas: {} as Record<string, any> };
    const add = (map: Record<string, any>, key: string, tipo: string, n: number) => {
      if (!map[key]) map[key] = { llamadas: 0, whatsapp: 0 };
      map[key][tipo === 'call' ? 'llamadas' : 'whatsapp'] += n;
    };
    for (const r of rows) {
      const { servicio, municipio } = describePage(r.pagina);
      if (r.tipo === 'call') resumen.llamadas += r.total;
      else resumen.whatsapp += r.total;
      add(resumen.servicios, servicio, r.tipo, r.total);
      add(resumen.municipios, municipio, r.tipo, r.total);
      add(resumen.paginas, r.pagina, r.tipo, r.total);
    }
    return NextResponse.json(resumen);
  } catch (error) {
    console.error('Tracking summary error:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
