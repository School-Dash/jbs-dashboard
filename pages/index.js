import Layout from '../components/Layout.js';
import Calendar from '../lib/calendar.js';
import { SCHEDULES, SCHEDULE_DAY_TYPES } from '../lib/schedule.js';
import padZeros from '../lib/padZeros.js';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { periodLabel } from './schedules.js';
import bookCover from '../public/book-cover.png';

export default function Home({ calData }) {
	let cal = new Calendar(calData);

	const [currentTime, setTime] = useState(new Date());
	// const currentTime = new Date('2021-10-22T11:21:00');

	const dayType = cal.getDayType(currentTime);

	let period = cal.getPeriod(cal.formatTime(currentTime), dayType);

	const ads = [
		{
			text: 'ACT Textbook',
			image: 'https://i.imgur.com/TuYwU3g.jpg',
			link: 'https://www.amazon.com/Official-2021-2022-Practice-Online-Content/dp/1119787343/ref=sr_1_1?crid=2P6Q1O3FR540T&amp;keywords=act+prep+book&amp;qid=1648442166&amp;sprefix=act+prep+book%252Caps%252C92&amp;sr=8-1&_encoding=UTF8&tag=schooldash-20&linkCode=ur2&linkId=03b24d7eddbf9a0d243452a6a9617161&camp=1789&creative=9325',
			width: 100,
			height: 128
		},
		{
			text: 'Midliner Zebra Highlighter',
			image: 'https://i.imgur.com/QlbKgp6.jpg',
			link: 'https://www.amazon.com/Zebra-Pen-Mildliner-Highlighter-Assorted/dp/B0752WWCTN/ref=sr_1_5?crid=2Z7BA24TMW40A&amp;keywords=mildliner%252Bzebra%252Bhighlighters&amp;qid=1648409678&amp;sprefix=mildli%252Cstripbooks%252C73&amp;sr=8-5&amp;th=1&_encoding=UTF8&tag=schooldash-20&linkCode=ur2&linkId=ed7d9c9d8d58ab63aa603710fae71102&camp=1789&creative=9325',
			width: 193,
			height: 150
		},
		{
			text: 'AirpodsPro Discount',
			image: 'https://i.imgur.com/6LiBnOW.jpg',
			link: 'https://www.amazon.com/Apple-MLWK3AM-A-AirPods-Pro/dp/B09JQMJHXY/ref=sr_1_1_sspa?crid=32YM7QAX83OCK&amp;keywords=airpods&amp;qid=1648409779&amp;sprefix=airpod%252Caps%252C102&amp;sr=8-1-spons&amp;psc=1&amp;spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUE1VkI0WVBXSTJQNEkmZW5jcnlwdGVkSWQ9QTA2NTI3MTROS0U4WVJIUDFNTE4mZW5jcnlwdGVkQWRJZD1BMDU5MzA2MTdHSUxSNU00Q1QwOSZ3aWRnZXROYW1lPXNwX2F0ZiZhY3Rpb249Y2xpY2tSZWRpcmVjdCZkb05vdExvZ0NsaWNrPXRydWU=&_encoding=UTF8&tag=schooldash-20&linkCode=ur2&linkId=29d1235221837491be419c1a4623cab7&camp=1789&creative=9325',
			width: 138,
			height: 150
		}
	];

	const [currentAd, setAd] = useState(-1);

	useEffect(() => {
		const interval = setInterval(() => {
			setTime(new Date());
		}, 1000);

		setAd(Math.floor(Math.random() * ads.length));

		return () => clearInterval(interval);
	}, [ads.length]);

	return (
		<Layout>
			<main className="pt-36">
				{currentAd != -1 && (
					<a
						target="_blank"
						href={ads[currentAd].link}
						rel="noreferrer"
						className="flex flex-col items-center mb-4"
					>
						<Image
							width={ads[currentAd].width}
							height={ads[currentAd].height}
							src={ads[currentAd].image}
							alt="product image"
						></Image>
						<p className="p-5 font-semibold">
							{ads[currentAd].text}
						</p>
					</a>
				)}
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
