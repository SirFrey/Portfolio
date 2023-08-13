'use client';

import Articles from '@components/Articles/Articles';
import Footer from '@components/Footer/Footer';
import Header from '@components/Header/Header';
import Cursor from '@components/NewCursor/Cursor';
const PortfolioPage = () => {
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
