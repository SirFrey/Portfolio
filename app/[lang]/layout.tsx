import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import '@styles/blurry-load.min.css'
import '@styles/index.css'
import '@styles/normalize.css'
import { Metadata, Viewport } from 'next'
import { Poiret_One } from 'next/font/google'
config.autoAddCss = false
const Poiret = Poiret_One({
	weight: ['400'],
	subsets: ['latin'],
})
export const viewport: Viewport = {
	themeColor: '#495c83',
	width: 'device-width',
	initialScale: 1,
	userScalable: false,
}
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
	twitter: {
		card: 'summary_large_image',
	},
	other: {
		'google-site-verification': 'GxY_RzqX7Z-W9_U_2_9jW6Q-VjvC-jWn-E_0Q_X_Ws',
	},
}
export async function generateStaticParams() {
	return [{ lang: 'en' }, { lang: 'es' }]
}
export default function RootLayout({
	children,
	params: { lang },
}: {
	children: React.ReactNode
	params: any
}) {
	return (
		<html lang={lang} className={Poiret.className}>
			<body>{children}</body>
		</html>
	)
}
