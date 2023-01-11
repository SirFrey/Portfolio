import Articles from '../components/Articles/Articles';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';

import { useEffect } from 'react';
import Head from 'next/head';
import Cursor from '../components/Cursor/Cursor';
import { BlurryImageLoad } from '../public/scripts/blurry-image-load.min';
const Index = () => {
	useEffect(() => {
		const blurryImageLoad = new BlurryImageLoad();
		blurryImageLoad.load();
		console.log(document);
		const observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add('show');
				} else {
					entry.target.classList.remove('show');
				}
			});
		});
		const sections = document.querySelectorAll(`.hidden`);
		sections.forEach(el => observer.observe(el));
	}, []);
	return (
		<>
			<Head>
				<title>Moises&apos;s Portfolio</title>
				<link rel='icon' href='/images/favicon.ico' />
				<meta
					name='google-site-verification'
					content='aDQkkXcG9tmZTNfGzEx5FIGmfyaeoA6vrPn1rvJxNvM'
				/>
				<meta charSet='UTF-8' />
				<meta
					name='description'
					content='Este es mi portfolio web, sientete libre de echarle un vistazo. 😊'
				/>

				<meta name='keywords' content='Portfolio, SirFrey' />
				<meta name='language' content='spanish' />
				<meta name='audience' content='all' />
				<meta property='og:title' content='Bienvenido a mi web 🤓' />
				<meta property='og:type' content='website' />
				<meta property='og:site_name' content='Portfolio' />
				<meta
					property='og:url'
					content='https://portfolio-sirfrey.vercel.app/'
				/>
				<meta
					property='og:description'
					content='Sientete libre de echarle un vistazo. 😎'
				/>
				<meta
					property='og:image'
					content='https://i.ibb.co/ScBCCz7/portfolio.jpg'
				/>
				<meta property='og:image:width' content='630' />
				<meta property='og:image:height' content='630' />
				<meta name='theme-color' content='#495c83' />
				{/* <meta itemProp='name' content="Moises's Portfolio" /> */}
				{/* <meta
					itemProp='description'
					content='Este es mi portfolio web, sientete libre de echarle un vistazo a mi pagina 😊'
				/>
				<meta
					itemProp='image'
					content='http://i.ibb.co/ScBCCz7/portfolio.jpg'
				/> */}
				<link
					rel=' stylesheet'
					href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css'
					integrity='sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A=='
					crossOrigin='anonymous'
					referrerPolicy='no-referrer'
				/>
			</Head>
			<Cursor />
			<Header />
			<Articles />
			<Footer />
		</>
	);
};

export default Index;
