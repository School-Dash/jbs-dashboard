// Eventually Use Prisma or Supabase

export const SCHEDULES = {
	REGULAR_DAY: [
		[830, 845],
		[849, 931],
		[935, 1017],
		[1021, 1103],
		[0, 0],
		[1107, 1149],
		[1153, 1235],
		[1239, 1321],
		[1325, 1407],
		[1411, 1453],
		[1457, 1539],
		[1543, 1625]
	],
	LATE_DAY: [
		[855, 905],
		[909, 949],
		[953, 1033],
		[1037, 1117],
		[0, 0],
		[1121, 1201],
		[1205, 1245],
		[1249, 1329],
		[1333, 1413],
		[1417, 1457],
		[1501, 1541],
		[1545, 1625]
	],
	SPECIAL_DAY: [
		[830, 905],
		[909, 949],
		[953, 1033],
		[1037, 1117],
		[0, 0],
		[1121, 1201],
		[1205, 1245],
		[1249, 1329],
		[1333, 1413],
		[1417, 1457],
		[1501, 1541],
		[1545, 1625]
	],
	COMMON_DAY: [
		[830, 837],
		[841, 920],
		[924, 1003],
		[1007, 1046],
		[1050, 1117],
		[1121, 1201],
		[1205, 1245],
		[1249, 1329],
		[1333, 1413],
		[1417, 1457],
		[1501, 1541],
		[1545, 1625]
	]
};

export const SCHEDULE_DAY_TYPES = {
	NO_SCHOOL: 'No School',
	REGULAR_DAY: 'Regular Schedule',
	SPECIAL_DAY: 'Special Assembly Schedule',
	COMMON_DAY: 'Common Day',
	LATE_DAY: 'Late Start Schedule'
};

export const NO_SCHOOL = 'NO_SCHOOL';
export const REGULAR_DAY = 'REGULAR_DAY';
export const SPECIAL_DAY = 'SPECIAL_DAY';
export const COMMON_DAY = 'COMMON_DAY';
export const LATE_DAY = 'LATE_DAY';
