import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		return (
			<Html lang="en">
				<Head>
					<link rel="icon" href="/favicon.ico" />
					<meta name="author" content="Eli Front" />
					<meta
						name="description"
						content="JBS Dashboard. Has a live bell schedule and a list of all schedules. Probably not liable for you missing class."
					/>
					<link rel="apple-touch-icon" href="/favicon.ico" />
					<meta
						name="apple-mobile-web-app-title"
						content="JBS Dash"
					/>
				</Head>
				<body className="bg-gradient-to-r from-green-400 to-blue-500 w-screen h-full bg-no-repeat min-h-screen max-w-screen">
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
