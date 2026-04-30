import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// In-memory rate limiter: max 3 requests per IP per minute
const rateLimitMap = new Map()
const WINDOW_MS = 60 * 1000
const MAX_REQUESTS = 3
const MAX_MAP_SIZE = 5000

function isRateLimited(ip) {
  const now = Date.now()
  const cutoff = now - WINDOW_MS
  const timestamps = (rateLimitMap.get(ip) ?? []).filter(t => t > cutoff)
  timestamps.push(now)
  // Cap map size to prevent memory exhaustion under distributed probing
  if (!rateLimitMap.has(ip) && rateLimitMap.size >= MAX_MAP_SIZE) {
    rateLimitMap.delete(rateLimitMap.keys().next().value)
  }
  rateLimitMap.set(ip, timestamps)
  return timestamps.length > MAX_REQUESTS
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function isValidEmail(email) {
  return /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Use last entry in x-forwarded-for: Vercel appends the real IP last,
  // so taking [0] would let attackers bypass the limiter with a spoofed header.
  const forwarded = req.headers['x-forwarded-for']
  const ip = (forwarded ? forwarded.split(',').at(-1).trim() : null)
    ?? req.headers['x-real-ip']
    ?? 'unknown'
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Demasiadas solicitudes, esperá un momento.' })
  }

  const { nombre, empresa, email, mensaje } = req.body ?? {}

  if (!nombre || !email || !mensaje) {
    return res.status(400).json({ error: 'Faltan campos requeridos' })
  }

  if (nombre.length > 100 || (empresa && empresa.length > 100) || email.length > 200 || mensaje.length > 2000) {
    return res.status(400).json({ error: 'Un campo excede el largo máximo permitido' })
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Email inválido' })
  }

  const safeNombre = escapeHtml(nombre)
  const safeEmpresa = escapeHtml(empresa ?? '')
  const safeEmail = escapeHtml(email)
  const safeMensaje = escapeHtml(mensaje).replace(/\n/g, '<br/>')

  try {
    await resend.emails.send({
      from: 'Franil Contacto <noreply@franil.com.uy>',
      to: 'abril@franil.com.uy',
      reply_to: email,
      subject: `Nuevo contacto: ${safeNombre}${safeEmpresa ? ` — ${safeEmpresa}` : ''}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #E87A1A;">Nueva consulta desde franil.com.uy</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #666;">Nombre</td><td style="padding: 8px 0; font-weight: bold;">${safeNombre}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Empresa</td><td style="padding: 8px 0;">${safeEmpresa || '—'}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Email</td><td style="padding: 8px 0;"><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
          </table>
          <hr style="margin: 16px 0; border-color: #eee;" />
          <p style="color: #666;">Mensaje:</p>
          <p style="background: #f5f5f5; padding: 16px; border-radius: 8px;">${safeMensaje}</p>
        </div>
      `,
    })

    return res.status(200).json({ ok: true })
  } catch (error) {
    return res.status(500).json({ error: 'Error al enviar el mensaje' })
  }
}
