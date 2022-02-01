import Calendar from '../../../lib/calendar.js';

export default async function handler(req, res) {
	if (
		req.query.year == null ||
		req.query.month == null ||
		req.query.day == null
	) {
		res.status(401).json({
			message: 'invalid date. must include year, month & day.'
		});
	} else {
		await fetch(
			'https://calendar.google.com/calendar/ical/daily.schedule@jburroughs.org/public/basic.ics'
		)
			.then(response => {
				return response.text();
			})
			.then(data => {
				let cal = new Calendar(data);
				const dayType = cal.getDayType(
					new Date(req.query.year, req.query.month - 1, req.query.day)
				);
				res.status(200).json({
					dayType: dayType,
					calendar: cal.getSchedule(dayType)
				});
			});
	}
}
