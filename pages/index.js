import Layout from '../components/Layout.js';
import Calendar from '../lib/calendar.js';
import Link from 'next/link';
import { SCHEDULE_DAY_TYPES } from '../lib/schedule.js';
import padZeros from '../lib/padZeros.js';
import { useState, useEffect } from 'react';

export default function Home({ calData }) {
	let cal = new Calendar(calData);

	const [currentTime, setTime] = useState(new Date());

	const dayType = cal.getDayType(currentTime);

	let period = cal.getPeriod(cal.formatTime(currentTime), dayType);

	useEffect(() => {
		const interval = setInterval(() => {
			setTime(new Date());
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<Layout>
			<body className="bg-gradient-to-r from-green-400 to-blue-500 w-full h-screen ">
				<main className="p-5">
					<Link href="/schedules">
						<a className="font-semibold text-3xl p-3 bg-red-500 rounded-md">
							Schedules
						</a>
					</Link>

					<h1 className="text-2xl font-semibold font-sans p-5 text-center bg-opacity-50 bg-white w-min m-auto rounded-lg">
						{SCHEDULE_DAY_TYPES[dayType]}
					</h1>
					{dayType != 'NO_SCHOOL' ? (
						period <= 11 ? (
							<>
								<h2 className="text-center text-3xl p-4">
									{cal.formatPeriod(period, dayType)}
								</h2>
								<h2 className="text-center text-3xl p-4">
									Period ends in{' '}
									{cal.getTimeDifference(
										cal.formatTime(currentTime),
										cal.getEndOfPeriod(dayType, period)
									) - Math.min(currentTime.getSeconds(), 1)}
									:
									{padZeros(
										`${
											currentTime.getSeconds() == 0
												? 0
												: 60 - currentTime.getSeconds()
										}`
									)}
								</h2>
							</>
						) : (
							<h2 className="text-center text-3xl p-4">
								School Over
							</h2>
						)
					) : (
						<>No School Stuff</>
					)}
				</main>
			</body>
		</Layout>
	);
}

export async function getStaticProps({ params }) {
	const calData = await fetch(
		'https://calendar.google.com/calendar/ical/daily.schedule@jburroughs.org/public/basic.ics'
	)
		.then(response => {
			return response.text();
		})
		.then(data => {
			return data;
		});
	return {
		props: {
			calData
		}
	};
}
