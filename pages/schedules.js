import Layout from '../components/Layout.js';
import { SCHEDULES, SCHEDULE_DAY_TYPES } from '../lib/schedule.js';
import padZeros from '../lib/padZeros.js';

export default function Schedules() {
	function periodLabel(index, isCom) {
		if (index < 4) {
			return index == 0 ? 'Assembly' : `Period ${index}`;
		} else if (index == 4 && isCom) {
			return 'Common';
		}
		return `Period ${index - 1}`;
	}

	return (
		<Layout>
			<body className="bg-gradient-to-r from-green-400 to-blue-500 w-full p-10">
				<header>
					<h1 className="font-extrabold text-4xl py-5 text-center">
						Schedules
					</h1>
				</header>
				<main className="flex flex-wrap justify-around px-20">
					{Object.entries(SCHEDULES).map((item, i) => {
						return (
							<div
								key={i}
								className="bg-opacity-50 bg-white w-min rounded-lg px-5 my-7 mx-10"
							>
								<h3 className="text-2xl py-3">
									{SCHEDULE_DAY_TYPES[item[0]]}
								</h3>
								<table>
									<tbody>
										{item[1].map((period, j) => {
											const isCom = item[1][4][0] != 0; //checks if common period is blank [0,0]

											if (period[0] == 0) return;

											return (
												<tr key={`${j} ${i}`}>
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
																key={`${k} ${j} ${i}`}
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
						);
					})}
				</main>
			</body>
		</Layout>
	);
}
