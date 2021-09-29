import Layout from '../components/Layout.js';
import Calendar from '../lib/calendar.js';
import { SCHEDULE_DAY_TYPES } from '../lib/schedule.js';

export default function Home({ calData }) {
	let cal = new Calendar(calData);

	const dayType = cal.getDayType(new Date());

	return (
		<Layout>
			<h1 className="text-4xl font-medium font-serif mt-5">
				Day Type: {SCHEDULE_DAY_TYPES[dayType]}
			</h1>
			<h2>
				Period: {cal.getPeriod(cal.formatTime(new Date()), dayType)}
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
