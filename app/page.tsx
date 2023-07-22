'use client';

import { BlurryImageLoad } from '@assets/scripts/blurry-image-load';
import Articles from '@components/Articles/Articles';
import Footer from '@components/Footer/Footer';
import Header from '@components/Header/Header';
import Cursor from '@components/NewCursor/Cursor';
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
			<main>
				<Cursor />
				<Header />
				<Articles />
				<Footer />
			</main>
		</>
	);
};

export default PortfolioPage;
