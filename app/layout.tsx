import '@styles/blurry-load.min.css'
import '@styles/fontAwesome/css/all.min.css'
import '@styles/index.css'
import '@styles/normalize.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
	metadataBase: new URL('https://moisesdev.vercel.app/'),
	title: 'Moises | Portfolio',
	description:
		'Este es mi portfolio web, sientete libre de echarle un vistazo. 😊',
	icons: {
		icon: 'images/favicon.ico',
	},
	keywords: 'portfolio, web, developer, frontend, backend, fullstack',
	authors: [{ name: 'Moises', url: 'https://moisesdev.vercel.app' }],
	openGraph: {
		title: 'Bienvenido a mi web 🤓',
		type: 'website',
		siteName: 'Moises | Portfolio',
		url: 'https://moisesdev.vercel.app',
		description: 'Sientete libre de echarle un vistazo. 😎',
		images: 'https://i.ibb.co/ScBCCz7/portfolio.jpg',
	},
	themeColor: '#495c83',
	twitter: {
		card: 'summary_large_image',
	},
	viewport: 'width=device-width, initial-scale=1.0, user-scalable=no',
	other: {
		'google-site-verification': 'GxY_RzqX7Z-W9_U_2_9jW6Q-VjvC-jWn-E_0Q_X_Ws',
	},
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html>
			<body>{children}</body>
		</html>
	)
}
