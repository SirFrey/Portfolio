export const prerender = false

import type { APIRoute } from 'astro'
import nodemailer from 'nodemailer'
import type SMTPTransport from 'nodemailer/lib/smtp-transport'
import { verifyToken } from '@assets/utils/server'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const LIMITS = { name: 100, email: 254, message: 5000 }

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, c => {
    switch (c) {
      case '&':
        return '&amp;'
      case '<':
        return '&lt;'
      case '>':
        return '&gt;'
      case '"':
        return '&quot;'
      default:
        return '&#39;'
    }
  })

export const POST: APIRoute = async ({ request }) => {
  const reqData = await request.formData()
  const data = {
    name: (reqData.get('name') as string)?.trim() ?? '',
    email: (reqData.get('email') as string)?.trim() ?? '',
    message: (reqData.get('message') as string)?.trim() ?? '',
    turnstile: reqData.get('cf-turnstile-response') as string,
  }

  if (
    !data.name ||
    data.name.length > LIMITS.name ||
    !EMAIL_RE.test(data.email) ||
    data.email.length > LIMITS.email ||
    !data.message ||
    data.message.length > LIMITS.message
  ) {
    return Response.json(
      { status: 'error', info: 'invalid input' },
      { status: 400 }
    )
  }

  const tsForm = new FormData()
  tsForm.append('secret', import.meta.env.TURNSTILE_SECRET_KEY)
  tsForm.append('response', data.turnstile)

  if (!(await verifyToken(tsForm))) {
    return Response.json(
      { status: 'error', info: 'invalid turnstile' },
      { status: 400 }
    )
  }

  const mail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: import.meta.env.MAIL,
      pass: import.meta.env.PASS,
    },
  })

  const info = await new Promise<SMTPTransport.SentMessageInfo>(
    (resolve, reject) => {
      mail.sendMail(
        {
          from: import.meta.env.MAIL,
          to: import.meta.env.MAIL,
          subject: `Message from ${data.name}`,
          replyTo: data.email,
          html: `<p><b>Name:</b> ${escapeHtml(data.name)}</p><p><b>Email:</b> ${escapeHtml(data.email)}</p><p><b>Message:</b> ${escapeHtml(data.message)}</p>`,
        },
        (err, i) => {
          if (err) reject(err)
          else resolve(i)
        }
      )
    }
  )

  if (info.accepted) {
    return Response.json(
      { status: 'success', info: info.response },
      { status: 200 }
    )
  }
  return Response.json(
    { status: 'error', info: info.response },
    { status: 400 }
  )
}
