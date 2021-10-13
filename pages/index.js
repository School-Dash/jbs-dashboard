import Layout from '../components/Layout.js';
import Calendar from '../lib/calendar.js';
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
			<main className="bg-gradient-to-r from-green-400 to-blue-500 w-full h-screen fixed">
				<h1 className="text-4xl font-medium font-serif pt-5 text-center">
					Day Type: {SCHEDULE_DAY_TYPES[dayType]}
				</h1>
				{dayType != 'NO_SCHOOL' ? (
					period <= 12 ? (
						<>
							<h2 className="text-center text-3xl p-4">
								{cal.formatPeriod(period)}
							</h2>
							<h2 className="text-center text-3xl p-4">
								Period ends in{' '}
								{cal.getEndOfPeriod(dayType, period) -
									Math.ceil(
										parseInt(cal.formatTime(currentTime)) +
											currentTime.getSeconds() / 100.0
									)}
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
