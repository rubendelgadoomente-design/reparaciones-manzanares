import { NextResponse } from 'next/server';
import crypto from 'crypto';

// El secreto vive en la variable de entorno CRM_PIN (Vercel → Settings → Environment Variables).
// Si no está definida, el CRM queda cerrado (fail closed).
const CRM_PIN = process.env.CRM_PIN || '';

// Rate limit básico de intentos fallidos por IP. Es memoria de la instancia
// serverless: frena fuerza bruta casual, no un ataque distribuido.
const MAX_FAILS = 10;
const WINDOW_MS = 15 * 60 * 1000;
const failedAttempts = new Map<string, { count: number; first: number }>();

export function clientIp(request: Request): string {
  return (request.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unknown';
}

function safeEqual(a: string, b: string): boolean {
  const ha = crypto.createHash('sha256').update(a).digest();
  const hb = crypto.createHash('sha256').update(b).digest();
  return crypto.timingSafeEqual(ha, hb);
}

// Devuelve null si está autorizado, o la respuesta de error a enviar.
export function checkAuth(request: Request): NextResponse | null {
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
