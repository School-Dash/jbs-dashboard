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
			<Script id="MediaAdScript">
				{`
				window._mNHandle = window._mNHandle || {};
				window._mNHandle.queue = window._mNHandle.queue || [];
				medianet_versionId = "3121199";`}
			</Script>
			<Script
				src="https://contextual.media.net/dmedianet.js?cid=8CU87OT16"
				async="async"
			></Script>
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
