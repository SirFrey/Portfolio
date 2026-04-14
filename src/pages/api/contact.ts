export const prerender = false

import type { APIRoute } from 'astro'
import nodemailer from 'nodemailer'
import { verifyToken } from '@assets/utils/server'

export const POST: APIRoute = async ({ request }) => {
  const reqData = await request.formData()
  const data = {
    name: reqData.get('name') as string,
    email: reqData.get('email') as string,
    message: reqData.get('message') as string,
    turnstile: reqData.get('cf-turnstile-response') as string,
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

  const info: any = await new Promise((resolve, reject) => {
    mail.sendMail(
      {
        from: import.meta.env.MAIL,
        to: import.meta.env.MAIL,
        subject: `Message from ${data.name}`,
        html: `<p><b>Name:</b> ${data.name}</p><p><b>Email:</b> ${data.email}</p><p><b>Message:</b> ${data.message}</p>`,
      },
      (err, i) => {
        if (err) reject(err)
        else resolve(i)
      }
    )
  })

  if (info.accepted) {
    return Response.json({ status: 'success', info: info.response }, { status: 200 })
  }
  return Response.json({ status: 'error', info: info.response }, { status: 400 })
}
