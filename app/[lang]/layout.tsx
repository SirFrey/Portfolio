import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import '@styles/index.css'
import '@styles/normalize.css'
import { Metadata, Viewport } from 'next'
import { Montserrat } from 'next/font/google'
import englishImg from '@public/images/englishImg.png'
import spanishImg from '@public/images/spanishImg.png'
config.autoAddCss = false
const League = Montserrat({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
})
export const viewport: Viewport = {
  themeColor: '#495c83',
  width: 'device-width',
  initialScale: 1,
  userScalable: false,
}
const spanishMetadata: Metadata = {
  metadataBase: new URL('https://moisesdev.vercel.app/es'),
  title: 'Moises | Portfolio',
  description:
    'Este es mi portfolio web, sientete libre de echarle un vistazo. 😊',
  icons: '/images/favicon.ico',
  keywords: 'portfolio, web, developer, frontend, backend, fullstack',
  authors: [{ name: 'Moises', url: 'https://moisesdev.vercel.app' }],
  openGraph: {
    title: 'Bienvenido a mi web 🤓',
    type: 'website',
    siteName: 'Moises | Portfolio',
    url: 'https://moisesdev.vercel.app',
    images: spanishImg.src,
    description: 'Sientete libre de echarle un vistazo. 😎',
  },
  twitter: {
    card: 'summary_large_image',
  },
  other: {
    'google-site-verification': 'GxY_RzqX7Z-W9_U_2_9jW6Q-VjvC-jWn-E_0Q_X_Ws',
  },
}
const englishMetadata: Metadata = {
  metadataBase: new URL('https://moisesdev.vercel.app/en'),
  title: 'Moises | Portfolio',
  description: 'This is my portfolio web, feel free to take a look. 😊',
  icons: '/images/favicon.ico',
  keywords: 'portfolio, web, developer, frontend, backend, fullstack',
  authors: [{ name: 'Moises', url: 'https://moisesdev.vercel.app' }],
  openGraph: {
    title: 'Welcome to my web 🤓',
    type: 'website',
    siteName: 'Moises | Portfolio',
    url: 'https://moisesdev.vercel.app',
    description: 'Feel free to take a look. 😎',
    images: englishImg.src,
  },
  twitter: {
    card: 'summary_large_image',
  },
}
export async function generateMetadata({
  params: { lang },
}): Promise<Metadata> {
  return lang === 'es' ? spanishMetadata : englishMetadata
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
    <html lang={lang} className={League.className}>
      <body>{children}</body>
    </html>
  )
}
