import Articles from '../components/Articles/Articles';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import '../styles/normalize.css';
import '../styles/index.css';
import { useEffect } from 'react';

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
			<Header />
			<Articles />
			<Footer />
		</>
	);
};

export default Index;
