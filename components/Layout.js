import Link from 'next/link';
import Head from 'next/head';

export default function Layout({ children }) {
	return (
		<>
			<Head>
				<title>JBS Dashboard - Live Bell Schedule</title>
				<meta
					name="keywords"
					content="JBS, John, Burroughs, School, Dashboard, Dash, Schedule, Bell"
				/>
			</Head>
			<header>
				<nav className="w-screen bg-opacity-50 bg-white p-5 fixed backdrop-filter backdrop-blur-md">
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
					<Link href="/quiet-places">
						<a className="mx-2 font-semibold text-2xl p-2 bg-white bg-opacity-40 rounded-md transition-color duration-200 hover:bg-opacity-20">
							Quiet Places
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
		</>
	);
}
