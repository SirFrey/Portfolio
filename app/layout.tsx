import { Metadata } from 'next';
import '@styles/normalize.css';
import '@styles/index.css';
import '@styles/cursor.css';
import '@styles/blurry-load.min.css';

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
	},
	themeColor: '#495c83',
	twitter: {
		card: 'summary_large_image',
	},
	viewport: 'width=device-width, initial-scale=1.0',
	other: {
		'google-site-verification': 'GxY_RzqX7Z-W9_U_2_9jW6Q-VjvC-jWn-E_0Q_X_Ws',
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<head>
				<link
					rel=' stylesheet'
					href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css'
					integrity='sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A=='
					crossOrigin='anonymous'
					referrerPolicy='no-referrer'
				/>
			</head>
			<body>{children}</body>
		</html>
	);
}
