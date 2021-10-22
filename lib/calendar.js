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

		// console.log(schedule);
		//
		// for (let i = 0; i < schedule.length; i++) {
		// 	if (time >= schedule[i][0] && time < schedule[i][1]) {
		// 		return i;
		// 	} else if (
		// 		(i > 0) & (i < 12) &&
		// 		schedule[i - 1][1] != 0 &&
		// 		time >= schedule[i - 1][1] &&
		// 		time < schedule[i][0]
		// 	) {
		// 		return i - 0.5;
		// 	}
		// }

		let period = 11.5;

		for (let i = schedule.length - 1; i >= 0; i--) {
			console.log(schedule[i]);
			for (let j = 1; j >= 0; j--) {
				if (schedule[i][j] <= time && schedule[i][j] != 0) {
					i = -1;
					break;
				}
				period -= 0.5;
			}
		}

		console.log(period);

		return period;
	};

	this.formatPeriod = (period, dayType) => {
		let pValue = period;
		if (period == 4 && dayType == SCHEDULE_DAY_TYPES.COMMON_DAY) {
			return 'Common';
		} else if (period == 0) {
			return 'Assembly';
		} else if (period < 0) {
			return 'Before School';
		} else if (period > 11) {
			return 'After School';
		} else if (period > 3) {
			// pValue = period + 1;
		}

		if (pValue % 1 == 0) {
			return `${pValue}`;
		}

		return `${this.formatPeriod(
			Math.floor(period),
			dayType
		)}→${this.formatPeriod(Math.ceil(period), dayType)}`;
	};

	this.getEndOfPeriod = (dayType, period) => {
		const pValue = period > 3 ? period + 1 : period;

		if (period < 0) return SCHEDULES[dayType][0][0];
		if (period > 11) return null;
		if (period % 1 == 0) return SCHEDULES[dayType][pValue][1];
		return SCHEDULES[dayType][Math.round(pValue)][0];
	};

	this.getTimeDifference = (t1, t2) => {
		const h1 = Math.floor(t1 / 100);
		const h2 = Math.floor(t2 / 100);

		const m1 = t1 % 100;
		const m2 = t2 % 100;

		if (t1 > t2) {
			console.error("can't compare times");
			return null;
		}
		if (h1 != h2) {
			return 60 - m1 + m2 + (h2 - h1 - 1) * 60;
		}

		return t2 - t1;
	};
}
