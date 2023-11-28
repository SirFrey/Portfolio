import nodemailer from 'nodemailer'
export async function POST(req: Request) {
	const formData = await req.formData()
	let data = {
		name: formData.get('name') as string,
		email: formData.get('email') as string,
		message: formData.get('message') as string,
	}
	const mail = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: {
			user: process.env.mail,
			pass: process.env.pass,
		},
	})
	let info: any = await new Promise((resolve, reject) => {
		mail.sendMail(
			{
				from: process.env.mail,
				to: data.email,
				replyTo: process.env.mail,
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
		return Response.json(
			{ status: 'success' },
			{
				status: 200,
			}
		)
	} else if (info.rejected) {
		return Response.json(
			{ status: 'error', info: info.response },
			{
				status: 500,
			}
		)
	}
}
