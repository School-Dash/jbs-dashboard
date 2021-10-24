import Head from 'next/head';
import Link from 'next/link';

export default function Layout({ children }) {
	return (
		<>
			<Head>
				<link rel="icon" href="/favicon.ico" />
				<title>JBS Dashboard - Live Bell Schedule</title>
				<meta name="author" content="Eli Front" />
				<meta
					name="description"
					content="JBS Dashboard. Has a live bell schedule and a list of all schedules. Probably not liable for you missing class."
				/>
				<link rel="apple-touch-icon" href="/favicon.ico" />
				<meta name="apple-mobile-web-app-title" content="JBS Dash" />
			</Head>
			<body className="bg-gradient-to-r from-green-400 to-blue-500 w-full h-full bg-no-repeat min-h-screen">
				<header>
					<nav className="w-full bg-opacity-50 bg-white p-5 fixed backdrop-filter backdrop-blur-md">
						<Link href="/">
							<a className="mx-2 font-semibold text-2xl p-2 bg-white bg-opacity-40 rounded-md transition-color duration-200 hover:bg-opacity-20">
								Home
							</a>
						</Link>
						<Link href="/schedules">
							<a className="mx-2 font-semibold text-2xl p-2 bg-white bg-opacity-40 rounded-md transition-color duration-200 hover:bg-opacity-20">
								Schedules
							</a>
						</Link>
						<Link href="/share">
							<a className="mx-2 font-semibold text-2xl p-2 bg-white bg-opacity-40 rounded-md transition-color duration-200 hover:bg-opacity-20">
								Share
							</a>
						</Link>
					</nav>
				</header>
				{children}
			</body>
		</>
	);
}
