import Articles from '../components/Articles/Articles';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import '../styles/normalize.css';
import '../styles/index.css';
import '../styles/cursor.css';
import { useEffect } from 'react';
import Head from 'next/head';

const Index = () => {
	useEffect(() => {
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
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1.0, maximum-scale=1.0'
				/>
			</Head>
			<Header />
			<Articles />
			<Footer />
		</>
	);
};

export default Index;
