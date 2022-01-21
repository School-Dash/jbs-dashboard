import Link from 'next/link';
import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/dist/client/router';

export default function Layout({ children }) {
	const [isOpen, setIsOpen] = useState(false);

	console.log(useRouter().basePath);
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
				<nav className="w-screen bg-opacity-50 bg-white p-5 fixed backdrop-filter backdrop-blur-md z-10 hidden md:block">
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
					<a
						href="https://www.sagedining.com/menus/jbs"
						rel="noopener noreferrer"
						target="_blank"
						className="mx-2 font-semibold text-2xl p-2 bg-white bg-opacity-40 rounded-md transition-color duration-200 hover:bg-opacity-20"
					>
						Lunch
					</a>
					<Link href="/share">
						<a className="mx-2 font-semibold text-2xl p-2 bg-white bg-opacity-40 rounded-md transition-color duration-200 hover:bg-opacity-20">
							Share
						</a>
					</Link>
				</nav>
				<nav className="w-screen bg-opacity-50 bg-white p-5 fixed backdrop-filter backdrop-blur-md z-10 fixed block md:hidden">
					<button
						onClick={() => setIsOpen(!isOpen)}
						className='className="mx-2 font-semibold text-2xl p-2 bg-white bg-opacity-40 rounded-md transition-color duration-200 hover:bg-opacity-20'
					>
						Menu
					</button>
					{isOpen ? (
						<div className="flex flex-col mt-3 ">
							<Link href="/">
								<a className="my-2 text-center font-semibold text-2xl p-2 bg-white bg-opacity-40 rounded-md transition-color duration-200 hover:bg-opacity-20">
									Home
								</a>
							</Link>
							<Link href="/schedules">
								<a className="my-2 text-center font-semibold text-2xl p-2 bg-white bg-opacity-40 rounded-md transition-color duration-200 hover:bg-opacity-20">
									Schedules
								</a>
							</Link>
							<Link href="/quiet-places">
								<a className="my-2 text-center font-semibold text-2xl p-2 bg-white bg-opacity-40 rounded-md transition-color duration-200 hover:bg-opacity-20">
									Quiet Places
								</a>
							</Link>
							<a
								href="https://www.sagedining.com/menus/jbs"
								rel="noopener noreferrer"
								target="_blank"
								className="my-2 text-center font-semibold text-2xl p-2 bg-white bg-opacity-40 rounded-md transition-color duration-200 hover:bg-opacity-20"
							>
								Lunch
							</a>
							<Link href="/share">
								<a className="my-2 text-center font-semibold text-2xl p-2 bg-white bg-opacity-40 rounded-md transition-color duration-200 hover:bg-opacity-20">
									Share
								</a>
							</Link>
						</div>
					) : (
						<></>
					)}
				</nav>
			</header>
			{children}
		</>
	);
}
