import { formatToIcalDate } from './ics-utils.js';

const dayTypes = {
	NO_SCHOOL: 'No School',
	REGULAR_DAY: 'Regular Schedule',
	SPECIAL_DAY: 'Special Assembly Schedule',
	COMMON_DAY: 'Common Day',
	LATE_DAY: 'Late Start Schedule'
};

export default function Calendar(cal) {
	this.cal = cal;
	this.allEvents = this.cal.split('END:VEVENT');

	this.getEvents = () => {
		return this.allEvents;
	};

	this.getDayType = date => {
		let daysEvents = [];
		if (date.getDay() == 6 || date.getDay() == 0) {
			return dayTypes.NO_SCHOOL;
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
				for (let type in dayTypes) {
					if (this.allEvents[i].includes(dayTypes[type])) {
						console.log(this.allEvents[i]);
						return dayTypes[type];
					}
				}
			}
		}
		return dayTypes.REGULAR_DAY;
	};
}
