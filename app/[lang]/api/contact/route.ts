import { verifyToken } from '@assets/utils/server'
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
export async function POST(req: Request) {
  const reqData = await req.formData()
  let data = {
    name: reqData.get('name') as string,
    email: reqData.get('email') as string,
    message: reqData.get('message') as string,
    turnstile: reqData.get('cf-turnstile-response') as string,
  }
  const mail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL,
      pass: process.env.PASS,
    },
  })
  let formData = new FormData()
  formData.append('secret', process.env.TURNSTILE_SECRET_KEY as string)
  formData.append('response', data.turnstile)

  const isValidToken = await verifyToken(formData)
  if (!isValidToken) {
    return NextResponse.json(
      { status: 'error', info: 'invalid turnstile' },
      { status: 400 }
    )
  }
  let info: any = await new Promise((resolve, reject) => {
    mail.sendMail(
      {
        from: process.env.MAIL,
        to: process.env.MAIL,
        subject: `Message from ${data.name}`,
        html: `<p><b>Name:</b> ${data.name}</p><p><b>Email:</b> ${data.email}</p><p><b>Message:</b> ${data.message}</p>`,
      },
      (err, info) => {
        if (err) {
          reject(err)
        } else {
          resolve(info)
        }
      }
    )
  })
  if (info.accepted) {
    return NextResponse.json(
      { status: 'success', info: info.response },
      { status: 200 }
    )
  } else if (info.rejected) {
    return NextResponse.json(
      { status: 'error', info: info.response },
      { status: 400 }
    )
  }
}
