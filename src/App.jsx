import Articles from '../Pages/Articles/Articles';
import Footer from '../Pages/Footer/Footer';
import Header from '../Pages/Header/Header';
// import ProgressBar from ''
import { useEffect } from 'react';
const App = () => {
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

export default App;
