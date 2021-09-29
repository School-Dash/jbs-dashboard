import Layout from '../components/Layout.js';
import Schedule from '../lib/schedule.js';

export default function Schedules() {
	const s = new Schedule();

	const ref = {
		'Regular Schedule': s.Reg,
		'Late Start Day': s.Late,
		'Special Schedule': s.Special,
		'Common Day': s.Common
	};

	function periodLabel(index, isCom) {
		if (index < 4 || !isCom) {
			return index == 0 ? 'Assembly' : `Period ${index}`;
		} else if (index == 4) {
			return 'Common';
		} else {
			return `Period ${index - 1}`;
		}
	}

	return (
		<Layout>
			<h1>schedules</h1>
			{Object.entries(ref).map((item, i) => {
				return (
					<section key={i}>
						<h3>{item[0]}</h3>
						<table>
							{item[1].map((period, j) => {
								const isCom = item[1].length > 11;

								return (
									<tr key={j}>
										<th>{periodLabel(j, isCom)}</th>
										{period.map((_, k) => {
											const h = Math.floor(
												period[k] / 100
											);
											const m = period[k] % 100;
											return (
												<td key={j}>
													{h > 12 ? h - 12 : h}:
													{m < 10 ? `0${m}` : m}
												</td>
											);
										})}
									</tr>
								);
							})}
						</table>
					</section>
				);
			})}
		</Layout>
	);
}
