'use client';

import { BlurryImageLoad } from '@assets/scripts/blurry-image-load.js';
import Articles from '@components/Articles/Articles.tsx';
import Cursor from '@components/Cursor/Cursor';
import Footer from '@components/Footer/Footer';
import Header from '@components/Header/Header';
import { useEffect } from 'react';

const PortfolioPage = () => {
	useEffect(() => {
		const blurryImageLoad = new BlurryImageLoad();
		blurryImageLoad.load();
		const observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add('show');
				} else if (entry.target.nodeName !== 'P') {
					entry.target.classList.remove('show');
				}
			});
		});
		const sections = document.querySelectorAll(`.hidden`);
		sections.forEach(el => observer.observe(el));
	}, []);

	return (
		<>
			<Cursor />
			<main>
				<Header />
				<Articles />
				<Footer />
			</main>
		</>
	);
};

export default PortfolioPage;
