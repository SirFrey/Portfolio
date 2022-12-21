import '../styles/normalize.css';
import '../styles/index.css';
import '../styles/cursor.css';

// eslint-disable-next-line react/prop-types
export default function App({ Component, pageProps }) {
	return <Component {...pageProps} />;
}
