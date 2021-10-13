import { formatToIcalDate } from './ics-utils.js';
import { SCHEDULE_DAY_TYPES, SCHEDULES } from './schedule.js';
import padZeros from '../lib/padZeros.js';

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
		return `${date.getHours()}${padZeros(date.getMinutes())}`;
	};

	this.getPeriod = (time, dayType) => {
		if (dayType == 'NO_SCHOOL') return null;
		const schedule = SCHEDULES[dayType];

		console.log(dayType);
		console.log(time);

		for (let i = 0; i < schedule.length; i++) {
			if (time >= schedule[i][0] && time < schedule[i][1]) {
				return i;
			} else if (
				(i > 0) & (i < 12) &&
				time >= schedule[i - 1][1] &&
				time < schedule[i][0]
			) {
				return i - 0.5;
			}
		}
		if (time < schedule[0][0]) return -0.5;
		return 12.5;
	};

	this.formatPeriod = period => {
		let pValue = period;
		if (period == 4) {
			return 'Common';
		} else if (period == 0) {
			return 'Assembly';
		} else if (period < 0) {
			return 'Before School';
		} else if (period > 12) {
			return 'After School';
		} else if (period > 4) {
			pValue = period - 1;
		}

		if (period % 1 == 0) {
			return `${period}`;
		}
		return `${this.formatPeriod(Math.floor(period))}→${this.formatPeriod(
			Math.ceil(period)
		)}`;
	};

	this.getEndOfPeriod = (dayType, period) => {
		if (period < 0 || period > 12) return null;
		if (period % 1 == 0) return SCHEDULES[dayType][period][1];
		return SCHEDULES[dayType][Math.round(period)][0];
	};
}
