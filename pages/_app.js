import 'tailwindcss/tailwind.css';
import '../styles/global.css';
import TagManager from 'react-gtm-module';
import { useEffect } from 'react';

const tagManagerArgs = {
	gtmId: 'GTM-K22SFTT'
};

function MyApp({ Component, pageProps }) {
	useEffect(() => {
		TagManager.initialize(tagManagerArgs);
	}, []);

	return <Component {...pageProps} />;
}

export default MyApp;
