import { formatToIcalDate } from './ics-utils.js';
import { SCHEDULE_DAY_TYPES } from './schedule.js';

export default function Calendar(cal) {
	this.cal = cal;
	this.allEvents = this.cal.split('END:VEVENT');

	this.getEvents = () => {
		return this.allEvents;
	};

	this.getDayType = date => {
		let daysEvents = [];
		if (date.getDay() == 6 || date.getDay() == 0) {
			return SCHEDULE_DAY_TYPES.NO_SCHOOL;
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
						return SCHEDULE_DAY_TYPES[type];
					}
				}
			}
		}
		return SCHEDULE_DAY_TYPES.REGULAR_DAY;
	};
}
