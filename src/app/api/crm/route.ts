import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { sql } from '@vercel/postgres';

const dataFile = path.join(process.cwd(), 'data', 'crm.json');
// El secreto vive en la variable de entorno CRM_PIN (Vercel → Settings → Environment Variables).
// Si no está definida, el CRM queda cerrado (fail closed).
const CRM_PIN = process.env.CRM_PIN || '';

// Rate limit básico de intentos fallidos por IP. Es memoria de la instancia
// serverless: frena fuerza bruta casual, no un ataque distribuido.
const MAX_FAILS = 10;
const WINDOW_MS = 15 * 60 * 1000;
const failedAttempts = new Map<string, { count: number; first: number }>();

function clientIp(request: Request): string {
  return (request.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unknown';
}

function safeEqual(a: string, b: string): boolean {
  const ha = crypto.createHash('sha256').update(a).digest();
  const hb = crypto.createHash('sha256').update(b).digest();
  return crypto.timingSafeEqual(ha, hb);
}

// Devuelve null si está autorizado, o la respuesta de error a enviar.
function checkAuth(request: Request): NextResponse | null {
  if (!CRM_PIN) {
    return NextResponse.json({ error: 'CRM no configurado' }, { status: 503 });
  }
  const ip = clientIp(request);
  const now = Date.now();
  const entry = failedAttempts.get(ip);
  if (entry && now - entry.first > WINDOW_MS) failedAttempts.delete(ip);
  const current = failedAttempts.get(ip);
  if (current && current.count >= MAX_FAILS) {
    return NextResponse.json({ error: 'Demasiados intentos' }, { status: 429 });
  }

  const pin = request.headers.get('x-crm-pin') || '';
  if (pin && safeEqual(pin, CRM_PIN)) {
    failedAttempts.delete(ip);
    return null;
  }

  if (current) current.count += 1;
  else failedAttempts.set(ip, { count: 1, first: now });
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

const hasPostgres = Boolean(process.env.POSTGRES_URL || process.env.DATABASE_URL);

let tableInitialized = false;
async function ensurePostgresTable() {
  if (tableInitialized) return;
  await sql`
    CREATE TABLE IF NOT EXISTS crm_leads (
      id VARCHAR(255) PRIMARY KEY,
      data JSONB NOT NULL,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  tableInitialized = true;
}

export async function GET(request: Request) {
  const authError = checkAuth(request);
  if (authError) return authError;

  try {
    if (hasPostgres) {
      await ensurePostgresTable();
      const { rows } = await sql`
        SELECT data FROM crm_leads 
        ORDER BY COALESCE(data->>'fecha', '') DESC, updated_at DESC;
      `;
      return NextResponse.json(rows.map(r => r.data));
    } else {
      if (!fs.existsSync(dataFile)) {
        fs.writeFileSync(dataFile, '[]');
      }
      const data = fs.readFileSync(dataFile, 'utf8');
      return NextResponse.json(JSON.parse(data));
    }
  } catch (error: any) {
    console.error('Error fetching CRM leads:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const authError = checkAuth(request);
  if (authError) return authError;

  try {
    const payload = await request.json();

    // Support single contact or bulk import array
    const contacts = Array.isArray(payload) ? payload : (payload.contactos && Array.isArray(payload.contactos)) ? payload.contactos : [payload];

    if (hasPostgres) {
      await ensurePostgresTable();
      for (const contact of contacts) {
        if (!contact.id) continue;
        await sql`
          INSERT INTO crm_leads (id, data, updated_at)
          VALUES (${contact.id}, ${JSON.stringify(contact)}, NOW())
          ON CONFLICT (id) DO UPDATE 
          SET data = ${JSON.stringify(contact)}, updated_at = NOW();
        `;
      }
      return NextResponse.json({ success: true, count: contacts.length });
    } else {
      let data: any[] = [];
      if (fs.existsSync(dataFile)) {
        data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
      }

      for (const contact of contacts) {
        if (!contact.id) continue;
        const existingIndex = data.findIndex((c: any) => c.id === contact.id);
        if (existingIndex > -1) {
          data[existingIndex] = contact;
        } else {
          data.push(contact);
        }
      }

      fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
      return NextResponse.json({ success: true, count: contacts.length });
    }
  } catch (error: any) {
    console.error('Error saving CRM leads:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const authError = checkAuth(request);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 });
    }

    if (hasPostgres) {
      await ensurePostgresTable();
      await sql`DELETE FROM crm_leads WHERE id = ${id};`;
    } else {
      if (fs.existsSync(dataFile)) {
        let data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
        data = data.filter((c: any) => c.id !== id);
        fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting CRM lead:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
