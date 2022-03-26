import Layout from '../components/Layout.js';
import Calendar from '../lib/calendar.js';
import { SCHEDULES, SCHEDULE_DAY_TYPES } from '../lib/schedule.js';
import padZeros from '../lib/padZeros.js';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { periodLabel } from './schedules.js';
import Script from 'next/script';
import bookCover from '../public/book-cover.png';

export default function Home({ calData }) {
	let cal = new Calendar(calData);

	const [currentTime, setTime] = useState(new Date());
	// const currentTime = new Date('2021-10-22T11:21:00');

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
			<main className="pt-36">
				<a
					target="_blank"
					href="https://www.amazon.com/Brief-Wondrous-Life-Oscar-Wao/dp/1594483299?&_encoding=UTF8&tag=schooldash-20&linkCode=ur2&linkId=41f44223fc82d956336d90a7d13ae438&camp=1789&creative=9325"
					rel="noreferrer"
					className="flex flex-col items-center mb-4"
				>
					<Image
						width={100}
						height={160}
						src={bookCover}
						alt="book cover"
					></Image>
					<p className="p-5 font-semibold">
						Cheaper than the bookstore.
					</p>
				</a>

				<h1 className="text-2xl font-semibold font-sans p-5 text-center bg-opacity-50 bg-white w-min m-auto rounded-lg">
					{SCHEDULE_DAY_TYPES[dayType]}
				</h1>
				{dayType != 'NO_SCHOOL' ? (
					period != null && !cal.isEndOfDay(period, dayType) ? (
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
							<div className="bg-opacity-50 bg-white w-min rounded-lg px-5 my-9 m-auto">
								<h3 className="text-2xl py-3">
									{SCHEDULE_DAY_TYPES[dayType]}
								</h3>
								<table>
									<tbody>
										{SCHEDULES[dayType].map((period, j) => {
											const isCom =
												SCHEDULES[dayType][4][0] != 0; //checks if common period is blank [0,0]

											if (period[0] == 0) return;

											return (
												<tr key={`${j}`}>
													<th className="text-left pr-3">
														{periodLabel(j, isCom)}
													</th>
													{period.map((_, k) => {
														const h = Math.floor(
															period[k] / 100
														);
														const m =
															period[k] % 100;

														return (
															<td
																key={`${k} ${j}`}
															>
																{h > 12
																	? h - 12
																	: h}
																:{padZeros(m)}
															</td>
														);
													})}
												</tr>
											);
										})}
									</tbody>
								</table>
							</div>
						</>
					) : (
						<h2 className="text-center text-3xl p-4">
							School&apos;s Over
						</h2>
					)
				) : (
					<div className="m-auto">No School Stuff</div>
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
		},
		revalidate: 10000
	};
}
