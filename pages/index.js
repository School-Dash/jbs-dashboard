import Layout from '../components/Layout.js';
import Calendar from '../lib/calendar.js';

export default function Home({ dayType }) {
	return (
		<Layout>
			<h1 className="text-4xl font-medium font-serif mt-5">
				Day Type: {dayType}
			</h1>
		</Layout>
	);
}

export async function getStaticProps({ params }) {
	const dayType = await fetch(
		'https://calendar.google.com/calendar/ical/daily.schedule@jburroughs.org/public/basic.ics'
	)
		.then(response => {
			return response.text();
		})
		.then(data => {
			const cal = new Calendar(data);

			return cal.getDayType(new Date());
		});
	return {
		props: {
			dayType
		}
	};
}
