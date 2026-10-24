import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { sql } from '@vercel/postgres';
import { checkAuth, clientIp } from '@/lib/crmAuth';

// Registro de todo lo que se hace con la herramienta de presupuestos
// (/admin/presupuestos): cada Word importado y cada PDF generado.
// Escribir es libre (la herramienta no pide PIN); leer requiere el PIN del CRM.

const hasPostgres = Boolean(process.env.POSTGRES_URL || process.env.DATABASE_URL);
const MAX_BYTES = 300 * 1024;
const TIPOS = ['importar_word', 'generar_pdf'];

let tableInitialized = false;
async function ensureTable() {
  if (tableInitialized) return;
  await sql`
    CREATE TABLE IF NOT EXISTS presupuestos_log (
      id VARCHAR(64) PRIMARY KEY,
      tipo VARCHAR(32) NOT NULL,
      data JSONB NOT NULL,
      ip VARCHAR(64),
      ciudad VARCHAR(128),
      user_agent TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  tableInitialized = true;
}

export async function POST(request: Request) {
  if (!hasPostgres) return NextResponse.json({ error: 'Sin base de datos' }, { status: 503 });

  try {
    const raw = await request.text();
    if (raw.length > MAX_BYTES) return NextResponse.json({ error: 'Demasiado grande' }, { status: 413 });
    const payload = JSON.parse(raw);
    if (!TIPOS.includes(payload?.tipo)) return NextResponse.json({ error: 'Tipo no válido' }, { status: 400 });

    const ciudad = decodeURIComponent(request.headers.get('x-vercel-ip-city') || '');
    await ensureTable();
    await sql`
      INSERT INTO presupuestos_log (id, tipo, data, ip, ciudad, user_agent)
      VALUES (
        ${crypto.randomUUID()},
        ${payload.tipo},
        ${JSON.stringify(payload.data ?? {})},
        ${clientIp(request)},
        ${ciudad},
        ${request.headers.get('user-agent') || ''}
      );
    `;
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error guardando registro de presupuesto:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const authError = checkAuth(request);
  if (authError) return authError;
  if (!hasPostgres) return NextResponse.json([]);

  try {
    await ensureTable();
    const { rows } = await sql`
      SELECT id, tipo, data, ip, ciudad, user_agent, created_at
      FROM presupuestos_log
      ORDER BY created_at DESC
      LIMIT 500;
    `;
    return NextResponse.json(rows);
  } catch (error: any) {
    console.error('Error leyendo registro de presupuestos:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
