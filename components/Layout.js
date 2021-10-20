import Head from 'next/head';
import Link from 'next/link';

export default function Layout({ children }) {
	return (
		<>
			<Head>
				<link rel="icon" href="/favicon.ico" />
				<title>JBS Dashboard</title>
				<meta name="author" content="Eli Front" />
				<meta name="description" content="JBS Dashboard" />
				<link rel="apple-touch-icon" href="/favicon.ico" />
				<meta name="apple-mobile-web-app-title" content="JBS Dash" />
			</Head>
			<header>
				<nav className="w-full bg-opacity-50 bg-white p-5 fixed">
					<Link href="/">
						<a className="mx-2 font-semibold text-2xl p-2 bg-white bg-opacity-30 rounded-md transition-color duration-200 hover:bg-opacity-20">
							Home
						</a>
					</Link>
					<Link href="/schedules">
						<a className="mx-2 font-semibold text-2xl p-2 bg-white bg-opacity-30 rounded-md transition-color duration-200 hover:bg-opacity-20">
							Schedules
						</a>
					</Link>
				</nav>
			</header>
			{children}
		</>
	);
}
