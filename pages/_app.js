import Articles from '../components/Articles/Articles';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import './normalize.css';
import './index.css';
import { useEffect } from 'react';
// import IndexPage from '../components/IndexPage/IndexPage';
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
			{/* <IndexPage /> */}
			<Header />
			<Articles />
			<Footer />
		</>
	);
};

export default Index;