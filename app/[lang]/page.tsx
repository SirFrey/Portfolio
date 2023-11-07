import Articles from '@components/Articles/Articles'
import Footer from '@components/Footer/Footer'
import Header from '@components/Header/Header'
const PortfolioPage = ({ params: { lang } }) => {
	return (
		<main>
			{/* <Cursor /> */}
			<Header />
			<Articles />
			<Footer />
		</main>
	)
}

export default PortfolioPage
