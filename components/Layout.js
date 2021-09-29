import Head from 'next/head';

export default function Layout({ children }) {
	return (
		<>
			<Head>
				<link rel="icon" href="/favicon.ico" />
				<title>JBS Dashboard</title>
				<meta name="author" content="Eli Front" />
				<meta name="description" content="JBS Dashboard" />
			</Head>
			{children}
		</>
	);
}
