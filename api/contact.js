import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { nombre, empresa, email, mensaje } = req.body

  if (!nombre || !email || !mensaje) {
    return res.status(400).json({ error: 'Faltan campos requeridos' })
  }

  try {
    await resend.emails.send({
      from: 'Franil Contacto <noreply@franil.com.uy>',
      to: 'abril@franil.com.uy',
      reply_to: email,
      subject: `Nuevo contacto: ${nombre}${empresa ? ` — ${empresa}` : ''}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #E87A1A;">Nueva consulta desde franil.com.uy</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #666;">Nombre</td><td style="padding: 8px 0; font-weight: bold;">${nombre}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Empresa</td><td style="padding: 8px 0;">${empresa || '—'}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
          </table>
          <hr style="margin: 16px 0; border-color: #eee;" />
          <p style="color: #666;">Mensaje:</p>
          <p style="background: #f5f5f5; padding: 16px; border-radius: 8px;">${mensaje.replace(/\n/g, '<br/>')}</p>
        </div>
      `,
    })

    return res.status(200).json({ ok: true })
  } catch (error) {
    return res.status(500).json({ error: 'Error al enviar el mensaje' })
  }
}
