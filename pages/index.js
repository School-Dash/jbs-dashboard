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
			<h1 className="text-4xl font-medium font-serif mt-5">
				Day Type: {SCHEDULE_DAY_TYPES[dayType]}
			</h1>
			{dayType != 'NO_SCHOOL' ? (
				period <= 12 ? (
					<>
						<h2>{cal.formatPeriod(period)}</h2>
						<h2>
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
					<h2>School Over</h2>
				)
			) : (
				<>No School Stuff</>
			)}
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
