import Layout from '../components/Layout.js';
import Calendar from '../lib/calendar.js';
import { SCHEDULE_DAY_TYPES } from '../lib/schedule.js';
import padZeros from '../lib/padZeros.js';

export default function Home({ calData }) {
	let cal = new Calendar(calData);

	let now = new Date();

	const dayType = cal.getDayType(now);

	let period = cal.getPeriod(cal.formatTime(now), dayType);

	return (
		<Layout>
			<h1 className="text-4xl font-medium font-serif mt-5">
				Day Type: {SCHEDULE_DAY_TYPES[dayType]}
			</h1>
			<h2>Period: {period}</h2>
			<h2>
				Period ends in{' '}
				{cal.getEndOfPeriod(dayType, period) - cal.formatTime(now)}:
				{padZeros(`${60 - now.getSeconds()}`)}
			</h2>
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
