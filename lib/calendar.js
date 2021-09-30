import { formatToIcalDate } from './ics-utils.js';
import { SCHEDULE_DAY_TYPES, SCHEDULES } from './schedule.js';

export default function Calendar(cal) {
	this.cal = cal;
	this.allEvents = this.cal.split('END:VEVENT');

	this.getEvents = () => {
		return this.allEvents;
	};

	this.getDayType = date => {
		let daysEvents = [];
		if (date.getDay() == 6 || date.getDay() == 0) {
			return 'NO_SCHOOL';
		}
		// Add Summer Break Check

		// Add School Breaks Check

		let formattedDate = formatToIcalDate(date);

		for (let i = 0; i < this.allEvents.length; i++) {
			if (
				this.allEvents[i].includes(
					`DTSTART;VALUE=DATE:${formattedDate}`
				)
			) {
				for (let type in SCHEDULE_DAY_TYPES) {
					if (this.allEvents[i].includes(SCHEDULE_DAY_TYPES[type])) {
						return type;
					}
				}
			}
		}
		return 'REGULAR_DAY';
	};

	this.formatTime = date => {
		return `${date.getHours()}${date.getMinutes()}`;
	};

	this.getPeriod = (time, dayType) => {
		const schedule = SCHEDULES[dayType];
		for (let i = 0; i < schedule.length; i++) {
			if (time > schedule[i][0] && time < schedule[i][1]) {
				return i;
			}
		}
		return 10.5;
	};

	this.getEndOfPeriod = (dayType, period) => {
		if (period < 0 || period > 12) return null;
		if (period % 1 == 0) return SCHEDULES[dayType][period][1];
		return SCHEDULES[dayType][Math.round(period)][0];
	};
}
