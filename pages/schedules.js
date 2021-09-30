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
			<h1>schedules</h1>
			{Object.entries(SCHEDULES).map((item, i) => {
				return (
					<div key={i}>
						<h3>{SCHEDULE_DAY_TYPES[item[0]]}</h3>
						<table>
							<tbody>
								{item[1].map((period, j) => {
									const isCom = item[1][4][0] != 0; //checks if common period is blank [0,0]

									if (period[0] == 0) return;

									return (
										<tr key={`${j} ${i}`}>
											<th>{periodLabel(j, isCom)}</th>
											{period.map((_, k) => {
												const h = Math.floor(
													period[k] / 100
												);
												const m = period[k] % 100;

												return (
													<td key={`${k} ${j} ${i}`}>
														{h > 12 ? h - 12 : h}:
														{padZeros(m)}
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
		</Layout>
	);
}
