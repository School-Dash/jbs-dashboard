import 'tailwindcss/tailwind.css';
import '../styles/global.css';
import TagManager from 'react-gtm-module';
import { useEffect } from 'react';
import Script from 'next/script';

const tagManagerArgs = {
	gtmId: 'GTM-K22SFTT'
};

function MyApp({ Component, pageProps }) {
	useEffect(() => {
		TagManager.initialize(tagManagerArgs);
	}, []);

	return (
		<>
			<Script
				id="Adsense-id"
				async
				strategy="afterInteractive"
				onError={e => {
					console.error('Script failed to load', e);
				}}
				src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3740922836819487"
			/>
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
