import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
export async function POST(req: Request) {
	const formData = await req.formData()
	let data = {
		name: formData.get('name') as string,
		email: formData.get('email') as string,
		message: formData.get('message') as string,
	}
	const mail = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.MAIL,
			pass: process.env.PASS,
		},
	})
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
			{
				status: 200,
			}
		)
	} else if (info.rejected) {
		return NextResponse.json(
			{ status: 'error', info: info.response },
			{
				status: 400,
			}
		)
	}
}
